/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#69573B', // Color principal (marrón)
          light: '#79804D',   // Color secundario (verde oliva)
          dark: '#3E482A',    // Color oscuro (verde oscuro)
        },
        secondary: '#2D2920', // Color de fondo oscuro (casi negro)
      },
    },
  },
  plugins: [],
  darkMode: 'class', // Habilita el modo oscuro basado en clases
};