
import React from 'react';
import { DebugReport } from '../../../types';
import { Flame, Crosshair, Layers, TrendingUp, Target, FileText, Database, Lock } from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar } from 'recharts';
import QuestionTable from '../QuestionTable';

// Imported Components
import DebugKPIs from '../../debug/DebugKPIs';
import IntegrityTreeMap from '../../debug/IntegrityTreeMap';
import { CCIChart } from '../../debug/DebugCharts';
import RedacaoAuditSection from '../../debug/RedacaoAuditSection';
import TargetCard from '../../debug/TargetCard';
import ProtocolSection from '../../debug/ProtocolSection';

interface DebugModuleProps { report: DebugReport; onNavigate: (view: any) => void; }

const DebugModule: React.FC<DebugModuleProps> = ({ report, onNavigate }) => {
  if (!report) return null;
  
  const radarData = report.fullHistory.map(h => ({ subject: h.name, A: report.targets.find(t => t.subjectId === h.id)?.impactScore || 0, fullMark: 20 }));
  
  // Filtra targets que possuem logs de questões (Prioriza Matemática se existir)
  const availableLogs = report.targets
    .map(t => ({
        ...t,
        log: report.fullHistory.find(h => h.id === t.subjectId)?.questionLog
    }))
    .filter(item => item.log && item.log.length > 0);

  return (
    <section className="space-y-8 sm:space-y-12 animate-in slide-in-from-bottom-6 duration-700 fade-in pb-20">
      
      {/* 1. KPIs de Auditoria */}
      <DebugKPIs report={report} />

      {/* 2. Integrity Distribution Section (TreeMap) */}
      <div className="bg-[#0f0f11] border border-[#333] p-1 relative group">
          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-yellow via-transparent to-transparent opacity-50"></div>
          <div className="bg-[#0a0a0c] p-4 sm:p-6 relative z-10">
              <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-yellow/10 rounded-sm"><Flame className="w-4 h-4 text-brand-yellow" /></div>
                      <div>
                          <h3 className="text-xs sm:text-sm font-black font-display text-white uppercase tracking-[0.2em] italic">MAPA_DE_INTEGRIDADE</h3>
                          <p className="text-[9px] font-mono text-brand-muted mt-0.5">Visualização de densidade de erro (Treemap Analysis)</p>
                      </div>
                  </div>
              </div>
              <IntegrityTreeMap report={report} />
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Radar de Urgência */}
          <div className="bg-[#0f0f11] border border-[#333] p-4 sm:p-6 flex flex-col relative overflow-hidden group">
              <div className="mb-6 flex items-center justify-between relative z-10">
                  <h3 className="text-[10px] sm:text-xs font-black font-display text-white uppercase tracking-widest flex items-center gap-3 italic">
                      <Crosshair className="w-4 h-4 text-brand-pink" />
                      RADAR_DE_URGÊNCIA
                  </h3>
              </div>
              <div className="flex-grow min-h-[250px] sm:min-h-[300px] w-full relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                          <PolarGrid stroke="#333" strokeDasharray="4 4" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#a3a3a3', fontSize: 10, fontFamily: 'monospace', fontWeight: 'bold' }} />
                          <PolarRadiusAxis angle={30} domain={[0, 'auto']} tick={false} axisLine={false} />
                          <Radar name="Urgência (Index)" dataKey="A" stroke="#ff0055" strokeWidth={2} fill="#ff0055" fillOpacity={0.2} />
                          <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid #333', borderRadius: '0' }} itemStyle={{ color: '#ff0055', textTransform: 'uppercase', fontSize: '10px', fontWeight: 'bold' }} />
                      </RadarChart>
                  </ResponsiveContainer>
              </div>
              <p className="text-center text-[8px] font-mono font-bold text-brand-muted mt-6 tracking-[0.3em] uppercase opacity-40">
                AUDIT_DENSITY_PROJECTION
              </p>
          </div>

          <div className="bg-[#0f0f11] border border-[#333] p-4 sm:p-6 flex flex-col">
              <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-[10px] sm:text-xs font-black font-display text-white uppercase tracking-widest flex items-center gap-3 italic">
                      <Layers className="w-4 h-4 text-brand-accent" />
                      DISTRIBUIÇÃO_DE_CARGA
                  </h3>
              </div>
              <div className="flex-grow min-h-[250px] sm:min-h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[ { name: 'BASE', ...report.fullHistory.reduce((acc, sub) => ({ ...acc, [sub.name]: sub.levels.filter(l => parseInt(l.nivel) <= 500).reduce((a, b) => a + b.erros, 0) }), {}) }, { name: 'MÉDIO', ...report.fullHistory.reduce((acc, sub) => ({ ...acc, [sub.name]: sub.levels.filter(l => parseInt(l.nivel) > 500 && parseInt(l.nivel) <= 700).reduce((a, b) => a + b.erros, 0) }), {}) }, { name: 'TOPO', ...report.fullHistory.reduce((acc, sub) => ({ ...acc, [sub.name]: sub.levels.filter(l => parseInt(l.nivel) > 700).reduce((a, b) => a + b.erros, 0) }), {}) } ]} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#222" horizontal={false} />
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" width={50} tick={{ fontSize: 9, fill: '#fff', fontWeight: 'bold', fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                          <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{ backgroundColor: '#050505', border: '1px solid #333', borderRadius: '0' }} itemStyle={{ fontSize: '10px', textTransform: 'uppercase', fontFamily: 'monospace' }} />
                          <Legend iconSize={8} wrapperStyle={{ fontSize: '9px', fontWeight: 'bold', fontFamily: 'monospace' }} />
                          {report.fullHistory.map((sub, idx) => (<Bar key={sub.id} dataKey={sub.name} stackId="a" fill={['#00ff9f', '#00f3ff', '#f3e600', '#ff0055'][idx % 4]} barSize={32} />))}
                      </BarChart>
                  </ResponsiveContainer>
              </div>
          </div>
          
          <div className="bg-[#0f0f11] border border-[#333] p-4 sm:p-6 flex flex-col lg:col-span-2">
              <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <h3 className="text-[10px] sm:text-xs font-black font-display text-white uppercase tracking-widest flex items-center gap-3 italic">
                      <TrendingUp className="w-4 h-4 text-brand-cyan" />
                      CCI_PERFORMANCE_CURVES
                  </h3>
                  <div className="flex gap-4 text-[9px] font-mono font-bold text-brand-muted uppercase">
                      <span className="flex items-center gap-1"><Lock className="w-2.5 h-2.5" /> DADOS_CRIPTOGRAFADOS</span>
                  </div>
              </div>
              <div className="flex-grow min-h-[300px] sm:min-h-[350px] w-full">
                  <CCIChart report={report} />
              </div>
          </div>
      </div>

      {/* 4. SEÇÃO DE AUDITORIA DE REDAÇÃO */}
      {report.redacaoAnalysis && (
        <RedacaoAuditSection analysis={report.redacaoAnalysis} />
      )}

      {/* 5. MATRIZ DE INTERVENÇÃO */}
      <div>
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-black font-display tracking-[0.3em] uppercase italic text-white flex items-center gap-3">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-brand-accent" />
                  MATRIZ_DE_INTERVENÇÃO
              </h3>
              <div className="flex-grow h-px bg-gradient-to-r from-brand-accent/30 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
              {report.targets.map((target, index) => (<TargetCard key={target.subjectId} target={target} rank={index + 1} />))}
          </div>
      </div>

      {/* 6. LOGS DE RESGATE */}
      <div className="border-t border-[#222] pt-8 sm:pt-12">
          <div className="flex items-center gap-4 mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-black font-display tracking-[0.3em] uppercase italic text-white flex items-center gap-3">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-brand-cyan" />
                  LOGS_DE_RESGATE
              </h3>
              <div className="flex-grow h-px bg-gradient-to-r from-brand-cyan/30 to-transparent"></div>
          </div>
          <ProtocolSection targets={report.targets} onNavigate={onNavigate} />
      </div>

      {/* 7. BLACK_BOX_RECOVERY: DETALHAMENTO DE ERROS */}
      {availableLogs.length > 0 && (
          <div className="border-t border-[#222] pt-8 sm:pt-12 animate-in fade-in duration-1000">
              <div className="flex items-center gap-4 mb-6 sm:mb-8">
                  <h3 className="text-base sm:text-lg font-black font-display tracking-[0.3em] uppercase italic text-white flex items-center gap-3">
                      <Database className="w-5 h-5 sm:w-6 sm:h-6 text-brand-emerald" />
                      BLACK_BOX_RECOVERY: DETALHAMENTO
                  </h3>
                  <div className="flex-grow h-px bg-gradient-to-r from-brand-emerald/30 to-transparent"></div>
              </div>
              
              <div className="space-y-8">
                {availableLogs.map((item) => (
                    <div key={item.subjectId} className="bg-[#0f0f11] p-1 border border-[#333]">
                         <div className="bg-[#1a1a1d] px-4 py-2 flex justify-between items-center border-b border-[#333]">
                             <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${item.subjectId === 'matematica' ? 'bg-brand-purple' : 'bg-brand-muted'}`}></span>
                                <span className="font-display font-bold text-xs text-white uppercase tracking-wider">{item.subjectName}</span>
                             </div>
                             <span className="font-mono text-[9px] text-brand-muted">LOG_ID: {item.subjectId.toUpperCase()}</span>
                        </div>
                        <QuestionTable questions={item.log || []} />
                    </div>
                ))}
              </div>

              <p className="text-[9px] font-mono text-brand-muted mt-4 text-right uppercase tracking-[0.2em] opacity-40">
                  Total de {availableLogs.length} módulos de memória extraídos
              </p>
          </div>
      )}
    </section>
  );
};

export default DebugModule;
