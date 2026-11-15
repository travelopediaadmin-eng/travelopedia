'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, 
  Sparkles, 
  Calendar, 
  Users, 
  MapPin, 
  ShieldCheck, 
  Download, 
  MessageCircle, 
  CheckCircle2, 
  QrCode, 
  Heart,
  ArrowRight,
  Printer,
  Ticket
} from 'lucide-react';
import { COMPANY_DETAILS, formatPrice } from '@/lib/utils';

interface BoardingData {
  passengerName: string;
  destination: string;
  destCode: string;
  departureMonth: string;
  travelersCount: string;
  flightNo: string;
  basePrice: string;
  duration: string;
}

const DESTINATION_PRESETS: { [key: string]: { code: string; flightNo: string; price: string; duration: string; highlights: string } } = {
  'Greece Santorini & Athens': {
    code: 'ATH',
    flightNo: 'TP-902',
    price: '₹1,95,000',
    duration: '7N / 8D',
    highlights: 'Caldera Cave Suite + Sunset Catamaran + Acropolis VIP'
  },
  'Dubai Marina & Desert Safari': {
    code: 'DXB',
    flightNo: 'TP-304',
    price: '₹48,000',
    duration: '5N / 6D',
    highlights: 'Private Yacht + Desert Dune Bashing + 5★ Marina Hotel'
  },
  'Switzerland Alpine Express': {
    code: 'ZRH',
    flightNo: 'TP-702',
    price: '₹1,85,000',
    duration: '8N / 9D',
    highlights: 'Glacier 3000 + First Cliff Walk + Swiss Train Pass'
  },
  'Bali Private Pool Villa': {
    code: 'DPS',
    flightNo: 'TP-508',
    price: '₹62,000',
    duration: '6N / 7D',
    highlights: 'Floating Breakfast + Nusa Penida Speedboat + Ubud Villa'
  },
  'Kashmir Snow & Dal Lake': {
    code: 'SXR',
    flightNo: 'TP-201',
    price: '₹38,500',
    duration: '5N / 6D',
    highlights: 'Gulmarg Gondola Phase 2 + Dal Lake Heated Houseboat'
  },
  'Vietnam Ha Long Bay Luxury': {
    code: 'HAN',
    flightNo: 'TP-412',
    price: '₹55,000',
    duration: '6N / 7D',
    highlights: '5★ Overnight Cruise + Golden Hands Bridge + Seaplane'
  }
};

