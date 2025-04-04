import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import LightBulb from './LightBulb';
import { useTheme } from '../hooks/useTheme';

const Layout = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-background-dark' : 'bg-background'}`}>
      <Navigation />
      <LightBulb />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;