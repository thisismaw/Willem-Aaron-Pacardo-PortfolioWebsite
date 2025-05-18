"use client";

import React, { useEffect, useRef, useState } from 'react';
const ContactSection = () => {
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
      id="contact" 
      ref={sectionRef} 
      className={`py-16 sm:py-24 bg-slate-100 ${isVisible ? 'is-visible' : ''} fade-in-section`}
    >
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-5">Get In Touch</h2>
        <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 max-w-xl md:max-w-2xl mx-auto">
          Have a project in mind, a question, or just want to say hi? I'd love to hear from you! 
          Feel free to reach out, and let's discuss how we can bring your ideas to life.
        </p>
        <a 
          href="mailto:iamwillempacardo@gmail" // Replace with your actual email
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 sm:py-4 sm:px-10 rounded-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105 text-base sm:text-lg"
        >
          Email Me: iamwillempacardo@gmail.com {/* Replace with your actual email */}
        </a>
        {/* You can add more contact methods here if needed, e.g., a contact form component or links to scheduling tools */}
      </div>
    </section>
  );
};
export default ContactSection;