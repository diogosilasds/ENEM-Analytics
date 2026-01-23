
import React from 'react';
import { TrendingUp } from 'lucide-react';

interface ScoreGaugeProps {
  score: number;
  meta: number;
}

const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score, meta }) => {
  const radius = 95; 
  const circumference = 2 * Math.PI * radius;
  const coverage = 0.75; 
  const maxStroke = circumference * coverage;

  const normalizedScore = Math.min(Math.max(score, 0), 1000);
  const fillPercentage = normalizedScore / 1000;
  const currentStroke = maxStroke * fillPercentage;

  // Valor da Média Nacional (Referência externa e interna)
  const nationalAvg = 650;

  // Escala externa solicitada: 0, 250, 500, 650, 750, 1000
  const scaleValues = [0, 250, 500, 650, 750, 1000];

  const renderScale = () => {
    return scaleValues.map((val) => {
      const isAvg = val === nationalAvg;
      const angleDeg = 135 + (val / 1000) * 270;
      const angleRad = (angleDeg * Math.PI) / 180;
      const r = radius + 24; 
      const x = 128 + r * Math.cos(angleRad);
      const y = 128 + r * Math.sin(angleRad);
      
      return (
        <div 
            key={val}
            className={`absolute font-mono font-bold transform -translate-x-1/2 -translate-y-1/2 select-none flex flex-col items-center leading-none ${isAvg ? 'text-white z-20' : 'text-brand-muted opacity-60'}`}
            style={{ 
              left: `${(x / 256) * 100}%`, 
              top: `${(y / 256) * 100}%` 
            }}
        >
            <span className={isAvg ? 'text-[10px] drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]' : 'text-[9px]'}>
              {val}
            </span>
            {isAvg && (
              <span className="text-[6px] tracking-tighter whitespace-nowrap mt-0.5 text-brand-yellow font-black uppercase italic">
                Média BR
              </span>
            )}
        </div>
      );
    });
  };

  return (
    <div className="relative w-72 h-72 flex items-center justify-center">
      {renderScale()}
      
      <svg className="w-full h-full" viewBox="0 0 256 256">
        <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff0055" />  
                <stop offset="33%" stopColor="#f3e600" />  
                <stop offset="66%" stopColor="#00ff9f" />  
                <stop offset="100%" stopColor="#00f3ff" /> 
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <g transform="rotate(135 128 128)">
            {/* Background Track */}
            <circle cx="128" cy="128" r={radius} stroke="#1f1f22" strokeWidth="10" fill="transparent" strokeDasharray={`${maxStroke} ${circumference}`} strokeLinecap="round" />
            
            {/* Score Progress */}
            <circle cx="128" cy="128" r={radius} stroke="url(#scoreGradient)" strokeWidth="10" fill="transparent" strokeDasharray={`${currentStroke} ${circumference}`} strokeDashoffset="0" strokeLinecap="round" filter="url(#glow)" className="transition-all duration-1000 ease-out" />
            
            {/* Visual marker for average inside the gauge track */}
            <line 
                x1={128 + radius - 5} 
                y1={128} 
                x2={128 + radius + 5} 
                y2={128} 
                stroke="#f3e600" 
                strokeWidth="2" 
                strokeOpacity="0.8"
                transform={`rotate(${(nationalAvg / 1000) * 270} 128 128)`}
            />

            {/* Needle/Cursor at Current Score */}
            <g style={{ transform: `rotate(${(normalizedScore / 1000) * 270}deg)`, transformOrigin: '128px 128px', transition: 'transform 1s ease-out' }}>
                <rect x={128 + radius - 8} y={126} width={16} height={4} fill="#ffffff" rx={1} className="drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]" />
            </g>
        </g>
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pt-4 pointer-events-none">
        <span className="text-[10px] font-mono text-brand-muted tracking-widest uppercase mb-1">Nota Final</span>
        <span className="text-5xl font-black font-display text-white tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{score}</span>
        <div className="flex items-center gap-2 mt-2 bg-white/5 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
          <TrendingUp className="w-3 h-3 text-brand-emerald" />
          <span className="text-[10px] font-mono font-bold text-brand-emerald">Meta: {meta}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreGauge;
