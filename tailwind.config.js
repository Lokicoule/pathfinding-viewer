/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Allerta Stencil", "sans-serif"],
        secondary: ["Inter", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
