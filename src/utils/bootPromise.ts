"use client";
import { bootMessages } from '@/data/boot-messages';

// Create a promise that resolves when all boot messages should be displayed
export const createBootPromise = () => {
  return new Promise<void>((resolve) => {
    let totalTime = 0;

    // Calculate total time needed for all messages
    bootMessages.forEach(message => {
      totalTime += message.sleep || 100;
    });

    // Add extra buffer for the final completion state
    totalTime += 1000;

    // Resolve after all messages have been displayed
    setTimeout(() => {
      resolve();
    }, totalTime);
  });
};

// Single instance of the promise
export const bootPromise = createBootPromise();
