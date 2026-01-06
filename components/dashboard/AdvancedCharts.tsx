import React, { useContext, useMemo } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  Tooltip, Legend, ResponsiveContainer, CartesianGrid, Line, ComposedChart, Bar,
  XAxis, YAxis
} from 'recharts';
import { Hexagon, BarChart3 } from 'lucide-react';
import { MateriaData } from '../../types';
import CustomTooltip from '../ui/CustomTooltip';
import { ThemeContext } from '../../App';
import { getThemeColors } from '../../styles/theme';

interface AdvancedChartsProps {
  data: MateriaData;
}

const AdvancedCharts: React.FC<AdvancedChartsProps> = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const colors = useMemo(() => getThemeColors(theme === 'dark'), [theme]);

  const chartData = data.detalhado.map(item => ({
    ...item,
    taxaInvertida: 100 - item.taxa 
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* Chart 1: Radar Chart (Skill Balance) */}
      <div className="cyber-border bg-brand-card p-6 relative overflow-hidden group border border-[#333]">
        <h2 className="text-[10px] font-black font-display tracking-[0.2em] text-white mb-10 flex items-center gap-3 italic uppercase">
          <Hexagon className="w-4 h-4 text-brand-accent" />
          BALANÇO_COMPETÊNCIA
        </h2>
        <div className="h-[320px] w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              {/* Aumento da opacidade da grade para visibilidade no fundo escuro */}
              <PolarGrid stroke={colors.muted} strokeWidth={1} opacity={0.3} />
              <PolarAngleAxis 
                dataKey="nivel" 
                tick={{ fill: colors.text, fontSize: 10, fontFamily: 'JetBrains Mono', fontWeight: 'bold' }} 
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tick={false} 
                axisLine={false} 
              />
              <Radar
                name="Taxa_Acerto"
                dataKey="taxa"
                stroke={colors.accent}
                strokeWidth={3}
                fill={colors.accent}
                fillOpacity={0.4}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-[8px] font-mono font-bold text-brand-muted mt-6 tracking-[0.3em] uppercase opacity-40">
          ALGO_ABSTRACTION_MATRIX
        </p>
      </div>

      {/* Chart 2: Volume vs Accuracy */}
      <div className="cyber-border bg-brand-card p-6 relative overflow-hidden group border border-[#333]">
        <h2 className="text-[10px] font-black font-display tracking-[0.2em] text-white mb-10 flex items-center gap-3 italic uppercase">
          <BarChart3 className="w-4 h-4 text-brand-cyan" />
          VOL_VS_EFICIÊNCIA
        </h2>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 20, right: 0, bottom: 20, left: -20 }}>
              <CartesianGrid stroke={colors.grid} strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="nivel" 
                tick={{ fill: colors.muted, fontSize: 8, fontFamily: 'JetBrains Mono' }} 
                axisLine={false} 
              />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                stroke={colors.muted} 
                fontSize={8} 
                fontFamily="JetBrains Mono" 
                axisLine={false} 
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke={colors.cyan} 
                fontSize={8} 
                fontFamily="JetBrains Mono" 
                domain={[0, 100]} 
                unit="%" 
                axisLine={false} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top"
                align="right"
                wrapperStyle={{ 
                  fontSize: '8px', 
                  paddingBottom: '20px', 
                  fontFamily: 'JetBrains Mono',
                  fontWeight: '900',
                  textTransform: 'uppercase'
                }} 
              />
              
              <Bar 
                yAxisId="left" 
                dataKey="total" 
                name="LOAD_VOL" 
                fill={colors.purple} 
                opacity={0.4}
                barSize={16} 
              />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="taxa" 
                name="SYNC_EFF" 
                stroke={colors.cyan} 
                strokeWidth={4} 
                dot={{r: 3, fill: colors.cyan, strokeWidth: 2, stroke: colors.bg}} 
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-[8px] font-mono font-bold text-brand-muted mt-6 tracking-[0.3em] uppercase opacity-40">
          OPERATIONAL_DENSITY_SYNC
        </p>
      </div>

    </div>
  );
};

export default AdvancedCharts;