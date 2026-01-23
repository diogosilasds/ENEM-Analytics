
import React, { useRef, useState, useEffect } from 'react';
import { Calendar, ChevronDown, Check, History } from 'lucide-react';

export const YearSelector: React.FC<{
  selectedYear: number | null;
  availableYears: number[];
  onYearChange: (year: number) => void;
}> = ({ selectedYear, availableYears, onYearChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 sm:h-11 px-2.5 sm:px-4 flex items-center gap-2 border border-brand-accent/30 bg-brand-accent/5 text-[10px] sm:text-[11px] font-bold tracking-widest hover:bg-brand-accent/10 transition-all text-brand-accent rounded-sm"
      >
        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden xs:inline">{selectedYear ? String(selectedYear) : 'ANO'}</span>
        <span className="xs:hidden">{selectedYear ? String(selectedYear).slice(-2) : 'YR'}</span>
        <ChevronDown className={`hidden xs:inline w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 sm:w-56 bg-[#0c0c0e] border border-brand-accent shadow-2xl rounded-sm z-[60] animate-in fade-in zoom-in-95">
          <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
            {availableYears.map(year => (
              <button
                key={year}
                onClick={() => { onYearChange(year); setIsOpen(false); }}
                className={`w-full px-4 py-3 text-xs font-mono font-bold text-left hover:bg-brand-accent hover:text-black transition-colors flex justify-between items-center ${selectedYear === year ? 'bg-brand-accent/10 text-brand-accent' : 'text-brand-muted'}`}
              >
                <span>ENEM_{year}</span>
                {selectedYear === year && <Check className="w-4 h-4" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const AttemptSelector: React.FC<{
  attempts: { id: string, label: string, date: string }[];
  selectedId?: string | null;
  onChange?: (id: string) => void;
}> = ({ attempts, selectedId, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLabel = attempts.find(a => a.id === selectedId)?.label || (attempts.length > 0 ? attempts[0].label : 'ATUAL');

  return (
    <div className="relative" ref={ref}>
       <button 
         onClick={() => setIsOpen(!isOpen)}
         className="h-9 sm:h-11 px-2.5 sm:px-4 flex items-center gap-2 border border-brand-cyan/30 bg-brand-cyan/5 text-[10px] sm:text-[11px] font-bold tracking-widest hover:bg-brand-cyan/10 transition-all text-brand-cyan rounded-sm"
       >
         <History className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
         <span className="max-w-[80px] sm:max-w-none truncate">{currentLabel}</span>
         <ChevronDown className={`hidden xs:inline w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
       </button>
       
       {isOpen && (
         <div className="absolute top-full right-0 mt-2 w-48 sm:w-64 bg-[#0c0c0e] border border-brand-cyan shadow-2xl rounded-sm z-[60] animate-in fade-in zoom-in-95">
           <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
             {attempts.map(attempt => {
               const isSelected = attempt.id === selectedId || (!selectedId && attempt === attempts[0]);
               return (
                 <button
                   key={attempt.id}
                   onClick={() => { if(onChange) onChange(attempt.id); setIsOpen(false); }}
                   className={`w-full px-4 py-3 text-xs font-mono font-bold text-left hover:bg-brand-cyan hover:text-black transition-colors flex justify-between items-center ${isSelected ? 'bg-brand-cyan/10 text-brand-cyan' : 'text-brand-muted'}`}
                 >
                   <span className="truncate">{attempt.label}</span>
                   {isSelected && <Check className="w-4 h-4" />}
                 </button>
               )
             })}
           </div>
         </div>
       )}
    </div>
  );
};
