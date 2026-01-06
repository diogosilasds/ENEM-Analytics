import React from 'react';
import { Terminal } from 'lucide-react';
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
    <div className="flex flex-col lg:flex-row lg:items-center gap-2 md:gap-4 lg:gap-8 animate-in fade-in slide-in-from-left duration-1000">
      <div className="flex items-start md:items-center gap-3 overflow-hidden">
        <Terminal className={`w-5 h-5 ${accentColor} flex-shrink-0 mt-1 md:mt-0`} />
        <h2 className={`text-xl sm:text-2xl md:text-3xl font-black font-display tracking-[0.2em] ${accentColor} italic uppercase break-words leading-tight`}>
          {title}
        </h2>
      </div>
      
      {/* Separador e Metadados */}
      <div className="flex flex-col lg:flex-row lg:items-center flex-grow gap-4">
          <div className={`hidden lg:block h-[2px] flex-grow bg-gradient-to-r ${lineColor} to-transparent opacity-20`}></div>
          
          <div className="flex items-center gap-4 text-[9px] font-mono text-brand-muted tracking-widest ml-8 lg:ml-0 whitespace-nowrap shrink-0">
             <span className="flex items-center gap-1.5">
                <span className={`w-1.5 h-1.5 ${dotColor} rounded-full animate-pulse`}></span>
                {isDebug ? 'AUDIT://ACTIVE' : 'ACCESS://GRANTED'}
             </span>
             <span className="opacity-40">|</span>
             <span>TERMINAL://{selectedYear || '2026'}</span>
          </div>
      </div>
    </div>
  );
};

export default SubjectHeader;