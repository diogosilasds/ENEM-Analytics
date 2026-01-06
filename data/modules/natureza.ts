
import { MateriaData } from '../../types';
import { processSubjectData } from '../logic/processor';
import { SUBJECTS_DB } from '../db/subjects';

export const metadataNatureza = {
  id: SUBJECTS_DB.natureza.id,
  title: SUBJECTS_DB.natureza.title,
  shortName: SUBJECTS_DB.natureza.shortName,
  color: SUBJECTS_DB.natureza.color
};

const dadosNatureza2010 = processSubjectData('natureza', 2010);

export const historicoNatureza: Record<number, MateriaData[]> = {
  2010: [dadosNatureza2010],
};
