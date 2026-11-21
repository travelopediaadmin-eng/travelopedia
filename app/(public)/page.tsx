'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  MapPin, 
  ArrowRight, 
  Compass, 
  Award, 
  ShieldCheck, 
  Users, 
  HeartHandshake, 
  Star, 
  PhoneCall, 
  Plane, 
  Hotel, 
  Utensils, 
  Car,
  ChevronRight,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import PackageCard from '@/components/PackageCard';
import QuickEnquiryModal from '@/components/QuickEnquiryModal';
import TripCostEstimator from '@/components/TripCostEstimator';
import TravelStories from '@/components/TravelStories';
import PartnerMarquee from '@/components/PartnerMarquee';
import GenZBentoGrid from '@/components/GenZBentoGrid';
import VibeSelector, { VibeItem } from '@/components/VibeSelector';
import SuratExclusiveOffer from '@/components/SuratExclusiveOffer';
import InteractiveBoardingPass from '@/components/InteractiveBoardingPass';
import ServicesAndBookingGuide from '@/components/ServicesAndBookingGuide';
import AnimatedCounter from '@/components/AnimatedCounter';
import WorldRouteMap from '@/components/WorldRouteMap';
import LuxuryThemeShowcase from '@/components/LuxuryThemeShowcase';
import SuratVIPOfficeTour from '@/components/SuratVIPOfficeTour';
import TravelConciergeFAQ from '@/components/TravelConciergeFAQ';
import { TravelPackage, Destination } from '@/types/travel';
import { INITIAL_PACKAGES, INITIAL_DESTINATIONS } from '@/data/seed-data';
import { COMPANY_DETAILS, getGeneralWhatsAppUrl } from '@/lib/utils';

