'use client';

import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { bootMessages } from '@/data/boot-messages';

export interface LoaderHandle {
  forceComplete: () => void;
}

interface LoaderProps {
  onComplete?: () => void;
}

const Loader = forwardRef<LoaderHandle, LoaderProps>(({ onComplete }, ref) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<Array<{ message: string; timestamp: number }>>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [forceCompleteFlag, setForceCompleteFlag] = useState(false);

  useImperativeHandle(ref, () => ({
    forceComplete: () => {
      setForceCompleteFlag(true);
    }
  }));

  useEffect(() => {
    if (isCompleted) return;

    let timeoutId: NodeJS.Timeout;

    const showNextMessage = () => {
      if (currentMessageIndex < bootMessages.length && !forceCompleteFlag) {
        const currentMessage = bootMessages[currentMessageIndex];
        setDisplayedMessages(prev => [...prev, { 
          message: currentMessage.message, 
          timestamp: Date.now() / 1000 
        }]);
        setCurrentMessageIndex(prev => prev + 1);
        
        // Schedule next message with appropriate delay
        timeoutId = setTimeout(showNextMessage, currentMessage.sleep || 100);
      } else {
        // All messages shown or force complete triggered
        setIsCompleted(true);
        onComplete?.();
      }
    };

    // Start showing messages
    timeoutId = setTimeout(showNextMessage, 100);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentMessageIndex, onComplete, forceCompleteFlag, isCompleted]);

  // Auto-scroll to bottom
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedMessages]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 h-full w-full overflow-hidden">
      <div className="w-full max-w-4xl h-full flex flex-col font-mono text-green-400 text-sm p-8">
        <div className="flex-1 overflow-y-auto">
          {displayedMessages.map((item, index) => (
            <div key={index} className="mb-1 whitespace-pre-wrap">
              <span className="text-green-300">[{item.timestamp.toFixed(6)}]</span> {item.message}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {!isCompleted && (
          <div className="flex items-center mt-4">
            <div className="w-2 h-4 bg-green-400 animate-pulse mr-2"></div>
            <span>Initializing system...</span>
          </div>
        )}
        
        {isCompleted && (
          <div className="text-center mt-4">
            <div className="text-green-300 mb-2">System ready.</div>
            <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
});

Loader.displayName = 'Loader';

export default Loader;
