
import React from 'react';
import { DebugReport, DebugTarget, DebugRedacaoAnalysis } from '../../../types';
import { ScanEye, Crosshair, Target, Flame, TrendingUp, Layers, HelpCircle, FileText, ChevronRight, AlertOctagon, Terminal, Activity, Lock, ShieldCheck, ArrowUpRight, AlertTriangle, PenTool, Highlighter, BookOpen, AlertCircle } from 'lucide-react';
import { ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, Legend, LineChart, Line, Treemap, Cell } from 'recharts';

interface DebugModuleProps { report: DebugReport; onNavigate: (view: any) => void; }

// === COMPONENTES DE UI (VISUAL SYSTEM) ===

const DebugKPIs: React.FC<{ report: DebugReport }> = ({ report }) => {
    // Calcula integridade como inverso da taxa de erro global (0-100%)
    const integrity = Math.max(0, 100 - report.globalErrorRate).toFixed(1);

    const cards = [
        {
            label: 'FALHAS TOTAIS',
            value: report.totalErrors,
            sub: 'LOG_COUNT',
            icon: AlertOctagon,
            color: 'group-hover:text-white',
        },
        {
            label: 'ZONA CRÍTICA',
            value: report.criticalZoneErrors,
            sub: 'NÍVEIS < 650',
            icon: Activity,
            color: 'group-hover:text-brand-pink',
        },
        {
            label: 'INTEGRIDADE',
            value: `${integrity}%`,
            sub: 'SYS_STATUS',
            icon: ShieldCheck,
            color: 'group-hover:text-brand-cyan',
        },
        {
            label: 'ALVO PRIMÁRIO',
            value: report.mostCriticalSubject,
            sub: 'ALPHA_TARGET',
            icon: Crosshair,
            color: 'group-hover:text-brand-pink',
            isCritical: true
        }
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            {cards.map((item, idx) => {
                const valStr = String(item.value);
                const isLongText = valStr.length > 10;
                
                return (
                    <div 
                        key={idx} 
                        className={`relative p-4 md:p-5 border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:bg-white/10 overflow-hidden group flex flex-col justify-between`}
                    >
                        {/* Decorative Corner */}
                        <div className={`absolute top-0 right-0 w-3 h-3 border-t border-r ${item.isCritical ? 'border-brand-pink/40' : 'border-white/20'}`}></div>
                        
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[9px] font-bold tracking-[0.2em] ${item.isCritical ? 'text-brand-pink' : 'text-brand-muted'} uppercase truncate`}>
                                    {item.label}
                                </span>
                                <item.icon className={`w-3.5 h-3.5 opacity-40 text-brand-muted transition-colors duration-300 ${item.color}`} />
                            </div>

                            <div className="flex items-baseline gap-1 mt-1 overflow-hidden">
                                <span className={`font-black font-display tracking-tight text-white group-hover:scale-105 transition-transform duration-300 origin-left break-words leading-none ${isLongText ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl md:text-3xl'}`}>
                                    {item.value}
                                </span>
                            </div>
                        </div>

                        <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[9px] font-mono text-brand-muted truncate max-w-full">
                                {item.sub}
                            </span>
                            <ArrowUpRight className={`w-2.5 h-2.5 text-brand-muted opacity-30 group-hover:text-white group-hover:opacity-100 transition-all ${item.isCritical ? 'group-hover:text-brand-pink' : ''}`} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

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

const CCIChart: React.FC<{ report: DebugReport }> = ({ report }) => {
    const levels = ['350', '400', '450', '500', '550', '600', '650', '700', '750', '800', '850', '900'];
    const data = levels.map(lvl => {
        const obj: any = { name: lvl };
        report.fullHistory.forEach(sub => {
            const lData = sub.levels.find(l => l.nivel === lvl);
            obj[sub.name] = lData && lData.total > 0 ? lData.taxa : null;
        });
        return obj;
    });
    const colors = ['#00ff9f', '#00f3ff', '#f3e600', '#ff0055'];
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#666', fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#666', fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid #333', borderRadius: '0' }} itemStyle={{ fontSize: '10px', fontFamily: 'monospace', textTransform: 'uppercase' }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: '9px', paddingTop: '10px', fontFamily: 'monospace' }} />
                {report.fullHistory.map((sub, idx) => (
                    <Line key={sub.id} type="monotone" dataKey={sub.name} stroke={colors[idx % colors.length]} strokeWidth={3} dot={{ r: 3, fill: colors[idx % colors.length], strokeWidth: 0 }} activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }} connectNulls />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
};

// === NOVO COMPONENTE: AUDITORIA DE REDAÇÃO ===
const RedacaoAuditSection: React.FC<{ analysis: DebugRedacaoAnalysis }> = ({ analysis }) => {
    return (
        <div className="bg-[#0f0f11] border border-[#333] p-1 relative group mt-8">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-brand-accent via-transparent to-transparent opacity-50"></div>
            <div className="bg-[#0a0a0c] p-4 sm:p-6 relative z-10">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-brand-accent/10 rounded-sm"><PenTool className="w-4 h-4 text-brand-accent" /></div>
                    <div>
                        <h3 className="text-xs sm:text-sm font-black font-display text-white uppercase tracking-[0.2em] italic">AUDITORIA: PRODUÇÃO TEXTUAL</h3>
                        <p className="text-[9px] font-mono text-brand-muted mt-0.5">Análise de falhas estruturais e gramaticais</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* 1. Gráfico de Competências (Gaps) */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-[10px] font-bold font-display text-white uppercase tracking-wider flex items-center gap-2">
                                <Activity className="w-3 h-3 text-brand-accent" /> GAP por Competência (Alvo: 200)
                            </h4>
                        </div>
                        <div className="h-[250px] w-full border border-[#222] bg-[#0f0f11] p-2">
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={analysis.competencies} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#222" horizontal={false} />
                                    <XAxis type="number" domain={[0, 200]} hide />
                                    <YAxis dataKey="id" type="category" width={30} tick={{ fontSize: 10, fill: '#fff', fontWeight: 'bold' }} />
                                    <Tooltip 
                                        cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                                        contentStyle={{ backgroundColor: '#050505', border: '1px solid #333' }}
                                        labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                                    />
                                    <Bar dataKey="score" name="Nota Atual" stackId="a" fill="#00ff9f" barSize={20} />
                                    <Bar dataKey="gap" name="Perda" stackId="a" fill="#333" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        
                        {/* Histórico Simplificado (Linha) */}
                        {analysis.history.length > 0 && (
                            <div className="mt-6">
                                <h4 className="text-[10px] font-bold font-display text-brand-muted uppercase tracking-wider mb-2">Evolução Histórica</h4>
                                <div className="h-[100px] w-full border-t border-[#222] pt-2">
                                     <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={analysis.history}>
                                            <Line type="monotone" dataKey="score" stroke="#00f3ff" strokeWidth={2} dot={{r: 3, fill: '#00f3ff'}} />
                                            <YAxis domain={['dataMin - 40', 'dataMax + 40']} hide />
                                            <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid #333' }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 2. Matriz de Desvios (Log de Erros) */}
                    <div className="bg-[#121214] border border-[#222] p-4 flex flex-col">
                        <h4 className="text-[10px] font-bold font-display text-white uppercase tracking-wider flex items-center gap-2 mb-4">
                            <AlertCircle className="w-3 h-3 text-brand-pink" /> Matriz de Desvios
                        </h4>
                        
                        <div className="space-y-4 flex-grow">
                            <div className="flex justify-between items-center pb-2 border-b border-[#333]">
                                <span className="text-[9px] font-mono text-brand-muted">TOTAL DE OCORRÊNCIAS</span>
                                <span className="text-xl font-black text-white">{analysis.totalTextErrors}</span>
                            </div>

                            <div className="space-y-2">
                                {analysis.textErrors.map((err, idx) => (
                                    <div key={idx} className="flex items-center justify-between group">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${err.type === 'grammar' ? 'bg-brand-pink' : err.type === 'structure' ? 'bg-brand-yellow' : 'bg-brand-cyan'}`}></div>
                                            <span className="text-[10px] font-mono text-brand-muted uppercase group-hover:text-white transition-colors">{err.label}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-24 h-1.5 bg-[#222] rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full ${err.type === 'grammar' ? 'bg-brand-pink' : err.type === 'structure' ? 'bg-brand-yellow' : 'bg-brand-cyan'}`} 
                                                    style={{ width: `${(err.count / Math.max(analysis.totalTextErrors, 1)) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-bold text-white min-w-[20px] text-right">{err.count}</span>
                                        </div>
                                    </div>
                                ))}
                                {analysis.textErrors.length === 0 && (
                                    <p className="text-[10px] text-brand-muted italic text-center py-4">Nenhum erro textual registrado.</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-[#333]">
                            <p className="text-[9px] font-mono text-brand-muted mb-1">COMPETÊNCIA CRÍTICA</p>
                            <p className="text-xs font-black text-brand-pink uppercase">{analysis.criticalCompetency}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TargetCard: React.FC<{ target: DebugTarget; rank: number }> = ({ target, rank }) => {
    const isPrimary = rank === 1;
    const labelColor = isPrimary ? 'text-brand-pink' : (rank === 2 ? 'text-brand-yellow' : 'text-brand-accent');
    const borderClass = 'border-[#333]'; 
    const cardBg = 'bg-[#121214]'; 
    const gaugeColor = 'bg-[#ff2400]'; 

    return (
        <div className={`relative ${cardBg} border ${borderClass} p-4 sm:p-5 flex flex-col justify-between group hover:brightness-110 transition-all duration-300 h-full overflow-hidden`}>
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent)', backgroundSize: '30px 30px' }}></div>
            
            <div className="relative z-10 flex justify-between items-start mb-4 sm:mb-6">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[9px] font-black font-mono tracking-[0.2em] uppercase ${labelColor}`}>PRIORIDADE #{rank}</span>
                        {isPrimary && <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-pink opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-brand-pink"></span></span>}
                    </div>
                    <h3 className="text-base sm:text-lg font-black font-display text-white uppercase tracking-wider leading-none break-words max-w-full">
                        {target.subjectName}
                    </h3>
                </div>
                <div className={`flex flex-col items-end text-brand-accent shrink-0 ml-2`}>
                    <span className="text-[9px] font-mono opacity-70">NÍVEL</span>
                    <span className="text-xl sm:text-2xl font-black font-display leading-none">{target.priorityLevel}</span>
                </div>
            </div>
            <div className="relative z-10 space-y-4">
                <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono text-brand-muted uppercase"><span>Fator de Impacto</span><span className="text-white font-bold">{target.impactScore.toFixed(1)}</span></div>
                    <div className="h-1.5 w-full bg-black/50 border border-white/10">
                        <div className={`h-full ${gaugeColor} transition-all duration-1000`} style={{ width: `${Math.min((target.impactScore / 20) * 100, 100)}%` }}></div>
                    </div>
                </div>
                <div className="space-y-1">
                     <div className="flex justify-between text-[9px] font-mono text-brand-muted uppercase"><span>Precisão Local</span><span className="text-white font-bold">{target.accuracy.toFixed(0)}%</span></div>
                     <div className="h-1.5 w-full bg-black/50 border border-white/10 flex gap-0.5">{[...Array(10)].map((_, i) => (<div key={i} className={`flex-1 ${i < (target.accuracy / 10) ? 'bg-brand-accent' : 'bg-white/5'}`}></div>))}</div>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-brand-muted"><span>ERROS: <span className="text-white font-bold">{target.errorCount}</span></span><span>AMOSTRA: <span className="text-white font-bold">{target.totalQuestions}</span></span></div>
            </div>
            <div className="absolute bottom-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity"><Target className={`w-12 h-12 ${labelColor} opacity-10 rotate-45`} /></div>
        </div>
    );
};

const ProtocolSection: React.FC<{ targets: DebugTarget[], onNavigate: (view: any) => void }> = ({ targets, onNavigate }) => {
    return (
        <div className="grid grid-cols-1 gap-4">
            {targets.map((target, index) => {
                const isCritical = index === 0;
                const stripColor = isCritical ? 'bg-brand-pink' : 'bg-brand-yellow';
                const statusTextColor = isCritical ? 'text-brand-pink' : 'text-brand-yellow';

                return (
                    <button 
                        key={target.subjectId} 
                        onClick={() => { onNavigate(target.subjectId); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className={`w-full text-left bg-[#0f0f11] border border-[#333] hover:border-brand-accent hover:bg-[#121215] transition-all group relative overflow-hidden flex flex-col md:flex-row items-stretch`}
                    >
                        <div className={`w-full md:w-1.5 h-1 md:h-auto md:min-h-full self-stretch ${stripColor} group-hover:bg-brand-accent transition-colors duration-300 shrink-0`}></div>
                        
                        <div className="p-4 sm:p-5 flex-grow flex flex-col md:flex-row gap-4 sm:gap-6 items-start md:items-center">
                            <div className="min-w-[140px] flex md:block items-center gap-3 md:gap-0">
                                <div className="flex items-center gap-2 text-[9px] font-mono text-brand-muted uppercase tracking-widest mb-0 md:mb-1"><Terminal className="w-3 h-3" /><span>LOG_ID: 00{index + 1}</span></div>
                                <div className={`text-xs sm:text-sm font-black font-display ${isCritical ? 'text-brand-pink' : 'text-white'} uppercase tracking-wider group-hover:text-brand-accent transition-colors`}>{target.subjectName}</div>
                            </div>
                            <div className="flex-grow font-mono text-xs md:text-sm text-brand-muted border-l-0 md:border-l border-t md:border-t-0 border-[#333] pl-0 md:pl-6 pt-3 md:pt-0 leading-relaxed relative w-full">
                                 <div className="hidden md:block absolute -left-[1px] top-0 w-[1px] h-2 bg-brand-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <div className="hidden md:block absolute -left-[1px] bottom-0 w-[1px] h-2 bg-brand-accent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                 <span className={`${statusTextColor} font-black uppercase mr-2 block sm:inline mb-1 sm:mb-0`}>[{isCritical ? 'CRÍTICO' : 'ALERTA'}]</span>
                                 {target.recommendation}
                            </div>
                            <div className="hidden md:flex flex-col items-center justify-center pl-4 border-l border-[#333] min-w-[100px] self-stretch gap-1">
                                 <div className="p-2 border border-white/10 rounded-sm group-hover:bg-brand-accent group-hover:border-brand-accent group-hover:text-black transition-all"><ChevronRight className="w-4 h-4" /></div>
                                 <span className="text-[8px] font-mono text-brand-muted uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Acessar</span>
                            </div>
                        </div>
                    </button>
                );
            })}
        </div>
    );
};

const DebugModule: React.FC<DebugModuleProps> = ({ report, onNavigate }) => {
  if (!report) return null;
  const radarData = report.fullHistory.map(h => ({ subject: h.name, A: report.targets.find(t => t.subjectId === h.id)?.impactScore || 0, fullMark: 20 }));
  return (
    <section className="space-y-8 sm:space-y-12 animate-in slide-in-from-bottom-6 duration-700 fade-in pb-20">
      
      {/* 2. KPIs de Auditoria */}
      <DebugKPIs report={report} />

      {/* 3. Integrity Distribution Section (TreeMap) */}
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

      {/* NOVO: SEÇÃO DE AUDITORIA DE REDAÇÃO */}
      {report.redacaoAnalysis && (
        <RedacaoAuditSection analysis={report.redacaoAnalysis} />
      )}

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
    </section>
  );
};

export default DebugModule;