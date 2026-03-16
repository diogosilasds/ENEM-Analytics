
import { MateriaData } from '../../types';
import { SUBJECTS_DB } from '../db/subjects';

// IMPORTAÇÃO DOS MÓDULOS INDIVIDUAIS DE REDAÇÃO
// Para adicionar uma nova redação, crie o arquivo em ../db/essays/ e importe aqui.
import { essay_2026_03_12 } from '../db/essays/essay_2026_03_12';
import { essay_2026_03_04 } from '../db/essays/essay_2026_03_04';
import { essay_2026_02_19 } from '../db/essays/essay_2026_02_19';
import { essay_2026_02_05 } from '../db/essays/essay_2026_02_05';
import { essay_2026_01_30 } from '../db/essays/essay_2026_01_30';
import { essay_2026_01_22 } from '../db/essays/essay_2026_01_22';
import { essay_2026_01_14 } from '../db/essays/essay_2026_01_14';
import { essay_2026_01_07 } from '../db/essays/essay_2026_01_07';

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
    essay_2026_03_12, // Nota 920 (Gravidez Precoce)
    essay_2026_03_04, // Nota 960 (Valorização da Docência)
    essay_2026_02_19, // Nota 920 (Proposta 5)
    essay_2026_02_05, // Nota 920 (Racismo Ambiental)
    essay_2026_01_30, // Nota 960 (Preconceito Linguístico)
    essay_2026_01_22, // Nota 840
    essay_2026_01_14, // Nota 680
    essay_2026_01_07  // Nota 760
  ]
};
