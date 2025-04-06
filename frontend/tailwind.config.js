/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E5D9B6',
        'primary-green': '#E9EDC9',
        'secondary-green': '#FEFAE0',
        'dark-green': '#FAEDCD',
        'light-green': '#F9DCC4',
        // 'secondary-light-green':'#EDF1D6',
        // 'secondary-dark':'#9DC08B',
        // 'secondary-darker':'#609966',
        // 'secondary-darkest':'#40513B',
      },
    },
  },
  plugins: [],
}
