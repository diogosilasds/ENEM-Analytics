import React, { useState } from 'react';
import { AlertTriangle, Database, Info, Lock, ArrowRight, Github } from 'lucide-react';

export const SystemArchivedModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="max-w-2xl w-full max-h-[90vh] flex flex-col bg-[#0f0f11] border border-brand-accent shadow-[0_0_50px_rgba(0,255,159,0.2)] rounded-lg overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-accent via-brand-pink to-brand-accent flex-shrink-0"></div>
        
        <div className="p-5 sm:p-6 md:p-8 overflow-y-auto flex-1">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500/10 border border-red-500/30 rounded flex items-center justify-center text-red-500 flex-shrink-0">
              <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-display font-black text-white tracking-wider">SISTEMA ARQUIVADO</h1>
              <p className="text-brand-pink font-mono text-[10px] sm:text-xs uppercase tracking-widest mt-1">Fim de Vida Útil (End of Life)</p>
            </div>
          </div>

          <div className="space-y-4 mb-8 text-brand-muted font-sans text-xs sm:text-sm leading-relaxed">
            <p className="text-white text-sm sm:text-base">
              Atenção: O desenvolvimento deste sistema foi <strong className="text-brand-accent">encerrado permanentemente</strong> e colocado em estado de hibernação. Ele não receberá mais atualizações ou correções.
            </p>
            
            <div className="bg-brand-surface border border-brand-border p-4 rounded-md flex flex-col sm:flex-row gap-3">
              <Info className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5 hidden sm:block" />
              <div>
                <p className="font-bold text-white mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-brand-accent sm:hidden" />
                  Motivo da Descontinuação
                </p>
                <p>O desenvolvimento foi encerrado em razão da adoção de outra plataforma que já contempla todas as funcionalidades anteriormente oferecidas por este software de forma nativa e integrada, incluindo:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Dashboards dinâmicos</li>
                  <li>Análise baseada em Teoria da Resposta ao Item (TRI)</li>
                  <li>Geração avançada de gráficos e vetores</li>
                  <li>Correção algorítmica e análise de redações</li>
                </ul>
              </div>
            </div>

            <p>
              O código-fonte será mantido estritamente para <strong>consulta histórica e referência técnica</strong>. O estado atual representa sua última configuração funcional e encontra-se congelado. Sem manutenção ativa, não há qualquer previsão tecnológica de retomada do desenvolvimento.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-brand-accent text-black font-bold flex items-center justify-center gap-2 rounded hover:bg-brand-accent/80 transition-colors text-xs sm:text-sm"
            >
              <Database className="w-4 h-4" />
              <span>ACESSAR ARQUIVO HISTÓRICO</span>
            </button>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-brand-surface border border-brand-border text-brand-text font-bold flex items-center justify-center gap-2 rounded hover:bg-white/5 transition-colors text-xs sm:text-sm"
            >
              <Github className="w-4 h-4" />
              <span>VER NO GITHUB</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PermanentWarningBanner: React.FC = () => {
  return (
    <div className="w-full bg-red-950/40 border-b border-red-500/50 p-2 flex items-center justify-center gap-3 z-50 relative pointer-events-none">
      <AlertTriangle className="w-4 h-4 text-red-500" />
      <span className="text-red-200 font-mono text-xs text-center uppercase">
        <strong className="text-red-400">STATUS: DESCONTINUADO.</strong> O sistema não receberá atualizações. Mantido apenas como arquivo histórico.
      </span>
    </div>
  );
};
