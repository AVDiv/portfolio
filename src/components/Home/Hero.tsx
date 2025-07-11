import React, { useEffect, useRef } from "react";
import Script from "next/script";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

const Hero: React.FC<HeroProps> = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

    useEffect(() => {
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

    // Wait a bit for the page to load completely
    const timer = setTimeout(initVantaEffect, 10);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (vantaEffect.current) {
        console.log('Cleaning up Vanta effect');
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  return (
    <section id="hero" className='w-screen h-screen p-10'>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js" strategy="afterInteractive"/>
      <Script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.topology.min.js" strategy="afterInteractive" />
      <div 
        ref={vantaRef}
        className="border-1 rounded-lg w-full h-full overflow-hidden relative bg-white"
        style={{ minHeight: '400px' }}
      >
        <div className="p-10 flex flex-col justify-center items-center relative w-full h-full">
          <div className="z-10">
            <h1 className='text-6xl'>Avin Divakara<span className='text-red-600'>.</span></h1>
            <p className='text-4xl'>[AKA. AVDIV]</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;