"use client"; // Needed for useState, useEffect, useRef

import React, { useRef, useState, useEffect } from 'react'; // Import React and hooks
import Image from 'next/image';
import Link from 'next/link';
import type { PortfolioItem } from '@/app/portfolio/page'; // Assuming PortfolioItem is exported from page.tsx

interface PortfolioCardProps {
  item: PortfolioItem;
}

const PortfolioCard = ({ item }: PortfolioCardProps) => {
  const cardRef = useRef<HTMLAnchorElement>(null); // Correct type for an anchor element ref
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
    // The Link component from Next.js should wrap interactive elements for client-side navigation.
    // Using legacyBehavior with an <a> tag child is one way to make the whole card clickable.
    <Link href={`/portfolio/${item.slug}`} legacyBehavior>
      <a 
        ref={cardRef} // Attach ref to the anchor tag
        className={`block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out group overflow-hidden ${isVisible ? 'is-visible' : ''} fade-in-section`}
        style={{ transitionDelay: isVisible ? item.delay : '0s' }}
      >
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
             {/* You could put a title or category here for the hover overlay if desired */}
          </div>
        </div>
        <div className="p-5 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-1 group-hover:text-cyan-700 transition-colors">{item.title}</h3>
          <p className="text-xs sm:text-sm text-cyan-600 font-medium mb-2">{item.category}</p>
          <p className="text-sm text-slate-600 line-clamp-3">{item.shortDescription}</p>
        </div>
      </a>
    </Link>
  );
};

export default PortfolioCard;