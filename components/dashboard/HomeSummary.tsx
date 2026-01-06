import React, { useEffect, useState, useMemo } from 'react';
import { MateriaData } from '../../types';
import { ArrowRight, Cpu, Activity, Database, Bug, ScanEye, AlertTriangle, Crosshair } from 'lucide-react';
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

    return (
        <button 
            onClick={() => onSelect(sub.id)}
            className={`text-left relative p-6 border transition-all duration-300 group overflow-hidden w-full ${
                hasData 
                ? 'bg-[#0f0f11] border-[#333] hover:border-brand-accent hover:bg-[#151518]' 
                : 'bg-[#08080a] border-[#1f1f22] opacity-60 hover:opacity-100 hover:border-brand-pink/30'
            }`}
        >
            {/* Header do Card */}
            <div className="flex justify-between items-start mb-8 z-10 relative">
                <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 flex items-center justify-center font-black font-mono text-xs border ${hasData ? 'border-white text-white bg-white/5' : 'border-brand-muted text-brand-muted'}`}>
                        {shortLabel}
                    </div>
                    <div>
                        <h4 className={`text-sm font-black font-display uppercase tracking-wider ${hasData ? 'text-white' : 'text-brand-muted'}`}>
                            {sub.data.titulo}
                        </h4>
                        <p className={`text-[9px] font-mono font-bold mt-0.5 ${hasData ? 'text-brand-accent' : 'text-brand-pink opacity-50'}`}>
                            {hasData ? '● ONLINE' : '○ OFFLINE'}
                        </p>
                    </div>
                </div>
                {hasData && (
                    <ArrowRight className="w-4 h-4 text-brand-accent opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                )}
            </div>

            {/* Conteúdo do Card */}
            {hasData ? (
                <div className="space-y-5 relative z-10">
                    <div className="flex justify-between items-end border-b border-white/10 pb-2">
                        <span className="text-[9px] font-mono font-bold text-brand-muted tracking-widest uppercase">SCORE ATUAL</span>
                        <span className="text-3xl font-black font-display text-white">{sub.data.notaAtual}</span>
                    </div>
                    
                    <div>
                        <div className="flex justify-between text-[9px] font-mono font-bold mb-2">
                            <span className="text-brand-muted tracking-widest uppercase">SINCRONIA</span>
                            <span className={percentage >= 70 ? 'text-brand-accent' : 'text-brand-yellow'}>
                                {percentage.toFixed(1)}%
                            </span>
                        </div>
                        
                        {/* Progress Bar Corrigida */}
                        <div className="h-2 bg-white/10 w-full rounded-full overflow-hidden border border-white/5 p-[1px]">
                            <div 
                                className={`h-full transition-all duration-1000 ease-out rounded-full ${
                                    percentage >= 70 
                                    ? 'bg-brand-accent shadow-[0_0_10px_rgba(0,255,159,0.5)]' 
                                    : 'bg-brand-yellow shadow-[0_0_10px_rgba(243,230,0,0.5)]'
                                }`}
                                style={{ width: `${Math.max(width, 2)}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-20 flex flex-col items-center justify-center space-y-2 text-[10px] font-mono text-brand-muted border border-dashed border-[#1f1f22] bg-black/20">
                    <p>NO_DATA_AVAILABLE</p>
                    <p className="opacity-40 text-[8px] tracking-[0.2em] animate-pulse">AWAITING_SIGNAL...</p>
                </div>
            )}
            
            {/* Efeito Visual Hover */}
            {hasData && (
                <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            )}
        </button>
    );
};

// Novo Card Específico para o Módulo de Debug - ESTILO UNIFICADO
const DebugCard: React.FC<{ onSelect: (id: any) => void }> = ({ onSelect }) => {
    // Calcula o relatório de debug em tempo real para o card
    const report = useMemo(() => dashboardService.getDebugReport(), []);

    return (
        <button 
            onClick={() => onSelect('debug')}
            className="text-left relative p-6 border border-[#333] bg-[#0f0f11] hover:border-brand-pink hover:bg-[#151113] transition-all duration-300 group overflow-hidden w-full"
        >
             <div className="flex justify-between items-start mb-8 z-10 relative">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center font-black font-mono text-xs border border-brand-pink text-brand-pink bg-brand-pink/5">
                        DBG
                    </div>
                    <div>
                        <h4 className="text-sm font-black font-display uppercase tracking-wider text-white">
                            AUDITORIA DE FALHAS
                        </h4>
                        <p className="text-[9px] font-mono font-bold mt-0.5 text-brand-pink flex items-center gap-1 opacity-70 group-hover:opacity-100">
                            <Crosshair className="w-3 h-3" />
                            ANALISAR ERROS
                        </p>
                    </div>
                </div>
                <Bug className="w-4 h-4 text-brand-pink opacity-30 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
            </div>

            <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-end border-b border-[#333] group-hover:border-brand-pink/30 pb-2 transition-colors">
                    <span className="text-[9px] font-mono font-bold text-brand-muted tracking-widest uppercase">ERROS TOTAIS</span>
                    <span className="text-3xl font-black font-display text-white">{report.totalErrors}</span>
                </div>

                <div className="flex items-center gap-3 pt-1">
                     <AlertTriangle className="w-4 h-4 text-brand-pink animate-pulse" />
                     <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-brand-pink uppercase tracking-wider">PRIORIDADE</span>
                        <span className="text-xs text-brand-muted font-mono group-hover:text-white transition-colors">
                            {report.mostCriticalSubject}
                        </span>
                     </div>
                </div>
            </div>

            {/* Background Noise Effect - Mais sutil */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-[0.03] pointer-events-none"></div>
            {/* Scanline apenas no hover */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-pink/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </button>
    );
};

const HomeSummary: React.FC<HomeSummaryProps> = ({ subjects, onSelect }) => {
  const activeSubjects = subjects.filter(s => s.data.questoes.total > 0);
  const totalScore = activeSubjects.reduce((acc, sub) => acc + sub.data.notaAtual, 0);
  const count = activeSubjects.length || 1; 
  const averageScore = Math.round(totalScore / count);
  const totalQuestions = activeSubjects.reduce((acc, sub) => acc + sub.data.questoes.total, 0);

  // Mapeamento de IDs para labels visuais mais técnicos
  const idToLabel: Record<string, string> = {
    humanas: 'HUM',
    linguagens: 'LIN',
    matematica: 'MAT',
    natureza: 'NAT',
    redacao: 'RED'
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* 1. Header do Painel Principal */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1 md:col-span-2 bg-[#0f0f11] border border-[#333] p-6 relative overflow-hidden group">
          <div className="absolute right-0 top-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Activity className="w-24 h-24 text-brand-accent" />
          </div>
          <div className="relative z-10">
             <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse"></div>
                <h2 className="text-[10px] font-mono font-bold text-brand-muted tracking-[0.2em]">MÉDIA GERAL ESTIMADA</h2>
             </div>
             <p className="text-5xl md:text-6xl font-black font-display text-white tracking-tighter">
                {averageScore}
                <span className="text-lg md:text-xl text-brand-muted ml-2 font-mono align-top opacity-50">PTS</span>
             </p>
          </div>
        </div>

        <div className="bg-[#0f0f11] border border-[#333] p-5 flex flex-col justify-center relative overflow-hidden">
             <div className="flex items-center gap-2 mb-2 text-brand-cyan">
                <Database className="w-4 h-4" />
                <span className="text-[10px] font-mono font-bold tracking-[0.2em]">DADOS PROCESSADOS</span>
             </div>
             <p className="text-3xl font-black font-display text-white">{totalQuestions}</p>
             <p className="text-[10px] text-brand-muted mt-1 font-mono">Questões analisadas na base</p>
        </div>

         <div className="bg-[#0f0f11] border border-[#333] p-5 flex flex-col justify-center">
             <div className="flex items-center gap-2 mb-2 text-brand-purple">
                <Cpu className="w-4 h-4" />
                <span className="text-[10px] font-mono font-bold tracking-[0.2em]">COBERTURA</span>
             </div>
             <p className="text-3xl font-black font-display text-white">{activeSubjects.length}<span className="text-lg opacity-50">/5</span></p>
             <p className="text-[10px] text-brand-muted mt-1 font-mono">Áreas de conhecimento ativas</p>
        </div>
      </div>

      {/* 2. Grid de Matérias */}
      <div>
        <div className="flex items-center justify-between mb-6 px-1">
            <h3 className="text-xs font-bold font-display tracking-widest text-white flex items-center gap-2">
                <span className="w-1 h-4 bg-brand-accent"></span>
                MÓDULOS DE CONHECIMENTO
            </h3>
            <span className="text-[9px] font-mono text-brand-muted hidden md:block opacity-50">SYSTEM_ID: DASHBOARD_v4</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((sub) => (
                <SubjectCard 
                    key={sub.id} 
                    sub={sub} 
                    onSelect={onSelect} 
                    idToLabel={idToLabel} 
                />
            ))}
            
            {/* NOVO: Card de Auditoria (Debug Mode) - Agora Integrado */}
            <DebugCard onSelect={onSelect} />
        </div>
      </div>
    </div>
  );
};

export default HomeSummary;