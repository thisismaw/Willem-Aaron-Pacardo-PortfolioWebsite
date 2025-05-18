"use client"; 

import React, { useEffect, useRef, useState } from 'react'; 
import Image from 'next/image'; 

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null); 
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); 
          }
        });
      },
      { threshold: 0.1 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <header 
      id="home" 
      ref={sectionRef} 
      // UPDATED: Changed bg-slate-50 to bg-white for a brighter, more minimalistic hero
      className={`bg-white text-slate-900 min-h-[calc(100vh-68px)] flex items-center justify-center py-12 sm:py-16 px-4 overflow-hidden ${isVisible ? 'is-visible' : ''} fade-in-section`}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="md:w-1/2 lg:w-3/5 text-center md:text-left order-2 md:order-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight tracking-tight text-slate-800">
              Elevating Brands with <span className="block sm:inline text-cyan-700">Strategic Digital Expertise.</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 font-normal text-slate-600 max-w-xl mx-auto md:mx-0">
              I'm Willem Pacardo, a freelance expert specializing in video editing, social media, web, and e-commerce solutions to help your brand shine.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="#services" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-block bg-cyan-700 text-white hover:bg-cyan-800 font-semibold py-3 px-6 sm:py-3 sm:px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-base sm:text-lg"
              >
                Explore My Services
              </a>
              <a 
                href="#contact" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto inline-block bg-transparent border-2 border-cyan-700 text-cyan-700 hover:bg-cyan-700 hover:text-white font-semibold py-3 px-6 sm:py-3 sm:px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-base sm:text-lg"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="md:w-1/2 lg:w-2/5 order-1 md:order-2 flex justify-center md:justify-end">
            {/* UPDATED: Changed rounded-lg back to rounded-full and removed border */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-xl"> 
              <Image 
                src="/images/willem-hero.png" 
                alt="Willem Pacardo - Freelance Digital Expert" 
                fill
                sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                className="object-cover" 
                priority 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; 
                  console.error("Hero image failed to load:", target.src);
                  target.parentElement?.classList.add('bg-slate-200'); 
                  target.style.display = 'none'; 
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;