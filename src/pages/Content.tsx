import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, BookOpen } from 'lucide-react';

const Content = () => {
  const { t } = useTranslation();

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
    <div className="max-w-2xl mx-auto pt-20 px-4">
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
    </div>
  );
};

export default Content;