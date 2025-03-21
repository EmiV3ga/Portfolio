/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A90E2', // Azul suave (modo claro)
          dark: '#6A1B9A',    // Morado profundo (modo oscuro)
        },
        secondary: {
          DEFAULT: '#50E3C2', // Verde menta (modo claro)
          dark: '#00BFA5',    // Verde azulado (teal, modo oscuro)
        },
        background: {
          DEFAULT: '#F5F5F5', // Gris claro (modo claro)
          dark: '#121212',    // Gris oscuro (modo oscuro)
        },
        text: {
          DEFAULT: '#333333', // Gris oscuro (modo claro)
          dark: '#E0E0E0',   // Gris claro (modo oscuro)
        },
        accent: {
          DEFAULT: '#FF6F61', // Coral (modo claro)
          dark: '#FF8A65',    // Naranja oscuro (modo oscuro)
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Habilita el modo oscuro basado en clases
};