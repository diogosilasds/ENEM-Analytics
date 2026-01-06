import React from 'react';
import Dashboard from './components/Dashboard';

// O Contexto agora apenas fornece valores estáticos para compatibilidade, 
// mas sem a função de toggle.
export const ThemeContext = React.createContext<{
  theme: 'dark';
}>({ theme: 'dark' });

const App: React.FC = () => {
  return (
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      <div className="w-full min-h-screen bg-brand-bg text-brand-text selection:bg-brand-accent/30 selection:text-black">
        <Dashboard />
      </div>
    </ThemeContext.Provider>
  );
};

export default App;