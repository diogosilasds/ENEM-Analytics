import { MateriaData, RedacaoSpecificData } from '../../../types';
import { criarTemplateVazio } from '../../utils';

const redacaoData: RedacaoSpecificData = {
  temaSugrido: "Necessidade de valorizar a docência no Brasil",
  competencias: [
    { id: 'C1', nome: 'Norma Culta', nota: 160, meta: 200, descricao: 'Demonstrar domínio da norma culta da língua escrita. 6 erros identificados.' },
    { id: 'C2', nome: 'Tema/Estrutura', nota: 200, meta: 200, descricao: 'Compreender a proposta de redação e aplicar conceitos das várias áreas de conhecimento.' },
    { id: 'C3', nome: 'Argumentação', nota: 200, meta: 200, descricao: 'Selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos.' },
    { id: 'C4', nome: 'Coesão', nota: 200, meta: 200, descricao: 'Demonstrar conhecimento dos mecanismos linguísticos necessários para a construção da argumentação.' },
    { id: 'C5', nome: 'Intervenção', nota: 200, meta: 200, descricao: 'Elaborar proposta de intervenção para o problema abordado, respeitando os direitos humanos.' },
  ],
  paragraphStarts: [1, 6, 12, 18],
  textoTranscrito: [
    { lineNumber: 1, text: 'Segundo Immanuel Kant no livro "Sobre a Pedagogia", o homem é o' },
    { lineNumber: 2, text: 'que a educação faz dele. Contudo, a desvalorização da docência no Brasil,' },
    { lineNumber: 3, text: 'marcada por baixos salários e deslegitimação social, impede essa máxima.' },
    { lineNumber: 4, text: 'Esse cenário gera um desestímulo profissional que compromete o futuro' },
    { lineNumber: 5, text: 'intelectual do país.' },
    { lineNumber: 6, text: 'Primordialmente, a defasagem salarial afasta novos talentos da carreira.' },
    { lineNumber: 7, text: 'Isso ocorre porque o magistério brasileiro enfrenta uma (disputa) disparida-' },
    { lineNumber: 8, text: 'de financeira abismal em relação a outras nações. Segundo a OCDE, o', errors: [{ term: 'disparida-de', correction: 'divisão incorreta', type: 'grammar', description: 'C1: Dica do Corretor - divisão incorreta' }] },
    { lineNumber: 9, text: 'Brasil paga cerca de U$ 14.000 anuais, valor drasticamente inferior aos' },
    { lineNumber: 10, text: 'países desenvolvidos. Por conseguinte, a subvalorização econômica pre-' },
    { lineNumber: 11, text: 'cariza a subsistência dos professores e esvazia as licenciaturas.' },
    { lineNumber: 12, text: 'Ademais, a visão deturpada sobre a função escolar aprofunda o proble-' },
    { lineNumber: 13, text: 'ma cultural. Muitas famílias enxergam as escolas apenas como um de-' },
    { lineNumber: 14, text: 'pósito de crianças para liberar o tempo dos responsáveis. Quando a in-', errors: [{ term: 'in-', correction: 'ins-', type: 'grammar', description: 'C1: Dica do Corretor - instituição' }] },
    { lineNumber: 15, text: 'tituição perde seu caráter pedagógico, o docente é despojado de seu', errors: [{ term: 'tituição', correction: 'tituição', type: 'grammar', description: 'C1: Dica do Corretor - instituição' }] },
    { lineNumber: 16, text: 'prestígio e autoridade. Como resultado, o desrespeito em sala de aula' },
    { lineNumber: 17, text: 'torna-se rotineiro, minando a saúde mental dos profissionais.' },
    { lineNumber: 18, text: 'Portanto, a negligência cultural com o magistério exige uma mudança' },
    { lineNumber: 19, text: 'de postura coletiva. Cabe aos brasileiros, enquanto responsáveis e', errors: [{ term: ',', correction: 'vírgula', type: 'grammar', description: 'C1: Dica do Corretor - virgula' }] },
    { lineNumber: 20, text: 'cidadãos, reestabelecer a rede de apoio à escola através do diálogo', errors: [{ term: 'através do', correction: 'por meio do', type: 'grammar', description: 'C1: Dica do Corretor - por meio do' }] },
    { lineNumber: 21, text: 'respeitoso e da participação ativa na vida escolar, combatendo a', errors: [{ term: 'escolar,', correction: 'vírgula', type: 'grammar', description: 'C1: Dica do Corretor - virgula' }] },
    { lineNumber: 22, text: 'ideia de que a instituição serve apenas para liberar o tempo dos adultos.' },
    { lineNumber: 23, text: 'Essa mudança de mentalidade nos lares é o que devolverá ao docente' },
    { lineNumber: 24, text: 'sua autoridade e saúde mental. Afinal, ao valorizar quem ensina, a' },
    { lineNumber: 25, text: 'população permite que se cumpra a premissa de que o homem é o' },
    { lineNumber: 26, text: 'que a educação faz dele.', errors: [{ term: 'educação', correction: 'acento', type: 'grammar', description: 'C1: Dica do Corretor - acento' }] }
  ],
  feedbackGeral: {
    pontosFortes: ['Excelente domínio do tema e argumentação sólida.', 'Proposta de intervenção bem detalhada e conectada com a discussão.'],
    pontosFracos: ['Alguns desvios gramaticais (Competência I) impediram a nota máxima.', 'Atenção à divisão silábica e uso de expressões adequadas ("por meio do" em vez de "através do").'],
    dicaOuro: 'Revise o texto com atenção aos detalhes ortográficos e pontuação. Substitua "através de" (que indica travessia física) por "por meio de" quando indicar instrumento/meio.'
  },
  checklist: [
    { label: 'C1: Revisar regras de divisão silábica no final da linha', checked: false },
    { label: 'C1: Substituir "através de" por "por meio de" em contextos de instrumento', checked: false },
    { label: 'C1: Revisar uso de vírgulas em termos deslocados', checked: false }
  ],
  dicasCorretor: [
    {
      competencia: 'Competência I',
      descricao: 'Demonstrar domínio da norma culta da língua escrita',
      dica: 'Dica do Corretor: virgula'
    },
    {
      competencia: 'Competência I',
      descricao: 'Demonstrar domínio da norma culta da língua escrita',
      dica: 'Dica do Corretor: virgula'
    },
    {
      competencia: 'Competência I',
      descricao: 'Demonstrar domínio da norma culta da língua escrita',
      dica: 'Dica do Corretor: acento'
    },
    {
      competencia: 'Competência I',
      descricao: 'Demonstrar domínio da norma culta da língua escrita',
      dica: 'Dica do Corretor: divisão incorreta'
    },
    {
      competencia: 'Competência I',
      descricao: 'Demonstrar domínio da norma culta da língua escrita',
      dica: 'Dica do Corretor: instituição'
    },
    {
      competencia: 'Competência I',
      descricao: 'Demonstrar domínio da norma culta da língua escrita',
      dica: 'Dica do Corretor: por meio do'
    }
  ]
};

export const essay_2026_03_04: MateriaData = {
  ...criarTemplateVazio('Redação', 2026),
  id: 'red_960_docencia',
  dataRealizacao: '2026-03-04',
  notaAtual: 960,
  meta: 900,
  gap: 0,
  tempo: '1h05',
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
