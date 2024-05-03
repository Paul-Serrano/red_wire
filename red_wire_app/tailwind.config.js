/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    screens: {
      "xsm": "500px",
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        background: {
          primary: "#DCF2F1",
          secondary: "#7FC7D9",
          tertiary: "#0F1035"
        },
        button: {
          primary: "#7FC7D9",
          secondary: "#365486"
        },
        textColor: "#0F1035"
      }
    },
    fontFamily: {
      anta: ["Anta", "sans-serif"]
    }
  },
  plugins: [],
};
