/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Montserrat"', "system-ui", "-apple-system", "sans-serif"],
        display: ['"Oswald"', "system-ui", "-apple-system", "sans-serif"],
      },
      colors: {
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e",
        },
        sand: {
          50: "#fefdfb",
          100: "#fdf8f0",
          200: "#f9eed9",
          300: "#f3dfb8",
          400: "#e8c88a",
        },
      },
    },
  },
  plugins: [],
};
