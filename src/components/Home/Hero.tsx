import React, { useEffect, useRef, useState } from "react";
import DarkVeil from "@/components/Animations/DarkVeil/DarkVeil";
import { useLoader } from "@/context/LoaderProvider";
import { animate, createScope } from "animejs";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

const Hero: React.FC<HeroProps> = () => {
  const scope = useRef<any>(null);
  const animationHolderRef = useRef<HTMLDivElement>(null);
  const contentHolderRef = useRef<HTMLDivElement>(null);

  const { isLoading } = useLoader();
  const [animationComplete, setAnimationComplete] = useState(false);

  // Initial viewport expansion animation after loader exits
  useEffect(() => {
    if (!isLoading && animationHolderRef.current && contentHolderRef.current && !animationComplete) {
      scope.current = createScope({ root: animationHolderRef.current }).add(self => {
        const timer = setTimeout(() => {
          if (animationHolderRef.current && contentHolderRef.current) {
            animate(animationHolderRef.current, {
              padding: '0px',
              duration: 1500,
              ease: 'outQuart'
            });
            animate(contentHolderRef.current, {
              borderRadius: '0px',
              duration: 1500,
              ease: 'outQuart',
              onComplete: () => {
                setAnimationComplete(true);
              }
            });
          }
        }, 1500);

        return () => clearTimeout(timer);
      });

      return () => scope.current?.revert();
    }
  }, [isLoading, animationComplete]);

  return (
    <section 
      id="landing" 
      className='w-full h-[200vh] relative'
    >
      {/* Entrance Animation Holder */}
      <div className="h-screen w-full sticky top-0">
        <div className="relative w-full h-full p-10" ref={animationHolderRef}>
          {/* DarkVeil background */}
          <div className="w-full h-full overflow-hidden bg-white relative rounded-lg" ref={contentHolderRef}>
            {/* Fixed canvas container */}
            <div className="absolute inset-0 w-full h-full">
              <DarkVeil 
                hueShift={0}
                noiseIntensity={0}
                scanlineIntensity={0.1}
                speed={0.5}
                scanlineFrequency={0}
                warpAmount={0.1}
                resolutionScale={1}
              />
            </div>
          
            {/* Content overlay */}
            <div className="flex flex-col justify-center items-center absolute inset-0 w-full h-full pointer-events-none">
              <div className="z-10 pointer-events-auto text-center">
                <h1 className='text-6xl md:text-7xl lg:text-8xl text-black font-bold mb-4'>
                  Avin Divakara<span className='text-red-600'>.</span>
                </h1>
                <p className='text-2xl md:text-3xl lg:text-4xl text-black'>
                  [AKA. AVDIV]
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;