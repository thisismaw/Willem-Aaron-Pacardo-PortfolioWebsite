"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image'; 
import Link from 'next/link'; 

interface PortfolioItemForHomepage { // Renamed for clarity, specific to homepage section
  id: number;
  slug: string; // Added slug for linking
  title: string;
  category: string;
  imageUrl: string;
  description: string; 
  // delay: string; // Will be calculated based on index + baseDelay
}
interface PortfolioSectionProps {
  baseDelay?: string;
}

// Sample data for the HOMEPAGE portfolio section
// Ensure these slugs match slugs in your main portfolioData (in app/portfolio/page.tsx)
const portfolioItems: PortfolioItemForHomepage[] = [
  { 
    id: 1, 
    slug: "wordpress-client-site", // Example slug
    title: "Client Website Redesign", 
    category: "WordPress Development", 
    imageUrl: "/images/portfolio/social-PH.jpg", // USE YOUR LOCAL IMAGE PATH
    description: "Complete redesign for a local business, improving user engagement by 40%."
  },
  { 
    id: 2, 
    slug: "social-media-campaign-xyz", // Example slug
    title: "Social Media Campaign XYZ", 
    category: "Social Media", 
    imageUrl: "/images/portfolio/social-PH.jpg", // USE YOUR LOCAL IMAGE PATH
    description: "Managed a 3-month campaign increasing engagement by 150%"
  },
  { 
    id: 3, 
    slug: "social-growth-gamma", // Example slug
    title: "Social Growth Gamma", 
    category: "Social Media", 
    imageUrl: "/images/portfolio/social-PH.jpg", // USE YOUR LOCAL IMAGE PATH
    description: "Developed a content strategy that significantly grew an Instagram account."
  },
];


const PortfolioSection = ({ baseDelay = "0s" }: PortfolioSectionProps) => {
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

  return (
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
            Here&apos;s a glimpse into some of the work I&apos;m proud of. More projects and detailed case studies are coming soon!
            </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {portfolioItems.map((item, index) => ( 
            <div 
              key={item.id} 
              className={`bg-white rounded-xl shadow-xl overflow-hidden group flex flex-col ${isVisible ? 'is-visible' : ''} fade-in-section`}
              style={{ transitionDelay: isVisible ? `calc(${baseDelay} + ${index * 0.1}s)` : '0s' }} 
            >
              <Link href={`/portfolio/${item.slug}`} className="block"> {/* Updated Link */}
                <>
                  <div className="relative w-full aspect-[16/10]"> 
                    <Image 
                      src={item.imageUrl} 
                      alt={item.title} 
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                       onError={(e) => { 
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; 
                        target.src = `https://placehold.co/600x400/E2E8F0/475569?text=${item.title.substring(0,10)}`; 
                        console.error(`Failed to load portfolio image on homepage: ${item.imageUrl}`);
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h3 className="text-lg font-semibold text-white mb-1 opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-300">{item.title}</h3>
                        <p className="text-xs text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity delay-200 duration-300">{item.category}</p>
                    </div>
                  </div>
                </>
              </Link>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-1 group-hover:text-cyan-700 transition-colors">
                  <Link href={`/portfolio/${item.slug}`}>{item.title}</Link> {/* Updated Link */}
                </h3>
                <p className="text-sm text-cyan-700 font-medium mb-2">{item.category}</p>
                <p className="text-xs sm:text-sm text-slate-500 flex-grow">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;