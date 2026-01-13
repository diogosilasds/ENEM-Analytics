
import { MateriaData, RedacaoSpecificData } from '../../types';
import { criarTemplateVazio } from '../utils';
import { SUBJECTS_DB } from '../db/subjects';

export const metadataRedacao = {
  id: SUBJECTS_DB.redacao.id,
  title: SUBJECTS_DB.redacao.title,
  shortName: SUBJECTS_DB.redacao.shortName,
  color: SUBJECTS_DB.redacao.color
};

// Dados Mockados da Redação 760
const redacaoData760: RedacaoSpecificData = {
  temaSugrido: "Proposta 01 - Doação de órgãos: um gesto nobre a ser incentivado no país",
  competencias: [
    { id: 'C1', nome: 'Norma Culta', nota: 160, meta: 160, descricao: 'Erros de ortografia (dimenção, concendimento) e acentuação.' },
    { id: 'C2', nome: 'Tema/Estrutura', nota: 160, meta: 160, descricao: 'Compreensão do tema adequada, mas falta autoria.' },
    { id: 'C3', nome: 'Argumentação', nota: 120, meta: 160, descricao: 'Falta profundidade. Argumentos expostos mas não justificados (Por que faltam médicos?).' },
    { id: 'C4', nome: 'Coesão', nota: 160, meta: 160, descricao: 'Repetição excessiva da palavra "família".' },
    { id: 'C5', nome: 'Intervenção', nota: 160, meta: 160, descricao: 'Agente genérico ("todos nós") e falta de detalhamento.' },
  ],
  textoTranscrito: [
    { lineNumber: 1, text: 'No anime "Angel Beats!", o protagonista, após sua morte e em um plano espiritu-' },
    { lineNumber: 2, text: 'al, encontra a garota que teve seu coração doado e ouve dela o agradecimento por' },
    { lineNumber: 3, text: 'ter permitido que ela continuasse vivendo, evidenciando como a doação de órgãos' },
    { lineNumber: 4, text: 'transcende a dimensão médica e alcança profundas conexões humanas. Essa', errors: [{ term: 'dimenção', correction: 'dimensão', type: 'grammar', description: 'Erro ortográfico: grafia com "ç".' }] },
    { lineNumber: 5, text: 'narrativa ilustra uma realidade que precisa ser amplamente compreendida na' },
    { lineNumber: 6, text: 'sociedade brasileira: milhares de pessoas aguardam o transplante que pode represen-' },
    { lineNumber: 7, text: 'tar a diferença entre a vida e a morte.' },
    { lineNumber: 8, text: 'Muitas famílias desconhecem o procedimento de doação ou nutrem receios' },
    { lineNumber: 9, text: '(difundidos) infundados sobre o tema, o que resulta em recusas frequentes mes-' },
    { lineNumber: 10, text: 'mo quando o falecido quer ser doador. Além disso, crenças religiosas e ta-' },
    { lineNumber: 11, text: 'bus (sobre morte impedem) culturais impedem que conversas sobre morte e' },
    { lineNumber: 12, text: 'doação aconteça em ambiente familiar. Consequentemente, pacientes que' },
    { lineNumber: 13, text: 'poderiam ter suas vidas salvas permanecem em longas filas de espera, enquanto' },
    { lineNumber: 14, text: 'órgãos que poderiam ser transplantados são desperdiçados por falta de auto-' },
    { lineNumber: 15, text: 'rização familiar.' },
    { lineNumber: 16, text: 'Outro fator agravante reside na insuficiência de profissionais da saúde em', errors: [{ term: 'insuficiência', correction: 'Argumento Raso', type: 'structure', description: 'C3: Afirmação sem argumentação profunda (Por que há insuficiência?).' }] },
    { lineNumber: 17, text: 'identificar potenciais doadores e conduzir o diálogo com as famílias.(Por)' },
    { lineNumber: 18, text: 'Hospitais brasileiros frequentemente carecem de equipes especializadas em' },
    { lineNumber: 19, text: 'captação (e doação) de órgãos. Dessa forma, mesmo quando á concendimento', errors: [{ term: 'á', correction: 'há/o', type: 'grammar', description: 'Crase indevida.' }, { term: 'concendimento', correction: 'consentimento', type: 'grammar', description: 'Erro ortográfico grave.' }] },
    { lineNumber: 20, text: 'familiar, problemas familiares podem invalidar transplantes que (salvam)' },
    { lineNumber: 21, text: 'salvariam vidas.' },
    { lineNumber: 22, text: 'Portanto, para que o gesto de generosidade em (Este) "Angel Beats!" saia da' },
    { lineNumber: 23, text: 'ficção e se torne regra no Brasil, todos nós devemos atuar como agen-', errors: [{ term: 'todos nós', correction: 'Ministério da Saúde', type: 'intervention', description: 'C5: Agente nulo/genérico.' }] },
    { lineNumber: 24, text: 'tes multiplicadores, divulgando a importância da doação de órgãos e di-' },
    { lineNumber: 25, text: 'alogando abertamente com nossos familiares e amigos sobre esse de-' },
    { lineNumber: 26, text: 'sejo. Essa concientização coletiva é a que permitirá superar tabus e ga-', errors: [{ term: 'concientização', correction: 'conscientização', type: 'grammar', description: 'Erro ortográfico: falta do "s".' }] },
    { lineNumber: 27, text: 'rantir que a vida perpetue além da perda.' }
  ],
  feedbackGeral: {
    pontosFortes: [
      'Domínio da estrutura dissertativa padrão.',
      'Uso criativo de repertório pop (Angel Beats!).',
      'Boa transição entre parágrafos.'
    ],
    pontosFracos: [
      'C3 (Argumentação): Falta de aprofundamento nas causas.',
      'C1 (Gramática): Erros de ortografia básica (S/SS/C/Ç).',
      'C4 (Coesão): Repetição excessiva da palavra "família".'
    ],
    dicaOuro: 'AFIRMAÇÃO (Ideia) ➔ ARGUMENTAÇÃO (Por quê?) ➔ GARANTIA (Exemplo/Dado) ➔ FECHAMENTO'
  },
  checklist: [
    { label: 'Estudar regras de ortografia (S, SS, C, Ç)', checked: false },
    { label: 'Reescrever desenvolvimentos usando conectivos explicativos', checked: false },
    { label: 'Criar lista de sinônimos para "família"', checked: false },
    { label: 'Definir agente institucional na próxima proposta', checked: false }
  ],
  manualConstrucao: {
    titulo: "Estrutura de construção dos parágrafos de desenvolvimento",
    passos: [
      {
        titulo: "AFIRMAÇÃO (IDEIA)",
        descricao: "Consiste na ampliação do argumento expresso na introdução mediante um tópico frasal que iniciará o parágrafo, constituindo um núcleo de ideia a ser justificado logo em seguida."
      },
      {
        titulo: "ARGUMENTAÇÃO (EXPLICAÇÃO/JUSTIFICATIVA)",
        descricao: "Consiste em dar explicações sobre o tópico frasal do início do parágrafo. Nesse ponto, é preciso fundamentar o argumento por meio de bases, como a jurídica, filosófica ou científica, bem como acrescentar repertório que eleve a ideia do texto. Trata-se da parte mais extensa do parágrafo, pois requer clareza, aprofundamento, crítica e reflexão."
      },
      {
        titulo: "GARANTIA",
        descricao: "Consiste em validar a ideia e o argumento mediante a apresentação de provas, dados, exemplos, comparações, alusões históricas ou demais recursos textuais característicos de comprovação."
      },
      {
        titulo: "FECHAMENTO",
        descricao: "Frase de encerramento do parágrafo que resgata a ideia inicial e contextualiza todas as informações, constituindo um circuito fechado para o texto."
      }
    ],
    dicasGramaticais: "Para desenvolver a argumentação ao longo do texto, algumas estruturas gramaticais podem ser usadas: apostos explicativos, orações explicativas, conjunções explicativas e exemplos. Ao construir seus argumentos, busque concretude nas suas ideias. Traga, para a argumentação, exemplos, porquês, localização espaço-temporal. Escreva suas ideias da forma mais completa possível, explique o que você quer dizer, a fim de que isso fique plenamente claro para o corretor.",
    vocabularioJuizo: [
      "abismo", "adverso", "banalizado", "consolidado", "danoso", 
      "destrutivo", "enfraquecido", "exemplar", "impõe", "impossibilita", 
      "imprudente", "instável", "irresignado", "mazela", "nocivo", 
      "opressão", "orientar", "precoce", "preocupante", "razoável", 
      "retrógrado", "retrocesso", "subserviente", "vulnerável"
    ],
    notaFinal: "É importante ressaltar que o contexto em que essas palavras são empregadas também está relacionado à construção do juízo de valor e da clareza de uma opinião crítica."
  }
};

