
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // dark blue
        accent: '#3B82F6', // bright blue
        cta: '#F97316', // orange
        background: '#F4F4F5', // light gray
        card: '#FFFFFF', // white
        text: '#111827', // dark gray
        success: '#10B981', // green
        error: '#EF4444', // red
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
