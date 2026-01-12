"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Tool { 
  id: number; 
  name: string; 
  logoSrc: string; 
  logoAlt: string; 
  description: string; 
  delay: string; 
}

interface ToolsSectionProps { baseDelay?: string; }

const toolsData: Tool[] = [
  { id: 1, name: "WordPress", logoSrc: "tools/wordpress-icon.svg", logoAlt: "WordPress Logo", description: "Scalable CMS & Web Infrastructure.", delay: "0s" },
  { id: 2, name: "Notion", logoSrc: "tools/notion-icon.svg", logoAlt: "Notion Logo", description: "Centralized Systems & Knowledge Base.", delay: "0.05s" },
  { id: 3, name: "Workspace", logoSrc: "tools/google-drive-color-icon.svg", logoAlt: "Google Workspace Logo", description: "Cloud-Based Business Collaboration.", delay: "0.1s" },
  { id: 4, name: "CapCut", logoSrc: "tools/capcut-icon.svg", logoAlt: "CapCut Logo", description: "High-Impact Short-Form Video Content.", delay: "0.15s" },
  { id: 5, name: "Canva", logoSrc: "tools/canva-icon.svg", logoAlt: "Canva Logo", description: "High-End Visual Identity & Assets.", delay: "0.2s" },
];

const ToolsSection = ({ baseDelay = "0s" }: ToolsSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current; 
    const observer = new IntersectionObserver((entries) => { 
      entries.forEach((entry) => { 
        if (entry.isIntersecting) { 
          setIsVisible(true); 
          if (currentRef) observer.unobserve(currentRef); 
        } 
      }); 
    }, { threshold: 0.1 });
    if (currentRef) { observer.observe(currentRef); }
    return () => { if (currentRef) { observer.unobserve(currentRef); } };
  }, []);

  return (
    <section id="tools" ref={sectionRef} className="py-24 bg-white border-y border-slate-100 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-600 mb-4">The Stack</h2>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
            Optimized <span className="text-indigo-600">Tech Stack.</span>
          </h3>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Leveraging industry-standard platforms to build efficient, high-performance business operations.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {toolsData.map((tool, index) => ( 
            <div 
              key={tool.id} 
              className={`group glass-card p-8 rounded-[2rem] flex flex-col items-center text-center transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
              style={{ transitionDelay: `calc(${baseDelay} + ${index * 0.1}s)` }} 
            >
              {/* Logo with Soft Glow on Hover */}
              <div className="relative w-16 h-16 mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                <div className="absolute inset-0 bg-indigo-200 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity"></div>
                <Image 
                  src={tool.logoSrc} 
                  alt={tool.logoAlt} 
                  fill 
                  className="object-contain relative z-10" 
                  onError={(e) => { 
                    const target = e.target as HTMLImageElement; 
                    target.src = `https://placehold.co/80x80/EEF2FF/6366F1?text=${tool.name.charAt(0)}`; 
                  }} 
                />
              </div>

              <h4 className="text-lg font-bold text-slate-900 mb-2">{tool.name}</h4>
              <p className="text-xs font-medium text-slate-400 leading-relaxed uppercase tracking-wider px-2">
                {tool.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;