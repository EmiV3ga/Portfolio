import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, FolderGit2, User, Mail, MessageSquare, Sun, Moon, Globe, LogIn, Menu, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';

const Navigation = () => {
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = React.useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const bottomNavItems = [
    { path: '/', icon: Home, label: t('home') },
    { path: '/projects', icon: FolderGit2, label: t('projects') },
    { path: '/posts', icon: MessageSquare, label: t('posts') },
    { path: '/about', icon: User, label: t('about') },
    { path: '/contact', icon: Mail, label: t('contact') },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Top Navigation Bar (Desktop) */}
      <nav className="fixed top-0 w-full z-50 bg-white dark:bg-accent shadow-md hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-xl font-bold text-accent dark:text-white">
              {t('fullName')}
            </Link>

            <div className="flex items-center space-x-6">
              {bottomNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors
                    ${location.pathname === item.path 
                      ? 'text-accent dark:text-white' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-accent dark:hover:text-white'}`}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </Link>
              ))}

              <div className="flex items-center space-x-4">
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent-dark transition-colors"
                  >
                    {t('signOut')}
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <Link
                      to="/login"
                      className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent-dark transition-colors"
                    >
                      {t('signIn')}
                    </Link>
                    <Link
                      to="/register"
                      className="px-4 py-2 text-sm font-medium border border-accent text-accent hover:bg-accent/10 rounded-lg transition-colors"
                    >
                      {t('register')}
                    </Link>
                  </div>
                )}
                
                <button 
                  onClick={toggleTheme} 
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
                >
                  {theme === 'dark' ? (
                    <Sun size={20} className="text-white" />
                  ) : (
                    <Moon size={20} className="text-gray-600" />
                  )}
                </button>
                
                <button 
                  onClick={() => {
                    const newLang = i18n.language === 'en' ? 'es' : 'en';
                    i18n.changeLanguage(newLang);
                  }}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label={t('toggleLanguage')}
                >
                  <Globe size={20} className="text-gray-600 dark:text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation Bar (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-accent z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <div className="grid grid-cols-5 h-16">
          {bottomNavItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center space-y-1
                ${location.pathname === item.path 
                  ? 'text-accent dark:text-white' 
                  : 'text-gray-600 dark:text-gray-300'}`}
            >
              <item.icon size={20} />
              <span className="text-xs">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Button (Top Right) */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white dark:bg-accent rounded-lg shadow-lg"
      >
        <Menu size={24} className="text-accent dark:text-white" />
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 h-full w-64 bg-white dark:bg-accent overflow-y-auto">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X size={24} className="text-gray-600 dark:text-white" />
              </button>
            </div>
            <div className="p-4">
              {user && (
                <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-800 dark:text-white font-medium">{user.email}</p>
                </div>
              )}

              <div className="space-y-2">
                {user ? (
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 p-4 bg-accent text-white rounded-lg hover:bg-accent-dark"
                  >
                    <LogIn size={20} />
                    <span>{t('signOut')}</span>
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-2 p-4 bg-accent text-white rounded-lg hover:bg-accent-dark"
                    >
                      <LogIn size={20} />
                      <span>{t('signIn')}</span>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-2 p-4 border border-accent text-accent rounded-lg hover:bg-accent/10"
                    >
                      <User size={20} />
                      <span>{t('register')}</span>
                    </Link>
                  </>
                )}

                <div className="flex justify-around pt-4">
                  <button 
                    onClick={() => {
                      toggleTheme();
                      setIsMobileMenuOpen(false);
                    }}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {theme === 'dark' ? (
                      <Sun size={20} className="text-white" />
                    ) : (
                      <Moon size={20} className="text-gray-600" />
                    )}
                  </button>
                  <button 
                    onClick={() => {
                      const newLang = i18n.language === 'en' ? 'es' : 'en';
                      i18n.changeLanguage(newLang);
                      setIsMobileMenuOpen(false);
                    }}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Globe size={20} className="text-gray-600 dark:text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Padding for Fixed Navigation */}
      <div className="h-16 md:block hidden" /> {/* Top padding for desktop */}
      <div className="h-16 block md:hidden" /> {/* Bottom padding for mobile */}
    </>
  );
};

export default Navigation;