"use client"; 
import React, { useEffect, useRef, useState } from 'react'; 
import Image from 'next/image'; 
interface HeroSectionProps { baseDelay?: string; }
const HeroSection = ({ baseDelay = "0s" }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null); 
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const currentRef = sectionRef.current; 
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { setIsVisible(true); if (currentRef) observer.unobserve(currentRef); } }); }, { threshold: 0.1 } );
    if (currentRef) { observer.observe(currentRef); }
    return () => { if (currentRef) { observer.unobserve(currentRef); } };
  }, []); 
  return (
    <header id="home" ref={sectionRef} className={`bg-white text-slate-900 min-h-[calc(100vh-68px)] flex items-center justify-center py-12 sm:py-16 px-4 overflow-hidden ${isVisible ? 'is-visible' : ''} fade-in-section`} style={{ transitionDelay: isVisible ? baseDelay : '0s' }}>
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-12 lg:gap-16">
          <div className="md:w-1/2 lg:w-3/5 text-center md:text-left order-2 md:order-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight tracking-tight text-slate-800"> Helping Busy Entrepreneurs Stay Organized <span className="block sm:inline text-cyan-700">& Grow Their Business</span> </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 font-normal text-slate-600 max-w-xl mx-auto md:mx-0"> I help consultants, coaches, and e-commerce brands streamline their operations, manage tasks, and focus on what matters most — growing their revenue. </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#services" onClick={(e) => { e.preventDefault(); document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full sm:w-auto inline-block bg-cyan-700 text-white hover:bg-cyan-800 font-semibold py-3 px-6 sm:py-3 sm:px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-base sm:text-lg" > Discover My Services </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }} className="w-full sm:w-auto inline-block bg-transparent border-2 border-cyan-700 text-cyan-700 hover:bg-cyan-700 hover:text-white font-semibold py-3 px-6 sm:py-3 sm:px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-base sm:text-lg" > Let&apos;s Work Together </a>
            </div>
          </div>
          <div className="md:w-1/2 lg:w-2/5 order-1 md:order-2 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-xl"> 
              <Image src="/images/willem-hero.png" alt="Willem Pacardo - Digital Operations Expert" fill sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px" className="object-cover" priority onError={(e) => { const target = e.target as HTMLImageElement; target.onerror = null; console.error("Hero image failed to load:", target.src); target.parentElement?.classList.add('bg-slate-200'); target.style.display = 'none'; }} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default HeroSection;