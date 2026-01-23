
import React, { useState, useEffect } from 'react';
import { Menu, X, Wifi, Battery, Clock } from 'lucide-react';
import { MateriaData } from '../../types';
import { ViewState } from '../../hooks/useDashboard';
import Logo from '../header/Logo';
import Navigation, { mobileNavItems } from '../header/Navigation';
import { YearSelector, AttemptSelector } from '../header/Selectors';

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
  const [time, setTime] = useState(new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'}));

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';

    const timer = setInterval(() => {
        setTime(new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'}));
    }, 1000);
    return () => clearInterval(timer);
  }, [isMenuOpen]);

  const handleNavClick = (id: ViewState) => {
    onMateriaChange(id);
    setIsMenuOpen(false);
  };

  const showFilters = materiaSelecionada !== 'home' && materiaSelecionada !== 'debug';
  const showYearSelector = materiaSelecionada !== 'redacao';

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-[#030304]/80 backdrop-blur-xl">
        {/* HUD Top Decorative Line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-border to-transparent"></div>

        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 md:h-20 gap-2">
            
            <div className="flex items-center gap-6">
                <Logo onClick={() => handleNavClick('home')} />
                {/* Decorative Tech Lines */}
                <div className="hidden lg:flex flex-col gap-1">
                    <div className="flex gap-1">
                        <div className="w-1 h-1 bg-brand-muted opacity-20"></div>
                        <div className="w-1 h-1 bg-brand-muted opacity-20"></div>
                        <div className="w-1 h-1 bg-brand-accent animate-pulse"></div>
                    </div>
                    <div className="w-20 h-[1px] bg-brand-border"></div>
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4 lg:gap-8 xl:gap-12 flex-shrink">
              <Navigation materiaSelecionada={materiaSelecionada as ViewState} onNavClick={handleNavClick} />

              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                {showFilters && (
                  <div className="flex gap-1.5 sm:gap-3 items-center bg-[#0a0a0c] border border-brand-border p-1 rounded-sm">
                      {showYearSelector && (
                        <YearSelector 
                          selectedYear={selectedYear} 
                          availableYears={availableYears} 
                          onYearChange={onYearChange} 
                        />
                      )}

                      {availableAttempts.length > 0 && (
                        <AttemptSelector 
                          attempts={availableAttempts}
                          selectedId={selectedAttemptId}
                          onChange={onAttemptChange}
                        />
                      )}
                  </div>
                )}

                {/* HUD Stats (Hidden on Mobile) */}
                <div className="hidden xl:flex items-center gap-4 px-4 py-2 border-l border-brand-border text-[10px] font-mono text-brand-muted">
                    <div className="flex items-center gap-1.5">
                        <Wifi className="w-3 h-3 text-brand-cyan" />
                        <span>NET: 5G</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        <span>{time}</span>
                    </div>
                </div>

                <button 
                  className="lg:hidden w-10 h-10 flex items-center justify-center border border-brand-border bg-[#0f0f11] text-brand-text active:scale-95 transition-transform rounded-sm flex-shrink-0"
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

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 lg:hidden bg-[#030304]/95 backdrop-blur-xl pt-24 transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full p-6 space-y-2 overflow-y-auto">
            <p className="text-[10px] font-mono text-brand-accent uppercase tracking-[0.2em] mb-6 pl-2 border-l-2 border-brand-accent">
                Navegação do Sistema
            </p>
            {mobileNavItems.map((item) => {
                const isActive = materiaSelecionada === item.id;
                return (
                  <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between p-5 border transition-all relative group overflow-hidden mb-2 ${
                          isActive
                          ? 'bg-brand-accent/10 border-brand-accent text-white'
                          : 'bg-[#0f0f11] border-[#222] text-brand-muted hover:text-white hover:border-brand-text'
                      } cyber-shape`}
                  >
                      {/* Cyber Shape Border Fix */}
                      <div className="absolute inset-0 border border-current opacity-20 pointer-events-none"></div>

                      <div className="flex items-center gap-4 relative z-10">
                          <item.icon className={`w-5 h-5 ${isActive ? 'text-brand-accent' : ''}`} />
                          <span className="font-display font-bold text-sm tracking-widest uppercase">{item.label}</span>
                      </div>
                      {isActive && (
                         <div className="w-2 h-2 bg-brand-accent shadow-[0_0_10px_currentColor]"></div>
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
