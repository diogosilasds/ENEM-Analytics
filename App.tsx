
import React from 'react';
import Dashboard from './components/Dashboard';
import { ThemeProvider } from './contexts/ThemeContext';
import { SystemArchivedModal, PermanentWarningBanner } from './components/SystemArchived';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="w-full min-h-screen flex flex-col bg-brand-bg text-brand-text selection:bg-brand-accent/30 selection:text-black">
        <PermanentWarningBanner />
        <SystemArchivedModal />
        <div className="flex-1 overflow-auto">
          <Dashboard />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
