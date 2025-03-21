import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 mt-16 border-t border-primary dark:border-secondary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-primary-dark dark:text-primary mb-4 md:mb-0">
            © {new Date().getFullYear()} Emiliano Vega. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a
              href="https://github.com/EmiV3ga"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-dark dark:text-primary hover:text-primary-light dark:hover:text-primary-light transition-colors duration-200"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-dark dark:text-primary hover:text-primary-light dark:hover:text-primary-light transition-colors duration-200"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-dark dark:text-primary hover:text-primary-light dark:hover:text-primary-light transition-colors duration-200"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;