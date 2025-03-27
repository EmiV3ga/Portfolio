import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Scene3D } from '../components/Model3D';
import { useTranslation } from 'react-i18next';
import perfilImage from '../assets/Perfil.jpg';
const About = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
      {/* 3D Scene */}
      <Scene3D />

      {/* Hero Section */}
      <div className="bg-primary/10 dark:bg-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-accent dark:text-primary mb-4">
              {t('fullName')}
            </h1>
            <p className="text-xl text-accent/80 dark:text-primary/80">
              {t('role')}
            </p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3">
              <img
                src={perfilImage}
                alt="Profile"
                className="w-48 h-48 rounded-full border-4 border-accent dark:border-primary"
              />
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <div className="mb-4">
                <h1 className="text-4xl font-bold text-accent dark:text-primary">
                  {t('fullName')}
                </h1>
                <p className="text-xl text-accent/80 dark:text-primary/80">
                  {t('role')}
                </p>
              </div>
              <p className="text-lg text-accent/90 dark:text-primary/90">
                {t('intro')}
              </p>
            </div>
          </div>

          {/* Work Section */}
          <div className="bg-white/80 dark:bg-accent/10 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-accent dark:text-primary">{t('about Me')}</h2>
            <p className="text-lg leading-relaxed text-accent/90 dark:text-primary/90">
              {t('workDescription')}
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[t('frontend'), t('backend'), t('tools')].map((category, index) => (
              <div key={index} className="bg-white/80 dark:bg-accent/10 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-accent dark:text-primary">{category}</h3>
                <ul className="space-y-2 text-accent/90 dark:text-primary/90">
                  {category === t('frontend') && [
                    'React',
                    'TypeScript',
                    'Tailwind CSS',
                    'Three.js'
                  ].map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                  {category === t('backend') && [
                    'Node.js',
                    'Express',
                    'PostgreSQL',
                    'Supabase'
                  ].map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                  {category === t('tools') && [
                    'Git',
                    'Docker',
                    'AWS',
                    'Figma'
                  ].map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bio Timeline */}
          <div className="bg-white/80 dark:bg-accent/10 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-accent dark:text-primary">{t('bio')}</h2>
            <div className="space-y-4">
              {[
                { year: '2023', event: 'Freelance Fullstack', icon: '🚀' },
                { year: '2022', event: 'Ingeniería en Sistemas - UNICEN', icon: '🎓' },
                { year: '2017', event: 'Ciberseguridad (Autodidacta)', icon: '🔐' },
                { year: '2016', event: 'First job: App Delivery con GPS (Android/Java)', icon: '📱' }
              ].map((item, index) => (
                  <div key={index} className="flex">
                    <span className="w-24 font-bold text-accent dark:text-primary">{item.year}</span>
                    <span className="text-accent/90 dark:text-primary/90">
          <span className="mr-2">{item.icon}</span>
                      {item.event}
        </span>
                  </div>
              ))}
            </div>
          </div>
          {/* I ♥ Section */}
          <div className="bg-white/80 dark:bg-accent/10 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-accent dark:text-primary">I ♥</h2>
            <p className="text-lg text-accent/90 dark:text-primary/90">
              {t('iLove')}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            {[
              { icon: Github, label: 'GitHub', href: 'https://github.com/EmiV3ga' },
              { icon: Linkedin, label: 'LinkedIn', href: 'www.linkedin.com/in/emiliano1' },
              { icon: Mail, label: 'Email', href: 'mailto:emiliano.dimartino.vega@gmail.com' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="flex items-center gap-2 text-accent hover:text-accent/80 dark:text-primary dark:hover:text-primary/80 transition-colors"
                target={social.icon !== Mail ? '_blank' : undefined}
                rel={social.icon !== Mail ? 'noopener noreferrer' : undefined}
              >
                <social.icon size={20} />
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;