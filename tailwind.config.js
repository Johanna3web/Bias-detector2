/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index-react.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#fff5f9',
          100: '#ffe6f2',
          200: '#ffd4e8',
          300: '#ffc2de',
          400: '#ffaad4',
          500: '#ffb3d9',
          600: '#ff99cc',
          700: '#ff6b9d',
          800: '#8b5a6f',
          900: '#6b4456',
        }
      }
    },
  },
  plugins: [],
}
