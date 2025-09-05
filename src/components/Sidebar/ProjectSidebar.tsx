'use client';
import React, { useState } from 'react';
import { NavArrowLeft, NavArrowRight } from 'iconoir-react';

interface CollapsibleSidebarProps {
  children: React.ReactNode;
}

const ProjectSidebar: React.FC<CollapsibleSidebarProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className='relative h-full'>
      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 left-0 right-0 z-30 bg-black p-2">
        <button
          onClick={() => setCollapsed(false)}
          className="w-full py-2 px-4 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
        >
          <NavArrowRight width={20} height={20} />
          Show Table of Contents
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky transition-all duration-300 top-0 left-0 h-full max-w-full z-40
          ${collapsed 
            ? '-translate-x-full lg:translate-x-0 lg:w-12 lg:p-2' 
            : 'translate-x-0 w-64'
          }
          min-h-[calc(100vh-1rem)] p-5 text-white bg-black/95 lg:bg-black backdrop-blur-md`}
      >
        {/* Close button for mobile */}
        <button
          className="absolute top-4 right-4 lg:right-[-16px] bg-red-600 rounded-full border border-white/10 p-1 
            lg:pr-5 hover:bg-red-700 transition-colors"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          type="button"
        >
          {collapsed ? 
            <NavArrowRight width={20} height={20} color='black' /> : 
            <NavArrowLeft width={20} height={20} color='black' />
          }
        </button>

        <nav className={`${collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-300`}>
          <h2 className="text-lg font-semibold mb-4">Outline</h2>
          <div className='border-l-2 border-slate-400'>
          {children}
          </div>
        </nav>

        {/* Overlay for mobile */}
        <div 
          className={`fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden ${!collapsed ? 'invisible opacity-0' : 'visible opacity-100'} transition-opacity`}
          onClick={() => setCollapsed(true)}
        />
      </aside>
    </div>
  );
};

export default ProjectSidebar;
