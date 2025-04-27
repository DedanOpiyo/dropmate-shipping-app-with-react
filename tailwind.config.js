/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Using 'class' instead of 'media'
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/flowbite/**/*.js', // key to flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // the plugin(for flowbite)
  ],
}