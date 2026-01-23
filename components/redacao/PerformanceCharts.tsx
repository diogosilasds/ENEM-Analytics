
import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, 
  ReferenceLine, Scatter, ComposedChart, Cell
} from 'recharts';
import { Layers, BarChart3 } from 'lucide-react';
import { RedacaoCompetencia } from '../../types';

export const CompetencyRadar: React.FC<{ competencias: RedacaoCompetencia[]; colors: any }> = ({ competencias, colors }) => {
    const radarData = competencias.map(c => ({
        subject: c.id,
        A: c.nota,
        fullMark: 200,
        meta: c.meta
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#333" strokeDasharray="3 3" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#fff', fontSize: 12, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={90} domain={[0, 200]} tick={false} axisLine={false} />
                <Radar name="Nota" dataKey="A" stroke={colors.cyan} strokeWidth={3} fill={colors.cyan} fillOpacity={0.4} />
                <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid #333' }} itemStyle={{ color: '#fff' }} />
            </RadarChart>
        </ResponsiveContainer>
    );
};

export const StackedScoreBar: React.FC<{ competencias: RedacaoCompetencia[], meta: number }> = ({ competencias, meta }) => {
    const colors = ['#ff0055', '#ff0055', '#f3e600', '#00ff9f', '#00f3ff'];
    const data = {
        name: 'Score',
        C1: competencias[0]?.nota || 0,
        C2: competencias[1]?.nota || 0,
        C3: competencias[2]?.nota || 0,
        C4: competencias[3]?.nota || 0,
        C5: competencias[4]?.nota || 0,
    };
    const nationalAvg = 650;

    return (
        <div className="bg-[#0f0f11] border border-[#333] p-6 h-full flex flex-col">
            <h4 className="text-[10px] font-black font-display text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-accent" /> Composição Linear do Score
            </h4>
            <div className="flex-grow flex items-center">
                <div className="w-full h-12 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={[data]} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <XAxis type="number" domain={[0, 1000]} hide />
                            <YAxis type="category" dataKey="name" hide />
                            <Tooltip 
                                cursor={{fill: 'transparent'}}
                                contentStyle={{ backgroundColor: '#050505', border: '1px solid #333', fontSize: '10px' }}
                            />
                            <Bar dataKey="C1" stackId="a" fill={colors[0]} />
                            <Bar dataKey="C2" stackId="a" fill={colors[1]} />
                            <Bar dataKey="C3" stackId="a" fill={colors[2]} />
                            <Bar dataKey="C4" stackId="a" fill={colors[3]} />
                            <Bar dataKey="C5" stackId="a" fill={colors[4]} />
                            <ReferenceLine x={meta} stroke="#ffffff" strokeDasharray="3 3" label={{ position: 'top', value: `META: ${meta}`, fill: '#fff', fontSize: 9, fontWeight: 'bold', fontFamily: 'monospace' }} />
                            <ReferenceLine x={nationalAvg} stroke="#a3a3a3" strokeDasharray="2 2" label={{ position: 'bottom', value: `MÉDIA BR: 650`, fill: '#a3a3a3', fontSize: 8, fontWeight: 'bold', fontFamily: 'monospace' }} />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 border border-white/5 pointer-events-none -z-10"></div>
                </div>
            </div>
            <div className="flex justify-between mt-4">
                {competencias.map((c, i) => (
                    <div key={c.id} className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full mb-1" style={{ backgroundColor: colors[i] }}></div>
                        <span className="text-[8px] font-mono text-brand-muted">{c.id}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const LollipopChart: React.FC<{ competencias: RedacaoCompetencia[] }> = ({ competencias }) => {
    const data = competencias.map((c, i) => ({
        name: c.id,
        val: c.nota,
        full: 200,
        color: c.nota < 140 ? '#ff0055' : c.nota < 180 ? '#f3e600' : '#00ff9f'
    }));

    return (
        <div className="bg-[#0f0f11] border border-[#333] p-6 h-full min-h-[300px] flex flex-col">
            <h4 className="text-[10px] font-black font-display text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-brand-cyan" /> Discrepância de Performance (0-200)
            </h4>
            <div className="flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                        <XAxis type="number" domain={[0, 200]} tick={{ fill: '#666', fontSize: 9 }} hide />
                        <YAxis dataKey="name" type="category" tick={{ fill: '#fff', fontSize: 10, fontWeight: 'bold' }} width={30} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid #333' }} itemStyle={{ color: '#fff', fontSize: '10px' }} />
                        <Bar dataKey="val" barSize={2} fill="#333" />
                        <Scatter dataKey="val" fill="#00f3ff">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Scatter>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            <p className="text-[8px] font-mono text-brand-muted text-center mt-2 opacity-40 uppercase tracking-widest">Comparative Matrix Analytics</p>
        </div>
    );
};
