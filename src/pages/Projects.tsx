import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "Portfolio Website",
    description: "A web application that demonstrates my frontend development skills using React, TypeScript, and Tailwind CSS. Features responsive design and dark mode.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/EmiV3ga",
    demo: "https://emilianodev.netlify.app"
  },
  {
    title: "Backend Project",
    description: "A web application that demonstrates my backend development skills using Node.js, Express, and MongoDB. Includes user authentication and CRUD operations.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80",
    technologies: ["Node.js", "Express", "MongoDB"],
    github: "https://github.com/EmiV3ga",
    demo: "#"
  }
];

const Projects = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-primary-light dark:text-white">My Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="bg-white dark:bg-accent/20 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-accent dark:text-primary-light">{project.title}</h3>
              <p className="text-secondary dark:text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-accent/10 dark:bg-accent/30 text-accent dark:text-primary-light rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-accent hover:text-accent-dark dark:text-primary-light dark:hover:text-white transition-colors"
                >
                  <Github className="mr-2" size={20} />
                  GitHub
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-accent hover:text-accent-dark dark:text-primary-light dark:hover:text-white transition-colors"
                >
                  <ExternalLink className="mr-2" size={20} />
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;