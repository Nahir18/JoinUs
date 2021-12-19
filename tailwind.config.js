const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      flex: {
        'min-with': '0 0 auto',

      },
      margin: {
        't-a': 'auto',
        'b-a': 'auto',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
