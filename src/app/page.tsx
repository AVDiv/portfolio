"use client";
import React, { useEffect, useRef } from "react";
import { createScope, onScroll, animate } from 'animejs';
import Hero from "@/components/Home/Hero";
import About from "@/components/Home/About";
import Projects from "@/components/Home/Projects";
import Contact from "@/components/Home/Contact";
import Noise from "@/components/Animations/Noise/Noise";
import { HomeSimple, Folder, User, Mail } from "iconoir-react";
import NavbarMarker from "@/components/NavbarMarker";

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const cameraFrameRef = useRef<HTMLDivElement>(null);
  const cameraViewportRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const heroRootRef = useRef<HTMLElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const sectionMarkers = useRef<Array<HTMLLIElement>>([]);
  const scope = useRef<any>(null);
  const scrollObserver = useRef<any>(null);

  // Scroll animations for the home page
  useEffect(() => {
    scope.current = createScope({ root }).add(self => {
      // Camera viewport frame animation on scroll
      if (cameraFrameRef.current && cameraViewportRef.current && navbarRef.current && heroRootRef.current) {
        // Camera frame
        animate(cameraFrameRef.current, {
          padding: `80px`,
          ease: 'linear',
          autoplay: onScroll({
            target: heroRootRef.current,
            container: document.body,
            enter: {target: "top", container: "top"},
            leave: {target: "bottom", container: "bottom"},
            sync: 'linear',
          })
        });
        // Camera viewport
        animate(cameraViewportRef.current, {
          borderRadius: `8px`,
          ease: 'linear',
          autoplay: onScroll({
            target: heroRootRef.current,
            container: document.body,
            enter: {target: "top", container: "top"},
            leave: {target: "bottom", container: "bottom"},
            sync: 'linear',
          })
        });
        // Navbar visibility
        animate(navbarRef.current, {
          opacity: 1,
          filter: 'blur(0px)',
          left: '5px',
          ease: 'linear',
          autoplay: onScroll({
            target: heroRootRef.current,
            container: document.body,
            enter: {target: "top", container: "top"},
            leave: {target: "bottom", container: "bottom"},
            sync: 'linear',
          })
        });

        // Progress line animation based on scroll
        const progressLine = document.getElementById('progress-line');
        if (progressLine) {
          // Section-based progress animation
          const sections = [
            { element: document.getElementById('landing'), id: 'landing' },
            { element: document.getElementById('about'), id: 'about' },
            { element: document.getElementById('projects'), id: 'projects' },
            { element: document.getElementById('contact'), id: 'contact' }
          ].filter(section => section.element);

          if (sections.length > 0) {
            // Calculate total progress based on section scroll positions
            const updateProgress = () => {
              const scrollTop = window.pageYOffset;
              
              let currentProgress = 0;
              let currentSectionIndex = -1;
              const segmentHeight = 100 / (sections.length - 1); // Equal segments between markers
              
              for (let i = 0; i < sections.length - 1; i++) {
                const currentSection = sections[i].element;
                const nextSection = sections[i + 1].element;
                
                if (!currentSection || !nextSection) continue;
                
                const currentSectionTop = currentSection.offsetTop;
                const nextSectionTop = nextSection.offsetTop;
                const sectionHeight = nextSectionTop - currentSectionTop;
                
                if (scrollTop >= currentSectionTop && scrollTop < nextSectionTop) {
                  // Currently in this section
                  currentSectionIndex = i;
                  const sectionProgress = Math.min((scrollTop - currentSectionTop) / sectionHeight, 1);
                  currentProgress = (i * segmentHeight) + (sectionProgress * segmentHeight);
                  break;
                } else if (scrollTop >= nextSectionTop) {
                  // Past this section
                  currentProgress = (i + 1) * segmentHeight;
                }
              }
              
              // Handle last section
              const lastSection = sections[sections.length - 1].element;
              if (lastSection && scrollTop >= lastSection.offsetTop) {
                // Once we reach the last section, progress should be 100%
                currentSectionIndex = sections.length - 1;
                currentProgress = 100;
              }
              
              // Update label visibility and marker state based on current section
              sections.forEach((section, index) => {
                const label = document.getElementById(`${section.id}-label`);
                const marker = document.querySelector(`[data-section="${section.id}"] .marker-button`);
                const icon = marker?.querySelector('svg');
                
                if (index === currentSectionIndex) {
                  // Active section - show label and light up marker
                  if (label) {
                    label.style.opacity = '1';
                    label.style.transform = 'translateX(-100%) scale(1)';
                  }
                  if (marker) {
                    marker.classList.add('active');
                  }
                  // Force icon color to black when active
                  if (icon) {
                    icon.style.setProperty('color', '#000000', 'important');
                    icon.style.setProperty('stroke', '#000000', 'important');
                  }
                } else {
                  // Inactive section - hide label and dim marker
                  if (label) {
                    label.style.opacity = '0';
                    label.style.transform = 'translateX(-100%) scale(0.8)';
                  }
                  if (marker) {
                    marker.classList.remove('active');
                  }
                  // Reset icon color to red when inactive
                  if (icon) {
                    icon.style.setProperty('color', '#dc2626', 'important');
                    icon.style.setProperty('fill', '#dc2626', 'important');
                    icon.style.setProperty('stroke', '#dc2626', 'important');
                  }
                }
              });
              
              // Ensure progress is within bounds
              currentProgress = Math.min(Math.max(currentProgress, 0), 100);
              
              // Calculate bottom position based on actual container dimensions
              const progressContainer = progressLine.parentElement;
              if (progressContainer) {
                const containerHeight = progressContainer.offsetHeight;
                const topOffset = 75; // top-[75px]
                const bottomOffset = 30; // bottom-[30px] 
                const availableHeight = containerHeight - topOffset - bottomOffset;
                
                // Calculate current bottom position
                const progressDistance = (currentProgress / 100) * availableHeight;
                const bottomPosition = bottomOffset + availableHeight - progressDistance;
                
                progressLine.style.bottom = `${bottomPosition}px`;
              }
            };
            
            // Initial update and scroll listener
            updateProgress();
            const handleScroll = () => updateProgress();
            window.addEventListener('scroll', handleScroll, { passive: true });
            
            // Cleanup function
            if (self) {
              self.add("cleanup", () => {
                window.removeEventListener('scroll', handleScroll);
              });
            }
          }
        }

      }
  });

    return () => {
      if (scope.current) {
        scope.current.revert();
        scope.current = null;
      }
    };
  }, []);

  return (
    <main className="bg-black relative" ref={root}>
      {/* Camera Viewport Frame */}
      <div className="fixed top-0 left-0 h-screen w-screen z-10 pointer-events-none" ref={cameraFrameRef}>
        {/* Navigation Bar */}
        <nav ref={navbarRef} className="absolute top-0 -left-15 h-screen flex flex-col items-center justify-center px-6 z-20 opacity-0 blur-xs pointer-events-auto">
          {/* Vertical progress line container */}
          <div className="relative flex flex-col items-center">
            {/* Section markers list */}
            <ul className="flex flex-col items-center gap-16 relative">
              {/* Background track - connects the marker centers */}
              <div className="absolute top-[75px] bottom-[30px] left-1/2 transform -translate-x-1/2 w-[2px] bg-slate-700"></div>
              
              {/* Progress indicator (will be animated with scroll) */}
              <div className="absolute top-[75px] left-1/2 transform -translate-x-1/2 w-[2px] bg-red-600" id="progress-line"></div>
              <NavbarMarker
                href="#landing"
                label="Landing"
                icon={<HomeSimple width={16} height={16} className="text-red-600" />}
                dataSection="landing"
              />
              <NavbarMarker
                href="#about"
                label="About"
                icon={<User width={16} height={16} className="text-red-600" />}
                dataSection="about"
              />
              <NavbarMarker
                href="#projects"
                label="Projects"
                icon={<Folder width={16} height={16} className="text-red-600" />}
                dataSection="projects"
              />
              <NavbarMarker
                href="#contact"
                label="Contact"
                icon={<Mail width={16} height={16} className="text-red-600" />}
                dataSection="contact"
              />
            </ul>
          </div>
        </nav>
        {/* Camera viewport content */}
        <div className="h-full w-full shadow-[0_0_0_90px_rgba(0,0,0,1)] overflow-hidden pointer-events-none" ref={cameraViewportRef}>
        </div>
      </div>
      <div className="fixed top-0 left-0 h-full w-screen z-20 pointer-events-none">
        <Noise 
          patternSize={1}
          patternScaleX={1}
          patternScaleY={1}
          patternRefreshInterval={1}
          patternAlpha={9} 
        />
      </div>
      <div className="w-full">
          {/* Sections of the page */}
          <Hero rootRefSetter={heroRootRef} />
          <About />
          <Projects />
          <Contact />
      </div>
    </main>
  );
}
