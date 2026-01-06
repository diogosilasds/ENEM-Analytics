
import { MateriaData } from '../../types';
import { criarTemplateVazio } from '../utils';
import { SUBJECTS_DB } from '../db/subjects';

export const metadataRedacao = {
  id: SUBJECTS_DB.redacao.id,
  title: SUBJECTS_DB.redacao.title,
  shortName: SUBJECTS_DB.redacao.shortName,
  color: SUBJECTS_DB.redacao.color
};

// Redação ainda não tem registros no DB, mantendo template vazio
export const historicoRedacao: Record<number, MateriaData[]> = {
  2010: [criarTemplateVazio('Redação', 2010)],
};
