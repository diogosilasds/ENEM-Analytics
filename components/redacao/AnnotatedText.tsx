
import React, { useState } from 'react';
import { Edit3 } from 'lucide-react';
import { RedacaoLine } from '../../types';

interface AnnotatedTextProps {
  lines: RedacaoLine[];
  paragraphStarts?: number[];
}

const AnnotatedText: React.FC<AnnotatedTextProps> = ({ lines, paragraphStarts = [] }) => {
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
                {lines.map((line) => {
                    const isStartOfParagraph = paragraphStarts.includes(line.lineNumber);
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

export default AnnotatedText;
