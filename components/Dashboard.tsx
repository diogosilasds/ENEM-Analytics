import React, { useEffect } from 'react';
import { useDashboard } from '../hooks/useDashboard';
import Header from './dashboard/Header';
import HomeSummary from './dashboard/HomeSummary';
import SubjectView from './dashboard/SubjectView';
import DebugModule from './dashboard/modules/DebugModule';

const Dashboard: React.FC = () => {
  const { 
    currentView, 
    currentData,
    debugData,
    allSubjects, 
    navigateTo, 
    isHome, 
    hasData,
    selectedYear,
    availableYears,
    changeYear,
    availableAttempts,
    changeAttempt,
    selectedAttemptId
  } = useDashboard();

  // Auto-scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const safeData = currentData || allSubjects[0].data; 
  const isNoDataState = !isHome && !hasData && currentView !== 'debug';

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans pb-12 transition-colors duration-400 relative overflow-x-hidden flex flex-col">
      {/* Ambient Background - Apenas para Sem Sinal de Dados (Red/Pink) */}
      {isNoDataState && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-pink/10 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse" style={{ animationDuration: '4s' }}></div>
        </div>
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header 
          data={safeData} 
          materiaSelecionada={currentView} 
          onMateriaChange={navigateTo} 
          selectedYear={selectedYear}
          availableYears={availableYears}
          onYearChange={changeYear}
          availableAttempts={availableAttempts}
          onAttemptChange={changeAttempt}
          selectedAttemptId={selectedAttemptId}
        />

        <main className="max-w-[1800px] mx-auto px-4 md:px-8 py-8 space-y-8 flex-grow w-full">
          {isHome ? (
            <HomeSummary subjects={allSubjects} onSelect={navigateTo} />
          ) : currentView === 'debug' && debugData ? (
             <DebugModule report={debugData} onNavigate={navigateTo} />
          ) : (
            <SubjectView 
              data={safeData}
              view={currentView}
              selectedYear={selectedYear}
              hasData={hasData}
              onNavigate={navigateTo}
            />
          )}
        </main>

        {/* Rodapé Global Uniforme */}
        <footer className="w-full border-t border-brand-border bg-brand-bg/50 backdrop-blur-md py-10 mt-12">
          <div className="max-w-[1800px] mx-auto px-4 md:px-8 text-center space-y-1">
            <p className="text-[11px] md:text-sm text-brand-muted font-sans opacity-90">
              © 2026 Todos os direitos reservados
            </p>
            <p className="text-[11px] md:text-sm text-brand-muted font-sans opacity-90">
              Diogo Silas em parceria com uma Inteligência Artificial (IA)
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;