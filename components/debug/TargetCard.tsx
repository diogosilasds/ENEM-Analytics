
import React from 'react';
import { Target } from 'lucide-react';
import { DebugTarget } from '../../types';

const TargetCard: React.FC<{ target: DebugTarget; rank: number }> = ({ target, rank }) => {
    const isPrimary = rank === 1;
    const labelColor = isPrimary ? 'text-brand-pink' : (rank === 2 ? 'text-brand-yellow' : 'text-brand-accent');
    const borderClass = 'border-[#333]'; 
    const cardBg = 'bg-[#121214]'; 
    const gaugeColor = 'bg-[#ff2400]'; 

    return (
        <div className={`relative ${cardBg} border ${borderClass} p-4 sm:p-5 flex flex-col justify-between group hover:brightness-110 transition-all duration-300 h-full overflow-hidden`}>
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10 flex justify-between items-start mb-4 sm:mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[9px] font-black font-mono tracking-[0.2em] uppercase ${labelColor}`}>PRIORIDADE #{rank}</span>
                        {isPrimary && <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-pink opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-brand-pink"></span></span>}
                    </div>
                    <h3 className="text-base sm:text-lg font-black font-display text-white uppercase tracking-wider leading-none break-words max-w-full">
                        {target.subjectName}
                    </h3>
                </div>
                <div className={`flex flex-col items-end text-brand-accent shrink-0 ml-2`}>
                    <span className="text-[9px] font-mono opacity-70">NÍVEL</span>
                    <span className="text-xl sm:text-2xl font-black font-display leading-none">{target.priorityLevel}</span>
                </div>
            </div>
            <div className="relative z-10 space-y-4">
                <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono text-brand-muted uppercase"><span>Fator de Impacto</span><span className="text-white font-bold">{target.impactScore.toFixed(1)}</span></div>
                    <div className="h-1.5 w-full bg-black/50 border border-white/10">
                        <div className={`h-full ${gaugeColor} transition-all duration-1000`} style={{ width: `${Math.min((target.impactScore / 20) * 100, 100)}%` }}></div>
                    </div>
                </div>
                <div className="space-y-1">
                     <div className="flex justify-between text-[9px] font-mono text-brand-muted uppercase"><span>Precisão Local</span><span className="text-white font-bold">{target.accuracy.toFixed(0)}%</span></div>
                     <div className="h-1.5 w-full bg-black/50 border border-white/10 flex gap-0.5">{[...Array(10)].map((_, i) => (<div key={i} className={`flex-1 ${i < (target.accuracy / 10) ? 'bg-brand-accent' : 'bg-white/5'}`}></div>))}</div>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-brand-muted"><span>ERROS: <span className="text-white font-bold">{target.errorCount}</span></span><span>AMOSTRA: <span className="text-white font-bold">{target.totalQuestions}</span></span></div>
            </div>
            <div className="absolute bottom-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity"><Target className={`w-12 h-12 ${labelColor} opacity-10 rotate-45`} /></div>
        </div>
    );
};

export default TargetCard;
