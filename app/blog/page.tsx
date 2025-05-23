import HeroSection from '@/components/HeroSection'; 
import ServicesSection from '@/components/ServicesSection'; 
import ToolsSection from '@/components/ToolsSection'; 
import AboutSection from '@/components/AboutSection'; 
import ContactSection from '@/components/ContactSection';
import PortfolioSection from '@/components/PortfolioSection'; 
import BlogSection from '@/components/BlogSection';       
import { getAllPosts, PostData } from '@/lib/blogApi'; // Import PostData and getAllPosts

// This page is a Server Component, so we can fetch data directly here
export default function HomePage() {
  const allPosts = getAllPosts(['title', 'slug', 'excerpt', 'date']);
  const latestPosts = allPosts
    .sort((post1, post2) => new Date(post2.date || 0).getTime() - new Date(post1.date || 0).getTime())
    .slice(0, 2); // Get the latest 2 posts for the homepage

  return (
    <>
      <HeroSection />
      <ServicesSection /> 
      <ToolsSection /> 
      <AboutSection /> 
      <PortfolioSection /> 
      <BlogSection latestPosts={latestPosts} /> {/* Pass fetched posts as a prop */}
      <ContactSection />
    </>
  );
}