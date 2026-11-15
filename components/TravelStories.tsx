'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  MessageCircle, 
  MapPin, 
  Volume2, 
  VolumeX, 
  Flame,
  Clock,
  Heart
} from 'lucide-react';
import { COMPANY_DETAILS } from '@/lib/utils';

interface Story {
  id: string;
  destination: string;
  tagline: string;
  avatar: string;
  fullImage: string;
  badge: string;
  duration: string;
  price: string;
  likes: number;
}

const STORIES: Story[] = [
  {
    id: 'greece-santorini',
    destination: 'Santorini & Greece',
    tagline: 'Caldera Cave Suite, Oia Blue Domes & Sunset Catamaran',
    avatar: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=300&q=80',
    fullImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    badge: 'Aesthetic Favorite 🇬🇷',
    duration: '7 Nights / 8 Days',
    price: '₹1,95,000',
    likes: 1240
  },
  {
    id: 'dubai-sky',
    destination: 'Dubai Sky & Marina',
    tagline: 'Private Luxury Yacht & Desert Safari at Sunset',
    avatar: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=300&q=80',
    fullImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    badge: 'Trending in Surat 🔥',
    duration: '5 Nights / 6 Days',
    price: '₹78,000',
    likes: 428
  },
  {
    id: 'swiss-glacier',
    destination: 'Swiss Alps Glacier',
    tagline: 'Panoramic Glacier Express & First Cliff Walk',
    avatar: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=300&q=80',
    fullImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    badge: 'Surat Family Favorite ❄️',
    duration: '8 Nights / 9 Days',
    price: '₹1,85,000',
    likes: 892
  },
  {
    id: 'bali-villas',
    destination: 'Bali Private Villas',
    tagline: 'Floating Breakfast & Sunset Swings over Jungle',
    avatar: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=300&q=80',
    fullImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    badge: 'Honeymoon Choice 💖',
    duration: '6 Nights / 7 Days',
    price: '₹62,000',
    likes: 671
  },
  {
    id: 'kashmir-snow',
    destination: 'Kashmir White Magic',
    tagline: 'Guaranteed Gulmarg Gondola & Heated Shikara Ride',
    avatar: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=300&q=80',
    fullImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1200&q=80',
    badge: '100% Pure Veg & Jain 🏔️',
    duration: '5 Nights / 6 Days',
    price: '₹38,500',
    likes: 1204
  },
  {
    id: 'vietnam-cruise',
    destination: 'Vietnam Ha Long Bay',
    tagline: '5-Star Luxury Over-night Cruise & Golden Hands Bridge',
    avatar: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=300&q=80',
    fullImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    badge: 'Gen-Z Trending ⚡',
    duration: '6 Nights / 7 Days',
    price: '₹55,000',
    likes: 512
  },
  {
    id: 'paris-eiffel',
    destination: 'Paris & French Riviera',
    tagline: 'VIP Seine River Cruise & Palace of Versailles',
    avatar: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=300&q=80',
    fullImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    badge: 'Ultra Luxury 🥂',
    duration: '7 Nights / 8 Days',
    price: '₹2,10,000',
    likes: 749
  }
];

