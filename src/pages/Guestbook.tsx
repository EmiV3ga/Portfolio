import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send } from 'lucide-react';

const Guestbook = () => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');

  const messages = [
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle message submission
    setMessage('');
  };

  return (
    <div className="max-w-2xl mx-auto pt-20 px-4">
      <div className="bg-white dark:bg-secondary rounded-xl shadow-md p-6 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
        {messages.map((msg) => (
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
  );
};

export default Guestbook;