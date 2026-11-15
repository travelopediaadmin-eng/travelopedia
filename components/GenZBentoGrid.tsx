'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  CloudSnow, 
  Sun, 
  Flame, 
  ArrowUpRight, 
  ShieldCheck, 
  Heart,
  Coffee,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { COMPANY_DETAILS, getGeneralWhatsAppUrl } from '@/lib/utils';

export default function GenZBentoGrid({
  onSelectDestination,
}: {
  onSelectDestination?: (name: string) => void;
}) {
  const [dubaiTime, setDubaiTime] = useState('');
  const [swissTime, setSwissTime] = useState('');

  // Update live world clocks
  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      // Dubai GMT+4
      const dTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(now);
      setDubaiTime(dTime);

      // Switzerland GMT+1
      const sTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Zurich',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(now);
      setSwissTime(sTime);
    };

    updateClocks();
    const timer = setInterval(updateClocks, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClick = (dest: string) => {
    if (onSelectDestination) {
      onSelectDestination(dest);
    }
    const el = document.getElementById('packages-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      
      {/* Background Soft Blobs */}
      <div className="absolute top-1/4 right-5 w-96 h-96 rounded-full bg-logo-lavender/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-5 w-96 h-96 rounded-full bg-logo-peach/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-logo-lavender/30 border border-logo-lavender text-logo-periwinkleDark text-xs font-bold uppercase tracking-wider mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-logo-coralDeep" />
              <span>Next-Gen Travel Bento</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-logo-charcoal tracking-tight">
              Curated Worlds, Engineered for 2026
            </h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-xl">
              Tap into live world destination feeds with real-time weather and verified luxury villa access from Surat.
            </p>
          </div>

          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Tap any tile to explore curated packages</span>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px]">
          
          {/* Card 1: Dubai Luxury (Large 2-column, 2-row) */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleClick('Dubai')}
            className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden cursor-pointer shadow-xl group border border-slate-200/80 bg-slate-900"
          >
            <img
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80"
              alt="Dubai Luxury Skyline"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />

            {/* Top Bar inside Card */}
            <div className="absolute top-5 inset-x-5 flex items-center justify-between text-white">
              {/* Live Clock Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-medium">
                <Clock className="w-3.5 h-3.5 text-logo-coral" />
                <span>Dubai: <strong className="text-white">{dubaiTime || '11:45 PM'}</strong></span>
                <span className="text-amber-400">• 28°C <Sun className="w-3 h-3 inline ml-0.5" /></span>
              </div>

              {/* Status Badge */}
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-logo-coralDeep text-white shadow-lg">
                #1 Surat Favorite 🔥
              </span>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-6 inset-x-6 text-white">
              <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-bold mb-1">
                <span>★ 4.96 (380+ Surat Reviews)</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold font-serif group-hover:text-logo-peach transition-colors">
                Dubai Marina, Desert &amp; Private Yacht
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-lg font-light leading-relaxed">
                Stay at 5-Star Address Downtown or Atlantis The Royal with private 4x4 dune bashing and VIP Marina yacht cruise.
              </p>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/20">
                <span className="text-sm font-bold text-logo-peach">
                  From ₹48,000 / person
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-white group-hover:translate-x-1 transition-transform">
                  <span>Explore Tours</span>
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Swiss Alps (1 col, 2 rows) */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleClick('Switzerland')}
            className="md:col-span-1 md:row-span-2 relative rounded-3xl overflow-hidden cursor-pointer shadow-xl group border border-slate-200/80 bg-slate-900"
          >
            <img
              src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80"
              alt="Swiss Alps Glacier"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Top Bar */}
            <div className="absolute top-5 inset-x-5 flex items-center justify-between text-white">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs">
                <CloudSnow className="w-3.5 h-3.5 text-blue-300" />
                <span>Zermatt: <strong className="text-blue-200">-2°C</strong></span>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-600 text-white">
                Snow Peak ❄️
              </span>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-6 inset-x-6 text-white">
              <span className="text-xs uppercase tracking-wider text-blue-300 font-bold">
                Alpine Glacier Route
              </span>
              <h3 className="text-2xl font-bold font-serif mt-1 group-hover:text-blue-200 transition-colors">
                Switzerland &amp; Paris Circuit
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-3">
                First Cliff Walk, Glacier 3000, private Swiss Pass, and pure Gujarati/Jain dining arranged across Zurich &amp; Lucerne.
              </p>

              <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300">8N / 9D Luxury</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* Card 3: Greece Santorini Caldera (1 col, 1 row) */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleClick('Greece')}
            className="md:col-span-1 md:row-span-1 relative rounded-3xl overflow-hidden cursor-pointer shadow-xl group border border-slate-200/80 bg-slate-900"
          >
            <img
              src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80"
              alt="Greece Santorini Caldera"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 text-navy-950 shadow-md">
                Aesthetic Royalty 🇬🇷
              </span>
            </div>

            <div className="absolute bottom-4 inset-x-4 text-white">
              <h4 className="text-lg font-bold font-serif group-hover:text-logo-peach transition-colors">
                Greece &amp; Santorini
              </h4>
              <p className="text-[11px] text-slate-300 line-clamp-1">
                Oia cliffside cave suites, heated caldera pools &amp; Aegean sunsets.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Kashmir Valley (1 col, 1 row) */}
          <motion.div
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.3 }}
            onClick={() => handleClick('Kashmir')}
            className="md:col-span-1 md:row-span-1 relative rounded-3xl overflow-hidden cursor-pointer shadow-xl group border border-slate-200/80 bg-slate-900"
          >
            <img
              src="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80"
              alt="Kashmir Valley"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-md">
                Gondola Confirmed 🏔️
              </span>
            </div>

            <div className="absolute bottom-4 inset-x-4 text-white">
              <h4 className="text-lg font-bold font-serif group-hover:text-amber-300 transition-colors">
                Kashmir Heaven on Earth
              </h4>
              <p className="text-[11px] text-slate-300 line-clamp-1">
                Dal Lake heated luxury houseboat &amp; Gulmarg cable car tickets.
              </p>
            </div>
          </motion.div>

          {/* Card 5: Surat VIP Road Experience Lounge (Full width card on mobile/desktop) */}
          <motion.div
            whileHover={{ y: -4 }}
            className="md:col-span-2 lg:col-span-4 relative rounded-3xl overflow-hidden shadow-xl border border-logo-lavender/40 bg-gradient-to-r from-navy-950 via-logo-charcoal to-navy-950 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-logo-coral to-logo-peach flex items-center justify-center shrink-0 shadow-lg shadow-logo-coral/20">
                <Coffee className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-logo-peach">
                    Physical Consultation Hub
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-semibold text-emerald-400">
                    Open Mon-Sat
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-bold font-serif mt-1 text-white">
                  Visit Our VIP Road, Vesu Office in Surat
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  7, E-Space (Beside Domino&apos;s Pizza, near Khatu Shyam Mandir). Sip authentic roasted coffee while our senior travel architects plan your bespoke vacation.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                href={getGeneralWhatsAppUrl('Hi The TraveloPedia, I want to book an in-person consultation at your Vesu office.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-logo-coralDeep to-logo-peachGold hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-logo-coralDeep/30 flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <span>Book Free Appointment</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
