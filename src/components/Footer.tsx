import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-4 bg-white dark:bg-accent shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex space-x-6">
            <a
              href="https://github.com/EmiV3ga"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-accent dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href="www.linkedin.com/in/emiliano1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-accent dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://x.com/EmiV3ga1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-accent dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              <Twitter size={20} />
            </a>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-300 text-center">
            © {new Date().getFullYear()} Emiliano Vega. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;