import { MateriaData, RedacaoSpecificData } from '../../../types';
import { criarTemplateVazio } from '../../utils';

const redacaoData: RedacaoSpecificData = {
  temaSugrido: "Consequências da persistência dos casos de gravidez precoce no Brasil",
  competencias: [
    { id: 'C1', nome: 'Norma Culta', nota: 120, meta: 200, descricao: 'Demonstrar domínio da norma culta da língua escrita. 7 erros identificados.' },
    { id: 'C2', nome: 'Tema/Estrutura', nota: 200, meta: 200, descricao: 'Compreender a proposta de redação e aplicar conceitos das várias áreas de conhecimento.' },
    { id: 'C3', nome: 'Argumentação', nota: 200, meta: 200, descricao: 'Selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos.' },
    { id: 'C4', nome: 'Coesão', nota: 200, meta: 200, descricao: 'Demonstrar conhecimento dos mecanismos linguísticos necessários para a construção da argumentação.' },
    { id: 'C5', nome: 'Intervenção', nota: 200, meta: 200, descricao: 'Elaborar proposta de intervenção para o problema abordado, respeitando os direitos humanos.' },
  ],
  paragraphStarts: [1, 7, 12, 19],
  textoTranscrito: [
    { lineNumber: 1, text: 'Na obra "Capitães da Areia", Jorge Amado ilustra jovens à margem da' },
    { lineNumber: 2, text: 'sociedade, realidade que ecoa nos atuais índices de gravidez precoce no Bra-' },
    { lineNumber: 3, text: 'sil. Essa realidade configura em um entrave ao progresso nacional, deriva-' },
    { lineNumber: 4, text: 'do da precariedade socioeconômica e da defasagem educacional. Essa con-' },
    { lineNumber: 5, text: 'juntura é uma barreira que impede adolescentes de alcansarem seu pleno', errors: [{ term: 'alcansarem', correction: 'alcançarem', type: 'grammar', description: 'C1: Dica do Corretor - alcançarem' }] },
    { lineNumber: 6, text: 'potencial.' },
    { lineNumber: 7, text: 'Primordialmente, a gestação na juventude impõe um ciclo de pobreza in-' },
    { lineNumber: 8, text: 'tergeracional que limita o futuro dos envolvidos. Isso ocorre porque o nasci-' },
    { lineNumber: 9, text: 'mento de um filho exige responsabilidades que o (ab) adolescente raramente,' },
    { lineNumber: 10, text: 'para não dizer nulas, consegue assumir. Segundo o Data SUS, o Brasil', errors: [{ term: 'nulas,', correction: 'vírgula', type: 'grammar', description: 'C1: Dica do Corretor - virgula' }] },
    { lineNumber: 11, text: 'registrou mais de 300 mil partos nessa faixa etária (15-19 anos) em 2023.' },
    { lineNumber: 12, text: 'Ademais, a ausência de uma educação sexual agrava a situação. Esse ce-' },
    { lineNumber: 13, text: 'nário perdura em famílias vulneráveis, preocupadas com a subsistência,', errors: [{ term: 'subsistência,', correction: 'vírgula', type: 'grammar', description: 'C1: Dica do Corretor - virgula' }] },
    { lineNumber: 14, text: 'carecem de acesso a informações preventivas. A disparidade regional, onde', errors: [{ term: 'carecem', correction: 'carecem', type: 'grammar', description: 'C1: Dica do Corretor - carecem' }] },
    { lineNumber: 15, text: 'o norte supera o sudeste em casos de fecundidade, demonstra que a falta' },
    { lineNumber: 16, text: 'de suporte estatal deturpa o desenvolvimento pleno da juventude. Dessa' },
    { lineNumber: 17, text: 'forma, a ineficiência governamental garante que o probela se torne crô-' },
    { lineNumber: 18, text: 'nico.' },
    { lineNumber: 19, text: 'Portanto, cabe aos Ministérios da Educação e da Saúde a execução de pro-', errors: [{ term: 'Portanto,', correction: 'vírgula', type: 'grammar', description: 'C1: Dica do Corretor - virgula' }] },
    { lineNumber: 20, text: 'gramas integrados de orientação reprodutiva e suporte socioeducativo' },
    { lineNumber: 21, text: 'em escolas e postos de saúde. Essa medida é para converter a carência de o-', errors: [{ term: 'o-', correction: 'translineação', type: 'grammar', description: 'C1: Dica do Corretor - TRNASLINEAÇÃO' }] },
    { lineNumber: 22, text: 'portunidades em horizonte de autonomia financeira e pleno desenvol-' },
    { lineNumber: 23, text: 'vimento intelectual. Como resultado, retira a juventude descrita por' },
    { lineNumber: 24, text: 'Jorge Amado, permitindo que a (premissa) premissa de liberdade e dig-', errors: [{ term: 'Amado,', correction: 'vírgula', type: 'grammar', description: 'C1: Dica do Corretor - vvirgula' }] },
    { lineNumber: 25, text: 'nidade substitua a persistência de um cenário social falho.' }
  ],
  feedbackGeral: {
    pontosFortes: ['Repertório sociocultural muito bem articulado com o tema.', 'Proposta de intervenção completa e detalhada.'],
    pontosFracos: ['Muitos desvios gramaticais e de pontuação (Competência I).', 'Atenção à ortografia, translineação e uso de vírgulas.'],
    dicaOuro: 'Revise o texto com atenção especial à pontuação (vírgulas) e à ortografia de palavras comuns. Cuidado com a separação silábica no final das linhas.'
  },
  checklist: [
    { label: 'C1: Revisar regras de uso da vírgula', checked: false },
    { label: 'C1: Atenção à ortografia (ex: alcançarem)', checked: false },
    { label: 'C1: Cuidado com a translineação', checked: false }
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
      dica: 'Dica do Corretor: alcançarem'
    },
    {
      competencia: 'Competência I',
      descricao: 'Demonstrar domínio da norma culta da língua escrita',
      dica: 'Dica do Corretor: virgula'
    },
    {
      competencia: 'Competência I',
      descricao: 'Demonstrar domínio da norma culta da língua escrita',
      dica: 'Dica do Corretor: vvirgula'
    },
    {
      competencia: 'Competência I',
      descricao: 'Demonstrar domínio da norma culta da língua escrita',
      dica: 'Dica do Corretor: carecem'
    },
    {
      competencia: 'Competência I',
      descricao: 'Demonstrar domínio da norma culta da língua escrita',
      dica: 'Dica do Corretor: TRNASLINEAÇÃO'
    },
    {
      competencia: 'Competência I',
      descricao: 'Demonstrar domínio da norma culta da língua escrita',
      dica: 'Dica do Corretor: virgula'
    }
  ]
};

export const essay_2026_03_12: MateriaData = {
  ...criarTemplateVazio('Redação', 2026),
  id: 'red_920_gravidez_precoce',
  dataRealizacao: '2026-03-12',
  notaAtual: 920,
  meta: 900,
  gap: 0,
  tempo: '1h10',
  questoes: { total: 1, acertos: 1, erros: 0, taxa: 92 },
  detalhado: [
    { nivel: 'C1', faixa: 'Gramática', total: 200, acertos: 120, erros: 80, taxa: 60, cor: '#ff0055' },
    { nivel: 'C2', faixa: 'Tema', total: 200, acertos: 200, erros: 0, taxa: 100, cor: '#00ff9f' },
    { nivel: 'C3', faixa: 'Argumento', total: 200, acertos: 200, erros: 0, taxa: 100, cor: '#00ff9f' },
    { nivel: 'C4', faixa: 'Coesão', total: 200, acertos: 200, erros: 0, taxa: 100, cor: '#00ff9f' },
    { nivel: 'C5', faixa: 'Proposta', total: 200, acertos: 200, erros: 0, taxa: 100, cor: '#00ff9f' },
  ],
  redacaoData: redacaoData
};
