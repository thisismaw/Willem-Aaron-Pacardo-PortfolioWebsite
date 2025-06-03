"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { PortfolioItem } from '@/lib/portfolioApi';

interface PortfolioDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: PortfolioItem | null;
}

const PortfolioDetailModal = ({ isOpen, onClose, item }: PortfolioDetailModalProps) => {
  if (!isOpen || !item) return null;

  const renderDescription = (text?: string) => {
    if (!text) return null;
    return text.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-3 text-slate-600">{paragraph.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</p>
    ));
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[70] p-4 transition-opacity duration-300 ease-in-out"
      onClick={onClose} 
    >
      <div 
        className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1">{item.title}</h2>
            <p className="text-md text-cyan-600 font-semibold">{item.category}</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 transition-colors ml-4"
            aria-label="Close modal"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {/* YouTube Video Embed */}
        {item.youtubeVideoId ? (
          <div className="aspect-video w-full mb-6 rounded-lg overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${item.youtubeVideoId}?autoplay=0&rel=0`}
              title={item.title || "YouTube video player"}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ) : item.imageUrl ? ( // Main Image (if no YouTube video)
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-6 shadow-lg">
            <Image
              src={item.imageUrl}
              alt={item.title || 'Project image'}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover"
            />
          </div>
        ) : null}
        
        {/* Gallery Images Section (if no YouTube video or as additional visuals) */}
        {item.galleryImages && item.galleryImages.length > 0 && !item.youtubeVideoId && (
          <div className="mb-6">
            <h4 className="text-xl font-semibold text-slate-700 mb-3">Image Gallery</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {item.galleryImages.map((imgSrc, index) => (
                <div key={index} className="relative aspect-square rounded-md overflow-hidden shadow">
                  <Image
                    src={imgSrc}
                    alt={`${item.title} - Gallery Image ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
                    className="object-cover"
                    onError={(e) => { 
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; 
                      target.src = `https://placehold.co/400x400/E2E8F0/475569?text=Image+Error`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {item.client && <p className="text-sm text-slate-500 mb-4"><strong>Client:</strong> {item.client}</p>}
        
        {item.challenge && (
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-slate-700 mb-1">The Challenge:</h4>
            <div className="text-slate-600">{renderDescription(item.challenge)}</div>
          </div>
        )}

        {item.solution && (
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-slate-700 mb-1">My Solution:</h4>
            <div className="text-slate-600">{renderDescription(item.solution)}</div>
          </div>
        )}
        
        {item.fullDescription && (
             <div className="mb-4">
                <h4 className="text-lg font-semibold text-slate-700 mb-1">About This Project:</h4>
                <div className="text-slate-600">{renderDescription(item.fullDescription)}</div>
            </div>
        )}


        {item.results && item.results.length > 0 && (
          <div className="mb-4">
            <h4 className="text-lg font-semibold text-slate-700 mb-1">Key Results &amp; Impact:</h4>
            <ul className="list-disc list-inside text-slate-600 space-y-1 pl-1">
              {item.results.map((result, index) => (
                <li key={index}>{result}</li>
              ))}
            </ul>
          </div>
        )}

        {item.tags && item.tags.length > 0 && (
            <div className="mb-6">
                <h4 className="text-md font-semibold text-slate-700 mb-2">Technologies &amp; Skills:</h4>
                <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                        <span key={tag} className="bg-cyan-100 text-cyan-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        )}
        
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {item.downloadUrl && (
            <a
              href={item.downloadUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2.5 px-5 rounded-md transition-colors duration-300 text-sm"
            >
              Download File
            </a>
          )}
          {/* Link to YouTube video on YouTube.com if liveLink is provided and it's a YouTube video */}
          {item.youtubeVideoId && item.liveLink && item.liveLink.includes("youtube.com") && (
             <Link
              href={item.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-5 rounded-md transition-colors duration-300 text-sm"
            >
              Watch on YouTube
            </Link>
          )}
          {/* General Live Link (if not a YouTube video with a specific button already) */}
          {item.liveLink && item.liveLink !== "#" && !(item.youtubeVideoId && item.liveLink.includes("youtube.com")) && (
            <Link
              href={item.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center bg-slate-600 hover:bg-slate-700 text-white font-medium py-2.5 px-5 rounded-md transition-colors duration-300 text-sm"
            >
              View Live Project
            </Link>
          )}
        </div>

      </div>
      <style jsx global>{` 
        @keyframes modalShow {
          0% { transform: scale(0.95) translateY(10px); opacity: 0; }
          100% { transform: scale(1) translateY(0px); opacity: 1; }
        }
        .animate-modalShow {
          animation: modalShow 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default PortfolioDetailModal;