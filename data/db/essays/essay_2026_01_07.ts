import { MateriaData, RedacaoSpecificData } from '../../../types';
import { criarTemplateVazio } from '../../utils';

const redacaoData: RedacaoSpecificData = {
  temaSugrido: "Proposta 01 - Doação de órgãos: um gesto nobre a ser incentivado no país",
  competencias: [
    { id: 'C1', nome: 'Norma Culta', nota: 160, meta: 160, descricao: 'Erros de ortografia (dimenção, concendimento) e acentuação.' },
    { id: 'C2', nome: 'Tema/Estrutura', nota: 160, meta: 160, descricao: 'Compreensão do tema adequada, mas falta autoria.' },
    { id: 'C3', nome: 'Argumentação', nota: 120, meta: 160, descricao: 'Falta profundidade. Argumentos expostos mas não justificados.' },
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
    { lineNumber: 9, text: 'infundados sobre o tema, o que resulta em recusas frequentes mes-' },
    { lineNumber: 10, text: 'mo quando o falecido quer ser doador. Além disso, crenças religiosas e ta-' },
    { lineNumber: 11, text: 'bus culturais impedem que conversas sobre morte e' },
    { lineNumber: 12, text: 'doação aconteça em ambiente familiar. Consequentemente, pacientes que' },
    { lineNumber: 13, text: 'poderiam ter suas vidas salvas permanecem em longas filas de espera, enquanto' },
    { lineNumber: 14, text: 'órgãos que poderiam ser transplantados são desperdiçados por falta de auto-' },
    { lineNumber: 15, text: 'rização familiar.' },
    { lineNumber: 16, text: 'Outro fator agravante reside na insuficiência de profissionais da saúde em', errors: [{ term: 'insuficiência', correction: 'Argumento Raso', type: 'structure', description: 'C3: Afirmação sem argumentação profunda (Por que há insuficiência?).' }] },
    { lineNumber: 17, text: 'identificar potenciais doadores e conduzir o diálogo com as famílias.' },
    { lineNumber: 18, text: 'Hospitais brasileiros frequentemente carecem de equipes especializadas em' },
    { lineNumber: 19, text: 'captação de órgãos. Dessa forma, mesmo quando á concendimento', errors: [{ term: 'á', correction: 'há/o', type: 'grammar', description: 'Crase indevida.' }, { term: 'concendimento', correction: 'consentimento', type: 'grammar', description: 'Erro ortográfico grave.' }] },
    { lineNumber: 20, text: 'familiar, problemas familiares podem invalidar transplantes que' },
    { lineNumber: 21, text: 'salvariam vidas.' },
    { lineNumber: 22, text: 'Portanto, para que o gesto de generosidade em "Angel Beats!" saia da' },
    { lineNumber: 23, text: 'ficção e se torne regra no Brasil, todos nós devemos atuar como agen-', errors: [{ term: 'todos nós', correction: 'Ministério da Saúde', type: 'intervention', description: 'C5: Agente nulo/genérico.' }] },
    { lineNumber: 24, text: 'tes multiplicadores, divulgando a importância da doação de órgãos e di-' },
    { lineNumber: 25, text: 'alogando abertamente com nossos familiares e amigos sobre esse de-' },
    { lineNumber: 26, text: 'sejo. Essa concientização coletiva é a que permitirá superar tabus e ga-', errors: [{ term: 'concientização', correction: 'conscientização', type: 'grammar', description: 'Erro ortográfico: falta do "s".' }] },
    { lineNumber: 27, text: 'rantir que a vida perpetue além da perda.' }
  ],
  feedbackGeral: {
    pontosFortes: ['Domínio da estrutura dissertativa padrão.', 'Uso criativo de repertório pop.'],
    pontosFracos: ['C3 (Argumentação): Falta de aprofundamento.', 'C1 (Gramática): Erros de ortografia básica.'],
    dicaOuro: 'AFIRMAÇÃO (Ideia) ➔ ARGUMENTAÇÃO (Por quê?) ➔ GARANTIA (Exemplo/Dado) ➔ FECHAMENTO'
  },
  checklist: [
    { label: 'C1: Corrigir ortografia de sufixos (Dimensão, Conscientização)', checked: false },
    { label: 'C3: Aprofundar a causa da "insuficiência profissional" (Por que ocorre?)', checked: false },
    { label: 'C4: Substituir repetições de "família" por "entes queridos" ou "núcleo doméstico"', checked: false },
    { label: 'C5: Especificar Agente (Trocar "todos nós" por "Ministério da Saúde")', checked: false }
  ],
  manualConstrucao: {
    titulo: "Guia de Estrutura: Argumentação por Causa e Consequência",
    passos: [
      {
        titulo: "TÓPICO FRASAL (CAUSA)",
        descricao: "Apresente o problema central. Ex: 'A desinformação familiar é o principal entrave para a doação...'"
      },
      {
        titulo: "REPERTÓRIO (VALIDAÇÃO)",
        descricao: "Valide sua tese. Ex: 'Segundo a ABTO, 43% das recusas ocorrem por desconhecimento do protocolo de morte encefálica'."
      },
      {
        titulo: "CONSEQUÊNCIA (IMPACTO)",
        descricao: "Mostre o efeito prático. Ex: 'Isso gera um paradoxo onde órgãos vitais são sepultados enquanto a fila de espera cresce'."
      },
      {
        titulo: "FECHAMENTO CRÍTICO",
        descricao: "Reafirme a gravidade. Ex: 'Logo, o silêncio sobre o tema torna-se, indiretamente, uma sentença de morte'."
      }
    ],
    dicasGramaticais: "Atenção à ortografia: 1) 'Dimensão' deriva de 'dimenso', usa-se S. 2) 'Conscientização' vem de 'consciente', usa-se SC. 3) Diferencie 'há' (existir/tempo) de 'a' (artigo/distância).",
    vocabularioJuizo: [
      "altruísmo", "paradoxo", "negligência", "estigma", "vital", 
      "dádiva", "imperativo", "desmistificar", "solidariedade", "entraves",
      "mitigar", "consolidar", "legado", "omissão", "transcender"
    ],
    notaFinal: "Texto com boa estrutura, mas penalizado gravemente por ortografia (C1) e agente nulo na intervenção (C5)."
  }
};

export const essay_2026_01_07: MateriaData = {
  ...criarTemplateVazio('Redação', 2026),
  id: 'red_760_mock',
  dataRealizacao: '2026-01-07',
  notaAtual: 760,
  meta: 800,
  gap: 40,
  tempo: '1h15',
  questoes: { total: 1, acertos: 0, erros: 0, taxa: 76 },
  detalhado: [
    { nivel: 'C1', faixa: 'Gramática', total: 200, acertos: 160, erros: 40, taxa: 80, cor: '#f3e600' },
    { nivel: 'C2', faixa: 'Tema', total: 200, acertos: 160, erros: 40, taxa: 80, cor: '#f3e600' },
    { nivel: 'C3', faixa: 'Argumento', total: 200, acertos: 120, erros: 80, taxa: 60, cor: '#ff0055' },
    { nivel: 'C4', faixa: 'Coesão', total: 200, acertos: 160, erros: 40, taxa: 80, cor: '#f3e600' },
    { nivel: 'C5', faixa: 'Proposta', total: 200, acertos: 160, erros: 40, taxa: 80, cor: '#f3e600' },
  ],
  redacaoData: redacaoData
};