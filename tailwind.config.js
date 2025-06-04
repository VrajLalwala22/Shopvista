/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e4a3b',
          light: '#2a5c4a',
          dark: '#123828',
        },
        secondary: {
          DEFAULT: '#ffffff',
          dark: '#f3f4f6',
        },
        accent: {
          DEFAULT: '#1e2a3b',
          light: '#2a3b50',
          dark: '#0f1524',
        }
      },
    },
  },
  plugins: [],
} 