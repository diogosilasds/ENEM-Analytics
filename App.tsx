
import React from 'react';
import Dashboard from './components/Dashboard';
import { ThemeProvider } from './contexts/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="w-full min-h-screen bg-brand-bg text-brand-text selection:bg-brand-accent/30 selection:text-black">
        <Dashboard />
      </div>
    </ThemeProvider>
  );
};

export default App;
