"use client";
import React from 'react';
interface ContactModalProps { isOpen: boolean; onClose: () => void; serviceTitle?: string;  emailAddress: string; emailSubject?: string; }
const ContactModal = ({ isOpen, onClose, serviceTitle, emailAddress, emailSubject = "Service Inquiry" }: ContactModalProps) => {
  if (!isOpen) return null;
  const subject = serviceTitle ? `${emailSubject}: ${serviceTitle}` : emailSubject;
  const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}`;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4 transition-opacity duration-300 ease-in-out" onClick={onClose} >
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow" onClick={(e) => e.stopPropagation()} >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-slate-800"> Let&apos;s Discuss Your Needs </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors" aria-label="Close modal" >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        {serviceTitle && ( <p className="text-slate-600 mb-4"> You&apos;re interested in the <strong className="text-cyan-700">{serviceTitle}</strong>. That&apos;s great! </p> )}
        <p className="text-slate-600 mb-6"> To get started or to ask any questions, please send me an email. I&apos;ll get back to you as soon as possible to discuss how I can best support your business. </p>
        <a href={mailtoLink} className="w-full inline-block text-center bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 text-base sm:text-lg" > Email Me Now </a>
        <button onClick={onClose} className="w-full mt-3 text-sm text-slate-600 hover:text-slate-800 py-2 rounded-md transition-colors" > Or, keep browsing </button>
      </div>
      <style jsx global>{` @keyframes modalShow { 0% { transform: scale(0.95); opacity: 0; } 100% { transform: scale(1); opacity: 1; } } .animate-modalShow { animation: modalShow 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards; } `}</style>
    </div>
  );
};
export default ContactModal;