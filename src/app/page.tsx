"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useLoader } from "@/context";

export default function Home() {
  const { setIsLoading } = useLoader();
  
  // Signal that the page content is loaded
  useEffect(() => {
    // Small delay to simulate actual content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [setIsLoading]);
  
  return (
    <main>
      <div className="text-2xl">
      Whereas disregard and contempt for human rights have resulted
      </div>
    </main>
  );
}
