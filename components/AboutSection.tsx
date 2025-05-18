"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const AboutSection = () => {
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

  const textContentRef = useRef<HTMLDivElement>(null);
  const [isTextVisible, setIsTextVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return; 

    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsTextVisible(true);
            textObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 } 
    );

    if (textContentRef.current) {
      textObserver.observe(textContentRef.current);
    }
    return () => {
      if (textContentRef.current) {
        textObserver.unobserve(textContentRef.current);
      }
    };
  }, [isVisible]); 

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className={`py-16 sm:py-24 bg-white ${isVisible ? 'is-visible' : ''} fade-in-section`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4 sm:mb-5">More About Me</h2>
        </div>
        <div className="flex flex-col md:flex-row items-center md:space-x-10 lg:space-x-16">
          <div className={`md:w-2/5 lg:w-1/3 mb-10 md:mb-0 ${isVisible ? 'is-visible' : ''} fade-in-section`}> 
            <div className="relative w-full max-w-xs sm:max-w-sm mx-auto aspect-square rounded-lg shadow-xl overflow-hidden"> 
              <Image 
                src="/images/willem-about.jpeg" 
                alt="Willem Pacardo - Professional Headshot" 
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 40vw, 33vw"
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; 
                  target.src = 'https://placehold.co/400x400/CBD5E1/475569?text=Your+Photo'; 
                  console.error("Failed to load about section image");
                }}
              />
            </div>
          </div>
          <div 
            ref={textContentRef} 
            className={`md:w-3/5 lg:w-2/3 ${isTextVisible ? 'is-visible' : ''} fade-in-section`} 
            style={{transitionDelay: isVisible ? '0.2s' : '0s' }} 
          >
            <h3 className="text-2xl sm:text-3xl font-semibold text-slate-800 mb-4 sm:mb-6">
              Hey I’m <span className="text-cyan-700">Aaron</span>, your Digital Operations Expert!
            </h3>
            <p className="text-base sm:text-lg text-slate-600 mb-4 leading-relaxed">
              I’m here to help your business shine and run smoothly. I specialize in both creative and administrative tasks so you get the best of both worlds.
            </p>
            <p className="text-base sm:text-lg text-slate-600 mb-4 leading-relaxed">
              From building and managing websites with WordPress, editing engaging videos using CapCut and DaVinci Resolve, to organizing your files and handling communication through Google Workspace and Notion. I’ve got you covered. I use smart tools and automation like ChatGPT to make your workflows efficient and your content stand out.
            </p>
            <p className="text-base sm:text-lg text-slate-700 font-medium mb-3">Here’s what working with me brings to your business:</p>
            <ul className="space-y-2 mb-6 sm:mb-8 text-base sm:text-lg text-slate-600">
              <li className="flex items-start"><span className="text-cyan-600 mr-2">✅</span> Eye-catching WordPress websites that convert visitors into customers</li>
              <li className="flex items-start"><span className="text-cyan-600 mr-2">✅</span> Polished video content that grabs attention and tells your story</li>
              <li className="flex items-start"><span className="text-cyan-600 mr-2">✅</span> Streamlined admin tasks with Google Workspace and Notion for easy project management</li>
              <li className="flex items-start"><span className="text-cyan-600 mr-2">✅</span> Organized digital assets for quick access and smooth collaboration</li>
              <li className="flex items-start"><span className="text-cyan-600 mr-2">✅</span> Friendly, clear communication with your audience and team</li>
              <li className="flex items-start"><span className="text-cyan-600 mr-2">✅</span> Reliable support tailored to your unique needs and goals</li>
              <li className="flex items-start"><span className="text-cyan-600 mr-2">✅</span> Leveraging AI tools like ChatGPT to save you time and boost productivity</li>
            </ul>
            <a 
              href="#contact" 
              onClick={(e) => { 
                e.preventDefault(); 
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base"
            >
              Let’s team up to create, organize, and grow!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;