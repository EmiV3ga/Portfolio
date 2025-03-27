import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Send, Trash2 } from 'lucide-react';
import Feed from './Feed';
import { Scene3D } from '../components/Model3D';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('feed');
  const [guestbookMessage, setGuestbookMessage] = useState('');
  const [visitorName, setVisitorName] = useState('');
  const [guestbookMessages, setGuestbookMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [deletedEntries, setDeletedEntries] = useState(new Set());

  useEffect(() => {
    checkUser();
    fetchGuestbookEntries();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', user.id)
          .single();
        setIsAdmin(!!profile?.is_admin);
      }
    } catch (error) {
      console.error('Error checking user:', error);
    }
  };

  const fetchGuestbookEntries = async () => {
    try {
      const { data, error } = await supabase
        .from('guestbook_entries_with_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const filteredData = data?.filter(entry => !deletedEntries.has(entry.id)) || [];
      setGuestbookMessages(filteredData);
    } catch (error) {
      console.error('Error fetching guestbook entries:', error);
    }
  };

  const handleGuestbookSubmit = async (e) => {
    e.preventDefault();
    if (!guestbookMessage.trim()) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('guestbook')
        .insert([{
          content: guestbookMessage.trim(),
          user_id: user?.id || null,
          visitor_name: !user ? visitorName.trim() || 'Anonymous' : null
        }])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setGuestbookMessages(prev => [data, ...prev]);
      }

      setGuestbookMessage('');
      setVisitorName('');
    } catch (error) {
      console.error('Error submitting guestbook entry:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEntry = async (entryId) => {
    if (!isAdmin) return;

    try {
      const { error } = await supabase
        .from('guestbook')
        .delete()
        .eq('id', entryId);

      if (error) throw error;

      setGuestbookMessages(prev => prev.filter(msg => msg.id !== entryId));
      setDeletedEntries(prev => new Set([...prev, entryId]));
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const handleReadMore = () => {
    navigate('/projects');
  };

  const articles = [
    {
      id: 1,
      title: "Building a Modern Web Portfolio",
      description: "A comprehensive guide to creating a standout developer portfolio using React and Tailwind CSS.",
      date: "2024-03-19",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      title: "Mastering TypeScript in 2024",
      description: "Essential TypeScript features and best practices for modern web development.",
      date: "2024-03-18",
      readTime: "12 min read",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="bg-background dark:bg-background-dark min-h-screen">
      {/* 3D Scene */}
      <Scene3D />

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="bg-secondary dark:bg-primary p-6 md:p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-primary-light dark:text-accent-light">
            {t('fullName')}
          </h1>
          <p className="text-lg md:text-xl text-primary-light dark:text-accent-light">
            {t('role')}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex space-x-2 md:space-x-4 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-3 md:px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'feed'
                ? 'bg-accent text-primary-light'
                : 'text-primary dark:text-accent-light hover:bg-accent/20'
            }`}
          >
            {t('feed')}
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-3 md:px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'content'
                ? 'bg-accent text-primary-light'
                : 'text-primary dark:text-accent-light hover:bg-accent/20'
            }`}
          >
            {t('content')}
          </button>
          <button
            onClick={() => setActiveTab('guestbook')}
            className={`px-3 md:px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === 'guestbook'
                ? 'bg-accent text-primary-light'
                : 'text-primary dark:text-accent-light hover:bg-accent/20'
            }`}
          >
            {t('guestbook')}
          </button>
        </div>

        {/* Feed Content */}
        {activeTab === 'feed' && <Feed />}

        {/* Content Section */}
        {activeTab === 'content' && (
          <div className="space-y-6 md:space-y-8">
            {articles.map((article) => (
              <article key={article.id} className="bg-secondary-light dark:bg-primary rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4 md:p-6 md:w-2/3">
                    <div className="flex items-center text-sm text-primary dark:text-accent-light mb-2">
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-primary dark:text-accent-light mb-2">
                      {article.title}
                    </h2>
                    <p className="text-primary/80 dark:text-accent-light/80 mb-4 line-clamp-2 md:line-clamp-none">
                      {article.description}
                    </p>
                    <button 
                      onClick={handleReadMore}
                      className="flex items-center text-accent hover:text-accent-dark transition-colors"
                    >
                      <span className="mr-2">Read More</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Guestbook Section */}
        {activeTab === 'guestbook' && (
          <div>
            <div className="bg-secondary-light dark:bg-primary rounded-lg shadow-md p-4 md:p-6 mb-6 md:mb-8">
              <form onSubmit={handleGuestbookSubmit} className="space-y-4">
                {!user && (
                  <input
                    type="text"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="Your name (optional)"
                    className="w-full p-3 rounded-lg border border-primary/20 dark:border-accent-light/20 bg-background dark:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                )}
                <textarea
                  value={guestbookMessage}
                  onChange={(e) => setGuestbookMessage(e.target.value)}
                  placeholder={t('writeMessage')}
                  className="w-full h-24 p-3 rounded-lg border border-primary/20 dark:border-accent-light/20 bg-background dark:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading || !guestbookMessage.trim()}
                    className="flex items-center space-x-2 px-4 py-2 bg-accent text-primary-light rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{loading ? 'Signing...' : t('signGuestbook')}</span>
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-4 md:space-y-6">
              {guestbookMessages.map((msg) => (
                <div key={msg.id} className="bg-secondary-light dark:bg-primary rounded-lg shadow-md p-4 md:p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={msg.avatar_url || `https://ui-avatars.com/api/?name=${msg.display_name || 'Anonymous'}&background=5c4742&color=fff`}
                      alt={msg.display_name || 'Anonymous'}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-primary dark:text-accent-light truncate">
                          {msg.display_name || msg.visitor_name || 'Anonymous'}
                        </h3>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-primary/60 dark:text-accent-light/60">
                            {new Date(msg.created_at).toLocaleDateString()}
                          </span>
                          {isAdmin && (
                            <button
                              onClick={() => handleDeleteEntry(msg.id)}
                              className="text-red-500 hover:text-red-600 transition-colors"
                              title="Delete entry"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-primary/80 dark:text-accent-light/80 break-words">
                        {msg.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;