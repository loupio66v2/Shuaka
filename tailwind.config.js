/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        'primary-glow': '#8b5cf6',
        secondary: '#22d3ee',
        'secondary-foreground': '#0f172a',
        background: '#0f172a',
        card: '#0b1021',
        border: 'rgba(255,255,255,0.08)',
        'muted-foreground': '#cbd5e1',
      },
      boxShadow: {
        card: '0 18px 40px rgba(0,0,0,0.25)',
        elevated: '0 20px 50px rgba(99,102,241,0.35)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
