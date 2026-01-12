"use client"; 

import React, { useState, useEffect } from 'react'; 
import Link from 'next/link'; 
import { usePathname } from 'next/navigation'; 
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(''); 
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname(); 

  // Add scroll detection for a more modern "floating" effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleAnchorLinkClick = (sectionId: string, href: string) => {
    setIsMobileMenuOpen(false); 
    if (href.startsWith('/#')) { 
        setActiveLink(sectionId);
        if (pathname !== '/') {
            window.location.href = href; 
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                const yOffset = -80; 
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        }
    } else { 
        setActiveLink(sectionId); 
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', href: '/#home', isPageLink: false },
    { id: 'services', label: 'Services', href: '/#services', isPageLink: false },
    { id: 'tools', label: 'Tools', href: '/#tools', isPageLink: false },
    { id: 'about', label: 'About', href: '/#about', isPageLink: false },
    { id: 'portfolio', label: 'Portfolio', href: '/portfolio', isPageLink: true }, 
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm border-b border-slate-100 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center"> 
        
        {/* LOGO: Clean, Bold, Professional */}
        <Link 
          href="/" 
          className="text-2xl font-black tracking-tighter text-slate-900 group"
          onClick={() => setActiveLink('home')}
        > 
          AssistByAaron<span className="text-indigo-600 group-hover:animate-pulse">.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8"> 
          {navItems.map((item) => (
            <Link 
              key={item.id} 
              href={item.href} 
              onClick={(e) => {
                if (!item.isPageLink) {
                  e.preventDefault();
                  handleAnchorLinkClick(item.id, item.href);
                } else {
                  setActiveLink(item.id);
                }
              }}
              className={`text-xs font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                activeLink === item.id 
                ? 'text-indigo-600' 
                : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          <Link
            href="/#contact" 
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault();
                handleAnchorLinkClick('contact', '/#contact');
              } else {
                setActiveLink('contact');
              }
            }}
            className="bg-slate-900 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-2xl transition duration-300 ease-in-out text-xs uppercase tracking-widest shadow-lg shadow-slate-900/10"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-slate-900 p-2" aria-label="Toggle mobile menu">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Slide-down */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 transition-all duration-300 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
      }`}>
        <div className="flex flex-col p-6 space-y-6">
          {navItems.map((item) => (
             <Link
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  if (!item.isPageLink) {
                    e.preventDefault();
                    handleAnchorLinkClick(item.id, item.href);
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="text-sm font-bold uppercase tracking-widest text-slate-700 hover:text-indigo-600"
              >
                {item.label}
              </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-indigo-600 text-white font-bold py-4 px-6 rounded-2xl text-center text-sm uppercase tracking-widest shadow-lg shadow-indigo-600/20"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;