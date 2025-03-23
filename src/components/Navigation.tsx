import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FolderGit2, User, Mail, MessageSquare, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  const navItems = [
    { path: '/', label: t('home'), icon: Home },
    { path: '/projects', label: t('projects'), icon: FolderGit2 },
    { path: '/about', label: t('about'), icon: User },
    { path: '/contact', label: t('contact'), icon: Mail },
    { path: '/posts', label: t('posts'), icon: MessageSquare },
  ];

  return (
    <nav className={`fixed bottom-0 w-full md:top-0 md:bottom-auto z-50 
      ${theme === 'dark' ? 'bg-secondary text-text-dark' : 'bg-background text-text'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            {t('fullName')}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium
                  ${location.pathname === item.path 
                    ? 'text-accent dark:text-accent-dark' 
                    : 'hover:text-accent dark:hover:text-accent-dark'}`}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-accent/20 transition-colors"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <Sun size={20} className="text-accent" />
              ) : (
                <Moon size={20} className="text-primary" />
              )}
            </button>
            <button 
              onClick={toggleLanguage} 
              className="p-2 rounded-full hover:bg-accent/20 transition-colors"
              aria-label="Toggle language"
            >
              <Globe size={20} className={theme === 'dark' ? 'text-accent' : 'text-primary'} />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background dark:bg-secondary border-t border-accent">
            <div className="grid grid-cols-7 gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex flex-col items-center justify-center py-2
                      ${location.pathname === item.path 
                        ? 'text-accent dark:text-accent-dark' 
                        : 'text-text dark:text-text-dark'}`}
                  >
                    <Icon size={20} />
                    <span className="text-xs">{item.label}</span>
                  </Link>
                );
              })}
              <button
                onClick={toggleTheme}
                className="flex flex-col items-center justify-center py-2 text-text dark:text-text-dark"
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={toggleLanguage}
                className="flex flex-col items-center justify-center py-2 text-text dark:text-text-dark"
                aria-label="Toggle language"
              >
                <Globe size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;