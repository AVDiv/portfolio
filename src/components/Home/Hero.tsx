import React, { Ref, useEffect, useRef, useState } from "react";
import DarkVeil from "@/components/Animations/DarkVeil/DarkVeil";
import { useLoader } from "@/context/LoaderProvider";
import { animate, createScope, onScroll } from "animejs";

interface HeroProps {
  rootRefSetter?: Ref<any>;
}

const Hero: React.FC<HeroProps> = ({ rootRefSetter }) => {
  const root = useRef<any>(null);
  const scope = useRef<any>(null);
  const animationHolderRef = useRef<HTMLDivElement>(null);
  const slideHolderRef = useRef<HTMLDivElement>(null);
  const contentOverlayRef = useRef<HTMLDivElement>(null);

  const { isLoading } = useLoader();
  const [animationComplete, setAnimationComplete] = useState(false);

  // AnimeJS Scope
  useEffect(() => {
      scope.current = createScope({ root }).add(self => {
        self?.add("initHero", () => {
          if (animationHolderRef.current && slideHolderRef.current) {
            animate(animationHolderRef.current, {
              padding: '0px',
              duration: 1500,
              ease: 'outQuart',
              delay: 1500,
            });
            animate(animationHolderRef.current, {
              backgroundColor: '#FFFFFF',
              duration: 50,
              delay: 3000,
            });
            animate(slideHolderRef.current, {
              borderRadius: '0px',
              duration: 1500,
              delay: 1500,
              ease: 'outQuart',
              onComplete: () => {
                setAnimationComplete(true);
              }
            });
          }
        });
      });

      return () => scope.current?.revert();
  }, []);

  // OnScroll Blur Effect - separate from scope
  useEffect(() => {
    if (slideHolderRef.current && contentOverlayRef.current && root.current && animationComplete) {
      console.log("Setting up scroll animation");
      
      const scrollBlurAnimation = animate(slideHolderRef.current, {
        filter: 'blur(20px)',
        ease: 'linear',
        autoplay: onScroll({
          target: root.current,
          container: document.body,
          enter: {target: "top", container: "top"},
          leave: {target: "bottom", container: "bottom"},
          sync: 'linear',
          debug: true,
        })
      });

      const scrollContentOverlayAnimation = animate(contentOverlayRef.current, {
        opacity: -0.1,
        scale: 0.9,
        ease: 'linear',
        autoplay: onScroll({
          target: root.current,
          container: document.body,
          enter: {target: "top", container: "top"},
          leave: {target: "bottom", container: "bottom"},
          sync: 'linear',
          debug: true,
        })
      });;
      

      return () => {
        if (scrollBlurAnimation && scrollBlurAnimation.revert && scrollContentOverlayAnimation && scrollContentOverlayAnimation.revert) {
          scrollBlurAnimation.revert();
          scrollContentOverlayAnimation.revert();
        }
      };
    }
  }, [animationComplete]); // Only set up after initial animation

  // Initial Animation Trigger
  useEffect(() => {
    if (!isLoading && !animationComplete) {
      scope.current?.methods.initHero();
    }
  }, [isLoading, animationComplete]);

  // Set root ref if provided
  useEffect(() => {
    if (rootRefSetter && root.current) {
      if (typeof rootRefSetter === 'function') {
        rootRefSetter(root.current);
      } else {
        rootRefSetter.current = root.current;
      }
    }
  }, [rootRefSetter, root.current]);


  return (
    <section 
      id="landing" 
      className='w-full h-[200vh] relative'
      ref={root}
    >
      {/* Entrance Animation Holder */}
      <div className="h-screen w-full sticky top-0">
        <div className="relative w-full h-full p-10 bg-black" ref={animationHolderRef}>
          {/* DarkVeil background */}
          <div className="w-full h-full overflow-hidden bg-white relative rounded-lg" ref={slideHolderRef}>
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
            <div className="flex flex-col justify-center items-center absolute inset-0 w-full h-full pointer-events-none" ref={contentOverlayRef}>
              <div className="z-10 pointer-events-auto text-center">
                <h1 className='text-6xl md:text-7xl lg:text-8xl text-black font-bold mb-4'>
                  Avin Divakara<span className='text-red-600'>.</span>
                </h1>
                <p className='text-2xl md:text-3xl lg:text-4xl text-black'>
                  [AKA. AVDiv]
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