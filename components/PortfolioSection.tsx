"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image'; 

// Placeholder data for portfolio items (you'll replace this with actual data)
const portfolioItems = [
  { id: 1, title: "Project Alpha", category: "Web Development", imageUrl: "/images/portfolio/social-PH.jpg", delay: "0s",description : "This is Project Alpha test" },
  { id: 2, title: "Video Campaign Beta", category: "Video Editing", imageUrl: "/images/portfolio/video-PH.jpg", delay: "0.1s", description : "This is Project Video test" },
  { id: 3, title: "Social Growth Gamma", category: "Social Media", imageUrl: "/images/portfolio/web-PH.jpg", delay: "0.2s", description : "This is Project Web test" },
  { id: 4, title: "Social Growth Gamma", category: "Social Media", imageUrl: "/images/portfolio/web-PH.jpg", delay: "0.2s", description : "This is Project Web test" },
];


const PortfolioSection = () => {
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
    <section 
      id="portfolio" 
      ref={sectionRef} 
      className={`py-16 sm:py-24 bg-slate-50 ${isVisible ? 'is-visible' : ''} fade-in-section`} 
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 sm:mb-5">My Portfolio</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-xl md:max-w-2xl mx-auto">
            A Glimpse Into My Work. More projects and detailed case studies are coming soon!
            </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {portfolioItems.map((item) => (
            <div 
              key={item.id} 
              className={`bg-white rounded-xl shadow-xl overflow-hidden group ${isVisible ? 'is-visible' : ''} fade-in-section`}
              style={{ transitionDelay: isVisible ? item.delay : '0s' }}
            >
              <div className="relative w-full aspect-video"> 
                <Image 
                  src={item.imageUrl} 
                  alt={item.title} 
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  // No onError needed if using reliable placehold.co URLs
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-1">{item.title}</h3>
                <p className="text-sm text-cyan-700 font-medium mb-2">{item.category}</p>
                <p className="text-xs sm:text-sm text-slate-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
         <p className="text-center mt-12 text-slate-500">
            More projects will be added here as they are completed. Stay tuned!
        </p>
      </div>
    </section>
  );
};

export default PortfolioSection;