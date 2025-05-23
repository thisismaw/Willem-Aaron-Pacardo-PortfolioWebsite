"use client"; // Needed for useState and event handlers (filtering)

import React, { useState, useEffect, useMemo, useRef } from 'react'; // Added useRef here for the sectionRef
import Link from 'next/link'; 
import Image from 'next/image'; 
import PortfolioCard from '@/components/PortfolioCard'; // Import the PortfolioCard component

// Define the structure of a portfolio item (can also be moved to a types file)
export interface PortfolioItem { // Exporting interface if PortfolioCard is in a separate file and needs it
  id: number;
  slug: string; 
  title: string;
  category: string; 
  imageUrl: string; 
  shortDescription: string;
  delay?: string; 
}

// Sample Portfolio Data (Replace with your actual projects)
const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    slug: "wordpress-client-site",
    title: "Client Website Redesign",
    category: "WordPress",
    imageUrl: "https://placehold.co/600x400/E2E8F0/475569?text=WordPress+Site",
    shortDescription: "Complete redesign for a local bakery, boosting online orders by 30%.",
    delay: "0s",
  },
  {
    id: 2,
    slug: "social-media-campaign-xyz",
    title: "Social Media Campaign XYZ",
    category: "Social Media",
    imageUrl: "https://placehold.co/600x400/E2E8F0/475569?text=Social+Campaign",
    shortDescription: "Managed a 3-month campaign increasing engagement by 150%.",
    delay: "0.1s",
  },
  {
    id: 3,
    slug: "capcut-video-series",
    title: "Explainer Video Series",
    category: "Video Editing",
    imageUrl: "https://placehold.co/600x400/E2E8F0/475569?text=Video+Series",
    shortDescription: "Produced 10 engaging explainer videos using CapCut & DaVinci Resolve.",
    delay: "0.2s",
  },
  {
    id: 4,
    slug: "notion-startup-os",
    title: "Startup Operations Hub",
    category: "Notion",
    imageUrl: "https://placehold.co/600x400/E2E8F0/475569?text=Notion+Hub",
    shortDescription: "Built a custom Notion dashboard for a tech startup, improving team productivity.",
    delay: "0.3s",
  },
  {
    id: 5,
    slug: "google-workspace-streamline",
    title: "Workspace Optimization",
    category: "Google Workspace",
    imageUrl: "https://placehold.co/600x400/E2E8F0/475569?text=G+Workspace",
    shortDescription: "Streamlined email and file management for a small consultancy.",
    delay: "0.4s",
  },
  {
    id: 6,
    slug: "canva-brand-assets",
    title: "Brand Asset Creation",
    category: "Canva",
    imageUrl: "https://placehold.co/600x400/E2E8F0/475569?text=Canva+Assets",
    shortDescription: "Designed a complete set of social media templates and brand assets.",
    delay: "0.5s",
  },
];

// Get unique categories for filter buttons
const categories = ["All", ...new Set(portfolioData.map(item => item.category))];


export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const sectionRef = useRef<HTMLElement>(null); // Ref for the main section fade-in
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

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") {
      return portfolioData;
    }
    return portfolioData.filter(item => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <>
      {/* Assuming Navbar and Footer are handled by your app/layout.tsx.
        If this /portfolio page should have a different layout, you might need
        a specific layout file for the portfolio route group.
      */}
      
      <section 
        id="portfolio-page" 
        ref={sectionRef}
        className={`py-16 sm:py-24 bg-slate-50 ${isVisible ? 'is-visible' : ''} fade-in-section`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          {/* Page Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-800 mb-4">
              My Work: <span className="text-cyan-700">Delivering Results</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              A curated collection of projects showcasing my expertise in WordPress, video editing, social media, and operational support using tools like Notion and Google Workspace.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 text-sm sm:text-base font-medium rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-50
                  ${activeFilter === category 
                    ? 'bg-cyan-700 text-white shadow-md' 
                    : 'bg-white text-slate-700 hover:bg-slate-100 shadow-sm border border-slate-300 hover:border-slate-400'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Project Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {filteredItems.map(item => (
                <PortfolioCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-500 text-lg">No projects found for this category yet. Stay tuned!</p>
          )}
        </div>
      </section>

      {/* Optional: CTA Section at the bottom */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Ready to Start Your Next Project?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
            Let's discuss how I can help you achieve your business goals with tailored digital solutions.
          </p>
          <Link href="/#contact" legacyBehavior>
            <a 
              onClick={(e) => { 
                e.preventDefault();
                // Attempt to scroll to contact section on the homepage
                // This assumes your main page has a contact section with id="contact"
                // and that your Navbar's handleLinkClick can handle this if already on homepage.
                // For robust cross-page anchor linking, more advanced solutions might be needed
                // or simply navigating to the homepage and letting its scroll logic handle it.
                const homeContactSection = document.getElementById('contact');
                if(homeContactSection && window.location.pathname === '/') {
                    homeContactSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.location.href = '/#contact'; 
                }
              }}
              className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-base sm:text-lg"
            >
              Get in Touch
            </a>
          </Link>
        </div>
      </section>
    </>
  );
}
