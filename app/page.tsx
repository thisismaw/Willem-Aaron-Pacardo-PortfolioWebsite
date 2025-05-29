import HeroSection from '@/components/HeroSection'; 
import ServicesSection from '@/components/ServicesSection'; 
import ToolsSection from '@/components/ToolsSection'; 
import AboutSection from '@/components/AboutSection'; 
import ContactSection from '@/components/ContactSection';
import PortfolioSection from '@/components/PortfolioSection';       


// This page is a Server Component, so we can fetch data directly here
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection /> 
      <ToolsSection /> 
      <AboutSection /> 
      <PortfolioSection /> 
      <ContactSection />
    </>
  );
}
