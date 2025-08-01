import React, { useRef, useEffect } from "react";
import { animate, createScope, onScroll } from "animejs";
import ProjectCard from "@/components/Cards/ProjectCard";
import { projects } from "@/data/projects";
import LightRays from "@/components/Animations/LigthRays/LightRays";

const Projects: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<any>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const projectsContentRef = useRef<HTMLDivElement>(null);

  // Scroll blur-in animation effect
  useEffect(() => {
    scope.current = createScope({ root }).add(self => {
      if (root.current && projectsContentRef.current && backgroundRef.current) {

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
          })
        });

        animate(backgroundRef.current, {
          opacity: { from: 1, to: 0, ease: 'outCubic' },
          filter: { from: 'blur(1.5px)', to: 'blur(30px)', ease: 'outCubic' },
          composition: 'none',
          autoplay: onScroll({
            target: root.current,
            container: document.body,
            enter: {target: "bottom-=20vh", container: "bottom-=20vh"},
            leave: {target: "bottom-=15vh", container: "bottom-=20vh"},
            sync: 'linear',
          })
        });

        animate(backgroundRef.current, {
          opacity: { from: 0, to: 1, ease: 'outCubic' }, 
          filter: { from: 'blur(30px)', to: 'blur(1.5px)', ease: 'outCubic' },
          ease: 'outCubic',
          composition: 'add',
          autoplay: onScroll({
            target: root.current,
            container: document.body,
            enter: {target: "top+=13vh", container: "top+=20vh"},
            leave: {target: "top+=18vh", container: "top+=20vh"},
            sync: 'linear',
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
      className="w-full min-h-screen bg-white relative overflow-hidden"
      ref={root}
      style={{ isolation: 'isolate' }}
    >
      {/* Projects content */}
      <div 
        className="w-full px-6 md:px-12 lg:px-20 py-20 blur-[30px] scale-[0.9] opacity-10 relative z-10 pointer-events-none"
        ref={projectsContentRef}
        style={{ pointerEvents: 'none' }}
      >
        <div className="max-w-7xl mx-auto pointer-events-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pointer-events-auto">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Additional content to show more work */}
          <div className="mt-20 text-center pointer-events-auto">
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
      <div 
        className="w-full h-full absolute top-0 left-0 z-0 opacity-0 blur-2xl pointer-events-none" 
        ref={backgroundRef}
        style={{ pointerEvents: 'auto' }}
      >
          <LightRays
           rayColor="#FF0000"
          />
      </div>
      <div className="w-full h-full absolute top-0 left-0 z-5 pointer-events-none bg-gradient-to-t from-5% from-white to-transparent">
      </div>
    </section>
  );
};

export default Projects;
