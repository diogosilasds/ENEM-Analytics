
import React, { useContext, useMemo, useState } from 'react';
import { MateriaData, RedacaoSpecificData, RedacaoManual, RedacaoReescrita } from '../../../types';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, 
  ReferenceLine, Cell, Scatter, ComposedChart
} from 'recharts';
import { 
  BookOpen, Edit3, AlertTriangle, TrendingUp, 
  MessageSquare, Layers, Quote, Sparkles, Highlighter, Info,
  GraduationCap, PencilLine, Tag, Terminal, ChevronRight, Activity, BarChart3,
  RefreshCw, CheckCircle2, XCircle, ArrowRight, ListFilter, SearchCode
} from 'lucide-react';
import { ThemeContext } from '../../../App';
import { getThemeColors } from '../../../styles/theme';

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

// === COMPONENTES INTERNOS ===

const RewriteSection: React.FC<{ reescrita: RedacaoReescrita }> = ({ reescrita }) => {
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

const StructuralGuide: React.FC<{ manual: RedacaoManual }> = ({ manual }) => {
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

const ScoreGauge: React.FC<{ score: number; meta: number }> = ({ score, meta }) => {
  const radius = 95; 
  const circumference = 2 * Math.PI * radius;
  const coverage = 0.75; 
  const maxStroke = circumference * coverage;

  const normalizedScore = Math.min(Math.max(score, 0), 1000);
  const fillPercentage = normalizedScore / 1000;
  const currentStroke = maxStroke * fillPercentage;

  const scaleValues = [0, 250, 500, 750, 1000];
  const renderScale = () => {
    return scaleValues.map((val) => {
      const angleDeg = 135 + (val / 1000) * 270;
      const angleRad = (angleDeg * Math.PI) / 180;
      const r = radius + 24; 
      const x = 128 + r * Math.cos(angleRad);
      const y = 128 + r * Math.sin(angleRad);
      
      return (
        <div 
            key={val}
            className="absolute text-[9px] font-mono font-bold text-brand-muted transform -translate-x-1/2 -translate-y-1/2 select-none"
            style={{ left: `${(x / 256) * 100}%`, top: `${(y / 256) * 100}%` }}
        >
            {val}
        </div>
      );
    });
  };

  return (
    <div className="relative w-72 h-72 flex items-center justify-center">
      {renderScale()}
      <svg className="w-full h-full" viewBox="0 0 256 256">
        <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff0055" />  
                <stop offset="33%" stopColor="#f3e600" />  
                <stop offset="66%" stopColor="#00ff9f" />  
                <stop offset="100%" stopColor="#00f3ff" /> 
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <g transform="rotate(135 128 128)">
            <circle cx="128" cy="128" r={radius} stroke="#1f1f22" strokeWidth="10" fill="transparent" strokeDasharray={`${maxStroke} ${circumference}`} strokeLinecap="round" />
            <circle cx="128" cy="128" r={radius} stroke="url(#scoreGradient)" strokeWidth="10" fill="transparent" strokeDasharray={`${currentStroke} ${circumference}`} strokeDashoffset="0" strokeLinecap="round" filter="url(#glow)" className="transition-all duration-1000 ease-out" />
            <g style={{ transform: `rotate(${(normalizedScore / 1000) * 270}deg)`, transformOrigin: '128px 128px', transition: 'transform 1s ease-out' }}>
                <rect x={128 + radius - 8} y={126} width={16} height={4} fill="#ffffff" rx={1} className="drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]" />
            </g>
        </g>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pt-4 pointer-events-none">
        <span className="text-[10px] font-mono text-brand-muted tracking-widest uppercase mb-1">Nota Final</span>
        <span className="text-5xl font-black font-display text-white tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{score}</span>
        <div className="flex items-center gap-2 mt-2 bg-white/5 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
          <TrendingUp className="w-3 h-3 text-brand-emerald" />
          <span className="text-[10px] font-mono font-bold text-brand-emerald">Meta: {meta}</span>
        </div>
      </div>
    </div>
  );
};

const StackedScoreBar: React.FC<{ competencias: any[], meta: number }> = ({ competencias, meta }) => {
    const colors = ['#ff0055', '#ff0055', '#f3e600', '#00ff9f', '#00f3ff'];
    const data = {
        name: 'Score',
        C1: competencias[0]?.nota || 0,
        C2: competencias[1]?.nota || 0,
        C3: competencias[2]?.nota || 0,
        C4: competencias[3]?.nota || 0,
        C5: competencias[4]?.nota || 0,
    };

    return (
        <div className="bg-[#0f0f11] border border-[#333] p-6 h-full flex flex-col">
            <h4 className="text-[10px] font-black font-display text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-accent" /> Composição Linear do Score
            </h4>
            <div className="flex-grow flex items-center">
                <div className="w-full h-12 relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={[data]} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <XAxis type="number" domain={[0, 1000]} hide />
                            <YAxis type="category" dataKey="name" hide />
                            <Tooltip 
                                cursor={{fill: 'transparent'}}
                                contentStyle={{ backgroundColor: '#050505', border: '1px solid #333', fontSize: '10px' }}
                            />
                            <Bar dataKey="C1" stackId="a" fill={colors[0]} />
                            <Bar dataKey="C2" stackId="a" fill={colors[1]} />
                            <Bar dataKey="C3" stackId="a" fill={colors[2]} />
                            <Bar dataKey="C4" stackId="a" fill={colors[3]} />
                            <Bar dataKey="C5" stackId="a" fill={colors[4]} />
                            <ReferenceLine x={meta} stroke="#ffffff" strokeDasharray="3 3" label={{ position: 'top', value: `META: ${meta}`, fill: '#fff', fontSize: 9, fontWeight: 'bold' }} />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 border border-white/5 pointer-events-none -z-10"></div>
                </div>
            </div>
            <div className="flex justify-between mt-4">
                {competencias.map((c, i) => (
                    <div key={c.id} className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full mb-1" style={{ backgroundColor: colors[i] }}></div>
                        <span className="text-[8px] font-mono text-brand-muted">{c.id}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const LollipopChart: React.FC<{ competencias: any[] }> = ({ competencias }) => {
    const data = competencias.map((c, i) => ({
        name: c.id,
        val: c.nota,
        full: 200,
        color: c.nota < 140 ? '#ff0055' : c.nota < 180 ? '#f3e600' : '#00ff9f'
    }));

    return (
        <div className="bg-[#0f0f11] border border-[#333] p-6 h-full min-h-[300px] flex flex-col">
            <h4 className="text-[10px] font-black font-display text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-brand-cyan" /> Discrepância de Performance (0-200)
            </h4>
            <div className="flex-grow">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart layout="vertical" data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                        <XAxis type="number" domain={[0, 200]} tick={{ fill: '#666', fontSize: 9 }} hide />
                        <YAxis dataKey="name" type="category" tick={{ fill: '#fff', fontSize: 10, fontWeight: 'bold' }} width={30} axisLine={false} tickLine={false} />
                        <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid #333' }} itemStyle={{ color: '#fff', fontSize: '10px' }} />
                        <Bar dataKey="val" barSize={2} fill="#333" />
                        <Scatter dataKey="val" fill="#00f3ff">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Scatter>
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
            <p className="text-[8px] font-mono text-brand-muted text-center mt-2 opacity-40 uppercase tracking-widest">Comparative Matrix Analytics</p>
        </div>
    );
};

// === NOVO COMPONENTE: AUDITORIA DETALHADA DE ERROS (Sempre Visível) ===
const ErrorAuditoryPanel: React.FC<{ redacao: RedacaoSpecificData }> = ({ redacao }) => {
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

const AnnotatedText: React.FC<{ lines: RedacaoSpecificData['textoTranscrito'] }> = ({ lines }) => {
    const [hoveredError, setHoveredError] = useState<string | null>(null);
    const startOfParagraphLines = [1, 7, 13, 19];

    return (
        <div className="bg-[#0f0f11] border border-[#333] h-full flex flex-col">
            <div className="p-4 border-b border-[#333] flex justify-between items-center bg-[#151518]">
                <div className="flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-brand-accent" />
                    <h3 className="text-xs font-black font-display uppercase tracking-widest text-white">Transcrição Digitalizada</h3>
                </div>
                <span className="text-[9px] font-mono text-brand-muted bg-black px-2 py-1 border border-[#333]">V.1.0 SCAN</span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed overflow-y-auto max-h-[600px] custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/graphy-dark.png')]">
                {lines.map((line) => {
                    const isStartOfParagraph = startOfParagraphLines.includes(line.lineNumber);
                    return (
                        <div key={line.lineNumber} className="flex gap-4 mb-1 group relative">
                            <span className={`text-[10px] select-none w-6 text-right pt-1 transition-colors ${isStartOfParagraph ? 'text-brand-yellow font-black opacity-100 scale-110 drop-shadow-[0_0_8px_#f3e600]' : 'text-brand-muted/30'}`}>
                                {line.lineNumber}
                            </span>
                            <p className="text-brand-text/80 break-words flex-grow">
                                {line.errors ? (
                                    <>
                                        {line.text.split(' ').map((word, wIdx) => {
                                            const error = line.errors?.find(e => word.includes(e.term));
                                            if (error) {
                                                const errorColor = error.type === 'grammar' ? 'text-brand-pink border-brand-pink decoration-brand-pink' 
                                                                : error.type === 'structure' ? 'text-brand-yellow border-brand-yellow decoration-brand-yellow'
                                                                : 'text-brand-cyan border-brand-cyan decoration-brand-cyan';
                                                return (
                                                    <span 
                                                        key={wIdx}
                                                        className={`relative inline-block mx-0.5 cursor-help ${errorColor} border-b-2 border-dotted hover:bg-white/10 px-0.5 rounded transition-colors`}
                                                        onMouseEnter={() => setHoveredError(`${line.lineNumber}-${wIdx}`)}
                                                        onMouseLeave={() => setHoveredError(null)}
                                                    >
                                                        {word}
                                                    </span>
                                                );
                                            }
                                            return <span key={wIdx} className="mx-0.5">{word}</span>;
                                        })}
                                    </>
                                ) : (
                                    line.text
                                )}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const RedacaoView: React.FC<RedacaoViewProps> = ({ data }) => {
  const { theme } = useContext(ThemeContext);
  const colors = useMemo(() => getThemeColors(theme === 'dark'), [theme]);
  const redacao = data.redacaoData;

  if (!redacao) return <div>Dados de redação não encontrados.</div>;

  const radarData = redacao.competencias.map(c => ({
    subject: c.id,
    A: c.nota,
    fullMark: 200,
    meta: c.meta
  }));

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
                     <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                            <PolarGrid stroke="#333" strokeDasharray="3 3" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#fff', fontSize: 12, fontWeight: 'bold' }} />
                            <PolarRadiusAxis angle={90} domain={[0, 200]} tick={false} axisLine={false} />
                            <Radar name="Nota" dataKey="A" stroke={colors.cyan} strokeWidth={3} fill={colors.cyan} fillOpacity={0.4} />
                            <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid #333' }} itemStyle={{ color: '#fff' }} />
                        </RadarChart>
                    </ResponsiveContainer>
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
                <AnnotatedText lines={redacao.textoTranscrito} />
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
