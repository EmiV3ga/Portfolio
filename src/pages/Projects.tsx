import React, { useState } from 'react';
import { Github, ExternalLink, Pin } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  demo: string;
  isPinned?: boolean;
}

const initialProjects: Project[] = [
  {
    id: "1",
    title: "Pentestia",
    description: "A comprehensive penetration testing automation platform. Features advanced security testing tools and reporting capabilities.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80",
    technologies: ["Python", "Security Tools", "Automation"],
    github: "https://github.com/EmiV3ga/pentest-automation",
    demo: "https://pentestia.netlify.app",
    isPinned: true
  },
  {
    id: "2",
    title: "Portfolio Website",
    description: "Personal portfolio website built with modern web technologies. Features responsive design, dark mode, and interactive 3D elements.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80",
    technologies: ["React", "TypeScript", "Three.js", "Tailwind CSS"],
    github: "https://github.com/EmiV3ga",
    demo: "https://emilianodev.netlify.app",
    isPinned: true
  },
  {
    id: "3",
    title: "PMdP Landing",
    description: "Landing page for PMdP featuring modern design and responsive layout. Showcases services and information in an engaging way.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80",
    technologies: ["React", "CSS", "Responsive Design"],
    github: "https://github.com/EmiV3ga/Landing_PMdP",
    demo: "https://pmdp.netlify.app",
    isPinned: true
  },
  {
    id: "4",
    title: "JMendiola Portfolio",
    description: "Portfolio website for JMendiola showcasing their work and skills. Built with modern web technologies and featuring a clean, professional design.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/EmiV3ga/Portfolio-JM",
    demo: "https://jmendiola.netlify.app"
  },
  {
    id: "5",
    title: "Backend Project",
    description: "Desarrollé un backend robusto usando Supabase (PostgreSQL + Node.js), implementando autenticación JWT, políticas de seguridad RLS, y APIs RESTful para gestión de datos. Optimicé consultas SQL y procesamiento en tiempo real con WebSockets.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80",
    technologies: ["Node.js", "JWt", "WebSockets", "PostgresSQl"],
    github: "https://github.com/EmiV3ga",
    demo: "https://emilianodev.netlify.app/"
  }
];

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const togglePin = (projectId: string) => {
    setProjects(currentProjects => {
      const pinnedCount = currentProjects.filter(p => p.isPinned && p.id !== projectId).length;
      
      return currentProjects.map(project => {
        if (project.id === projectId) {
          // If trying to pin and already have 3 pinned projects, don't allow
          if (!project.isPinned && pinnedCount >= 3) {
            alert('Maximum of 3 projects can be pinned');
            return project;
          }
          return { ...project, isPinned: !project.isPinned };
        }
        return project;
      });
    });
  };

  const pinnedProjects = projects.filter(project => project.isPinned);
  const regularProjects = projects.filter(project => !project.isPinned);

  const ProjectCard = ({ project }: { project: Project }) => (
    <div className="bg-white dark:bg-accent/20 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
      <div className="relative">
        <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
        <button
          onClick={() => togglePin(project.id)}
          className={`absolute top-4 right-4 px-3 py-1 rounded-full flex items-center space-x-1 transition-colors ${
            project.isPinned
              ? 'bg-accent text-white hover:bg-accent-dark'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <Pin size={16} />
          <span className="text-sm">{project.isPinned ? 'Pinned' : 'Pin'}</span>
        </button>
      </div>
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
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-primary-light dark:text-white">My Projects</h1>
      
      {/* Pinned Projects Section */}
      {pinnedProjects.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-accent dark:text-primary-light">
            Featured Projects ({pinnedProjects.length}/3)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pinnedProjects.map((project, index) => (
              <ProjectCard key={`pinned-${project.id}`} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* Regular Projects Section */}
      {regularProjects.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-accent dark:text-primary-light">Other Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regularProjects.map((project, index) => (
              <ProjectCard key={`regular-${project.id}`} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;