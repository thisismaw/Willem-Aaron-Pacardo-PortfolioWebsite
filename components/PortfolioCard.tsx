"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import type { PortfolioItem as PortfolioItemData } from '@/lib/portfolioApi'; 

// Added className and delay to the interface to prevent TypeScript errors
interface PortfolioCardProps {
  item: PortfolioItemData & { delay?: string }; 
  onClick?: () => void;
  className?: string; 
}

const PortfolioCard = ({ item, onClick, className = "" }: PortfolioCardProps) => {
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
      // Added ${className} and swapped generic shadow for your glass-card look
      className={`glass-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out group overflow-hidden flex flex-col cursor-pointer ${isVisible ? 'is-visible' : ''} fade-in-section ${className}`}
      style={{ transitionDelay: isVisible && item.delay ? item.delay : '0s' }} 
      onClick={onClick} 
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
            target.src = `https://placehold.co/600x400/EEF2FF/6366F1?text=${item.title}`; 
          }}
        />
      </div>
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
        <p className="text-xs sm:text-sm text-indigo-600 font-medium mb-2">{item.category}</p>
        <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-grow">{item.shortDescription}</p>
        
        {item.downloadUrl && (
          <a
            href={item.downloadUrl}
            download 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} 
            className="mt-auto self-start inline-block text-center bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium py-2 px-4 rounded-md transition-colors duration-300 text-xs"
          >
            Download File
          </a>
        )}
      </div>
    </div>
  );
};

export default PortfolioCard;