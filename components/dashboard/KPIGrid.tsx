import React from 'react';
import { Activity, Target, TrendingUp, Clock, AlertTriangle, Hash, ArrowUpRight } from 'lucide-react';
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
      hoverColor: 'group-hover:text-brand-accent'
    },
    { 
      label: 'GAP META', 
      value: data.gap, 
      prefix: '-',
      sub: 'Pontos p/ alvo',
      icon: Target,
      hoverColor: 'group-hover:text-brand-pink'
    },
    { 
      label: 'EFICIÊNCIA', 
      value: data.questoes.taxa.toFixed(1), 
      suffix: '%',
      sub: `${data.questoes.acertos}/${data.questoes.total} Acertos`,
      icon: TrendingUp, 
      hoverColor: data.questoes.taxa > 70 ? 'group-hover:text-brand-cyan' : 'group-hover:text-brand-yellow'
    },
    { 
      label: 'VOLUME', 
      value: data.questoes.total, 
      sub: 'Questões Feitas',
      icon: Hash, 
      hoverColor: 'group-hover:text-white'
    },
    { 
      label: 'ERROS', 
      value: data.questoes.erros, 
      sub: 'Pontos de Atenção',
      icon: AlertTriangle, 
      hoverColor: 'group-hover:text-brand-pink'
    },
    { 
      label: 'RITMO', 
      value: data.tempo, 
      sub: 'Tempo de Prova',
      icon: Clock, 
      hoverColor: 'group-hover:text-brand-purple'
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
      {cards.map((item, idx) => (
        <div 
          key={idx} 
          className="relative p-4 md:p-5 border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:bg-white/10 overflow-hidden group"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20"></div>
          
          <div className="flex justify-between items-start mb-2">
            <span className="text-[9px] font-bold tracking-[0.2em] text-brand-muted uppercase truncate">
              {item.label}
            </span>
            <item.icon className={`w-3.5 h-3.5 opacity-40 text-brand-muted transition-colors duration-300 ${item.hoverColor}`} />
          </div>

          <div className="flex items-baseline gap-1 mt-1">
            {item.prefix && <span className="text-sm font-bold opacity-70 text-white">{item.prefix}</span>}
            <span className="text-2xl md:text-3xl font-black font-display tracking-tight text-white group-hover:scale-105 transition-transform duration-300 origin-left">
              {item.value}
            </span>
            {item.suffix && <span className="text-xs font-bold opacity-70 text-white">{item.suffix}</span>}
          </div>

          <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between">
            <span className="text-[9px] font-mono text-brand-muted truncate max-w-full">
              {item.sub}
            </span>
            {/* Seta indicativa decorativa */}
            <ArrowUpRight className="w-2.5 h-2.5 text-brand-muted opacity-30 group-hover:text-white group-hover:opacity-100 transition-all" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPIGrid;