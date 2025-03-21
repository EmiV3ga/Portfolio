import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 mt-16 border-t border-accent">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-text dark:text-text-dark mb-4 md:mb-0">
            © {new Date().getFullYear()} Emiliano Vega. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a
              href="https://github.com/EmiV3ga"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text dark:text-text-dark hover:text-accent"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text dark:text-text-dark hover:text-accent"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text dark:text-text-dark hover:text-accent"
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