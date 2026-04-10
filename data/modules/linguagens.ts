
import { MateriaData } from '../../types';
import { processSubjectData } from '../logic/processor';
import { SUBJECTS_DB } from '../db/subjects';

export const metadataLinguagens = {
  id: SUBJECTS_DB.linguagens.id,
  title: SUBJECTS_DB.linguagens.title,
  shortName: SUBJECTS_DB.linguagens.shortName,
  color: SUBJECTS_DB.linguagens.color
};

const dadosLinguagens2018 = processSubjectData('linguagens', 2018);

export const historicoLinguagens: Record<number, MateriaData[]> = {
  2018: [dadosLinguagens2018],
};
