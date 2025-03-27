import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Heart, MessageCircle, Share2, Trash2, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Cookies from 'js-cookie';

interface Post {
  id: string;
  title: string;
  content: string;
  markdown_content: string;
  created_at: string;
  likes: number;
  image_url?: string;
  display_name?: string;
  avatar_url?: string;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  visitor_name?: string;
  display_name?: string;
  avatar_url?: string;
}

const DELETED_POSTS_KEY = 'deleted_posts_v2';
const DELETED_COMMENTS_KEY = 'deleted_comments_v2';

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [isAdmin, setIsAdmin] = useState(false);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [newComment, setNewComment] = useState<Record<string, string>>({});
  const [visitorName, setVisitorName] = useState('');
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});
  const [user, setUser] = useState<any>(null);
  const [deletedPosts, setDeletedPosts] = useState<Set<string>>(new Set());
  const [deletedComments, setDeletedComments] = useState<Set<string>>(new Set());

  useEffect(() => {
    checkUser();
    checkAdminStatus();
    loadDeletedItems();
    loadLikedPosts();
  }, []);

  useEffect(() => {
    if (deletedPosts.size > 0) {
      localStorage.setItem(DELETED_POSTS_KEY, JSON.stringify(Array.from(deletedPosts)));
    }
  }, [deletedPosts]);

  useEffect(() => {
    if (deletedComments.size > 0) {
      localStorage.setItem(DELETED_COMMENTS_KEY, JSON.stringify(Array.from(deletedComments)));
    }
  }, [deletedComments]);

  const loadDeletedItems = () => {
    try {
      const deletedPostsStr = localStorage.getItem(DELETED_POSTS_KEY);
      if (deletedPostsStr) {
        const deletedPostsArray = JSON.parse(deletedPostsStr);
        setDeletedPosts(new Set(deletedPostsArray));
      }

      const deletedCommentsStr = localStorage.getItem(DELETED_COMMENTS_KEY);
      if (deletedCommentsStr) {
        const deletedCommentsArray = JSON.parse(deletedCommentsStr);
        setDeletedComments(new Set(deletedCommentsArray));
      }
    } catch (error) {
      console.error('Error loading deleted items:', error);
      localStorage.removeItem(DELETED_POSTS_KEY);
      localStorage.removeItem(DELETED_COMMENTS_KEY);
    }
  };

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();
        setIsAdmin(!!profile?.is_admin);
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };

  const loadLikedPosts = () => {
    const liked = Cookies.get('liked_posts');
    if (liked) {
      setLikedPosts(new Set(JSON.parse(liked)));
    }
  };

  const saveLikedPosts = (postIds: Set<string>) => {
    Cookies.set('liked_posts', JSON.stringify(Array.from(postIds)), { expires: 365 });
  };

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('post_details')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const filteredPosts = data?.filter(post => !deletedPosts.has(post.id)) || [];
      setPosts(filteredPosts);

      filteredPosts?.forEach(post => {
        fetchComments(post.id);
      });
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [deletedPosts]);

  const fetchComments = async (postId: string) => {
    try {
      const { data, error } = await supabase
        .from('comment_details')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const filteredComments = data?.filter(comment => !deletedComments.has(comment.id)) || [];
      setComments(prev => ({ ...prev, [postId]: filteredComments }));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleLike = async (postId: string) => {
    if (likedPosts.has(postId)) return;

    try {
      const visitorId = Cookies.get('visitor_id') || Math.random().toString(36).substring(7);
      Cookies.set('visitor_id', visitorId, { expires: 365 });

      const { error } = await supabase
        .from('post_likes')
        .insert([{ post_id: postId, visitor_id: visitorId }]);

      if (error) throw error;

      const newLikedPosts = new Set(likedPosts);
      newLikedPosts.add(postId);
      setLikedPosts(newLikedPosts);
      saveLikedPosts(newLikedPosts);

      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, likes: (post.likes || 0) + 1 }
          : post
      ));
    } catch (error) {
      console.error('Error liking post:', error);
      setError('Failed to like post');
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!isAdmin) return;

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      const newDeletedPosts = new Set(deletedPosts);
      newDeletedPosts.add(postId);
      setDeletedPosts(newDeletedPosts);
      localStorage.setItem(DELETED_POSTS_KEY, JSON.stringify(Array.from(newDeletedPosts)));

      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post');
    }
  };

  const handleDeleteComment = async (commentId: string, postId: string) => {
    if (!isAdmin) return;

    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      const newDeletedComments = new Set(deletedComments);
      newDeletedComments.add(commentId);
      setDeletedComments(newDeletedComments);
      localStorage.setItem(DELETED_COMMENTS_KEY, JSON.stringify(Array.from(newDeletedComments)));

      setComments(prev => ({
        ...prev,
        [postId]: prev[postId].filter(comment => comment.id !== commentId)
      }));
    } catch (error) {
      console.error('Error deleting comment:', error);
      setError('Failed to delete comment');
    }
  };

  const handleComment = async (postId: string) => {
    if (!newComment[postId]?.trim()) return;

    try {
      const { error } = await supabase
        .from('comments')
        .insert([{
          post_id: postId,
          content: newComment[postId].trim(),
          user_id: user?.id || null,
          visitor_name: !user ? (visitorName.trim() || 'Anonymous') : null
        }]);

      if (error) throw error;

      setNewComment(prev => ({ ...prev, [postId]: '' }));
      await fetchComments(postId);
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Failed to add comment');
    }
  };

  const toggleComments = (postId: string) => {
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {error && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>{error}</p>
        </div>
      )}

      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="bg-white dark:bg-accent/20 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-accent flex items-center justify-center bg-accent text-white text-xl font-bold">
                    {post.avatar_url ? (
                      <img
                        src={post.avatar_url}
                        alt={post.display_name || 'User'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{(post.display_name || 'A')[0].toUpperCase()}</span>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {post.display_name || 'Anonymous'}
                    </h3>
                    <time className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(post.created_at).toLocaleDateString()}
                    </time>
                  </div>
                </div>
                {isAdmin && (
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="text-red-500 hover:text-red-600 transition-colors"
                    title="Delete post"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>

              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                {post.title}
              </h2>

              <div className="prose dark:prose-invert max-w-none mb-4 dark:text-gray-100">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.markdown_content || post.content}
                </ReactMarkdown>
              </div>

              {post.image_url && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img
                    src={post.image_url}
                    alt="Post content"
                    className="w-full h-auto object-cover cursor-pointer transform transition-transform duration-300 hover:scale-105"
                    onClick={() => window.open(post.image_url, '_blank')}
                    loading="lazy"
                  />
                </div>
              )}

              <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-300">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-1 transition-colors ${
                    likedPosts.has(post.id) 
                      ? 'text-red-500 hover:text-red-600' 
                      : 'hover:text-accent dark:hover:text-white'
                  }`}
                >
                  <Heart 
                    size={20}
                    fill={likedPosts.has(post.id) ? '#FF0000' : 'none'}
                  />
                  <span>{post.likes || 0}</span>
                </button>
                <button 
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center space-x-1 hover:text-accent dark:hover:text-white transition-colors"
                >
                  <MessageCircle size={20} />
                  <span>{comments[post.id]?.length || 0}</span>
                </button>
                <button className="hover:text-accent dark:hover:text-white transition-colors">
                  <Share2 size={20} />
                </button>
              </div>

              {showComments[post.id] && (
                <div className="mt-4 space-y-4">
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    {!user && (
                      <input
                        type="text"
                        value={visitorName}
                        onChange={(e) => setVisitorName(e.target.value)}
                        placeholder="Your name (optional)"
                        className="w-full px-3 py-2 mb-2 border rounded-lg dark:bg-accent-dark dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      />
                    )}
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newComment[post.id] || ''}
                        onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                        placeholder="Write a comment..."
                        className="flex-1 px-3 py-2 border rounded-lg dark:bg-accent-dark dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                      />
                      <button
                        onClick={() => handleComment(post.id)}
                        className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
                      >
                        <Send size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {comments[post.id]?.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-accent flex items-center justify-center bg-accent text-white text-sm font-bold">
                          {comment.avatar_url ? (
                            <img
                              src={comment.avatar_url}
                              alt={comment.display_name || comment.visitor_name || 'Anonymous'}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span>
                              {(comment.display_name || comment.visitor_name || 'A')[0].toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-100 dark:bg-accent-dark rounded-lg p-3">
                            <div className="flex justify-between items-start">
                              <p className="font-medium text-sm text-gray-900 dark:text-white">
                                {comment.display_name || comment.visitor_name || 'Anonymous'}
                              </p>
                              {isAdmin && (
                                <button
                                  onClick={() => handleDeleteComment(comment.id, post.id)}
                                  className="text-red-500 hover:text-red-600 ml-2"
                                  title="Delete comment"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>
                            <p className="text-gray-700 dark:text-gray-200">
                              {comment.content}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Feed;