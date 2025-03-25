import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ImagePlus, X, Eye, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import clsx from 'clsx';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ALLOWED_FILE_TYPES = {
  'image/jpeg': true,
  'image/png': true,
  'image/gif': true
};

const Posts = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      if (!profile?.is_admin) {
        navigate('/');
        return;
      }

      setIsAdmin(true);
      setLoading(false);
    } catch (error) {
      console.error('Error checking admin status:', error);
      navigate('/');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be less than 50MB');
      return;
    }

    if (!ALLOWED_FILE_TYPES[file.type]) {
      setError('File type not supported. Please upload an image (JPEG, PNG, GIF)');
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setError(null);
  };

  const clearFileSelection = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    setPublishing(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      let imageUrl = '';
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;

        const { error: uploadError, data } = await supabase.storage
          .from('post-images')
          .upload(fileName, selectedFile);

        if (uploadError) throw uploadError;
        if (data) {
          const { data: { publicUrl } } = supabase.storage
            .from('post-images')
            .getPublicUrl(data.path);
          imageUrl = publicUrl;
        }
      }

      const { error: postError } = await supabase
        .from('posts')
        .insert([{
          title: title.trim(),
          content: content.trim(),
          markdown_content: content.trim(),
          image_url: imageUrl,
          user_id: user.id,
          excerpt: content.trim().substring(0, 150) + '...',
          reading_time: Math.ceil(content.trim().split(/\s+/).length / 200) // Assuming 200 words per minute
        }]);

      if (postError) throw postError;

      setTitle('');
      setContent('');
      clearFileSelection();
      setShowPreview(false);
      setError(null);
      
      navigate('/feed');
    } catch (error: any) {
      console.error('Error publishing post:', error);
      setError(error.message || 'Failed to publish post');
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {error && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handlePublish} className="bg-white dark:bg-accent rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            className="w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent"
          />
        </div>

        <div className="mb-4">
          <div className="flex space-x-2 mb-2">
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className={clsx(
                "px-4 py-2 rounded-lg transition-colors",
                !showPreview ? "bg-accent text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              )}
            >
              Write
            </button>
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className={clsx(
                "px-4 py-2 rounded-lg transition-colors",
                showPreview ? "bg-accent text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
              )}
            >
              <Eye size={20} className="inline-block mr-2" />
              Preview
            </button>
          </div>

          {!showPreview ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content in Markdown..."
              className="w-full h-64 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
            />
          ) : (
            <div className="prose dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-300 dark:border-gray-600 min-h-[16rem] overflow-auto">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content || '*No content to preview*'}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {previewUrl && (
          <div className="relative mt-2 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 p-2">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-60 w-full object-contain"
            />
            <button
              type="button"
              onClick={clearFileSelection}
              className="absolute top-4 right-4 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <ImagePlus size={20} />
              <span className="hidden sm:inline">Upload Image</span>
            </label>
          </div>
          <button
            type="submit"
            disabled={publishing || !title.trim() || !content.trim()}
            className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {publishing ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Posts;