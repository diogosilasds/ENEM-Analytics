import React, { useContext, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ComposedChart, Line, ReferenceLine
} from 'recharts';
import { BrainCircuit, AlertTriangle, TrendingDown } from 'lucide-react';
import { MateriaData } from '../../types';
import { ThemeContext } from '../../App';
import { getThemeColors } from '../../styles/theme';

interface CognitiveBreakdownProps {
  data: MateriaData;
}

const CognitiveBreakdown: React.FC<CognitiveBreakdownProps> = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const colors = useMemo(() => getThemeColors(theme === 'dark'), [theme]);

  const paretoData = [...data.detalhado]
    .sort((a, b) => b.erros - a.erros)
    .filter(item => item.erros > 0);

  const sortedByLevel = [...data.detalhado].sort((a, b) => parseInt(a.nivel) - parseInt(b.nivel));
  
  const gradientData = sortedByLevel.map((item, index) => {
    const prevItem = sortedByLevel[index - 1];
    let delta = 0;
    if (prevItem) {
      delta = item.taxa - prevItem.taxa;
    }
    return {
      nivel: item.nivel,
      taxa: item.taxa,
      delta: parseFloat(delta.toFixed(1)),
      isDrop: delta < -15
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-brand-bg border border-brand-border px-3 py-2 rounded shadow-xl backdrop-blur-md">
          <p className="text-brand-text font-bold text-xs font-mono mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-[10px] text-brand-muted flex items-center gap-2">
              <span style={{color: entry.color}}>●</span> 
              {entry.name}: <span className="text-brand-text font-bold">
                {entry.value}{entry.unit || ''}
              </span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-brand-card border border-brand-border rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-brand-text mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-brand-gold" />
          Pareto de Erros
        </h2>
        <p className="text-[10px] font-mono text-brand-muted uppercase tracking-wider mb-6">
          Concentração de falhas por nível
        </p>

        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={paretoData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} horizontal={false} />
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="nivel" 
                stroke={colors.muted} 
                tick={{ fontSize: 10, fontFamily: 'monospace' }}
                width={30}
              />
              <Tooltip cursor={{fill: colors.grid, opacity: 0.1}} content={<CustomTooltip />} />
              <Bar dataKey="erros" name="Total de Erros" barSize={20} radius={[0, 4, 4, 0]}>
                {paretoData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? colors.accent : colors.neutral} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-brand-muted mt-2 border-l-2 border-brand-accent pl-3">
            O nível <span className="font-bold text-brand-text">{paretoData[0]?.nivel}</span> concentra a maior parte dos erros.
        </p>
      </div>

      <div className="bg-brand-card border border-brand-border rounded-xl p-6 backdrop-blur-sm relative overflow-hidden">
        <h2 className="text-lg font-semibold text-brand-text mb-2 flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-brand-accent" />
          Elasticidade de Dificuldade
        </h2>
        <p className="text-[10px] font-mono text-brand-muted uppercase tracking-wider mb-6">
            Sensibilidade à mudança de nível (Δ Taxa)
        </p>

        <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={gradientData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
                    <XAxis 
                        dataKey="nivel" 
                        stroke={colors.muted} 
                        tick={{ fontSize: 10, fontFamily: 'monospace' }}
                    />
                    <YAxis 
                        yAxisId="left"
                        stroke={colors.muted} 
                        tick={{ fontSize: 10, fontFamily: 'monospace' }}
                        domain={[0, 100]}
                        unit="%"
                    />
                     <YAxis 
                        yAxisId="right"
                        orientation="right"
                        stroke={colors.accent} 
                        tick={{ fontSize: 10, fontFamily: 'monospace' }}
                        domain={[-50, 50]}
                        unit="%"
                        hide
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={0} yAxisId="right" stroke={colors.border} />
                    
                    <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="taxa" 
                        stroke={colors.text} 
                        strokeWidth={2} 
                        dot={{r: 2}}
                        name="Taxa Absoluta"
                        unit="%"
                    />

                    <Bar 
                        yAxisId="right"
                        dataKey="delta" 
                        name="Variação (Δ)" 
                        barSize={30}
                        opacity={0.6}
                        unit="%"
                    >
                        {gradientData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={entry.delta < -15 ? '#ef4444' : entry.delta > 0 ? colors.emerald : colors.accent} />
                        ))}
                    </Bar>
                </ComposedChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CognitiveBreakdown;