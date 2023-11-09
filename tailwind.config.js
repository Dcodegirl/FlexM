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
        'cico-green': '#00BD7A',
        'icon-purple': '#3e215b',
        'light-deep-green': '#136739',
        'light-orange': '#FEF8F0',
        'airtime': '#FBEAE9',
        'loan': '#EBFFE9'
      },
      backgroundImage: {
        'bg-pattern': "url('https://ik.imagekit.io/jumzeey/Pattern_dMgXzGdMK.svg?updatedAt=1699268313022')",
        'bg-card1': "url('https://ik.imagekit.io/jumzeey/Group%201000006799_t01qa_xGX.svg?updatedAt=1699369458572')",
        'bg-card2': "url('https://ik.imagekit.io/jumzeey/Group%201000006800%20(1)_g9psrqnYD.svg?updatedAt=1699369458435')",
        'bg-card3': "url('https://ik.imagekit.io/jumzeey/Group%201000006801_r5D5OJDAv.svg?updatedAt=1699369501876')",
      },
      styles: {
        '.navItemImage': {
          fill: '#3e215b',
          stroke: '#3e215b',
        },
      },
    },
  },
  plugins: [],
}


