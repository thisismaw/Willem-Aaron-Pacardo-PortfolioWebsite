"use client"; 
import React, { useEffect, useRef, useState } from 'react'; 
import Image from 'next/image'; 

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null); 
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current; 
    const observer = new IntersectionObserver((entries) => { 
      entries.forEach((entry) => { 
        if (entry.isIntersecting) { 
          setIsVisible(true); 
          if (currentRef) observer.unobserve(currentRef); 
        } 
      }); 
    }, { threshold: 0.1 });
    
    if (currentRef) { observer.observe(currentRef); }
    return () => { if (currentRef) { observer.unobserve(currentRef); } };
  }, []); 

  return (
    <header 
      id="home" 
      ref={sectionRef} 
      className={`bg-white text-slate-900 min-h-[90vh] flex items-center justify-center py-20 px-4 overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* TEXT CONTENT */}
          <div className="md:w-3/5 text-center md:text-left order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                Available for New Projects
            </div>
            
            <h1 className="text-5xl lg:text-8xl font-black mb-6 leading-[0.95] tracking-tighter text-slate-900">
              AssistBy<span className="text-indigo-600">Aaron.</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-medium text-slate-400 mb-8 tracking-tight">
              Engineering <span className="text-slate-900">Digital Solutions</span> & Operations.
            </h2>
            
            <p className="text-lg text-slate-500 max-w-xl mb-10 leading-relaxed">
              I help founders and studios scale by bridging the gap between custom web development and high-level business operations. 
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a 
                href="#portfolio" 
                className="btn-primary px-10 py-4 rounded-xl font-bold text-center transition-all"
              >
                View My Work
              </a>
              <a 
                href="#contact" 
                className="border-2 border-slate-200 text-slate-900 px-10 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all text-center"
              >
                Let's Chat
              </a>
            </div>
          </div>

          {/* IMAGE CONTENT */}
          <div className="md:w-2/5 order-1 md:order-2">
            <div className="relative w-72 h-72 md:w-96 md:h-96 mx-auto">
              {/* Subtle indigo glow behind the image */}
              <div className="absolute -inset-4 bg-indigo-100 rounded-full blur-3xl opacity-40 animate-pulse"></div>
              
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl transition-transform hover:scale-[1.02] duration-500">
                <Image 
                  src="/images/willem-hero.png" 
                  alt="Aaron - Digital Solutions Expert" 
                  fill 
                  className="object-cover" 
                  priority 
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default HeroSection;