/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B2B26', // Verde oscuro
          dark: '#0B2B26',    // Verde oscuro (modo oscuro)
        },
        secondary: {
          DEFAULT: '#163832', // Verde medio
          dark: '#163832',    // Verde medio (modo oscuro)
        },
        background: {
          DEFAULT: '#DAF1DE', // Verde claro (modo claro)
          dark: '#0B2B26',    // Verde oscuro (modo oscuro)
        },
        text: {
          DEFAULT: '#0B2B26', // Verde oscuro (modo claro)
          dark: '#DAF1DE',    // Verde claro (modo oscuro)
        },
        accent: {
          DEFAULT: '#8EB69B', // Verde suave
          dark: '#8EB69B',    // Verde suave (modo oscuro)
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Habilita el modo oscuro basado en clases
};