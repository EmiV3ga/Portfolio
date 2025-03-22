import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-3 border-t border-accent"> {/* Reducir padding */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-xs text-text dark:text-text-dark mb-2 md:mb-0"> {/* Texto más pequeño */}
            © {new Date().getFullYear()} Emiliano Vega. All rights reserved.
          </div>
          <div className="flex space-x-3"> {/* Reducir espacio entre íconos */}
            <a
              href="https://github.com/EmiV3ga"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text dark:text-text-dark hover:text-accent"
            >
              <Github size={14} /> {/* Íconos más pequeños */}
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text dark:text-text-dark hover:text-accent"
            >
              <Linkedin size={14} /> {/* Íconos más pequeños */}
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text dark:text-text-dark hover:text-accent"
            >
              <Twitter size={14} /> {/* Íconos más pequeños */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;