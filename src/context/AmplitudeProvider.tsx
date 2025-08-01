"use client";
import React, { createContext, useContext, useEffect, useRef } from 'react';
import * as amplitude from '@amplitude/analytics-browser';
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser';
import { v4 as uuidv4 } from 'uuid';

interface AmplitudeContextType {
  amplitude: typeof amplitude;
  isInitialized: boolean;
  environment: string;
  isDevelopment: boolean;
}

const AmplitudeContext = createContext<AmplitudeContextType | null>(null);

interface AmplitudeProviderProps {
  children: React.ReactNode;
}

export function AmplitudeProvider({ children }: AmplitudeProviderProps) {
  const isInitialized = useRef(false);
  const environment = process.env.NODE_ENV || 'development';
  const isDevelopment = environment === 'development';

  useEffect(() => {
    // Ensure amplitude is only initialized once during the lifecycle of the application
    if (!isInitialized.current && typeof window !== 'undefined') {
      const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
      const environment = process.env.NODE_ENV || 'development';
      const isDevelopment = environment === 'development';
      
      if (!apiKey) {
        console.warn('Amplitude API key not found. Please set NEXT_PUBLIC_AMPLITUDE_API_KEY in your environment variables.');
        return;
      }

      // Add Session Replay to the Amplitude instance with environment-based sampling
      amplitude.add(sessionReplayPlugin({ 
        sampleRate: isDevelopment ? 1 : 1 // Keep full sampling for both, but you can adjust prod sampling
      }));
      
      // Initialize Amplitude with the API key from environment variables
      amplitude.init(apiKey, {
        serverZone: 'EU',
        fetchRemoteConfig: true,
        autocapture: true,
        // Add environment-specific configuration
        defaultTracking: {
          attribution: true,
          pageViews: true,
          sessions: true,
          formInteractions: true,
          fileDownloads: true
        }
      });

      // Set environment-specific user properties to isolate data
      const environmentIdentify = new amplitude.Identify()
        .set('environment', environment)
        .set('app_version', process.env.NEXT_PUBLIC_APP_VERSION || 'unknown')
        .set('build_timestamp', new Date().toISOString());
      
      amplitude.identify(environmentIdentify);

      // Set a unique device ID prefix for development to avoid conflicts
      if (!localStorage.getItem('device_id')) {
        localStorage.setItem('device_id', uuidv4());
      }
      const currentDeviceId = localStorage.getItem('device_id');
      amplitude.setDeviceId(isDevelopment? `dev_${currentDeviceId}` :currentDeviceId as string);
      
      isInitialized.current = true;
    }
  }, []);

  const contextValue: AmplitudeContextType = {
    amplitude,
    isInitialized: isInitialized.current,
    environment,
    isDevelopment,
  };

  return (
    <AmplitudeContext.Provider value={contextValue}>
      {children}
    </AmplitudeContext.Provider>
  );
}

export function useAmplitude() {
  const context = useContext(AmplitudeContext);
  if (!context) {
    throw new Error('useAmplitude must be used within an AmplitudeProvider');
  }
  return context;
}

// Utility function for environment-aware event tracking
export function trackAmplitudeEvent(eventName: string, properties?: Record<string, any>) {
  const environment = process.env.NODE_ENV || 'development';
  const isDevelopment = environment === 'development';
  
  // Add environment prefix to event name for development
  const prefixedEventName = isDevelopment ? `[DEV] ${eventName}` : eventName;
  
  // Extract utm_source from URL if available (client-side only)
  let utmSource: string | null = null;
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    utmSource = urlParams.get('utm_source');
  }
  
  // Add environment properties and utm_source to all events
  const environmentProps = {
    ...properties,
    environment,
    timestamp: new Date().toISOString(),
    isDevelopment,
    ...(utmSource && { utm_source: utmSource }),
  };
  
  amplitude.track(prefixedEventName, environmentProps);
}
