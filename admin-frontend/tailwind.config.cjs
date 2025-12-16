/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        accent: '#64748b',
        cta: '#f97316',
        text: '#111827',
        background: '#f8fafc',
        error: '#ef4444'
      }
    }
  },
  plugins: [],
}
