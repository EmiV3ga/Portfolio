import React from 'react';
import Scene from '../components/Scene';
import { Github, Linkedin, Mail } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#DAF1DE] dark:bg-secondary text-gray-900 dark:text-gray-200">
      <Scene />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Profile Section */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
                alt="Profile"
                className="w-48 h-48 rounded-full border-4 border-primary"
              />
            </div>
            <div className="md:w-2/3 text-center md:text-left">
              <div className="mb-4">
                <h1 className="text-4xl font-bold text-primary dark:text-accent">
                  Emiliano Vega
                </h1>
                <p className="text-xl text-primary/80 dark:text-accent/80">
                  Digital Craftsman ( Developer / Designer )
                </p>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Hello, I'm a full-stack developer based in Argentina!
              </p>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-white dark:bg-primary/10 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-primary dark:text-accent">Work</h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Emiliano is a freelance and a full-stack developer with a passion for building digital services/stuff he wants. 
              He has a knack for all things launching products, from planning and designing all the way to solving real-life 
              problems with code. When not online, he loves hanging out with his camera.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-primary/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary dark:text-accent">Frontend</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>React</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Three.js</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-primary/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary dark:text-accent">Backend</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>Node.js</li>
                <li>Express</li>
                <li>PostgreSQL</li>
                <li>Supabase</li>
              </ul>
            </div>
            
            <div className="bg-white dark:bg-primary/10 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary dark:text-accent">Tools</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>Git</li>
                <li>Docker</li>
                <li>AWS</li>
                <li>Figma</li>
              </ul>
            </div>
          </div>

          {/* Bio Timeline */}
          <div className="bg-white dark:bg-primary/10 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-primary dark:text-accent">Bio</h2>
            <div className="space-y-4">
              <div className="flex">
                <span className="w-24 font-bold text-primary dark:text-accent">2023</span>
                <span>Started freelancing</span>
              </div>
              <div className="flex">
                <span className="w-24 font-bold text-primary dark:text-accent">2020</span>
                <span>Completed Master's in Computer Science</span>
              </div>
              <div className="flex">
                <span className="w-24 font-bold text-primary dark:text-accent">2016</span>
                <span>Started working as a developer</span>
              </div>
            </div>
          </div>

          {/* I ♥ Section */}
          <div className="bg-white dark:bg-primary/10 p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-primary dark:text-accent">I ♥</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Art, Music, Drawing, Playing Drums, Photography, Machine Learning
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6">
            <a 
              href="https://github.com/EmiV3ga" 
              className="flex items-center gap-2 text-primary hover:text-primary/80 dark:text-accent dark:hover:text-accent/80 transition-colors"
            >
              <Github size={20} />
              <span>GitHub</span>
            </a>
            <a 
              href="https://linkedin.com" 
              className="flex items-center gap-2 text-primary hover:text-primary/80 dark:text-accent dark:hover:text-accent/80 transition-colors"
            >
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
            <a 
              href="mailto:emiliano.dimartino.vega@gmail.com" 
              className="flex items-center gap-2 text-primary hover:text-primary/80 dark:text-accent dark:hover:text-accent/80 transition-colors"
            >
              <Mail size={20} />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;