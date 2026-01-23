
import React from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { DebugReport } from '../../types';

export const CCIChart: React.FC<{ report: DebugReport }> = ({ report }) => {
    const levels = ['350', '400', '450', '500', '550', '600', '650', '700', '750', '800', '850', '900', '950', '1000'];
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
