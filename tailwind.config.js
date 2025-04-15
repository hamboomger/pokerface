module.exports = {
  content: [
      './node_modules/preline/preline.js',
      './src/**/*.{html,js,svelte,ts}'
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      gridColumn: {
        'span-13': 'span 13 / span 13',
      },
      colors: {
        'primary': '#16C47F',
        'secondary': '#FFD65A',
        'thirdly': '#FF9D23',
        'accent': '#F93827',
        'primary-font-color': '#374151',
        // dark variants
        'primary-dark': '#1D2537',
        'secondary-dark': '#DDD',
        'thirdly-dark': '#393E46',
        'accent-dark': '#00ADB5',
        'primary-font-color-dark': '#DDD',
      },
    },
  },
  plugins: [
      require('@tailwindcss/forms'),
      require('preline/plugin'),
      require('tailwindcss-motion'), 
  ],
}
