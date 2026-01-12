"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link'; 
import PortfolioCard from '@/components/PortfolioCard'; 
import { getAllPortfolioItems } from '@/lib/portfolioApi';

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Get all items but only take the TOP 3
  const portfolioItems = getAllPortfolioItems().slice(0, 3);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (currentRef) observer.unobserve(currentRef);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <section 
      id="portfolio" 
      ref={sectionRef} 
      className={`py-24 px-6 bg-[#FAFAFA] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-600 mb-4">Case Studies</h2>
            <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">
              Featured <br className="hidden md:block"/> Work<span className="text-indigo-600">.</span>
            </h3>
          </div>
        </div>

        {/* BENTO GRID - SHOWING ONLY TOP 3 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 min-h-[600px]">
          
          {/* Main Feature (Project 1) */}
          {portfolioItems[0] && (
            <div className="md:col-span-8">
              <PortfolioCard item={portfolioItems[0]} className="h-full" />
            </div>
          )}

          {/* Right Column (Projects 2 & 3) */}
          <div className="md:col-span-4 flex flex-col gap-6 lg:gap-8">
            {portfolioItems[1] && (
              <div className="flex-1">
                 <PortfolioCard item={portfolioItems[1]} />
              </div>
            )}
            {portfolioItems[2] && (
              <div className="flex-1">
                 <PortfolioCard item={portfolioItems[2]} />
              </div>
            )}
          </div>
        </div>

        {/* EXPLORE FULL PORTFOLIO CTA */}
        <div className="mt-20 text-center">
          <Link 
            href="/portfolio" 
            className="group inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-900/10"
          >
            Explore Full Portfolio
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PortfolioSection;