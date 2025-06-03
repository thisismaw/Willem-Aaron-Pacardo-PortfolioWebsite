"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link'; 
import PortfolioCard from '@/components/PortfolioCard'; 
import PortfolioDetailModal from '@/components/PortfolioDetailModal'; // Import the modal
import { getAllPortfolioItems, PortfolioItem } from '@/lib/portfolioApi';

interface PortfolioSectionProps {
  baseDelay?: string;
}

const PortfolioSection = ({ baseDelay = "0s" }: PortfolioSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const portfolioItemsToDisplay = getAllPortfolioItems().slice(0,3); 

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

    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <>
      <section 
        id="portfolio" 
        ref={sectionRef} 
        className={`py-16 sm:py-24 bg-slate-50 ${isVisible ? 'is-visible' : ''} fade-in-section`} 
        style={{ transitionDelay: isVisible ? baseDelay : '0s' }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 sm:mb-5">My Portfolio</h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-xl md:max-w-2xl mx-auto">
              A Glimpse Into My Work. Click on items to learn more.
              </p>
          </div>
          
          {portfolioItemsToDisplay.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {portfolioItemsToDisplay.map((item, index) => ( 
                <PortfolioCard 
                  key={item.id} 
                  item={{...item, delay: `calc(${baseDelay} + ${index * 0.1}s)`}}
                  onClick={() => openModal(item)} // Open modal on click
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500">Portfolio items coming soon!</p>
          )}
          <div className="text-center mt-12 sm:mt-16">
              <Link href="/portfolio" className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-base sm:text-lg">
                  View All Projects
              </Link>
          </div>
        </div>
      </section>
      <PortfolioDetailModal isOpen={isModalOpen} onClose={closeModal} item={selectedItem} />
    </>
  );
};
export default PortfolioSection;