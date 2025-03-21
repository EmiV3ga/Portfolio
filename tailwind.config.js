/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#12372A', // Verde oscuro
          dark: '#12372A',    // Verde oscuro (modo oscuro)
        },
        secondary: {
          DEFAULT: '#436850', // Verde medio
          dark: '#436850',    // Verde medio (modo oscuro)
        },
        background: {
          DEFAULT: '#FBFADA', // Amarillo claro (modo claro)
          dark: '#12372A',    // Verde oscuro (modo oscuro)
        },
        text: {
          DEFAULT: '#12372A', // Verde oscuro (modo claro)
          dark: '#FBFADA',    // Amarillo claro (modo oscuro)
        },
        accent: {
          DEFAULT: '#ADBC9F', // Verde claro
          dark: '#ADBC9F',    // Verde claro (modo oscuro)
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Habilita el modo oscuro basado en clases
};