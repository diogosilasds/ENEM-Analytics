
import { MateriaData } from '../../types';
import { processSubjectData } from '../logic/processor';
import { SUBJECTS_DB } from '../db/subjects';

export const metadataMatematica = {
  id: SUBJECTS_DB.matematica.id,
  title: SUBJECTS_DB.matematica.title,
  shortName: SUBJECTS_DB.matematica.shortName,
  color: SUBJECTS_DB.matematica.color
};

const dadosMatematica2010 = processSubjectData('matematica', 2010);

export const historicoMatematica: Record<number, MateriaData[]> = {
  2010: [dadosMatematica2010],
};
