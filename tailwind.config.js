/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        poppins: ["Poppins", "sans-serif"],
        "work-sans": ["Work Sans", "sans-serif"],
      },
      fontSize: {
        h1: [
          "var(--font-size-h1)",
          {
            lineHeight: "var(--line-height-h1)",
            fontWeight: "var(--font-weight-h1)",
          },
        ],
        // other heading styles
      },
    },
  },
  plugins: [],
};
