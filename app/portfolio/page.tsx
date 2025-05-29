"use client"; 

import React, { useState, useEffect, useMemo, useRef } from 'react'; 
import Link from 'next/link'; 
import PortfolioCard from '@/components/PortfolioCard'; 
import { getAllPortfolioItems, PortfolioItem } from '@/lib/portfolioApi'; // Import from new API file

const PortfolioPage = () => { // Renamed to avoid conflict with default export
  const allItems = getAllPortfolioItems(); // Get all items
  const [activeFilter, setActiveFilter] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const categories = ["All", ...new Set(allItems.map(item => item.category))];

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") {
      return allItems;
    }
    return allItems.filter(item => item.category === activeFilter);
  }, [activeFilter, allItems]);

  return (
    <>      
      <section 
        id="portfolio-page" 
        ref={sectionRef}
        className={`py-16 sm:py-24 bg-slate-50 ${isVisible ? 'is-visible' : ''} fade-in-section`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 mb-4">
              My Work: <span className="text-cyan-700">Delivering Results</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              A curated collection of projects showcasing my expertise in WordPress, video editing, social media, and operational support using tools like Notion and Google Workspace.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 text-sm sm:text-base font-medium rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50
                  ${activeFilter === category 
                    ? 'bg-cyan-700 text-white shadow-md' 
                    : 'bg-white text-slate-700 hover:bg-slate-100 shadow-sm border border-slate-300 hover:border-slate-400'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {filteredItems.map(item => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500 text-lg">No projects found for this category yet. Stay tuned!</p>
          )}
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
            Let&apos;s discuss how I can help you achieve your business goals with tailored digital solutions.
          </p>
          <Link href="/#contact" 
             onClick={(e) => { 
                e.preventDefault();
                const contactSection = document.getElementById('contact');
                if(contactSection && window.location.pathname === '/') {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.location.href = '/#contact'; 
                }
              }}
            className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-base sm:text-lg"
          >
              Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}