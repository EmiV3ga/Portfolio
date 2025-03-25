import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Scene3D } from '../components/Model3D';

const About = () => {
  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
      {/* 3D Scene */}
      <Scene3D />

      {/* Hero Section */}
      <div className="bg-primary/10 dark:bg-accent/10 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-accent dark:text-primary mb-4">
              About Me
            </h1>
            <p className="text-xl text-accent/80 dark:text-primary/80">
              Crafting digital experiences with code and creativity
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
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
                alt="Profile"
                className="w-48 h-48 rounded-full border-4 border-accent dark:border-primary"
              />
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <div className="mb-4">
                <h1 className="text-4xl font-bold text-accent dark:text-primary">
                  Emiliano Vega
                </h1>
                <p className="text-xl text-accent/80 dark:text-primary/80">
                  Digital Craftsman ( Developer / Designer )
                </p>
              </div>
              <p className="text-lg text-accent/90 dark:text-primary/90">
                Hello, I'm a full-stack developer based in Argentina!
              </p>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-white/80 dark:bg-accent/10 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-accent dark:text-primary">Work</h2>
            <p className="text-lg leading-relaxed text-accent/90 dark:text-primary/90">
              Emiliano is a freelance and a full-stack developer with a passion for building digital services/stuff he wants. 
              He has a knack for all things launching products, from planning and designing all the way to solving real-life 
              problems with code. When not online, he loves hanging out with his camera.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Frontend', 'Backend', 'Tools'].map((category, index) => (
              <div key={index} className="bg-white/80 dark:bg-accent/10 p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4 text-accent dark:text-primary">{category}</h3>
                <ul className="space-y-2 text-accent/90 dark:text-primary/90">
                  {category === 'Frontend' && [
                    'React',
                    'TypeScript',
                    'Tailwind CSS',
                    'Three.js'
                  ].map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                  {category === 'Backend' && [
                    'Node.js',
                    'Express',
                    'PostgreSQL',
                    'Supabase'
                  ].map((skill, i) => (
                    <li key={i}>{skill}</li>
                  ))}
                  {category === 'Tools' && [
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
            <h2 className="text-2xl font-bold mb-6 text-accent dark:text-primary">Bio</h2>
            <div className="space-y-4">
              {[
                { year: '2023', event: 'Started freelancing' },
                { year: '2020', event: 'Completed Master\'s in Computer Science' },
                { year: '2016', event: 'Started working as a developer' }
              ].map((item, index) => (
                <div key={index} className="flex">
                  <span className="w-24 font-bold text-accent dark:text-primary">{item.year}</span>
                  <span className="text-accent/90 dark:text-primary/90">{item.event}</span>
                </div>
              ))}
            </div>
          </div>

          {/* I ♥ Section */}
          <div className="bg-white/80 dark:bg-accent/10 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-accent dark:text-primary">I ♥</h2>
            <p className="text-lg text-accent/90 dark:text-primary/90">
              Art, Music, Drawing, Playing Drums, Photography, Machine Learning
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            {[
              { icon: Github, label: 'GitHub', href: 'https://github.com/EmiV3ga' },
              { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
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