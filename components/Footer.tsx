"use client";
import React from 'react';
import Link from 'next/link'; 
import { Mail, MapPin, Globe, Linkedin, Github, Twitter, Instagram, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const intakeFormUrl = "https://assistbyaaron.neetoform.com/2fabcc868482e705acd3";

  return (
    <footer className="bg-slate-900 text-slate-400 py-20 border-t border-white/5"> 
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h4 className="text-xl font-black text-white tracking-tighter mb-6">
              AssistByAaron<span className="text-indigo-500">.</span>
            </h4>
            <p className="text-sm leading-relaxed mb-6">
              Engineering efficient digital operations and high-performance web solutions for the modern creator economy.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/willempacardo/" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="https://github.com/thisismaw" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors"><Github className="w-5 h-5" /></a>
              {/*<a href="#" className="hover:text-indigo-400 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-indigo-400 transition-colors"><Instagram className="w-5 h-5" /></a> */}  
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h5 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Explore</h5>
            <ul className="space-y-4 text-sm">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><Link href="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Me</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="md:col-span-2 lg:pl-12">
            <h5 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em]">Operations Center</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="space-y-4">
                <Link href={intakeFormUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-indigo-500" /> Start Intake Form
                </Link>
                <p className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-indigo-500" /> Polomolok, Philippines
                </p>
                <p className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-indigo-500" /> Remote Worldwide
                </p>
              </div>
              <div>
                <Link 
                  href={intakeFormUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest py-4 px-6 rounded-xl transition-all w-full"
                >
                  Start a Project
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium tracking-wide">
          <p>© {currentYear} AssistByAaron. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-indigo-500 fill-indigo-500" /> using Next.js & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;