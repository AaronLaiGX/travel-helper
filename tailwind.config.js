/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        japanRed: '#bc002d',
        japanBlue: '#0f2350',
        softGray: '#f5f5f7',
      }
    },
  },
  plugins: [],
}
