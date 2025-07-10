'use client';

import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { bootMessages } from '@/data/boot-messages';

interface LoaderProps {
  onComplete?: () => void;
}

export interface LoaderHandle {
  forceComplete: () => void;
}

const Loader = forwardRef<LoaderHandle, LoaderProps>(function LoaderComponent({ onComplete }, ref) {
  const [displayedLines, setDisplayedLines] = useState<Array<{message: string, timestamp: string}>>([]);
  const [isComplete, setIsComplete] = useState(false);
  // Track if we're force-completing due to page being ready before log is done
  const [isForceCompleting, setIsForceCompleting] = useState(false);
  
  // Method to force completion - will be called by the parent component
  useImperativeHandle(ref, () => ({
    forceComplete: () => {
      setIsForceCompleting(true);
    }
  }));

  // Reference for auto-scrolling
  const logsContainerRef = React.useRef<HTMLDivElement>(null);
  
  // More robust auto-scroll effect
  useEffect(() => {
    const scrollToBottom = () => {
      if (logsContainerRef.current) {
        // Direct assignment for more reliable scrolling
        logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
      }
    };
    
    // Use requestAnimationFrame for better timing with the render cycle
    requestAnimationFrame(() => {
      scrollToBottom();
      
      // Double-check with a small delay as backup
      setTimeout(scrollToBottom, 50);
    });
  }, [displayedLines]);
  
  // Additional scroll check on mount and window resize
  useEffect(() => {
    const scrollToBottom = () => {
      if (logsContainerRef.current) {
        logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
      }
    };
    
    // Initial scroll
    scrollToBottom();
    
    // Handle window resize events
    window.addEventListener('resize', scrollToBottom);
    
    return () => {
      window.removeEventListener('resize', scrollToBottom);
    };
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout | null = null;

    const processNextMessage = () => {
      if (currentIndex < bootMessages.length) {
        const currentMessage = bootMessages[currentIndex];
        const timestamp = new Date().toLocaleTimeString();
        
        setDisplayedLines(prev => {
          const newLines = [...prev, { message: currentMessage.message, timestamp }];
          // Force scroll after state update
          setTimeout(() => {
            if (logsContainerRef.current) {
              logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
            }
          }, 0);
          return newLines;
        });
        
        currentIndex++;
        
        // If we're force completing (because the page loaded before logs finished),
        // use a much faster speed to quickly show the remaining logs
        const delay = isForceCompleting ? 10 : currentMessage.sleep;
        
        // Use the sleep time from the data file
        timeoutId = setTimeout(processNextMessage, delay);
      } else if (!isComplete) {
        // Hold the final screen for a moment before completing
        timeoutId = setTimeout(() => {
          setIsComplete(true);
          onComplete?.();
        }, 500);
      }
    };

    // Start the process
    processNextMessage();

    // Cleanup function
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isComplete, onComplete, isForceCompleting]);

  return (
    <div className="fixed inset-0 bg-black text-green-400 font-mono text-sm overflow-hidden">
      <div 
        ref={logsContainerRef} 
        className="p-4 h-full overflow-y-auto auto-scroll-hidden"
        style={{ maxHeight: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <div className="space-y-0 flex-grow">
          {displayedLines.map((line, index) => (
            <div key={index} className="whitespace-nowrap">
              <span className="text-gray-500 mr-2">[{line.timestamp}]</span>
              {line.message}
            </div>
          ))}
        </div>
        
        {displayedLines.length >= bootMessages.length && !isComplete && (
          <div className="mt-4 text-white" key="login-prompt">
            <div className="mb-2">
              Debian GNU/Linux 12 portfolio tty1
            </div>
            <div className="mb-4">
              portfolio login: <span className="animate-pulse">█</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default Loader;
