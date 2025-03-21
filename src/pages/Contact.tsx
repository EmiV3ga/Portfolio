import React from 'react';
import { Mail, Linkedin, Github, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Título */}
        <h1 className="text-4xl font-bold mb-4 text-primary-dark dark:text-primary-light">Contact Me</h1>
        {/* Subtítulo */}
        <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">Let's work together!</p>

        {/* Tarjeta de contacto */}
        <div className="bg-primary/10 dark:bg-secondary p-8 rounded-lg">
          <div className="space-y-8">
            {/* Email */}
            <div className="flex items-center space-x-6">
              <Mail className="text-primary-dark dark:text-primary-light" size={28} />
              <div>
                <h3 className="text-lg font-semibold text-primary-dark dark:text-primary-light">Email</h3>
                <a
                  href="mailto:emiliano.dimartino.vega@gmail.com"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary"
                >
                  emiliano.dimartino.vega@gmail.com
                </a>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center space-x-6">
              <Linkedin className="text-primary-dark dark:text-primary-light" size={28} />
              <div>
                <h3 className="text-lg font-semibold text-primary-dark dark:text-primary-light">LinkedIn</h3>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary"
                >
                  Connect with me
                </a>
              </div>
            </div>

            {/* GitHub */}
            <div className="flex items-center space-x-6">
              <Github className="text-primary-dark dark:text-primary-light" size={28} />
              <div>
                <h3 className="text-lg font-semibold text-primary-dark dark:text-primary-light">GitHub</h3>
                <a
                  href="https://github.com/EmiV3ga"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary"
                >
                  Check my repositories
                </a>
              </div>
            </div>

            {/* Teléfono */}
            <div className="flex items-center space-x-6">
              <Phone className="text-primary-dark dark:text-primary-light" size={28} />
              <div>
                <h3 className="text-lg font-semibold text-primary-dark dark:text-primary-light">Phone</h3>
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