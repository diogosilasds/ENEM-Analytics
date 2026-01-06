
// LAYER 1: IDENTITY & CONFIGURATION
// Agora carregado a partir de arquivos TS dedicados (Data as Code).

import humanas from './json/humanas';
import linguagens from './json/linguagens';
import matematica from './json/matematica';
import natureza from './json/natureza';
import redacao from './json/redacao';

export interface SubjectConfig {
    id: string;
    title: string;
    shortName: string;
    area: string;
    color: string;
    goal: number;
    weight: number;
    competencies: string[];
    authorizedWidgets: string[];
}

// Agrega as configurações em um objeto indexado
export const SUBJECTS_DB: Record<string, SubjectConfig> = {
    humanas: humanas.config,
    linguagens: linguagens.config,
    matematica: matematica.config,
    natureza: natureza.config,
    redacao: redacao.config
};
