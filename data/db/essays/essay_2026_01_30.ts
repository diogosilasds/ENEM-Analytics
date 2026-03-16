
import { MateriaData, RedacaoSpecificData } from '../../../types';
import { criarTemplateVazio } from '../../utils';

const redacaoData: RedacaoSpecificData = {
  temaSugrido: "Proposta 4 - Caminhos para combater o preconceito linguístico no Brasil",
  competencias: [
    { id: 'C1', nome: 'Norma Culta', nota: 160, meta: 200, descricao: 'Desvios pontuais de ortografia (esteriótipos), sufixação (sociolinguista) e sintaxe na conclusão.' },
    { id: 'C2', nome: 'Tema/Estrutura', nota: 200, meta: 200, descricao: 'Excelente uso de repertório (Marco Aurélio) com fechamento cíclico.' },
    { id: 'C3', nome: 'Argumentação', nota: 200, meta: 200, descricao: 'Projeto de texto consolidado. Argumentos progressivos e metáfora "muro vs ponte" eficaz.' },
    { id: 'C4', nome: 'Coesão', nota: 200, meta: 200, descricao: 'Uso fluido de operadores argumentativos intra e interparágrafos.' },
    { id: 'C5', nome: 'Intervenção', nota: 200, meta: 200, descricao: 'Proposta completa com os 5 elementos (Agente, Ação, Modo, Efeito, Detalhamento).' },
  ],
  paragraphStarts: [1, 7, 15, 22],
  textoTranscrito: [
    { lineNumber: 1, text: 'Na obra “Meditações”, Marco Aurélio agradece a um mentor por ensiná-' },
    { lineNumber: 2, text: 'lo a não julgar a capacidade alheia baseando-se em erros de fala. O Brasil, con-' },
    { lineNumber: 3, text: 'tudo, ignora essa sabedoria ao perpetuar o preconceito linguístico, sustentada', errors: [{ term: 'sustentada', correction: 'sustentado', type: 'grammar', description: 'Concordância Nominal: Refere-se a "preconceito" (masculino).' }] },
    { lineNumber: 4, text: 'na priorização da forma sobre a mensagem e na discriminação contra so-' },
    { lineNumber: 5, text: 'taques diversos. É preciso, portanto, analisar como a (supervalorização)', errors: [{ term: '(supervalorização)', correction: 'Rasura', type: 'grammar', description: 'C1: Rasura identificada.' }] },
    { lineNumber: 6, text: 'supervalorização da norma culta estrutura essa exclusão.' },
    { lineNumber: 7, text: 'Em primeiro lugar, o preconceito linguístico atua como mecânismo de se-', errors: [{ term: 'mecânismo', correction: 'mecanismo', type: 'grammar', description: 'Acentuação Indevida: Paroxítona terminada em "o".' }] },
    { lineNumber: 8, text: 'gregação ao invalidar quem não domina a gramática normativa. Isso acon-' },
    { lineNumber: 9, text: 'tece porque a norma culta está definida como superior, transformando' },
    { lineNumber: 10, text: 'variações naturais em sinais de incapacidade. Um exemplo claro é a' },
    { lineNumber: 11, text: 'ridicularização de pessoas em ambientes corporativos por desvios de' },
    { lineNumber: 12, text: 'concordância, em detrimento do conteúdo. Assim, a língua vira um' },
    { lineNumber: 13, text: 'muro que separa cidadãos (pela) pelo vocabulário, e não uma ponte para', errors: [{ term: '(pela)', correction: 'Rasura', type: 'grammar', description: 'C1: Rasura simples.' }] },
    { lineNumber: 14, text: 'o entendimento.' },
    { lineNumber: 15, text: 'Além disso, a extensão territorial do Brasil gera uma diversidade de' },
    { lineNumber: 16, text: 'sotaques causado naturalmente. O preconceito começa quando patri-', errors: [{ term: 'causado', correction: 'causada', type: 'grammar', description: 'Concordância Nominal: Refere-se a "diversidade" (feminino).' }] },
    { lineNumber: 17, text: 'otas na internet e no cotidiano estigmatizam variantes como si-' },
    { lineNumber: 18, text: 'nal de atraso cultural e intelectual. Essa visão ignora a riqueza' },
    { lineNumber: 19, text: 'sociolinguista, tratando sotaques diferentes como falhas a serem', errors: [{ term: 'sociolinguista', correction: 'sociolinguística', type: 'grammar', description: 'Imprecisão vocabular: "Sociolinguista" é a pessoa; "Sociolinguística" é a área.' }] },
    { lineNumber: 20, text: 'corrigidas, e não como identidade. Consequentemente, silencia-se' },
    { lineNumber: 21, text: 'a pluralidade nacional em favor de um padrão arbitrário.' },
    { lineNumber: 22, text: 'Portanto, medidas podem ser usadas para combater essa visão res-' },
    { lineNumber: 23, text: 'tritiva. Cabe a sociedade civil difundir, através de redes sociais e', errors: [{ term: 'a sociedade', correction: 'à sociedade', type: 'grammar', description: 'Crase obrigatória: verbo "caber" exige preposição "a".' }, { term: 'através de', correction: 'por meio de', type: 'cohesion', description: 'Imprecisão: "Através" indica atravessar fisicamente.' }] },
    { lineNumber: 24, text: 'nos diálogos do cotidiano que sotaques e erros linguísticos não re-' },
    { lineNumber: 25, text: 'presentam demérito ou motivo de vergonha. Ocorrendo via con-', errors: [{ term: 'Ocorrendo', correction: 'Truncamento', type: 'structure', description: 'Erro de Sintaxe: Oração gerundiva solta. Deveria estar ligada à anterior.' }] },
    { lineNumber: 26, text: 'dutas do cotidiano que desconstruam esteriótipos de fala e', errors: [{ term: 'esteriótipos', correction: 'estereótipos', type: 'grammar', description: 'Erro ortográfico.' }] },
    { lineNumber: 27, text: 'valorizem a diversidade. Dessa forma, será possível construir' },
    { lineNumber: 28, text: 'uma sociedade que, como aprendeu Marco Aurélio, valorize a' },
    { lineNumber: 29, text: 'mensagem (forma) humana acima da rigidez da forma.', errors: [{ term: '(forma)', correction: 'Rasura', type: 'grammar', description: 'Rasura.' }] }
  ],
  feedbackGeral: {
    pontosFortes: ['Repertório cíclico (Marco Aurélio) muito bem amarrado.', 'Uso da metáfora "muro vs ponte" valorizou a argumentação.', 'Proposta de intervenção detalhada e conectada à tese.'],
    pontosFracos: ['C1 (Gramática): Erros de sintaxe (truncamento) e ortografia (estereótipos/sociolinguística) impediram o 1000.'],
    dicaOuro: 'Cuidado com orações iniciadas por gerúndio (Ocorrendo...) após ponto final. Elas geralmente criam truncamento sintático.'
  },
  checklist: [
    { label: 'C1: Ortografia (Estereótipos, Sociolinguística)', checked: false },
    { label: 'C1: Sintaxe (Evitar frases soltas com gerúndio)', checked: false },
    { label: 'C1: Crase (Cabe à sociedade)', checked: false },
    { label: 'C1: Revisão de concordância (Sustentado/a, Causado/a)', checked: false }
  ],
  manualConstrucao: {
    titulo: "Guia: Polimento para o 1000",
    passos: [
      {
        titulo: "CHECKLIST DE SINTAXE",
        descricao: "Verifique se toda frase iniciada com maiúscula tem sujeito e verbo principal. Cuidado com gerúndios isolados."
      },
      {
        titulo: "VOCABULÁRIO VISUAL",
        descricao: "Memorize a grafia de termos acadêmicos: Estereótipo (E), Reivindicar (I), Privilégio (I)."
      },
      {
        titulo: "REGÊNCIA DE INTERVENÇÃO",
        descricao: "Verbos como 'caber' e 'visar' exigem atenção à crase e preposições."
      }
    ],
    dicasGramaticais: "1) Estereótipo (grafia com E). 2) Sociolinguista = pessoa vs Sociolinguística = área. 3) Através de = atravessar físico; Por meio de = instrumento.",
    vocabularioJuizo: [
      "estigma", "arbitrário", "normativo", "segregação", "pluralidade",
      "intrínseco", "desconstrução", "vigência", "demérito", "sociolinguística"
    ],
    notaFinal: "Nota 960. Texto excelente, 'Arquiteto Competente'. A perda de pontos foi puramente mecânica/gramatical."
  },
  reescrita: {
    intro: "Você está a 40 pontos da nota máxima. O gargalo é apenas o refinamento gramatical (C1).",
    exemplos: [
      {
        titulo: "1. Truncamento Sintático (O Erro Invisível)",
        problema: "Isolar uma oração subordinada (gerúndio) como se fosse uma frase independente.",
        comoMelhorar: "Unir à frase anterior com vírgula ou adicionar sujeito.",
        original: "...motivo de vergonha. Ocorrendo via condutas...",
        corrigido: "...motivo de vergonha, **o que deve ocorrer** via condutas...",
        explicacao: "Transformamos a oração solta em uma explicativa conectada."
      },
      {
        titulo: "2. Precisão Vocabular (Sufixos)",
        problema: "Trocar o profissional pela área de estudo.",
        comoMelhorar: "Atenção ao sufixo: -ista (pessoa), -ia/ica (ciência).",
        original: "...ignora a riqueza sociolinguista...",
        corrigido: "...ignora a riqueza **sociolinguística**...",
        explicacao: "Sociolinguista é quem estuda; a riqueza pertence à área (sociolinguística)."
      }
    ]
  },
  vicios: [
    { termo: 'COTIDIANO', ocorrencias: 3, limite: 2 },
    { termo: 'FORMA', ocorrencias: 3, limite: 2 }
  ]
};

export const essay_2026_01_30: MateriaData = {
  ...criarTemplateVazio('Redação', 2026),
  id: 'red_960_ling',
  dataRealizacao: '2026-01-30',
  notaAtual: 960,
  meta: 900,
  gap: 0,
  tempo: '1h20',
  questoes: { total: 1, acertos: 1, erros: 0, taxa: 96 },
  detalhado: [
    { nivel: 'C1', faixa: 'Gramática', total: 200, acertos: 160, erros: 40, taxa: 80, cor: '#f3e600' },
    { nivel: 'C2', faixa: 'Tema', total: 200, acertos: 200, erros: 0, taxa: 100, cor: '#00ff9f' },
    { nivel: 'C3', faixa: 'Argumento', total: 200, acertos: 200, erros: 0, taxa: 100, cor: '#00ff9f' },
    { nivel: 'C4', faixa: 'Coesão', total: 200, acertos: 200, erros: 0, taxa: 100, cor: '#00ff9f' },
    { nivel: 'C5', faixa: 'Proposta', total: 200, acertos: 200, erros: 0, taxa: 100, cor: '#00ff9f' },
  ],
  redacaoData: redacaoData
};
