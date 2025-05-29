/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Important for static export to GitHub Pages
  // Optional: If you have issues with images on GitHub Pages, you might need this:
  // images: {
  //   unoptimized: true, 
  // },
  // Optional: If deploying to username.github.io/repository-name, add basePath:
  // basePath: '/your-repository-name', 
};

module.exports = nextConfig;


// File: tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", 
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans], 
        montserrat: ['Montserrat', 'sans-serif'], 
        outfit: ['Outfit', 'sans-serif'], 
        rocksalt: ['"Rock Salt"', 'cursive'], 
      },
      colors: { 
        cyan: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490', 
          800: '#155e75',
          900: '#164e63',
        },
        slate: defaultTheme.colors.slate, 
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'), 
    require('@tailwindcss/aspect-ratio'), 
  ],
};