'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, 
  Coffee, 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  ExternalLink,
  PhoneCall,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { COMPANY_DETAILS, getGeneralWhatsAppUrl } from '@/lib/utils';

export default function SuratVIPOfficeTour() {
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('2026-12-05');
  const [preferredTime, setPreferredTime] = useState('04:00 PM (Evening)');
  const [destinationFocus, setDestinationFocus] = useState('Europe (Switzerland & Paris)');
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    setAppointmentBooked(true);
  };

  const appointmentWhatsAppUrl = `https://wa.me/${COMPANY_DETAILS.phoneRaw}?text=${encodeURIComponent(
    `Hi The TraveloPedia! I would like to book a Coffee & Itinerary Consultation at your VIP Road, Vesu office:\n• Guest: ${guestName}\n• Phone: ${guestPhone}\n• Preferred Date: ${preferredDate}\n• Preferred Time: ${preferredTime}\n• Focus: ${destinationFocus}\nPlease confirm our desk appointment.`
  )}`;

  return (
    <section className="py-24 bg-gradient-to-b from-[#0b0c10] via-navy-950 to-[#0b0c10] text-white relative overflow-hidden border-y border-white/10">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-10 w-96 h-96 rounded-full bg-amber-500/15 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-10 w-96 h-96 rounded-full bg-logo-lavender/15 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3 shadow-lg">
            <Building2 className="w-3.5 h-3.5 text-amber-300" />
            <span>Surat Flagship Travel Lounge</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif tracking-tight text-white">
            Visit Our VIP Road, Vesu Office
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Planning a once-in-a-lifetime honeymoon or luxury family vacation deserves more than a standard phone call. Meet our senior travel architects over freshly brewed coffee in our private lounge.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Office Gallery & Location Specs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Visual Lounge Mosaic */}
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85"
                alt="The TraveloPedia Surat Luxury Lounge"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Badges on Image */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-300 border border-white/20 text-xs font-bold uppercase tracking-wider">
                  ★ 7, E-Space, Vesu
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/80 backdrop-blur-md text-white text-xs font-semibold">
                  Open Mon - Sat (10 AM - 8 PM)
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                  Private Client Discussion Suites
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-lg">
                  Equipped with 4K destination route displays, tactile itinerary portfolios, and complimentary Gujarati refreshments.
                </p>
              </div>
            </div>

            {/* Address & Perks Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <MapPin className="w-5 h-5 text-amber-400 mb-2" />
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">Prime Location</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                  Near Khatu Shyam Mandir, VIP Road, Vesu (Beside Domino&apos;s).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Coffee className="w-5 h-5 text-logo-peach mb-2" />
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">Gourmet Coffee</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                  Relax in our air-conditioned lounge while your routes are mapped out.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Compass className="w-5 h-5 text-blue-400 mb-2" />
                <h4 className="font-bold text-xs text-white uppercase tracking-wider">1-on-1 Master Architect</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                  Dedicated specialist assigned exclusively to your family&apos;s itinerary.
                </p>
              </div>
            </div>

            {/* Google Map Directions Action */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <span className="font-bold text-white block">Directions via Google Maps</span>
                  <span className="text-slate-400">Easy valet &amp; customer parking available at E-Space.</span>
                </div>
              </div>

              <a
                href={COMPANY_DETAILS.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-colors shrink-0 border border-white/15"
              >
                <span>Open Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Appointment Booking Widget */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 shadow-2xl border border-slate-200">
              
              {!appointmentBooked ? (
                <form onSubmit={handleBookAppointment}>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-brand-600 tracking-wider block">
                        VIP Lounge Consultation
                      </span>
                      <h3 className="font-serif font-bold text-xl text-navy-950">
                        Book Your Office Appointment
                      </h3>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                      <Coffee className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ketan & Vaishali Vashi"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-500 bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">WhatsApp Mobile *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98251 XXXXX"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-500 bg-slate-50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Date</label>
                        <input
                          type="date"
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-500 bg-slate-50 cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Time</label>
                        <select
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-500 bg-slate-50"
                        >
                          <option>11:00 AM (Morning)</option>
                          <option>02:30 PM (Afternoon)</option>
                          <option>04:00 PM (Evening)</option>
                          <option>06:30 PM (Evening)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Destination Focus</label>
                      <select
                        value={destinationFocus}
                        onChange={(e) => setDestinationFocus(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-500 bg-slate-50 font-medium"
                      >
                        <option>Europe (Switzerland &amp; Paris Circuit)</option>
                        <option>Dubai &amp; Abu Dhabi Luxury</option>
                        <option>Bali Private Pool Villas &amp; Islands</option>
                        <option>Kashmir Valley &amp; Gulmarg Gondola</option>
                        <option>Greece &amp; Santorini Romance</option>
                        <option>Vietnam &amp; Singapore Multi-City</option>
                        <option>Custom Tailor-Made Destination</option>
                      </select>
                    </div>

                    <div className="p-3 bg-brand-50/70 rounded-xl border border-brand-100 text-[11px] text-brand-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
                      <span>Complimentary 100% bespoke route design session with senior architects.</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-navy-950/25 transition-all hover:scale-102 flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-amber-300" />
                    <span>Confirm Consultation Appointment</span>
                  </button>
                </form>
              ) : (
                <div className="text-center py-6">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-1">
                    Appointment Request Received!
                  </h3>
                  <p className="text-xs text-slate-500 mb-4">
                    We look forward to hosting you at our VIP Road, Vesu office.
                  </p>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs mb-6 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Guest:</span>
                      <span className="font-semibold text-slate-800">{guestName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Scheduled:</span>
                      <span className="font-semibold text-brand-600">{preferredDate} at {preferredTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Focus:</span>
                      <span className="font-semibold text-slate-800">{destinationFocus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Office:</span>
                      <span className="font-semibold text-slate-800">7, E-Space, Vesu, Surat</span>
                    </div>
                  </div>

                  <a
                    href={appointmentWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
                  >
                    <span>Send Confirmation to Office WhatsApp</span>
                  </a>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
