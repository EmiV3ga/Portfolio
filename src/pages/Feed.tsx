import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, Heart, Share2 } from 'lucide-react';

const Feed = () => {
  const { t } = useTranslation();
  
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

  return (
    <div className="max-w-2xl mx-auto pt-20 px-4">
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
    </div>
  );
};

export default Feed;