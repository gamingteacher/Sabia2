/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d2691e",
        secondary: "#fed303",
        background: "#f8e8dd",
        "text-dark": "#ffffff", 
        "text-light": "#fcf7f3",
      },
    },
  },
  plugins: [],
}
