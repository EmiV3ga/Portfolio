import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Trash2, Send } from 'lucide-react';

interface Post {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  likes: number;
  profiles: {
    full_name: string;
    avatar_url: string;
  };
}

interface Comment {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  profiles: {
    full_name: string;
    avatar_url: string;
  };
}

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [user, setUser] = useState<any>(null);
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});
  const [newComments, setNewComments] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        profiles (
          full_name,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return;
    }

    setPosts(data || []);
    setLoading(false);

    // Fetch comments for each post
    data?.forEach(post => {
      fetchComments(post.id);
    });
  };

  const fetchComments = async (postId: string) => {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        *,
        profiles (
          full_name,
          avatar_url
        )
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching comments:', error);
      return;
    }

    setComments(prev => ({
      ...prev,
      [postId]: data || []
    }));
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    if (!newPost.trim()) return;

    const { error } = await supabase
      .from('posts')
      .insert([
        { content: newPost, user_id: user.id }
      ]);

    if (error) {
      console.error('Error creating post:', error);
      return;
    }

    setNewPost('');
    fetchPosts();
  };

  const handleLike = async (postId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    const { error } = await supabase
      .rpc('increment_likes', { post_id: postId });

    if (error) {
      console.error('Error liking post:', error);
      return;
    }

    fetchPosts();
  };

  const handleComment = async (postId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    const comment = newComments[postId];
    if (!comment?.trim()) return;

    const { error } = await supabase
      .from('comments')
      .insert([
        { content: comment, post_id: postId, user_id: user.id }
      ]);

    if (error) {
      console.error('Error creating comment:', error);
      return;
    }

    setNewComments(prev => ({
      ...prev,
      [postId]: ''
    }));
    fetchComments(postId);
  };

  const handleDeletePost = async (postId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting post:', error);
      return;
    }

    fetchPosts();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-[#DAF1DE] dark:bg-secondary">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Create Post Form */}
        <form onSubmit={handleCreatePost} className="bg-white dark:bg-primary/10 p-4 rounded-lg shadow">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-2 rounded border dark:border-gray-600 dark:bg-gray-800 dark:text-white resize-none"
            rows={3}
            maxLength={280}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {newPost.length}/280
            </span>
            <button
              type="submit"
              disabled={!newPost.trim()}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-50"
            >
              Post
            </button>
          </div>
        </form>

        {/* Posts List */}
        <div className="space-y-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white dark:bg-primary/10 p-4 rounded-lg shadow">
              {/* Post Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={post.profiles?.avatar_url || 'https://via.placeholder.com/40'}
                    alt={post.profiles?.full_name || 'User'}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {post.profiles?.full_name || 'Anonymous'}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {user?.id === post.user_id && (
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>

              {/* Post Content */}
              <p className="text-gray-800 dark:text-gray-200 mb-4">{post.content}</p>

              {/* Post Actions */}
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-red-500"
                >
                  <Heart size={20} />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500">
                  <MessageCircle size={20} />
                  <span>{comments[post.id]?.length || 0}</span>
                </button>
              </div>

              {/* Comments Section */}
              <div className="space-y-4">
                {comments[post.id]?.map(comment => (
                  <div key={comment.id} className="flex space-x-3 pl-8">
                    <img
                      src={comment.profiles?.avatar_url || 'https://via.placeholder.com/32'}
                      alt={comment.profiles?.full_name || 'User'}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1 bg-gray-50 dark:bg-gray-800 p-2 rounded">
                      <div className="flex justify-between">
                        <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                          {comment.profiles?.full_name || 'Anonymous'}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-800 dark:text-gray-200">{comment.content}</p>
                    </div>
                  </div>
                ))}

                {/* Add Comment */}
                <div className="flex space-x-2 pl-8">
                  <input
                    type="text"
                    value={newComments[post.id] || ''}
                    onChange={(e) => setNewComments(prev => ({
                      ...prev,
                      [post.id]: e.target.value
                    }))}
                    placeholder="Write a comment..."
                    className="flex-1 p-2 rounded border dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                  <button
                    onClick={() => handleComment(post.id)}
                    className="p-2 text-primary hover:text-primary/80"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;