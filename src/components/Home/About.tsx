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
    { category: "Data Science", items: ["Python & R", "MATLAB", "scikit-learn", "Pytorch", "Time Series Forecasting", "Process Mining"] },
    { category: "AI & ML", items: ["Natural Language Processing", "Computer Vision", "Ensemble Methods", "Deep Learning", "Anomaly Detection"] },
    { category: "Web Development", items: ["Next.js", "TypeScript", "Node.js", "NestJS", "Flask", "FastAPI"] },
    { category: "Cloud & DevOps", items: ["Docker", "Kubernetes", "AWS EC2", "CI/CD", "DigitalOcean"] },
    { category: "Databases", items: ["PostgreSQL", "MongoDB", "Neo4J", "ChromaDB", "MySQL"] },
    { category: "Data Engineering", items: ["Apache Kafka", "Prefect", "Snowflake", "Apache Airflow" ] },
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
              Data Science enthusiast bridging AI innovation with full-stack development to create impactful solutions.
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
                I'm Avin Divakara, a <strong className="text-red-600">Data Science undergraduate</strong> at the University of Plymouth with a unique blend of AI expertise and full-stack development skills. Currently awaiting graduation for my BSc (Hons) in Data Science, I'm passionate about creating solutions that address real-world challenges.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                My work focuses on <strong>explainable AI systems (XAI)</strong>, <strong>real-time data analytics</strong>, and <strong>innovative machine learning</strong> applications. From developing news aggregation systems that combat ideological manipulation to creating air quality monitoring dashboards for Sri Lanka, I believe in technology's power to drive positive social impact.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm constantly exploring emerging technologies and trying to come up with projects which could get the best out of these technologies like graph databases.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                When I'm not building ML models or developing web applications, you'll find me mentoring students, contributing to open source projects like <strong>Unitary Hack</strong>, or exploring the intersection of ethics and artificial intelligence.
              </p>
            </div>
            
            {/* Skills column */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-black">
                Technical Expertise<span className="text-red-600">.</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

              {/* Achievements highlight */}
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h4 className="text-xl font-semibold text-black mb-4">Key Achievements</h4>
                <ul className="space-y-2">
                  <li className="text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                    Neo4J Certified Professional
                  </li>
                  <li className="text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                    IEEE Xtreme 18.0: University Rank #1, Global Rank #520
                  </li>
                  <li className="text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                    Quantum Computing Open Source Contributor
                  </li>
                  <li className="text-gray-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                    Ex-Volunteer at IEEE NSBM & IEEE Young Professionals Sri Lanka
                  </li>
                </ul>
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
