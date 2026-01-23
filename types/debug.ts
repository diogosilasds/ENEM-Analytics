
import { DetalheNivel, QuestaoRelatorio } from './analytics';

export interface DebugTarget {
  subjectId: string;
  subjectName: string;
  priorityLevel: string;
  errorCount: number;
  accuracy: number;
  totalQuestions: number;
  impactScore: number;
  recommendation: string;
}

export interface DebugSubjectData {
  id: string;
  name: string;
  levels: DetalheNivel[];
  totalErrors: number;
  questionLog?: QuestaoRelatorio[];
}

export interface DebugRedacaoAnalysis {
  currentScore: number;
  competencies: { id: string; name: string; score: number; meta: number; gap: number }[];
  textErrors: { type: string; count: number; label: string }[];
  totalTextErrors: number;
  criticalCompetency: string;
  history: { date: string; score: number; label: string }[];
}

export interface DebugReport {
  targets: DebugTarget[];
  fullHistory: DebugSubjectData[];
  globalErrorRate: number;
  totalErrors: number;
  criticalZoneErrors: number;
  mostCriticalSubject: string;
  redacaoAnalysis?: DebugRedacaoAnalysis;
}
