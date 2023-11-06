/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-green': '#003321',
        'progress-green': '#00B378',
        'progress-light': '#BEFEE9',
        'global-gray': '#848D9F',
        'dark-gray': '#D1D6D4',
        'bg-green': '#EAF8F8',
        'cico-green': '#00BD7A'
      },
      backgroundImage: {
        'bg-pattern': "url('https://ik.imagekit.io/jumzeey/Pattern_dMgXzGdMK.svg?updatedAt=1699268313022')"
      }
    },
  },
  plugins: [],
}

