import React from 'react';
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

  const navItems = [
    { path: '/', label: t('home'), icon: Home },
    { path: '/projects', label: t('projects'), icon: FolderGit2 },
    { path: '/about', label: t('about'), icon: User },
    { path: '/contact', label: t('contact'), icon: Mail },
    { path: '/posts', label: t('posts'), icon: MessageSquare },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 border-b ${theme === 'dark' ? 'bg-secondary border-accent/20' : 'bg-background border-primary/20'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary dark:text-accent">
            {t('fullName')}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 text-sm font-medium transition-colors
                  ${location.pathname === item.path 
                    ? 'text-accent dark:text-accent-dark' 
                    : 'text-primary/80 dark:text-text-dark/80 hover:text-accent dark:hover:text-accent-dark'}`}
              >
                <item.icon size={16} />
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="flex items-center space-x-4">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent/80 transition-colors"
                >
                  {t('signOut')}
                </button>
              ) : (
                <div className="flex space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-white bg-accent rounded-lg hover:bg-accent/80 transition-colors"
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
                className="p-2 rounded-full hover:bg-accent/20 transition-colors"
                aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
              >
                {theme === 'dark' ? (
                  <Sun size={20} className="text-accent" />
                ) : (
                  <Moon size={20} className="text-primary" />
                )}
              </button>
              
              <button 
                onClick={() => {
                  const newLang = i18n.language === 'en' ? 'es' : 'en';
                  i18n.changeLanguage(newLang);
                }}
                className="p-2 rounded-full hover:bg-accent/20 transition-colors"
                aria-label={t('toggleLanguage')}
              >
                <Globe size={20} className={theme === 'dark' ? 'text-accent' : 'text-primary'} />
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent/20 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-primary dark:text-accent" />
            ) : (
              <Menu size={24} className="text-primary dark:text-accent" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40">
          <div className="fixed right-0 top-0 h-full w-64 bg-background dark:bg-secondary p-4 shadow-lg">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 p-2 rounded-lg transition-colors
                    ${location.pathname === item.path 
                      ? 'bg-accent/20 text-accent dark:text-accent-dark' 
                      : 'text-primary/80 dark:text-text-dark/80 hover:bg-accent/10'}`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              ))}

              <hr className="border-accent/20" />

              {user ? (
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 p-2 bg-accent text-white rounded-lg hover:bg-accent/80"
                >
                  <LogIn size={20} />
                  <span>{t('signOut')}</span>
                </button>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2 p-2 bg-accent text-white rounded-lg hover:bg-accent/80"
                  >
                    <LogIn size={20} />
                    <span>{t('signIn')}</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2 p-2 border border-accent text-accent rounded-lg hover:bg-accent/10"
                  >
                    <User size={20} />
                    <span>{t('register')}</span>
                  </Link>
                </div>
              )}

              <div className="flex justify-around pt-4">
                <button 
                  onClick={() => {
                    toggleTheme();
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-2 rounded-full hover:bg-accent/20"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button 
                  onClick={() => {
                    const newLang = i18n.language === 'en' ? 'es' : 'en';
                    i18n.changeLanguage(newLang);
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-2 rounded-full hover:bg-accent/20"
                >
                  <Globe size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;