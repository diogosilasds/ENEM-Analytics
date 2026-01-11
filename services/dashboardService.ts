
import { 
  historicoHumanas, metadataHumanas,
  historicoLinguagens, metadataLinguagens,
  historicoMatematica, metadataMatematica,
  historicoNatureza, metadataNatureza,
  historicoRedacao, metadataRedacao
} from '../data/dashboardData';
import { criarTemplateVazio } from '../data/utils';
import { MateriaData, DebugReport, DebugTarget, DebugSubjectData, DebugRedacaoAnalysis } from '../types';

// O banco agora mapeia ID da Matéria -> (Ano -> Lista de Tentativas)
const database: Record<string, Record<number, MateriaData[]>> = {
  humanas: historicoHumanas,
  linguagens: historicoLinguagens,
  matematica: historicoMatematica,
  natureza: historicoNatureza,
  redacao: historicoRedacao,
};

const subjectsMetadata: Record<string, { id: string, title: string, shortName: string, color: string }> = {
  humanas: metadataHumanas,
  linguagens: metadataLinguagens,
  matematica: metadataMatematica,
  natureza: metadataNatureza,
  redacao: metadataRedacao,
};

export const dashboardService = {
  /**
   * Retorna os anos disponíveis de 2010 até 2024.
   */
  getAvailableYears: (subjectId: string): number[] => {
    return Array.from({ length: 15 }, (_, i) => 2024 - i);
  },

  /**
   * Retorna o ano mais recente que possui dados (questões > 0).
   * Se nenhum tiver dados, retorna 2010 (padrão solicitado).
   */
  getLatestActiveYear: (subjectId: string): number => {
    const subjectHistory = database[subjectId];
    if (!subjectHistory) return 2010;
    
    // Filtra anos que possuem pelo menos uma tentativa com dados
    const yearsInDb = Object.keys(subjectHistory).map(Number).sort((a, b) => b - a);
    
    const activeYear = yearsInDb.find(year => {
      const attempts = subjectHistory[year];
      // Verifica se existe alguma tentativa com questões > 0
      return attempts && attempts.some(a => a.questoes.total > 0);
    });

    return activeYear || 2010;
  },

  /**
   * Retorna todas as tentativas para um determinado ano e matéria,
   * formatadas para o dropdown de seleção.
   */
  getAttemptsForYear: (id: string, year: number): { id: string, label: string, date: string }[] => {
    if (!database[id] || !database[id][year]) return [];

    const attempts = database[id][year];
    
    // Ordena por data (mais recente primeiro)
    const sorted = [...attempts].sort((a, b) => {
        const dateA = a.dataRealizacao ? new Date(a.dataRealizacao).getTime() : 0;
        const dateB = b.dataRealizacao ? new Date(b.dataRealizacao).getTime() : 0;
        return dateB - dateA;
    });

    return sorted.map((attempt, index) => {
        // Cria um label amigável baseado na data
        let label = `Tentativa ${sorted.length - index}`;
        if (attempt.dataRealizacao) {
            const date = new Date(attempt.dataRealizacao);
            // Formata para "Jan", "Fev", etc.
            const monthNames = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
            label = `${monthNames[date.getMonth()]} / ${date.getFullYear().toString().substring(2)}`;
        }

        return {
            id: attempt.id || `attempt_${index}`,
            label: label,
            date: attempt.dataRealizacao || ''
        };
    });
  },

  /**
   * Retorna os dados de uma matéria específica por ID e Ano.
   * Se attemptId for fornecido, busca aquela específica.
   * Se não, retorna a MAIS RECENTE (index 0 após sort).
   */
  getDataByYear: (id: string, year: number, attemptId?: string): MateriaData | null => {
    if (database[id] && database[id][year] && database[id][year].length > 0) {
      const attempts = [...database[id][year]];
      
      // Ordena por data decrescente (mais nova primeiro)
      attempts.sort((a, b) => {
        const dateA = a.dataRealizacao ? new Date(a.dataRealizacao).getTime() : 0;
        const dateB = b.dataRealizacao ? new Date(b.dataRealizacao).getTime() : 0;
        return dateB - dateA;
      });

      if (attemptId) {
        return attempts.find(a => a.id === attemptId) || attempts[0];
      }
      
      return attempts[0]; // Retorna a mais recente por padrão
    }
    
    const title = subjectsMetadata[id]?.title || id;
    return criarTemplateVazio(title, year);
  },

  /**
   * Retorna o resumo para a Home. Busca sempre a tentativa mais recente do ano alvo.
   */
  getAllSubjectsSummary: () => {
    return Object.keys(database).map((key) => {
      const targetYear = database[key]?.[2010] ? 2010 : dashboardService.getLatestActiveYear(key);
      const data = dashboardService.getDataByYear(key, targetYear);
      return {
        id: key,
        data: data || criarTemplateVazio(subjectsMetadata[key]?.title || key, targetYear),
        color: subjectsMetadata[key]?.color || 'gray',
      };
    });
  },

  /**
   * GERA O RELATÓRIO DE DEBUG (AUDITORIA DE FALHAS)
   * Analisa as últimas tentativas de Humanas, Linguagens, Natureza e Matemática.
   * AGORA INCLUI: Análise de Redação
   */
  getDebugReport: (): DebugReport => {
    // --- LÓGICA EXISTENTE DE TRI (HUM, LIN, MAT, NAT) ---
    const subjectsToCheck = ['humanas', 'linguagens', 'matematica', 'natureza'];
    const targets: DebugTarget[] = [];
    const fullHistory: DebugSubjectData[] = [];
    
    let totalErrorsGlobal = 0;
    let criticalZoneErrors = 0; // Erros em níveis fáceis/médios (< 650)

    subjectsToCheck.forEach(subId => {
      const year = dashboardService.getLatestActiveYear(subId);
      const data = dashboardService.getDataByYear(subId, year);
      
      if (!data) return; // Se não tiver dados, ignora mas não quebra o array

      // Adiciona ao histórico completo para gráficos
      fullHistory.push({
        id: subId,
        name: subjectsMetadata[subId]?.shortName || subId.toUpperCase(), 
        levels: data.detalhado,
        totalErrors: data.questoes.erros
      });

      if (data.questoes.total === 0) return;

      // Adiciona aos globais
      totalErrorsGlobal += data.questoes.erros;
      criticalZoneErrors += data.detalhado
        .filter(d => parseInt(d.nivel) <= 650)
        .reduce((acc, curr) => acc + curr.erros, 0);

      // ALGORITMO DE SELEÇÃO DE ALVO:
      let priorityLevel = data.detalhado[0] || { nivel: '0', erros: 0, taxa: 0, total: 0 };
      let maxImpactScore = -1;

      data.detalhado.forEach(nivel => {
        const lvl = parseInt(nivel.nivel);
        
        // Peso de impacto: Errar questão fácil custa muito mais caro no TRI.
        let weight = 1;
        if (lvl <= 500) weight = 3;       // Crítico
        else if (lvl <= 650) weight = 2;  // Importante
        else if (lvl > 800) weight = 0.5; // Desprezível

        // Score = Erros absolutos * Peso do TRI * (100 - Taxa de Acerto)
        const impactScore = (nivel.erros * weight) + ((100 - nivel.taxa) / 10);

        if (impactScore > maxImpactScore) {
          maxImpactScore = impactScore;
          priorityLevel = nivel;
        }
      });

      // Gera a recomendação baseada no nível encontrado E na matéria
      const lvlNum = parseInt(priorityLevel.nivel);
      let rec = "";

      // LÓGICA DE RECOMENDAÇÃO ESPECÍFICA POR MATÉRIA (CYBERPUNK STYLE)
      switch(subId) {
          case 'humanas':
              if (lvlNum <= 500) {
                  rec = "FALHA CRÍTICA DE BASE: O sistema detectou erros em interpretação de imagens e cronologia histórica básica. Isso inviabiliza a coerência do TRI. Suspenda estudos de Geopolítica e foque em Cidadania e Fontes Primárias.";
              } else if (lvlNum <= 700) {
                  rec = "ERRO DE CONTEXTUALIZAÇÃO: Você domina os fatos isolados, mas falha na conexão interdisciplinar (História-Geografia). Reforce a análise de 'Causa e Consequência' em Revoluções e Processos Migratórios.";
              } else {
                  rec = "REFINAMENTO ANALÍTICO: Erros pontuais em Filosofia Moderna ou Sociologia complexa. O impacto no score global é baixo, mas impede a excelência. Mantenha a base aquecida.";
              }
              break;

          case 'linguagens':
              if (lvlNum <= 500) {
                  rec = "ERRO DE SINTAXE COGNITIVA: Incapacidade de extrair informações explícitas de textos curtos. Retornar imediatamente aos fundamentos de Gêneros Textuais e identificação da tese do autor.";
              } else if (lvlNum <= 700) {
                  rec = "DISSONÂNCIA SEMÂNTICA: Dificuldade em captar ironia, pressupostos e funções da linguagem. A leitura está superficial (scanning). Ativar protocolo de leitura analítica em Literatura e Artes.";
              } else {
                  rec = "OTIMIZAÇÃO DE SINAL: Falhas residuais em gramática normativa complexa ou textos abstratos. Foco secundário em variantes linguísticas para fechar o gap.";
              }
              break;

          case 'matematica':
              if (lvlNum <= 500) {
                  rec = "PANE NO ALGORITMO LÓGICO: Erros em aritmética básica, leitura de gráficos simples ou regra de três. Isso é tóxico para sua nota. Bloqueie conteúdos de Geometria Espacial e Logaritmos; foque 100% em Matemática Básica.";
              } else if (lvlNum <= 700) {
                  rec = "GARGALO DE PROCESSAMENTO: Travamento em Geometria Plana, Estatística ou Funções de 1º grau. Você conhece a fórmula, mas erra a modelagem do problema. Treinar interpretação de enunciados matemáticos.";
              } else {
                  rec = "OVERCLOCKING INSTÁVEL: Erros em Logaritmos, Combinatória ou Probabilidade condicional. O custo-benefício de corrigir isso agora é baixo se a base não estiver perfeita. Priorize blindar os níveis < 700.";
              }
              break;

          case 'natureza':
              if (lvlNum <= 500) {
                  rec = "BIOHAZARD DETECTADO: Conceitos fundamentais de Ecologia, Ondulatória ou separação de misturas comprometidos. O sistema TRI não validará seus acertos complexos sem essa base sólida. Reiniciar módulo de Ciências Básicas.";
              } else if (lvlNum <= 700) {
                  rec = "DESCALIBRAÇÃO TÉCNICA: Falhas em Estequiometria, Eletrodinâmica ou Fisiologia. A teoria existe, mas a aplicação prática falha sob pressão. Reforçar resolução de exercícios padrão Enem.";
              } else {
                  rec = "ALTA VOLTAGEM: Erros em Reações Orgânicas complexas ou Magnetismo. Tópicos de alta complexidade e baixa recorrência relativa. Apenas revise se a base estiver 100% estável.";
              }
              break;

          default:
              // Fallback genérico
              if (lvlNum <= 500) rec = "ALERTA DE SISTEMA: Revisão de base mandatória. Erros neste nível destroem a coerência do TRI.";
              else if (lvlNum <= 700) rec = "ATENÇÃO: Dificuldade na transição para questões complexas. Reforce a prática de nível médio.";
              else rec = "REFINAMENTO: Ajuste fino para nota máxima. Foco em detalhes e exceções.";
      }

      targets.push({
        subjectId: subId,
        subjectName: subjectsMetadata[subId]?.title || subjectTitles[subId],
        priorityLevel: priorityLevel.nivel,
        errorCount: priorityLevel.erros,
        accuracy: priorityLevel.taxa,
        totalQuestions: priorityLevel.total,
        impactScore: maxImpactScore,
        recommendation: rec
      });
    });

    // Ordena os targets por Impact Score
    targets.sort((a, b) => b.impactScore - a.impactScore);

    const totalQuestions = subjectsToCheck.reduce((acc, subId) => {
        const year = dashboardService.getLatestActiveYear(subId);
        const data = dashboardService.getDataByYear(subId, year);
        return acc + (data?.questoes.total || 0);
    }, 0);

    const globalErrorRate = totalQuestions > 0 ? (totalErrorsGlobal / totalQuestions) * 100 : 0;


    // --- NOVA LÓGICA DE AUDITORIA DE REDAÇÃO ---
    let redacaoAnalysis: DebugRedacaoAnalysis | undefined;
    const redacaoYear = dashboardService.getLatestActiveYear('redacao');
    const redacaoData = dashboardService.getDataByYear('redacao', redacaoYear);

    if (redacaoData && redacaoData.redacaoData) {
        // 1. Análise de Competências
        const comps = redacaoData.redacaoData.competencias.map(c => ({
            id: c.id,
            name: c.nome,
            score: c.nota,
            meta: c.meta,
            gap: c.meta - c.nota
        }));

        // Encontra a competência mais crítica (maior gap)
        const criticalComp = [...comps].sort((a, b) => b.gap - a.gap)[0];

        // 2. Extração de Erros Textuais do Transcrito
        const allTextErrors = redacaoData.redacaoData.textoTranscrito.flatMap(line => line.errors || []);
        
        // Agrupa erros por tipo
        const errorCounts = allTextErrors.reduce((acc, err) => {
            acc[err.type] = (acc[err.type] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const textErrors = Object.entries(errorCounts).map(([type, count]) => {
            let label = 'Desconhecido';
            if (type === 'grammar') label = 'Gramática';
            else if (type === 'structure') label = 'Estrutura';
            else if (type === 'cohesion') label = 'Coesão';
            else if (type === 'intervention') label = 'Intervenção';
            
            return { type, count, label };
        });

        // 3. Histórico de Redações (Comparação)
        // Busca todas as tentativas disponíveis para o ano (ou todos os anos se necessário expandir)
        const redacaoHistory = dashboardService.getAttemptsForYear('redacao', redacaoYear).map(attempt => {
           const d = dashboardService.getDataByYear('redacao', redacaoYear, attempt.id);
           return {
               date: d?.dataRealizacao || 'N/A',
               score: d?.notaAtual || 0,
               label: attempt.label
           };
        }).reverse(); // Do mais antigo para o mais novo

        redacaoAnalysis = {
            currentScore: redacaoData.notaAtual,
            competencies: comps,
            textErrors: textErrors,
            totalTextErrors: allTextErrors.length,
            criticalCompetency: criticalComp ? `${criticalComp.id} (${criticalComp.name})` : 'Nenhum',
            history: redacaoHistory
        };
    }

    return {
      targets,
      fullHistory,
      globalErrorRate,
      totalErrors: totalErrorsGlobal,
      criticalZoneErrors,
      mostCriticalSubject: targets[0]?.subjectName || 'N/A',
      redacaoAnalysis // Adiciona ao relatório final
    };
  }
};
// Fallback for subjectTitles if needed during transition, though replaced by metadata
const subjectTitles: Record<string, string> = {
  humanas: 'Ciências Humanas',
  linguagens: 'Linguagens e Códigos',
  matematica: 'Matemática e Tecnologias',
  natureza: 'Ciências da Natureza',
  redacao: 'Redação',
};