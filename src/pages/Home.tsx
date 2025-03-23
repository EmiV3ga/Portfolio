import React, { useState } from 'react';
import Scene from '../components/Scene';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Heart, Share2, ArrowRight, Send } from 'lucide-react';

const Home = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('feed');
  const [guestbookMessage, setGuestbookMessage] = useState('');

  const posts = [
    {
      id: 1,
      content: "Just launched my new portfolio! Check it out and let me know what you think 🚀",
      date: "2024-03-19",
      likes: 42,
      comments: 8,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      content: "Working on some exciting new features for the upcoming project. Stay tuned! 💻",
      date: "2024-03-18",
      likes: 35,
      comments: 5
    }
  ];

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

  const guestbookMessages = [
    {
      id: 1,
      author: "Sarah Johnson",
      content: "Amazing portfolio! Love the clean design and smooth animations.",
      date: "2024-03-19",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      author: "Michael Chen",
      content: "Your work is inspiring! Looking forward to seeing more projects.",
      date: "2024-03-18",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"
    }
  ];

  const handleGuestbookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGuestbookMessage('');
  };

  return (
    <div className="bg-[#DAF1DE] dark:bg-[#0B2B26] min-h-screen">
      {/* 3D Scene */}
      <div className="w-full h-[400px] relative">
        <Scene />
      </div>

      {/* Main Title */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="bg-[#8EB69B] dark:bg-[#163832] p-6 rounded-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-[#0B2B26] dark:text-[#DAF1DE]">
              {t('fullName')}
            </h1>
            <p className="text-xl text-[#235347] dark:text-[#8EB69B]">
              {t('role')}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-2xl mx-auto px-4 mt-8">
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'feed'
                ? 'bg-accent text-white'
                : 'text-primary/80 dark:text-text-dark/80 hover:bg-accent/20'
            }`}
          >
            {t('feed')}
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'content'
                ? 'bg-accent text-white'
                : 'text-primary/80 dark:text-text-dark/80 hover:bg-accent/20'
            }`}
          >
            {t('content')}
          </button>
          <button
            onClick={() => setActiveTab('guestbook')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'guestbook'
                ? 'bg-accent text-white'
                : 'text-primary/80 dark:text-text-dark/80 hover:bg-accent/20'
            }`}
          >
            {t('guestbook')}
          </button>
        </div>

        {/* Feed Content */}
        {activeTab === 'feed' && (
          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.id} className="bg-white dark:bg-secondary rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <p className="text-primary dark:text-text-dark mb-4">{post.content}</p>
                  {post.image && (
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img src={post.image} alt="" className="w-full h-64 object-cover" />
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm text-primary/60 dark:text-text-dark/60">
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-1 hover:text-accent transition-colors">
                        <Heart size={18} />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-accent transition-colors">
                        <MessageSquare size={18} />
                        <span>{post.comments}</span>
                      </button>
                      <button className="hover:text-accent transition-colors">
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Content Section */}
        {activeTab === 'content' && (
          <div className="space-y-8">
            {articles.map((article) => (
              <article key={article.id} className="bg-white dark:bg-secondary rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="h-48 w-full object-cover md:h-full"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-center text-sm text-primary/60 dark:text-text-dark/60 mb-2">
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-primary dark:text-text-dark mb-2">
                      {article.title}
                    </h2>
                    <p className="text-primary/80 dark:text-text-dark/80 mb-4">
                      {article.description}
                    </p>
                    <button className="flex items-center text-accent hover:text-accent/80 transition-colors">
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
            <div className="bg-white dark:bg-secondary rounded-xl shadow-md p-6 mb-8">
              <form onSubmit={handleGuestbookSubmit} className="space-y-4">
                <textarea
                  value={guestbookMessage}
                  onChange={(e) => setGuestbookMessage(e.target.value)}
                  placeholder={t('writeMessage')}
                  className="w-full h-24 p-3 rounded-lg border border-primary/20 dark:border-accent/20 bg-background dark:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors"
                  >
                    <span>{t('signGuestbook')}</span>
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              {guestbookMessages.map((msg) => (
                <div key={msg.id} className="bg-white dark:bg-secondary rounded-xl shadow-md p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={msg.avatar}
                      alt={msg.author}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-primary dark:text-text-dark">
                          {msg.author}
                        </h3>
                        <span className="text-sm text-primary/60 dark:text-text-dark/60">
                          {new Date(msg.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-primary/80 dark:text-text-dark/80">
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