const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#1c1c17",
        green: "#97A307",
        grey: {
          light: "#C8C7B7",
          dark: "#47483B",
        },
        light: "#e5e2da",
        red: {
          light: "#FF5449",
          dark: "#BA1A1A",
        },

        primary: "#C2CF3E",
        "on-primary": "#2F3300",
        "primary-container": "#454B00",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
        },
      },
    },
    fontFamily: {
      sans: ["Helvetica, Helvetica Fallback", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
