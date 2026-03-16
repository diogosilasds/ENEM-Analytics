
import { MateriaData, RedacaoSpecificData } from '../../../types';
import { criarTemplateVazio } from '../../utils';

const redacaoData: RedacaoSpecificData = {
  temaSugrido: "Proposta 5 - Racismo ambiental como desafio contemporâneo brasileiro",
  competencias: [
    { id: 'C1', nome: 'Norma Culta', nota: 160, meta: 200, descricao: 'Presença de rasura e pequenos desvios de sintaxe/acentuação solicitados pelo corretor.' },
    { id: 'C2', nome: 'Tema/Estrutura', nota: 200, meta: 200, descricao: 'Abordagem impecável. Conseguiu alinhar desenvolvimento capitalista, geografia e ecologia.' },
    { id: 'C3', nome: 'Argumentação', nota: 200, meta: 200, descricao: 'Raciocínio lógico e encadeamento muito claro focado na assimetria de impacto e lucros.' },
    { id: 'C4', nome: 'Coesão', nota: 160, meta: 200, descricao: 'Uso repetitivo ou mal empregado de operadores argumentativos entre os períodos.' },
    { id: 'C5', nome: 'Intervenção', nota: 200, meta: 200, descricao: 'Solução exequível e agentes bem definidos. Respeito aos direitos humanos garantido.' },
  ],
  paragraphStarts: [1, 6, 15, 24],
  textoTranscrito: [
    { lineNumber: 1, text: 'O termo "Racismo Ambiental" foi cunhado pelo Dr. Benjamin F.' },
    { lineNumber: 2, text: 'Chaves Jr., em 1982, para evidenciar a exposição desigual de mino-' },
    { lineNumber: 3, text: 'rias a resíduos tóxicos. No Brasil, embora a exploração (da ra) da', errors: [{ term: '(da ra)', correction: 'Rasura', type: 'grammar', description: 'C1: Evitar rasuras na palavra (da ra).' }] },
    { lineNumber: 4, text: 'natureza gere impactos negativos, ela é o alicerce indispensável para a' },
    { lineNumber: 5, text: 'manutenção da economia e o avanço tecnológico global.' },
    { lineNumber: 6, text: 'A princípio, a concentração de lucros no topo da pirâmide social é o', errors: [{ term: 'A princípio', correction: 'Nesse contexto,', type: 'cohesion', description: 'C4: OPERADORES ARGUMENTATIVOS (PARTICULARIZAÇÃO DE RACIOCÍNIO) - Empregá-los, de preferência, entre períodos da introdução, do desenvolvimento ou no início do 2º parágrafo. Ex: Nesse ínterim, Nesse contexto, Nesse aspecto, Nesse sentido, Sob esse viés, Acerca dessa lógica, Nessa conjuntura.' }] },
    { lineNumber: 7, text: 'que viabiliza a existência de setores de alta escala, como o agronegócio' },
    { lineNumber: 8, text: 'e a mineração. Isso ocorre porque esses segmentos exigem investimentos' },
    { lineNumber: 9, text: 'massivos para gerar itens acessíveis e sustentar o desenvolvimento de' },
    { lineNumber: 10, text: 'beneficiem a humanidade. Conforme os dados, enquanto os 10%', errors: [{ term: 'beneficiem', correction: 'que beneficiem', type: 'grammar', description: 'C1: Dica do Corretor - incluir o "é" (ou "que" conectivo) para evitar truncamento do sentido.' }] },
    { lineNumber: 11, text: 'mais ricos geram a maior fatia das emissões, eles também detêm o ca-' },
    { lineNumber: 12, text: 'pital que movimenta a estrutura econômica do país. Sendo que o su-', errors: [{ term: 'Sendo que', correction: 'Logo,', type: 'cohesion', description: 'C4: OPERADORES CONCLUSIVOS - Empregá-los no final de cada parágrafo (último período) ou começo do 4º. Ex: Logo, Desse modo, Dessa forma, Portanto, Assim, Destarte.' }] },
    { lineNumber: 13, text: 'cesso dessas elites é a garantia da estabilidade financeira necessária' },
    { lineNumber: 14, text: 'para a continuidade da civilização moderna.' },
    { lineNumber: 15, text: 'Por outro lado, o impacto dos 50% mais pobres é uma consequência', errors: [{ term: 'Por outro lado', correction: 'Ademais,', type: 'cohesion', description: 'C4: ADIÇÃO (função de adicionar a segunda causa ou consequência). Ex: Ademais, Além disso, Também, Outrossim.' }] },
    { lineNumber: 16, text: 'geográfica da busca por alta produtividade e custos reduzidos. A de-' },
    { lineNumber: 17, text: 'pendência econômica impede a interrupção da exploração dos recursos,' },
    { lineNumber: 18, text: 'uma vez (de) que a produção em massa é o que garante o acesso a bens' },
    { lineNumber: 19, text: 'básicos de consumo. Dados indicam que as populações vulneráveis' },
    { lineNumber: 20, text: 'enfrentam desastres climáticos por residirem próximo às zonas de' },
    { lineNumber: 21, text: 'extração ou descarte industrial. Dessa forma, a vulnerabilidade de-', errors: [{ term: 'Dessa forma', correction: 'Nessa perspectiva,', type: 'cohesion', description: 'C4: OPERADORES ARGUMENTATIVOS (AFIRMAÇÃO DO ARGUMENTO ANTERIOR) - Empregá-los, de preferência, depois do repertório. Ex: Efetivamente, Em verdade, Nessa perspectiva, de fato.' }] },
    { lineNumber: 22, text: 'ssas populações é um desafio ético que reside na dificuldade de conci-' },
    { lineNumber: 23, text: 'liar o crescimento econômico com a preservação ambiental.', errors: [{ term: 'econômico', correction: 'economico', type: 'grammar', description: 'C1: Dica do Corretor - excluir o acento indevido.' }] },
    { lineNumber: 24, text: 'Portanto, para mitigar a assimetria entre lucro e risco, o setor pri-', errors: [{ term: 'Portanto', correction: 'Partindo dessa análise,', type: 'cohesion', description: 'C4: OUTROS CONECTORES - Ex: De forma análoga, Partindo dessa análise, De maneira análoga à ficção, No que tange a esse infortúnio, Para isso.' }] },
    { lineNumber: 25, text: 'vado poderia liderar a proteção socioambiental implementando' },
    { lineNumber: 26, text: 'tecnologias de contentação e segurança. Essa medida visa proteger', errors: [{ term: 'Essa medida', correction: 'Para tal medida', type: 'cohesion', description: 'C4: Dica do Corretor - utilizar "Para tal, Por isso, Para tanto".' }] },
    { lineNumber: 27, text: 'as comunidades vizinhas e alinhar o progresso econômico à re-' },
    { lineNumber: 28, text: 'dução da vulnerabilidade de grupos marginalizados, revertendo' },
    { lineNumber: 29, text: 'o cenário de racismo ambiental e assegurando que o lucro não' },
    { lineNumber: 30, text: 'se sobreponha à vida.' }
  ],
  feedbackGeral: {
    pontosFortes: ['Domínio total do tema com linguagem sofisticada (C2 e C3 impecáveis).', 'Reflexão crítica aprofundada sobre as engrenagens de exploração socioeconômica.'],
    pontosFracos: ['C4: Repetição ou ausência dos mecanismos linguísticos recomendados para fluidez.', 'C1: Pequenos equívocos gramaticais/rasuras que subtraem nota máxima.'],
    dicaOuro: 'Crie o hábito de decorar uma "grelha" de Operadores Argumentativos, Conclusivos e de Adição e obrigue-se a utilizá-los sistematicamente no início de cada frase chave.'
  },
  checklist: [
    { label: 'C4: Estudar operadores de "Particularização de Raciocínio" (Nesse viés, Sob essa óptica)', checked: false },
    { label: 'C4: Memorizar Operadores Conclusivos (Logo, Destarte, Portanto) para fechar parágrafos', checked: false },
    { label: 'C4: Usar conectivos de Adição (Ademais, Outrossim) para iniciar o D2', checked: false },
    { label: 'C1: Higiene Textual - Cortar totalmente rasuras "() e ~~"', checked: false }
  ],
  dicasCorretor: [
    {
      competencia: 'Competência I',
      descricao: 'Demonstrar domínio da norma culta da língua escrita',
      dica: 'Dica do Corretor: excluir o acento'
    },
    {
      competencia: 'Competência IV',
      descricao: 'Demonstrar conhecimento dos mecanismos lingüísticos necessários para a construção da argumentação.',
      dica: 'Dica do Corretor: OPERADORES ARGUMENTATIVOS (AFIRMAÇÃO DO ARGUMENTO ANTERIOR) Empregá-los, de preferência, depois do repertório para apresentar argumentos relacionados ao repertório ou no início do 2º parágrafo para apresentar o primeiro tópico frasal) Efetivamente, ... Em verdade, ... Nessa perspectiva,... , de fato, (entre vírgulas)'
    },
    {
      competencia: 'Competência IV',
      descricao: 'Demonstrar conhecimento dos mecanismos lingüísticos necessários para a construção da argumentação.',
      dica: 'Dica do Corretor: OPERADORES CONCLUSIVOS Logo, Desse modo, Dessa forma, Portanto, Assim, Destarte ou Dessarte, (Empregá-los no final de cada parágrafo, ou seja, no último período do parágrafo, ou no começo do 4º parágrafo)'
    },
    {
      competencia: 'Competência I',
      descricao: 'Demonstrar domínio da norma culta da língua escrita',
      dica: 'Dica do Corretor: incluir o é'
    },
    {
      competencia: 'Competência IV',
      descricao: 'Demonstrar conhecimento dos mecanismos lingüísticos necessários para a construção da argumentação.',
      dica: 'Dica do Corretor: ADIÇÃO (função de adicionar a segunda causa ou consequência) Ademais, ... Além disso, ... Também, ... Outrossim, ...'
    },
    {
      competencia: 'Competência IV',
      descricao: 'Demonstrar conhecimento dos mecanismos lingüísticos necessários para a construção da argumentação.',
      dica: 'Dica do Corretor: OPERADORES ARGUMENTATIVOS (PARTICULARIZAÇÃO DE RACIOCÍNIO) Empregá-los, de preferência, entre períodos da introdução, do desenvolvimento ou no início do 2º parágrafo para apresentar o primeiro tópico frasal) Nesse ínterim,... Nesse contexto,... Nesse aspecto,.... Nesse sentido,.. Sob essa óptica, ... Sob esse viés, ... Acerca dessa lógica, ... Nessa conjuntura, .... Nesse âmbito, ..... Nesse prisma, ... Nesse tocante,...'
    },
    {
      competencia: 'Competência IV',
      descricao: 'Demonstrar conhecimento dos mecanismos lingüísticos necessários para a construção da argumentação.',
      dica: 'Dica do Corretor: OPERADORES CONCLUSIVOS Logo, Desse modo, Dessa forma, Portanto, Assim, Destarte ou Dessarte, (Empregá-los no final de cada parágrafo, ou seja, no último período do parágrafo, ou no começo do 4º parágrafo)'
    },
    {
      competencia: 'Competência IV',
      descricao: 'Demonstrar conhecimento dos mecanismos lingüísticos necessários para a construção da argumentação.',
      dica: 'Dica do Corretor: OUTROS De forma análoga, Partindo dessa análise, De maneira análoga à ficção, No que tange a esse infortúnio Para isso, Para tal, Por isso, Para tanto,'
    }
  ]
};

export const essay_2026_02_19: MateriaData = {
  ...criarTemplateVazio('Redação', 2026),
  id: 'red_920_racismo_p5',
  dataRealizacao: '2026-02-19',
  notaAtual: 920,
  meta: 900,
  gap: 0,
  tempo: '1h12',
  questoes: { total: 1, acertos: 1, erros: 0, taxa: 92 },
  detalhado: [
    { nivel: 'C1', faixa: 'Gramática', total: 200, acertos: 160, erros: 40, taxa: 80, cor: '#f3e600' },
    { nivel: 'C2', faixa: 'Tema', total: 200, acertos: 200, erros: 0, taxa: 100, cor: '#00ff9f' },
    { nivel: 'C3', faixa: 'Argumento', total: 200, acertos: 200, erros: 0, taxa: 100, cor: '#00ff9f' },
    { nivel: 'C4', faixa: 'Coesão', total: 200, acertos: 160, erros: 40, taxa: 80, cor: '#f3e600' },
    { nivel: 'C5', faixa: 'Proposta', total: 200, acertos: 200, erros: 0, taxa: 100, cor: '#00ff9f' },
  ],
  redacaoData: redacaoData
};
