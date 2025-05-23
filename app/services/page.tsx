"use client"; 

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import ContactModal from '@/components/ContactModal'; // Import the modal

// Icons for engagement models (simple SVGs)
const ClockIcon = () => (
  <svg className="w-12 h-12 text-cyan-600 mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);
const BriefcaseIcon = () => (
  <svg className="w-12 h-12 text-cyan-600 mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
  </svg>
);
const CheckCircleIcon = () => (
  <svg className="w-12 h-12 text-cyan-600 mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

// Interface for Step
interface Step {
  id: number;
  title: string;
  description: string;
  icon?: React.JSX.Element; 
}

const NumberedStepIcon = ({ number }: { number: number }) => (
    <div className="flex items-center justify-center w-10 h-10 bg-cyan-600 text-white rounded-full font-bold text-xl mr-4 shrink-0 transition-transform duration-300 ease-in-out group-hover:scale-110">
        {number}
    </div>
);


const ServicesPage = () => {
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [visibleSections, setVisibleSections] = useState<Record<number, boolean>>({});

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string | undefined>(undefined);

  const openModal = (serviceTitle: string) => {
    setSelectedServiceTitle(serviceTitle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedServiceTitle(undefined);
  };


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
            if (index !== -1) {
              setVisibleSections(prev => ({ ...prev, [index]: true }));
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const engagementModels = [
    {
      id: 1,
      title: "Ongoing Support? Monthly Retainers",
      icon: <ClockIcon />,
      description: "Perfect for businesses seeking consistent, reliable support. A monthly retainer guarantees my availability for a set number of hours, allowing us to proactively manage your operations, tackle creative projects, and ensure everything runs smoothly. This model is ideal for long-term partnership and continuous improvement.",
      bestFor: "Businesses needing regular assistance with a variety of tasks, social media management, content creation, ongoing website maintenance, etc.",
      ctaText: "Explore Retainer Options",
    },
    {
      id: 2,
      title: "Specific Project or Phase? Project-Based Packages",
      icon: <BriefcaseIcon />,
      description: "Have a defined project with a clear start and end, like a website build, a video series, or setting up a Notion workspace? My project-based packages offer a fixed scope and price, giving you clarity and predictable outcomes.",
      bestFor: "Website development, specific marketing campaigns, system setups (e.g., Notion, Google Workspace), larger video editing projects.",
      ctaText: "Discuss Your Project",
    },
    {
      id: 3,
      title: "Single Task or Quick Fix? One-Off Tasks",
      icon: <CheckCircleIcon />,
      description: "Sometimes you just need a specific task done quickly and efficiently without a long-term commitment. Whether it's a quick website update, a single video edit, or setting up a specific automation, I can help with ad-hoc tasks.",
      bestFor: "Small website fixes, urgent graphic design needs, single video edits, quick consultations.",
      ctaText: "Request a One-Off Task",
    }
  ];

  const nextSteps: Step[] = [
    {
      id: 1,
      title: "Complete an Intake Form & Connect",
      description: "Fill out a brief form so I can understand your initial needs. Then, we can book a discovery call or chat via email/messaging – whichever you prefer."
    },
    {
      id: 2,
      title: "Discuss & Strategize",
      description: "We'll discuss your goals, challenges, and determine the best service model or package for your business."
    },
    {
      id: 3,
      title: "Proposal, Contract & Invoice",
      description: "Once we're aligned, I'll provide a clear proposal outlining the scope, deliverables, timeline, and investment. We'll then proceed with a contract and initial invoice."
    },
    {
      id: 4,
      title: "Official Onboarding & Kick-off",
      description: "Welcome aboard! We'll go through a smooth onboarding process to integrate me into your workflows, set up communication channels, and officially kick off our partnership."
    }
  ];


  return (
    <>
      {/* Hero Section for Services Page */}
      <header 
        ref={el => { sectionRefs.current[0] = el; }} 
        className={`bg-white text-slate-800 py-20 sm:py-28 px-4 ${visibleSections[0] ? 'is-visible' : ''} fade-in-section`}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Tailored Support: <span className="text-cyan-700">How We Can Work Together</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            Whether you need ongoing support, help with a specific project, or a quick task handled, I offer flexible service options designed to fit your unique requirements and help your business thrive.
          </p>
        </div>
      </header>

      {/* Which Service Model Suits You? Section */}
      <section 
        ref={el => { sectionRefs.current[1] = el; }} 
        className={`py-16 sm:py-24 bg-slate-50 ${visibleSections[1] ? 'is-visible' : ''} fade-in-section`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Which Engagement Model is Right for Your Business?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              I understand every business is different. That's why I offer various ways to partner, ensuring you get the precise support you need, when you need it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagementModels.map((model, index) => (
              <div 
                key={model.id} 
                className={`group bg-white p-6 sm:p-8 rounded-xl shadow-xl border border-slate-200 flex flex-col hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out ${visibleSections[1] ? 'is-visible' : ''} fade-in-section`}
                style={{ transitionDelay: visibleSections[1] ? `${index * 0.1}s` : '0s' }}
              >
                <div className="flex justify-center mb-4">{model.icon}</div>
                <h3 className="text-xl sm:text-2xl font-semibold text-cyan-700 mb-3 text-center">{model.title}</h3>
                <p className="text-sm text-slate-600 mb-4 text-center flex-grow">{model.description}</p>
                <div className="mt-auto">
                  <p className="text-xs text-slate-500 mb-4 italic text-center"><strong>Best for:</strong> {model.bestFor}</p>
                  <button 
                    onClick={() => openModal(model.title)}
                    className="block w-full text-center mt-auto text-white bg-cyan-700 hover:bg-cyan-800 font-semibold py-3 px-4 rounded-lg transition duration-300 text-sm sm:text-base transform group-hover:scale-105"
                  >
                      {model.ctaText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section 
        ref={el => { sectionRefs.current[2] = el; }} 
        className={`py-16 sm:py-24 bg-white ${visibleSections[2] ? 'is-visible' : ''} fade-in-section`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Ready to Streamline Your Business? <span className="block sm:inline">Here’s How We Begin.</span>
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-8">
            {nextSteps.map((step, index) => (
              <div 
                key={step.id} 
                className={`group flex items-start p-4 hover:bg-slate-50 rounded-lg transition-colors duration-200 ${visibleSections[2] ? 'is-visible' : ''} fade-in-section`}
                style={{ transitionDelay: visibleSections[2] ? `${index * 0.15}s` : '0s' }}
              >
                <NumberedStepIcon number={step.id} />
                <div>
                  <h4 className="text-xl font-semibold text-slate-700 mb-1 group-hover:text-cyan-700 transition-colors">{step.title}</h4>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 sm:mt-16">
            <button 
              onClick={() => openModal("General Inquiry / First Step")}
              className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-3 px-8 sm:py-4 sm:px-10 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 text-base sm:text-lg"
            >
                Take the First Step Today
            </button>
          </div>
        </div>
      </section>
      
      <ContactModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        serviceTitle={selectedServiceTitle}
        emailAddress="iamwillempacardo@gmail.com"
        emailSubject="Service Inquiry"
      />
    </>
  );
};

export default ServicesPage; 