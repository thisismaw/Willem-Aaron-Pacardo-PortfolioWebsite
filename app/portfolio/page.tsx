"use client"; 
import React, { useState, useEffect, useMemo, useRef } from 'react'; 
import Link from 'next/link'; 
import PortfolioCard from '@/components/PortfolioCard'; 
import PortfolioDetailModal from '@/components/PortfolioDetailModal'; 
import { getAllPortfolioItems, PortfolioItem } from '@/lib/portfolioApi'; 
import { ArrowRight, Sparkles } from 'lucide-react';

const PortfolioPage = () => { 
  const allItems = getAllPortfolioItems(); 
  const [activeFilter, setActiveFilter] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const openModal = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

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

  const categories = ["All", ...new Set(allItems.map(item => item.category))];

  const filteredItems = useMemo(() => {
    return activeFilter === "All" 
      ? allItems 
      : allItems.filter(item => item.category === activeFilter);
  }, [activeFilter, allItems]);

  return (
    <>      
      <section 
        id="portfolio-page" 
        ref={sectionRef}
        className={`py-24 bg-[#FAFAFA] min-h-screen transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container mx-auto px-6">
          
          {/* Header Section */}
          <div className="text-center mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3 h-3" />
              Case Studies
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter">
              Proven <span className="text-indigo-600">Results.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              From automated Notion systems to conversion-optimized WordPress sites. 
              Explore how I help brands streamline and scale.
            </p>
          </div>

          {/* Premium Filter Bar */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2.5 text-sm font-bold rounded-full transition-all duration-300
                  ${activeFilter === category 
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                    : 'bg-white text-slate-500 hover:text-indigo-600 border border-slate-200 hover:border-indigo-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid Layout */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
              {filteredItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="transition-all duration-700"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <PortfolioCard 
                    item={item} 
                    onClick={() => openModal(item)} 
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-slate-400 font-medium italic">No projects found for this category yet. Stay tuned!</p>
            </div>
          )}
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter">
            Like what you <span className="text-indigo-600">see?</span>
          </h2>
          <p className="text-lg text-slate-500 mb-10 max-w-xl mx-auto">
            I&apos;m currently booking projects for next month. Let&apos;s talk about your goals and see if we&apos;re a good fit.
          </p>
          <Link 
            href="/#contact" 
            className="group inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-indigo-100 transition-all transform hover:-translate-y-1"
          >
            Start Your Project
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <PortfolioDetailModal isOpen={isModalOpen} onClose={closeModal} item={selectedItem} />
    </>
  );
}
export default PortfolioPage;