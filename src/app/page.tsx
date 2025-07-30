"use client";
import React, { useEffect, useRef, useState } from "react";
import { useLoader } from "@/context/LoaderProvider";
import { animate, createScope, onScroll, ScrollObserver } from 'animejs';
import Hero from "@/components/Home/Hero";
import Projects from "@/components/Home/Projects";
import Noise from "@/components/Animations/Noise/Noise";
import { HomeSimple, Folder } from "iconoir-react";
import { contain } from "three/src/extras/TextureUtils.js";

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

  // // Camera viewport frame animation
  // useEffect(() => {
  //   if (cameraFrameRef.current) {
  //     scrollObserver.current = new ScrollObserver({
  //       target: document.body,
  //       onUpdate: (self) => {
  //         const scrollY = window.scrollY;
  //         const innerHeight = window.innerHeight;
  //         const progress = Math.min(scrollY / innerHeight, 1);
          
  //         if (cameraFrameRef.current && cameraViewportRef.current) {
  //           // Animate the camera viewport frame from 0px to 80px padding
  //           const paddingValue = progress * 60;

  //           // Update the viewport padding to create the camera frame effect
  //           animate(cameraFrameRef.current, {
  //             padding: `${paddingValue}px`,
  //             duration: 0,
  //             ease: 'linear'
  //           });

  //           animate(cameraViewportRef.current, {
  //             borderRadius: `${8 * progress}px`,
  //             duration: 0,
  //             ease: 'linear'
  //           });

  //           // Animate navbar
  //           if (navbarRef.current) {
  //             // Fade in navbar with padding
  //             const translateX = paddingValue * 0.3;
  //             animate(navbarRef.current, {
  //               transform: `translateX(${translateX}px)`,
  //               opacity: progress,
  //               duration: 0,
  //               ease: 'linear'
  //             });
              
  //             // Update progress line based on scroll position
  //             const progressLine = navbarRef.current.querySelector('#progress-line');
  //             if (progressLine) {
  //               // Calculate height percentage based on page scroll
  //               const totalHeight = document.body.scrollHeight - window.innerHeight;
  //               const scrollPercentage = Math.min((scrollY / totalHeight) * 100, 100);
                
  //               animate(progressLine, {
  //                 height: `${scrollPercentage}%`,
  //                 duration: 0,
  //                 ease: 'linear'
  //               });
  //             }
              
  //             // Update section markers
  //             const sectionElements = document.querySelectorAll('section[id]');
  //             const markerElements = navbarRef.current.querySelectorAll('li');
              
  //             sectionElements.forEach((section, index) => {
  //               if (index < markerElements.length) {
  //                 const sectionTop = section.getBoundingClientRect().top;
  //                 const sectionBottom = section.getBoundingClientRect().bottom;
  //                 const marker = markerElements[index].querySelector('div');
                  
  //                 // Section is in view
  //                 if (sectionTop < window.innerHeight/2 && sectionBottom > 0) {
  //                   marker?.classList.add('active-section');
  //                   marker?.classList.add('border-red-600');
  //                   marker?.classList.remove('border-gray-800');
                    
  //                   // Show the section name
  //                   const sectionId = section.getAttribute('id');
  //                   const labelElement = navbarRef.current?.querySelector(`#${sectionId}-label`);
  //                   if (labelElement) {
  //                     animate(labelElement, {
  //                       opacity: 1,
  //                       duration: 300,
  //                       easing: 'easeOutQuad'
  //                     });
  //                   }
                    
  //                   // Add glow effect
  //                   const glowElement = marker?.querySelector('.active-glow');
  //                   if (glowElement) {
  //                     animate(glowElement, {
  //                       opacity: 0.8,
  //                       scale: 1.1,
  //                       duration: 300,
  //                       easing: 'easeOutQuad'
  //                     });
  //                   }
                    
  //                   // Scale up the marker slightly
  //                   if (marker) {
  //                     animate(marker, {
  //                       scale: 1.1,
  //                       duration: 300,
  //                       easing: 'easeOutQuad'
  //                     });
  //                   }
  //                 } else {
  //                   marker?.classList.remove('active-section');
  //                   marker?.classList.remove('border-red-600');
  //                   marker?.classList.add('border-gray-800');
                    
  //                   // Hide the section name if not hovering
  //                   const sectionId = section.getAttribute('id');
  //                   const labelElement = navbarRef.current?.querySelector(`#${sectionId}-label`);
  //                   if (labelElement && !marker?.closest('.group:hover')) {
  //                     animate(labelElement, {
  //                       opacity: 0,
  //                       duration: 300,
  //                       easing: 'easeOutQuad'
  //                     });
  //                   }
                    
  //                   // Remove glow effect
  //                   const glowElement = marker?.querySelector('.active-glow');
  //                   if (glowElement) {
  //                     animate(glowElement, {
  //                       opacity: 0,
  //                       scale: 1,
  //                       duration: 300,
  //                       easing: 'easeOutQuad'
  //                     });
  //                   }
                    
  //                   // Scale back to normal
  //                   if (marker) {
  //                     animate(marker, {
  //                       scale: 1,
  //                       duration: 300,
  //                       easing: 'easeOutQuad'
  //                     });
  //                   }
  //                 }
  //               }
  //             });
  //           }
            
  //         }
  //       }
  //     });

  //     return () => {
  //       if (scrollObserver.current) {
  //         scrollObserver.current.revert();
  //       }
  //     };
  //   }
  // }, [cameraFrameRef, cameraViewportRef]);

  // // Initialize section markers
  // useEffect(() => {
  //   if (navbarRef.current) {
  //     // Add a class for styling to show active sections
  //     document.documentElement.style.setProperty('--active-section-color', '#dc2626'); // red-600
      
  //     // Add event listeners to ensure section names appear on hover
  //     const markerElements = navbarRef.current.querySelectorAll('.group');
  //     markerElements.forEach(marker => {
  //       const sectionId = marker.querySelector('a')?.getAttribute('href')?.substring(1);
  //       if (sectionId) {
  //         const labelElement = marker.querySelector(`#${sectionId}-label`);
          
  //         marker.addEventListener('mouseenter', () => {
  //           if (labelElement) {
  //             animate(labelElement, {
  //               opacity: 1,
  //               duration: 200,
  //               easing: 'easeOutQuad'
  //             });
  //           }
  //         });
          
  //         marker.addEventListener('mouseleave', () => {
  //           // Only hide if not the active section
  //           const section = document.getElementById(sectionId);
  //           if (section) {
  //             const sectionTop = section.getBoundingClientRect().top;
  //             const sectionBottom = section.getBoundingClientRect().bottom;
  //             const isActive = sectionTop < window.innerHeight/2 && sectionBottom > 0;
              
  //             if (!isActive && labelElement) {
  //               animate(labelElement, {
  //                 opacity: 0,
  //                 duration: 200,
  //                 easing: 'easeOutQuad'
  //               });
  //             }
  //           }
  //         });
  //       }
  //     });
  //   }
  // }, [navbarRef]);

  // Cleanup
  useEffect(() => {
    scope.current = createScope({ root }).add(self => {
      // Camera viewport frame animation on scroll
      if (cameraFrameRef.current && cameraViewportRef.current && heroRootRef.current) {
        animate(cameraFrameRef.current, {
          padding: `80px`,
          ease: 'linear',
          autoplay: onScroll({
            target: heroRootRef.current,
            container: document.body,
            enter: {target: "top", container: "top"},
            leave: {target: "bottom", container: "bottom"},
            sync: 'linear',
            debug: true,
          })
        });

        animate(cameraViewportRef.current, {
          borderRadius: `8px`,
          ease: 'linear',
          autoplay: onScroll({
            target: heroRootRef.current,
            container: document.body,
            enter: {target: "top", container: "top"},
            leave: {target: "bottom", container: "bottom"},
            sync: 'linear',
            debug: true,
          })
        });
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
        {/* Site Navigation Bar - Gamified */}
        <nav ref={navbarRef} className="absolute top-0 left-0 h-screen flex flex-col items-center justify-center px-6 z-20 opacity-0">
          {/* Vertical progress line */}
          <div className="relative h-[60vh] flex flex-col items-center">
            {/* Background track */}
            <div className="absolute h-full w-[2px] bg-gray-800"></div>
            
            {/* Progress indicator (will be animated with scroll) */}
            <div className="absolute top-0 w-[2px] bg-red-600 origin-top shadow-glow" style={{ height: '0%', boxShadow: '0 0 10px #dc2626, 0 0 5px #dc2626' }} id="progress-line"></div>
            
            {/* Section markers */}
            <ul className="h-full w-full flex flex-col justify-between relative">
              {/* Home/Landing section */}
              <li className="relative" data-section="landing">
                <div className="absolute -left-[14px] transform -translate-y-1/2 w-[30px] h-[30px] rounded-full border-2 border-gray-800 bg-black flex items-center justify-center group cursor-pointer transition-all duration-300 hover:scale-110">
                  <a href="#landing" className="flex items-center w-full h-full justify-center relative">
                    <HomeSimple width={16} height={16} className="text-red-600" />
                    <span id="landing-label" className="absolute left-8 text-red-600 font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap tracking-wider">Landing</span>
                  </a>
                  <div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 bg-red-600 bg-opacity-20 active-glow"></div>
                </div>
              </li>
              
              {/* Projects section */}
              <li className="relative" data-section="projects">
                <div className="absolute -left-[14px] transform -translate-y-1/2 w-[30px] h-[30px] rounded-full border-2 border-gray-800 bg-black flex items-center justify-center group cursor-pointer transition-all duration-300 hover:scale-110">
                  <a href="#projects" className="flex items-center w-full h-full justify-center relative">
                    <Folder width={16} height={16} className="text-red-600" />
                    <span id="projects-label" className="absolute left-8 text-red-600 font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap tracking-wider">Projects</span>
                  </a>
                  <div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 bg-red-600 bg-opacity-20 active-glow"></div>
                </div>
              </li>
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
          <Projects />
      </div>
    </main>
  );
}
