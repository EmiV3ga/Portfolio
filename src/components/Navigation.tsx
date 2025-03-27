import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, FolderGit2, MessageSquare, User, Mail, Sun, Moon, LogIn, Languages } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = React.useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrolled(currentScrollY > 20);
      
      if (currentScrollY > lastScrollY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const navItems = [
    { path: '/', icon: Home, label: t('home') },
    { path: '/projects', icon: FolderGit2, label: t('projects') },
    { path: '/posts', icon: MessageSquare, label: t('posts') },
    { path: '/about', icon: User, label: t('about') },
    { path: '/contact', icon: Mail, label: t('contact') },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className={`fixed left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 transition-all duration-300 transform
        ${hidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}
        ${scrolled ? 'md:top-2' : 'md:top-4'}`}>
        <div className={`mx-auto rounded-full backdrop-blur-sm border transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 dark:bg-accent/90 border-gray-200/50 dark:border-gray-700/50' 
            : 'bg-white/70 dark:bg-accent/70 border-gray-200/30 dark:border-gray-700/30'
        }`}>
          <div className="flex items-center justify-between px-6 h-14">
            <Link to="/" className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-accent dark:bg-primary flex items-center justify-center text-white dark:text-accent transform transition-all duration-300 hover:scale-110">
                <span className="font-bold text-sm">EV</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1.5 text-sm font-medium transition-colors px-3 py-2 rounded-full
                    ${location.pathname === item.path 
                      ? 'text-accent dark:text-white bg-accent/10 dark:bg-white/10' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-accent hover:bg-accent/5 dark:hover:text-white dark:hover:bg-white/5'}`}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <button 
                onClick={toggleLanguage} 
                className="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label={t('toggleLanguage')}
              >
                <Languages size={20} />
                <span className="sr-only">{t('toggleLanguage')}</span>
              </button>

              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {user ? (
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-full hover:bg-accent-dark transition-colors"
                >
                  {t('signOut')}
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-full hover:bg-accent-dark transition-colors"
                  >
                    {t('signIn')}
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium border border-accent text-accent hover:bg-accent/10 rounded-full transition-colors"
                  >
                    {t('register')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className={`fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] md:hidden z-50 transition-all duration-300 transform
        ${hidden ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
        <div className="rounded-full backdrop-blur-sm bg-white/90 dark:bg-accent/90 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <div className="grid grid-cols-5 h-14">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center space-y-1
                  ${location.pathname === item.path 
                    ? 'text-accent dark:text-white bg-accent/10 dark:bg-white/10' 
                    : 'text-gray-800 dark:text-gray-100 hover:text-accent dark:hover:text-white'}`}
              >
                <item.icon size={20} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;