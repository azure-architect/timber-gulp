/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '/src/css/style.css',   // For using @apply in your custom CSS
    './views/**/*.twig',    // Your Twig files
    './*.php'               // PHP files in the root directory
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite'),    // Make sure Flowbite is installed via npm
  ],
};
