"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
interface Tool { id: number; name: string; logoSrc: string;  logoAlt: string; description: string; delay: string; }
interface ToolsSectionProps { baseDelay?: string; }
const toolsData: Tool[] = [
  { id: 1, name: "WordPress", logoSrc: "tools/wordpress-icon.svg", logoAlt: "WordPress Logo", description: "Versatile Content Management System.", delay: "0s" },
  { id: 2, name: "Notion", logoSrc: "tools/notion-icon.svg", logoAlt: "Notion Logo", description: "All-in-one workspace for notes & projects.", delay: "0.05s" },
  { id: 3, name: "Google Workspace", logoSrc: "tools/google-drive-color-icon.svg", logoAlt: "Google Workspace Logo", description: "Suite of collaboration & productivity tools.", delay: "0.1s" },
  { id: 4, name: "CapCut", logoSrc: "tools/capcut-icon.svg", logoAlt: "CapCut Logo", description: "User-friendly video editing for social media.", delay: "0.15s" },
  { id: 5, name: "Canva", logoSrc: "tools/canva-icon.svg", logoAlt: "Canva Logo", description: "Intuitive graphic design for all needs.", delay: "0.2s" },
];
const ToolsSection = ({ baseDelay = "0s" }: ToolsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const currentRef = sectionRef.current; 
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { setIsVisible(true); if (currentRef) observer.unobserve(currentRef); } }); }, { threshold: 0.1 });
    if (currentRef) { observer.observe(currentRef); }
    return () => { if (currentRef) { observer.unobserve(currentRef); } };
  }, []);
  return (
    <section id="tools" ref={sectionRef} className={`py-16 sm:py-24 bg-slate-100 ${isVisible ? 'is-visible' : ''} fade-in-section`} style={{ transitionDelay: isVisible ? baseDelay : '0s' }}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 sm:mb-5">My Go-To Tools</h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl md:max-w-2xl mx-auto">Utilizing these key platforms to deliver efficient and high-quality digital solutions for your business.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-stretch justify-center">
          {toolsData.map((tool, index) => ( 
            <div key={tool.id} className={`tool-logo-item p-6 bg-white rounded-xl shadow-xl flex flex-col items-center justify-start text-center ${isVisible ? 'is-visible' : ''} fade-in-section`} style={{ transitionDelay: isVisible ? `calc(${baseDelay} + ${index * 0.05}s)` : '0s' }} >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-3 sm:mb-4"> 
                <Image src={tool.logoSrc} alt={tool.logoAlt} fill sizes="(max-width: 640px) 64px, 80px" className="object-contain" onError={(e) => { const target = e.target as HTMLImageElement; target.onerror = null; target.src = `https://placehold.co/80x80/CBD5E1/475569?text=${tool.name.substring(0,3)}`; console.error(`Failed to load tool logo: ${tool.logoSrc}`); }} />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-slate-700 mb-1">{tool.name}</h4>
              <p className="text-xs sm:text-sm text-slate-500 px-2 flex-grow">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ToolsSection;