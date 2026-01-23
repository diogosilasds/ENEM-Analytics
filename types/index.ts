
import { RedacaoSpecificData } from './redacao';
import { QuestaoStats, ProjecaoItem, DetalheNivel, MetaItem, LinhaItem, Diagnostico, AnaliseProfunda, QuestaoRelatorio } from './analytics';

export * from './redacao';
export * from './debug';
export * from './analytics';

export interface Perfil {
  idade: number;
  conclusao: string;
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
  redacaoData?: RedacaoSpecificData;
  questionLog?: QuestaoRelatorio[];
}
