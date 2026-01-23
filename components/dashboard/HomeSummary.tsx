
import React, { useEffect, useState, useMemo } from 'react';
import { MateriaData } from '../../types';
import { ArrowRight, Cpu, Activity, Database, Bug, Crosshair, AlertTriangle, Zap } from 'lucide-react';
import { dashboardService } from '../../services/dashboardService';

interface HomeSummaryProps {
  subjects: { id: string; data: MateriaData; color: string }[];
  onSelect: (id: any) => void;
}

interface SubjectCardProps {
    sub: { id: string; data: MateriaData; color: string };
    onSelect: (id: any) => void;
    idToLabel: Record<string, string>;
}

// Sub-componente para gerenciar a animação e renderização individual de cada card
const SubjectCard: React.FC<SubjectCardProps> = ({ 
    sub, 
    onSelect, 
    idToLabel 
}) => {
    const hasData = sub.data.questoes.total > 0;
    const targetPercentage = hasData ? sub.data.questoes.taxa : 0;
    const [width, setWidth] = useState(0);

    // Animação de entrada da barra de progresso
    useEffect(() => {
        const timer = setTimeout(() => {
            setWidth(targetPercentage);
        }, 100);
        return () => clearTimeout(timer);
    }, [targetPercentage]);

    const shortLabel = idToLabel[sub.id] || sub.id.substring(0,3).toUpperCase();
    const percentage = targetPercentage;

    // Define cor baseada no status
    const statusColor = hasData ? 'text-brand-accent' : 'text-brand-muted';
    const borderColorClass = hasData ? 'bg-brand-accent' : 'bg-[#444]';

    return (
        <button 
            onClick={() => onSelect(sub.id)}
            className="text-left relative h-[200px] transition-all duration-300 group w-full flex flex-col justify-between overflow-hidden cyber-shape bg-[#0a0a0c] hover:-translate-y-1"
        >
            {/* Cyber Shape Custom Border */}
            <div className={`absolute inset-0 w-full h-full opacity-30 group-hover:opacity-100 transition-opacity cyber-shape-border ${borderColorClass}`}></div>

            {/* 1. Background Watermark (Big Typography) */}
            <div className={`absolute -right-2 -top-6 text-[120px] font-black font-display opacity-[0.03] select-none transition-transform duration-500 group-hover:scale-110 ${hasData ? 'text-brand-accent' : 'text-white'}`}>
                {shortLabel}
            </div>

            {/* 2. Top Bar Decoration */}
            <div className={`absolute top-0 left-0 w-full h-[2px] transition-all duration-500 ${hasData ? 'bg-gradient-to-r from-brand-accent via-transparent to-transparent opacity-50 group-hover:opacity-100' : 'bg-[#222]'}`}></div>

            {/* 3. Scanner Effect on Hover */}
            {hasData && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-accent/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out pointer-events-none z-0"></div>
            )}

            <div className="p-5 relative z-10 w-full h-full flex flex-col justify-between">
                
                {/* Header: Title & Status */}
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                         <span className={`text-[9px] font-mono font-bold tracking-[0.2em] uppercase mb-1 ${hasData ? 'text-brand-muted' : 'text-brand-muted/40'}`}>
                            MÓDULO 0{shortLabel === 'HUM' ? '1' : shortLabel === 'LIN' ? '2' : shortLabel === 'MAT' ? '3' : shortLabel === 'NAT' ? '4' : '5'}
                         </span>
                         <h4 className={`text-sm md:text-base font-black font-display uppercase tracking-wider leading-tight ${hasData ? 'text-white' : 'text-brand-muted'}`}>
                            {sub.data.titulo}
                        </h4>
                    </div>

                    {/* Status sem borda, apenas texto e indicador */}
                    <div className={`flex items-center gap-2 text-[9px] font-mono font-bold tracking-widest ${statusColor} uppercase`}>
                        {hasData ? (
                            <>
                                <span className="relative flex h-1.5 w-1.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-accent"></span>
                                </span>
                                SYS_ONLINE
                            </>
                        ) : (
                            <>
                                <span className="h-1.5 w-1.5 rounded-full bg-brand-muted/30"></span>
                                OFFLINE
                            </>
                        )}
                    </div>
                </div>

                {/* Body: Metrics */}
                {hasData ? (
                    <div className="flex items-end justify-between mt-2">
                        <div>
                            <div className="text-[9px] font-mono text-brand-muted uppercase tracking-wider mb-0.5">Buffer Score</div>
                            <div className="text-4xl md:text-5xl font-black font-display text-white tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]">
                                {sub.data.notaAtual}
                            </div>
                        </div>
                        
                        <div className="text-right mb-1">
                             <div className="flex items-center justify-end gap-1 text-brand-accent font-bold font-mono text-xl">
                                <Zap className="w-3 h-3 fill-current" />
                                {percentage.toFixed(0)}%
                             </div>
                             <div className="text-[8px] font-mono text-brand-muted uppercase tracking-widest">Eficiência</div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-grow flex items-center justify-center">
                        <div className="h-px w-12 bg-[#333] rotate-45"></div>
                    </div>
                )}

                {/* Footer: Progress Bar */}
                <div className="mt-4">
                    {hasData ? (
                        <div className="h-1 bg-[#1f1f22] w-full relative overflow-hidden">
                            <div 
                                className="h-full bg-brand-accent shadow-[0_0_10px_rgba(0,255,159,0.5)] transition-all duration-1000 ease-out"
                                style={{ width: `${width}%` }}
                            ></div>
                        </div>
                    ) : (
                        <div className="h-1 bg-[#1f1f22] w-full opacity-30"></div>
                    )}
                </div>
            </div>
        </button>
    );
};

