
import React, { useContext, useMemo, useState } from 'react';
import { MateriaData, RedacaoSpecificData } from '../../../types';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, Tooltip 
} from 'recharts';
import { 
  BookOpen, Edit3, AlertTriangle, CheckCircle2, TrendingUp, 
  MessageSquare, Layers, Quote, CheckSquare, Sparkles, Highlighter, Info 
} from 'lucide-react';
import { ThemeContext } from '../../../App';
import { getThemeColors } from '../../../styles/theme';

interface RedacaoViewProps {
  data: MateriaData;
}

// Definições oficiais das Competências
const DEFINICOES_COMPETENCIAS: Record<string, string> = {
  'C1': 'Demonstrar domínio da modalidade escrita formal da Língua Portuguesa.',
  'C2': 'Compreender a proposta de redação e aplicar conceitos das várias áreas de conhecimento para desenvolver o tema, dentro dos limites estruturais do texto dissertativo-argumentativo em prosa.',
  'C3': 'Selecionar, relacionar, organizar e interpretar informações, fatos, opiniões e argumentos em defesa de um ponto de vista.',
  'C4': 'Demonstrar conhecimento dos mecanismos linguísticos necessários para a construção da argumentação.',
  'C5': 'Elaborar proposta de intervenção para o problema abordado, respeitando os direitos humanos.'
};

// === COMPONENTES INTERNOS ===

const ScoreGauge: React.FC<{ score: number; meta: number }> = ({ score, meta }) => {
  const percentage = (score / 1000) * 100;
  const circumference = 2 * Math.PI * 120; // Raio 120
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  // Cor dinâmica
  let color = '#ff0055'; // Crítico
  if (score >= 800) color = '#00ff9f'; // Excelente
  else if (score >= 600) color = '#f3e600'; // Médio

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Background Circle */}
      {/* 
        FIX VISUAL: ViewBox adicionado para garantir escala correta. 
        scale-x-[-1] (scaleX(-1)) inverte o SVG horizontalmente.
        Combinado com rotate-90 (que inicia no topo), isso faz a barra preencher no sentido anti-horário (pelo lado ESQUERDO),
        o que corresponde ao design visual esperado (gap no topo-direita).
      */}
      <svg className="w-full h-full transform -rotate-90 scale-x-[-1]" viewBox="0 0 256 256">
        <circle
          cx="128"
          cy="128"
          r="120"
          stroke="#1f1f22"
          strokeWidth="12"
          fill="transparent"
        />
        {/* Progress Circle */}
        <circle
          cx="128"
          cy="128"
          r="120"
          stroke={color}
          strokeWidth="12"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <span className="text-sm font-mono text-brand-muted tracking-widest uppercase mb-1">Nota Final</span>
        <span className="text-6xl font-black font-display text-white tracking-tighter" style={{ textShadow: `0 0 20px ${color}40` }}>
          {score}
        </span>
        <div className="flex items-center gap-2 mt-2 bg-white/5 px-3 py-1 rounded-full border border-white/10">
          <TrendingUp className="w-3 h-3 text-brand-emerald" />
          <span className="text-[10px] font-mono font-bold text-brand-emerald">+40 pts vs anterior</span>
        </div>
      </div>
    </div>
  );
};