export default function TravelStories() {
  const [activeStoryIdx, setActiveStoryIdx] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState<{ [key: string]: boolean }>({});

  // Auto-progress 5-second timer
  useEffect(() => {
    if (activeStoryIdx === null) {
      setProgress(0);
      return;
    }

    setProgress(0);
    const interval = 50; // update every 50ms
    const totalTime = 5000;
    const step = (interval / totalTime) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Go to next story or close
          if (activeStoryIdx < STORIES.length - 1) {
            setActiveStoryIdx((curr) => (curr !== null ? curr + 1 : null));
          } else {
            setActiveStoryIdx(null);
          }
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [activeStoryIdx]);

  const activeStory = activeStoryIdx !== null ? STORIES[activeStoryIdx] : null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeStoryIdx !== null && activeStoryIdx < STORIES.length - 1) {
      setActiveStoryIdx(activeStoryIdx + 1);
    } else {
      setActiveStoryIdx(null);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeStoryIdx !== null && activeStoryIdx > 0) {
      setActiveStoryIdx(activeStoryIdx - 1);
    }
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      
      {/* Story Bar Container (Glassmorphic Floating Pill) */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-5 shadow-2xl border border-white/60">
        
        <div className="flex items-center justify-between mb-3 px-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-logo-coral opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-logo-coralDeep"></span>
            </span>
            <span className="text-xs font-extrabold uppercase tracking-widest text-logo-charcoal">
              Live Vibe Stories
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-logo-lavender/30 text-logo-periwinkleDark font-bold">
              Tap to watch
            </span>
          </div>

          <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
            Direct from Surat holiday desks
          </span>
        </div>

        {/* Story Avatars Carousel */}
        <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-2 scrollbar-none">
          {STORIES.map((story, idx) => (
            <motion.button
              key={story.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveStoryIdx(idx)}
              className="flex flex-col items-center gap-2 shrink-0 group focus:outline-none"
            >
              {/* Animated Gradient Border Ring */}
              <div className="relative p-[2.5px] rounded-full bg-gradient-to-tr from-logo-coral via-logo-peach to-logo-periwinkle group-hover:rotate-180 transition-all duration-700 shadow-md">
                <div className="p-0.5 rounded-full bg-white">
                  <img
                    src={story.avatar}
                    alt={story.destination}
                    className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Floating Micro Flame */}
                <span className="absolute -bottom-1 right-0 bg-white rounded-full p-0.5 shadow-md">
                  <Flame className="w-3.5 h-3.5 text-logo-coralDeep fill-logo-coral" />
                </span>
              </div>

              {/* Story Title */}
              <span className="text-[11px] sm:text-xs font-bold text-slate-700 max-w-[76px] truncate group-hover:text-logo-periwinkleDark transition-colors">
                {story.destination.split(' ')[0]}
              </span>
            </motion.button>
          ))}
        </div>

      </div>

      {/* Full-Screen Instagram Reel/Story Modal */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-2 sm:p-6"
            onClick={() => setActiveStoryIdx(null)}
          >
            {/* Story Card Container */}
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm sm:max-w-md h-[85vh] sm:h-[88vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col justify-between bg-black"
            >
              {/* Background Media */}
              <img
                src={activeStory.fullImage}
                alt={activeStory.destination}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/60" />

              {/* Top Progress Bars */}
              <div className="relative z-20 p-4 space-y-3">
                <div className="flex gap-1.5">
                  {STORIES.map((_, i) => (
                    <div key={i} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white transition-all duration-75"
                        style={{
                          width:
                            i < (activeStoryIdx ?? 0)
                              ? '100%'
                              : i === activeStoryIdx
                              ? `${progress}%`
                              : '0%',
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Top Profile Strip */}
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <div className="bg-white px-2 py-0.5 rounded-lg shadow-sm shrink-0">
                      <img
                        src="/logo.png"
                        alt="The TraveloPedia"
                        className="h-5 w-auto object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold leading-tight">The TraveloPedia</h4>
                      <p className="text-[10px] text-slate-300 flex items-center gap-1">
                        <MapPin className="w-2.5 h-2.5 text-logo-coral" />
                        {activeStory.destination}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveStoryIdx(null)}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Navigation Click Zones */}
              <div
                onClick={handlePrev}
                className="absolute left-0 top-20 bottom-32 w-1/3 z-10 cursor-pointer"
                title="Previous"
              />
              <div
                onClick={handleNext}
                className="absolute right-0 top-20 bottom-32 w-1/3 z-10 cursor-pointer"
                title="Next"
              />

              {/* Floating Prev / Next Chevrons on Desktop */}
              <button
                onClick={handlePrev}
                disabled={activeStoryIdx === 0}
                className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white disabled:opacity-30 backdrop-blur-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                disabled={activeStoryIdx === STORIES.length - 1}
                className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white disabled:opacity-30 backdrop-blur-md"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Bottom Content & Interactive CTA */}
              <div className="relative z-20 p-5 space-y-4 text-white">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-logo-coral/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3 h-3" />
                    <span>{activeStory.badge}</span>
                  </div>

                  <h3 className="text-2xl font-bold font-serif leading-tight">
                    {activeStory.destination}
                  </h3>
                  <p className="text-xs text-slate-200 mt-1 line-clamp-2">
                    {activeStory.tagline}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-white/20">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Clock className="w-3.5 h-3.5" />
                      {activeStory.duration}
                    </span>
                    <span className="text-sm font-black text-amber-300">
                      Starting {activeStory.price}
                    </span>
                  </div>
                </div>

                {/* Bottom Actions Strip */}
                <div className="flex items-center gap-3">
                  <a
                    href={`https://wa.me/${COMPANY_DETAILS.phoneRaw}?text=${encodeURIComponent(
                      `Hi The TraveloPedia, I just saw your live story for "${activeStory.destination}" (${activeStory.duration}, ${activeStory.price}). Please share full details and booking slots.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/30 transition-transform active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Enquire on WhatsApp</span>
                  </a>

                  <button
                    onClick={(e) => toggleLike(activeStory.id, e)}
                    className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        liked[activeStory.id]
                          ? 'fill-red-500 text-red-500 scale-125'
                          : 'text-white'
                      } transition-all`}
                    />
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
