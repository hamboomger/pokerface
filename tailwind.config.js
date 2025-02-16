module.exports = {
  content: [
      './node_modules/preline/preline.js',
      './src/**/*.{html,js,svelte,ts}'
  ],
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
        // dark variants
        'primary-dark': '#27374D',
        'secondary-dark': '#EEEEEE',
        'thirdly-dark': '#393E46',
        'accent-dark': '#00ADB5',
        // 'primary-dark': '#4635B1',
        // 'secondary-dark': '#B771E5',
        // 'thirdly-dark': '#AEEA94',
        // 'accent-dark': '#FFFBCA',
      },
      // colors: {
      //   'primary': '#B5C0D0',
      //   'secondary': '#CCD3CA',
      //   'thirdly': '#F5E8DD',
      //   'accent': '#EED3D9'
      // }
    },
  },
  plugins: [
      require('@tailwindcss/forms'),
      require('preline/plugin'),
      require('tailwindcss-motion'), 
  ],
}
