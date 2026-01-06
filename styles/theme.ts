/**
 * Fonte única de verdade para estilos que precisam ser injetados via JavaScript 
 * (ex: cores de preenchimento do Recharts).
 * Apenas modo Dark é suportado agora.
 */

export const getThemeColors = (isDark: boolean = true) => {
  return {
    bg: '#050505',
    text: '#ffffff',     // Branco puro para máximo contraste
    muted: '#a3a3a3',    // Cinza claro (Neutral 400) para textos secundários e eixos
    accent: '#00ff9f',
    cyan: '#00f3ff',
    pink: '#ff0055',
    yellow: '#f3e600',
    purple: '#bd00ff',
    neutral: '#262626',  // Cinza médio para elementos de fundo secundário
    grid: 'rgba(255, 255, 255, 0.15)', // Grid mais visível (15% opacidade)
    border: '#333333',   // Borda mais clara
    emerald: '#10b981'
  };
};

export const getColorWithOpacity = (hex: string, opacity: number) => {
  if (!hex || !hex.startsWith('#')) return hex;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};