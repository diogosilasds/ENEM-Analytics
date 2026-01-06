import React from 'react';
import { Activity, ShieldCheck, ShieldAlert, Shield, Cpu } from 'lucide-react';
import { MateriaData } from '../../types';

interface ExecutiveSynthesisProps {
  data: MateriaData;
}

const ExecutiveSynthesis: React.FC<ExecutiveSynthesisProps> = ({ data }) => {
  
  const getMaturityStatus = (taxa: number, volume: number) => {
    if (volume === 0) return { label: 'NULL', color: 'text-brand-muted', icon: Shield };
    if (taxa >= 90) return { label: 'DOMÍNIO', color: 'text-brand-accent', icon: ShieldCheck };
    if (taxa >= 75) return { label: 'ESTÁVEL', color: 'text-white', icon: Shield };
    if (taxa >= 50) return { label: 'INSTÁVEL', color: 'text-brand-yellow', icon: Activity };
    return { label: 'CRÍTICO', color: 'text-brand-pink', icon: ShieldAlert };
  };

  const tiers = [
      { name: 'CAMADA_BASE', range: [0, 500], color: 'border-brand-cyan' },
      { name: 'CAMADA_OPERACIONAL', range: [501, 700], color: 'border-brand-accent' },
      { name: 'CAMADA_AVANÇADA', range: [701, 1000], color: 'border-brand-purple' }
  ];

  const getTierStats = (min: number, max: number) => {
      const levels = data.detalhado.filter(d => parseInt(d.nivel) >= min && parseInt(d.nivel) <= max);
      const totalQ = levels.reduce((acc, curr) => acc + curr.total, 0);
      const totalAcertos = levels.reduce((acc, curr) => acc + curr.acertos, 0);
      const taxaGlobal = totalQ > 0 ? (totalAcertos / totalQ) * 100 : 0;
      return { totalQ, taxaGlobal };
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <Cpu className="w-5 h-5 text-brand-accent" />
        <h2 className="text-sm font-black font-display tracking-[0.3em] uppercase italic text-white">REPROCESSAMENTO_COGNITIVO</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((tier) => {
              const stats = getTierStats(tier.range[0], tier.range[1]);
              const isZero = stats.totalQ === 0;
              
              return (
                <div key={tier.name} className={`bg-[#0f0f11] border border-[#333] border-l-4 ${tier.color} p-6 group transition-all hover:bg-white/[0.02]`}>
                    <p className="text-[8px] font-mono font-bold tracking-[0.2em] text-brand-muted mb-4 uppercase">{tier.name}</p>
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-4xl font-black font-display tracking-tighter text-white">
                                {isZero ? '---' : `${stats.taxaGlobal.toFixed(0)}%`}
                            </p>
                            <p className="text-[10px] font-mono text-brand-muted mt-2 uppercase font-bold">
                                {isZero ? 'OFFLINE' : `${stats.totalQ} PACKETS`}
                            </p>
                        </div>
                    </div>
                </div>
              )
          })}
      </div>

      <div className="bg-[#0f0f11] border border-[#333] relative">
         <div className="px-4 md:px-6 py-4 bg-black/40 flex justify-between items-center border-b border-[#333]">
            <h3 className="text-[10px] font-black font-display tracking-[0.2em] uppercase italic text-white">MATRIZ_DE_MATURIDADE</h3>
            <span className="text-[8px] text-brand-accent font-mono border border-brand-accent px-2 py-0.5">V4.0_STABLE</span>
         </div>
         
         {/* MOBILE VIEW: Card List (< md) */}
         <div className="block md:hidden divide-y divide-[#333]">
             {data.detalhado.map((item) => {
                 const status = getMaturityStatus(item.taxa, item.total);
                 const Icon = status.icon;
                 
                 return (
                    <div key={item.nivel} className="p-4 hover:bg-white/[0.02] transition-colors">
                        <div className="flex justify-between items-center mb-3">
                             <div className="flex flex-col">
                                <span className="font-black font-display text-xs text-white">L_{item.nivel}</span>
                                <span className="font-mono text-[9px] text-brand-muted font-bold mt-0.5">LOAD: {item.total}u</span>
                             </div>
                             
                             <div className={`flex items-center gap-1.5 ${status.color} font-bold text-[9px] tracking-widest uppercase bg-white/5 px-2 py-1 rounded-sm border border-white/5`}>
                                <Icon className="w-3 h-3" />
                                {status.label}
                             </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <div className="flex-grow h-1.5 bg-white/5 rounded-full relative overflow-hidden">
                                <div 
                                    className="h-full bg-brand-accent shadow-[0_0_8px_rgba(0,255,159,0.3)] rounded-full" 
                                    style={{ width: `${item.taxa}%` }}
                                ></div>
                            </div>
                            <span className="font-mono text-[10px] font-bold text-white min-w-[3ch] text-right">{item.taxa.toFixed(0)}%</span>
                        </div>
                    </div>
                 );
             })}
         </div>

         {/* DESKTOP VIEW: Table (>= md) */}
         <div className="hidden md:block overflow-x-auto">
             <table className="w-full text-left">
                 <thead className="bg-black/20 text-[8px] uppercase font-mono text-brand-muted tracking-widest border-b border-[#333]">
                     <tr>
                         <th className="px-6 py-4">LEVEL_ID</th>
                         <th className="px-6 py-4">VOL_LOAD</th>
                         <th className="px-6 py-4">SYNC_EFFICIENCY</th>
                         <th className="px-6 py-4">STATUS_MODE</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-[#333]">
                     {data.detalhado.map((item) => {
                         const status = getMaturityStatus(item.taxa, item.total);
                         const Icon = status.icon;
                         
                         return (
                            <tr key={item.nivel} className="hover:bg-white/[0.02] transition-colors">
                                <td className="px-6 py-4 font-black font-display text-xs text-white">L_{item.nivel}</td>
                                <td className="px-6 py-4 font-mono text-[10px] text-brand-muted font-bold">{item.total}u</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-24 h-1.5 bg-white/5 rounded-full relative overflow-hidden">
                                            <div 
                                                className="h-full bg-brand-accent shadow-[0_0_8px_rgba(0,255,159,0.3)] rounded-full" 
                                                style={{ width: `${item.taxa}%` }}
                                            ></div>
                                        </div>
                                        <span className="font-mono text-[10px] font-bold text-white">{item.taxa.toFixed(0)}%</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className={`flex items-center gap-2 ${status.color} font-bold text-[9px] tracking-widest uppercase`}>
                                        <Icon className="w-3 h-3" />
                                        {status.label}
                                    </div>
                                </td>
                            </tr>
                         );
                     })}
                 </tbody>
             </table>
         </div>
      </div>
    </div>
  );
};

export default ExecutiveSynthesis;