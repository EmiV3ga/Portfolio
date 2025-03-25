/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8d7b6d', // Darker warm gray for better contrast
          light: '#a5978b',   // Medium warm gray
          dark: '#6d5d4f',    // Deep warm gray
        },
        secondary: {
          DEFAULT: '#9c8878', // Warm taupe
          light: '#b6a494',   // Light taupe
          dark: '#826c5c',    // Dark taupe
        },
        accent: {
          DEFAULT: '#5c4742', // Liver (unchanged)
          light: '#776058',   // Lighter liver
          dark: '#412e2a',    // Darker liver
        },
        background: {
          DEFAULT: '#f8f5f2', // Lighter background for better contrast
          dark: '#5a2a27',    // Caput mortuum (unchanged)
        },
        form: {
          DEFAULT: '#ffffff', // Pure white for form backgrounds
          border: '#d1c7bd', // Warm gray for borders
          focus: '#8d7b6d',  // Darker warm gray for focus states
        },
        card: {
          DEFAULT: '#ffffff', // Pure white for card backgrounds
          hover: '#f8f5f2',  // Light warm gray for hover states
        },
        text: {
          DEFAULT: '#2d2420', // Very dark warm gray for primary text
          secondary: '#5c4742', // Liver for secondary text
          light: '#8d7b6d',    // Medium warm gray for tertiary text
        },
        button: {
          primary: {
            DEFAULT: '#5c4742', // Liver
            hover: '#412e2a',   // Darker liver
            text: '#ffffff',    // White text
          },
          secondary: {
            DEFAULT: '#9c8878', // Warm taupe
            hover: '#826c5c',   // Darker taupe
            text: '#ffffff',    // White text
          }
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#2d2420',
            a: {
              color: '#5c4742',
              '&:hover': {
                color: '#412e2a',
              },
            },
            h1: {
              color: '#2d2420',
            },
            h2: {
              color: '#2d2420',
            },
            h3: {
              color: '#2d2420',
            },
            strong: {
              color: '#2d2420',
            },
            code: {
              color: '#5c4742',
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