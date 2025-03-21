/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#69573B',
          light: '#79804D',
          dark: '#3E482A',
        },
        secondary: '#2D2920',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};