/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'Courier', 'monospace'],
        sans: ['SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', 'Courier', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#424242',
          light: '#F1F1F1',
          dark: '#121212',
        },
        secondary: {
          DEFAULT: '#00695C',
          light: '#D7CCC8',
          dark: '#4E2C2C',
        },
        accent: {
          DEFAULT: '#29434E',
          light: '#F1F1F1',
          dark: '#333333',
        },
        background: {
          DEFAULT: '#E0E0E0',
          dark: '#121212',
        },
        form: {
          DEFAULT: '#FFFFFF',
          border: '#424242',
          focus: '#00695C',
        },
        card: {
          DEFAULT: '#FFFFFF',
          hover: '#F5F5F5',
        },
        text: {
          DEFAULT: '#424242',
          secondary: '#00695C',
          light: '#F1F1F1',
        },
        button: {
          primary: {
            DEFAULT: '#FFFFFF',
            hover: '#F5F5F5',
            text: '#333333',
          },
          secondary: {
            DEFAULT: '#333333',
            hover: '#29434E',
            text: '#FFFFFF',
          }
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#424242',
            fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace',
            a: {
              color: '#00695C',
              '&:hover': {
                color: '#004D40',
              },
            },
            h1: {
              color: '#424242',
              fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace',
            },
            h2: {
              color: '#424242',
              fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace',
            },
            h3: {
              color: '#424242',
              fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace',
            },
            strong: {
              color: '#424242',
            },
            code: {
              color: '#00695C',
              fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace',
            },
            figcaption: {
              color: '#F1F1F1',
            },
          },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};