
import React from 'react';
import { AlertOctagon, Activity, ShieldCheck, Crosshair, ArrowUpRight } from 'lucide-react';
import { DebugReport } from '../../types';

const DebugKPIs: React.FC<{ report: DebugReport }> = ({ report }) => {
    // Calcula integridade como inverso da taxa de erro global (0-100%)
    const integrity = Math.max(0, 100 - report.globalErrorRate).toFixed(1);

    const cards = [
        {
            label: 'FALHAS TOTAIS',
            value: report.totalErrors,
            sub: 'LOG_COUNT',
            icon: AlertOctagon,
            color: 'group-hover:text-white',
        },
        {
            label: 'ZONA CRÍTICA',
            value: report.criticalZoneErrors,
            sub: 'NÍVEIS < 650',
            icon: Activity,
            color: 'group-hover:text-brand-pink',
        },
        {
            label: 'INTEGRIDADE',
            value: `${integrity}%`,
            sub: 'SYS_STATUS',
            icon: ShieldCheck,
            color: 'group-hover:text-brand-cyan',
        },
        {
            label: 'ALVO PRIMÁRIO',
            value: report.mostCriticalSubject,
            sub: 'ALPHA_TARGET',
            icon: Crosshair,
            color: 'group-hover:text-brand-pink',
            isCritical: true
        }
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            {cards.map((item, idx) => {
                const valStr = String(item.value);
                const isLongText = valStr.length > 10;
                
                return (
                    <div 
                        key={idx} 
                        className={`relative p-4 md:p-5 border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:bg-white/10 overflow-hidden group flex flex-col justify-between`}
                    >
                        {/* Decorative Corner */}
                        <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r ${item.isCritical ? 'border-brand-pink/40' : 'border-white/20'}`}></div>
                        
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[9px] font-bold tracking-[0.2em] ${item.isCritical ? 'text-brand-pink' : 'text-brand-muted'} uppercase truncate`}>
                                    {item.label}
                                </span>
                                <item.icon className={`w-3.5 h-3.5 opacity-40 text-brand-muted transition-colors duration-300 ${item.color}`} />
                            </div>

                            <div className="flex items-baseline gap-1 mt-1 overflow-hidden">
                                <span className={`font-black font-display tracking-tight text-white group-hover:scale-105 transition-transform duration-300 origin-left break-words leading-none ${isLongText ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl md:text-3xl'}`}>
                                    {item.value}
                                </span>
                            </div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[9px] font-mono text-brand-muted truncate max-w-full">
                                {item.sub}
                            </span>
                            <ArrowUpRight className={`w-2.5 h-2.5 text-brand-muted opacity-30 group-hover:text-white group-hover:opacity-100 transition-all ${item.isCritical ? 'group-hover:text-brand-pink' : ''}`} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default DebugKPIs;
