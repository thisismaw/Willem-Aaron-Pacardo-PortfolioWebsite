"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import type { PortfolioItem as PortfolioItemData } from '@/lib/portfolioApi'; 
import { ArrowUpRight, FileDown } from 'lucide-react';

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

    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);
  
  return (
    <div 
      ref={cardRef} 
      className={`group relative bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 ease-out flex flex-col cursor-pointer overflow-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: isVisible && item.delay ? item.delay : '0s' }} 
      onClick={onClick} 
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[16/11] overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => { 
            const target = e.target as HTMLImageElement;
            target.src = `https://placehold.co/600x400/F8FAFC/6366F1?text=${item.title}`; 
          }}
        />
        
        {/* Category Badge on Image */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full shadow-sm">
            {item.category}
          </span>
        </div>

        {/* Hover Overlay Icon */}
        <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="bg-white p-3 rounded-full shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <ArrowUpRight className="w-5 h-5 text-indigo-600" />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="p-7 flex flex-col flex-grow">
        <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tighter group-hover:text-indigo-600 transition-colors duration-300">
          {item.title}
        </h3>
        
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-6 flex-grow">
          {item.shortDescription}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest flex items-center gap-2">
            View Project
          </span>
          
          {item.downloadUrl && (
            <a
              href={item.downloadUrl}
              download 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} 
              className="flex items-center gap-2 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 p-2 rounded-lg transition-colors duration-300"
              title="Download File"
            >
              <FileDown className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;