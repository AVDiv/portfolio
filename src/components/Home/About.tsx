import React, { useRef, useEffect } from "react";
import { animate, createScope, onScroll } from "animejs";
import Noise from "@/components/Animations/Noise/Noise";

const About: React.FC = () => {
  const root = useRef<HTMLDivElement>(null);
  const scope = useRef<any>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);

  // Skills data
  const skills = [
    { category: "Frontend", items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Three.js"] },
    { category: "Backend", items: ["Node.js", "Express", "Python", "GraphQL", "RESTful APIs"] },
    { category: "Graphics", items: ["WebGL", "GLSL", "Canvas API", "SVG", "3D Animation"] },
    { category: "Tools", items: ["Git", "Docker", "AWS", "Figma", "VS Code"] }
  ];

  // Scroll blur-in animation effect
  useEffect(() => {
    scope.current = createScope({ root }).add(self => {
      if (root.current && aboutContentRef.current && backgroundRef.current) {
        animate(aboutContentRef.current, {
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
          opacity: 0.15,
          filter: 'blur(0px)',
          ease: 'outCubic',
          autoplay: onScroll({
            target: root.current,
            container: document.body,
            enter: {target: "center-=35vh", container: "top+=20vh"},
            leave: {target: "center-=30vh", container: "top+=20vh"},
            sync: 'outCubic',
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
      id="about" 
      className="w-full min-h-screen bg-white relative overflow-hidden"
      ref={root}
      style={{ isolation: 'isolate' }}
    >
      {/* About content */}
      <div 
        className="w-full px-6 md:px-12 lg:px-20 py-20 blur-[30px] scale-[0.9] opacity-10 relative z-10 pointer-events-none"
        ref={aboutContentRef}
        style={{ pointerEvents: 'none' }}
      >
        <div className="max-w-7xl mx-auto pointer-events-auto">
          {/* Section header */}
          <div className="mb-16 text-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6">
              About Me<span className="text-red-600">.</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Creative developer with a passion for merging code and design to build immersive digital experiences.
            </p>
          </div>

          {/* About me content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pointer-events-auto">
            {/* Bio column */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-black">
                My Journey<span className="text-red-600">.</span>
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm Avin Divakara, a developer focused on creating visually stunning and highly interactive web experiences. With a background in both design and development, I bring a unique perspective to every project.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                My work spans from fluid simulations and 3D graphics to building robust full-stack applications. I'm constantly exploring the boundaries of what's possible on the web, experimenting with new technologies and creative coding techniques.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                When I'm not coding, you'll find me exploring new design trends, contributing to open source projects, or diving into the latest advancements in web technology.
              </p>
            </div>
            
            {/* Skills column */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-black">
                Skills & Expertise<span className="text-red-600">.</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {skills.map((skillGroup, index) => (
                  <div key={index} className="space-y-3">
                    <h4 className="text-xl font-semibold text-red-600">{skillGroup.category}</h4>
                    <ul className="space-y-2">
                      {skillGroup.items.map((skill, i) => (
                        <li key={i} className="text-gray-700 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center pointer-events-auto">
            <a 
              href="#projects"
              className="inline-block px-8 py-3 bg-black text-white rounded-lg hover:bg-red-600 transition-colors mr-4"
            >
              View Projects
            </a>
            <a 
              href="#contact"
              className="inline-block px-8 py-3 bg-transparent border-2 border-black text-black rounded-lg hover:bg-red-600 hover:border-red-600 hover:text-white transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
      {/* Background effect */}
      <div 
        className="w-full h-full absolute top-0 left-0 z-0 opacity-0 blur-2xl pointer-events-auto" 
        ref={backgroundRef}
        style={{ pointerEvents: 'auto' }}
      >
          <Noise 
            patternSize={1.5}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={1}
            patternAlpha={15} 
          />
      </div>
    </section>
  );
};

export default About;
