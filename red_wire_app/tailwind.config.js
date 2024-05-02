/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#DCF2F1",
          secondary: "#7FC7D9"
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