export default function InteractiveBoardingPass() {
  const [passengerName, setPassengerName] = useState('Rahul Shah');
  const [selectedDest, setSelectedDest] = useState('Dubai Marina & Desert Safari');
  const [departureMonth, setDepartureMonth] = useState('November 2026');
  const [travelers, setTravelers] = useState('2 Adults');
  const [isGenerated, setIsGenerated] = useState(true);

  const destInfo = DESTINATION_PRESETS[selectedDest] || DESTINATION_PRESETS['Dubai Marina & Desert Safari'];

  const whatsappMessage = `Hi The TraveloPedia Surat! I just customized my VIP First-Class Boarding Pass on your website:
• Passenger: ${passengerName}
• Destination: ${selectedDest} (${destInfo.code})
• Flight Ref: ${destInfo.flightNo}
• Duration: ${destInfo.duration}
• Departure: ${departureMonth}
• Travelers: ${travelers}
• Estimated Budget: ${destInfo.price} / person

Please confirm seat availability and send the official day-by-day customized itinerary.`;

  const whatsappUrl = `https://wa.me/${COMPANY_DETAILS.phoneRaw}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="py-24 bg-gradient-to-b from-[#0d0c0e] via-navy-950 to-[#0d0c0e] text-white relative overflow-hidden border-y border-white/10">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-logo-coral/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-logo-lavender/15 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-logo-coral/20 border border-logo-coral/40 text-logo-coral text-xs font-bold uppercase tracking-widest mb-3 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-logo-coral" />
            <span>Interactive Virtual Departure Lounge</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-serif tracking-tight text-white">
            Generate Your VIP Boarding Pass
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Feel the takeoff before you pack your bags. Enter your name, choose your dream destination, and create your personalized First-Class ticket from Surat.
          </p>
        </div>

        {/* 2-Column Experience: Left Controls, Right Holographic Boarding Pass */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Interactive Form Controls */}
          <div className="lg:col-span-5 bg-white/5 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/15 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-extrabold uppercase tracking-widest text-logo-peach flex items-center gap-1.5">
                <Ticket className="w-4 h-4 text-logo-coral" />
                <span>Ticket Customizer</span>
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Live Instant Preview
              </span>
            </div>

            {/* 1. Passenger Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Passenger Name (Guest of Surat)
              </label>
              <input
                type="text"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                placeholder="e.g. Rahul Shah"
                className="w-full px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white font-semibold text-sm focus:outline-none focus:border-logo-coral transition-colors"
              />
            </div>

            {/* 2. Destination Preset */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Select Destination
              </label>
              <select
                value={selectedDest}
                onChange={(e) => setSelectedDest(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-navy-900 border border-white/20 text-white font-semibold text-sm focus:outline-none focus:border-logo-coral transition-colors"
              >
                {Object.keys(DESTINATION_PRESETS).map((dest) => (
                  <option key={dest} value={dest} className="bg-navy-950 text-white">
                    {dest} ({DESTINATION_PRESETS[dest].code})
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Departure Month & Travelers */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Travel Month
                </label>
                <select
                  value={departureMonth}
                  onChange={(e) => setDepartureMonth(e.target.value)}
                  className="w-full px-3 py-3 rounded-2xl bg-navy-900 border border-white/20 text-white font-semibold text-xs focus:outline-none focus:border-logo-coral"
                >
                  <option value="November 2026">Nov 2026</option>
                  <option value="December 2026">Dec 2026</option>
                  <option value="January 2027">Jan 2027</option>
                  <option value="Summer 2027">Summer 2027</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Travelers
                </label>
                <select
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  className="w-full px-3 py-3 rounded-2xl bg-navy-900 border border-white/20 text-white font-semibold text-xs focus:outline-none focus:border-logo-coral"
                >
                  <option value="2 Adults (Couple)">2 Adults</option>
                  <option value="1 Solo Explorer">1 Solo</option>
                  <option value="Family (4 Pax)">Family (4 Pax)</option>
                  <option value="Group (6+ Pax)">Group (6+ Pax)</option>
                </select>
              </div>
            </div>

            {/* Highlights pill */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300">
              <span className="font-bold text-amber-300 block mb-0.5">Package Highlights:</span>
              <span>{destInfo.highlights}</span>
            </div>

            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/30 transition-transform active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Lock This Seat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Ultra-Luxurious Holographic Boarding Pass Ticket */}
          <div className="lg:col-span-7 flex justify-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-xl bg-gradient-to-br from-[#1c1920] via-[#151318] to-[#0d0c0e] rounded-[32px] border-2 border-logo-peach/40 shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-6 sm:p-8 overflow-hidden select-none"
            >
              {/* Metallic Gold / Coral Holographic Strip across top */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-logo-lavender via-logo-coral to-logo-peach" />

              {/* Top Row: Airline Brand & Class */}
              <div className="flex items-center justify-between pb-6 border-b border-white/15">
                <div className="flex items-center gap-3">
                  <div className="bg-white px-2.5 py-1 rounded-xl shadow-md shrink-0">
                    <img
                      src="/logo.png"
                      alt="The TraveloPedia"
                      className="h-7 sm:h-8 w-auto object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-logo-peach block">
                      First Class Luxury Suite
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Official Holiday Desk Pass
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold uppercase tracking-wider">
                    Seat Reserved 1A
                  </span>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Flight: <strong className="text-white font-mono">{destInfo.flightNo}</strong>
                  </span>
                </div>
              </div>

              {/* Flight Route Big Display: STV ✈ DEST */}
              <div className="py-6 flex items-center justify-between">
                <div>
                  <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white block">
                    STV
                  </span>
                  <span className="text-xs font-bold text-slate-300 block">Surat, Gujarat</span>
                  <span className="text-[10px] text-slate-500 block">7, E-Space, Vesu Desk</span>
                </div>

                {/* Flying Plane in the middle */}
                <div className="flex-1 flex flex-col items-center px-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-logo-coral mb-1">
                    {destInfo.duration}
                  </span>
                  <div className="w-full flex items-center relative">
                    <div className="w-full h-0.5 bg-gradient-to-r from-logo-coral via-logo-peach to-logo-lavender" />
                    <Plane className="w-5 h-5 text-white absolute left-1/2 -translate-x-1/2 -top-2 rotate-90 fill-white" />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 font-mono">
                    Non-Stop Connect
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-logo-peach block">
                    {destInfo.code}
                  </span>
                  <span className="text-xs font-bold text-slate-300 block">
                    {selectedDest.split(' ')[0]}
                  </span>
                  <span className="text-[10px] text-slate-500 block">Confirmed 5★ Stay</span>
                </div>
              </div>

              {/* Grid: Passenger Details & Inclusions */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Passenger</span>
                  <span className="font-bold text-white truncate block text-sm mt-0.5">
                    {passengerName || 'Surat VIP Guest'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Departure</span>
                  <span className="font-semibold text-white block text-xs mt-0.5">
                    {departureMonth}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Food Preference</span>
                  <span className="font-semibold text-emerald-400 block text-xs mt-0.5">
                    100% Pure Veg / Jain
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Package Price</span>
                  <span className="font-black text-amber-300 block text-xs mt-0.5">
                    {destInfo.price} / Pax
                  </span>
                </div>
              </div>

              {/* Bottom Cutout & Barcode */}
              <div className="mt-6 pt-5 border-t-2 border-dashed border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* Simulated Barcode */}
                <div className="flex flex-col items-center sm:items-start">
                  <div className="flex items-center gap-1 h-8 opacity-75">
                    {[3, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2, 1, 4, 3, 2].map((w, i) => (
                      <div
                        key={i}
                        className="h-full bg-white rounded-sm"
                        style={{ width: `${w * 1.5}px` }}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] font-mono text-slate-400 tracking-widest mt-1">
                    TP-SURAT-2026-VIP-1A
                  </span>
                </div>

                {/* Verified Official Seal */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full border-2 border-amber-400/60 bg-amber-400/10 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold text-white block">
                      The TraveloPedia
                    </span>
                    <span className="text-[9px] text-slate-400 block">
                      Physical VIP Road Office Desk
                    </span>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
