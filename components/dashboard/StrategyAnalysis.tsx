import React from 'react';
import { Brain, Zap, Target, Binary } from 'lucide-react';
import { MateriaData } from '../../types';

interface StrategyAnalysisProps {
  data: MateriaData;
}

const StrategyAnalysis: React.FC<StrategyAnalysisProps> = ({ data }) => {
  return (
    <div className="bg-brand-card border border-white/5 p-1 relative group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent via-brand-cyan to-brand-pink opacity-50"></div>
        
        <div className="p-10 relative z-10 bg-[#0c0c0e]">
            <div className="flex items-center gap-4 mb-10">
                <Brain className="w-6 h-6 text-brand-accent" />
                <h2 className="text-sm font-black font-display tracking-[0.4em] uppercase italic text-white">ANÁLISE_COGNITIVA_ESTRATÉGICA</h2>
                <div className="flex-grow h-px bg-white/5"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                <div className="space-y-6">
                    <div className="flex items-center gap-3 text-brand-cyan font-black font-display text-[10px] tracking-widest italic uppercase">
                        <Binary className="w-4 h-4" /> 
                        SISTEMA_TRI_LOG
                    </div>
                    <div className="space-y-6">
                        {data.analiseProfunda.tri.map((text, idx) => (
                            <div key={idx} className="flex gap-4 group/item">
                                <span className="text-[10px] font-mono text-brand-muted opacity-40 mt-1">[{idx}]</span>
                                <p className="text-brand-text/80 text-sm leading-relaxed font-sans border-l border-white/10 pl-5 group-hover/item:border-brand-cyan transition-colors">
                                    {text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-center gap-3 text-brand-accent font-black font-display text-[10px] tracking-widest italic uppercase">
                        <Zap className="w-4 h-4" /> 
                        PROTOCOLO_CORREÇÃO
                    </div>
                    <ul className="space-y-6">
                        {data.analiseProfunda.plano.map((text, idx) => (
                            <li key={idx} className="flex items-start gap-4 group/item">
                                <div className="w-6 h-6 rounded-sm bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center text-[10px] font-bold text-brand-accent group-hover/item:bg-brand-accent group-hover/item:text-black transition-all">
                                    {idx + 1}
                                </div>
                                <p className="text-brand-text/80 text-sm leading-relaxed font-sans mt-0.5">
                                    {text}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </div>
  );
};

export default StrategyAnalysis;