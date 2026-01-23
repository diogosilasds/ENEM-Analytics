
import React from 'react';
import { SearchCode, ChevronRight, RefreshCw, XCircle, CheckCircle2, GraduationCap, PencilLine, Quote, Tag } from 'lucide-react';
import { RedacaoSpecificData, RedacaoReescrita, RedacaoManual } from '../../types';

export const ErrorAuditoryPanel: React.FC<{ redacao: RedacaoSpecificData }> = ({ redacao }) => {
    const allErrors = redacao.textoTranscrito
        .flatMap(line => (line.errors || []).map(err => ({ ...err, line: line.lineNumber })));
    
    return (
        <div className="bg-[#0f0f11] border border-[#333] h-full flex flex-col overflow-hidden">
            <div className="p-4 border-b border-[#333] flex justify-between items-center bg-[#151518]">
                <div className="flex items-center gap-2">
                    <SearchCode className="w-4 h-4 text-brand-pink" />
                    <h3 className="text-xs font-black font-display uppercase tracking-widest text-white">Auditoria de Desvios</h3>
                </div>
                <span className="text-[9px] font-mono text-brand-pink bg-brand-pink/10 px-2 py-1 border border-brand-pink/20 uppercase font-bold tracking-tighter">
                    {allErrors.length} Ocorrências
                </span>
            </div>
            
            <div className="flex-grow overflow-y-auto custom-scrollbar p-4 space-y-4">
                {allErrors.map((err, idx) => {
                    const typeColor = err.type === 'grammar' ? 'text-brand-pink border-brand-pink/30 bg-brand-pink/5' 
                                    : err.type === 'structure' ? 'text-brand-yellow border-brand-yellow/30 bg-brand-yellow/5'
                                    : 'text-brand-cyan border-brand-cyan/30 bg-brand-cyan/5';
                    
                    return (
                        <div key={idx} className={`p-4 border-l-2 ${typeColor.split(' ')[1]} bg-white/[0.02] relative group hover:bg-white/[0.04] transition-colors`}>
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[9px] font-black font-mono uppercase tracking-[0.2em] px-2 py-0.5 rounded-sm border ${typeColor}`}>
                                    {err.type === 'grammar' ? 'GRAMÁTICA' : err.type === 'structure' ? 'ESTRUTURA' : err.type === 'intervention' ? 'PROPOSTA' : 'COESÃO'}
                                </span>
                                <span className="text-[10px] font-mono text-brand-muted font-bold tracking-widest">LINHA_{String(err.line).padStart(2, '0')}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-mono text-brand-muted line-through opacity-50 italic">"{err.term}"</span>
                                <ChevronRight className="w-3 h-3 text-brand-muted" />
                                <span className="text-xs font-bold text-white uppercase tracking-tight">{err.correction}</span>
                            </div>
                            
                            <p className="text-[10px] text-brand-muted leading-relaxed font-sans italic border-t border-white/5 pt-2">
                                {err.description}
                            </p>
                        </div>
                    );
                })}

                {redacao.vicios && redacao.vicios.map((vicio, vIdx) => (
                    <div key={`v-${vIdx}`} className="p-4 border-l-2 border-brand-yellow/50 bg-brand-yellow/5">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[9px] font-black font-mono uppercase tracking-widest text-brand-yellow">REPETIÇÃO VICIOSA</span>
                            <span className="text-[9px] font-mono text-brand-yellow font-bold uppercase">{vicio.ocorrencias}x Detectado</span>
                        </div>
                        <p className="text-xs font-bold text-white mb-2 uppercase">VOCABULÁRIO: "{vicio.termo}"</p>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-yellow rounded-full" style={{ width: `${Math.min((vicio.ocorrencias / vicio.limite) * 100, 100)}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const RewriteSection: React.FC<{ reescrita: RedacaoReescrita }> = ({ reescrita }) => {
  return (
    <div className="bg-[#0f0f11] border border-[#333] p-1 relative overflow-hidden group w-full mt-8">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-pink via-brand-yellow to-brand-emerald"></div>
      
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-brand-cyan/10 rounded border border-brand-cyan/20">
            <RefreshCw className="w-6 h-6 text-brand-cyan" />
          </div>
          <div>
            <h3 className="text-sm md:text-base font-black font-display text-white uppercase tracking-[0.2em]">Prática de Reescrita</h3>
            <p className="text-[10px] font-mono text-brand-muted mt-1 uppercase tracking-wider">Laboratório de Correção Avançada</p>
          </div>
        </div>

        {reescrita.intro && (
            <p className="text-sm text-brand-text/80 font-sans leading-relaxed mb-10 max-w-4xl border-l-4 border-brand-cyan pl-4">
            {reescrita.intro}
            </p>
        )}

        <div className="space-y-12">
          {reescrita.exemplos.map((ex, idx) => (
            <div key={idx} className="bg-[#121214] border border-[#222] p-6 relative group/card">
              <div className="absolute -top-3 left-6 bg-brand-cyan text-black text-[10px] font-black px-3 py-1 uppercase tracking-widest rounded-sm">
                Caso #{idx + 1}
              </div>
              
              <h4 className="text-sm font-bold text-white mb-6 mt-2">{ex.titulo}</h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-brand-pink mb-1">
                    <XCircle className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Original (Versão Atual)</span>
                  </div>
                  <div className="p-4 bg-brand-pink/5 border border-brand-pink/20 rounded-sm text-xs font-mono text-brand-muted leading-relaxed">
                    "{ex.original}"
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-brand-emerald mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Correção Sugerida</span>
                  </div>
                  <div className="p-4 bg-brand-emerald/5 border border-brand-emerald/20 rounded-sm text-xs font-mono text-white leading-relaxed">
                    {ex.corrigido.split('**').map((part, i) => 
                      i % 2 === 1 ? <span key={i} className="text-brand-emerald font-bold bg-brand-emerald/10 px-1">{part}</span> : part
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#222]">
                 <div>
                    <span className="text-[9px] font-mono text-brand-muted uppercase tracking-widest block mb-2">Diagnóstico do Problema</span>
                    <p className="text-xs text-brand-text/70">{ex.problema}</p>
                 </div>
                 <div>
                    <span className="text-[9px] font-mono text-brand-muted uppercase tracking-widest block mb-2">Lógica da Correção</span>
                    <p className="text-xs text-brand-text/70">{ex.explicacao}</p>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const StructuralGuide: React.FC<{ manual: RedacaoManual }> = ({ manual }) => {
    return (
        <div className="bg-[#0f0f11] border border-[#333] p-1 relative overflow-hidden group w-full mt-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent via-brand-cyan to-brand-purple"></div>
            
            <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-brand-accent/10 rounded border border-brand-accent/20">
                        <GraduationCap className="w-6 h-6 text-brand-accent" />
                    </div>
                    <div>
                        <h3 className="text-sm md:text-base font-black font-display text-white uppercase tracking-[0.2em]">Manual de Construção</h3>
                        <p className="text-[10px] font-mono text-brand-muted mt-1 uppercase tracking-wider">{manual.titulo}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    {manual.passos.map((passo, idx) => {
                        const colors = [
                            'border-brand-accent text-brand-accent bg-brand-accent/5',
                            'border-brand-cyan text-brand-cyan bg-brand-cyan/5',
                            'border-brand-yellow text-brand-yellow bg-brand-yellow/5',
                            'border-brand-purple text-brand-purple bg-brand-purple/5'
                        ];
                        const style = colors[idx % colors.length];

                        return (
                            <div key={idx} className={`p-5 border-l-4 ${style.split(' ')[0]} bg-[#121214] relative group/card hover:-translate-y-1 transition-transform duration-300`}>
                                <div className="mb-3">
                                    <span className={`text-[10px] font-black font-mono uppercase tracking-widest ${style.split(' ')[1]}`}>
                                        PASSO 0{idx + 1}
                                    </span>
                                    <h4 className="text-xs font-bold font-display text-white mt-1 uppercase">{passo.titulo}</h4>
                                </div>
                                <p className="text-[11px] text-brand-muted leading-relaxed font-sans text-justify">
                                    {passo.descricao}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 border-t border-[#222] pt-8">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                             <PencilLine className="w-4 h-4 text-brand-cyan" />
                             <h4 className="text-xs font-black font-display text-white uppercase tracking-widest">Estratégia de Escrita</h4>
                        </div>
                        <div className="p-5 bg-black/40 border border-[#222] relative">
                            <Quote className="w-8 h-8 text-brand-cyan/10 absolute top-2 left-2" />
                            <p className="text-xs text-brand-text/80 font-mono leading-relaxed relative z-10 pl-4">
                                {manual.dicasGramaticais}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                             <Tag className="w-4 h-4 text-brand-pink" />
                             <h4 className="text-xs font-black font-display text-white uppercase tracking-widest">Juízo de Valor (Vocabulário)</h4>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {manual.vocabularioJuizo.map((word, idx) => (
                                <span key={idx} className="text-[10px] font-mono text-brand-muted hover:text-white bg-white/5 hover:bg-brand-pink hover:border-brand-pink border border-transparent px-2 py-1 rounded-sm transition-all cursor-default">
                                    {word}
                                </span>
                            ))}
                        </div>
                        <p className="text-[9px] text-brand-muted/50 font-mono italic mt-2 leading-tight">
                            {manual.notaFinal}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
