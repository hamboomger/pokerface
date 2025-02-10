module.exports = {
  content: [
      './node_modules/preline/preline.js',
      './src/**/*.{html,js,svelte,ts}'
  ],
  theme: {
    extend: {
      gridColumn: {
        'span-13': 'span 13 / span 13',
      }
    }
  },
  plugins: [
      require('@tailwindcss/forms'),
      require('preline/plugin'),
      require('tailwindcss-motion'), 
  ],
}
