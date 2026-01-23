
export interface RedacaoLine {
  lineNumber: number;
  text: string;
  errors?: { term: string; correction: string; type: 'grammar' | 'cohesion' | 'structure' | 'intervention'; description: string }[];
}

export interface RedacaoCompetencia {
  id: string; // c1, c2, c3...
  nome: string;
  nota: number;
  meta: number;
  descricao: string;
}

export interface RedacaoGuiaPasso {
  titulo: string;
  descricao: string;
}

export interface RedacaoManual {
  titulo: string;
  passos: RedacaoGuiaPasso[];
  dicasGramaticais: string;
  vocabularioJuizo: string[];
  notaFinal: string;
}

export interface RedacaoReescritaItem {
  titulo: string;
  problema: string;
  comoMelhorar: string;
  original: string;
  corrigido: string;
  explicacao: string;
}

export interface RedacaoReescrita {
  intro: string;
  exemplos: RedacaoReescritaItem[];
  resumoPratico?: {
    titulo: string;
    itens: string[];
  };
}

export interface RedacaoSpecificData {
  temaSugrido: string;
  textoTranscrito: RedacaoLine[];
  paragraphStarts?: number[];
  competencias: RedacaoCompetencia[];
  feedbackGeral: {
    pontosFortes: string[];
    pontosFracos: string[];
    dicaOuro: string;
  };
  checklist: { label: string; checked: boolean }[];
  manualConstrucao?: RedacaoManual; 
  reescrita?: RedacaoReescrita;
  vicios?: { termo: string; ocorrencias: number; limite: number }[];
}
