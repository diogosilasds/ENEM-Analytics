
import React, { useMemo } from 'react';
import { MateriaData } from '../../types';
import { ArrowRight, Cpu, Activity, Database, Bug, Crosshair, AlertTriangle, Zap, Target, CheckCircle2, XCircle } from 'lucide-react';
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
    const [width, setWidth] = React.useState(0);

    // Animação de entrada da barra de progresso
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setWidth(targetPercentage);
        }, 100);
        return () => clearTimeout(timer);
    }, [targetPercentage]);

    const shortLabel = idToLabel[sub.id] || sub.id.substring(0,3).toUpperCase();
    const percentage = targetPercentage;

    // Define cor baseada no status
    const statusColor = hasData ? 'text-brand-accent' : 'text-brand-muted';

    return (
        <button 
            onClick={() => onSelect(sub.id)}
            className="text-left relative h-[220px] transition-all duration-300 group w-full flex flex-col justify-between overflow-hidden bg-[#050505] border border-[#222]"
        >
            {/* Tech Corners */}
            <div className="tech-border-corner tech-corner-tl"></div>
            <div className="tech-border-corner tech-corner-tr"></div>
            <div className="tech-border-corner tech-corner-bl"></div>
            <div className="tech-border-corner tech-corner-br"></div>

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,159,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,159,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20"></div>

            {/* 1. Background Watermark (Big Typography) */}
            <div className={`absolute -right-4 -bottom-4 text-[100px] font-black font-display opacity-[0.02] select-none transition-transform duration-500 ${hasData ? 'text-brand-accent' : 'text-white'}`}>
                {shortLabel}
            </div>

            <div className="p-5 relative z-10 w-full h-full flex flex-col justify-between">
                
                {/* Header: Title & Status */}
                <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                         <div className="flex items-center gap-2 mb-1">
                             <span className={`text-[9px] font-mono font-bold tracking-[0.2em] uppercase ${hasData ? 'text-brand-accent' : 'text-brand-muted/40'}`}>
                                MOD_0{shortLabel === 'HUM' ? '1' : shortLabel === 'LIN' ? '2' : shortLabel === 'MAT' ? '3' : shortLabel === 'NAT' ? '4' : '5'}
                             </span>
                             {hasData && <span className="text-[8px] font-mono text-brand-accent/50 border border-brand-accent/30 px-1">ACTV</span>}
                         </div>
                         <h4 className={`text-sm md:text-base font-black font-display uppercase tracking-widest leading-tight ${hasData ? 'text-white' : 'text-brand-muted'}`}>
                            {sub.data.titulo}
                        </h4>
                    </div>

                    {/* Status */}
                    <div className={`flex items-center gap-2 text-[9px] font-mono font-bold tracking-widest ${statusColor} uppercase`}>
                        {hasData ? (
                            <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-brand-accent shadow-[0_0_5px_#00ff9f] animate-pulse"></span>
                                <span>ON</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-[#333]"></span>
                                <span>OFF</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Body: Metrics */}
                {hasData ? (
                    <div className="flex items-end justify-between mt-4">
                        <div>
                            <div className="text-[9px] font-mono text-brand-muted uppercase tracking-wider mb-0.5">Score</div>
                            <div className="text-4xl md:text-5xl font-black font-display text-white tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]" data-text={sub.data.notaAtual}>
                                {sub.data.notaAtual}
                            </div>
                        </div>
                        
                        <div className="text-right mb-1">
                             <div className="text-brand-accent font-bold font-mono text-xl tracking-tighter">
                                {percentage.toFixed(0)}%
                             </div>
                             <div className="text-[8px] font-mono text-brand-muted uppercase tracking-widest">Efic.</div>
                        </div>
                    </div>
                ) : (
                    <div className="flex-grow flex items-center justify-center">
                        <div className="text-[10px] font-mono text-[#333] tracking-widest uppercase">NO_DATA</div>
                    </div>
                )}

                {/* Footer: Progress Bar */}
                <div className="mt-4">
                    {hasData ? (
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-[8px] font-mono text-brand-accent/50 uppercase">
                                <span>[SYS_LOAD]</span>
                                <span>{width.toFixed(1)}%</span>
                            </div>
                            <div className="h-1 bg-[#111] w-full relative overflow-hidden border border-[#222]">
                                <div 
                                    className="h-full bg-brand-accent shadow-[0_0_10px_rgba(0,255,159,0.5)] transition-all duration-1000 ease-out"
                                    style={{ width: `${width}%` }}
                                ></div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-1 bg-[#111] w-full border border-[#222]"></div>
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
            className="text-left relative h-[220px] transition-all duration-300 group w-full flex flex-col justify-between overflow-hidden bg-[#050505] border border-[#222]"
        >
            {/* Tech Corners */}
            <div className="tech-border-corner tech-corner-tl !border-brand-pink"></div>
            <div className="tech-border-corner tech-corner-tr !border-brand-pink"></div>
            <div className="tech-border-corner tech-corner-bl !border-brand-pink"></div>
            <div className="tech-border-corner tech-corner-br !border-brand-pink"></div>

            <div className="absolute -right-4 -bottom-4 text-[100px] font-black font-display text-brand-pink opacity-[0.02] select-none">
                ERR
            </div>
            
            <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,0,85,0.03)_10px,rgba(255,0,85,0.03)_20px)] pointer-events-none"></div>

            <div className="p-5 relative z-10 w-full h-full flex flex-col justify-between">
                 <div className="flex justify-between items-start">
                    <div>
                         <div className="flex items-center gap-2 mb-1">
                             <span className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase text-brand-pink">
                                SYS_DIAG
                             </span>
                             <span className="text-[8px] font-mono text-brand-pink/50 border border-brand-pink/30 px-1 animate-pulse">WARN</span>
                         </div>
                        <h4 className="text-sm md:text-base font-black font-display uppercase tracking-widest text-white transition-colors">
                            AUDIT LOGS
                        </h4>
                    </div>
                    <div className="w-1.5 h-1.5 bg-brand-pink shadow-[0_0_5px_#ff0055] animate-pulse"></div>
                </div>

                <div className="flex items-end justify-between mt-4">
                    <div>
                         <div className="text-[9px] font-mono text-brand-pink/70 uppercase tracking-wider mb-0.5">Logs Registrados</div>
                         <div className="text-4xl md:text-5xl font-black font-display text-brand-pink tracking-tighter drop-shadow-[0_0_10px_rgba(255,0,85,0.4)]" data-text={report.fullHistory.reduce((acc, curr) => acc + (curr.questionLog?.length || 0), 0)}>
                            {report.fullHistory.reduce((acc, curr) => acc + (curr.questionLog?.length || 0), 0)}
                         </div>
                    </div>
                    <div className="text-[10px] font-mono text-brand-pink/50 uppercase tracking-widest mb-1">
                        [CRITICAL]
                    </div>
                </div>

                <div className="mt-4">
                     <div className="w-full py-2 px-3 bg-brand-pink/10 border border-brand-pink/20 flex justify-between items-center transition-colors">
                        <span className="text-[8px] font-bold font-mono text-brand-pink uppercase tracking-widest">VISUALIZAR MATRIZ</span>
                        <span className="text-[10px] font-mono text-brand-pink">→</span>
                     </div>
                </div>
            </div>
        </button>
    );
};

const MainMetricsPanel: React.FC<{ subjects: { id: string; data: MateriaData; color: string }[] }> = ({ subjects }) => {
  const totalQuestions = subjects.reduce((acc, sub) => acc + (sub.data.questoes?.total || 0), 0);
  const totalCorrect = subjects.reduce((acc, sub) => acc + (sub.data.questoes?.acertos || 0), 0);
  const totalIncorrect = subjects.reduce((acc, sub) => acc + (sub.data.questoes?.erros || 0), 0);
  const totalScore = subjects.reduce((acc, sub) => acc + (sub.data.notaAtual || 0), 0);
  const averageScore = totalScore / 5;
  
  const targetScore = 750;
  const progressPercentage = Math.min(100, (averageScore / targetScore) * 100);

  return (
    <div className="mb-12 bg-[#050505] border border-[#222] p-6 lg:p-10 relative overflow-hidden group">
      {/* Tech Corners */}
      <div className="tech-border-corner tech-corner-tl"></div>
      <div className="tech-border-corner tech-corner-tr"></div>
      <div className="tech-border-corner tech-corner-bl"></div>
      <div className="tech-border-corner tech-corner-br"></div>

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,159,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,159,0.02)_1px,transparent_1px)] bg-[size:30px_30px] opacity-50"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-10 w-32 h-[1px] bg-brand-accent/50"></div>
      <div className="absolute bottom-0 right-10 w-48 h-[1px] bg-brand-accent/30"></div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-center justify-between">
        
        {/* Left Side: Average Score vs Target */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-mono font-bold text-brand-accent bg-brand-accent/10 px-2 py-0.5 border border-brand-accent/20">SYS_AVG</span>
            <h4 className="text-xs font-mono text-brand-muted uppercase tracking-widest">Média Geral vs Meta</h4>
          </div>
          
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-6xl md:text-7xl font-black font-display text-white tracking-tighter drop-shadow-[0_0_15px_rgba(0,255,159,0.2)]" data-text={averageScore.toFixed(1)}>
              {averageScore.toFixed(1)}
            </span>
            <span className="text-2xl md:text-3xl font-mono text-brand-muted/50 font-light">
              / {targetScore}
            </span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full">
            <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest mb-2">
              <span className="text-brand-muted">[OBJ_PROGRESS]</span>
              <span className="text-brand-accent font-bold">{progressPercentage.toFixed(1)}%</span>
            </div>
            <div className="h-1.5 bg-[#111] w-full relative overflow-hidden border border-[#222]">
              <div 
                className="h-full bg-brand-accent shadow-[0_0_10px_rgba(0,255,159,0.5)] transition-all duration-1000 ease-out relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(0,0,0,0.2)_4px,rgba(0,0,0,0.2)_8px)]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:flex flex-col items-center justify-center gap-2">
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#333] to-transparent"></div>
            <div className="text-[8px] font-mono text-[#444] rotate-90 tracking-widest">DATA_STREAM</div>
            <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#333] to-transparent"></div>
        </div>
        <div className="block lg:hidden w-full h-px bg-gradient-to-r from-transparent via-[#333] to-transparent"></div>

        {/* Right Side: Stats Grid */}
        <div className="flex-1 w-full grid grid-cols-3 gap-4 md:gap-8">
          {/* Total Questions */}
          <div className="flex flex-col items-center lg:items-start relative p-3 border border-[#1a1a1a] bg-[#0a0a0c]">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#444]"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#444]"></div>
            <div className="flex items-center gap-1.5 mb-2 text-brand-muted">
              <span className="text-[9px] font-mono font-bold bg-[#222] px-1 text-white">Q_TOT</span>
              <span className="text-[9px] font-mono uppercase tracking-widest hidden md:inline">Questões</span>
            </div>
            <span className="text-3xl md:text-4xl font-black font-display text-white">{totalQuestions}</span>
          </div>
          
          {/* Correct */}
          <div className="flex flex-col items-center lg:items-start relative p-3 border border-[#1a1a1a] bg-[#0a0a0c]">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00ff9f]/50"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00ff9f]/50"></div>
            <div className="flex items-center gap-1.5 mb-2 text-[#00ff9f]">
              <span className="text-[9px] font-mono font-bold bg-[#00ff9f]/20 px-1">ACK</span>
              <span className="text-[9px] font-mono uppercase tracking-widest hidden md:inline">Acertos</span>
            </div>
            <span className="text-3xl md:text-4xl font-black font-display text-[#00ff9f] drop-shadow-[0_0_8px_rgba(0,255,159,0.3)]">
              {totalCorrect}
            </span>
          </div>

          {/* Incorrect */}
          <div className="flex flex-col items-center lg:items-start relative p-3 border border-[#1a1a1a] bg-[#0a0a0c]">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#ff0055]/50"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#ff0055]/50"></div>
            <div className="flex items-center gap-1.5 mb-2 text-[#ff0055]">
              <span className="text-[9px] font-mono font-bold bg-[#ff0055]/20 px-1">ERR</span>
              <span className="text-[9px] font-mono uppercase tracking-widest hidden md:inline">Erros</span>
            </div>
            <span className="text-3xl md:text-4xl font-black font-display text-[#ff0055] drop-shadow-[0_0_8px_rgba(255,0,85,0.3)]">
              {totalIncorrect}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

const HomeSummary: React.FC<HomeSummaryProps> = ({ subjects, onSelect }) => {
  const idToLabel: Record<string, string> = {
    humanas: 'HUM',
    linguagens: 'LIN',
    matematica: 'MAT',
    natureza: 'NAT',
    redacao: 'RED'
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Header da Central */}
      <div className="flex items-center gap-4 mb-4">
           <div className="flex flex-col">
              <h3 className="text-xl font-black font-display tracking-[0.2em] text-white uppercase italic">
                  Central de Inteligência
              </h3>
              <p className="text-[10px] font-mono text-brand-muted uppercase tracking-widest mt-1">Visão Geral do Sistema</p>
           </div>
           <div className="flex-grow h-px bg-[#222]"></div>
      </div>

      {/* Painel de Métricas Principais */}
      <MainMetricsPanel subjects={subjects} />

      {/* Grid de Matérias */}
      <div>
        <div className="flex items-center gap-4 mb-6 mt-8">
             <div className="flex flex-col">
                <h3 className="text-lg font-black font-display tracking-[0.2em] text-white uppercase italic">
                    Módulos
                </h3>
                <p className="text-[10px] font-mono text-brand-muted uppercase tracking-widest mt-1">Selecione um módulo para análise detalhada</p>
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
