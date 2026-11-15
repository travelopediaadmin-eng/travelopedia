'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Users, 
  Calendar, 
  Star, 
  ChevronDown, 
  Sparkles, 
  ShieldCheck,
  Compass,
  CheckCircle2,
  PhoneCall,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';

interface HeroSectionProps {
  onSearch?: (destination: string, type: string, season: string) => void;
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  const router = useRouter();

  // Multi-Slide Background Carousel
  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=2400&q=90',
      title: 'Greece Santorini Caldera & Sunset Domes',
      tag: 'Aegean Romance'
    },
    {
      url: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=2400&q=90',
      title: 'Switzerland Alpine Peaks & Glaciers',
      tag: 'Europe Luxury'
    },
    {
      url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=90',
      title: 'Dubai Skyline, Desert & Private Yachts',
      tag: 'Middle East'
    },
    {
      url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2400&q=90',
      title: 'Bali Cliffside Villas & Sunset Swings',
      tag: 'Tropical Haven'
    },
    {
      url: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2400&q=90',
      title: 'Kashmir Valley & Gulmarg Gondola',
      tag: 'Snow Paradise'
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Search state
  const [destination, setDestination] = useState('');
  const [travelers, setTravelers] = useState('2 Adults');
  const [travelSeason, setTravelSeason] = useState('Any Time');
  const [showTravelersDropdown, setShowTravelersDropdown] = useState(false);
  const [showSeasonDropdown, setShowSeasonDropdown] = useState(false);

  // Animated typing placeholder for "Where to?"
  const placeholderSuggestions = [
    'Greece & Santorini Caldera Suites',
    'Switzerland Alpine Express',
    'Dubai Luxury Marina & Yacht',
    'Bali Private Pool Villa',
    'Kashmir Snow & Dal Lake',
    'Paris & French Riviera',
    'Vietnam Ha Long Bay Cruise',
    'Royal Rajasthan Palaces'
  ];
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = placeholderSuggestions[typingIndex];
    const typingSpeed = isDeleting ? 25 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedPlaceholder(currentWord.substring(0, displayedPlaceholder.length + 1));
        if (displayedPlaceholder.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        setDisplayedPlaceholder(currentWord.substring(0, displayedPlaceholder.length - 1));
        if (displayedPlaceholder.length === 0) {
          setIsDeleting(false);
          setTypingIndex((prev) => (prev + 1) % placeholderSuggestions.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedPlaceholder, isDeleting, typingIndex]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = destination.trim() || displayedPlaceholder;
    if (onSearch) {
      onSearch(query, 'All', travelSeason);
      const packagesSection = document.getElementById('packages-section');
      if (packagesSection) {
        packagesSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/#packages-section?dest=${encodeURIComponent(query)}`);
    }
  };

  const handlePopularClick = (tag: string) => {
    setDestination(tag);
    if (onSearch) {
      onSearch(tag, 'All', travelSeason);
      const packagesSection = document.getElementById('packages-section');
      if (packagesSection) {
        packagesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-[95vh] flex items-center justify-center bg-black overflow-hidden pt-32 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8">
      
      {/* 1. Cinematic Full-Bleed Background Carousel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {slides.map((slide, idx) => (
          <div
            key={slide.url}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
              activeSlide === idx ? 'opacity-100 scale-105 animate-kenburns' : 'opacity-0 scale-100'
            }`}
            style={{
              backgroundImage: `url('${slide.url}')`,
            }}
          />
        ))}

        {/* Layered Luxury Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]" />
      </div>

      {/* 2. Brand Identity Glowing Ambient Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-logo-lavender/15 blur-[140px] pointer-events-none animate-bubble-1" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-logo-coral/15 blur-[140px] pointer-events-none animate-bubble-2" />

      {/* 3. Main Center Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
        
        {/* Top Surat Desk Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest text-white shadow-xl mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-logo-coral animate-ping" />
          <span>Surat&apos;s Trusted Luxury Travel Partner • Since 2016</span>
        </motion.div>

        {/* Main Headline (Clean, Luxury, Proportional) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight leading-[1.1] max-w-4xl drop-shadow-2xl"
        >
          This is where your <br className="hidden sm:inline" />
          <span className="italic font-serif font-light text-logo-peach drop-shadow">
            love for travel begins.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-4 text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl font-light leading-relaxed drop-shadow"
        >
          Curated international holidays, private villas, and bespoke domestic tours crafted on VIP Road, Vesu. 100% vegetarian &amp; Jain friendly care.
        </motion.p>

        {/* =========================================================================
            UNIFIED HORIZONTAL SMART SEARCH BAR (Cox & Kings & MakeMyTrip Luxe Style)
           ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 sm:mt-10 w-full max-w-4xl"
        >
          <form
            onSubmit={handleSearch}
            className="bg-black/60 backdrop-blur-2xl rounded-3xl sm:rounded-full border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-2 sm:p-2.5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 hover:border-logo-coral/40 transition-all"
          >
            {/* 1. Destination Input */}
            <div className="flex-1 flex items-center gap-3 px-4 py-3 sm:py-2 hover:bg-white/5 rounded-2xl sm:rounded-full transition-colors relative">
              <MapPin className="w-5 h-5 text-logo-coral shrink-0" />
              <div className="flex-1 min-w-0 text-left">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider leading-none mb-1">
                  Where to?
                </span>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder={displayedPlaceholder}
                    className="w-full bg-transparent text-sm sm:text-base font-semibold text-white placeholder:text-slate-300 focus:outline-none"
                  />
                  {!destination && (
                    <span className="w-0.5 h-4 bg-logo-coral animate-blink ml-0.5 inline-block" />
                  )}
                </div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-8 bg-white/20 shrink-0" />

            {/* 2. Who's travelling? Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowTravelersDropdown(!showTravelersDropdown);
                  setShowSeasonDropdown(false);
                }}
                className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3 px-4 py-3 sm:py-2 hover:bg-white/5 rounded-2xl sm:rounded-full transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-logo-lavender shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider leading-none mb-1">
                      Who&apos;s travelling?
                    </span>
                    <span className="text-sm font-semibold text-white block">
                      {travelers}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showTravelersDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showTravelersDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 left-0 w-60 bg-navy-950/98 backdrop-blur-2xl border border-white/20 rounded-2xl p-2 shadow-2xl z-50 text-white text-left"
                  >
                    {[
                      '1 Solo Explorer',
                      '2 Adults (Couple / Honeymoon)',
                      'Family (2 Adults + 2 Kids)',
                      'Group Tour (6+ Travelers)',
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setTravelers(opt);
                          setShowTravelersDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2.5 rounded-xl text-xs hover:bg-white/15 transition-colors font-semibold"
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden sm:block w-px h-8 bg-white/20 shrink-0" />

            {/* 3. When? Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowSeasonDropdown(!showSeasonDropdown);
                  setShowTravelersDropdown(false);
                }}
                className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3 px-4 py-3 sm:py-2 hover:bg-white/5 rounded-2xl sm:rounded-full transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-logo-peach shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider leading-none mb-1">
                      When?
                    </span>
                    <span className="text-sm font-semibold text-white block">
                      {travelSeason}
                    </span>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showSeasonDropdown ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showSeasonDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 right-0 w-64 bg-navy-950/98 backdrop-blur-2xl border border-white/20 rounded-2xl p-2 shadow-2xl z-50 text-white text-left"
                  >
                    {[
                      'Any Time (Flexible Dates)',
                      'Oct - Dec 2026 (Winter Special)',
                      'Jan - Mar 2027 (Spring Escape)',
                      'Apr - Jun 2027 (Summer Vacations)',
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setTravelSeason(opt);
                          setShowSeasonDropdown(false);
                        }}
                        className="w-full text-left px-3 py-2.5 rounded-xl text-xs hover:bg-white/15 transition-colors font-semibold"
                      >
                        {opt}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. Search Submit Button */}
            <button
              type="submit"
              className="px-8 py-3.5 sm:py-3 rounded-full bg-gradient-to-r from-logo-coralDeep via-brand-500 to-logo-peachGold hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-logo-coralDeep/30 transition-transform active:scale-95 shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </form>
        </motion.div>

        {/* Quick Trending Destinations Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-6 flex items-center justify-center gap-2 flex-wrap"
        >
          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold mr-1">
            Popular right now:
          </span>
          {['Greece & Santorini', 'Switzerland', 'Dubai', 'Bali', 'Kashmir', 'Vietnam'].map((tag) => (
            <button
              key={tag}
              onClick={() => handlePopularClick(tag)}
              className="px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-slate-200 transition-all hover:scale-105"
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Trust Badges Strip (Clean, Balanced, Bottom) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-300 pt-6 border-t border-white/10 w-full"
        >
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-bold text-white">4.9/5</span>
            <span className="text-slate-400">(<AnimatedCounter target={1200} suffix="+" /> Surat Families)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Pure Veg &amp; Jain Food Care</span>
          </div>

          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-logo-coral" />
            <span>Physical Office at VIP Road, Vesu</span>
          </div>

          <div className="flex items-center gap-1.5">
            <PhoneCall className="w-4 h-4 text-logo-peach" />
            <span>24x7 Dedicated Travel Desk</span>
          </div>
        </motion.div>

      </div>

    </section>
  );
}
