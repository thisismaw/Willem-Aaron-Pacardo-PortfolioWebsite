"use client";

import React, { useEffect, useRef, useState } from 'react';

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
      className={`py-16 sm:py-24 bg-slate-50 ${isVisible ? 'is-visible' : ''} fade-in-section`} // Changed background to differentiate
    >
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-5">My Portfolio</h2>
        <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 max-w-xl md:max-w-2xl mx-auto">
          Exciting projects and case studies are coming soon! This section will showcase the best of my work and the results I've helped clients achieve.
        </p>
        {/* Placeholder for portfolio items - e.g., a grid of project cards */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 sm:p-12 min-h-[200px] flex items-center justify-center">
          <p className="text-gray-400 text-lg">Portfolio Showcase Area - Under Construction</p>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;