'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Sparkles, MapPin } from 'lucide-react';

interface ToastItem {
  id: number;
  name: string;
  location: string;
  action: string;
  packageTitle: string;
  timeAgo: string;
  image: string;
}

const TOASTS: ToastItem[] = [
  {
    id: 1,
    name: 'Dr. Nirav & Priti Choksi',
    location: 'Citylight, Surat',
    action: 'just booked',
    packageTitle: 'Kashmir Valley & Gulmarg Gondola Experience',
    timeAgo: '3 mins ago',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 2,
    name: 'Kashyap Kapadia',
    location: 'VIP Road, Vesu',
    action: 'requested custom plan for',
    packageTitle: 'Dubai 5-Star Marina & Private Yacht',
    timeAgo: '7 mins ago',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 3,
    name: 'Pooja & Sameer Dalal',
    location: 'Adajan, Surat',
    action: 'unlocked Honeymoon offer for',
    packageTitle: 'Bali Private Pool Villa & Nusa Penida',
    timeAgo: '14 mins ago',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 4,
    name: 'Hitesh Jariwala',
    location: 'Ghod Dod Road, Surat',
    action: 'confirmed slots for',
    packageTitle: 'Switzerland & Paris 9-Day Grand Circuit',
    timeAgo: '22 mins ago',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=150&q=80',
  },
];

export default function LiveSocialProof() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDismissed || !hasScrolled) return;

    // Show first toast after scrolling
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    // Loop through toasts every 16 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % TOASTS.length);
        setIsVisible(true);
      }, 1000);
    }, 16000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed, hasScrolled]);

  if (isDismissed) return null;
  const current = TOASTS[currentIdx];

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden sm:block pointer-events-none">
      <AnimatePresence>
        {isVisible && current && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, type: 'spring', damping: 20 }}
            className="pointer-events-auto bg-white/95 backdrop-blur-xl rounded-2xl p-3.5 shadow-2xl border border-slate-200/80 max-w-sm flex items-center gap-3.5"
          >
            {/* Thumbnail */}
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-md">
              <img
                src={current.image}
                alt={current.packageTitle}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                <CheckCircle2 className="w-2.5 h-2.5 text-white" />
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center justify-between text-[11px] mb-0.5">
                <span className="font-bold text-navy-950 truncate">
                  {current.name}
                </span>
                <span className="text-[10px] text-slate-400 shrink-0">
                  {current.timeAgo}
                </span>
              </div>

              <p className="text-[11px] text-slate-600 leading-tight">
                {current.action}{' '}
                <strong className="text-logo-coralDeep font-semibold truncate block">
                  {current.packageTitle}
                </strong>
              </p>

              <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 font-medium">
                <MapPin className="w-2.5 h-2.5 text-logo-coral" />
                <span>{current.location}</span>
                <span>•</span>
                <span className="text-emerald-600 font-semibold">Verified Traveler</span>
              </div>
            </div>

            {/* Dismiss button */}
            <button
              onClick={() => setIsDismissed(true)}
              className="text-slate-400 hover:text-slate-700 p-1 rounded-md self-start"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
