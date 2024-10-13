/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#46BEB3',
        secondary: '#C4E7F3',
        accent1: '#027A7F',
        accent2: '#0B132A',
        text: '#C4E7F3',
        background: '#0B132A',
        hover: '#0B3C3D',
        border: '#C4E7F3',
      },
    },
  },
  plugins: [],
}