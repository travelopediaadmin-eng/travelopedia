'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, 
  Sparkles, 
  Palmtree, 
  Mountain, 
  Castle, 
  Sun, 
  ArrowRight, 
  ShieldCheck, 
  Utensils, 
  Plane,
  Clock,
  PhoneCall,
  ChevronRight
} from 'lucide-react';
import { COMPANY_DETAILS } from '@/lib/utils';

interface Collection {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  icon: any;
  coverImage: string;
  destinations: string[];
  sampleSlug: string;
  duration: string;
  highlights: string[];
  color: string;
  accentBg: string;
}

const COLLECTIONS: Collection[] = [
  {
    id: 'villas',
    title: 'Cliffside Villas & Private Pools',
    subtitle: 'Overwater bungalows, infinity pools & floating breakfast experiences',
    tag: 'Ultra Luxury Romance',
    icon: Palmtree,
    coverImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85',
    destinations: ['Santorini (Greece)', 'Ubud & Nusa Penida (Bali)', 'Maldives Private Atolls'],
    sampleSlug: 'greece-santorini-caldera-luxury-romance',
    duration: '6N to 8N Itineraries',
    highlights: [
      'Private caldera plunge pool suites',
      'Sunset catamaran with private chef',
      'Guaranteed pure vegetarian & Jain catering'
    ],
    color: 'from-rose-500/80 to-amber-500/80',
    accentBg: 'bg-rose-50 text-rose-700 border-rose-200'
  },
  {
    id: 'alpine',
    title: 'Alpine Glaciers & Snow Wonders',
    subtitle: 'Panoramic mountain railways, glacier walks & fireside chalets',
    tag: 'Europe & Kashmir Peaks',
    icon: Mountain,
    coverImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=85',
    destinations: ['Zermatt & Lucerne (Swiss)', 'Gulmarg & Dal Lake (Kashmir)', 'Innsbruck (Austria)'],
    sampleSlug: 'swiss-paris-european-odyssey',
    duration: '7N to 10N Itineraries',
    highlights: [
      'Glacier 3000 & First Cliff Walk',
      'VIP Gondola Phase 2 confirmed passes',
      'Authentic Gujarati dining in Interlaken & Zurich'
    ],
    color: 'from-blue-600/80 to-cyan-500/80',
    accentBg: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'heritage',
    title: 'Royal Palaces & Desert Dunes',
    subtitle: 'Maharaja heritage stays, private desert glamping & sunset yachts',
    tag: 'Regal Experiences',
    icon: Castle,
    coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85',
    destinations: ['Dubai Marina & Royal Desert', 'Udaipur & Jaipur Palaces', 'Abu Dhabi Oasis'],
    sampleSlug: 'dubai-extravaganza-luxury',
    duration: '5N to 7N Itineraries',
    highlights: [
      'Private 4x4 Land Cruiser desert dune safari',
      'Taj Lake Palace & heritage royal suites',
      'Private luxury yacht charter in Dubai Marina'
    ],
    color: 'from-amber-600/80 to-orange-500/80',
    accentBg: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: 'family',
    title: 'Multi-Gen Grand Family Holidays',
    subtitle: 'Spacious interconnecting suites, private Sprinter vans & relaxed pacing',
    tag: 'Family Comfort',
    icon: Crown,
    coverImage: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85',
    destinations: ['Vietnam & Ha Long Bay', 'Singapore & Sentosa', 'Kerala Backwaters & Tea Hills'],
    sampleSlug: 'vietnam-ha-long-bay-luxury-cruise',
    duration: '6N to 8N Itineraries',
    highlights: [
      'Private AC coach with courteous English/Hindi chauffeur',
      'Daily Jain buffet & Gujarati chef arrangements',
      'Child-safe amusement entries & elderly-friendly pacing'
    ],
    color: 'from-emerald-600/80 to-teal-500/80',
    accentBg: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  }
];

export default function LuxuryThemeShowcase() {
  const [activeCollection, setActiveCollection] = useState<string>('villas');

  const selected = COLLECTIONS.find(c => c.id === activeCollection) || COLLECTIONS[0];

  return (
    <section className="py-24 bg-gradient-to-b from-[#FAF7F5] via-white to-[#FAF7F5] relative overflow-hidden border-t border-slate-200/80">
      
      {/* Decorative Brand Glow */}
      <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-logo-lavender/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-logo-peach/25 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-950 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Curated Signature Collections 2026</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-navy-950 tracking-tight">
            Travel Styles Crafted for Discerning Guests
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Every traveler has an exclusive rhythm. Select a signature holiday style below to explore handpicked accommodations, private chauffeured routes, and dedicated Surat concierge support.
          </p>
        </div>

        {/* Collection Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {COLLECTIONS.map((c) => {
            const IconComponent = c.icon;
            const isActive = c.id === activeCollection;

            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCollection(c.id)}
                className={`p-4 rounded-2xl text-left transition-all duration-300 border flex flex-col justify-between relative overflow-hidden group ${
                  isActive
                    ? 'bg-navy-950 text-white border-navy-950 shadow-xl scale-[1.02]'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200/80 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isActive ? 'bg-white/10 text-amber-300' : 'bg-slate-100 text-navy-950'
                  }`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {c.tag.split(' ')[0]}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-sm leading-snug line-clamp-1">
                    {c.title}
                  </h4>
                  <span className={`text-[11px] block mt-1 line-clamp-1 ${
                    isActive ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    {c.duration}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Collection Showcase Banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Visual Column */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto min-h-[380px] overflow-hidden bg-slate-900 group">
              <img
                src={selected.coverImage}
                alt={selected.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Overlay Pills */}
              <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-amber-300 border border-white/20 text-xs font-bold uppercase tracking-wider">
                  {selected.tag}
                </span>
                <span className="px-3 py-1.5 rounded-full bg-emerald-600/90 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Surat Desk Certified</span>
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase font-bold tracking-widest text-logo-peach block mb-1">
                  Premier Destinations Included:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selected.destinations.map((d, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white border border-white/25"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Details & Inclusions Column */}
            <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs uppercase font-bold text-brand-600 tracking-wider block mb-1">
                  Signature Inclusions &amp; Vibe
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-navy-950 leading-snug">
                  {selected.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selected.subtitle}
                </p>

                {/* Highlights list */}
                <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    Why Guests Love This Collection:
                  </span>
                  {selected.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span className="font-medium leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>

                {/* Culinary Guarantee */}
                <div className="mt-6 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/60 text-xs text-amber-900 flex items-center gap-2.5">
                  <Utensils className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>100% Pure Veg &amp; Jain Meals:</strong> Available throughout all itineraries in this collection.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/packages/${selected.sampleSlug}`}
                  className="flex-1 py-3.5 px-5 rounded-full bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-navy-950/20 transition-all hover:scale-102"
                >
                  <span>Explore Featured Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                  className="py-3.5 px-5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2 border border-emerald-200 transition-colors"
                  title="Call Specialist to Discuss"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  <span>Discuss Quote on Call</span>
                </a>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
