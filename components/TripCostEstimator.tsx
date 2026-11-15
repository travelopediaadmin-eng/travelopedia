'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  Hotel, 
  Utensils, 
  Plane, 
  Car, 
  MessageCircle, 
  Check, 
  Calculator,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { COMPANY_DETAILS, formatPrice } from '@/lib/utils';

export default function TripCostEstimator() {
  const [destination, setDestination] = useState('Dubai, UAE');
  const [duration, setDuration] = useState(6);
  const [travelers, setTravelers] = useState(2);
  const [hotelTier, setHotelTier] = useState<'4-Star Deluxe' | '5-Star Luxury' | 'Private Pool Villa'>('4-Star Deluxe');
  const [dietary, setDietary] = useState<'Jain Food' | 'Pure Veg' | 'Regular'>('Jain Food');
  const [includeFlights, setIncludeFlights] = useState(true);

  // Dynamic base rate calculations per person per night
  const rates: { [key: string]: number } = {
    'Greece & Santorini': 18500,
    'Dubai, UAE': 7500,
    'Bali, Indonesia': 6800,
    'Switzerland & Paris': 19500,
    'Kashmir Valley': 5200,
    'Kerala Backwaters': 4600,
    'Vietnam Discovery': 7200,
    'Royal Rajasthan': 4800,
  };

  const hotelMultipliers = {
    '4-Star Deluxe': 1.0,
    '5-Star Luxury': 1.45,
    'Private Pool Villa': 1.85,
  };

  const flightCosts: { [key: string]: number } = {
    'Greece & Santorini': 62000,
    'Dubai, UAE': 22000,
    'Bali, Indonesia': 32000,
    'Switzerland & Paris': 68000,
    'Kashmir Valley': 12000,
    'Kerala Backwaters': 9000,
    'Vietnam Discovery': 24000,
    'Royal Rajasthan': 6000,
  };

  const basePerNight = rates[destination] || 6000;
  const hotelFactor = hotelMultipliers[hotelTier];
  const flightPerPerson = includeFlights ? (flightCosts[destination] || 15000) : 0;

  const estimatedPerPerson = Math.round((basePerNight * (duration - 1) * hotelFactor) + flightPerPerson);
  const totalTripCost = estimatedPerPerson * travelers;

  const whatsappMessage = `Hi The TraveloPedia, I used your live trip estimator for ${destination} (${duration} Days, ${travelers} Travelers, Hotel: ${hotelTier}, Food: ${dietary}, Flights: ${includeFlights ? 'Yes' : 'No'}). Estimated Budget: ~${formatPrice(totalTripCost)}. Please share the official customized itinerary and booking details.`;
  const whatsappUrl = `https://wa.me/${COMPANY_DETAILS.phoneRaw}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="py-24 bg-gradient-to-b from-white via-[#FAF7F5] to-white relative overflow-hidden">
      
      {/* Background Decorative Logo Bubbles (Lavender, Coral, Peach) */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-logo-lavender/25 blur-3xl pointer-events-none animate-bubble-1" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-logo-coral/20 blur-3xl pointer-events-none animate-bubble-2" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-logo-peach/25 blur-3xl pointer-events-none animate-bubble-3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-logo-lavender/30 border border-logo-lavender text-logo-periwinkleDark text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-logo-coralDeep" />
            <span>Interactive Live Holiday Calculator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-logo-charcoal tracking-tight">
            Estimate Your Dream Vacation Cost
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Drag the sliders to customize your days, travelers, and hotel luxury tier. Get an instant transparent budget estimate with Surat travel desk support.
          </p>
        </div>

        {/* Interactive Estimator Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-8">
            
            {/* 1. Destination Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-logo-coralDeep" />
                Select Destination
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'Greece & Santorini',
                  'Dubai, UAE',
                  'Bali, Indonesia',
                  'Switzerland & Paris',
                  'Kashmir Valley',
                  'Vietnam Discovery'
                ].map(dest => (
                  <button
                    key={dest}
                    type="button"
                    onClick={() => setDestination(dest)}
                    className={`px-3 py-2.5 rounded-2xl text-xs font-bold text-left transition-all border ${
                      destination === dest
                        ? 'bg-logo-charcoal text-white border-logo-charcoal shadow-md scale-102'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {dest}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Duration Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-logo-coralDeep" />
                  Trip Duration
                </label>
                <span className="text-sm font-extrabold font-serif text-logo-charcoal">
                  {duration} Days / {duration - 1} Nights
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="14"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-logo-coralDeep"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                <span>4 Days (Getaway)</span>
                <span>8 Days (Classic)</span>
                <span>14 Days (Grand Tour)</span>
              </div>
            </div>

            {/* 3. Number of Travelers */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-logo-coralDeep" />
                  Travelers Count
                </label>
                <span className="text-sm font-extrabold font-serif text-logo-charcoal">
                  {travelers} {travelers === 1 ? 'Traveler' : 'Travelers'}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-logo-periwinkle"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                <span>1 (Solo)</span>
                <span>2 (Couple)</span>
                <span>4 (Family)</span>
                <span>8+ (Group)</span>
              </div>
            </div>

            {/* 4. Hotel Comfort Standard */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <Hotel className="w-4 h-4 text-logo-coralDeep" />
                Hotel Comfort Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: '4-Star Deluxe', desc: 'Premium 4★ Stay with Pool & Breakfast' },
                  { id: '5-Star Luxury', desc: 'World-Class 5★ Luxury Brands' },
                  { id: 'Private Pool Villa', desc: 'Exclusive Plunge Pool & Butler' },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setHotelTier(tier.id as any)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      hotelTier === tier.id
                        ? 'border-logo-coralDeep bg-logo-coral/15 ring-2 ring-logo-coralDeep/20'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                    }`}
                  >
                    <span className="font-bold text-xs text-navy-950 block">{tier.id}</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">{tier.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Food & Flights Options */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeFlights}
                  onChange={(e) => setIncludeFlights(e.target.checked)}
                  className="w-4 h-4 rounded text-logo-coralDeep focus:ring-logo-coralDeep"
                />
                <span className="flex items-center gap-1">
                  <Plane className="w-3.5 h-3.5 text-blue-500" />
                  Include Flight Tickets from Surat / Mumbai
                </span>
              </label>

              <div className="flex items-center gap-2 text-xs">
                <Utensils className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-bold text-slate-700">Dietary:</span>
                {(['Jain Food', 'Pure Veg', 'Regular'] as const).map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDietary(d)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${
                      dietary === d 
                        ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold' 
                        : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Real-Time Price Output Column */}
          <div className="lg:col-span-5 bg-gradient-to-br from-logo-obsidian via-logo-charcoal to-navy-950 text-white p-6 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-logo-peach text-[11px] font-bold uppercase tracking-wider mb-4 border border-white/15">
                <Sparkles className="w-3 h-3 text-logo-coral" />
                <span>Live Cost Breakdown</span>
              </div>

              <span className="text-xs text-slate-400 font-semibold block uppercase tracking-wider">
                Total Estimated Tour Investment
              </span>

              {/* Huge animated price */}
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black font-serif text-white tracking-tight">
                  {formatPrice(totalTripCost)}
                </span>
              </div>

              <div className="mt-1 text-xs text-logo-coral font-medium">
                ~ {formatPrice(estimatedPerPerson)} / person ({travelers} travelers)
              </div>

              {/* What is included in this estimate */}
              <div className="mt-8 pt-6 border-t border-white/15 space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{duration - 1} Nights in handpicked {hotelTier}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Daily Gourmet Breakfast &amp; {dietary} dining support</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Private AC Vehicle with chauffeur for all transfers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Curated sightseeing &amp; key landmark entries</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{includeFlights ? 'Roundtrip flights included' : 'Flights on request'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>24x7 dedicated Surat desk emergency concierge</span>
                </div>
              </div>
            </div>

            {/* Instant Action CTA */}
            <div className="mt-8 pt-6 border-t border-white/15 space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-102 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Lock This Quote on WhatsApp</span>
              </a>

              <p className="text-[10px] text-slate-400 text-center leading-snug">
                Connects directly to our Surat Head Office: <strong>+91 95129 35701</strong>. Zero obligation.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
