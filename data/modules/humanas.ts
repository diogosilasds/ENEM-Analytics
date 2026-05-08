
import { MateriaData } from '../../types';
import { processSubjectData } from '../logic/processor';
import { SUBJECTS_DB } from '../db/subjects';

export const metadataHumanas = {
  id: SUBJECTS_DB.humanas.id,
  title: SUBJECTS_DB.humanas.title,
  shortName: SUBJECTS_DB.humanas.shortName,
  color: SUBJECTS_DB.humanas.color
};

// Processa dinamicamente usando a Camada de Lógica
const dadosHumanas2010 = processSubjectData('humanas', 2010);
const dadosHumanas2024 = processSubjectData('humanas', 2024);

export const historicoHumanas: Record<number, MateriaData[]> = {
  2024: [dadosHumanas2024],
  2010: [dadosHumanas2010],
};
