import React, { useContext, useMemo } from 'react';
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, ReferenceLine, Cell 
} from 'recharts';
import { Crosshair, Target, AlertCircle } from 'lucide-react';
import { MateriaData } from '../../types';
import { ThemeContext } from '../../App';
import { getThemeColors } from '../../styles/theme';

interface StrategicMatrixProps {
  data: MateriaData;
}

const StrategicMatrix: React.FC<StrategicMatrixProps> = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const colors = useMemo(() => getThemeColors(theme === 'dark'), [theme]);

  // Prepara os dados:
  // Eixo X (Esforço/Dificuldade): Nível Numérico
  // Eixo Y (Impacto/Oportunidade): Quantidade de Erros (Pontos deixados na mesa)
  // Eixo Z (Relevância): Volume total de questões
  const matrixData = data.detalhado.map(item => ({
    x: parseInt(item.nivel),
    y: item.erros,
    z: item.total,
    name: `Nível ${item.nivel}`,
    taxa: item.taxa,
    original: item
  }));

  // Cálculos para quadrantes dinâmicos
  const maxErro = Math.max(...matrixData.map(d => d.y), 1);
  const midErro = maxErro / 2;
  const minNivel = Math.min(...matrixData.map(d => d.x));
  const maxNivel = Math.max(...matrixData.map(d => d.x));
  const midNivel = (minNivel + maxNivel) / 2;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="bg-brand-bg border border-brand-border px-3 py-2 rounded shadow-xl backdrop-blur-md z-50 relative">
          <p className="text-brand-text font-bold text-xs font-mono mb-1">{d.name}</p>
          <div className="space-y-0.5 text-[10px] text-brand-muted">
            <p>Esforço (Nível): <span className="text-brand-text">{d.x}</span></p>
            <p>Impacto (Erros): <span className="text-brand-accent font-bold">{d.y}</span></p>
            <p>Volume: <span className="text-brand-text">{d.z}</span></p>
            <p>Taxa atual: <span className={d.taxa < 60 ? 'text-brand-accent' : 'text-brand-emerald'}>{d.taxa.toFixed(0)}%</span></p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-brand-card border border-brand-border rounded-xl p-4 md:p-6 backdrop-blur-sm relative overflow-hidden h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3">
        <div>
          <h2 className="text-base md:text-lg font-semibold text-brand-text flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-brand-accent" />
            Matriz de Priorização
          </h2>
          <p className="text-[10px] font-mono text-brand-muted uppercase tracking-wider mt-1">Impacto (Erros) × Esforço (Dificuldade)</p>
        </div>
        <div className="bg-brand-bg/50 px-3 py-1 rounded border border-brand-border self-start md:self-auto">
             <span className="text-[9px] md:text-[10px] font-mono text-brand-accent flex items-center gap-1">
                <Target className="w-3 h-3" /> Q. Sup. Esquerdo = Prioridade
             </span>
        </div>
      </div>

      <div className="flex-grow w-full relative min-h-[300px]">
        {/* Background Labels for Quadrants */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none z-0 opacity-10">
            <div className="border-r border-b border-brand-text flex items-start justify-start p-2"><span className="text-brand-accent font-black text-sm md:text-2xl uppercase">Atacar</span></div>
            <div className="border-b border-brand-text flex items-start justify-end p-2"><span className="text-brand-text font-black text-sm md:text-2xl uppercase">Oportunidade</span></div>
            <div className="border-r border-brand-text flex items-end justify-start p-2"><span className="text-brand-text font-black text-sm md:text-2xl uppercase">Monitorar</span></div>
            <div className="flex items-end justify-end p-2"><span className="text-brand-text font-black text-sm md:text-2xl uppercase">Refinar</span></div>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: -15 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Dificuldade" 
              domain={['dataMin - 50', 'dataMax + 50']}
              stroke={colors.muted}
              tick={{ fontSize: 9, fill: colors.muted }}
              label={{ value: 'Dificuldade', position: 'bottom', fill: colors.muted, fontSize: 9, offset: 0 }}
              height={30}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Erros" 
              stroke={colors.muted}
              tick={{ fontSize: 9, fill: colors.muted }}
              label={{ value: 'Erros (Impacto)', angle: -90, position: 'insideLeft', fill: colors.muted, fontSize: 9, dx: 10 }}
              width={35}
            />
            <ZAxis type="number" dataKey="z" range={[50, 600]} name="Volume" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
            
            {/* Reference Lines to divide quadrants */}
            <ReferenceLine x={midNivel} stroke={colors.border} strokeDasharray="5 5" />
            <ReferenceLine y={midErro} stroke={colors.border} strokeDasharray="5 5" />

            <Scatter name="Níveis" data={matrixData} fill={colors.accent}>
              {matrixData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.y > midErro ? colors.accent : colors.neutral} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-3 md:gap-4 justify-center">
        <div className="flex items-center gap-1.5 text-xs text-brand-muted">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-accent"></span> <span className="text-[10px] md:text-xs">Prioridade</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-brand-muted">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-neutral"></span> <span className="text-[10px] md:text-xs">Manutenção</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-brand-muted">
            <div className="w-2.5 h-2.5 rounded-full border border-brand-text flex items-center justify-center text-[6px]">●</div> <span className="text-[10px] md:text-xs">Tamanho = Volume</span>
        </div>
      </div>
    </div>
  );
};

export default StrategicMatrix;