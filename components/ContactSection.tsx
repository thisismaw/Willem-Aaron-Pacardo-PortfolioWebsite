"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Send, ArrowUpRight } from 'lucide-react';

interface ContactSectionProps { baseDelay?: string; }

const ContactSection = ({ baseDelay = "0s" }: ContactSectionProps) => {
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
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  const intakeFormUrl = "https://assistbyaaron.neetoform.com/2fabcc868482e705acd3";

  return (
    <section 
      id="contact" 
      ref={sectionRef} 
      className="py-24 px-6 bg-white overflow-hidden"
    >
      <div className="container mx-auto">
        <div className={`relative bg-slate-900 rounded-[3rem] p-12 md:p-20 overflow-hidden transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-600/20 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-indigo-900/40 blur-[100px] rounded-full"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-8">
              <Send className="w-3 h-3" />
              Let's Scale Your Business
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
              Ready to automate <br className="hidden md:block" /> your <span className="text-indigo-400">growth?</span>
            </h2>

            <p className="text-lg md:text-xl text-slate-400 mb-12 leading-relaxed">
              Have a project in mind or just want to discuss how my digital operations can save you 10+ hours a week? I&apos;m currently accepting new high-impact partners.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link 
                href={intakeFormUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-5 px-10 rounded-2xl shadow-2xl shadow-indigo-600/20 transition-all transform hover:-translate-y-1 text-lg"
              >
                Start Intake Form
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              
              <Link 
                href="mailto:hello@assistbyaaron.com"
                className="text-white/60 hover:text-white font-bold transition-colors py-4"
              >
                Or email me directly
              </Link>
            </div>
          </div>
        </div>
        
        {/* Simple Footer Text */}
        <div className="mt-16 text-center text-slate-400 text-sm font-medium tracking-wide">
          © {new Date().getFullYear()} AssistByAaron. Built with Next.js & Passion.
        </div>
      </div>
    </section>
  );
};

export default ContactSection;