export default function HomePage() {
  const [packages, setPackages] = useState<TravelPackage[]>(INITIAL_PACKAGES);
  const [destinations, setDestinations] = useState<Destination[]>(INITIAL_DESTINATIONS);
  const [activeTab, setActiveTab] = useState<'All' | 'international' | 'domestic' | 'Honeymoon' | 'Family'>('All');
  const [activeVibe, setActiveVibe] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch live packages from API if available & check URL query params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const destParam = params.get('dest');
      if (destParam) {
        setSearchQuery(destParam);
      }
    }

    fetch('/api/packages')
      .then(res => res.json())
      .then(data => {
        if (data.packages && data.packages.length > 0) {
          setPackages(data.packages);
        }
      })
      .catch(() => {});

    fetch('/api/destinations')
      .then(res => res.json())
      .then(data => {
        if (data.destinations && data.destinations.length > 0) {
          setDestinations(data.destinations);
        }
      })
      .catch(() => {});
  }, []);

  const handleHeroSearch = (destinationQuery: string, typeQuery: string) => {
    setSearchQuery(destinationQuery);
    setActiveVibe('all');
    if (typeQuery === 'Honeymoon') setActiveTab('Honeymoon');
    else if (typeQuery === 'Family Holiday') setActiveTab('Family');
    else if (typeQuery !== 'All') setActiveTab('All');
  };

  const handleSelectVibe = (vibe: VibeItem) => {
    setActiveVibe(vibe.id);
    if (vibe.id === 'all') {
      setSearchQuery('');
      setActiveTab('All');
    } else {
      setSearchQuery(vibe.searchFilter);
    }
  };

  const handleBentoSelect = (destName: string) => {
    setSearchQuery(destName);
    setActiveTab('All');
    setActiveVibe('all');
    const el = document.getElementById('packages-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredPackages = packages.filter(pkg => {
    // Tab filter
    if (activeTab === 'international' && pkg.category !== 'international') return false;
    if (activeTab === 'domestic' && pkg.category !== 'domestic') return false;
    if (activeTab === 'Honeymoon' && pkg.tripType !== 'Honeymoon') return false;
    if (activeTab === 'Family' && pkg.tripType !== 'Family Holiday') return false;

    // Smart tokenized search query or vibe filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim();

      // 1. Direct substring match
      const directMatch =
        pkg.title.toLowerCase().includes(q) ||
        pkg.destination.toLowerCase().includes(q) ||
        pkg.subcategory.toLowerCase().includes(q) ||
        pkg.tripType.toLowerCase().includes(q) ||
        pkg.highlights.some(h => h.toLowerCase().includes(q)) ||
        (pkg.overview && pkg.overview.toLowerCase().includes(q));

      if (directMatch) return true;

      // 2. Tokenized multi-word search (matches any key terms)
      const tokens = q.split(/\s+/).filter(w => w.length > 2 && !['and', '&', 'the', 'for', 'with'].includes(w));
      if (tokens.length > 0) {
        const tokenMatch = tokens.some(token =>
          pkg.title.toLowerCase().includes(token) ||
          pkg.destination.toLowerCase().includes(token) ||
          pkg.subcategory.toLowerCase().includes(token) ||
          pkg.tripType.toLowerCase().includes(token) ||
          pkg.highlights.some(h => h.toLowerCase().includes(token)) ||
          (pkg.overview && pkg.overview.toLowerCase().includes(token))
        );
        if (!tokenMatch) return false;
      } else {
        return false;
      }
    }

    return true;
  });

  const openInquiryModal = (pkg: TravelPackage) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. Cox & Kings Inspired Animated Hero Section */}
      <HeroSection onSearch={handleHeroSearch} />

      {/* 2. Interactive VIP Boarding Pass Generator (Personalized Departure Ticket) */}
      <InteractiveBoardingPass />

      {/* 3. Instagram & Reels Style Live Vibe Stories */}
      <TravelStories />

      {/* 3. Infinite Scrolling Luxury Partner Airlines & 5-Star Hotel Chains */}
      <PartnerMarquee />

      {/* 4. Next-Gen Bento Grid Destinations with Live World Clocks & Weather */}
      <GenZBentoGrid onSelectDestination={handleBentoSelect} />

      {/* 5. Interactive Ultra-Light Luxury World Map & Surat Departure Flight Radar */}
      <WorldRouteMap />

      {/* 5B. Curated Signature Luxury Collections (Villas, Glaciers, Palaces, Multi-Gen) */}
      <LuxuryThemeShowcase />

      {/* 6. Featured Packages Grid with Kinetic Vibe Mood Engine */}
      <section id="packages-section" className="py-24 bg-slate-50 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-logo-coral/20 border border-logo-coral/40 text-logo-coralDeep text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Luxury Itineraries 2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-logo-charcoal tracking-tight">
              Featured Luxury Holiday Packages
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Handcrafted vacations with verified 4-Star &amp; 5-Star accommodations, guided private sightseeing, and Surat travel desk concierge.
            </p>
          </motion.div>

          {/* 2026 Kinetic Vibe Selector */}
          <VibeSelector activeVibe={activeVibe} onSelectVibe={handleSelectVibe} />

          {/* Category Tabs & Quick Filter */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'All', label: 'All Packages' },
                { id: 'international', label: 'International Tours' },
                { id: 'domestic', label: 'Domestic Tours' },
                { id: 'Honeymoon', label: 'Honeymoon Specials' },
                { id: 'Family', label: 'Family Vacations' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'text-white'
                      : 'text-slate-600 hover:text-navy-950 bg-white border border-slate-200/80 shadow-sm'
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTabPill"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      className="absolute inset-0 bg-navy-950 rounded-full shadow-lg shadow-navy-950/25"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Quick search input */}
            <div className="w-full md:w-72">
              <input
                type="text"
                placeholder="Search packages by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full bg-white border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-sm"
              />
            </div>
          </div>

          {/* Packages Grid */}
          <AnimatePresence mode="wait">
            {filteredPackages.length > 0 ? (
              <motion.div 
                key={activeTab + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPackages.map((pkg) => (
                  <PackageCard 
                    key={pkg.id} 
                    pkg={pkg} 
                    onQuickInquire={openInquiryModal}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <Compass className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-700">No packages match your search</h3>
                <p className="text-sm text-slate-500 mt-1">Try resetting the filter or planning a tailor-made holiday.</p>
                <button
                  onClick={() => {
                    setActiveTab('All');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-5 py-2.5 rounded-full bg-brand-500 text-white font-bold text-xs"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </AnimatePresence>

          {/* Bottom Custom Planning Prompt */}
          <div className="text-center mt-14">
            <Link
              href="/custom-tour"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-navy-950 hover:bg-navy-900 text-white font-bold text-sm shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all group border border-white/10"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Looking for a Bespoke Route? Plan Your Custom Tour</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* Agency Services & Transparent 5-Step Booking Guide */}
      <ServicesAndBookingGuide />

      {/* Interactive Trip Cost Calculator (Animated, Logo Theme) */}
      <TripCostEstimator />

      {/* Gamified Surat VIP Discount Scratch & Win Privilege */}
      <SuratExclusiveOffer />

      {/* 4. Why The TraveloPedia (Trust & Luxury Pillars) */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-wider mb-3 border border-brand-100">
                <Award className="w-3.5 h-3.5" />
                <span>The TraveloPedia Distinction</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-navy-950 tracking-tight leading-tight">
                Why Discerning Travelers in Surat Choose Us
              </h2>
              <p className="mt-4 text-slate-600 text-base leading-relaxed">
                We combine the global reach and luxury standards of heritage travel giants like Cox &amp; Kings with personal, face-to-face consultation right here on VIP Road, Vesu.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0 mt-0.5 border border-brand-100 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-navy-950 font-serif">Physical Head Office in Surat</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      7, E-Space, VIP Road, Vesu (beside Domino&apos;s). Enjoy a fresh cup of coffee while crafting your custom itinerary with our master consultants.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 border border-amber-100 shadow-sm">
                    <Hotel className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-navy-950 font-serif">Handpicked 4★ &amp; 5★ Luxury Stays</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Every hotel, overwater villa, and boutique heritage palace is vetted for safety, cleanliness, location, and culinary excellence.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-100 shadow-sm">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-navy-950 font-serif">Gujarati &amp; Jain Friendly Culinary Arrangements</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Whether you are in the Swiss Alps or on a Dubai desert safari, our team ensures authentic pure vegetarian and Jain dietary preferences are respected.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 border border-blue-100 shadow-sm">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-navy-950 font-serif">24x7 Dedicated WhatsApp Concierge</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      You are never on your own. Our dedicated holiday desk monitors your flights, transfers, and activities in real time.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Visual Card with Testimonial Overlay */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80"
                  alt="Luxury Vacation Experience"
                  className="w-full h-[520px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />

                {/* Floating Testimonial Pill */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-white/40">
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs font-medium text-slate-800 italic">
                    &quot;The TraveloPedia planned our Europe 12-day vacation from Surat. Every private transfer and hotel in Switzerland was flawless. Truly Cox &amp; Kings level execution!&quot;
                  </p>
                  <p className="text-[11px] font-bold text-brand-600 mt-2">
                    — Hitesh &amp; Bhavna Jariwala (Ghod Dod Road, Surat)
                  </p>
                </div>
              </div>

              {/* Decorative Accent Badges */}
              <div className="absolute -top-4 -right-4 bg-brand-500 text-white p-4 rounded-2xl shadow-xl hidden sm:block">
                <span className="text-2xl font-black font-serif block">
                  <AnimatedCounter target={10} suffix="+" />
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold">Years Experience</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 5. Virtual VIP Road Vesu Flagship Office Lounge & Coffee Appointment */}
      <SuratVIPOfficeTour />

      {/* 5B. Custom Tour Planning Callout Banner */}
      <section className="py-20 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              Tailor-Made Tour Planning
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
              Don&apos;t See Your Exact Route? <br />
              Let&apos;s Design Your Custom Itinerary.
            </h2>
            <p className="mt-3 text-slate-300 text-sm max-w-xl">
              Choose your favorite destinations, preferred airline, hotel star rating, and budget. Our holiday architects will design a bespoke day-by-day plan within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/custom-tour"
              className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 hover:scale-105 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Launch Custom Tour Builder</span>
            </Link>

            <a
              href={getGeneralWhatsAppUrl("Hi The TraveloPedia, I want to discuss a custom itinerary.")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <span>Chat With Consultant</span>
            </a>
          </div>
        </div>
      </section>

      {/* 5C. Comprehensive Surat Travel Concierge FAQ & Advisory */}
      <TravelConciergeFAQ />

      {/* 6. Surat Travelers Reviews */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
              <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span>Surat Client Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-navy-950">
              Trusted by <AnimatedCounter target={1000} suffix="+ " />Surat Families
            </h2>
            <p className="mt-2 text-slate-500 text-sm">
              Read how fellow Gujarati travelers enjoyed our seamless holiday packages across the globe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Kashyap & Neha Kapadia',
                location: 'Vesu, Surat',
                tour: 'Dubai 6-Day Luxury Tour',
                text: 'The private 4x4 desert safari and Burj Khalifa tickets were booked so smoothly. No queue, 5-star hotel in Marina, and excellent vegetarian dinner. The TraveloPedia is our go-to travel planner now!',
                rating: 5
              },
              {
                name: 'Dr. Nirav Choksi',
                location: 'Citylight, Surat',
                tour: 'Kashmir Valley & Gulmarg',
                text: 'Guaranteed Gondola Phase 1 & 2 tickets during Christmas rush! The houseboat in Dal Lake was warm, clean, and the shikara rides were magical for the kids. Thank you to the Surat team!',
                rating: 5
              },
              {
                name: 'Pooja & Sameer Dalal',
                location: 'Adajan, Surat',
                tour: 'Bali Honeymoon with Pool Villa',
                text: 'The floating breakfast in Seminyak villa and the Nusa Penida speedboat tour was unforgettable. Their WhatsApp support was active even late at night when our flight was rescheduled.',
                rating: 5
              }
            ].map((review, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(review.rating)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  &quot;{review.text}&quot;
                </p>
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-navy-950">{review.name}</h4>
                    <span className="text-[11px] text-slate-400">{review.location}</span>
                  </div>
                  <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-brand-50 text-brand-600">
                    {review.tour}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Inquiry Modal */}
      <QuickEnquiryModal
        pkg={selectedPackage}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedPackage(null);
        }}
      />
    </div>
  );
}
