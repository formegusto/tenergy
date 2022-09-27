/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    {
      pattern: /teal/,
    },
    {
      pattern: /cyan/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
