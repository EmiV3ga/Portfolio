import React from 'react';
import { Mail, Linkedin, Github, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-[#DAF1DE] dark:bg-secondary">
      <div className="max-w-4xl mx-auto">
        {/* Título y párrafo centrados */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary dark:text-accent">Contact Me</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Let's work together!</p>
        </div>

        {/* Tarjeta de contacto */}
        <div className="bg-white dark:bg-primary/10 p-8 rounded-lg shadow-lg">
          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-center space-x-4">
              <Mail className="text-primary dark:text-accent" size={28} />
              <div>
                <h3 className="text-lg font-semibold text-primary dark:text-accent">Email</h3>
                <a
                  href="mailto:emiliano.dimartino.vega@gmail.com"
                  className="text-gray-600 dark:text-gray-300 hover:text-accent"
                >
                  emiliano.dimartino.vega@gmail.com
                </a>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center space-x-4">
              <Linkedin className="text-primary dark:text-accent" size={28} />
              <div>
                <h3 className="text-lg font-semibold text-primary dark:text-accent">LinkedIn</h3>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-accent"
                >
                  Connect with me
                </a>
              </div>
            </div>

            {/* GitHub */}
            <div className="flex items-center space-x-4">
              <Github className="text-primary dark:text-accent" size={28} />
              <div>
                <h3 className="text-lg font-semibold text-primary dark:text-accent">GitHub</h3>
                <a
                  href="https://github.com/EmiV3ga"
                  className="text-gray-600 dark:text-gray-300 hover:text-accent"
                >
                  Check my repositories
                </a>
              </div>
            </div>

            {/* Teléfono */}
            <div className="flex items-center space-x-4">
              <Phone className="text-primary dark:text-accent" size={28} />
              <div>
                <h3 className="text-lg font-semibold text-primary dark:text-accent">Phone</h3>
                <p className="text-gray-600 dark:text-gray-300">+54 (2494)525601</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;