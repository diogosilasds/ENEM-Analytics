
import React, { useContext, useMemo } from 'react';
import { MateriaData } from '../../../types';
import { Layers, Terminal, ChevronRight, Sparkles } from 'lucide-react';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { getThemeColors } from '../../../styles/theme';

// Imported Components
import ScoreGauge from '../../redacao/ScoreGauge';
import AnnotatedText from '../../redacao/AnnotatedText';
import { CompetencyRadar, StackedScoreBar, LollipopChart } from '../../redacao/PerformanceCharts';
import { ErrorAuditoryPanel, RewriteSection, StructuralGuide } from '../../redacao/TextAnalysis';

interface RedacaoViewProps {
  data: MateriaData;
}

const DEFINICOES_COMPETENCIAS: Record<string, string> = {
  'C1': 'Demonstrar domínio da modalidade escrita formal da Língua Portuguesa.',
  'C2': 'Compreender a proposta de redação e aplicar conceitos das várias áreas de conhecimento para desenvolver o tema, dentro dos limites estruturais do texto dissertativo-argumentativo em prosa.',
  'C3': 'Selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista.',
  'C4': 'Demonstrar conhecimento dos mecanismos linguísticos necessários para a construção da argumentação.',
  'C5': 'Elaborar proposta de intervenção para o problema abordado, respeitando os direitos humanos.'
};

const RedacaoView: React.FC<RedacaoViewProps> = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const colors = useMemo(() => getThemeColors(theme === 'dark'), [theme]);
  const redacao = data.redacaoData;

  if (!redacao) return <div>Dados de redação não encontrados.</div>;

  return (
    <section className="space-y-8 animate-in slide-in-from-bottom-6 duration-700 fade-in pb-20">
        
        <div className="bg-[#0f0f11] border border-[#333] p-4 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent"></div>
            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">Tema da Proposta</span>
                <h2 className="text-sm md:text-lg font-bold text-white font-display leading-tight">"{redacao.temaSugrido}"</h2>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            <div className="bg-[#0f0f11] border border-[#333] p-6 flex items-center justify-center relative overflow-hidden group">
                 <ScoreGauge score={data.notaAtual} meta={data.meta} />
            </div>

            <div className="bg-[#0f0f11] border border-[#333] p-6 lg:col-span-2 flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2 h-[250px] relative">
                     <CompetencyRadar competencias={redacao.competencias} colors={colors} />
                </div>
                
                <div className="w-full md:w-1/2 flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-1 max-h-[300px]">
                    <h3 className="text-xs font-black font-display uppercase tracking-widest text-white mb-2 flex items-center gap-2 sticky top-0 bg-[#0f0f11] py-2 z-10">
                        <Layers className="w-4 h-4 text-brand-accent" /> Matriz de Competências
                    </h3>
                    <div className="space-y-3">
                        {redacao.competencias.map((comp) => {
                            const colorClass = comp.nota < 140 ? 'text-brand-pink border-brand-pink' : comp.nota < 180 ? 'text-brand-yellow border-brand-yellow' : 'text-brand-emerald border-brand-emerald';
                            const bgClass = comp.nota < 140 ? 'bg-brand-pink/5' : comp.nota < 180 ? 'bg-brand-yellow/5' : 'bg-brand-emerald/5';
                            return (
                                <div key={comp.id} className={`p-3 border-l-2 ${colorClass.split(' ')[1]} bg-white/[0.02]`}>
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[11px] font-bold text-white uppercase tracking-wider">{comp.id}: {comp.nome}</span>
                                        <div className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${colorClass} ${bgClass}`}>
                                            {comp.nota}
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-brand-muted leading-relaxed font-sans">
                                        {DEFINICOES_COMPETENCIAS[comp.id] || "Definição não disponível."}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <StackedScoreBar competencias={redacao.competencias} meta={data.meta} />
            <LollipopChart competencias={redacao.competencias} />
        </div>

        {/* 3. SEÇÃO DE TEXTO E AUDITORIA (Side-by-Side Atualizado) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-[700px]">
            <div className="lg:col-span-1 h-full overflow-hidden">
                <ErrorAuditoryPanel redacao={redacao} />
            </div>
            <div className="lg:col-span-2 h-full">
                <AnnotatedText lines={redacao.textoTranscrito} paragraphStarts={redacao.paragraphStarts} />
            </div>
        </div>

        {redacao.reescrita && (
            <RewriteSection reescrita={redacao.reescrita} />
        )}

        {redacao.checklist.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 bg-[#0f0f11] border border-[#333] p-6 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-6">
                        <Terminal className="w-5 h-5 text-brand-accent" />
                        <h3 className="text-sm font-black font-display uppercase tracking-widest text-white">Diretrizes de Correção</h3>
                    </div>
                    <div className="flex flex-col gap-2">
                        {redacao.checklist.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-3 border-l-2 border-brand-accent/30 bg-white/[0.02] hover:bg-white/5 hover:border-brand-accent transition-all group cursor-default">
                                <div className="w-6 h-6 flex items-center justify-center font-mono text-[10px] font-bold text-brand-accent border border-brand-accent/20 bg-brand-accent/5 rounded-sm">{String(idx + 1).padStart(2, '0')}</div>
                                <span className="text-xs text-brand-text font-sans leading-tight group-hover:text-white transition-colors flex-grow">{item.label}</span>
                                <div className="hidden sm:flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[9px] font-mono text-brand-muted uppercase tracking-widest">PENDENTE</span>
                                    <ChevronRight className="w-3 h-3 text-brand-accent" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-brand-accent/5 border border-brand-accent/20 p-6 flex flex-col justify-center relative">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-brand-accent/10 rounded-bl-full"></div>
                    <div className="flex items-center gap-2 mb-4 text-brand-accent">
                        <Sparkles className="w-5 h-5 fill-current" />
                        <h3 className="text-xs font-black font-display uppercase tracking-widest">Estrutura de Ouro</h3>
                    </div>
                    <p className="text-sm text-brand-text font-bold leading-relaxed font-mono">{redacao.feedbackGeral.dicaOuro}</p>
                </div>
            </div>
        )}

        {redacao.manualConstrucao && <StructuralGuide manual={redacao.manualConstrucao} />}
    </section>
  );
};

export default RedacaoView;
