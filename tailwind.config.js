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
        'global-gray': '#C9BEF6',
        'dark-gray': '#D1D6D4',
        'bg-green': '#F5F5FF',
        'cico-green': '#00BD7A',
        'icon-purple': '#3e215b',
        'light-deep-green': '#136739',
        'light-orange': '#FEF8F0',
        'airtime': '#FBEAE9',
        'loan': '#EBFFE9',
        'failed': '#FF1919',
        'text-orange': '#FF9212',
        'btn-purple': '#173C68',
        'color1': '#1F1474',
        'color2': '#800D8E',
        'border-primary': '#B640EE1F',
        'global-light': '#ECE9FC'
      },
      backgroundImage: {
        'bg-pattern': "url('https://ik.imagekit.io/jumzeey/pattern%20blue_UXHEh5VMB.svg?updatedAt=1701854252935')",
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
      linearGradientColors: {
        bgGradient: {
          0: 'rgba(31, 20, 116, 1)',
          100: 'rgba(128, 13, 142, 1)',
        },
      }
    },
  },
  plugins: [
    require('tailwindcss-gradients'),
  ],
}


