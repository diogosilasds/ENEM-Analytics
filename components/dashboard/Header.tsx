
import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Calendar, ChevronDown, Check, Zap, LayoutDashboard, BookOpen, PenTool, Calculator, FlaskConical, Globe, History, ScanEye } from 'lucide-react';
import { MateriaData } from '../../types';
import { ViewState } from '../../hooks/useDashboard';

interface HeaderProps {
  data: MateriaData;
  materiaSelecionada: string;
  onMateriaChange: (value: ViewState) => void;
  selectedYear: number | null;
  availableYears: number[];
  onYearChange: (year: number) => void;
  availableAttempts?: { id: string, label: string, date: string }[];
  onAttemptChange?: (id: string) => void;
  selectedAttemptId?: string | null;
}

const Header: React.FC<HeaderProps> = ({ 
  data, 
  materiaSelecionada, 
  onMateriaChange,
  selectedYear,
  availableYears,
  onYearChange,
  availableAttempts = [],
  onAttemptChange,
  selectedAttemptId
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [isAttemptDropdownOpen, setIsAttemptDropdownOpen] = useState(false);
  
  const yearDropdownRef = useRef<HTMLDivElement>(null);
  const attemptDropdownRef = useRef<HTMLDivElement>(null);

  const navItems: { id: ViewState; label: string; shortLabel: string; icon: any; highlight?: boolean }[] = [
    { id: 'home', label: 'VISÃO GERAL', shortLabel: 'HOME', icon: LayoutDashboard },
    { id: 'humanas', label: 'HUMANAS', shortLabel: 'HUM', icon: Globe },
    { id: 'linguagens', label: 'LINGUAGENS', shortLabel: 'LIN', icon: BookOpen },
    { id: 'matematica', label: 'MATEMÁTICA', shortLabel: 'MAT', icon: Calculator },
    { id: 'natureza', label: 'NATUREZA', shortLabel: 'NAT', icon: FlaskConical },
    { id: 'redacao', label: 'REDAÇÃO', shortLabel: 'RED', icon: PenTool },
    { id: 'debug', label: 'DEBUG_MODE', shortLabel: 'DBG', icon: ScanEye },
  ];

  const handleNavClick = (id: ViewState) => {
    onMateriaChange(id);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target as Node)) {
        setIsYearDropdownOpen(false);
      }
      if (attemptDropdownRef.current && !attemptDropdownRef.current.contains(event.target as Node)) {
        setIsAttemptDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMenuOpen]);

  const currentAttemptLabel = availableAttempts.find(a => a.id === selectedAttemptId)?.label 
    || (availableAttempts.length > 0 ? availableAttempts[0].label : 'ATUAL');

  const showFilters = materiaSelecionada !== 'home' && materiaSelecionada !== 'debug';

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[#1f1f22] bg-[#050505]/95 backdrop-blur-md">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 md:h-24 gap-2">
            
            {/* Extremidade Esquerda: Logo */}
            <div className="flex items-center flex-shrink-0">
              <button 
                onClick={() => handleNavClick('home')}
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

            {/* Extremidade Direita: Nav + Filtros + Menu Mobile/Tablet */}
            <div className="flex items-center gap-2 md:gap-4 lg:gap-8 xl:gap-12 flex-shrink">
              
              {/* Menu Desktop - Apenas para telas LG (1024px+) para evitar colisão com filtros em tablets verticais */}
              <nav className="hidden lg:flex items-center gap-1 xl:gap-3">
                  {navItems.map((item) => {
                     const Icon = item.icon;
                     const isActive = materiaSelecionada === item.id;
                     if (item.id === 'home') return null;

                     return (
                       <button
                         key={item.id}
                         onClick={() => handleNavClick(item.id)}
                         className={`
                           relative flex items-center gap-2 px-3 xl:px-4 py-2 rounded-sm transition-all duration-200 group overflow-hidden border
                           ${isActive
                             ? item.highlight 
                               ? 'bg-brand-pink border-brand-pink text-white font-bold shadow-[0_0_15px_rgba(255,0,85,0.4)]'
                               : 'bg-brand-accent border-brand-accent text-black font-bold shadow-[0_0_15px_rgba(0,255,159,0.4)]'
                             : item.highlight
                               ? 'text-brand-pink border-brand-pink/30 hover:bg-brand-pink hover:text-white'
                               : 'text-brand-muted border-transparent hover:text-white hover:bg-white/5 hover:border-white/10'
                           }
                         `}
                       >
                         <Icon className={`w-4 h-4 ${isActive ? (item.highlight ? 'text-white' : 'text-black') : item.highlight ? 'text-brand-pink group-hover:text-white' : 'text-brand-accent opacity-70 group-hover:opacity-100'}`} />
                         <span className="text-[10px] xl:text-xs font-display tracking-widest uppercase whitespace-nowrap">
                           <span className="xl:hidden">{item.shortLabel}</span>
                           <span className="hidden xl:inline">{item.label}</span>
                         </span>
                         
                         {!isActive && (
                            <div className={`absolute bottom-0 left-0 w-full h-[1.5px] ${item.highlight ? 'bg-brand-pink' : 'bg-brand-accent'} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
                         )}
                       </button>
                     );
                  })}
              </nav>

              {/* Filtros e Dropdowns */}
              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                {showFilters && (
                  <div className="flex gap-1.5 sm:gap-3">
                      <div className="relative" ref={yearDropdownRef}>
                        <button 
                          onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                          className="h-9 sm:h-11 px-2.5 sm:px-4 flex items-center gap-2 border border-brand-accent/30 bg-brand-accent/5 text-[10px] sm:text-[11px] font-bold tracking-widest hover:bg-brand-accent/10 transition-all text-brand-accent rounded-sm"
                        >
                          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span className="hidden xs:inline">{selectedYear ? String(selectedYear) : 'ANO'}</span>
                          <span className="xs:hidden">{selectedYear ? String(selectedYear).slice(-2) : 'YR'}</span>
                          <ChevronDown className={`hidden xs:inline w-3 h-3 transition-transform ${isYearDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {isYearDropdownOpen && (
                          <div className="absolute top-full right-0 mt-2 w-40 sm:w-56 bg-[#0c0c0e] border border-brand-accent shadow-2xl rounded-sm z-[60] animate-in fade-in zoom-in-95">
                            <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
                              {availableYears.map(year => (
                                <button
                                  key={year}
                                  onClick={() => {
                                    onYearChange(year);
                                    setIsYearDropdownOpen(false);
                                  }}
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

                      {availableAttempts.length > 0 && (
                           <div className="relative" ref={attemptDropdownRef}>
                           <button 
                             onClick={() => setIsAttemptDropdownOpen(!isAttemptDropdownOpen)}
                             className="h-9 sm:h-11 px-2.5 sm:px-4 flex items-center gap-2 border border-brand-cyan/30 bg-brand-cyan/5 text-[10px] sm:text-[11px] font-bold tracking-widest hover:bg-brand-cyan/10 transition-all text-brand-cyan rounded-sm"
                           >
                             <History className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                             <span className="max-w-[60px] sm:max-w-none truncate">{currentAttemptLabel}</span>
                             <ChevronDown className={`hidden xs:inline w-3 h-3 transition-transform ${isAttemptDropdownOpen ? 'rotate-180' : ''}`} />
                           </button>
                           
                           {isAttemptDropdownOpen && (
                             <div className="absolute top-full right-0 mt-2 w-44 sm:w-56 bg-[#0c0c0e] border border-brand-cyan shadow-2xl rounded-sm z-[60] animate-in fade-in zoom-in-95">
                               <div className="max-h-60 overflow-y-auto p-1 custom-scrollbar">
                                 {availableAttempts.map(attempt => {
                                   const isSelected = attempt.id === selectedAttemptId || (!selectedAttemptId && attempt === availableAttempts[0]);
                                   return (
                                     <button
                                       key={attempt.id}
                                       onClick={() => {
                                         if(onAttemptChange) onAttemptChange(attempt.id);
                                         setIsAttemptDropdownOpen(false);
                                       }}
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
                      )}
                  </div>
                )}

                {/* Botão Menu - Visível em mobile e tablets (até 1023px) */}
                <button 
                  className="lg:hidden w-10 h-10 flex items-center justify-center border border-[#1f1f22] bg-[#0f0f11] text-brand-text active:scale-95 transition-transform rounded-sm flex-shrink-0"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label={isMenuOpen ? "Fechar Menu" : "Abrir Menu"}
                >
                  {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Drawer Navegação (Mobile & Tablet) */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden bg-[#050505] pt-20 transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full p-6 space-y-2 overflow-y-auto">
            <p className="text-[10px] font-mono text-brand-muted uppercase tracking-[0.2em] mb-4 pl-2">Navegação do Sistema</p>
            {navItems.map((item) => {
                const isActive = materiaSelecionada === item.id;
                
                return (
                  <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between p-4 border transition-all relative group overflow-hidden ${
                          isActive
                          ? 'bg-brand-accent border-brand-accent text-black font-bold shadow-[0_0_10px_rgba(0,255,159,0.3)]'
                          : 'bg-[#0f0f11] border-[#1f1f22] text-brand-muted hover:text-white hover:bg-white/5 hover:border-white/10'
                      }`}
                  >
                      <div className="flex items-center gap-4 relative z-10">
                          <item.icon className="w-5 h-5" />
                          <span className="font-display font-bold text-sm tracking-widest uppercase">{item.label}</span>
                      </div>
                      
                      {!isActive && (
                         <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                      )}
                  </button>
                );
            })}
        </div>
      </div>
    </>
  );
};

export default Header;
