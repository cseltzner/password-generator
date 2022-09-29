/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans Mono", "monospace"],
      },
      colors: {
        "primary-mint": "#aff8ba",
        "secondary-yellow": "#f4cc64",
        "surface-dark": "#18171f",
        "surface-light": "#24232b",
        "text-light": "#c9c7d0",
      },
    },
  },
  plugins: [],
};
