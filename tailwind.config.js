/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  '/src/css/style.css',   // Adjusted to the style import point
    './views/**/*.twig',  // Adjusted path to be relative
    './*.php'             // Adjusted path to be relative
],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite')
  ],
}

