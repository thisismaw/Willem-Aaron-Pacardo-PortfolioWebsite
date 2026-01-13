"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { PortfolioItem } from '@/lib/portfolioApi';
import { X, Youtube, ExternalLink, Download, CheckCircle2, Layout, Zap, Target } from 'lucide-react';

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
      <p key={index} className="mb-4 text-slate-600 leading-relaxed text-sm md:text-base">
        {paragraph.split('\n').map((line, i) => (
          <React.Fragment key={i}>{line}<br/></React.Fragment>
        ))}
      </p>
    ));
  };

  return (
    <div 
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-xl flex items-center justify-center z-[100] p-4 md:p-6"
      onClick={onClose} 
    >
      <div 
        className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-500 ease-out animate-modalShow border border-slate-100"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md px-8 py-6 flex justify-between items-center border-b border-slate-50">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter leading-none">{item.title}</h2>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mt-2">{item.category}</p>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          {/* Main Visual: YouTube or Image */}
          <div className="mb-10">
            {item.youtubeVideoId ? (
              <div className="aspect-video w-full rounded-[1.5rem] overflow-hidden shadow-2xl shadow-indigo-500/10">
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
            ) : (
              <div className="relative w-full aspect-[16/9] rounded-[1.5rem] overflow-hidden shadow-xl border border-slate-100">
                <Image
                  src={item.imageUrl}
                  alt={item.title || 'Project image'}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column: Details */}
            <div className="lg:col-span-2 space-y-8">
              {item.challenge && (
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-900 mb-4">
                    <Target className="w-4 h-4 text-indigo-600" /> The Challenge
                  </h4>
                  <div className="pl-6 border-l-2 border-slate-100">{renderDescription(item.challenge)}</div>
                </div>
              )}

              {item.solution && (
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-900 mb-4">
                    <Zap className="w-4 h-4 text-indigo-600" /> My Solution
                  </h4>
                  <div className="pl-6 border-l-2 border-indigo-100">{renderDescription(item.solution)}</div>
                </div>
              )}

              {item.results && item.results.length > 0 && (
                <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/50">
                  <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-indigo-900 mb-4">
                    <CheckCircle2 className="w-4 h-4" /> Key Outcomes
                  </h4>
                  <ul className="space-y-3">
                    {item.results.map((result, index) => (
                      <li key={index} className="flex items-start gap-3 text-indigo-900/80 text-sm font-medium">
                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column: Meta Info */}
            <div className="space-y-8">
              {item.client && (
                <div className="p-5 bg-slate-50 rounded-2xl">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Client</p>
                  <p className="text-sm font-bold text-slate-900">{item.client}</p>
                </div>
              )}

              {item.tags && (
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                    <Layout className="w-3 h-3" /> Stack & Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="bg-white border border-slate-200 text-slate-600 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-tighter">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-4">
                {item.liveLink && item.liveLink !== "#" && (
                  <Link
                    href={item.liveLink}
                    target="_blank"
                    className={`flex items-center justify-center gap-2 font-bold py-4 px-6 rounded-xl transition-all text-sm uppercase tracking-widest shadow-lg ${
                      item.youtubeVideoId ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/20' : 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20'
                    }`}
                  >
                    {item.youtubeVideoId ? <Youtube className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                    {item.linkText || "View Live"}
                  </Link>
                )}

                {item.downloadUrl && (
                  <a
                    href={item.downloadUrl}
                    download
                    className="flex items-center justify-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold py-4 px-6 rounded-xl transition-all text-sm uppercase tracking-widest"
                  >
                    <Download className="w-4 h-4" /> Download File
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{` 
        @keyframes modalShow {
          0% { transform: scale(0.9) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0px); opacity: 1; }
        }
        .animate-modalShow {
          animation: modalShow 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default PortfolioDetailModal;