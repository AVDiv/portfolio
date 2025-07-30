import React, { useRef, useEffect } from "react";
import { animate, createScope, onScroll } from "animejs";
import Dither from "@/components/Animations/Dither/Dither";
import ProjectCard from "../Cards/ProjectCard";

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
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<any>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const projectsContentRef = useRef<HTMLDivElement>(null);

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

  // Scroll blur-in animation effect
  useEffect(() => {
    scope.current = createScope({ root }).add(self => {
      if (root.current && projectsContentRef.current && backgroundRef.current) {
        // backgroundRef.current.style.filter = 'blur(1.5px)';

        animate(projectsContentRef.current, {
          filter: 'blur(0px)',
          scale: 1.05,
          opacity: 1,
          ease: 'outCubic',
          autoplay: onScroll({
            target: root.current,
            container: document.body,
            enter: {target: "top", container: "top+=20vh"},
            leave: {target: "center-=35vh", container: "top"},
            sync: 'outCubic',
            debug: true,
          })
        });

        animate(backgroundRef.current, {
          opacity: 0.3,
          filter: 'blur(1.5px)',
          ease: 'outCubic',
          autoplay: onScroll({
            target: root.current,
            container: document.body,
            enter: {target: "center-=35vh", container: "top+=20vh"},
            leave: {target: "center-=30vh", container: "top+=20vh"},
            sync: 'outCubic',
            debug: true,
          })
        });
      }
    });

    return () => {
      if (scope && scope.current.revert) {
        scope.current.revert();
      }
    };
  }, []);

  return (
    <section 
      id="projects" 
      className="w-full min-h-screen bg-white relative z-0"
      ref={root}
    >
      {/* Projects content */}
      <div 
        className="w-full px-6 md:px-12 lg:px-20 py-20 blur-[30px] scale-[0.9] opacity-10"
        ref={projectsContentRef}
      >
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
              <ProjectCard key={project.id} project={project} />
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
      <div className="w-full h-full absolute top-0 left-0 pointer-events-none -z-10 opacity-0 blur-2xl" ref={backgroundRef}>
          <Dither
            waveColor={[1, 0, 0]}
            disableAnimation={false}
            enableMouseInteraction={true}
            mouseRadius={0.3}
            colorNum={4}
            waveAmplitude={0.3}
            waveFrequency={3}
            waveSpeed={0.05}
          />
      </div>
    </section>
  );
};

export default Projects;
