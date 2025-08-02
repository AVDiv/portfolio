'use client';
import React, { useState } from 'react';
import { NavArrowLeft, NavArrowRight } from 'iconoir-react';

interface CollapsibleSidebarProps {
  children: React.ReactNode;
}

const ProjectSidebar: React.FC<CollapsibleSidebarProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className='relative h-full'>
      <aside
        className={`sticky transition-all duration-300 max-w-full h-full min-h-[calc(100vh-2.5rem)] p-5 text-white bg-black ${collapsed ? 'w-12 p-2' : 'w-64'}`}
        style={{ overflow: 'hidden' }}
      >
        <button
          className="absolute top-4 right-[-16px] z-10 bg-red-600 rounded-full border border-white/10 p-1 pr-5 hover:bg-red-700 transition-colors"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          type="button"
        >
          {collapsed ? <NavArrowRight width={20} height={20} color='black' /> : <NavArrowLeft width={20} height={20} color='black' />}
        </button>
        <nav className={`${collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-300`}>{children}</nav>
      </aside>
    </div>
  );
};

export default ProjectSidebar;
