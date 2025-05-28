"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { PortfolioItem as PortfolioItemData } from '@/app/portfolio/page'; // Assuming PortfolioItem is exported from app/portfolio/page.tsx

interface PortfolioCardProps {
  item: PortfolioItemData; // Use the imported type
}

const PortfolioCard = ({ item }: PortfolioCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null); // Changed ref type to HTMLDivElement as Link itself is the interactive element
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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      ref={cardRef} // Apply ref to the outer div for IntersectionObserver
      className={`bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out group overflow-hidden flex flex-col ${isVisible ? 'is-visible' : ''} fade-in-section`}
      style={{ transitionDelay: isVisible ? item.delay : '0s' }}
    >
      <Link href={`/portfolio/${item.slug}`} className="block">
        <> {/* Link now wraps its children directly */}
          <div className="relative w-full aspect-[16/10] overflow-hidden">
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
              onError={(e) => { // Fallback for broken image links
                const target = e.target as HTMLImageElement;
                target.onerror = null; 
                target.src = `https://placehold.co/600x400/E2E8F0/475569?text=Project`; 
                console.error(`Failed to load portfolio image: ${item.imageUrl}`);
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
               {/* Info overlay content can be added here if desired on hover */}
            </div>
          </div>
          <div className="p-5 sm:p-6">
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-1 group-hover:text-cyan-700 transition-colors">{item.title}</h3>
            <p className="text-xs sm:text-sm text-cyan-600 font-medium mb-2">{item.category}</p>
            <p className="text-sm text-slate-600 line-clamp-3">{item.shortDescription}</p>
          </div>
        </>
      </Link>
    </div>
  );
};

export default PortfolioCard;