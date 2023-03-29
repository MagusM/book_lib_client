/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FC2986",
        secondary: "#12203B",
        tertiary: "#7F8884"
      },
      screens: {
        xs: "450px"
      }
    },
  },
  plugins: [],
}