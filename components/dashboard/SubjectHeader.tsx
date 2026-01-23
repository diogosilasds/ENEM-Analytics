
import React from 'react';
import { Terminal, Activity, Zap } from 'lucide-react';
import { ViewState } from '../../hooks/useDashboard';

interface SubjectHeaderProps {
  view: ViewState;
  selectedYear: number | null;
}

const sectionTitles: Record<string, string> = {
  humanas: 'SECTION://HUMANAS',
  linguagens: 'SECTION://LINGUAGENS',
  matematica: 'SECTION://MATEMÁTICA',
  natureza: 'SECTION://NATUREZA',
  redacao: 'SECTION://REDAÇÃO',
  debug: 'SYSTEM://AUDIT_LOG',
};

const SubjectHeader: React.FC<SubjectHeaderProps> = ({ view, selectedYear }) => {
  const isDebug = view === 'debug';
  const title = sectionTitles[view] || `SECTION://${view.toUpperCase()}`;
  
  // Dynamic coloring based on view type
  const accentColor = isDebug ? 'text-brand-pink' : 'text-brand-accent';
  const dotColor = isDebug ? 'bg-brand-pink' : 'bg-brand-accent';
  const lineColor = isDebug ? 'from-brand-pink' : 'from-brand-accent';

  return (
    <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-left duration-1000 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-end gap-2 md:gap-4 lg:gap-8">
        <div className="flex items-start md:items-center gap-3 overflow-hidden">
          <div className="p-1.5 border border-[#333] bg-[#0f0f11] cyber-shape">
             <Terminal className={`w-6 h-6 ${accentColor}`} />
          </div>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-black font-display tracking-[0.15em] ${accentColor} italic uppercase break-words leading-none drop-shadow-[0_0_8px_rgba(0,0,0,0.5)] glitch-text`} data-text={title}>
            {title}
          </h2>
        </div>
        
        {/* Metadados Técnicos */}
        <div className="flex items-center gap-4 text-[9px] font-mono text-brand-muted tracking-widest ml-12 lg:ml-0 whitespace-nowrap shrink-0 opacity-80">
            <div className="px-2 py-1 bg-[#0f0f11] border border-[#333] flex items-center gap-2">
                <span className={`w-1.5 h-1.5 ${dotColor} rounded-full animate-pulse shadow-[0_0_5px_currentColor]`}></span>
                {isDebug ? 'AUDIT://ACTIVE' : 'ACCESS://GRANTED'}
            </div>
            <div className="h-px w-8 bg-brand-border"></div>
            <div className="px-2 py-1 bg-[#0f0f11] border border-[#333]">
                TERMINAL ID: {selectedYear || '2026'}
            </div>
        </div>
      </div>

      {/* Tech Line Decoration */}
      <div className="w-full h-4 flex items-center gap-1 mt-2 relative">
          <div className={`h-[2px] w-24 bg-gradient-to-r ${lineColor} to-transparent`}></div>
          <div className={`h-[4px] w-[4px] ${dotColor} rotate-45`}></div>
          <div className={`h-[1px] w-4 bg-[#333]`}></div>
          <div className={`h-[4px] w-[4px] ${dotColor} rotate-45`}></div>
          
          <div className="h-[1px] flex-grow bg-[#1f1f22] relative overflow-hidden flex items-center">
             {/* Moving Data Packets */}
             <div className={`absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-transparent via-${isDebug ? 'brand-pink' : 'brand-accent'} to-transparent opacity-40 animate-slide-right`}></div>
             
             {/* Ruler Ticks */}
             <div className="absolute right-0 top-0 h-full w-32 flex justify-end gap-2 opacity-30">
                {[...Array(10)].map((_, i) => <div key={i} className="w-[1px] h-full bg-brand-muted"></div>)}
             </div>
          </div>
          
          <div className="px-2 font-mono text-[8px] text-brand-muted border border-[#333] bg-[#050505]">
             SYNC_RDY
          </div>
      </div>
    </div>
  );
};

export default SubjectHeader;
