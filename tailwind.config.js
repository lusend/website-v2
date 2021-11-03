module.exports = {
  mode: 'jit',
  important: '.prose',
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.md',
    './src/**/*.njk',
    './config/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')]
};
