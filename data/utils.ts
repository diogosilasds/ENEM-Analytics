import { MateriaData } from '../types';

// ============================================================================
// UTILITÁRIOS COMPARTILHADOS
// ============================================================================

export const criarTemplateVazio = (titulo: string, ano: number): MateriaData => ({
  titulo: `${titulo}`,
  data: `ENEM ${ano}`,
  notaAtual: 0,
  meta: 800,
  gap: 800,
  tempo: '0h00',
  questoes: { total: 0, acertos: 0, erros: 0, taxa: 0 },
  projecao: [],
  detalhado: [],
  metas: [],
  linha: [],
  diagnostico: {
    pontoForte: 'Sem dados',
    zonaCritica: 'Sem dados',
    problema: 'Prova não realizada ou não cadastrada.',
    alerta: 'Sem dados.'
  },
  analiseProfunda: { tri: [], plano: [] }
});