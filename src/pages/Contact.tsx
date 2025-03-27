import React from 'react';
import { Mail, Linkedin, Github, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary dark:text-accent-light mb-2">
            {t('getInTouch')}
          </h1>
          <p className="text-secondary dark:text-secondary-light">
            {t('letWork')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email Card */}
          <a 
            href="mailto:emiliano.dimartino.vega@gmail.com"
            className="bg-white dark:bg-accent rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-accent/20 p-4 rounded-full">
                <Mail className="text-accent dark:text-accent-light h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-accent dark:text-accent-light">Email</h3>
                <p className="text-secondary dark:text-secondary-light">
                  {t('sendMessage')}
                </p>
              </div>
            </div>
          </a>

          {/* GitHub Card */}
          <a 
            href="https://github.com/EmiV3ga"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-accent rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-accent/20 p-4 rounded-full">
                <Github className="text-accent dark:text-accent-light h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-accent dark:text-accent-light">GitHub</h3>
                <p className="text-secondary dark:text-secondary-light">
                  {t('checkRepositories')}
                </p>
              </div>
            </div>
          </a>

          {/* LinkedIn Card */}
          <a 
            href="https://www.linkedin.com/in/emiliano1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-accent rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-accent/20 p-4 rounded-full">
                <Linkedin className="text-accent dark:text-accent-light h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-accent dark:text-accent-light">LinkedIn</h3>
                <p className="text-secondary dark:text-secondary-light">
                  {t('connectProfessionally')}
                </p>
              </div>
            </div>
          </a>

          {/* Phone Card */}
          <a 
            href="https://wa.me/2494525601"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-accent rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:scale-[1.02] cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-accent/20 p-4 rounded-full">
                <Phone className="text-accent dark:text-accent-light h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-accent dark:text-accent-light">WhatsApp</h3>
                <p className="text-secondary dark:text-secondary-light">
                  {t('letTalk')}
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;