const AnnotatedText: React.FC<{ lines: RedacaoSpecificData['textoTranscrito'] }> = ({ lines }) => {
    const [hoveredError, setHoveredError] = useState<string | null>(null);

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
                {lines.map((line) => (
                    <div key={line.lineNumber} className="flex gap-4 mb-1 group relative">
                        <span className="text-[10px] text-brand-muted/30 select-none w-6 text-right pt-1">{line.lineNumber}</span>
                        <p className="text-brand-text/80 break-words flex-grow">
                            {line.errors ? (
                                <>
                                    {/* Lógica simples de renderização para este caso específico: 
                                        Substitui a palavra errada por um span interativo.
                                        Em produção real, usaria regex mais robusto. 
                                    */}
                                    {line.text.split(' ').map((word, wIdx) => {
                                        // Limpa pontuação para comparação básica
                                        const cleanWord = word.replace(/[.,;!?()"]/g, '');
                                        const error = line.errors?.find(e => {
                                            // Verifica se a palavra "contém" o termo de erro (ex: "dimenção" em "dimenção,")
                                            return word.includes(e.term);
                                        });

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
                                                    {/* Tooltip */}
                                                    <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-black border ${errorColor.replace('text-', 'border-')} z-50 shadow-xl pointer-events-none transition-all duration-200 ${hoveredError === `${line.lineNumber}-${wIdx}` ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                                                        <span className="block text-[10px] font-black uppercase tracking-widest mb-1 text-white border-b border-white/10 pb-1">
                                                            {error.type === 'grammar' ? 'DESVIO GRAMATICAL' : error.type === 'structure' ? 'FALHA ESTRUTURAL' : 'INTERVENÇÃO'}
                                                        </span>
                                                        <span className="block text-xs font-bold text-white mb-1">
                                                            {error.correction}
                                                        </span>
                                                        <span className="block text-[10px] text-brand-muted leading-tight">
                                                            {error.description}
                                                        </span>
                                                    </span>
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
                ))}
            </div>
        </div>
    );
};

const ErrorCards: React.FC<{ redacao: RedacaoSpecificData }> = ({ redacao }) => {
    // Extrai erros para contagem
    const grammarErrors = redacao.textoTranscrito.flatMap(l => l.errors || []).filter(e => e.type === 'grammar');
    const structureErrors = redacao.textoTranscrito.flatMap(l => l.errors || []).filter(e => e.type === 'structure');
    
    return (
        <div className="grid grid-cols-1 gap-4">
            {/* Card 1: Gramática */}
            <div className="bg-[#0f0f11] border border-l-4 border-[#333] border-l-brand-pink p-5 group hover:bg-[#151518] transition-colors">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                        <Highlighter className="w-4 h-4 text-brand-pink" />
                        <h4 className="text-xs font-black font-display uppercase tracking-widest text-white">Gramática & Ortografia</h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-brand-pink/10 text-brand-pink px-2 py-0.5 rounded-sm">
                        {grammarErrors.length} DESVIOS
                    </span>
                </div>
                <ul className="space-y-3">
                    {grammarErrors.map((err, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs font-mono">
                            <span className="text-brand-pink line-through opacity-70">{err.term}</span>
                            <span className="text-brand-muted">➔</span>
                            <span className="text-brand-emerald font-bold">{err.correction}</span>
                        </li>
                    ))}
                    {grammarErrors.length === 0 && <p className="text-brand-muted text-xs italic">Nenhum desvio grave detectado.</p>}
                </ul>
            </div>

            {/* Card 2: Coesão (Vícios) */}
            <div className="bg-[#0f0f11] border border-l-4 border-[#333] border-l-brand-yellow p-5 group hover:bg-[#151518] transition-colors">
                <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-brand-yellow" />
                        <h4 className="text-xs font-black font-display uppercase tracking-widest text-white">Vícios & Repetições</h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-brand-yellow/10 text-brand-yellow px-2 py-0.5 rounded-sm">
                        C4: 160 pts
                    </span>
                </div>
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-[10px] font-mono text-brand-muted mb-1">
                            <span>REPETIÇÃO: "FAMÍLIA"</span>
                            <span className="text-brand-yellow">6 OCORRÊNCIAS</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-brand-yellow w-[80%] rounded-full animate-pulse"></div>
                        </div>
                    </div>
                    <div className="bg-black/40 p-3 border border-white/5 rounded">
                        <p className="text-[10px] text-brand-muted uppercase mb-2">Sugestões de Substituição:</p>
                        <div className="flex flex-wrap gap-2">
                            {['Núcleo Doméstico', 'Parentela', 'Entes Queridos', 'Lar'].map(s => (
                                <span key={s} className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 text-white hover:border-brand-yellow transition-colors cursor-default">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

             {/* Card 3: Argumentação */}
             <div className="bg-[#0f0f11] border border-l-4 border-[#333] border-l-brand-cyan p-5 group hover:bg-[#151518] transition-colors">
                <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-brand-cyan" />
                        <h4 className="text-xs font-black font-display uppercase tracking-widest text-white">Argumentação (C3)</h4>
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-brand-cyan/10 text-brand-cyan px-2 py-0.5 rounded-sm">
                        ALERTA: 120 pts
                    </span>
                </div>
                <div className="space-y-3">
                    <p className="text-xs text-brand-text leading-relaxed border-l-2 border-brand-cyan/30 pl-3">
                        <span className="text-brand-cyan font-bold block mb-1">Falta de Profundidade (Linha 16):</span>
                        "Você mencionou a falta de profissionais, mas não explicou a <span className="italic">causa raiz</span>. É falha acadêmica? Falta de verba?"
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-brand-muted mt-2">
                        <AlertTriangle className="w-3 h-3 text-brand-pink" />
                        <span>Requer uso de "Por quê?" a cada afirmação.</span>
                    </div>
                </div>
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
        
        {/* HEADER DO TEMA - ADICIONADO */}
        <div className="bg-[#0f0f11] border border-[#333] p-4 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent"></div>
            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">Tema da Proposta</span>
                <h2 className="text-sm md:text-lg font-bold text-white font-display leading-tight">
                    "{redacao.temaSugrido}"
                </h2>
            </div>
        </div>

        {/* 1. HEADER & GAUGE SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Left: Score Gauge */}
            <div className="bg-[#0f0f11] border border-[#333] p-6 flex items-center justify-center relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <BookOpen className="w-32 h-32 text-white" />
                 </div>
                 <ScoreGauge score={data.notaAtual} meta={data.meta} />
            </div>

            {/* Middle: Radar & Competencies */}
            <div className="bg-[#0f0f11] border border-[#333] p-6 lg:col-span-2 flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/2 h-[250px] relative">
                     <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                            <PolarGrid stroke="#333" strokeDasharray="3 3" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#fff', fontSize: 12, fontWeight: 'bold' }} />
                            <PolarRadiusAxis angle={90} domain={[0, 200]} tick={false} axisLine={false} />
                            <Radar name="Nota" dataKey="A" stroke={colors.accent} strokeWidth={3} fill={colors.accent} fillOpacity={0.3} />
                            <Tooltip contentStyle={{ backgroundColor: '#050505', border: '1px solid #333' }} itemStyle={{ color: '#fff' }} />
                        </RadarChart>
                    </ResponsiveContainer>
                    <div className="absolute top-2 right-2 text-[9px] font-mono text-brand-muted uppercase tracking-widest border border-[#333] px-2 py-1">
                        Symmetry Analysis
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center gap-2">
                    <h3 className="text-xs font-black font-display uppercase tracking-widest text-white mb-2 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-brand-accent" /> Matriz de Competências
                    </h3>
                    <div className="space-y-1">
                        {redacao.competencias.map((comp) => {
                            const colorClass = comp.nota < 140 ? 'text-brand-pink bg-brand-pink/10' : comp.nota < 180 ? 'text-brand-yellow bg-brand-yellow/10' : 'text-brand-emerald bg-brand-emerald/10';
                            return (
                                <div key={comp.id} className="relative group">
                                    <div className="flex justify-between items-center p-2 border border-[#222] hover:border-[#444] transition-colors cursor-help">
                                        <div className="flex items-center gap-2">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-white uppercase">{comp.id}: {comp.nome}</span>
                                            </div>
                                            <Info className="w-3 h-3 text-brand-muted opacity-50" />
                                        </div>
                                        <div className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${colorClass}`}>
                                            {comp.nota}
                                        </div>
                                    </div>
                                    
                                    {/* Tooltip com a Definição Oficial */}
                                    <div className="absolute bottom-full left-0 mb-2 w-64 p-3 bg-[#050505] border border-white/20 shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all z-50">
                                        <p className="text-[10px] font-black text-brand-accent uppercase tracking-wider mb-1">Definição Oficial</p>
                                        <p className="text-xs text-white leading-relaxed">
                                            {DEFINICOES_COMPETENCIAS[comp.id] || "Definição não disponível."}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>

        {/* 2. ANALYTICS & TEXT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-[650px]">
            {/* Left Column: Qualitative Errors */}
            <div className="flex flex-col gap-4 lg:col-span-1 overflow-y-auto custom-scrollbar pr-1">
                <ErrorCards redacao={redacao} />
            </div>

            {/* Right Column: Interactive Text */}
            <div className="lg:col-span-2 h-full">
                <AnnotatedText lines={redacao.textoTranscrito} />
            </div>
        </div>

        {/* 3. ACTION PLAN & GOLDEN TIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-[#0f0f11] border border-[#333] p-6 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6">
                    <CheckSquare className="w-5 h-5 text-brand-accent" />
                    <h3 className="text-sm font-black font-display uppercase tracking-widest text-white">Protocolo de Correção</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {redacao.checklist.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-black/40 border border-[#222] hover:border-brand-accent/50 transition-colors group">
                            <div className="w-5 h-5 rounded border border-[#444] flex items-center justify-center group-hover:border-brand-accent transition-colors">
                                {item.checked && <div className="w-3 h-3 bg-brand-accent rounded-sm"></div>}
                            </div>
                            <span className="text-xs text-brand-text font-mono leading-tight pt-0.5">{item.label}</span>
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
                <p className="text-sm text-brand-text font-bold leading-relaxed font-mono">
                    {redacao.feedbackGeral.dicaOuro}
                </p>
                <div className="mt-4 text-[10px] text-brand-muted uppercase tracking-widest opacity-60">
                    Recomendação do Professor
                </div>
            </div>
        </div>

    </section>
  );
};

export default RedacaoView;