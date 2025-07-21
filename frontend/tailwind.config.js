/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'deep-dark': '#101010',
        'light-dark': '#181818',
        'brand': {
          'purple': '#8B5CF6',
          'light': '#A78BFA',
        },
      },
    },
  },
  plugins: [],
};