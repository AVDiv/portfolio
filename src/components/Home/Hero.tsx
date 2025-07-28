import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { useLoader } from "@/context/LoaderProvider";
import { animate, createScope, ScrollObserver } from 'animejs';

interface HeroProps {
  title?: string;
  subtitle?: string;
}

const Hero: React.FC<HeroProps> = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const scope = useRef<any>(null);
  const scrollObserver = useRef<any>(null);
  const { isLoading } = useLoader();
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const [p5Loaded, setP5Loaded] = useState(false);
  const [vantaLoaded, setVantaLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Load Vanta scripts and effects
  useEffect(() => {
    if (!isLoading && scriptsLoaded && animationComplete) {
      const initVantaEffect = () => {
        const checkAndInit = () => {
          if ((window as any).VANTA && (window as any).p5) {
            try {
              vantaEffect.current = (window as any).VANTA.TOPOLOGY({
                el: vantaRef.current,
                p5: (window as any).p5,
                color: 0x000000, // Black color for topology lines
                backgroundColor: 0xffffff // White background
              });
            } catch (error) {
              console.error("Error initializing Vanta effect:", error);
            }
          } else {
            setTimeout(checkAndInit, 100);
          }
        };
        checkAndInit();
      };

      // Wait a bit for the exit animation to complete
      const timer = setTimeout(initVantaEffect, 1200);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isLoading, scriptsLoaded, animationComplete]);

  // Check if both scripts are loaded
  useEffect(() => {
    if (p5Loaded && vantaLoaded) {
      setScriptsLoaded(true);
    }
  }, [p5Loaded, vantaLoaded]);

  // Animate the hero section when loader exits
  useEffect(() => {
    if (!isLoading && holderRef.current && !animationComplete && scriptsLoaded) {
      // Create scope for animations
      scope.current = createScope({ root: holderRef.current }).add(self => {
        // Start animation after a small delay to ensure content is visible
        const timer = setTimeout(() => {
          if (holderRef.current && vantaRef.current) {
            animate(holderRef.current, {
              padding: '0px',
              duration: 1500,
              ease: 'outQuart',
              onComplete: () => {
                setAnimationComplete(true);
              }
            });
            animate(vantaRef.current, {
              borderRadius: "0px",
              duration: 2500,
              ease: 'outQuart',
              onComplete: () => {
                setAnimationComplete(true);
              }
            });
          }
        }, 1500); // Small delay after content appears

        return () => clearTimeout(timer);
      });

      // Cleanup function
      return () => scope.current?.revert();
    }
  }, [isLoading, animationComplete, scriptsLoaded]);

  // Set up scroll observer to reverse animation on scroll
  useEffect(() => {
    if (animationComplete && holderRef.current && vantaRef.current) {
      scrollObserver.current = new ScrollObserver({
        target: holderRef.current,
        onUpdate: (self) => {
          // Calculate scroll progress (0 to 1)
          const progress = Math.min((self.progress - 0.5)*2, 1);
          console.log("Scroll progress:", progress);
          
          if (holderRef.current && vantaRef.current) {
            // Animate padding back based on scroll progress
            const paddingValue = progress * 20; // 0px to 40px
            const borderRadiusValue = progress * 8; // 0px to 8px (rounded-lg equivalent)
            
            animate(holderRef.current, {
              padding: `${paddingValue}px`,
              scale: 1 - progress * 0.1, // Scale down slightly
              duration: 0, // Immediate update for smooth scroll
            });
            
            animate(vantaRef.current, {
              borderRadius: `${borderRadiusValue}px`,
              duration: 0, // Immediate update for smooth scroll
            });
          }
        }
      });

      // Cleanup scroll observer
      return () => {
        if (scrollObserver.current) {
          scrollObserver.current.revert();
        }
      };
    }
  }, [animationComplete]);

  // Cleanup function
  useEffect(() => {
    return () => {
      if (vantaEffect.current) {
        console.log('Cleaning up Vanta effect');
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
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
    <section 
      id="hero" 
      className='w-screen h-[200vh] !p-0'
    >
      {!isLoading && (
        <>
          <Script 
            src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js" 
            strategy="afterInteractive"
            onLoad={() => setP5Loaded(true)}
            onError={() => console.error("Failed to load p5.js")}
          />
          <Script 
            src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.topology.min.js" 
            strategy="afterInteractive"
            onLoad={() => setVantaLoaded(true)}
            onError={() => console.error("Failed to load Vanta.js")}
          />
        </>
      )}
      <div ref={holderRef} className="h-screen w-screen sticky top-0 left-0 z-10 p-10">
        <div 
          ref={vantaRef}
          className="p-10 border-1 rounded-lg w-full h-full overflow-hidden bg-white"
          style={{ minHeight: '400px' }}
        >
          <div className="flex flex-col justify-center items-center relative w-full h-full">
            <div className="z-10">
              <h1 className='text-6xl'>Avin Divakara<span className='text-red-600'>.</span></h1>
              <p className='text-4xl'>[AKA. AVDIV]</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;