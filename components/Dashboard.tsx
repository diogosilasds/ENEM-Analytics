
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
      
      {/* --- CYBERNETIC BACKGROUND LAYERS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Animated Grid Horizon */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,159,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,159,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [transform:perspective(1000px)_rotateX(60deg)_translateY(-100px)_scale(2)] origin-top opacity-20"></div>
        
        {/* Ambient Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-purple/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-cyan/10 rounded-full blur-[150px]"></div>
      </div>

      {/* No Data Red Alert State */}
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

        {/* Rodapé Global Uniforme com Estilo Técnico */}
        <footer className="w-full border-t border-brand-border bg-[#050505]/80 backdrop-blur-md py-8 mt-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent"></div>
          <div className="max-w-[1800px] mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-left space-y-1">
               <p className="text-[10px] font-mono text-brand-muted uppercase tracking-[0.2em]">
                 System Status: <span className="text-brand-emerald animate-pulse">ONLINE</span>
               </p>
               <p className="text-[10px] font-mono text-brand-muted opacity-50">
                  ENEM_ANALYTICS_KERNEL_V4.2.0
               </p>
            </div>
            
            <div className="text-center md:text-right space-y-1">
              <p className="text-[10px] md:text-xs text-brand-muted font-sans uppercase tracking-widest">
                © 2026 Neural Analytics Corp
              </p>
              <p className="text-[9px] text-brand-muted font-mono opacity-60">
                Dev: Diogo Silas // AI Core Integration
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
