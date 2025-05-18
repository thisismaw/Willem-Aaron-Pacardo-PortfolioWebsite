"use client"; 

import React, { useState, useEffect } from 'react'; 
import Link from 'next/link';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = (sectionId: string) => {
    setIsMobileMenuOpen(false); 
    setActiveLink(sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -68; 
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  useEffect(() => {
    const pageSectionsQuery = 'header[id], section[id]'; 
    let pageSections: HTMLElement[] = Array.from(document.querySelectorAll(pageSectionsQuery)) as HTMLElement[];

    const handleScroll = () => {
      pageSections = Array.from(document.querySelectorAll(pageSectionsQuery)) as HTMLElement[];
      let current = 'home'; 
      const scrollPosition = window.pageYOffset;
      const navHeight = 70; 

      for (const section of pageSections) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop - navHeight - (sectionHeight * 0.3) ) { 
          current = section.getAttribute('id') || 'home';
        }
      }
      
      if (scrollPosition < 200 && pageSections.length > 0 && pageSections[0].id === 'home') {
        current = 'home';
      }
      setActiveLink(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'tools', label: 'Tools' },
    { id: 'about', label: 'About' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'blog', label: 'Blog' },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center"> 
        <a href="#home" onClick={(e) => { e.preventDefault(); handleLinkClick('home');}} className="text-2xl sm:text-3xl font-bold text-cyan-700 hover:text-cyan-800 transition-colors"> 
          YourLogo
        </a>
        
        <div className="hidden md:flex space-x-4 lg:space-x-6 items-center"> 
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.id);
              }}
              className={`nav-link text-slate-700 hover:text-cyan-700 font-medium px-2 py-1 ${activeLink === item.id ? 'active-link' : ''}`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('contact');
            }}
            className="bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-2 px-4 lg:px-5 rounded-lg transition duration-300 ease-in-out text-sm sm:text-base"
          >
            Contact
          </a>
        </div>

        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-slate-700 focus:outline-none p-2" 
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>

      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white shadow-xl absolute top-full left-0 right-0 z-40 py-2`}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick(item.id);
            }}
            className="block px-6 py-3 text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 transition-colors duration-200 text-center"
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('contact');
          }}
          className="block px-6 py-3 text-cyan-700 bg-cyan-50 hover:bg-cyan-100 font-semibold transition-colors duration-200 text-center mt-2 mx-4 rounded-md"
        >
          Contact
        </a>
      </div>
    </nav>
  );
};

export default Navbar;