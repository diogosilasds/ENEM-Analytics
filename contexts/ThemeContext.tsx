
import React from 'react';

export const ThemeContext = React.createContext<{
  theme: 'dark';
}>({ theme: 'dark' });

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};
