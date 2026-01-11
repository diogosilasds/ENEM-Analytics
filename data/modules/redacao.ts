
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
    { id: 'C1', nome: 'Norma Culta', nota: 160, meta: 200, descricao: 'Erros de ortografia (dimenção, concendimento) e acentuação.' },
    { id: 'C2', nome: 'Tema/Estrutura', nota: 160, meta: 200, descricao: 'Compreensão do tema adequada, mas falta autoria.' },
    { id: 'C3', nome: 'Argumentação', nota: 120, meta: 200, descricao: 'Falta profundidade. Argumentos expostos mas não justificados (Por que faltam médicos?).' },
    { id: 'C4', nome: 'Coesão', nota: 160, meta: 200, descricao: 'Repetição excessiva da palavra "família".' },
    { id: 'C5', nome: 'Intervenção', nota: 160, meta: 200, descricao: 'Agente genérico ("todos nós") e falta de detalhamento.' },
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
  ]
};

// Criando um objeto MateriaData que inclui os dados específicos
const redacaoEntry: MateriaData = {
  ...criarTemplateVazio('Redação', 2026),
  id: 'red_760_mock',
  titulo: 'Redação',
  dataRealizacao: '2026-01-07',
  notaAtual: 760,
  meta: 900,
  gap: 140,
  tempo: '1h15',
  questoes: { total: 1, acertos: 0, erros: 0, taxa: 76 }, // Adaptado para %
  detalhado: [ // Adaptado para alimentar gráficos genéricos se necessário
    { nivel: 'C1', faixa: 'Gramática', total: 200, acertos: 160, erros: 40, taxa: 80, cor: '#f3e600' },
    { nivel: 'C2', faixa: 'Tema', total: 200, acertos: 160, erros: 40, taxa: 80, cor: '#f3e600' },
    { nivel: 'C3', faixa: 'Argumento', total: 200, acertos: 120, erros: 80, taxa: 60, cor: '#ff0055' },
    { nivel: 'C4', faixa: 'Coesão', total: 200, acertos: 160, erros: 40, taxa: 80, cor: '#f3e600' },
    { nivel: 'C5', faixa: 'Proposta', total: 200, acertos: 160, erros: 40, taxa: 80, cor: '#f3e600' },
  ],
  redacaoData: redacaoData760
};

export const historicoRedacao: Record<number, MateriaData[]> = {
  2026: [redacaoEntry]
};
