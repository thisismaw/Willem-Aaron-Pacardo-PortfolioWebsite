"use client";
import React, { useEffect, useRef, useState } from 'react';
import ContactModal from '@/components/ContactModal';

// Keeping your original Icons but with updated sizing/colors
const CreativeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.038-.502.082-.752.132M9.75 3.104A2.25 2.25 0 007.5 1.5h-3A2.25 2.25 0 002.25 3.75v16.5A2.25 2.25 0 004.5 22.5h15A2.25 2.25 0 0021.75 20.25V3.75A2.25 2.25 0 0019.5 1.5h-3A2.25 2.25 0 0014.25 3.104M9.75 3.104c.251.038.502.082.752.132M14.25 3.104v5.714a2.25 2.25 0 00.659 1.591l2.841 2.841M14.25 3.104c.251.038.502.082.752.132M14.25 3.104A2.25 2.25 0 0116.5 1.5h3A2.25 2.25 0 0121.75 3.75v16.5A2.25 2.25 0 0119.5 22.5h-15A2.25 2.25 0 012.25 20.25V3.75A2.25 2.25 0 014.5 1.5h3A2.25 2.25 0 019.75 3.104z" />
  </svg>
);
const AdminIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.39 1.024 0 1.414l-.527.737c-.25.35-.272.806-.108 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.11v1.093c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.39.39.39 1.024 0 1.414l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.78.93l-.15.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527a1.125 1.125 0 01-1.45-.12l-.773-.774a1.125 1.125 0 010-1.414l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.11v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.93l.15-.894z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const AllInOneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 14.25l-1.25-2.25L13.5 11l2.25-1.25L17 7.5l1.25 2.25L20.5 11l-2.25 1.25z" />
  </svg>
);

interface Service { id: number; icon: React.JSX.Element; title: string; description: string; details: string[]; rate: string; buttonText: string; buttonLink?: string; highlightClass?: string; }
interface ServicesSectionProps { baseDelay?: string; }

const servicesData: Service[] = [
  { id: 1, icon: <CreativeIcon />, title: "Business & Project Management", description: "Result: You get a smooth-running business without having to micromanage.", details: ["Organize daily operations.", "Manage projects from planning to completion.", "Coordinate with team members.", "Handle email & calendar management."], rate: "Custom Quotes Available", buttonText: "Discuss My Project"},
  { id: 2, icon: <AdminIcon />, title: "Digital Presence Management", description: "Result: Your brand stays professional, visible, and aligned with your goals.", details: ["Website content & visual updates.", "Social media management.", "YouTube channel optimization.", "Landing page creation."], rate: "Custom Quotes Available", buttonText: "Optimize My Presence"},
  { id: 3, icon: <AllInOneIcon />, title: "Website Management & Tech", description: "Result: You reduce errors and have systems that work seamlessly.", details: ["Performance optimization.", "Bug fixes & technical updates.", "Brand alignment audits.", "Workflow automations."], rate: "Custom Quotes Available", buttonText: "Get My Plan", highlightClass: "ring-2 ring-indigo-600/50 shadow-indigo-100"},
];

const ServicesSection = ({ baseDelay = "0s" }: ServicesSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string | undefined>(undefined);

  const openModal = (serviceTitle: string) => { setSelectedServiceTitle(serviceTitle); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setSelectedServiceTitle(undefined); };

  useEffect(() => {
    const currentRef = sectionRef.current; 
    const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { setIsVisible(true); if (currentRef) observer.unobserve(currentRef); } }); }, { threshold: 0.1 });
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <>
    <section id="services" ref={sectionRef} className={`py-24 px-6 bg-white transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-600 mb-4">Core Competencies</h2>
          <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
            Elevate Your <span className="text-indigo-600">Operations.</span>
          </h3>
          <p className="mt-6 text-slate-500 text-lg max-w-2xl mx-auto">
            I build systems that allow you to focus on high-level growth while I handle the technical and administrative heavy lifting.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {servicesData.map((service, cardIndex) => ( 
            <div 
              key={service.id} 
              className={`glass-card p-10 rounded-[2.5rem] flex flex-col group transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} ${service.highlightClass || ''}`}
              style={{ transitionDelay: `calc(${baseDelay} + ${cardIndex * 0.15}s)` }}
            >
              {/* Icon Container */}
              <div className="mb-8 p-5 bg-indigo-50 text-indigo-600 w-fit rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                {service.title}
              </h3>
              
              <p className="text-slate-500 leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>

              <ul className="space-y-4 mb-10">
                {service.details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                    <span className="text-indigo-600 mt-0.5 font-bold">✓</span>
                    {detail}
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => openModal(service.title)} 
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-indigo-600 transition-all duration-300 shadow-lg shadow-indigo-900/5 group-hover:shadow-indigo-900/20"
              >
                {service.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>

    <ContactModal 
      isOpen={isModalOpen} 
      onClose={closeModal} 
      serviceTitle={selectedServiceTitle} 
      emailAddress="hello@assistbyaaron.com" 
      emailSubject="Service Inquiry - AssistByAaron"
    />
    </>
  );
};

export default ServicesSection;