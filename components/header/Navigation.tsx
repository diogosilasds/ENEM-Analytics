
import React from 'react';
import { LayoutDashboard, BookOpen, PenTool, Calculator, FlaskConical, Globe, ScanEye } from 'lucide-react';
import { ViewState } from '../../hooks/useDashboard';

interface NavigationProps {
  materiaSelecionada: ViewState;
  onNavClick: (id: ViewState) => void;
}

const navItems: { id: ViewState; label: string; shortLabel: string; icon: any; highlight?: boolean }[] = [
    { id: 'home', label: 'VISÃO GERAL', shortLabel: 'HOME', icon: LayoutDashboard },
    { id: 'humanas', label: 'HUMANAS', shortLabel: 'HUM', icon: Globe },
    { id: 'linguagens', label: 'LINGUAGENS', shortLabel: 'LIN', icon: BookOpen },
    { id: 'matematica', label: 'MATEMÁTICA', shortLabel: 'MAT', icon: Calculator },
    { id: 'natureza', label: 'NATUREZA', shortLabel: 'NAT', icon: FlaskConical },
    { id: 'redacao', label: 'REDAÇÃO', shortLabel: 'RED', icon: PenTool },
    { id: 'debug', label: 'DEBUG_MODE', shortLabel: 'DBG', icon: ScanEye },
];

export const mobileNavItems = navItems;

const Navigation: React.FC<NavigationProps> = ({ materiaSelecionada, onNavClick }) => {
  return (
    <nav className="hidden lg:flex items-center gap-1 xl:gap-3">
        {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = materiaSelecionada === item.id;
            if (item.id === 'home') return null;

            return (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
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
  );
};

export default Navigation;
