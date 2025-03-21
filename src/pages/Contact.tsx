import React from 'react';
import { Mail, Linkedin, Github, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Título y párrafo centrados */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary dark:text-primary-dark">Contact Me</h1>
          <p className="text-xl text-text dark:text-text-dark">Let's work together!</p>
        </div>

        {/* Tarjeta de contacto */}
        <div className="bg-background dark:bg-background-dark p-8 rounded-lg">
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-center space-x-4">
              <Mail className="text-primary dark:text-primary-dark" size={28} />
              <div>
                <h3 className="text-lg font-semibold text-primary dark:text-primary-dark">Email</h3>
                <a
                  href="mailto:emiliano.dimartino.vega@gmail.com"
                  className="text-text dark:text-text-dark hover:text-accent"
                >
                  emiliano.dimartino.vega@gmail.com
                </a>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center space-x-4">
              <Linkedin className="text-primary dark:text-primary-dark" size={28} />
              <div>
                <h3 className="text-lg font-semibold text-primary dark:text-primary-dark">LinkedIn</h3>
                <a
                  href="#"
                  className="text-text dark:text-text-dark hover:text-accent"
                >
                  Connect with me
                </a>
              </div>
            </div>

            {/* GitHub */}
            <div className="flex items-center space-x-4">
              <Github className="text-primary dark:text-primary-dark" size={28} />
              <div>
                <h3 className="text-lg font-semibold text-primary dark:text-primary-dark">GitHub</h3>
                <a
                  href="https://github.com/EmiV3ga"
                  className="text-text dark:text-text-dark hover:text-accent"
                >
                  Check my repositories
                </a>
              </div>
            </div>

            {/* Teléfono */}
            <div className="flex items-center space-x-4">
              <Phone className="text-primary dark:text-primary-dark" size={28} />
              <div>
                <h3 className="text-lg font-semibold text-primary dark:text-primary-dark">Phone</h3>
                <p className="text-text dark:text-text-dark">+54 (2494)525601</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;