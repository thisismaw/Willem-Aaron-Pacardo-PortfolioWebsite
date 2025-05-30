"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import type { PortfolioItem as PortfolioItemData } from '@/lib/portfolioApi'; 

interface PortfolioCardProps {
  item: PortfolioItemData; 
}

const PortfolioCard = ({ item }: PortfolioCardProps) => {
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
      className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out group overflow-hidden flex flex-col ${isVisible ? 'is-visible' : ''} fade-in-section`}
      style={{ transitionDelay: isVisible && item.delay ? item.delay : '0s' }} 
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-1 group-hover:text-cyan-700 transition-colors">{item.title}</h3>
        <p className="text-xs sm:text-sm text-cyan-600 font-medium mb-2">{item.category}</p>
        <p className="text-sm text-slate-600 line-clamp-3">{item.shortDescription}</p>
      </div>
    </div>
  );
};

export default PortfolioCard;