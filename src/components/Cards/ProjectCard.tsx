import React from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group bg-white/80 backdrop-blur-2xl border border-white/30 rounded-lg p-6 hover:shadow-xl hover:bg-white/60 transition-all duration-300 hover:-translate-y-2">
      {/* Project image placeholder */}
      <div className="w-full h-48 bg-gradient-to-br from-gray-100/50 to-gray-200/50 rounded-lg mb-6 flex items-center justify-center backdrop-blur-sm">
        <span className="text-gray-600 text-sm">Project Image</span>
      </div>
      
      {/* Project info */}
      <div>
        <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-red-600 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-700 mb-4 leading-relaxed">
          {project.description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, techIndex) => (
            <span 
              key={techIndex}
              className="px-3 py-1 bg-white/40 backdrop-blur-sm text-gray-800 text-sm rounded-full border border-white/50"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Project links */}
        <div className="flex gap-4">
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-red-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl}
              className="px-4 py-2 border border-black text-black rounded-lg hover:bg-black hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
