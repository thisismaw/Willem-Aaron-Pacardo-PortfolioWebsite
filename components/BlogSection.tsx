"use client"; // Still a client component for Intersection Observer

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link'; 
import type { PostData } from '@/lib/blogApi'; // Import PostData type

interface BlogSectionProps {
  latestPosts: PostData[]; // Accept posts as a prop
}

const BlogSection = ({ latestPosts }: BlogSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // This useEffect is only for the fade-in animation now
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
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 sm:mb-5">From The Blog</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-xl md:max-w-2xl mx-auto">
            Insights, tips, and updates on digital trends, freelancing, and operational excellence.
            </p>
        </div>

        {latestPosts && latestPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 max-w-4xl mx-auto">
                {latestPosts.map((post, index) => (
                    <div 
                        key={post.slug} 
                        className={`bg-slate-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ${isVisible ? 'is-visible' : ''} fade-in-section`}
                        style={{ transitionDelay: isVisible ? `${index * 0.1}s` : '0s' }}
                    >
                        <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2 hover:text-cyan-700 transition-colors">
                            <Link href={`/blog/${post.slug}`}>
                                {post.title}
                            </Link>
                        </h3>
                        <p className="text-sm text-slate-600 mb-4 line-clamp-3">{post.excerpt}</p>
                        <Link href={`/blog/${post.slug}`} className="text-cyan-700 font-medium hover:text-cyan-800 hover:underline transition-colors duration-300">
                            Read More &rarr;
                        </Link>
                    </div>
                ))}
            </div>
        ) : (
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 sm:p-12 min-h-[200px] flex flex-col items-center justify-center">
                <p className="text-slate-400 text-lg mb-4">No blog posts yet. Stay tuned!</p>
            </div>
        )}

        <div className="text-center mt-12">
             <Link href="/blog" className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base">
                Visit Full Blog
            </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
