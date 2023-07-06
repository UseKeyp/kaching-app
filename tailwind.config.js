/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js, tsx, jsx}",
    "./public/**/*.html",
    "./node_modules/@usekeyp/ui-kit/**/*.{js, jsx, ts, tsx, md}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@usekeyp/ui-kit/plugin")],
};
