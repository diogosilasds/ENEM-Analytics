
import { MateriaData, DetalheNivel, MetaItem, LinhaItem, ProjecaoItem } from '../../types';
import { SUBJECTS_DB, SubjectConfig } from '../db/subjects';
import { REGISTRIES_DB, RegistryEntry } from '../db/registries';
import { criarTemplateVazio } from '../utils';

// Constantes de Cores para Visualização
const COLORS = {
    PERFECT: '#ffffff',
    GOOD: '#d4d4d4',
    AVG: '#a3a3a3',
    POOR: '#525252',
    CRITICAL: '#262626',
    ERROR: '#ff0055'
};

/**
 * Calcula a cor baseada na taxa de acerto
 */
function calculateColor(rate: number): string {
    if (rate >= 100) return COLORS.PERFECT;
    if (rate >= 75) return COLORS.GOOD;
    if (rate >= 50) return COLORS.AVG;
    if (rate >= 25) return COLORS.POOR;
    return COLORS.CRITICAL;
}

/**
 * Gera Metas Dinâmicas baseadas na performance
 */
function generateGoals(breakdown: DetalheNivel[], subjectGoal: number): MetaItem[] {
    // Agrupamento simplificado para metas
    const levels = breakdown.map(b => ({
        lvl: parseInt(b.nivel),
        rate: b.taxa
    }));

    const easy = levels.filter(l => l.lvl <= 500);
    const medium = levels.filter(l => l.lvl > 500 && l.lvl <= 700);
    const hard = levels.filter(l => l.lvl > 700);

    const calcAvg = (arr: any[]) => arr.length ? arr.reduce((a, b) => a + b.rate, 0) / arr.length : 0;

    return [
        { 
            nivel: 'Base (400-500)', 
            atual: calcAvg(easy), 
            meta: 100, 
            acao: 'Blindar a base. Tolerância zero a erros.' 
        },
        { 
            nivel: 'Operacional (500-700)', 
            atual: calcAvg(medium), 
            meta: 80, 
            acao: 'Prioridade tática. Aqui se ganha volume.' 
        },
        { 
            nivel: 'Alta Performance (700+)', 
            atual: calcAvg(hard), 
            meta: 40, 
            acao: 'Refinamento secundário.' 
        }
    ];
}

/**
 * Gera Projeção Linear Simples (Simulação de 10 meses)
 */
function generateProjection(currentScore: number, goal: number): ProjecaoItem[] {
    const months = ['Jan/26', 'Fev/26', 'Mar/26', 'Abr/26', 'Mai/26', 'Jun/26', 'Jul/26', 'Ago/26', 'Set/26', 'Out/26'];
    const gap = goal - currentScore;
    const step = gap / months.length;

    const projection = months.map((m, i) => ({
        mes: m,
        nota: Math.round(currentScore + (step * i)),
        meta: goal
    }));

    // Adiciona o ponto final (ENEM)
    projection.push({ mes: 'ENEM', nota: goal, meta: goal });
    return projection;
}

/**
 * Processador Principal: Transforma Raw Registry em View Model
 */
export const processSubjectData = (subjectId: string, year: number): MateriaData => {
    const config = SUBJECTS_DB[subjectId];
    if (!config) return criarTemplateVazio(subjectId, year);

    // Encontra a tentativa mais relevante para o ano/subject
    // (Lógica simples: Pega o registro que contém o ano no "examRef" ou data)
    // Em produção, filtraria exatamente pelo ano. Aqui pegamos o mais recente do subject.
    const registry = REGISTRIES_DB.find(r => r.subjectId === subjectId); // Simplificado para pegar o único existente por enquanto

    if (!registry) return criarTemplateVazio(config.title, year);

    // 1. Processar Estatísticas Gerais
    const totalQ = registry.breakdown.reduce((acc, curr) => acc + curr.total, 0);
    const correctQ = registry.breakdown.reduce((acc, curr) => acc + curr.correct, 0);
    const errorQ = registry.breakdown.reduce((acc, curr) => acc + curr.errors, 0);
    const rate = totalQ > 0 ? (correctQ / totalQ) * 100 : 0;

    // 2. Processar Detalhamento por Nível
    const detalhado: DetalheNivel[] = registry.breakdown.map(b => {
        const taxa = b.total > 0 ? (b.correct / b.total) * 100 : 0;
        return {
            nivel: b.level.toString(),
            faixa: b.level.toString(),
            total: b.total,
            acertos: b.correct,
            erros: b.errors,
            taxa: taxa,
            cor: calculateColor(taxa)
        };
    });

    // 3. Processar Linha de Evolução (Complexity Curve)
    const linha: LinhaItem[] = detalhado.map(d => ({
        nivel: d.nivel,
        taxa: d.taxa
    }));

    return {
        id: registry.id,
        dataRealizacao: registry.date,
        titulo: config.title,
        perfil: { idade: registry.profile.age, conclusao: registry.profile.status },
        data: registry.examRef,
        notaAtual: registry.score,
        meta: config.goal,
        gap: config.goal - registry.score,
        tempo: registry.timeSpent,
        questoes: {
            total: totalQ,
            acertos: correctQ,
            erros: errorQ,
            taxa: rate
        },
        projecao: generateProjection(registry.score, config.goal),
        detalhado: detalhado,
        metas: generateGoals(detalhado, config.goal),
        linha: linha,
        diagnostico: {
            pontoForte: registry.qualitative.strongPoint,
            zonaCritica: registry.qualitative.criticalZone,
            problema: registry.qualitative.errorPattern,
            alerta: registry.qualitative.alert
        },
        analiseProfunda: {
            tri: registry.qualitative.triAnalysis,
            plano: registry.qualitative.actionPlan
        }
    };
};
