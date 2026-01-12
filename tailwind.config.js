/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#0891b2", // Cyan 600
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        logo: ['var(--font-rock-salt)'],
      },
    },
  },
  plugins: [],
}