"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link'; // Import Link

interface ContactSectionProps { baseDelay?: string; }
const ContactSection = ({ baseDelay = "0s" }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver((entries) => { entries.forEach((entry) => { if (entry.isIntersecting) { setIsVisible(true); if (currentRef) observer.unobserve(currentRef);}});}, { threshold: 0.1 });
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  const intakeFormUrl = "https://assistbyaaron.neetoform.com/2fabcc868482e705acd3";

  return (
    <section id="contact" ref={sectionRef} className={`py-16 sm:py-24 bg-slate-100 ${isVisible ? 'is-visible' : ''} fade-in-section`} style={{ transitionDelay: isVisible ? baseDelay : '0s' }}>
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 sm:mb-5">Get In Touch</h2>
        <p className="text-base sm:text-lg text-slate-600 mb-8 sm:mb-10 max-w-xl md:max-w-2xl mx-auto">
          Have a project in mind, a question, or just want to say hi? I&apos;d love to hear from you! 
          Feel free to reach out, and let&apos;s discuss how we can bring your ideas to life.
        </p>
        <Link 
          href={intakeFormUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-3 px-8 sm:py-4 sm:px-10 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 text-base sm:text-lg"
        >
          Start with My Intake Form
        </Link>
      </div>
    </section>
  );
};
export default ContactSection;