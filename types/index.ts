
export interface QuestaoStats {
  total: number;
  acertos: number;
  erros: number;
  taxa: number;
}

export interface ProjecaoItem {
  mes: string;
  nota: number;
  meta: number;
}

export interface DetalheNivel {
  nivel: string;
  faixa: string;
  total: number;
  acertos: number;
  erros: number;
  taxa: number;
  cor: string;
}

export interface MetaItem {
  nivel: string;
  atual: number;
  meta: number;
  acao: string;
}

export interface LinhaItem {
  nivel: string;
  taxa: number;
}

export interface Diagnostico {
  pontoForte: string;
  zonaCritica: string;
  problema: string;
  alerta: string;
}

export interface AnaliseProfunda {
  tri: string[];
  plano: string[];
}

export interface Perfil {
  idade: number;
  conclusao: string;
}

export interface MateriaData {
  id?: string; // Identificador único da tentativa (ex: 'jan_2026')
  dataRealizacao?: string; // Data ISO para ordenação (ex: '2025-01-04')
  titulo: string;
  perfil?: Perfil;
  data: string; // Nome de exibição do exame (ex: 'ENEM 2010')
  notaAtual: number;
  meta: number;
  gap: number;
  tempo: string;
  questoes: QuestaoStats;
  projecao: ProjecaoItem[];
  detalhado: DetalheNivel[];
  metas: MetaItem[];
  linha: LinhaItem[];
  diagnostico: Diagnostico;
  analiseProfunda: AnaliseProfunda;
}

// === NOVOS TIPOS PARA DEBUG MODE ===

export interface DebugTarget {
  subjectId: string;
  subjectName: string;
  priorityLevel: string; // Ex: "550"
  errorCount: number; // Erros absolutos neste nível
  accuracy: number; // Taxa de acerto neste nível
  totalQuestions: number; // Total de questões neste nível
  impactScore: number; // Pontuação calculada de urgência
  recommendation: string;
}

export interface DebugSubjectData {
  id: string;
  name: string;
  levels: DetalheNivel[];
  totalErrors: number;
}

export interface DebugReport {
  targets: DebugTarget[];
  fullHistory: DebugSubjectData[]; // Dados completos para gráficos (CCI, Heatmap)
  globalErrorRate: number;
  totalErrors: number;
  criticalZoneErrors: number; // Erros em níveis fáceis/médios (< 650)
  mostCriticalSubject: string;
}
