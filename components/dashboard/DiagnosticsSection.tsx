import React from 'react';
import { Microscope, Compass, AlertCircle, Zap } from 'lucide-react';
import { MateriaData } from '../../types';

interface DiagnosticsSectionProps {
  data: MateriaData;
}

const DiagnosticsSection: React.FC<DiagnosticsSectionProps> = ({ data }) => {
  if (data.questoes.total === 0) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="cyber-border bg-brand-card p-6 flex flex-col group hover:border-brand-accent transition-colors duration-500">
        <h2 className="text-[10px] font-black font-display tracking-[0.3em] text-brand-text mb-8 flex items-center gap-3 uppercase italic">
          <Microscope className="w-4 h-4 text-brand-accent group-hover:rotate-12 transition-transform" />
          DIAGNÓSTICO_SISTÊMICO
        </h2>
        <div className="space-y-4 flex-grow font-mono">
          <div className="bg-black/40 border-l-4 border-brand-accent p-4 relative group/item">
            <p className="text-[8px] font-bold text-brand-accent mb-2 tracking-[0.2em] uppercase">PONTO_FORTE</p>
            <p className="text-brand-text text-sm leading-relaxed font-sans">{data.diagnostico.pontoForte}</p>
          </div>
          
          <div className="bg-black/40 border-l-4 border-brand-pink p-4 relative group/item">
            <p className="text-[8px] font-bold text-brand-pink mb-2 tracking-[0.2em] uppercase">ZONA_CRÍTICA</p>
            <p className="text-brand-text text-sm leading-relaxed font-sans">{data.diagnostico.zonaCritica}</p>
          </div>
          
          <div className="bg-black/40 border-l-4 border-brand-yellow p-4 relative group/item">
            <p className="text-[8px] font-bold text-brand-yellow mb-2 tracking-[0.2em] uppercase">PADRÃO_ERRO</p>
            <p className="text-brand-text text-sm leading-relaxed font-sans">{data.diagnostico.problema}</p>
          </div>
        </div>
      </div>

      <div className="cyber-border bg-brand-card p-6 flex flex-col group hover:border-brand-cyan transition-colors duration-500">
        <h2 className="text-[10px] font-black font-display tracking-[0.3em] text-brand-text mb-8 flex items-center gap-3 uppercase italic">
          <Compass className="w-4 h-4 text-brand-cyan group-hover:rotate-12 transition-transform" />
          PLANO_DE_RESGATE
        </h2>
        <div className="space-y-8 flex-grow">
          {data.metas.map((meta, index) => (
            <div key={index} className="space-y-3 group/meta">
              <div className="flex justify-between items-end">
                <span className="text-[8px] font-bold font-mono tracking-widest text-brand-muted uppercase">{meta.nivel}</span>
                <span className="font-mono text-[10px] font-bold text-brand-text">
                  {meta.atual.toFixed(0)}% <span className="text-brand-accent">>></span> {meta.meta}%
                </span>
              </div>
              
              <div className="relative h-2 bg-white/5 overflow-hidden">
                <div 
                  className="h-full bg-brand-cyan shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all duration-1000 ease-out relative"
                  style={{ width: `${meta.atual}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-pulse"></div>
                </div>
                {/* Marcador de Meta */}
                <div 
                  className="absolute top-0 bottom-0 w-1 bg-brand-pink z-10 shadow-[0_0_8px_rgba(255,0,85,0.8)]"
                  style={{ left: `${meta.meta}%` }}
                ></div>
              </div>
              
              <p className="text-[10px] text-brand-muted font-mono italic leading-snug">
                // {meta.acao}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiagnosticsSection;