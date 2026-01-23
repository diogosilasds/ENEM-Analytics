import React, { useContext, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Activity, ListFilter } from 'lucide-react';
import { MateriaData } from '../../types';
import CustomTooltip from '../ui/CustomTooltip';
import { ThemeContext } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../styles/theme';

interface ComplexitySectionProps {
  data: MateriaData;
}

const ComplexitySection: React.FC<ComplexitySectionProps> = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const colors = useMemo(() => getThemeColors(theme === 'dark'), [theme]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Detailed Accuracy Chart */}
      <div className="bg-brand-card border border-brand-border rounded-xl p-6 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 bg-brand-accent/5 -translate-y-1/2 translate-x-1/2 rotate-45"></div>
        <h2 className="text-lg font-semibold text-brand-text mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-brand-accent" />
          Curva de desempenho
        </h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.linha} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} horizontal={true} vertical={false} />
              <XAxis 
                dataKey="nivel" 
                stroke={colors.muted}
                tick={{ fill: colors.muted, fontSize: 10, fontFamily: 'monospace' }}
                axisLine={false}
              />
              <YAxis 
                stroke={colors.muted}
                domain={[0, 100]}
                tick={{ fill: colors.muted, fontSize: 10, fontFamily: 'monospace' }}
                tickFormatter={(value) => `${value}%`}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={90} stroke={colors.emerald} strokeDasharray="3 3" opacity={0.3} />
              <Line 
                type="monotone" 
                dataKey="taxa" 
                stroke={colors.accent} 
                strokeWidth={3}
                dot={{ fill: colors.bg, r: 4, strokeWidth: 2, stroke: colors.accent }}
                activeDot={{ r: 6, fill: colors.text }}
                name="Taxa de Acerto"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Stats Table */}
      <div className="bg-brand-card border border-brand-border rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-lg font-semibold text-brand-text mb-6 flex items-center gap-2">
          <ListFilter className="w-5 h-5 text-brand-muted" />
          Matriz detalhada
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-border">
                <th className="text-left py-3 text-brand-muted font-bold text-[9px] uppercase tracking-widest font-mono">Nível</th>
                <th className="text-center py-3 text-brand-muted font-bold text-[9px] uppercase tracking-widest font-mono">Volume</th>
                <th className="text-center py-3 text-brand-emerald font-bold text-[9px] uppercase tracking-widest font-mono">✓</th>
                <th className="text-center py-3 text-brand-accent font-bold text-[9px] uppercase tracking-widest font-mono">✗</th>
                <th className="text-right py-3 text-brand-text font-bold text-[9px] uppercase tracking-widest font-mono">Taxa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {data.detalhado.map((item, index) => (
                <tr key={index} className="hover:bg-brand-bg transition-colors">
                  <td className="py-3 text-brand-text">
                    <div className="flex flex-col">
                      <span className="font-bold text-xs">{item.nivel}</span>
                      <span className="text-brand-muted text-[10px] font-mono">{item.faixa}</span>
                    </div>
                  </td>
                  <td className="text-center text-brand-muted font-mono text-xs">{item.total}</td>
                  <td className="text-center text-brand-emerald font-bold text-xs">{item.acertos}</td>
                  <td className="text-center text-brand-accent font-bold text-xs">{item.erros}</td>
                  <td className="text-right">
                    <span className="font-black text-xs font-mono">{item.taxa.toFixed(1)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComplexitySection;