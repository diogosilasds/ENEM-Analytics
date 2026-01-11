
import React from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { MateriaData } from '../../types';
import { ViewState } from '../../hooks/useDashboard';
import SubjectHeader from './SubjectHeader';

// Importação dos Módulos Funcionais
import OverviewModule from './modules/OverviewModule';
import StrategyModule from './modules/StrategyModule';
import AnalyticsModule from './modules/AnalyticsModule';
import RedacaoView from './modules/RedacaoView';

interface SubjectViewProps {
  data: MateriaData;
  view: ViewState;
  selectedYear: number | null;
  hasData: boolean;
  onNavigate: (view: ViewState) => void;
}

const SubjectView: React.FC<SubjectViewProps> = ({ 
  data, 
  view, 
  selectedYear, 
  hasData,
  onNavigate 
}) => {

  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-[#0f0f11] border border-[#333] rounded-full flex items-center justify-center relative shadow-[0_0_30px_rgba(255,0,85,0.1)]">
            <AlertCircle className="w-10 h-10 text-brand-muted opacity-50" />
            <div className="absolute top-0 right-0 w-3 h-3 bg-brand-pink rounded-full animate-pulse"></div>
        </div>
        
        <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-black font-display text-white tracking-widest uppercase">
                SEM SINAL DE DADOS
            </h2>
            <p className="text-brand-muted font-mono text-xs md:text-sm max-w-md mx-auto leading-relaxed">
                Não foram encontrados registros processados para <span className="text-brand-accent">{data.titulo}</span> no período selecionado. O sistema não pode gerar telemetria.
            </p>
        </div>

        <button 
            onClick={() => onNavigate('home')} 
            className="group flex items-center gap-3 px-8 py-3 bg-brand-accent text-black font-bold font-display text-xs tracking-[0.2em] hover:bg-white transition-all duration-300"
        >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            RETORNAR
        </button>
      </div>
    );
  }

  // Lógica Especial para Redação (Dashboard Diferenciado)
  if (view === 'redacao') {
    return (
        <div className="space-y-12">
            <SubjectHeader view={view} selectedYear={selectedYear} />
            <RedacaoView data={data} />
        </div>
    );
  }

  // Dashboard Padrão (TRI)
  return (
    <div className="space-y-12">
      {/* 0. Cabeçalho de Identidade da Seção */}
      <SubjectHeader view={view} selectedYear={selectedYear} />

      {/* 1. Visão Geral e Métricas Principais */}
      <OverviewModule data={data} />

      {/* 2. Estratégia e Tomada de Decisão */}
      <StrategyModule data={data} />

      {/* 3. Análise Profunda e Cognitiva */}
      <AnalyticsModule data={data} />
    </div>
  );
};

export default SubjectView;
