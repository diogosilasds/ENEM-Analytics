
import { MateriaData, RedacaoSpecificData } from '../../../types';
import { criarTemplateVazio } from '../../utils';

const redacaoData: RedacaoSpecificData = {
  temaSugrido: "Proposta 3 - Caminhos para combater o crescimento da obesidade no Brasil",
  competencias: [
    { id: 'C1', nome: 'Norma Culta', nota: 120, meta: 200, descricao: '8 erros graves de ortografia (conscientes, profissionais) e acentuação (acúmulo, dependência).' },
    { id: 'C2', nome: 'Tema/Estrutura', nota: 160, meta: 200, descricao: 'Bom repertório (Bauman), mas transição para a biologia ficou abrupta.' },
    { id: 'C3', nome: 'Argumentação', nota: 200, meta: 200, descricao: 'Excelente uso de conceitos biológicos (insulina, microbiota) para fundamentar a tese.' },
    { id: 'C4', nome: 'Coesão', nota: 160, meta: 200, descricao: 'Falta de conectivo interparágrafo no início do Desenvolvimento 1.' },
    { id: 'C5', nome: 'Intervenção', nota: 200, meta: 200, descricao: 'Proposta completa com os 5 elementos bem articulados.' },
  ],
  paragraphStarts: [1, 5, 10, 16],
  textoTranscrito: [
    { lineNumber: 1, text: 'Segundo o conceito de Modernidade Líquido de Zygmunt Bauman, a busca' },
    { lineNumber: 2, text: 'pelo prazer imediato sobrepõe-se ao cuidado estrutural sobre o corpo. No Bra-' },
    { lineNumber: 3, text: 'sil, a obesidade é um problema grave impulsionado pelo desregulação do ciclo' },
    { lineNumber: 4, text: 'circadiano e pela negligencia do eixo intestino-cérebro.', errors: [{ term: 'negligencia', correction: 'negligência', type: 'grammar', description: 'Acentuação: Paroxítona terminada em ditongo.' }] },
    { lineNumber: 5, text: 'A desregulação do ciclo circadiano é um gatilho biológico para o acumulo', errors: [{ term: 'acumulo', correction: 'acúmulo', type: 'grammar', description: 'Acentuação: Proparoxítona.' }, { term: 'A desregulação', correction: 'Nesse viés, a...', type: 'cohesion', description: 'Falta de conectivo interparágrafo.' }] },
    { lineNumber: 6, text: 'de gordura. Isso ocorre porque os hormônios de saciedade são desregulados com' },
    { lineNumber: 7, text: 'o sono irregular. Dados do Sistemas Único de Saúde (SUS) confirmam que o', errors: [{ term: 'Sistemas', correction: 'Sistema', type: 'grammar', description: 'Concordância Nominal.' }] },
    { lineNumber: 8, text: 'repouso inadequadro eleva a resistência a insulina e o estresse metabólico. Logo,' },
    { lineNumber: 9, text: 'o desajuste do relógio biológico impede a manutenção de um peso saudável.' },
    { lineNumber: 10, text: 'Ademais, a falha no eixo intestino-cérebro consolida um ciclo vicioso de' },
    { lineNumber: 11, text: 'má alimentação. Uma microbiata desequilibrado por ultraprocessados envia si-' },
    { lineNumber: 12, text: 'nais ao sistema nervoso que sabotam a saúde mental e disciplina alimentar. No' },
    { lineNumber: 13, text: 'cotidiano brasileiro, a dependencia de produtos industriais gera (uma) um eco-', errors: [{ term: 'dependencia', correction: 'dependência', type: 'grammar', description: 'Acentuação obrigatória.' }] },
    { lineNumber: 14, text: 'sistema interno que dificulta escolhas concientes. Assim, a má nutrição', errors: [{ term: 'concientes', correction: 'conscientes', type: 'grammar', description: 'Ortografia: SC (derivado de conscientia).' }] },
    { lineNumber: 15, text: 'compromete a capacidade cognitiva de manter o bem-estar corporal.' },
    { lineNumber: 16, text: 'Portanto, combater a obesidade exige combater os desajustes da má nutrição.' },
    { lineNumber: 17, text: 'Nutricionistas, proficionais de educação física e o Ministério da Saúde de-', errors: [{ term: 'proficionais', correction: 'profissionais', type: 'grammar', description: 'Ortografia: SS (derivado de profissão).' }] },
    { lineNumber: 18, text: 'vem promover a conscientização por meio de campanhas digitais focados no' },
    { lineNumber: 19, text: 'equilíbrio corporal. Essa ação visa os benefícios do sono e da alimentação' },
    { lineNumber: 20, text: 'para a regulação da microbiota e do peso. Tal medida resultaria na superação' },
    { lineNumber: 21, text: 'da liquidez dos hábitos nocivos citada por Bauman.', errors: [{ term: 'citada', correction: 'citada (?)', type: 'cohesion', description: 'Ambiguidade de referência (liquidez vs hábitos).' }] }
  ],
  feedbackGeral: {
    pontosFortes: ['Argumentação científica robusta (C3: 200pts).', 'Proposta de intervenção completa e detalhada (C5: 200pts).'],
    pontosFracos: ['Gramática e Ortografia (C1: 120pts) - muitos erros básicos.', 'Coesão (C4) - Falta de conectivo no D1.'],
    dicaOuro: 'Faça uma revisão final focada APENAS na forma das palavras (acentos, SS, SC), ignorando o conteúdo.'
  },
  checklist: [
    { label: 'C1: Acentuar paroxítonas (negligência, dependência)', checked: false },
    { label: 'C1: Corrigir ortografia de SC/SS (conscientes, profissionais)', checked: false },
    { label: 'C4: Inserir conectivo no início do Desenvolvimento 1', checked: false },
    { label: 'C2: Melhorar transição entre Bauman e Biologia', checked: false }
  ],
  manualConstrucao: {
    titulo: "Guia: O Texto Científico-Argumentativo",
    passos: [
      {
        titulo: "TESE BIOLÓGICA",
        descricao: "Apresente o mecanismo fisiológico do problema. Ex: 'A desregulação do ciclo circadiano altera hormônios...'."
      },
      {
        titulo: "CONEXÃO SOCIAL",
        descricao: "Ligue a biologia ao comportamento. Ex: 'No cotidiano, isso se reflete em...'"
      },
      {
        titulo: "CONSEQUÊNCIA LÓGICA",
        descricao: "Feche o parágrafo provando o impacto na saúde pública."
      }
    ],
    dicasGramaticais: "Regra do SC: palavras vindas de 'conscientia' (consciente). Regra do SS: 'profissão' vem de 'professar'. Atenção às paroxítonas terminadas em ditongo (levam acento).",
    vocabularioJuizo: [
      "circadiano", "microbiota", "metabólico", "insulina", "cognitiva",
      "sabotam", "negligência", "gatilho", "consolidar", "nocivos"
    ],
    notaFinal: "Nota 840. Conteúdo de elite (960+), forma de base (C1 derrubou a nota). Potencial imenso com revisão gramatical."
  },
  reescrita: {
    intro: "Sua argumentação é excelente, mas a gramática básica está custando 80 pontos. Abaixo, a correção dos erros ortográficos mais graves.",
    exemplos: [
      {
        titulo: "1. Ortografia (SC vs C)",
        problema: "Erro de grafia em palavra comum.",
        comoMelhorar: "Memorizar a raiz latina ou substituir por sinônimo.",
        original: "...dificulta escolhas concientes.",
        corrigido: "...dificulta escolhas **conscientes**.",
        explicacao: "Consciente deriva de consciência (SC)."
      },
      {
        titulo: "2. Ortografia (C vs SS)",
        problema: "Erro na escrita de profissão.",
        comoMelhorar: "Atenção à raiz da palavra.",
        original: "Nutricionistas, proficionais de educação...",
        corrigido: "Nutricionistas, **profissionais** de educação...",
        explicacao: "Profissional vem de profissão (SS)."
      }
    ]
  }
};

export const essay_2026_01_22: MateriaData = {
  ...criarTemplateVazio('Redação', 2026),
  id: 'red_840_bio',
  dataRealizacao: '2026-01-22',
  notaAtual: 840,
  meta: 900,
  gap: 60,
  tempo: '1h10',
  questoes: { total: 1, acertos: 0, erros: 0, taxa: 84 },
  detalhado: [
    { nivel: 'C1', faixa: 'Gramática', total: 200, acertos: 120, erros: 80, taxa: 60, cor: '#ff0055' },
    { nivel: 'C2', faixa: 'Tema', total: 200, acertos: 160, erros: 40, taxa: 80, cor: '#f3e600' },
    { nivel: 'C3', faixa: 'Argumento', total: 200, acertos: 200, erros: 0, taxa: 100, cor: '#00ff9f' },
    { nivel: 'C4', faixa: 'Coesão', total: 200, acertos: 160, erros: 40, taxa: 80, cor: '#f3e600' },
    { nivel: 'C5', faixa: 'Proposta', total: 200, acertos: 200, erros: 0, taxa: 100, cor: '#00ff9f' },
  ],
  redacaoData: redacaoData
};
