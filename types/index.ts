
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

// === TIPOS ESPECÍFICOS PARA REDAÇÃO ===

export interface RedacaoLine {
  lineNumber: number;
  text: string;
  errors?: { term: string; correction: string; type: 'grammar' | 'cohesion' | 'structure' | 'intervention'; description: string }[];
}

export interface RedacaoCompetencia {
  id: string; // c1, c2, c3...
  nome: string;
  nota: number;
  meta: number;
  descricao: string;
}

export interface RedacaoGuiaPasso {
  titulo: string;
  descricao: string;
}

export interface RedacaoManual {
  titulo: string;
  passos: RedacaoGuiaPasso[];
  dicasGramaticais: string;
  vocabularioJuizo: string[];
  notaFinal: string;
}

export interface RedacaoReescritaItem {
  titulo: string;
  problema: string;
  comoMelhorar: string;
  original: string;
  corrigido: string;
  explicacao: string;
}

export interface RedacaoReescrita {
  intro: string;
  exemplos: RedacaoReescritaItem[];
  resumoPratico?: {
    titulo: string;
    itens: string[];
  };
}

export interface RedacaoSpecificData {
  temaSugrido: string;
  textoTranscrito: RedacaoLine[];
  competencias: RedacaoCompetencia[];
  feedbackGeral: {
    pontosFortes: string[];
    pontosFracos: string[];
    dicaOuro: string; // A dica do professor (Estrutura)
  };
  checklist: { label: string; checked: boolean }[];
  manualConstrucao?: RedacaoManual; 
  reescrita?: RedacaoReescrita;
  vicios?: { termo: string; ocorrencias: number; limite: number }[];
}

// === NOVO TIPO PARA LOG DE QUESTÕES ===
export interface QuestaoRelatorio {
  numero: number;
  dificuldade: string; // String para permitir "Anulada" ou faixas
  situacao: 'acerto' | 'erro' | 'anulada';
}

export interface MateriaData {
  id?: string;
  dataRealizacao?: string;
  titulo: string;
  perfil?: Perfil;
  data: string;
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
  // Propriedade opcional para dados específicos de redação
  redacaoData?: RedacaoSpecificData;
  // Propriedade opcional para lista detalhada de questões
  questionLog?: QuestaoRelatorio[];
}

// === NOVOS TIPOS PARA DEBUG MODE ===

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
