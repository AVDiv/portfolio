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

const Projects: React.FC = () => {
  // Sample projects data - you can replace this with your actual projects
  const projects: Project[] = [
    {
      id: 1,
      title: "Fluid Simulation",
      description: "Interactive fluid dynamics simulation with WebGL and GLSL shaders",
      technologies: ["WebGL", "GLSL", "JavaScript", "Physics"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "Modern portfolio website with advanced animations and 3D effects",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Three.js"],
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "AI Dashboard",
      description: "Machine learning dashboard with real-time data visualization",
      technologies: ["React", "Python", "TensorFlow", "D3.js"],
      liveUrl: "#",
      githubUrl: "#"
    }
  ];

  return (
    <section 
      id="projects" 
      className="w-full min-h-screen bg-white"
    >
      {/* Projects content */}
      <div className="w-full px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="mb-16 text-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6">
              Projects<span className="text-red-600">.</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              A collection of my work showcasing creativity, technical skill, and passion for innovation.
            </p>
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Project image placeholder */}
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Project Image</span>
                </div>
                
                {/* Project info */}
                <div>
                  <h3 className="text-2xl font-bold text-black mb-3 group-hover:text-red-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border"
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
            ))}
          </div>

          {/* Additional content to show more work */}
          <div className="mt-20 text-center">
            <p className="text-lg text-gray-600 mb-8">
              Want to see more of my work?
            </p>
            <a 
              href="#contact"
              className="inline-block px-8 py-3 bg-black text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
