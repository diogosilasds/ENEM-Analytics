import { useState, useMemo, useEffect } from 'react';
import { dashboardService } from '../services/dashboardService';
import { MateriaData, DebugReport } from '../types';

export type ViewState = 'home' | 'humanas' | 'linguagens' | 'matematica' | 'natureza' | 'redacao' | 'debug';

interface DashboardHook {
  currentView: ViewState;
  currentData: MateriaData | null;
  debugData: DebugReport | null; // Novo dado
  selectedYear: number | null;
  selectedAttemptId: string | null;
  availableYears: number[];
  availableAttempts: { id: string, label: string, date: string }[];
  allSubjects: Array<{ id: string; data: MateriaData; color: string }>;
  navigateTo: (view: ViewState) => void;
  changeYear: (year: number) => void;
  changeAttempt: (attemptId: string) => void;
  isHome: boolean;
  hasData: boolean;
}

export const useDashboard = (): DashboardHook => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedAttemptId, setSelectedAttemptId] = useState<string | null>(null);

  // Efeito para resetar o ano e tentativa quando a view mudar
  useEffect(() => {
    if (currentView !== 'home' && currentView !== 'debug') {
      const latestYear = dashboardService.getLatestActiveYear(currentView);
      setSelectedYear(latestYear);
      setSelectedAttemptId(null); 
    } else {
      setSelectedYear(null);
      setSelectedAttemptId(null);
    }
  }, [currentView]);

  // Recupera anos disponíveis para a view atual
  const availableYears = useMemo(() => {
    if (currentView === 'home' || currentView === 'debug') return [];
    return dashboardService.getAvailableYears(currentView);
  }, [currentView]);

  // Recupera tentativas disponíveis para o ano selecionado
  const availableAttempts = useMemo(() => {
    if (currentView === 'home' || currentView === 'debug' || !selectedYear) return [];
    return dashboardService.getAttemptsForYear(currentView, selectedYear);
  }, [currentView, selectedYear]);

  // Recupera dados específicos da matéria, ano e tentativa
  const currentData = useMemo(() => {
    if (currentView === 'home' || currentView === 'debug' || !selectedYear) return null;
    return dashboardService.getDataByYear(currentView, selectedYear, selectedAttemptId || undefined);
  }, [currentView, selectedYear, selectedAttemptId]);

  // Recupera dados agregados para o Debug Mode
  const debugData = useMemo(() => {
    if (currentView === 'debug') {
      return dashboardService.getDebugReport();
    }
    return null;
  }, [currentView]);

  // Ao mudar de ano, reseta a tentativa para a mais recente daquele ano
  const changeYear = (year: number) => {
    setSelectedYear(year);
    setSelectedAttemptId(null);
  };

  const changeAttempt = (id: string) => {
    setSelectedAttemptId(id);
  };

  // Recupera o sumário para a tela inicial
  const allSubjects = useMemo(() => {
    return dashboardService.getAllSubjectsSummary();
  }, []);

  const navigateTo = (view: ViewState) => {
    setCurrentView(view);
  };

  return {
    currentView,
    currentData,
    debugData,
    selectedYear,
    selectedAttemptId,
    availableYears,
    availableAttempts,
    allSubjects,
    navigateTo,
    changeYear,
    changeAttempt,
    isHome: currentView === 'home',
    hasData: (currentData ? currentData.questoes.total > 0 : false) || (currentView === 'debug' && !!debugData)
  };
};