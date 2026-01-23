
import React from 'react';
import { Activity, Target, TrendingUp, Clock, AlertTriangle, Hash, Zap } from 'lucide-react';
import { MateriaData } from '../../types';

interface KPIGridProps {
  data: MateriaData;
}

const KPIGrid: React.FC<KPIGridProps> = ({ data }) => {
  const hasData = data.questoes.total > 0;
  if (!hasData) return null;

  const cards = [
    { 
      label: 'NOTA ATUAL', 
      value: data.notaAtual, 
      sub: 'TRI Estimado',
      icon: Activity,
      color: 'text-brand-accent',
      borderColor: 'border-brand-accent'
    },
    { 
      label: 'GAP META', 
      value: data.gap, 
      prefix: '-',
      sub: 'Pontos p/ alvo',
      icon: Target,
      color: 'text-brand-pink',
      borderColor: 'border-brand-pink'
    },
    { 
      label: 'EFICIÊNCIA', 
      value: data.questoes.taxa.toFixed(1), 
      suffix: '%',
      sub: `${data.questoes.acertos}/${data.questoes.total} Acertos`,
      icon: TrendingUp, 
      color: data.questoes.taxa > 70 ? 'text-brand-cyan' : 'text-brand-yellow',
      borderColor: data.questoes.taxa > 70 ? 'border-brand-cyan' : 'border-brand-yellow'
    },
    { 
      label: 'VOLUME', 
      value: data.questoes.total, 
      sub: 'Questões Feitas',
      icon: Hash, 
      color: 'text-white',
      borderColor: 'border-white'
    },
    { 
      label: 'ERROS', 
      value: data.questoes.erros, 
      sub: 'Pontos de Atenção',
      icon: AlertTriangle, 
      color: 'text-brand-pink',
      borderColor: 'border-brand-pink'
    },
    { 
      label: 'RITMO', 
      value: data.tempo, 
      sub: 'Tempo de Prova',
      icon: Clock, 
      color: 'text-brand-purple',
      borderColor: 'border-brand-purple'
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
      {cards.map((item, idx) => (
        <div 
          key={idx} 
          className="relative bg-[#0a0a0c] p-4 md:p-5 transition-all group overflow-hidden cyber-shape"
        >
          {/* Cyber Shape Custom Border */}
          <div className={`absolute inset-0 w-full h-full opacity-30 group-hover:opacity-100 transition-opacity cyber-shape-border ${item.borderColor.replace('border-', 'bg-')}`}></div>

          {/* Background Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          {/* Scanning Line Effect (Hover) */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
                <span className="text-[9px] font-bold tracking-[0.2em] text-brand-muted uppercase truncate">
                {item.label}
                </span>
                <item.icon className={`w-3.5 h-3.5 ${item.color} opacity-70`} />
            </div>

            <div className="flex items-baseline gap-1 mt-1">
                {item.prefix && <span className="text-sm font-bold opacity-70 text-white">{item.prefix}</span>}
                <span className={`text-2xl md:text-3xl font-black font-display tracking-tight text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] glitch-text`} data-text={item.value}>
                {item.value}
                </span>
                {item.suffix && <span className="text-xs font-bold opacity-70 text-white">{item.suffix}</span>}
            </div>

            <div className="mt-3 flex items-center gap-2">
                <div className={`h-[2px] w-6 ${item.color.replace('text-', 'bg-')} opacity-50 group-hover:w-full transition-all duration-500`}></div>
                <span className="text-[8px] font-mono text-brand-muted truncate max-w-full uppercase tracking-wider group-hover:text-white transition-colors">
                {item.sub}
                </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPIGrid;
