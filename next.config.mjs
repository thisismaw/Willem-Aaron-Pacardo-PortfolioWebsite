/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Important for static export to GitHub Pages
  images: {
    unoptimized: true, // Disable Next.js Image Optimization for static export
  },
   basePath: '/Willem-Aaron-Pacardo-PortfolioWebsite', 
   assetPrefix: '/Willem-Aaron-Pacardo-PortfolioWebsite',
  // Make sure this is your actual repository name if you uncomment it.
  // For example, if your GitHub Pages URL will be https://iAMawi.github.io/willem-pacardo-portfolio/
  // then basePath should be '/willem-pacardo-portfolio'
};

export default nextConfig; // Use ES Module export