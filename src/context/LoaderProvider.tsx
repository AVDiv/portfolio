'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Loader, { LoaderHandle } from '@/components/Loader';

interface LoaderContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoaderContext = createContext<LoaderContextType | null>(null);

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};

interface LoaderProviderProps {
  children: React.ReactNode;
}

export function LoaderProvider({ children }: LoaderProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaderComplete, setIsLoaderComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [exitAnimation, setExitAnimation] = useState(false);

  // Reference to the loader component
  const loaderRef = React.useRef<React.ElementRef<typeof Loader>>(null);
  
  // Handle the exit animation when both site and loader are ready
  useEffect(() => {
    if (!isLoading && isLoaderComplete) {
      // Start exit animation
      setExitAnimation(true);
      
      // After animation completes, show the actual content
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 1000); // Animation duration
      
      return () => clearTimeout(timer);
    }
    
    // If site is loaded but loader is still running logs, force complete the logs
    if (!isLoading && !isLoaderComplete && loaderRef.current) {
      // The loader will detect this and speed up
      loaderRef.current.forceComplete();
    }
  }, [isLoading, isLoaderComplete]);

  // Auto-mark the site as loaded after a reasonable timeout (failsafe)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds max loading time
    
    return () => clearTimeout(timer);
  }, []);

  const handleLoaderComplete = () => {
    setIsLoaderComplete(true);
  };

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {!showContent && (
        <Loader ref={loaderRef} onComplete={handleLoaderComplete} />
      )}
      
      {exitAnimation && !showContent && (
        <div className="fixed inset-0 bg-black z-50 animate-fade-out flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white animate-scale-out"></div>
        </div>
      )}
      
      <div className={`${!showContent ? 'invisible' : 'animate-fade-in'}`}>
        {children}
      </div>
    </LoaderContext.Provider>
  );
}