// Criando um objeto MateriaData que inclui os dados específicos
const redacaoEntry: MateriaData = {
  ...criarTemplateVazio('Redação', 2026),
  id: 'red_760_mock',
  titulo: 'Redação',
  dataRealizacao: '2026-01-07',
  notaAtual: 760,
  meta: 800,
  gap: 40,
  tempo: '1h15',
  questoes: { total: 1, acertos: 0, erros: 0, taxa: 76 }, // Adaptado para %
  detalhado: [ // Adaptado para alimentar gráficos genéricos se necessário
    { nivel: 'C1', faixa: 'Gramática', total: 160, acertos: 160, erros: 0, taxa: 100, cor: '#00ff9f' },
    { nivel: 'C2', faixa: 'Tema', total: 160, acertos: 160, erros: 0, taxa: 100, cor: '#00ff9f' },
    { nivel: 'C3', faixa: 'Argumento', total: 160, acertos: 120, erros: 40, taxa: 75, cor: '#f3e600' },
    { nivel: 'C4', faixa: 'Coesão', total: 160, acertos: 160, erros: 0, taxa: 100, cor: '#00ff9f' },
    { nivel: 'C5', faixa: 'Proposta', total: 160, acertos: 160, erros: 0, taxa: 100, cor: '#00ff9f' },
  ],
  redacaoData: redacaoData760
};

export const historicoRedacao: Record<number, MateriaData[]> = {
  2026: [redacaoEntry]
};
