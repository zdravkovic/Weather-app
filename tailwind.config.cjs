/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./*.{html,js}",
    "./components/UI/displayContent.js",
    "./components/searchHandlers/airPolutionSearch.js"
  ],
  safelist: [
    {
      pattern: /rotate-.+/
    }
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        ...defaultTheme.screens,
        'lg': '1030px'
      },
      colors: {
        'darker-blue': '#202E57',
        'dark-blue': '#2A3F69',
        'dark-light-blue': '#304681',
        'gray-text': '#A5B0CC',
        'gray-blue-text': '#5472AB',
        'forecast-blue': '#202F58',
        'light': '#FAFBFD',
        'light-gray-box': '#F3F5FA',
        'dark-blue-text': '#2A4069',
        'border-light': '#A5B0CC',
        'blue-background': '#D6E3F4',
        
        'air-good-bg': '#DDF5E7',
        'air-good-text': '#17B784',
      },
      fontFamily: {
        'display': ['Inter', 'sans-serif']
      },
      fontSize: {
        '2xs': '0.5rem'
      },
      gridTemplateRows:
      {
        '1fr/8': 'minmax(12rem, 18rem) 8rem',
        '1fr/8/8': 'minmax(12rem, 18rem) 8rem 8rem',
      },
      backgroundImage: {
        'uv-gradient': 'linear-gradient(to right, #4BEC42, #F7E816, #FF9D1C, #E42E37, #931FFF)',
        'main-image-gradient': `linear-gradient(to bottom, rgba(32, 46, 87, 0.8), rgba(32, 46, 87, 1) 70%), url('./img/firstScreen-background_1.jpg')`,
        'pressure-gradient': 'conic-gradient(from -125deg, #A5B0CC 60deg, transparent 0deg)',
        'firstScreen-belgrade-gradient': `linear-gradient(to right, rgba(32, 46, 87, .6) 40%, rgba(32, 46, 87, .2)), url('./img/firstScreen-belgrade.jpg')`,
        'firstScreen-berlin-gradient': `linear-gradient(to right, rgba(32, 46, 87, .6) 40%, rgba(32, 46, 87, .2)), url('./img/firstScreen-berlin.jpg')`,
        'firstScreen-paris-gradient': `linear-gradient(to right, rgba(32, 46, 87, .6) 40%, rgba(32, 46, 87, .2)), url('./img/firstScreen-paris.jpg')`,
        'firstScreen-madrid-gradient': `linear-gradient(to right, rgba(32, 46, 87, .6) 40%, rgba(32, 46, 87, .2)), url('./img/firstScreen-madrid.jpg')`,
        'firstScreen-belgrade-gradient-hover': `linear-gradient(to right, rgba(32, 46, 87, .3) 40%, rgba(32, 46, 87, .2)), url('./img/firstScreen-belgrade.jpg')`,
        'firstScreen-berlin-gradient-hover': `linear-gradient(to right, rgba(32, 46, 87, .3) 40%, rgba(32, 46, 87, .2)), url('./img/firstScreen-berlin.jpg')`,
        'firstScreen-paris-gradient-hover': `linear-gradient(to right, rgba(32, 46, 87, .3) 40%, rgba(32, 46, 87, .2)), url('./img/firstScreen-paris.jpg')`,
        'firstScreen-madrid-gradient-hover': `linear-gradient(to right, rgba(32, 46, 87, .3) 40%, rgba(32, 46, 87, .2)), url('./img/firstScreen-madrid.jpg')`,
      },
      boxShadow: {
        'wind-shadow': '0 0 15px rgb(42 64 105 / 0.3)'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
  variants: {
    scrollbar: ['rounded']
  }
}
