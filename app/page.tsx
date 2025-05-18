
import HeroSection from '@/components/HeroSection'; 
import ServicesSection from '@/components/ServicesSection'; 
import ToolsSection from '@/components/ToolsSection'; 
import AboutSection from '@/components/AboutSection'; 
import ContactSection from '@/components/ContactSection';
import PortfolioSection from '@/components/PortfolioSection'; // Import new component
import BlogSection from '@/components/BlogSection';       // Import new component


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection /> 
      <ToolsSection /> 
      <AboutSection /> 
      <PortfolioSection /> 
      <BlogSection />
      <ContactSection />
    </>
  );
}