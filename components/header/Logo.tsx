
import React from 'react';
import { Terminal } from 'lucide-react';

interface LogoProps {
  onClick: () => void;
}

const Logo: React.FC<LogoProps> = ({ onClick }) => (
  <div className="flex items-center flex-shrink-0">
    <button 
      onClick={onClick}
      className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-all focus:outline-none group"
    >
      <div className="p-1.5 border border-[#333] bg-[#0f0f11] cyber-shape shrink-0 transition-all duration-300 group-hover:border-brand-accent/50">
        <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-brand-accent" />
      </div>
      <div className="flex flex-col text-left">
        <h1 className="text-lg sm:text-xl md:text-2xl font-black text-brand-text tracking-tighter font-display italic leading-none">
          ENEM<span className="text-brand-accent">_LOG</span>
        </h1>
        <span className="text-[8px] md:text-[10px] font-mono text-brand-muted tracking-[0.2em] uppercase hidden sm:block">
          Analytics System
        </span>
      </div>
    </button>
  </div>
);

export default Logo;