// Debug Card - Stylized as a "Black Box" Recorder
const DebugCard: React.FC<{ onSelect: (id: any) => void }> = ({ onSelect }) => {
    const report = useMemo(() => dashboardService.getDebugReport(), []);

    return (
        <button 
            onClick={() => onSelect('debug')}
            className="text-left relative h-[200px] transition-all duration-300 group w-full flex flex-col justify-between overflow-hidden cyber-shape bg-[#0f0f11] hover:-translate-y-1"
        >
             {/* Cyber Shape Border for Debug - Pink */}
             <div className="absolute inset-0 w-full h-full opacity-30 group-hover:opacity-100 transition-opacity cyber-shape-border bg-brand-pink"></div>

             <div className="absolute -right-4 -bottom-4 text-[100px] font-black font-display text-brand-pink opacity-[0.05] select-none">
                ERR
            </div>
            
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,0,85,0.03)_10px,rgba(255,0,85,0.03)_20px)] pointer-events-none"></div>

            <div className="p-5 relative z-10 w-full h-full flex flex-col justify-between">
                 <div className="flex justify-between items-start">
                    <div>
                         <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-brand-pink mb-1 block">
                            SYSTEM DIAGNOSTICS
                         </span>
                        <h4 className="text-sm md:text-base font-black font-display uppercase tracking-wider text-white flex items-center gap-2">
                            AUDIT LOGS
                        </h4>
                    </div>
                    <div className="w-2 h-2 bg-brand-pink rounded-full animate-pulse shadow-[0_0_8px_#ff0055]"></div>
                </div>

                <div className="flex items-end justify-between">
                    <div>
                         <div className="text-[9px] font-mono text-brand-pink/70 uppercase tracking-wider mb-0.5">Falhas Detectadas</div>
                         <div className="text-4xl md:text-5xl font-black font-display text-brand-pink tracking-tighter drop-shadow-[0_0_10px_rgba(255,0,85,0.4)]">
                            {report.totalErrors}
                         </div>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-brand-pink opacity-20 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="mt-4">
                     <div className="w-full py-1.5 px-3 bg-brand-pink/10 border border-brand-pink/20 flex justify-between items-center">
                        <span className="text-[8px] font-bold text-brand-pink uppercase tracking-widest">ALVO CRÍTICO</span>
                        <span className="text-[9px] font-mono text-white">{report.mostCriticalSubject}</span>
                     </div>
                </div>
            </div>
        </button>
    );
};

