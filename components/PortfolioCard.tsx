"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import type { PortfolioItem as PortfolioItemData } from '@/lib/portfolioApi'; 

interface PortfolioCardProps {
  item: PortfolioItemData; 
  onClick?: () => void; // Added onClick prop to trigger modal
}

const PortfolioCard = ({ item, onClick }: PortfolioCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null); 
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = cardRef.current;
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
    <div 
      ref={cardRef} 
      className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out group overflow-hidden flex flex-col cursor-pointer ${isVisible ? 'is-visible' : ''} fade-in-section`}
      style={{ transitionDelay: isVisible && item.delay ? item.delay : '0s' }} 
      onClick={onClick} // Trigger onClick when card is clicked
    >
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          onError={(e) => { 
            const target = e.target as HTMLImageElement;
            target.onerror = null; 
            target.src = `https://placehold.co/600x400/E2E8F0/475569?text=Project`; 
            console.error(`Failed to load portfolio image: ${item.imageUrl}`);
          }}
        />
      </div>
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-1 group-hover:text-cyan-700 transition-colors">{item.title}</h3>
        <p className="text-xs sm:text-sm text-cyan-600 font-medium mb-2">{item.category}</p>
        <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-grow">{item.shortDescription}</p>
        
        {item.downloadUrl && (
          <a
            href={item.downloadUrl}
            download 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} // Prevent card click from triggering if download is clicked
            className="mt-auto self-start inline-block text-center bg-cyan-100 hover:bg-cyan-200 text-cyan-700 font-medium py-2 px-4 rounded-md transition-colors duration-300 text-xs"
          >
            Download File
          </a>
        )}
      </div>
    </div>
  );
};

export default PortfolioCard;