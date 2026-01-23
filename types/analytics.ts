
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

export interface QuestaoRelatorio {
  numero: number;
  dificuldade: string;
  situacao: 'acerto' | 'erro' | 'anulada';
}
