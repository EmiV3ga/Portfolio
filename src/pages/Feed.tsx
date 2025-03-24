import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Heart, MessageCircle, Share2, Image as ImageIcon, Home, FolderGit2, MessageSquare, User, Mail } from 'lucide-react';

interface Post {
  id: string;
  content: string;
  image_url?: string;
  created_at: string;
  user_id: string;
  likes: number;
  display_name?: string;
  avatar_url?: string;
}

const Feed = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showImageInput, setShowImageInput] = useState(false);

  // Example posts that will be shown when there are no posts
  const examplePosts = [
    {
      id: "example-1",
      content: "Just launched my new portfolio! Check it out and let me know what you think 🚀",
      created_at: new Date().toISOString(),
      user_id: "example",
      likes: 42,
      display_name: "Emiliano Vega",
      avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
      image_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
    },
    {
      id: "example-2",
      content: "Working on some exciting new features for the upcoming project. Stay tuned! 💻",
      created_at: new Date().toISOString(),
      user_id: "example",
      likes: 35,
      display_name: "Emiliano Vega",
      avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
    }
  ];

  useEffect(() => {
    checkUser();
    fetchPosts();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('post_details')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts([...examplePosts, ...(data || [])]);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts(examplePosts);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    if (!newPost.trim()) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('posts')
        .insert([{
          content: newPost,
          image_url: imageUrl,
          user_id: user.id
        }]);

      if (error) throw error;

      setNewPost('');
      setImageUrl('');
      setShowImageInput(false);
      await fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const { error } = await supabase
        .from('posts')
        .update({ likes: (posts.find(p => p.id === postId)?.likes || 0) + 1 })
        .eq('id', postId);

      if (error) throw error;
      await fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 pb-16 md:pb-8">
      {/* Create Post Form */}
      <form onSubmit={handleCreatePost} className="bg-white dark:bg-secondary rounded-lg shadow-md p-4 mb-8">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white resize-none focus:ring-2 focus:ring-primary dark:focus:ring-accent"
          rows={3}
        />
        
        {showImageInput && (
          <div className="mt-2">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="w-full p-2 rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            />
          </div>
        )}

        <div className="flex justify-between items-center mt-3">
          <button
            type="button"
            onClick={() => setShowImageInput(!showImageInput)}
            className="text-primary dark:text-accent hover:opacity-80 transition-opacity"
          >
            <ImageIcon size={20} />
          </button>
          <button
            type="submit"
            disabled={!newPost.trim() || loading}
            className="px-4 py-2 bg-primary dark:bg-accent text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>

      {/* Posts List */}
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-white dark:bg-secondary rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
              {/* Author Info */}
              <div className="flex items-center mb-4">
                <img
                  src={post.avatar_url || `https://ui-avatars.com/api/?name=${post.display_name || 'Anonymous'}`}
                  alt={post.display_name || 'Anonymous'}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-semibold text-primary dark:text-white">
                    {post.display_name || 'Anonymous'}
                  </h3>
                  <time className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.created_at).toLocaleDateString()}
                  </time>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-800 dark:text-gray-200 mb-4">{post.content}</p>

              {/* Post Image */}
              {post.image_url && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img
                    src={post.image_url}
                    alt="Post content"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Interaction Buttons */}
              <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                >
                  <Heart size={20} />
                  <span>{post.likes || 0}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-primary dark:hover:text-accent transition-colors">
                  <MessageCircle size={20} />
                  <span>0</span>
                </button>
                <button className="hover:text-primary dark:hover:text-accent transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Mobile Navigation Bar with Desktop Menu Sections */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-secondary border-t border-gray-200 dark:border-gray-700 md:hidden">
        <div className="flex justify-around items-center h-14">
          <Link to="/" className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-accent">
            <Home size={24} />
          </Link>
          <Link to="/projects" className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-accent">
            <FolderGit2 size={24} />
          </Link>
          <Link to="/posts" className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-accent">
            <MessageSquare size={24} />
          </Link>
          <Link to="/about" className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-accent">
            <User size={24} />
          </Link>
          <Link to="/contact" className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-accent">
            <Mail size={24} />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Feed;