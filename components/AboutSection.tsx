"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface AboutSectionProps { baseDelay?: string; }

const AboutSection = ({ baseDelay = "0s" }: AboutSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const textContentRef = useRef<HTMLDivElement>(null);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null); 
  const [isImageVisible, setIsImageVisible] = useState(false);

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    const observer = new IntersectionObserver((entries) => { 
      entries.forEach((entry) => { 
        if (entry.isIntersecting) { 
          setIsVisible(true); 
          if (currentSectionRef) observer.unobserve(currentSectionRef); 
        } 
      }); 
    }, { threshold: 0.1 });
    if (currentSectionRef) observer.observe(currentSectionRef);
    return () => { if (currentSectionRef) observer.unobserve(currentSectionRef); };
  }, []);

  useEffect(() => {
    if (!isVisible) return; 
    const currentTextRef = textContentRef.current;
    const currentImageRef = imageRef.current;
    
    const textObserver = new IntersectionObserver((entries) => { 
      entries.forEach(entry => { 
        if (entry.isIntersecting) { 
          setIsTextVisible(true); 
          if (currentTextRef) textObserver.unobserve(currentTextRef); 
        }
      }); 
    }, { threshold: 0.2 });
    
    if (currentTextRef) textObserver.observe(currentTextRef);

    const imageObserver = new IntersectionObserver((entries) => { 
      entries.forEach(entry => { 
        if (entry.isIntersecting) { 
          setIsImageVisible(true); 
          if (currentImageRef) imageObserver.unobserve(currentImageRef); 
        }
      }); 
    }, { threshold: 0.2 });
    
    if (currentImageRef) imageObserver.observe(currentImageRef);

    return () => {
      if (currentTextRef) textObserver.unobserve(currentTextRef);
      if (currentImageRef) imageObserver.unobserve(currentImageRef);
    };
  }, [isVisible]); 

  return (
    <section id="about" ref={sectionRef} className={`py-24 bg-[#FAFAFA] overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-600 mb-4">The Face Behind the Work</h2>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
            About <span className="text-indigo-600">Aaron.</span>
          </h3>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image Content */}
          <div ref={imageRef} className={`w-full lg:w-2/5 transition-all duration-1000 ${isImageVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}> 
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"> 
              <Image 
                src="/images/willem-about.jpeg" 
                alt="Aaron - Digital Operations Expert" 
                fill 
                className="object-cover" 
                onError={(e) => { 
                  const target = e.target as HTMLImageElement; 
                  target.src = 'https://placehold.co/600x800/EEF2FF/6366F1?text=Aaron'; 
                }} 
              />
              {/* Decorative Indigo Element */}
              <div className="absolute bottom-0 right-0 bg-indigo-600 p-6 rounded-tl-[2rem]">
                <p className="text-white font-bold text-sm uppercase tracking-widest text-center">Since 2021</p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div ref={textContentRef} className={`w-full lg:w-3/5 transition-all duration-1000 delay-200 ${isTextVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <h4 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
              Bridging the gap between <span className="text-indigo-600">Creative</span> & <span className="text-indigo-600">Operations</span>.
            </h4>
            
            <p className="text-lg text-slate-500 mb-6 leading-relaxed">
              I specialize in helping founders and creators reclaim their time. By building custom web solutions and high-performance digital systems, I allow you to focus on high-level growth while I handle the technical architecture.
            </p>
            
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              Whether it’s engineering responsive Next.js sites, automating workflows in Notion, or crafting polished video content in DaVinci Resolve—I treat your business operations as a product that needs to be optimized, scaled, and secured.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-10">
              {[
                "Conversion-Focused Websites",
                "Scalable System Automation",
                "High-End Video Editing",
                "Strategic Brand Identity",
                "Advanced AI Integration",
                "Reliable Technical Support"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center">
                    <span className="text-indigo-600 text-xs font-bold">✓</span>
                  </div>
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <a 
              href="#contact" 
              onClick={(e) => { 
                e.preventDefault(); 
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-900/10 hover:shadow-indigo-900/20 transition-all"
            >
              Let's build something together
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;