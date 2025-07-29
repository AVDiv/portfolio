"use client";
import React, { useEffect, useRef, useState } from "react";
import { useLoader } from "@/context/LoaderProvider";
import { animate, ScrollObserver } from 'animejs';
import Hero from "@/components/Home/Hero";
import Projects from "@/components/Home/Projects";

export default function Home() {
  const cameraFrameRef = useRef<HTMLDivElement>(null);
  const cameraViewportRef = useRef<HTMLDivElement>(null);
  const scope = useRef<any>(null);
  const scrollObserver = useRef<any>(null);

  // Camera viewport frame animation
  useEffect(() => {
    if (cameraFrameRef.current) {
      scrollObserver.current = new ScrollObserver({
        target: document.body,
        onUpdate: (self) => {
          const scrollY = window.scrollY;
          const innerHeight = window.innerHeight;
          const progress = Math.min(scrollY / innerHeight, 1);
          
          if (cameraFrameRef.current && cameraViewportRef.current) {
            // Animate the camera viewport frame from 0px to 80px padding
            const paddingValue = progress * 60;

            // Update the viewport padding to create the camera frame effect
            animate(cameraFrameRef.current, {
              padding: `${paddingValue}px`,
              duration: 0,
              ease: 'linear'
            });

            animate(cameraViewportRef.current, {
              borderRadius: `${8 * progress}px`,
              duration: 0,
              ease: 'linear'
            });
            
          }
        }
      });

      return () => {
        if (scrollObserver.current) {
          scrollObserver.current.revert();
        }
      };
    }
  }, [cameraFrameRef, cameraViewportRef]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (scrollObserver.current) {
        scrollObserver.current.revert();
        scrollObserver.current = null;
      }
      if (scope.current) {
        scope.current.revert();
        scope.current = null;
      }
    };
  }, []);

  return (
    <main className="bg-black relative">
      {/* Camera Viewport Frame */}
      <div className="fixed top-0 left-0 h-screen w-screen z-10" ref={cameraFrameRef}>
        <div className="h-full w-full shadow-[0_0_0_90px_rgba(0,0,0,1)] overflow-hidden" ref={cameraViewportRef}>
        </div>
      </div>
      <div className="w-full">
          {/* Sections of the page */}
          <Hero />
          <Projects />
      </div>
    </main>
  );
}
