'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scale, 
  X, 
  Check, 
  MapPin, 
  Clock, 
  Hotel, 
  Plane, 
  Utensils, 
  ShieldCheck, 
  PhoneCall, 
  MessageCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { COMPANY_DETAILS } from '@/lib/utils';

interface CompareItem {
  id: string;
  name: string;
  destination: string;
  slug: string;
  duration: string;
  hotel: string;
  flights: string;
  visa: string;
  meals: string;
  transfers: string;
  vibe: string;
  image: string;
}

const COMPARISON_DATA: CompareItem[] = [
  {
    id: 'dubai',
    name: 'Dubai Extravaganza',
    destination: 'Dubai & Abu Dhabi',
    slug: 'dubai-extravaganza-luxury',
    duration: '5N / 6D',
    hotel: '5★ Address Marina / Atlantis',
    flights: 'Direct Connect from Surat/Mumbai',
    visa: '3-Day UAE E-Visa Included',
    meals: 'Pure Veg & Jain Dinner on Cruise & Desert',
    transfers: 'Private 4x4 Land Cruiser & Yacht',
    vibe: 'Modern Luxury & Desert Dunes',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'greece',
    name: 'Greece & Santorini',
    destination: 'Santorini & Athens',
    slug: 'greece-santorini-caldera-luxury-romance',
    duration: '7N / 8D',
    hotel: 'Luxury Caldera Cave Suite + Plunge Pool',
    flights: '1-Stop Premier Airline via Gulf',
    visa: 'Schengen Visa Slot Assistance Included',
    meals: 'Curated Greek Pure Veg Dining',
    transfers: 'Private Chauffeur Mercedes & Catamaran',
    vibe: 'Aesthetic Romance & Aegean Sunsets',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'swiss',
    name: 'Switzerland & Paris',
    destination: 'Zermatt, Lucerne & Paris',
    slug: 'swiss-paris-european-odyssey',
    duration: '8N / 9D',
    hotel: '4★ & 5★ Alpine Mountain Resorts',
    flights: 'Premier Airline via Zurich / Paris',
    visa: 'Schengen Biometrics Appointment Support',
    meals: 'Daily Gujarati/Jain Restaurant Bookings',
    transfers: 'First Class Swiss Travel Pass & TGV',
    vibe: 'Alpine Glaciers & Iconic Landmarks',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'bali',
    name: 'Bali Private Pool Villa',
    destination: 'Ubud & Nusa Penida',
    slug: 'enchanting-bali-island-escape',
    duration: '6N / 7D',
    hotel: 'Private Cliffside Infinity Pool Villa',
    flights: 'Convenient Connect via Singapore / KL',
    visa: '30-Day Visa on Arrival / E-VOA',
    meals: 'Daily Jain Floating Breakfast in Villa',
    transfers: 'Private AC Chauffeur & Speedboat',
    vibe: 'Tropical Tranquility & Swings',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80'
  }
];

export default function TripComparisonDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>(['dubai', 'greece']);

  React.useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-trip-compare', handleOpen);
    return () => window.removeEventListener('open-trip-compare', handleOpen);
  }, []);

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) {
        setSelectedIds(selectedIds.filter(item => item !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      } else {
        // Replace second item
        setSelectedIds([selectedIds[0], id]);
      }
    }
  };

  const activeItems = COMPARISON_DATA.filter(item => selectedIds.includes(item.id));

  return (
    <>
      {/* Floating Pill Trigger on Right Edge */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-1/2 -right-1 -translate-y-1/2 z-40 bg-navy-950/95 hover:bg-black text-amber-300 hover:text-white px-3.5 py-4 rounded-l-2xl shadow-2xl border-y border-l border-amber-300/30 flex flex-col items-center gap-1.5 transition-all group backdrop-blur-md"
        title="Compare Holiday Packages"
      >
        <Scale className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
        <span className="text-[10px] font-bold uppercase tracking-widest [writing-mode:vertical-rl] rotate-180">
          Compare Tours
        </span>
      </button>

      {/* Modal Overlay & Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md">
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-navy-950 text-white p-5 sm:p-6 flex items-center justify-between border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-white">
                      Compare Signature Holiday Packages
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Side-by-side breakdown of inclusions, hotel tiers &amp; dietary arrangements.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Selector Bar */}
              <div className="bg-slate-50 p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
                <span className="font-bold text-slate-700">
                  Select 2 or 3 destinations to compare:
                </span>
                <div className="flex flex-wrap gap-2">
                  {COMPARISON_DATA.map(item => {
                    const isSelected = selectedIds.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleSelect(item.id)}
                        className={`px-3 py-1.5 rounded-full font-bold transition-all text-xs flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-navy-950 text-white shadow-sm'
                            : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-300" />}
                        <span>{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Comparison Table Body (Scrollable) */}
              <div className="overflow-x-auto overflow-y-auto p-5 sm:p-8 flex-1">
                <div className={`grid gap-4 ${
                  activeItems.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
                } min-w-[580px]`}>
                  {activeItems.map(item => (
                    <div 
                      key={item.id} 
                      className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200 flex flex-col justify-between"
                    >
                      <div>
                        {/* Thumbnail */}
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 shadow-sm">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold">
                            {item.duration}
                          </span>
                        </div>

                        <h4 className="font-serif font-bold text-base sm:text-lg text-navy-950 leading-tight">
                          {item.name}
                        </h4>
                        <span className="text-[11px] text-brand-600 font-bold uppercase tracking-wider block mt-0.5">
                          {item.destination}
                        </span>

                        {/* Specs List */}
                        <div className="mt-5 space-y-3.5 text-xs text-slate-700 pt-4 border-t border-slate-200">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                              Accommodations
                            </span>
                            <span className="font-semibold text-slate-800">{item.hotel}</span>
                          </div>

                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                              Flight Routing
                            </span>
                            <span className="font-semibold text-slate-800">{item.flights}</span>
                          </div>

                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                              Visa Support
                            </span>
                            <span className="font-semibold text-emerald-700">{item.visa}</span>
                          </div>

                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                              Jain / Veg Meals
                            </span>
                            <span className="font-semibold text-slate-800">{item.meals}</span>
                          </div>

                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                              Ground Transfers
                            </span>
                            <span className="font-semibold text-slate-800">{item.transfers}</span>
                          </div>

                          <div className="p-3 bg-white rounded-xl border border-slate-200">
                            <span className="text-[10px] uppercase font-bold text-brand-600 block tracking-wider">
                              Tour Pricing
                            </span>
                            <span className="font-serif font-bold text-sm text-navy-950 block mt-0.5">
                              Price on Request
                            </span>
                            <span className="text-[10px] text-slate-500">
                              Discuss on Call with Surat Desk
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* CTA Actions */}
                      <div className="mt-6 pt-4 border-t border-slate-200 space-y-2">
                        <Link
                          href={`/packages/${item.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="w-full py-2.5 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                        >
                          <span>View Itinerary</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <a
                          href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                          className="w-full py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-200 transition-colors"
                        >
                          <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Call to Discuss</span>
                        </a>
                      </div>

                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Quick Advice */}
              <div className="bg-slate-100 p-4 border-t border-slate-200 text-center text-xs text-slate-600 shrink-0">
                <span>Want to customize a route combining 2 countries? Visit our office at </span>
                <strong className="text-navy-950">7, E-Space, VIP Road, Vesu</strong>
                <span> or call </span>
                <a href={`tel:${COMPANY_DETAILS.phoneRaw}`} className="text-brand-600 font-bold underline">
                  {COMPANY_DETAILS.phone}
                </a>.
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
