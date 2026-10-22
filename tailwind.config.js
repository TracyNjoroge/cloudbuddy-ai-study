/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef2ff',
          100: '#dbe3ff',
          200: '#b8c7ff',
          300: '#8da6ff',
          400: '#5f7fff',
          500: '#3b5bdb',
          600: '#2c43b8',
          700: '#2337a0',
          800: '#1a2a6e',
          900: '#0f1c4d',
          950: '#0a1230',
        },
        accent: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(15, 28, 77, 0.08)',
        card: '0 8px 30px -6px rgba(15, 28, 77, 0.12)',
        glow: '0 0 0 4px rgba(95, 127, 255, 0.15)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out',
        pulseSoft: 'pulseSoft 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
