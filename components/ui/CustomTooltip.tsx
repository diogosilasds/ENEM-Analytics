import React from 'react';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-brand-bg border-2 border-brand-accent px-4 py-3 rounded shadow-2xl backdrop-blur-md">
        <p className="text-brand-text font-black text-xs mb-2 font-mono tracking-tight">
          {payload[0].payload.mes || payload[0].payload.nivel}
        </p>
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-6">
              <span className="text-[10px] font-mono text-brand-muted">{entry.name}:</span>
              <span className="text-xs font-black font-mono text-brand-text">
                {entry.value}{entry.name.toLowerCase().includes('taxa') ? '%' : ''}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;