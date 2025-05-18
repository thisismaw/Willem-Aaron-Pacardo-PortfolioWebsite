"use client"; 

import React, { useEffect, useRef, useState } from 'react'; 

// Define an interface for the service data for better type safety
interface Service {
  id: number;
  icon: React.JSX.Element; // Corrected type for JSX elements
  title: string;
  description: string;
  details: string[];
  rate: string; 
  buttonText: string; 
  buttonLink?: string; // Optional: if the button should link somewhere other than #contact
  highlightClass?: string; 
  delay: string; 
}

// Define new SVG icons for the categories
const CreativeIcon = () => ( 
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.038-.502.082-.752.132M9.75 3.104A2.25 2.25 0 007.5 1.5h-3A2.25 2.25 0 002.25 3.75v16.5A2.25 2.25 0 004.5 22.5h15A2.25 2.25 0 0021.75 20.25V3.75A2.25 2.25 0 0019.5 1.5h-3A2.25 2.25 0 0014.25 3.104M9.75 3.104c.251.038.502.082.752.132M14.25 3.104v5.714a2.25 2.25 0 00.659 1.591l2.841 2.841M14.25 3.104c.251.038.502.082.752.132M14.25 3.104A2.25 2.25 0 0116.5 1.5h3A2.25 2.25 0 0121.75 3.75v16.5A2.25 2.25 0 0119.5 22.5h-15A2.25 2.25 0 012.25 20.25V3.75A2.25 2.25 0 014.5 1.5h3A2.25 2.25 0 019.75 3.104z" />
  </svg>
);

const AdminIcon = () => ( 
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.39 1.024 0 1.414l-.527.737c-.25.35-.272.806-.108 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.11v1.093c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.39.39.39 1.024 0 1.414l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.78.93l-.15.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527a1.125 1.125 0 01-1.45-.12l-.773-.774a1.125 1.125 0 010-1.414l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.11v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.93l.15-.894z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const AllInOneIcon = () => ( 
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12L17 14.25l-1.25-2.25L13.5 11l2.25-1.25L17 7.5l1.25 2.25L20.5 11l-2.25 1.25z"/>
  </svg>
);


const servicesData: Service[] = [
  { 
    id: 1, 
    icon: <CreativeIcon />, 
    title: "Creative Powerhouse", 
    description: "High-impact video editing, visual design, and engaging social media content to captivate your audience.", 
    details: ["Professional Video Editing", "Motion Graphics & Animation", "Social Media Content Creation (Visuals & Copy)", "Basic Graphic Design (Thumbnails, Banners)"], 
    rate: "Packages from $450",
    buttonText: "View Creative Plans",
    buttonLink: "#contact", // Or a link to a specific packages page e.g. "/packages/creative"
    delay: "0s" 
  },
  { 
    id: 2, 
    icon: <AdminIcon />, 
    title: "Seamless Operations", 
    description: "Efficient social media management, website upkeep, and e-commerce support to streamline your digital presence.", 
    details: ["Social Media Scheduling & Analytics", "Community Management", "Website Maintenance & Updates", "E-commerce Store Management"], 
    rate: "Hourly: $40 | Retainers Available",
    buttonText: "Discover Admin Plans",
    buttonLink: "#contact",
    delay: "0.1s" 
  },
  { 
    id: 3, 
    icon: <AllInOneIcon />, 
    title: "The All-in-One Solution", 
    description: "Comprehensive support combining creative flair with administrative efficiency for ultimate brand growth.", 
    details: ["Full-Service Social Media (Strategy to Management)", "Website Design/Dev + Ongoing Maintenance", "Video Production + Distribution", "Customized Project Bundles"], 
    rate: "Custom Quotes Available",
    buttonText: "Get a Custom Quote",
    buttonLink: "#contact",
    highlightClass: "border-cyan-500 ring-2 ring-cyan-500/50", 
    delay: "0.2s" 
  }
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } }); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <section id="services" ref={sectionRef} className={`py-16 sm:py-24 bg-white ${isVisible ? 'is-visible' : ''} fade-in-section`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 md:mb-20"> 
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 sm:mb-5">My Service Packages</h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl md:max-w-2xl mx-auto">Choose the perfect plan to elevate your brand and achieve your digital goals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {servicesData.map((service) => (
            <div 
              key={service.id} 
              className={`service-card bg-slate-50 p-6 sm:p-8 rounded-xl shadow-xl border-2 border-transparent hover:border-cyan-500/50 flex flex-col justify-between ${isVisible ? 'is-visible' : ''} fade-in-section ${service.highlightClass || ''}`}
              style={{ transitionDelay: isVisible ? service.delay : '0s' }} 
            >
              <div> 
                <div className="text-cyan-600 mb-4 sm:mb-6 flex justify-center"> 
                  {service.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-3 sm:mb-4 text-center">{service.title}</h3>
                <p className="text-sm text-slate-600 mb-4 sm:mb-5 text-center min-h-[60px]">{service.description}</p>
                <ul className="text-xs sm:text-sm text-slate-600 list-disc list-inside space-y-1 sm:space-y-2 pl-2 mb-6">
                  {service.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>

              <div> 
                <p className="text-center text-lg sm:text-xl font-semibold text-cyan-700 mb-5">{service.rate}</p>
                <a 
                  href={service.buttonLink || "#contact"} 
                  onClick={(e) => { 
                    if (service.buttonLink === "#contact" || !service.buttonLink) {
                      e.preventDefault(); 
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="block w-full text-center mt-auto text-white bg-cyan-700 hover:bg-cyan-800 font-semibold py-3 px-4 rounded-lg transition duration-300 text-sm sm:text-base"
                >
                  {service.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
