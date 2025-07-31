import React from "react";
import Project from "@/types/project";
import { MapsArrowDiagonal, Repository } from "iconoir-react";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group bg-white/80 backdrop-blur-2xl border border-white/30 rounded-lg p-6 hover:shadow-xl hover:bg-white/60 transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
      {/* Project image placeholder */}
      <div className="w-full h-48 bg-gradient-to-br from-gray-100/50 to-gray-200/50 rounded-lg mb-6 flex items-center justify-center backdrop-blur-sm">
        <span className="text-gray-600 text-sm">Project Image</span>
      </div>
      
      {/* Project info */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          {/* Project overview text */}
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
        </div>
        
        {/* Project links */}
        <div className="flex flex-row justify-between mt-auto">
          {project.pageUrl && (
            <a 
              href={project.pageUrl}
              className="px-4 py-3 bg-black text-white rounded-lg hover:bg-red-600 transition-colors flex flex-row gap-x-3 items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
             <MapsArrowDiagonal /> More Details
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl}
              className="px-4 py-3 border border-black text-black rounded-lg hover:bg-black hover:text-white transition-colors  flex flex-row gap-x-3 items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Repository /> Git Repo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
