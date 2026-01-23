import React, { useContext, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, Activity } from 'lucide-react';
import { MateriaData } from '../../types';
import CustomTooltip from '../ui/CustomTooltip';
import { ThemeContext } from '../../contexts/ThemeContext';
import { getThemeColors } from '../../styles/theme';

interface ProjectionChartProps {
  data: MateriaData;
}

const ProjectionChart: React.FC<ProjectionChartProps> = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const colors = useMemo(() => getThemeColors(theme === 'dark'), [theme]);

  return (
    <div className="bg-brand-card p-6 relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
        <div>
          <h2 className="text-sm font-black font-display tracking-[0.2em] text-brand-text flex items-center gap-2 italic uppercase">
            <Activity className="w-4 h-4 text-brand-accent" />
            VETOR_DE_PROJEÇÃO
          </h2>
          <p className="text-brand-muted font-mono text-[9px] mt-1 tracking-widest uppercase opacity-60">Linear_Growth_Algorithm_v2</p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <p className="text-brand-muted text-[8px] font-bold tracking-widest uppercase mb-1">REQ_DELTA</p>
          <p className="text-2xl font-black text-brand-accent font-display tracking-tighter">
            +{(data.gap / 10).toFixed(1)} <span className="text-[10px] opacity-50 italic">PTS/NODE</span>
          </p>
        </div>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.projecao} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorProjecao" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.accent} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={colors.accent} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
            <XAxis 
              dataKey="mes" 
              stroke={colors.muted}
              tick={{ fill: colors.muted, fontSize: 9, fontFamily: 'JetBrains Mono', fontWeight: 'bold' }}
              tickMargin={15}
              axisLine={false}
            />
            <YAxis 
              stroke={colors.muted}
              domain={[400, 900]}
              tick={{ fill: colors.muted, fontSize: 9, fontFamily: 'JetBrains Mono' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              y={data.meta} 
              stroke={colors.pink} 
              strokeDasharray="5 5" 
              label={{ value: `TARGET: ${data.meta}`, fill: colors.pink, fontSize: 8, position: 'insideTopRight', fontWeight: '900', fontFamily: 'Orbitron' }}
            />
            <Area 
              type="monotone" 
              dataKey="nota" 
              stroke={colors.accent} 
              strokeWidth={4}
              fill="url(#colorProjecao)"
              name="Nota_Log"
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProjectionChart;