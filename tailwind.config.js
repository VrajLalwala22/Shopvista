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
          DEFAULT: '#2A4365',
          light: '#3B5C8F',
          dark: '#1A365D',
        },
        secondary: {
          DEFAULT: '#718096',
          light: '#A0AEC0',
          dark: '#4A5568',
        },
      },
    },
  },
  plugins: [],
} 