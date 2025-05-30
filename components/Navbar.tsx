"use client"; 

import React, { useState, useEffect } from 'react'; 
import Link from 'next/link'; 
import { usePathname } from 'next/navigation'; 

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(''); 
  const pathname = usePathname(); 

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentPathBase = pathname.split('/')[1] || 'home';
      if (pathname === '/') {
        if (window.scrollY === 0) setActiveLink('home'); 
      } else {
        setActiveLink(currentPathBase);
      }
    }
  }, [pathname]);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleAnchorLinkClick = (sectionId: string, href: string) => {
    setIsMobileMenuOpen(false); 
    
    if (href.startsWith('/#')) { 
        setActiveLink(sectionId);
        if (pathname !== '/') {
            window.location.href = href; 
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                const yOffset = -68; 
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        }
    } else { 
        setActiveLink(sectionId); 
    }
  };
  
  useEffect(() => {
    if (pathname === '/') { 
      const pageSectionsQuery = 'header[id], section[id]'; 
      let pageSections: HTMLElement[] = Array.from(document.querySelectorAll(pageSectionsQuery)) as HTMLElement[];

      const handleScroll = () => {
        pageSections = Array.from(document.querySelectorAll(pageSectionsQuery)) as HTMLElement[];
        let currentSectionId = 'home'; 
        const scrollPosition = window.pageYOffset;
        const navHeight = 70; 

        for (const section of pageSections) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (scrollPosition >= sectionTop - navHeight - (sectionHeight * 0.3) ) { 
            currentSectionId = section.getAttribute('id') || 'home';
          }
        }
        
        if (scrollPosition < 200 && pageSections.length > 0 && pageSections[0].id === 'home') {
          currentSectionId = 'home';
        }
        setActiveLink(currentSectionId);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); 

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [pathname]);

  const navItems = [
    { id: 'home', label: 'Home', href: '/#home', isPageLink: false },
    { id: 'services', label: 'Services', href: '/#services', isPageLink: false }, // Changed back to anchor
    { id: 'tools', label: 'Tools', href: '/#tools', isPageLink: false },
    { id: 'about', label: 'About', href: '/#about', isPageLink: false },
    { id: 'portfolio', label: 'Portfolio', href: '/portfolio', isPageLink: true }, 
    // Blog link removed
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center"> 
        <Link 
          href="/" 
          onClick={() => handleAnchorLinkClick('home', '/#home')} 
          className="font-logo-rocksalt text-2xl sm:text-3xl text-cyan-700 hover:text-cyan-800 transition-colors"
        > 
          AssistbyAaron
        </Link>
        
        <div className="hidden md:flex space-x-4 lg:space-x-6 items-center"> 
          {navItems.map((item) => (
            item.isPageLink ? (
              <Link 
                key={item.id} 
                href={item.href} 
                onClick={() => { setIsMobileMenuOpen(false); setActiveLink(item.id);}}
                className={`nav-link text-slate-700 hover:text-cyan-700 font-medium px-2 py-1 ${activeLink === item.id ? 'active-link' : ''}`}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleAnchorLinkClick(item.id, item.href);
                }}
                className={`nav-link text-slate-700 hover:text-cyan-700 font-medium px-2 py-1 ${activeLink === item.id ? 'active-link' : ''}`}
              >
                {item.label}
              </a>
            )
          ))}
          <Link
            href="/#contact" 
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault();
                handleAnchorLinkClick('contact', '/#contact');
              } else {
                setIsMobileMenuOpen(false); setActiveLink('contact');
              }
            }}
            className="bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-2 px-4 lg:px-5 rounded-lg transition duration-300 ease-in-out text-sm sm:text-base"
          >
            Contact
          </Link>
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
           item.isPageLink ? (
            <Link 
              key={item.id} 
              href={item.href} 
              onClick={() => { setIsMobileMenuOpen(false); setActiveLink(item.id);}}
              className="block px-6 py-3 text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 transition-colors duration-200 text-center"
            >
              {item.label}
            </Link>
           ) : (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleAnchorLinkClick(item.id, item.href);
              }}
              className="block px-6 py-3 text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 transition-colors duration-200 text-center"
            >
              {item.label}
            </a>
           )
        ))}
        <Link
          href="/#contact"
          onClick={(e) => {
             if (pathname === '/') {
                e.preventDefault();
                handleAnchorLinkClick('contact', '/#contact');
              } else {
                setIsMobileMenuOpen(false); setActiveLink('contact');
              }
          }}
          className="block px-6 py-3 text-cyan-700 bg-cyan-50 hover:bg-cyan-100 font-semibold transition-colors duration-200 text-center mt-2 mx-4 rounded-md"
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};
export default Navbar;