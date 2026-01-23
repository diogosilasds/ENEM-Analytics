
import React from 'react';
import { PenTool, Activity, AlertCircle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, ReferenceLine } from 'recharts';
import { DebugRedacaoAnalysis } from '../../types';

const RedacaoAuditSection: React.FC<{ analysis: DebugRedacaoAnalysis }> = ({ analysis }) => {
    const nationalAvg = 650;
    
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
                        
                        {/* Histórico Simplificado (Linha) - ATUALIZADO */}
                        {analysis.history.length > 0 && (
                            <div className="mt-6">
                                <h4 className="text-[10px] font-bold font-display text-brand-muted uppercase tracking-wider mb-4">Evolução Histórica</h4>
                                <div className="h-[180px] w-full border border-[#222] bg-[#0f0f11] p-4">
                                     <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={analysis.history} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                            <XAxis 
                                                dataKey="label" 
                                                tick={{ fontSize: 9, fill: '#666', fontFamily: 'monospace' }} 
                                                axisLine={false} 
                                                tickLine={false}
                                                dy={10}
                                            />
                                            <YAxis 
                                                domain={[0, 1000]} 
                                                tick={{ fontSize: 9, fill: '#666', fontFamily: 'monospace' }} 
                                                axisLine={false} 
                                                tickLine={false}
                                            />
                                            <Tooltip 
                                                contentStyle={{ backgroundColor: '#050505', border: '1px solid #333' }}
                                                itemStyle={{ color: '#00f3ff', fontSize: '10px', fontFamily: 'monospace' }}
                                                labelStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'bold' }}
                                            />
                                            <ReferenceLine y={nationalAvg} stroke="#a3a3a3" strokeDasharray="3 3" label={{ position: 'right', value: 'Média BR (650)', fill: '#a3a3a3', fontSize: 9 }} />
                                            <Line 
                                                type="monotone" 
                                                dataKey="score" 
                                                stroke="#00f3ff" 
                                                strokeWidth={2} 
                                                dot={{r: 4, fill: '#050505', stroke: '#00f3ff', strokeWidth: 2}} 
                                                activeDot={{ r: 6, fill: '#fff' }}
                                                label={{ position: 'top', fill: '#fff', fontSize: 10, fontWeight: 'bold', dy: -8 }}
                                            />
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

export default RedacaoAuditSection;
