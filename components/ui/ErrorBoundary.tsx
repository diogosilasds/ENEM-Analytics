
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-12 bg-[#0a0a0c] border border-brand-pink/30 cyber-shape relative overflow-hidden min-h-[400px]">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,85,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,85,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 bg-brand-pink/20 border border-brand-pink flex items-center justify-center rounded-full animate-pulse">
              <AlertTriangle className="w-8 h-8 text-brand-pink" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-black font-display text-white tracking-widest uppercase italic">
                CRITICAL_SYSTEM_FAILURE
              </h2>
              <p className="text-brand-muted font-mono text-xs max-w-md mx-auto leading-relaxed">
                O subsistema de visualização encontrou um erro fatal ao processar os dados de telemetria. 
                <br/>
                <span className="text-brand-pink/70 mt-2 block">
                  {this.state.error?.message || 'Unknown Error'}
                </span>
              </p>
            </div>

            <button 
              onClick={this.handleReset}
              className="flex items-center gap-2 px-6 py-2 bg-brand-pink text-white font-bold font-display text-[10px] tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300"
            >
              <RefreshCw className="w-3 h-3" />
              REINICIALIZAR_SISTEMA
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
