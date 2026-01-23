
import React from 'react';
import { ResponsiveContainer, Treemap, Tooltip } from 'recharts';
import { DebugReport } from '../../types';

const IntegrityTreeMap: React.FC<{ report: DebugReport }> = ({ report }) => {
  // Converte o histórico para formato de Treemap (Hierarquia: Subject -> Level)
  const treemapData = report.fullHistory.map(sub => ({
    name: sub.name,
    children: sub.levels
      .filter(l => l.erros > 0)
      .map(l => ({
        name: `${sub.name}\nNVL ${l.nivel}`,
        value: l.erros,
        lvl: l.nivel,
        taxa: l.taxa,
        subjectName: sub.name
      }))
  })).filter(s => s.children.length > 0);

  const getCellColor = (lvl: string) => {
    const val = parseInt(lvl);
    if (val <= 500) return '#ff0055'; // Crítico (Pink)
    if (val <= 650) return '#f3e600'; // Alerta (Yellow)
    if (val <= 800) return '#00f3ff'; // Estável (Cyan)
    return '#00ff9f'; // Seguro (Accent/Green)
  };

  const CustomizedContent = (props: any) => {
    const { x, y, width, height, name, lvl } = props;
    if (width < 5 || height < 5) return null;
    const color = getCellColor(lvl);

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: color,
            stroke: '#050505',
            strokeWidth: 1,
            opacity: 0.7,
          }}
        />
        {width > 45 && height > 25 && (
          <text
            x={x + width / 2}
            y={y + height / 2}
            textAnchor="middle"
            fill="#000"
            fontSize={height < 30 ? 7 : 9}
            fontWeight="900"
            fontFamily="monospace"
            dominantBaseline="central"
          >
            {name.split('\n')[1]}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className="w-full">
      <div className="w-full h-[300px] sm:h-[450px] bg-black/40 border border-[#222] relative overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={treemapData}
            dataKey="value"
            stroke="#000"
            content={<CustomizedContent />}
          >
            <Tooltip 
              contentStyle={{ backgroundColor: '#050505', border: '1px solid #333', borderRadius: '0', fontSize: '10px' }}
              itemStyle={{ fontFamily: 'monospace', color: '#fff' }}
              formatter={(value: any, name: any, props: any) => [
                `${value} Erros`, 
                `${props.payload.subjectName} | ${props.payload.name.split('\n')[1]}`
              ]}
            />
          </Treemap>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6 pt-4 border-t border-[#222]">
        <span className="text-[9px] font-mono text-brand-muted uppercase tracking-widest">MAPA DE CALOR (DENSIDADE):</span>
        <div className="flex gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#ff0055]"></div>
            <span className="text-[9px] text-brand-muted font-mono uppercase">CRÍTICO (&lt;500)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#f3e600]"></div>
            <span className="text-[9px] text-brand-muted font-mono uppercase">ALERTA (&lt;650)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#00f3ff]"></div>
            <span className="text-[9px] text-brand-muted font-mono uppercase">ESTÁVEL (&lt;800)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#00ff9f]"></div>
            <span className="text-[9px] text-brand-muted font-mono uppercase">SEGURO (&gt;800)</span>
          </div>
        </div>
        <div className="ml-auto text-[9px] font-mono text-brand-muted italic opacity-50">
          *Área do bloco proporcional ao volume de falhas
        </div>
      </div>
    </div>
  );
};

export default IntegrityTreeMap;
