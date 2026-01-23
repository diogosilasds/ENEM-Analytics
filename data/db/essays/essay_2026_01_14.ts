
import { MateriaData, RedacaoSpecificData } from '../../../types';
import { criarTemplateVazio } from '../../utils';

const redacaoData: RedacaoSpecificData = {
  temaSugrido: "Proposta 02 - A necessidade de preservar as matas e os biomas brasileiros",
  competencias: [
    { id: 'C1', nome: 'Norma Culta', nota: 160, meta: 200, descricao: 'Bom domínio, mas penalizado por rasuras excessivas (L5, L14, L17) e ortografia ("biodivercidade").' },
    { id: 'C2', nome: 'Tema/Estrutura', nota: 80, meta: 200, descricao: 'CRÍTICO: Repertório improdutivo. O uso do "Earthshot Prize" na moldura e a dependência do Texto III (Rios Voadores) travaram a nota.' },
    { id: 'C3', nome: 'Argumentação', nota: 120, meta: 200, descricao: 'Argumentação de senso comum. Faltou aprofundar as causas profundas (mentalidade capitalista/educação).' },
    { id: 'C4', nome: 'Coesão', nota: 160, meta: 200, descricao: 'Bom uso de conectivos (Entretanto, Ademais), garantindo a fluidez do texto.' },
    { id: 'C5', nome: 'Intervenção', nota: 160, meta: 200, descricao: 'Apresentou 4 elementos, mas FALTOU O DETALHAMENTO do Agente ou do Meio.' },
  ],
  paragraphStarts: [1, 7, 13, 19],
  textoTranscrito: [
    { lineNumber: 1, text: 'O "Earthshot Prize", criado pelo Príncipe William, simboliza o esforço' },
    { lineNumber: 2, text: 'global para restaurar a natureza com urgência. No Brasil, entretanto, a in-' },
    { lineNumber: 3, text: 'tegridade dos biomas é comprometida pelo desmatamento e por interesses', errors: [{ term: 'comprometida', correction: 'Apresentação', type: 'cohesion', description: 'C4: Construção clara, mas o impacto argumentativo da C2 é o foco da correção.' }] },
    { lineNumber: 4, text: 'econômicos imediatistas que fragilizam o equilíbrio ambiental. É impe-' },
    { lineNumber: 5, text: 'rativo analisar como a exploração e a fiscalização ineficiente impulsio-', errors: [{ term: 'analisar', correction: 'Rasura', type: 'grammar', description: 'C1: Evite escrever sobre palavras riscadas; reduz a legibilidade.' }] },
    { lineNumber: 6, text: 'nam essa degradação.' },
    { lineNumber: 7, text: 'A prioridade do agronegócio sobre a conservação é a causa central da des-' },
    { lineNumber: 8, text: 'truição das matas. Isso ocorre porque o lucro imediato ignora que a bio-' },
    { lineNumber: 9, text: 'divercidade regula serviços vitais, como o regime das chuvas. O ava-', errors: [{ term: 'divercidade', correction: 'diversidade', type: 'grammar', description: 'C1: Ortografia incorreta. Grafia correta com "S".' }] },
    { lineNumber: 10, text: 'nço agrícola no Cerrado, por exemplo, reduz os "rios voadores", causando', errors: [{ term: 'rios voadores', correction: 'Dependência do Texto III', type: 'structure', description: 'C2: Termo presente no Texto III. Usá-lo sem trazer dado novo torna o repertório baseado apenas na prova.' }] },
    { lineNumber: 11, text: 'secas que prejudicam o abastecimento e a própria economia. Assim, o' },
    { lineNumber: 12, text: 'extrativismo inviabiliza o futuro climático.' },
    { lineNumber: 13, text: 'Ademais, a fragilidade do controle estatal permite que crimes ambientais' },
    { lineNumber: 14, text: 'ocorram sob total impunidade. Sem vigilância, queimadas', errors: [{ term: 'impunidade', correction: 'Rasura', type: 'grammar', description: 'C1: Correção visível sobre o papel.' }] },
    { lineNumber: 15, text: 'e extração de madeira avançam sob áreas protegidas em velocidade a-' },
    { lineNumber: 16, text: 'larmante. A degradação do Pantanal e da Mata Atlântica reflete um' },
    { lineNumber: 17, text: '"clima de finados" para a fauna e flora local. Logo, a falta de punição', errors: [{ term: 'finados', correction: 'Coloquialismo', type: 'cohesion', description: 'C1/C4: Termo inadequado para o registro formal.' }, { term: 'local', correction: 'Rasura Extensa', type: 'grammar', description: 'C1: Risco longo eliminando trecho.' }] },
    { lineNumber: 18, text: 'acelera a desertificação e a perda de espécies.' },
    { lineNumber: 19, text: 'Portanto, o Ministério do Meio Ambiente poderia fortalecer a prote-' },
    { lineNumber: 20, text: 'ção dos biomas mediante o aumento de fiscais e o uso de monitoramento' },
    { lineNumber: 21, text: 'via satélite em tempo real. Essa ação visa embargar terras ilegais para', errors: [{ term: 'satélite', correction: 'Falta Detalhamento', type: 'intervention', description: 'C5: Necessário detalhar um dos elementos (Agente, Ação, Meio ou Efeito).' }] },
    { lineNumber: 22, text: 'desestimular o crime ambiental. Só assim o Brasil cumprirá metas' },
    { lineNumber: 23, text: 'como as do "Earthshot Prize", preservando sua biodiversidade.' },
  ],
  feedbackGeral: {
    pontosFortes: [
      'Domínio da estrutura dissertativa.',
      'Bom uso de conectivos interparágrafos (Ademais, Portanto).'
    ],
    pontosFracos: [
      'C2 (80 pts): Repertório Improdutivo. O prêmio William ficou na moldura.',
      'C2 (Linha 10): Dependência dos textos motivadores (Rios Voadores).',
      'C5 (160 pts): Ausência de detalhamento técnico.'
    ],
    dicaOuro: 'Mova o repertório externo para o DESENVOLVIMENTO para provar as causas. Fugir do Texto III é vital para os 200 pontos na C2.'
  },
  checklist: [
    { label: 'C2: Migrar repertório da Intro para o Desenvolvimento 1', checked: false },
    { label: 'C2: Substituir "Rios Voadores" por conceito de autoridade externa', checked: false },
    { label: 'C5: Detalhar o Agente (Ministério) com oração explicativa', checked: false },
    { label: 'C1: Planejar rascunho para eliminar rasuras e borrões', checked: false }
  ],
  manualConstrucao: {
    titulo: "Guia de Resgate: A Lei da Produtividade (C2)",
    passos: [
      {
        titulo: "O REPERTÓRIO COMO PROVA",
        descricao: "Não use citações apenas para enfeitar. Elas devem explicar a CAUSA do problema no D1 ou D2."
      },
      {
        titulo: "AUTORIA CIENTÍFICA",
        descricao: "Se o texto de apoio cita um dado, você deve citar o CIENTISTA ou o CONCEITO que o valida."
      },
      {
        titulo: "FUGA DO SENSO COMUM",
        descricao: "Substitua metáforas coloquiais por terminologia técnica (ex: 'Necropolítica Ambiental')."
      },
      {
        titulo: "BLINDAGEM DA C5",
        descricao: "Adicione: ', órgão responsável por [função],' logo após o Agente."
      }
    ],
    dicasGramaticais: "Higiene do Texto: 1) 'Biodiversidade' com 'S' (som de Z). 2) Rasuras em excesso sinalizam insegurança; risque com um traço simples apenas. 3) Vocabulário: evite termos vagos como 'clima de finados' em favor de 'colapso ecossistêmico'.",
    vocabularioJuizo: [
      "savanização", "lucro excedente", "antrópico", "negligência", "inerte", 
      "imprescindível", "mitigar", "predatória", "ecossistema", "irreversível"
    ],
    notaFinal: "A nota 680 reflete uma estratégia falha no uso das fontes. O texto é bem escrito, mas 'ancorado' nos textos de apoio."
  },
  reescrita: {
    intro: "Sua nota em C2 travou em 80 pontos devido ao conceito de **Produtividade do Repertório**. Embora o 'Earthshot Prize' seja externo, ele foi usado apenas como 'moldura' na introdução. Para garantir 200 pontos, o repertório deve estar **dentro da argumentação** para validar as causas, e não apenas enfeitando o início ou o fim do texto.",
    exemplos: [
      {
        titulo: "1. Transformando o Repertório em 'Produtivo' (D1)",
        problema: "Você citou o prêmio na intro, mas não o usou para explicar as causas nos parágrafos de meio. O corretor considerou repertório improdutivo.",
        comoMelhorar: "Use um repertório que explique por que os interesses econômicos (seu argumento) destroem o ambiente no Desenvolvimento 1.",
        original: "A prioridade do agronegócio sobre a conservação é a causa central da destruição das matas. Isso ocorre porque o lucro imediato...",
        corrigido: "Isso ocorre porque a lógica do capital, conforme teorizado por **Karl Marx**, prioriza o lucro excedente em detrimento do bem-estar social e ambiental. No Brasil, essa mentalidade manifesta-se...",
        explicacao: "Ao usar Marx para validar o argumento de 'lucro imediato', você para de depender do senso comum e torna o repertório produtivo e legitimado."
      },
      {
        titulo: "2. Fugindo do Texto de Apoio (O caso dos Rios Voadores)",
        problema: "Você usou o termo 'Rios Voadores' que estava no Texto III da prova. Isso ancora sua nota em 120 (ou 80 se a argumentação for fraca).",
        comoMelhorar: "Traga uma informação nova ou o nome de um cientista autoridade sobre o assunto para mostrar autoria.",
        original: "...reduz os 'rios voadores', causando secas que prejudicam o abastecimento...",
        corrigido: "...afeta o regime pluvial, gerando o que o cientista **Carlos Nobre** aponta como a **'savanização da Amazônia'**, fenômeno que compromete o abastecimento hídrico...",
        explicacao: "Troquei o termo do texto de apoio por um conceito científico específico ('savanização') e citei o cientista responsável. Isso blinda sua nota contra corretores rigorosos."
      }
    ],
    resumoPratico: {
      titulo: "Estratégia Vencedora para a C2",
      itens: [
        "**Regra de Ouro:** Se o termo está no texto de apoio (ex: rios voadores, queimadas), não o use como base principal sem um dado novo.",
        "**Localização:** Force-se a colocar um repertório (História/Filosofia) no **início de um dos desenvolvimentos**.",
        "**Segurança:** Corretores conservadores preferem **Conceitos** (Constituição, Sociologia) em vez de fatos de atualidade como prêmios.",
        "**Detalhamento:** Na C5, adicione uma oração explicativa ao Agente para garantir os 200 pontos restantes."
      ]
    }
  },
  vicios: [
    { termo: 'NATUREZA', ocorrencias: 9, limite: 4 },
    { termo: 'PROBLEMA', ocorrencias: 7, limite: 3 }
  ]
};

export const essay_2026_01_14: MateriaData = {
  ...criarTemplateVazio('Redação', 2026),
  id: 'red_680_audit',
  dataRealizacao: '2026-01-14',
  notaAtual: 680,
  meta: 850,
  gap: 170,
  tempo: '1h05',
  questoes: { total: 1, acertos: 0, erros: 0, taxa: 68 },
  detalhado: [
    { nivel: 'C1', faixa: 'Gramática', total: 200, acertos: 160, erros: 40, taxa: 80, cor: '#f3e600' },
    { nivel: 'C2', faixa: 'Tema', total: 200, acertos: 80, erros: 120, taxa: 40, cor: '#ff0055' },
    { nivel: 'C3', faixa: 'Argumento', total: 200, acertos: 120, erros: 80, taxa: 60, cor: '#ff0055' },
    { nivel: 'C4', faixa: 'Coesão', total: 200, acertos: 160, erros: 40, taxa: 80, cor: '#f3e600' },
    { nivel: 'C5', faixa: 'Proposta', total: 200, acertos: 160, erros: 40, taxa: 80, cor: '#f3e600' },
  ],
  redacaoData: redacaoData
};
