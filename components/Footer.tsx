import Link from 'next/link'; 

// SVG Icon Components
const EmailIcon = () => (
  <svg className="w-5 h-5 mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
  </svg>
);
const LocationIcon = () => (
  <svg className="w-5 h-5 mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
  </svg>
);
const GlobeIcon = () => (
  <svg className="w-5 h-5 mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.528-1.973 6.012 6.012 0 011.912 2.706C16.27 9.34 16.022 10 15.002 10h-1.004a1 1 0 00-1 1v.002a1 1 0 001 1h.004a1 1 0 011 1v.002a1 1 0 01-1 1h-1.004a1 1 0 01-.992-.873A3.5 3.5 0 0010 11.5a3.5 3.5 0 00-2.504 1.127 1 1 0 01-.992.873H5.498a1 1 0 01-1-1v-.002a1 1 0 011-1h.004a1 1 0 001-1V9a1 1 0 00-1-1H4.002C2.982 10 2.73 9.34 3.332 8.027z" clipRule="evenodd"></path>
  </svg>
);
const LinkedInIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);
const GitHubIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);
const TwitterIcon = () => ( 
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.359 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const HeartIcon = () => (
  <svg className="w-3 h-3 inline-block text-cyan-500 mx-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"> 
    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-slate-300 py-12 sm:py-16"> 
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 mb-8 sm:mb-10 text-center sm:text-left">
          <div>
            <h5 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Navigate</h5>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#home" className="footer-link hover:text-cyan-400 transition duration-300 text-sm sm:text-base">Home</a></li>
              <li><a href="#services" className="footer-link hover:text-cyan-400 transition duration-300 text-sm sm:text-base">Services</a></li>
              <li><a href="#portfolio" className="footer-link hover:text-cyan-400 transition duration-300 text-sm sm:text-base">Portfolio</a></li>
              <li><a href="#blog" className="footer-link hover:text-cyan-400 transition duration-300 text-sm sm:text-base">Blog</a></li>
              <li><a href="#about" className="footer-link hover:text-cyan-400 transition duration-300 text-sm sm:text-base">About Me</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Get in Touch</h5>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li>
                <a href="mailto:hello@yourdomain.com" className="footer-link hover:text-cyan-400 transition duration-300 flex items-center justify-center sm:justify-start">
                  <EmailIcon /> hello@yourdomain.com
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <LocationIcon /> Polomolok, Philippines
              </li>
              <li className="flex items-center justify-center sm:justify-start">
                <GlobeIcon /> Available for Remote Worldwide
              </li>
              <li>
                <a href="#contact" className="footer-link font-medium inline-block mt-2 bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-md transition-colors">
                  Start a Project
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6">Connect</h5>
            <div className="flex space-x-5 justify-center sm:justify-start">
              <a href="YOUR_LINKEDIN_URL" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="social-icon text-slate-400 hover:text-cyan-400 transition duration-300 text-xl sm:text-2xl"><LinkedInIcon /></a>
              <a href="YOUR_GITHUB_URL" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="social-icon text-slate-400 hover:text-cyan-400 transition duration-300 text-xl sm:text-2xl"><GitHubIcon /></a>
              <a href="YOUR_TWITTER_URL" target="_blank" rel="noopener noreferrer" aria-label="Twitter Profile" className="social-icon text-slate-400 hover:text-cyan-400 transition duration-300 text-xl sm:text-2xl"><TwitterIcon /></a>
              <a href="YOUR_INSTAGRAM_URL" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className="social-icon text-slate-400 hover:text-cyan-400 transition duration-300 text-xl sm:text-2xl"><InstagramIcon /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 sm:pt-10 text-center">
          <p className="text-xs sm:text-sm mb-2">&copy; {currentYear} Willem Pacardo. All Rights Reserved.</p>
          <p className="text-xs text-slate-400">
            <Link href="/privacy-policy" className="footer-link hover:text-cyan-400">Privacy Policy</Link> | 
            <Link href="/terms-of-service" className="footer-link hover:text-cyan-400">Terms of Service</Link>
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Made with <HeartIcon /> using Next.js, Tailwind CSS & Hosted on GitHub Pages
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;