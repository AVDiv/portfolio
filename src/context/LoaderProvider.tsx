'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import Loader from '@/components/Loader';

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

  // Reference to the loader component
  const loaderRef = React.useRef<React.ComponentRef<typeof Loader>>(null);
  
  // Handle the exit animation when both site and loader are ready
  useEffect(() => {
    if (!isLoading && isLoaderComplete) {
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

  // Auto-detect when the page is ready and mark as loaded
  useEffect(() => {
    const checkPageReady = () => {
      // Check if the document is fully loaded
      if (document.readyState === 'complete') {
        // Wait a bit more for any dynamic content to load
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1500); // Give some time for the boot sequence to show
        
        return () => clearTimeout(timer);
      }
    };

    // Check immediately
    checkPageReady();

    // Also listen for the load event
    if (document.readyState !== 'complete') {
      const handleLoad = () => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      };

      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Failsafe: Auto-mark the site as loaded after a maximum timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 15000);
    
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
      
      <div className={`${!showContent ? 'invisible' : 'animate-fade-in'}`}>
        {children}
      </div>
    </LoaderContext.Provider>
  );
}
