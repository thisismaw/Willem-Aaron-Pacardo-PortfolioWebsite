"use client";

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link'; // For linking to a potential full blog page

const BlogSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="blog" 
      ref={sectionRef} 
      className={`py-16 sm:py-24 bg-white ${isVisible ? 'is-visible' : ''} fade-in-section`}
    >
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-5">From The Blog</h2>
        <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 max-w-xl md:max-w-2xl mx-auto">
          Stay tuned for insights, tips, and updates on digital trends, freelancing, and more. My blog is currently under construction.
        </p>
        {/* Placeholder for latest blog posts - e.g., a few cards */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 sm:p-12 min-h-[200px] flex flex-col items-center justify-center">
          <p className="text-gray-400 text-lg mb-4">Blog Posts Area - Coming Soon!</p>
          {/* If you had a dedicated blog page later, you could link to it:
          <Link href="/blog" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base">
            Visit Blog
          </Link> 
          */}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;