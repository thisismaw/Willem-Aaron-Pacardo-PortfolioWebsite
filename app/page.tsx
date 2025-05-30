import HeroSection from '@/components/HeroSection'; 
import ServicesSection from '@/components/ServicesSection'; 
import ToolsSection from '@/components/ToolsSection'; 
import AboutSection from '@/components/AboutSection'; 
import ContactSection from '@/components/ContactSection';
import PortfolioSection from '@/components/PortfolioSection'; 
// BlogSection and blogApi imports are removed

export default function HomePage() {
  // Logic for fetching latestPosts is removed
  return (
    <>
      <HeroSection /> 
      <ServicesSection baseDelay="0.2s" /> 
      <ToolsSection  /> 
      <AboutSection  /> 
      <PortfolioSection baseDelay="0.3s" /> 
      <ContactSection  />
    </>
  );
}