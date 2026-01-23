
import React from 'react';
import { Terminal, ChevronRight } from 'lucide-react';
import { DebugTarget } from '../../types';

const ProtocolSection: React.FC<{ targets: DebugTarget[], onNavigate: (view: any) => void }> = ({ targets, onNavigate }) => {
    return (
        <div className="grid grid-cols-1 gap-4">
            {targets.map((target, index) => {
                const isCritical = index === 0;
                const stripColor = isCritical ? 'bg-brand-pink' : 'bg-brand-yellow';
                const statusTextColor = isCritical ? 'text-brand-pink' : 'text-brand-yellow';

                return (
                    <button 
                        key={target.subjectId} 
                        onClick={() => { onNavigate(target.subjectId); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className={`w-full text-left bg-[#0f0f11] border border-[#333] hover:border-brand-accent hover:bg-[#121215] transition-all group relative overflow-hidden flex flex-col md:flex-row items-stretch`}
                    >
                        <div className={`w-full md:w-1.5 h-1 md:h-auto md:min-h-full self-stretch ${stripColor} group-hover:bg-brand-accent transition-colors duration-300 shrink-0`}></div>
                        
                        <div className="p-4 sm:p-5 flex-grow flex flex-col md:flex-row gap-4 sm:gap-6 items-start md:items-center">
                            <div className="min-w-[140px] flex md:block items-center gap-3 md:gap-0">
                                <div className="flex items-center gap-2 text-[9px] font-mono text-brand-muted uppercase tracking-widest mb-0 md:mb-1"><Terminal className="w-3 h-3" /><span>LOG_ID: 00{index + 1}</span></div>
                                <div className={`text-xs sm:text-sm font-black font-display ${isCritical ? 'text-brand-pink' : 'text-white'} uppercase tracking-wider group-hover:text-brand-accent transition-colors`}>{target.subjectName}</div>
                            </div>
                            <div className="flex-grow font-mono text-xs md:text-sm text-brand-muted border-l-0 md:border-l border-t md:border-t-0 border-[#333] pl-0 md:pl-6 pt-3 md:pt-0 leading-relaxed relative w-full">
                                 <div className="hidden md:block absolute -left-[1px] top-0 w-[1px] h-2 bg-brand-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <div className="hidden md:block absolute -left-[1px] bottom-0 w-[1px] h-2 bg-brand-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <span className={`${statusTextColor} font-black uppercase mr-2 block sm:inline mb-1 sm:mb-0`}>[{isCritical ? 'CRÍTICO' : 'ALERTA'}]</span>
                                 {target.recommendation}
                            </div>
                            <div className="hidden md:flex flex-col items-center justify-center pl-4 border-l border-[#333] min-w-[100px] self-stretch gap-1">
                                 <div className="p-2 border border-white/10 rounded-sm group-hover:bg-brand-accent group-hover:border-brand-accent group-hover:text-black transition-all"><ChevronRight className="w-4 h-4" /></div>
                                 <span className="text-[8px] font-mono text-brand-muted uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Acessar</span>
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

export default ProtocolSection;
