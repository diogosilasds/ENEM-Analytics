import { MateriaData, RedacaoSpecificData } from '../../../types';
import { criarTemplateVazio } from '../../utils';

const redacaoData: RedacaoSpecificData = {
  temaSugrido: "O papel da escola no fomento da educação ambiental no Brasil",
  competencias: [
    { id: 'C1', nome: 'Norma Culta', nota: 160, meta: 200, descricao: 'Demonstrar domínio da norma culta da língua escrita. 6 erros identificados.' },
    { id: 'C2', nome: 'Tema/Estrutura', nota: 40, meta: 200, descricao: 'Compreender a proposta de redação e aplicar conceitos das várias áreas de conhecimento. 2 erros identificados.' },
    { id: 'C3', nome: 'Argumentação', nota: 120, meta: 200, descricao: 'Selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos. 1 erro identificado.' },
    { id: 'C4', nome: 'Coesão', nota: 200, meta: 200, descricao: 'Demonstrar conhecimento dos mecanismos linguísticos necessários para a construção da argumentação. 0 erros.' },
    { id: 'C5', nome: 'Intervenção', nota: 200, meta: 200, descricao: 'Elaborar proposta de intervenção para o problema abordado, respeitando os direitos humanos. 0 erros.' },
  ],
  paragraphStarts: [1, 4, 10, 16],
  textoTranscrito: [
    { lineNumber: 1, text: 'O planeta Terra é o único local em que podemos viver. No Brasil,' },
    { lineNumber: 2, text: 'as escolas tem papel fundamental no ensino e conscientização da impor-', errors: [{ term: 'tem', correction: 'têm', type: 'grammar', description: 'C1: Atenção à acentuação gráfica' }, { term: 'conscientização', correction: 'conscientização', type: 'grammar', description: 'C1: Atente-se à grafia correta' }] },
    { lineNumber: 3, text: 'tância de preservar o planeta.' },
    { lineNumber: 4, text: 'A princípio, passamos boa parte da infância e adolescência den-' },
    { lineNumber: 5, text: 'tro das escolas. Ali, são desenvolvidas habilidades que serão usadas' },
    { lineNumber: 6, text: 'pelo resto da vida, e entre elas, a educação ambiental para preser-', errors: [{ term: 'vida, e', correction: 'vírgula', type: 'grammar', description: 'C1: Atenção ao uso da VÍRGULA' }] },
    { lineNumber: 7, text: 'var o planeta. Segundo o Correio Braziliense, mais de 67% da' },
    { lineNumber: 8, text: 'população votou que o "dever" de ensino cabe aos institutos edu-' },
    { lineNumber: 9, text: 'cacionais, 62% aos pais e responsáveis e 59% ao governo.' },
    { lineNumber: 10, text: 'Além disso, a degradação ambiental afeta a todos' },
    { lineNumber: 11, text: 'nós. Com o passar das décadas, mudanças climáticas se insumen-', errors: [{ term: 'nós.', correction: 'primeira pessoa plural', type: 'grammar', description: 'C1: Deve-se evitar o uso de primeira pessoa do plural (nós) neste gênero textual' }] },
    { lineNumber: 12, text: 'tam, afetando a agronomia e bem estar populacional; descarte e má' },
    { lineNumber: 13, text: 'gestão de resíduos afetam a fauna e flora do planeta. Sendo' },
    { lineNumber: 14, text: 'assim, é indispensável o cuidado e ensino desde a infância sobre' },
    { lineNumber: 15, text: 'o meio ambiente.' },
    { lineNumber: 16, text: 'Portanto, esse tema é indispensável nas instituições docentes. Os' },
    { lineNumber: 17, text: 'gestores e diretores de escolas poderiam desenvolver atividades de' },
    { lineNumber: 18, text: 'preservação ambiental que os alunos possam participar para' },
    { lineNumber: 19, text: 'criar habilidades e compreensão de como agir em contextos' },
    { lineNumber: 20, text: 'diversos. Dessa forma, surgirão pessoas capacitadas para li-' },
    { lineNumber: 21, text: 'dar com os futuros desafios da preservação ambiental.' }
  ],
  feedbackGeral: {
    pontosFortes: ['Proposta de intervenção nota máxima.', 'Excelente uso de mecanismos coesivos.'],
    pontosFracos: ['Falta de estrutura adequada na introdução.', 'Ausência de uma tese bem definida e defendida.', 'Problemas com concordância e uso indevido da 1ª pessoa do plural.'],
    dicaOuro: 'Apresente sua tese na introdução e a defenda na argumentação. A introdução deve ter: Apresentação do tema + Repertório + Tese (com 2 argumentos) + Conclusão do parágrafo.'
  },
  checklist: [
    { label: 'C2: Estruturar a introdução com Tese clara', checked: false },
    { label: 'C2: Inserir repertórios socioculturais válidos', checked: false },
    { label: 'C3: Defender a Tese ao longo da argumentação', checked: false },
    { label: 'C1: Revisar regras de acentuação e retirar uso de 1ª pessoa', checked: false }
  ],
  dicasCorretor: [
    { competencia: 'Competência I', descricao: 'Norma Culta', dica: 'Deve-se evitar o uso de primeira pessoa do plural (nós) neste gênero textual.' },
    { competencia: 'Competência I', descricao: 'Norma Culta', dica: 'Atente-se à grafia correta: conscientização.' },
    { competencia: 'Competência I', descricao: 'Norma Culta', dica: 'Atenção ao uso da VÍRGULA.' },
    { competencia: 'Competência I', descricao: 'Norma Culta', dica: 'Atenção à acentuação gráfica.' },
    { competencia: 'Competência II', descricao: 'Tema/Estrutura', dica: 'Introdução sem estrutura. Siga a estrutura do 1º parágrafo: Mínimo 5 linhas. Deve conter: Apresentação do tema + Repertório + Tese + Conclusão' },
    { competencia: 'Competência II', descricao: 'Tema/Estrutura', dica: 'SELECIONE REPERTÓRIOS PARA APRESENTAR NO SEU TEXTO.' },
    { competencia: 'Competência III', descricao: 'Argumentação', dica: 'Sua argumentação deve defender sua tese, mas se não há tese, não há o que defender.' }
  ]
};

export const essay_2026_04_15: MateriaData = {
  ...criarTemplateVazio('Redação', 2026),
  id: 'red_720_educacao_ambiental',
  dataRealizacao: '2026-04-15',
  notaAtual: 720,
  meta: 900,
  gap: 180,
  tempo: 'N/A',
  questoes: { total: 1, acertos: 1, erros: 0, taxa: 72 },
  detalhado: [
    { nivel: 'C1', faixa: 'Gramática', total: 200, acertos: 160, erros: 40, taxa: 80, cor: '#00ff9f' },
    { nivel: 'C2', faixa: 'Tema', total: 200, acertos: 40, erros: 160, taxa: 20, cor: '#ff0055' },
    { nivel: 'C3', faixa: 'Argumento', total: 200, acertos: 120, erros: 80, taxa: 60, cor: '#ff0055' },
    { nivel: 'C4', faixa: 'Coesão', total: 200, acertos: 200, erros: 0, taxa: 100, cor: '#00ff9f' },
    { nivel: 'C5', faixa: 'Proposta', total: 200, acertos: 200, erros: 0, taxa: 100, cor: '#00ff9f' },
  ],
  redacaoData: redacaoData
};
