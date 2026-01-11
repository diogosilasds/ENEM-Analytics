
// LAYER 2: REGISTRIES (EVENTS)
// Agora carregado a partir de arquivos TS dedicados (Data as Code).

import humanas from './json/humanas';
import linguagens from './json/linguagens';
import matematica from './json/matematica';
import natureza from './json/natureza';
import redacao from './json/redacao';
import { QuestaoRelatorio } from '../../types';

export interface LevelBreakdown {
    level: number;
    total: number;
    correct: number;
    errors: number;
}

export interface QualitativeAnalysis {
    strongPoint: string;
    criticalZone: string;
    errorPattern: string;
    alert: string;
    triAnalysis: string[];
    actionPlan: string[];
}

export interface RegistryEntry {
    id: string;
    subjectId: string;
    examRef: string;
    date: string;
    timeSpent: string;
    score: number;
    profile: { age: number; status: string };
    breakdown: LevelBreakdown[];
    qualitative: QualitativeAnalysis;
    questionLog?: QuestaoRelatorio[];
}

// Centraliza todos os registros em um único array plano
export const REGISTRIES_DB: RegistryEntry[] = [
    ...humanas.registries,
    ...linguagens.registries,
    ...matematica.registries,
    ...natureza.registries,
    ...redacao.registries
] as RegistryEntry[];