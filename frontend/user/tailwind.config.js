/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      color: {
        primary: "#000000",
        secondary: "#DB4444",
      },
    },
  },
  plugins: [],
};
