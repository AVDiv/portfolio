import React from "react";
import { HomeSimple } from "iconoir-react";

interface NavbarMarkerProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  dataSection: string;
  isHorizontal?: boolean;
}

const NavbarMarker: React.FC<NavbarMarkerProps> = ({ href, label, icon, dataSection, isHorizontal = false }) => (
  <li className="relative flex flex-col items-center" data-section={dataSection}>
    {/* Label styling based on layout */}
    <span
      id={`${dataSection}-label`}
      className={`${isHorizontal ? 'mb-2' : 'mb-2'} text-red-600 font-semibold whitespace-nowrap tracking-wider text-sm opacity-0 transition-all duration-300 ease-out`}
      style={isHorizontal ? { 
        // Horizontal layout: normal text below the icon
        transform: 'scale(0.8)',
        transformOrigin: 'center'
      } : { 
        // Vertical layout: sideways text 
        writingMode: 'sideways-lr', 
        transform: 'translateX(-100%) rotate(180deg) scale(0.8)',
        transformOrigin: 'center'
      }}
    >
      {label}
    </span>
    <div className="relative w-[30px] h-[30px] rounded-full border-2 border-gray-800 bg-black flex items-center justify-center group cursor-pointer transition-all duration-300 hover:scale-110 marker-button z-30">
      <a href={href} className="flex items-center w-full h-full justify-center relative z-30">
        {icon}
      </a>
      <div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 bg-red-600 bg-opacity-20 active-glow"></div>
    </div>
  </li>
);

export default NavbarMarker;
