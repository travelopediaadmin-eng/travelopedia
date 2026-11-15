'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, 
  MapPin, 
  Hotel, 
  Plane, 
  Utensils, 
  ShieldCheck, 
  Calendar, 
  PhoneCall, 
  CheckCircle2, 
  ArrowRight,
  FileText,
  CreditCard,
  HeartHandshake,
  Clock,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { COMPANY_DETAILS, getGeneralWhatsAppUrl } from '@/lib/utils';

export default function ServicesAndBookingGuide() {
  const services = [
    {
      icon: Compass,
      title: 'International Luxury Holidays',
      description: 'Handcrafted tours across Europe (Switzerland, Paris), Dubai, Bali, Vietnam, Singapore, and exotic islands with private transfers and 5-star stays.',
      badge: 'Global Contracts'
    },
    {
      icon: MapPin,
      title: 'Domestic Wonders & Kashmir',
      description: 'Guaranteed Gulmarg Gondola Phase 2 passes, Dal Lake heated houseboats, serene Kerala backwaters, and royal Rajasthan heritage palace stays.',
      badge: 'Guaranteed Slots'
    },
    {
      icon: Utensils,
      title: '100% Pure Veg & Jain Culinary Care',
      description: 'Special arrangements for Gujarati and Jain travelers with pure vegetarian dining, Jain friendly kitchens, and curated meals across foreign destinations.',
      badge: 'Surat Favorite'
    },
    {
      icon: Plane,
      title: 'Flights & Fast-Track Visa Concierge',
      description: 'Hassle-free documentation and expert filing for Schengen, Dubai, UK, and US visas, alongside premier airline flight seat reservations.',
      badge: 'Fast-Track'
    },
    {
      icon: Hotel,
      title: 'Vetted 4★ & 5★ Luxury Stays',
      description: 'Direct tie-ups with Marriott Bonvoy, Ritz-Carlton, Four Seasons, Taj Hotels, and private cliffside/overwater pool villas.',
      badge: 'Best Price Guarantee'
    },
    {
      icon: HeartHandshake,
      title: 'VIP Road, Vesu Office Consultation',
      description: 'Sit with our senior holiday architects over fresh coffee at 7, E-Space, Vesu to design your custom route on interactive maps.',
      badge: 'Physical Office'
    }
  ];

  const bookingSteps = [
    {
      step: '01',
      title: 'Select Package or Use Estimator',
      desc: 'Browse curated packages on the website or drag the interactive budget slider to calculate duration, travelers, and hotel luxury tier.'
    },
    {
      step: '02',
      title: '1-Click WhatsApp Consultation',
      desc: 'Click "Enquire on WhatsApp" or call +91 95129 35701. Connect with our Surat travel specialist within 15 minutes.'
    },
    {
      step: '03',
      title: 'Receive Custom PDF Itinerary',
      desc: 'Get an official day-by-day branded brochure with exact hotel names, flight options, private sightseeing, and transparent pricing.'
    },
    {
      step: '04',
      title: 'Lock Dates with Token Deposit',
      desc: 'Confirm your slots with a secure token deposit (pay online or visit our Vesu office). Receive official booking voucher and invoice.'
    },
    {
      step: '05',
      title: '24x7 Trip Concierge & Takeoff',
      desc: 'Our dedicated holiday desk monitors your flights, private driver pickups, and hotel check-ins in real time until you land safely back in Surat.'
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden border-t border-slate-200">
      
      {/* Background logo tinted aura */}
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-logo-lavender/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-logo-peach/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            PART 1: WHAT SERVICES WE PROVIDE
           ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-logo-lavender/30 border border-logo-lavender text-logo-periwinkleDark text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-logo-coralDeep" />
            <span>Complete Travel Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-logo-charcoal tracking-tight">
            What The TraveloPedia Provides
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            From our head office on VIP Road, Vesu to every corner of the world, we handle 100% of your holiday logistics with 5-star elegance.
          </p>
        </div>

        {/* Services Grid (6 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={srv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                whileHover={{ y: -6 }}
                className="p-8 rounded-3xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-logo-coral/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-logo-coralDeep">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-logo-lavender/30 text-logo-periwinkleDark border border-logo-lavender/50">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-serif text-navy-950 mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-logo-coralDeep">
                  <span>Included in every booking</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 ml-auto" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* =========================================================================
            PART 2: HOW BOOKING WORKS (Step-by-step roadmap)
           ========================================================================= */}
        <div className="bg-gradient-to-br from-navy-950 via-logo-charcoal to-navy-950 rounded-[40px] text-white p-8 sm:p-14 shadow-2xl border border-white/10">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-logo-peach block mb-2">
              Transparent &amp; Stress-Free
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
              How Holiday Booking Works with Us
            </h3>
            <p className="mt-2 text-slate-300 text-sm sm:text-base">
              No confusion, no hidden clauses. Here is how your dream vacation goes from website to boarding gate:
            </p>
          </div>

          {/* 5-Step Visual Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {bookingSteps.map((st, i) => (
              <div key={st.step} className="relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-logo-peach">
                      {st.step}
                    </span>
                    <div className="h-0.5 flex-1 bg-white/20 hidden md:block" />
                  </div>

                  <h4 className="text-base font-bold text-white font-serif mb-2">
                    {st.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Action Strip */}
          <div className="mt-12 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h5 className="text-sm font-bold text-white">Have an Upcoming Travel Plan?</h5>
                <p className="text-xs text-slate-300">
                  Call or visit our Vesu office: 7, E-Space, VIP Road (Beside Domino&apos;s)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={getGeneralWhatsAppUrl('Hi The TraveloPedia, I want to discuss holiday booking for my upcoming trip.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/30 transition-transform active:scale-95"
              >
                <PhoneCall className="w-4 h-4 fill-white" />
                <span>Call / WhatsApp Desk: {COMPANY_DETAILS.phone}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
