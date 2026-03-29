/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}", "./components/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '380px',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'monospace'],
        sans: ['var(--font-sans)', 'sans-serif'],
        display: ['var(--font-display)', 'serif'],
      },
      colors: {
        brand: {
          accent: 'var(--color-accent)',
          emerald: 'var(--color-emerald)',
          yellow: 'var(--color-yellow)',
          cyan: 'var(--color-cyan)',
          pink: 'var(--color-pink)',
          violet: 'var(--color-violet)',
          neutral: 'var(--color-neutral)',
          bg: 'var(--color-bg)',
          text: 'var(--color-text-primary)',
          muted: 'var(--color-text-secondary)',
          card: 'var(--color-card-bg)',
          border: 'var(--color-border)',
          grid: 'var(--color-grid)'
        }
      }
    },
  },
  plugins: [],
}