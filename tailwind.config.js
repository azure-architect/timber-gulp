/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  '/views/**/*.twig',
  '/dist/css/prod.css',
  '*.php'
],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite')
  ],
}

