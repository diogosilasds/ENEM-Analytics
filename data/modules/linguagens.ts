
import { MateriaData } from '../../types';
import { processSubjectData } from '../logic/processor';
import { SUBJECTS_DB } from '../db/subjects';

export const metadataLinguagens = {
  id: SUBJECTS_DB.linguagens.id,
  title: SUBJECTS_DB.linguagens.title,
  shortName: SUBJECTS_DB.linguagens.shortName,
  color: SUBJECTS_DB.linguagens.color
};

const dadosLinguagens2010 = processSubjectData('linguagens', 2010);

export const historicoLinguagens: Record<number, MateriaData[]> = {
  2010: [dadosLinguagens2010],
};
