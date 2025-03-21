/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3A4D39', // Verde oscuro
          dark: '#ECE3CE',    // Beige claro (modo oscuro)
        },
        secondary: {
          DEFAULT: '#4F6F52', // Verde medio
          dark: '#739072',    // Verde suave (modo oscuro)
        },
        background: {
          DEFAULT: '#ECE3CE', // Beige claro (modo claro)
          dark: '#3A4D39',    // Verde oscuro (modo oscuro)
        },
        text: {
          DEFAULT: '#3A4D39', // Verde oscuro (modo claro)
          dark: '#ECE3CE',    // Beige claro (modo oscuro)
        },
        accent: {
          DEFAULT: '#739072', // Verde suave
          dark: '#4F6F52',    // Verde medio (modo oscuro)
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Habilita el modo oscuro basado en clases
};