'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { NavArrowLeft, NavArrowRight, Xmark, ArrowEnlargeTag, GithubCircle, Page } from 'iconoir-react';

interface TechStack {
  category: string;
  items: string[];
}

interface ProjectLink {
  url: string;
  icon: string;
  text: string;
}

interface ProjectImage {
  url: string;
  alt: string;
}

interface Capability {
  title: string;
  description: string;
}

interface ArchitectureDetail {
  title: string;
  description: string;
}

interface ProjectContentProps {
  techStack: TechStack[];
  images?: ProjectImage[];
  links?: ProjectLink[];
  capabilities?: Capability[];
  architectureDetails?: ArchitectureDetail[];
}

type TabType = 'overview' | 'tech' | 'architecture';

export function ProjectContent({ 
  techStack, 
  images = [], 
  links = [],
  capabilities = [],
  architectureDetails = []
}: ProjectContentProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying || images.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'tech', label: 'Tech Stack' },
    { id: 'architecture', label: 'Architecture' }
  ] as const;

  const renderTabContent = (tab: TabType) => {
    switch (tab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {images.length > 0 && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <div className="relative h-full group">
                  {images.map((image, idx) => (
                    <div
                      key={idx}
                      className={`absolute inset-0 transition-opacity duration-500`}
                      style={{
                        opacity: idx === currentSlide ? 1 : 0,
                        pointerEvents: idx === currentSlide ? 'auto' : 'none'
                      }}
                    >
                      <button
                        onClick={() => setIsFullscreen(true)}
                        className="w-full h-full group/image"
                        aria-label="View image fullscreen"
                      >
                        <Image
                          src={image.url}
                          alt={image.alt}
                          fill
                          className="object-cover cursor-zoom-in"
                          priority={idx === 0}
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/image:opacity-100 transition-opacity">
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <ArrowEnlargeTag className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      </button>
                    </div>
                  ))}
                  
                  {/* Navigation buttons */}
                  <button 
                    onClick={() => {
                      setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
                      setIsAutoPlaying(false);
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white 
                      opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
                    aria-label="Previous image"
                  >
                    <NavArrowLeft className="w-6 h-6" />
                  </button>
                  
                  <button 
                    onClick={() => {
                      setCurrentSlide((prev) => (prev + 1) % images.length);
                      setIsAutoPlaying(false);
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white 
                      opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
                    aria-label="Next image"
                  >
                    <NavArrowRight className="w-6 h-6" />
                  </button>

                  {/* Image indicators with previews */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((image, idx) => (
                      <div key={idx} className="relative group/indicator">
                        <button
                          onClick={() => {
                            setCurrentSlide(idx);
                            setIsAutoPlaying(false);
                          }}
                          className={`w-2 h-2 rounded-full transition-all
                            ${idx === currentSlide 
                              ? 'bg-red-500 w-4' 
                              : 'bg-slate-500 hover:bg-slate-400'}`}
                        />
                        
                        {/* Preview tooltip */}
                        <div className="absolute bottom-full mb-2 pb-2 opacity-0 group-hover/indicator:opacity-100 transition-opacity">
                          <div className="relative w-32 h-20 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                            <Image
                              src={image.url}
                              alt={image.alt}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                
                {capabilities && capabilities.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-black mb-2">Key Capabilities</h4>
                    <ul className="space-y-2 text-sm">
                      {capabilities.map((capability, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-500"></span>
                          <span className="text-slate-700">{capability.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {links.length > 0 && (
                <div>
                  <h4 className="text-black mb-3">Project Links</h4>
                  <div className="grid gap-3">
                    {links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 p-3 rounded-lg 
                          bg-slate-300 border border-slate-200
                          transition-colors duration-500 hover:border-red-900/50 hover:bg-black"
                      >
                        <div className="w-5 h-5">
                          {link.icon === 'github' ? (
                            <GithubCircle className="w-full h-full text-red-700 group-hover:text-white transition-colors duration-500" />
                          ) : link.icon === 'page' ? (
                            <Page className="w-full h-full text-red-700 group-hover:text-white transition-colors duration-500" />
                          ) : null}
                        </div>
                        <span className="text-sm text-black font-semibold group-hover:text-white transition-colors duration-500">
                          {link.text}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 'tech':
        return (
          <div className="space-y-4">
            {techStack.map((category, index) => (
              <div key={index}>
                <h4 className="text-sm font-medium text-black mb-2">
                  {category.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm font-medium rounded-full 
                        bg-red-500 text-white border border-slate-100"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 'architecture':
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              {architectureDetails.map((detail, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-200 border border-slate-100 hover:border-slate-400 transition-colors">
                  <h4 className="text-red-400 font-medium mb-2">{detail.title}</h4>
                  <p className="text-sm text-slate-800">
                    {detail.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  // Fullscreen Modal
  const FullscreenModal = () => {
    if (!isFullscreen) return null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
      if (e.key === 'ArrowLeft') setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') setCurrentSlide((prev) => (prev + 1) % images.length);
    };

    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
        <div className="relative w-full h-full flex items-center justify-center p-4">
          {/* Close button */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black transition-colors"
            aria-label="Close fullscreen view"
          >
            <Xmark className="w-6 h-6" />
          </button>

          {/* Navigation buttons */}
          <button 
            onClick={() => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-4 p-2 rounded-full bg-black/50 text-white hover:bg-black transition-colors"
            aria-label="Previous image"
          >
            <NavArrowLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={() => setCurrentSlide((prev) => (prev + 1) % images.length)}
            className="absolute right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black transition-colors"
            aria-label="Next image"
          >
            <NavArrowRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div className="relative max-w-[90vw] max-h-[90vh] w-full h-full">
            <Image
              src={images[currentSlide].url}
              alt={images[currentSlide].alt}
              fill
              className="object-contain"
              quality={100}
              priority
            />
          </div>

          {/* Image caption */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm px-4 py-2 bg-black/50 rounded-full">
            {images[currentSlide].alt}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <FullscreenModal />
      <div className="mb-12 p-6 rounded-xl bg-white backdrop-blur-sm border border-slate-300 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:border-r border-slate-300 pr-8">
            <nav className="flex flex-col space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-left rounded-lg font-semibold transition-colors
                    ${activeTab === tab.id
                      ? 'bg-slate-300 text-red-600 border border-slate-200'
                      : 'text-slate-600 hover:bg-slate-200'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="lg:col-span-2">
            {renderTabContent(activeTab)}
          </div>
        </div>
      </div>
    </>
  );
}