const HomeSummary: React.FC<HomeSummaryProps> = ({ subjects, onSelect }) => {
  const activeSubjects = subjects.filter(s => s.data.questoes.total > 0);
  const totalScore = activeSubjects.reduce((acc, sub) => acc + sub.data.notaAtual, 0);
  const count = activeSubjects.length || 1; 
  const averageScore = Math.round(totalScore / count);
  const totalQuestions = activeSubjects.reduce((acc, sub) => acc + sub.data.questoes.total, 0);

  const idToLabel: Record<string, string> = {
    humanas: 'HUM',
    linguagens: 'LIN',
    matematica: 'MAT',
    natureza: 'NAT',
    redacao: 'RED'
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      
      {/* 1. Header do Painel Principal - Estilo HUD */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Main Score KPI */}
        <div className="col-span-1 md:col-span-2 bg-[#0a0a0c] p-0 relative overflow-hidden group cyber-shape">
           <div className="absolute inset-0 w-full h-full opacity-30 cyber-shape-border bg-[#333]"></div>
           <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-brand-accent/5 to-transparent"></div>
           <div className="p-6 relative z-10 flex flex-col justify-between h-full">
               <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-brand-accent" />
                  <h2 className="text-[10px] font-mono font-bold text-brand-accent tracking-[0.2em] uppercase">Global Performance Index</h2>
               </div>
               <div className="flex items-baseline gap-2">
                  <p className="text-6xl md:text-7xl font-black font-display text-white tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                      {averageScore}
                  </p>
                  <span className="text-xl font-mono text-brand-muted opacity-50">PTS</span>
               </div>
               {/* Decorative data lines */}
               <div className="w-full h-px bg-gradient-to-r from-brand-accent/50 to-transparent mt-4"></div>
           </div>
        </div>

        {/* Data Stats */}
        <div className="bg-[#0a0a0c] p-6 flex flex-col justify-center relative overflow-hidden cyber-shape">
             <div className="absolute inset-0 w-full h-full opacity-30 cyber-shape-border bg-[#333]"></div>
             <div className="absolute -right-4 -bottom-4 opacity-5"><Database className="w-32 h-32 text-brand-muted" /></div>
             <div className="relative z-10">
                <p className="text-[9px] font-mono font-bold text-brand-muted tracking-[0.2em] uppercase mb-1">Dados Processados</p>
                <div className="flex items-baseline gap-1">
                    <p className="text-3xl font-black font-display text-white">{totalQuestions}</p>
                    <span className="text-[10px] text-brand-muted font-bold">ITENS</span>
                </div>
                <div className="mt-2 flex gap-1">
                   {[1,2,3,4,5].map(i => <div key={i} className={`h-1 flex-1 rounded-sm ${i <= 3 ? 'bg-brand-accent' : 'bg-[#222]'}`}></div>)}
                </div>
             </div>
        </div>

        {/* Coverage Stats */}
        <div className="bg-[#0a0a0c] p-6 flex flex-col justify-center relative overflow-hidden cyber-shape">
             <div className="absolute inset-0 w-full h-full opacity-30 cyber-shape-border bg-[#333]"></div>
             <div className="absolute -right-4 -bottom-4 opacity-5"><Crosshair className="w-32 h-32 text-brand-muted" /></div>
             <div className="relative z-10">
                <p className="text-[9px] font-mono font-bold text-brand-muted tracking-[0.2em] uppercase mb-1">Cobertura</p>
                <div className="flex items-baseline gap-1">
                    <p className="text-3xl font-black font-display text-white">{activeSubjects.length}/5</p>
                    <span className="text-[10px] text-brand-muted font-bold">MÓDULOS</span>
                </div>
                <p className="text-[9px] font-mono text-brand-muted mt-2 opacity-60">Status: {activeSubjects.length === 5 ? 'COMPLETO' : 'PARCIAL'}</p>
             </div>
        </div>
      </div>

      {/* 2. Grid de Matérias */}
      <div>
        <div className="flex items-center gap-4 mb-8">
             <div className="flex flex-col">
                <h3 className="text-xl font-black font-display tracking-[0.2em] text-white uppercase italic">
                    Módulos de Conhecimento
                </h3>
                <p className="text-[10px] font-mono text-brand-muted uppercase tracking-widest mt-1">Selecione para análise detalhada</p>
             </div>
             <div className="flex-grow h-px bg-[#222]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {subjects.map((subject) => (
            <SubjectCard 
                key={subject.id} 
                sub={subject} 
                onSelect={onSelect}
                idToLabel={idToLabel}
            />
          ))}
          <DebugCard onSelect={onSelect} />
        </div>
      </div>
    </div>
  );
};

export default HomeSummary;
