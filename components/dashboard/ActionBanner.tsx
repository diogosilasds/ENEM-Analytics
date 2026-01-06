import React from 'react';
import { AlertTriangle, Zap, Radio } from 'lucide-react';
import { ViewState } from '../../hooks/useDashboard';

interface ActionBannerProps {
  materiaSelecionada: Exclude<ViewState, 'home'>;
}

const ActionBanner: React.FC<ActionBannerProps> = ({ materiaSelecionada }) => {
  return (
    <div className="relative overflow-hidden group">
        {/* Hazard Stripes Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f3e600, #f3e600 10px, transparent 10px, transparent 20px)' }}></div>
        
        <div className="bg-brand-card border-2 border-brand-yellow p-1">
            <div className="bg-[#121214] p-8 border border-brand-yellow/30 relative">
                <div className="absolute top-0 right-0 px-3 py-1 bg-brand-yellow text-black text-[9px] font-black font-display tracking-widest italic">PRIORITY_ALPHA</div>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="flex items-center gap-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-brand-yellow blur-xl opacity-20 animate-pulse"></div>
                            <AlertTriangle className="w-14 h-14 text-brand-yellow relative z-10" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-brand-yellow font-display tracking-widest italic mb-3 uppercase">INTERVENÇÃO_REQUERIDA</h3>
                            <div className="text-brand-text font-mono text-xs md:text-sm max-w-2xl border-l-2 border-brand-yellow/50 pl-5 space-y-2 opacity-90">
                                <p className="leading-relaxed">
                                {materiaSelecionada === 'humanas' 
                                    ? 'DEFICIT_DETECTADO: Aumentar 13 acertos líquidos no Tier Médio (+32.5% evolução).'
                                    : materiaSelecionada === 'linguagens'
                                    ? 'EROSÃO_DE_PONTOS: Estancar perda nos níveis 550-600 (+36.7% evolução).'
                                    : materiaSelecionada === 'redacao'
                                    ? 'FLUXO_INSUFICIENTE: Iniciar estruturação de repertório e prática semanal.'
                                    : 'ESTABILIZAÇÃO_URGENTE: Corrigir lacunas de base e estabilizar TRI operacional.'
                                }
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <button className="w-full md:w-auto bg-brand-yellow text-black font-black font-display text-[10px] tracking-[0.2em] px-10 py-4 hover:scale-105 transition-all hover:shadow-[0_0_30px_rgba(243,230,0,0.3)] group-hover:translate-x-1 uppercase italic">
                        GERAR_PROTOCOLO_RESGATE
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ActionBanner;