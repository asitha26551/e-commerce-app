/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0e1a', // Near black
        surface: '#1a1f35', // Dark blue-gray
        primary: '#a855f7', // Neon purple
        accent: '#06b6d4', // Electric cyan
        cta: '#84cc16', // Neon lime green
        text: '#ffffff', // White
        'text-secondary': '#94a3b8', // Light gray
        success: '#10b981', // Neon green
        error: '#f43f5e', // Hot pink
        border: '#2d3548', // Subtle dark border
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
      boxShadow: {
        'neon-purple':
          '0 0 10px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3)',
        'neon-cyan':
          '0 0 10px rgba(6, 182, 212, 0.5), 0 0 20px rgba(6, 182, 212, 0.3)',
        'neon-lime':
          '0 0 10px rgba(132, 204, 22, 0.5), 0 0 20px rgba(132, 204, 22, 0.3)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s infinite',
        'scan-line': 'scan-line 8s linear infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(132, 204, 22, 0.5)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(132, 204, 22, 0.8)',
          },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
}
