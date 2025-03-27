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
          DEFAULT: '#8d7b6d',
          light: '#a5978b',
          dark: '#6d5d4f',
        },
        secondary: {
          DEFAULT: '#9c8878',
          light: '#b6a494',
          dark: '#826c5c',
        },
        accent: {
          DEFAULT: '#5c4742',
          light: '#776058',
          dark: '#412e2a',
        },
        background: {
          DEFAULT: '#f8f5f2',
          dark: '#5a2a27',
        },
        form: {
          DEFAULT: '#ffffff',
          border: '#d1c7bd',
          focus: '#8d7b6d',
        },
        card: {
          DEFAULT: '#ffffff',
          hover: '#f8f5f2',
        },
        text: {
          DEFAULT: '#2d2420',
          secondary: '#5c4742',
          light: '#8d7b6d',
        },
        button: {
          primary: {
            DEFAULT: '#5c4742',
            hover: '#412e2a',
            text: '#ffffff',
          },
          secondary: {
            DEFAULT: '#9c8878',
            hover: '#826c5c',
            text: '#ffffff',
          }
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#2d2420',
            fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace',
            a: {
              color: '#5c4742',
              '&:hover': {
                color: '#412e2a',
              },
            },
            h1: {
              color: '#2d2420',
              fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace',
            },
            h2: {
              color: '#2d2420',
              fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace',
            },
            h3: {
              color: '#2d2420',
              fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace',
            },
            strong: {
              color: '#2d2420',
            },
            code: {
              color: '#5c4742',
              fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace',
            },
            figcaption: {
              color: '#8d7b6d',
            },
          },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};