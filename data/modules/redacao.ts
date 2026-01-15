
import { MateriaData } from '../../types';
import { SUBJECTS_DB } from '../db/subjects';

// IMPORTAÇÃO DOS MÓDULOS INDIVIDUAIS DE REDAÇÃO
// Para adicionar uma nova redação, crie o arquivo em ../db/essays/ e importe aqui.
import { essay_2026_01_07 } from '../db/essays/essay_2026_01_07';
import { essay_2026_01_14 } from '../db/essays/essay_2026_01_14';

export const metadataRedacao = {
  id: SUBJECTS_DB.redacao.id,
  title: SUBJECTS_DB.redacao.title,
  shortName: SUBJECTS_DB.redacao.shortName,
  color: SUBJECTS_DB.redacao.color
};

// AGREGAÇÃO DO HISTÓRICO
// Ordenar sempre da mais recente para a mais antiga na lista.
export const historicoRedacao: Record<number, MateriaData[]> = {
  2026: [
    essay_2026_01_14, // Nota 920 (Mais recente)
    essay_2026_01_07  // Nota 760
  ]
};
