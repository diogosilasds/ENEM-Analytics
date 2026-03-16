
import React, { useMemo } from 'react';
import { PenTool, Activity, AlertCircle, CalendarRange } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, ReferenceLine, Cell } from 'recharts';
import { DebugRedacaoAnalysis } from '../../types';

const RedacaoAuditSection: React.FC<{ analysis: DebugRedacaoAnalysis }> = ({ analysis }) => {
    const nationalAvg = 650;
    const targetGoal = 850;
    
    // Lógica de Agregação Mensal
    const monthlyData = useMemo(() => {
        const months = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
        return months.map((monthName, index) => {
            // Filtra redações do mês específico (considerando formato YYYY-MM-DD)
            const essaysInMonth = analysis.history.filter(h => {
                if (!h.date || h.date === 'N/A') return false;
                const parts = h.date.split('-');
                if (parts.length < 2) return false;
                const monthNum = parseInt(parts[1]);
                return monthNum === index + 1; // index 0 = mês 1
            });

            const totalScore = essaysInMonth.reduce((acc, curr) => acc + curr.score, 0);
            const count = essaysInMonth.length;
            const average = count > 0 ? Math.round(totalScore / count) : 0;

            return {
                name: monthName,
                average: average,
                count: count
            };
        });
    }, [analysis.history]);

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
                    <div className="lg:col-span-2 space-y-8">
                        {/* Seção de GAPS */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="text-[10px] font-bold font-display text-white uppercase tracking-wider flex items-center gap-2">
                                    <Activity className="w-3 h-3 text-brand-accent" /> GAP por Competência (Alvo: 200)
                                </h4>
                            </div>
                            <div className="h-[200px] w-full border border-[#222] bg-[#0f0f11] p-2">
                                 <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={analysis.competencies} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#222" horizontal={false} />
                                        <XAxis type="number" domain={[0, 200]} hide />
                                        <YAxis dataKey="id" type="category" width={30} tick={{ fontSize: 10, fill: '#fff', fontWeight: 'bold' }} />
                                        <Tooltip 
                                            cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                                            contentStyle={{ backgroundColor: '#050505', border: '1px solid #333' }}
                                            itemStyle={{ color: '#fff', fontSize: '10px', fontFamily: 'monospace' }}
                                            labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                                        />
                                        <Bar dataKey="score" name="Nota Atual" stackId="a" fill="#00ff9f" barSize={16} />
                                        <Bar dataKey="gap" name="Perda" stackId="a" fill="#333" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        
                        {/* NOVO GRÁFICO: Média Mensal (Pedido do Usuário) */}
                        <div className="space-y-4 pt-4 border-t border-[#222]">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="text-[10px] font-bold font-display text-white uppercase tracking-wider flex items-center gap-2">
                                    <CalendarRange className="w-3 h-3 text-brand-cyan" /> Evolução de Média Mensal (2026)
                                </h4>
                                <div className="text-[9px] font-mono text-brand-muted">
                                    OBJETIVO: <span className="text-brand-accent font-bold">{targetGoal}</span>
                                </div>
                            </div>
                            <div className="h-[220px] w-full border border-[#222] bg-[#0f0f11] p-4 relative">
                                 <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={monthlyData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                                        <XAxis 
                                            dataKey="name" 
                                            tick={{ fontSize: 9, fill: '#666', fontFamily: 'monospace', fontWeight: 'bold' }} 
                                            axisLine={false} 
                                            tickLine={false}
                                            dy={5}
                                        />
                                        <YAxis 
                                            domain={[0, 1000]} 
                                            tick={{ fontSize: 9, fill: '#666', fontFamily: 'monospace' }} 
                                            ticks={[0, 200, 400, 600, 800, 1000]}
                                            axisLine={false} 
                                            tickLine={false}
                                        />
                                        <Tooltip 
                                            cursor={{fill: 'rgba(255,255,255,0.05)'}}
                                            contentStyle={{ backgroundColor: '#050505', border: '1px solid #333' }}
                                            itemStyle={{ color: '#fff', fontSize: '10px', fontFamily: 'monospace' }}
                                            labelStyle={{ color: '#fff', fontSize: '10px', fontWeight: 'bold', marginBottom: '5px' }}
                                            formatter={(value: any, name: any, props: any) => [
                                                `${value} Pontos`, 
                                                `Média (${props.payload.count} redações)`
                                            ]}
                                        />
                                        <ReferenceLine y={targetGoal} stroke="#00ff9f" strokeDasharray="3 3" label={{ position: 'right', value: `META: ${targetGoal}`, fill: '#00ff9f', fontSize: 9, fontWeight: 'bold', fontFamily: 'monospace' }} />
                                        <Bar dataKey="average" name="Média Mensal" radius={[2, 2, 0, 0]} maxBarSize={40}>
                                            {monthlyData.map((entry, index) => (
                                                <Cell 
                                                    key={`cell-${index}`} 
                                                    fill={entry.average >= targetGoal ? '#00ff9f' : entry.average > 0 ? '#00f3ff' : '#1a1a1a'} 
                                                    fillOpacity={entry.average > 0 ? 1 : 0.3}
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                                
                                {/* Label decorativo para meses vazios */}
                                <div className="absolute top-2 right-2 flex items-center gap-2">
                                     <div className="flex items-center gap-1">
                                         <div className="w-2 h-2 bg-brand-accent"></div>
                                         <span className="text-[8px] font-mono text-brand-muted">ATINGIU</span>
                                     </div>
                                     <div className="flex items-center gap-1">
                                         <div className="w-2 h-2 bg-brand-cyan"></div>
                                         <span className="text-[8px] font-mono text-brand-muted">EM PROGRESSO</span>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Matriz de Desvios (Log de Erros) - Mantida na coluna lateral */}
                    <div className="bg-[#121214] border border-[#222] p-4 flex flex-col h-full">
                        <h4 className="text-[10px] font-bold font-display text-white uppercase tracking-wider flex items-center gap-2 mb-4">
                            <AlertCircle className="w-3 h-3 text-brand-pink" /> Matriz de Desvios
                        </h4>
                        
                        <div className="space-y-4 flex-grow">
                            <div className="flex justify-between items-center pb-2 border-b border-[#333]">
                                <span className="text-[9px] font-mono text-brand-muted">TOTAL DE OCORRÊNCIAS</span>
                                <span className="text-xl font-black text-white">{analysis.totalTextErrors}</span>
                            </div>

                            <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
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
