import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useTranslation } from 'react-i18next';

const Navigation = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();
  const { i18n } = useTranslation();
  const location = useLocation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/projects', label: 'Projects' },
    {path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed bottom-0 w-full md:top-0 md:bottom-auto z-50 
      ${theme === 'dark' ? 'bg-secondary text-primary' : 'bg-primary-light text-primary-dark'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            Emiliano Vega
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium
                  ${location.pathname === item.path 
                    ? 'text-primary dark:text-primary-light' 
                    : 'hover:text-primary dark:hover:text-primary-light'}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-primary dark:hover:bg-secondary">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={toggleLanguage} className="p-2 rounded-full hover:bg-primary dark:hover:bg-secondary">
              <Globe size={20} />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-primary-light dark:bg-secondary border-t border-primary dark:border-secondary">
            <div className="grid grid-cols-5 gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center justify-center py-2
                    ${location.pathname === item.path 
                      ? 'text-primary dark:text-primary-light' 
                      : 'text-primary-dark dark:text-primary'}`}
                >
                  <span className="text-xs">{item.label}</span>
                </Link>
              ))}
              <button
                onClick={toggleTheme}
                className="flex flex-col items-center justify-center py-2 text-primary-dark dark:text-primary"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;