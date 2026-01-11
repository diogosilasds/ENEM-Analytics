
import React from 'react';
import { CheckCircle2, XCircle, MinusCircle, List, ArrowUpDown } from 'lucide-react';
import { QuestaoRelatorio } from '../../types';

interface QuestionTableProps {
  questions: QuestaoRelatorio[];
}

const QuestionTable: React.FC<QuestionTableProps> = ({ questions }) => {
  // Mantém a ordem original dos dados (por Dificuldade TRI)
  const sortedQuestions = questions;

  const getDifficultyColor = (diff: string) => {
    if (diff.toLowerCase() === 'anulada') return 'bg-[#333] text-brand-muted border-brand-muted/30';
    const val = parseInt(diff);
    
    // 1. Faixa 350 - 500: Verde Esmeralda
    if (val >= 350 && val <= 500) {
      return 'bg-brand-emerald/20 text-brand-emerald border-brand-emerald/40 shadow-[0_0_10px_rgba(0,255,159,0.2)]';
    }
    // 2. Faixa 550 - 700: Amarelo Ouro
    if (val >= 501 && val <= 700) {
      return 'bg-brand-yellow/20 text-brand-yellow border-brand-yellow/40 shadow-[0_0_10px_rgba(243,230,0,0.2)]';
    }
    // 3. Faixa 750 - 1000: Ciano Neon
    if (val >= 701 && val <= 1000) {
      return 'bg-brand-cyan/20 text-brand-cyan border-brand-cyan/40 shadow-[0_0_10px_rgba(0,243,255,0.2)]';
    }
    
    return 'bg-brand-purple/10 text-brand-purple border-brand-purple/30';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'acerto':
        return <CheckCircle2 className="w-4 h-4 text-brand-emerald" />;
      case 'erro':
        return <XCircle className="w-4 h-4 text-brand-pink" />;
      default:
        return <MinusCircle className="w-4 h-4 text-brand-muted" />;
    }
  };

  return (
    <div className="bg-brand-card border border-brand-border rounded-xl p-6 backdrop-blur-sm relative overflow-hidden flex flex-col h-full">
       <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
              <List className="w-5 h-5 text-brand-text" />
              <h2 className="text-lg font-semibold text-brand-text">Relatório de Itens</h2>
          </div>
          <div className="text-[10px] font-mono text-brand-muted uppercase tracking-widest bg-black/20 px-3 py-1 rounded">
             Total: {questions.length} Itens
          </div>
       </div>

       <div className="overflow-x-auto flex-grow custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#333] text-[9px] font-mono text-brand-muted uppercase tracking-widest">
                <th className="py-3 px-4 font-bold">
                    <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors">
                        QUESTÃO <ArrowUpDown className="w-3 h-3 opacity-50" />
                    </div>
                </th>
                <th className="py-3 px-4 font-bold text-center">DIFICULDADE (TRI)</th>
                <th className="py-3 px-4 font-bold text-right">RESULTADO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222]">
              {sortedQuestions.map((q) => (
                <tr key={q.numero} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="py-2.5 px-4">
                    <span className="font-mono text-xs font-bold text-white group-hover:text-brand-accent transition-colors">#{q.numero}</span>
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded text-[11px] font-mono font-black border ${getDifficultyColor(q.dificuldade)} transition-all duration-300`}>
                        {q.dificuldade}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                        {/* Texto Acerto em Verde, Erro em Vermelho */}
                        <span className={`text-[11px] font-black font-mono uppercase tracking-widest ${q.situacao === 'acerto' ? 'text-brand-emerald drop-shadow-[0_0_5px_rgba(0,255,159,0.3)]' : q.situacao === 'erro' ? 'text-brand-pink drop-shadow-[0_0_5px_rgba(255,0,85,0.3)]' : 'text-brand-muted'}`}>
                            {q.situacao === 'acerto' ? 'ACERTO' : q.situacao === 'erro' ? 'ERRO' : q.situacao.toUpperCase()}
                        </span>
                        {getStatusIcon(q.situacao)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
       </div>
    </div>
  );
};

export default QuestionTable;
