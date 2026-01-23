
import React from 'react';
import { Zap } from 'lucide-react';

interface LogoProps {
  onClick: () => void;
}

const Logo: React.FC<LogoProps> = ({ onClick }) => (
  <div className="flex items-center flex-shrink-0">
    <button 
      onClick={onClick}
      className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-all focus:outline-none group"
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-accent flex items-center justify-center rounded-sm transition-all duration-300">
        <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-black fill-current rotate-12 transition-transform duration-[3000ms] ease-in-out group-hover:rotate-[372deg]" />
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
