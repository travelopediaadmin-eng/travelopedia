'use client';

import React from 'react';
import { ShieldCheck, Sparkles, Award } from 'lucide-react';

const PARTNERS = [
  { name: 'Emirates', category: 'Official Airline Partner' },
  { name: 'Singapore Airlines', category: 'Premium Global Partner' },
  { name: 'Qatar Airways', category: '5-Star Airline Desk' },
  { name: 'The Ritz-Carlton', category: 'Luxury Stay Partner' },
  { name: 'Four Seasons', category: 'Ultra Luxury Resorts' },
  { name: 'Taj Hotels & Palaces', category: 'Heritage Stays' },
  { name: 'Oberoi Hotels', category: 'Bespoke Luxury' },
  { name: 'Atlantis The Palm', category: 'Signature Dubai Partner' },
  { name: 'Marriott Bonvoy', category: 'Global Preferred Partner' },
  { name: 'Swiss Air', category: 'Alpine Express Partner' },
  { name: 'Jumeirah', category: 'Iconic Luxury Collection' },
];

export default function PartnerMarquee() {
  return (
    <section className="py-10 bg-navy-950 text-white relative overflow-hidden border-y border-white/10">
      
      {/* Background ambient logo glow */}
      <div className="absolute top-0 left-1/4 w-96 h-12 bg-logo-lavender/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-12 bg-logo-coral/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 mb-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-extrabold text-slate-300">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Curated in Direct Partnership With Global Giants</span>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1 text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            Guaranteed 5-Star Contracting
          </span>
          <span>•</span>
          <span>No Third-Party Brokers</span>
        </div>
      </div>

      {/* Infinite Scrolling Track */}
      <div className="relative w-full overflow-hidden flex">
        {/* Left & Right Gradient Shadows */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-navy-950 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-navy-950 to-transparent z-10 pointer-events-none" />

        {/* Marquee Row 1 */}
        <div className="flex shrink-0 items-center gap-8 animate-marquee whitespace-nowrap">
          {PARTNERS.concat(PARTNERS).map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-6 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors backdrop-blur-md cursor-pointer group"
            >
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-logo-coral to-logo-peach group-hover:scale-125 transition-transform" />
              <div>
                <span className="text-sm font-bold text-white tracking-wide block font-serif">
                  {p.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium block">
                  {p.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
