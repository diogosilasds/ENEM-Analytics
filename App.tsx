
import React from 'react';
import Dashboard from './components/Dashboard';
import { ThemeProvider } from './contexts/ThemeContext';
import { useAuth } from './contexts/AuthContext';
import { LogIn } from 'lucide-react';

const App: React.FC = () => {
  const { user, loading, signInWithGoogle } = useAuth();

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-brand-bg flex items-center justify-center">
        <div className="text-brand-accent font-mono animate-pulse">CARREGANDO SISTEMA...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="w-full min-h-screen bg-brand-bg flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-brand-card border border-brand-border p-8 rounded-xl text-center shadow-[0_0_30px_rgba(0,255,159,0.1)]">
          <h1 className="text-3xl font-display font-black text-brand-text mb-2 tracking-tighter">
            ENEM <span className="text-brand-accent">ANALYTICS</span>
          </h1>
          <p className="text-brand-muted font-mono text-sm mb-8">
            SISTEMA DE ANÁLISE PREDITIVA v2.0
          </p>
          
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 bg-brand-accent text-black font-bold py-3 px-6 rounded-lg hover:bg-brand-accent/90 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,159,0.4)]"
          >
            <LogIn className="w-5 h-5" />
            <span>ACESSAR COM GOOGLE</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="w-full min-h-screen bg-brand-bg text-brand-text selection:bg-brand-accent/30 selection:text-black">
        <Dashboard />
      </div>
    </ThemeProvider>
  );
};

export default App;
