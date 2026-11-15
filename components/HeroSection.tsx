'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Users, 
  Calendar, 
  Star, 
  ChevronDown, 
  Sparkles, 
  ShieldCheck,
  Compass,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  Plane,
  Building,
  Bus,
  Train,
  Car,
  Ticket
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedCounter from '@/components/AnimatedCounter';
import { useLanguage } from '@/context/LanguageContext';

interface HeroSectionProps {
  onSearch?: (destination: string, type: string, season: string) => void;
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  const router = useRouter();

  // Multi-Slide Background Carousel
  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=2400&q=90',
      title: 'Greece Santorini Caldera & Sunset Domes',
      tag: 'Aegean Romance'
    },
    {
      url: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=2400&q=90',
      title: 'Switzerland Alpine Peaks & Glaciers',
      tag: 'Europe Luxury'
    },
    {
      url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2400&q=90',
      title: 'Dubai Skyline, Desert & Private Yachts',
      tag: 'Middle East'
    },
    {
      url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2400&q=90',
      title: 'Bali Cliffside Villas & Sunset Swings',
      tag: 'Tropical Haven'
    },
    {
      url: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=2400&q=90',
      title: 'Kashmir Valley & Gulmarg Gondola',
      tag: 'Snow Paradise'
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const { t } = useLanguage();
  type ServiceTab = 'packages' | 'flights' | 'hotels' | 'cabs' | 'bus' | 'trains' | 'activities' | 'visa';
  const [activeTab, setActiveTab] = useState<ServiceTab>('packages');

  // Multi-service states
  const [destination, setDestination] = useState('');
  const [travelers, setTravelers] = useState('2 Adults');
  const [travelSeason, setTravelSeason] = useState('Any Time');
  const [showTravelersDropdown, setShowTravelersDropdown] = useState(false);
  const [showSeasonDropdown, setShowSeasonDropdown] = useState(false);

  // Flight states
  const [flightFrom, setFlightFrom] = useState('Surat (STV)');
  const [flightTo, setFlightTo] = useState('Dubai (DXB)');
  const [flightDate, setFlightDate] = useState('2026-12-10');
  const [flightTripType, setFlightTripType] = useState<'One Way' | 'Round Trip'>('Round Trip');
  const [flightClass, setFlightClass] = useState('Economy');

  // Hotel states
  const [hotelCity, setHotelCity] = useState('Santorini / Dubai / Goa');
  const [hotelCheckIn, setHotelCheckIn] = useState('2026-12-15');
  const [hotelGuests, setHotelGuests] = useState('2 Adults, 1 Room');

  // Cab states
  const [cabPickup, setCabPickup] = useState('Surat VIP Road / Airport');
  const [cabDrop, setCabDrop] = useState('Mumbai Chhatrapati Shivaji Airport');

  // Bus states
  const [busFrom, setBusFrom] = useState('Surat');
  const [busTo, setBusTo] = useState('Ahmedabad');

  // Train states
  const [trainStation, setTrainStation] = useState('Surat (ST)');
  const [trainDestination, setTrainDestination] = useState('Mumbai Central (BCT)');

  // Activity & Visa states
  const [activityCity, setActivityCity] = useState('Dubai / Santorini / Bali');
  const [visaCountry, setVisaCountry] = useState('Schengen (Europe) / UAE / UK');

  // Animated typing placeholder for "Where to?"
  const placeholderSuggestions = [
    'Greece & Santorini Caldera Suites',
    'Switzerland Alpine Express',
    'Dubai Luxury Marina & Yacht',
    'Bali Private Pool Villa',
    'Kashmir Snow & Dal Lake',
    'Paris & French Riviera',
    'Vietnam Ha Long Bay Cruise',
    'Royal Rajasthan Palaces'
  ];
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = placeholderSuggestions[typingIndex];
    const typingSpeed = isDeleting ? 25 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedPlaceholder(currentWord.substring(0, displayedPlaceholder.length + 1));
        if (displayedPlaceholder.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        setDisplayedPlaceholder(currentWord.substring(0, displayedPlaceholder.length - 1));
        if (displayedPlaceholder.length === 0) {
          setIsDeleting(false);
          setTypingIndex((prev) => (prev + 1) % placeholderSuggestions.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedPlaceholder, isDeleting, typingIndex]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'packages') {
      const query = destination.trim() || displayedPlaceholder;
      if (onSearch) {
        onSearch(query, 'All', travelSeason);
        const packagesSection = document.getElementById('packages-section');
        if (packagesSection) {
          packagesSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        router.push(`/#packages-section?dest=${encodeURIComponent(query)}`);
      }
    } else if (activeTab === 'flights') {
      router.push(`/flights?from=${encodeURIComponent(flightFrom)}&to=${encodeURIComponent(flightTo)}&date=${flightDate}&type=${flightTripType}&cabin=${flightClass}`);
    } else if (activeTab === 'hotels') {
      router.push(`/hotels?city=${encodeURIComponent(hotelCity)}&checkin=${hotelCheckIn}`);
    } else if (activeTab === 'cabs') {
      router.push(`/cabs?pickup=${encodeURIComponent(cabPickup)}&drop=${encodeURIComponent(cabDrop)}`);
    } else if (activeTab === 'bus') {
      router.push(`/bus?from=${encodeURIComponent(busFrom)}&to=${encodeURIComponent(busTo)}`);
    } else if (activeTab === 'trains') {
      router.push(`/trains?from=${encodeURIComponent(trainStation)}&to=${encodeURIComponent(trainDestination)}`);
    } else if (activeTab === 'activities') {
      router.push(`/activities?city=${encodeURIComponent(activityCity)}`);
    } else if (activeTab === 'visa') {
      router.push(`/visa?country=${encodeURIComponent(visaCountry)}`);
    }
  };

  const handlePopularClick = (tag: string) => {
    setActiveTab('packages');
    setDestination(tag);
    if (onSearch) {
      onSearch(tag, 'All', travelSeason);
      const packagesSection = document.getElementById('packages-section');
      if (packagesSection) {
        packagesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-[95vh] flex items-center justify-center bg-black overflow-hidden pt-32 sm:pt-36 pb-16 px-4 sm:px-6 lg:px-8">
      
      {/* 1. Cinematic Full-Bleed Background Carousel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {slides.map((slide, idx) => (
          <div
            key={slide.url}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
              activeSlide === idx ? 'opacity-100 scale-105 animate-kenburns' : 'opacity-0 scale-100'
            }`}
            style={{
              backgroundImage: `url('${slide.url}')`,
            }}
          />
        ))}

        {/* Layered Luxury Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/70" />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]" />
      </div>

      {/* 2. Brand Identity Glowing Ambient Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-logo-lavender/15 blur-[140px] pointer-events-none animate-bubble-1" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-logo-coral/15 blur-[140px] pointer-events-none animate-bubble-2" />

      {/* 3. Main Center Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
        
        {/* Top Surat Desk Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-widest text-white shadow-xl mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-logo-coral animate-ping" />
          <span>{t('trustedPartner')} • Since 2016</span>
        </motion.div>

        {/* Main Headline (Clean, Luxury, Proportional) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight leading-[1.1] max-w-4xl drop-shadow-2xl"
        >
          {t('heroTitle1')} <br className="hidden sm:inline" />
          <span className="italic font-serif font-light text-logo-peach drop-shadow">
            {t('heroTitle2')}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-4 text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl font-light leading-relaxed drop-shadow"
        >
          {t('heroSubtitle')}
        </motion.p>

        {/* =========================================================================
            8-SERVICE UNIVERSAL NAVIGATION TABS & SEARCH FORM (MakeMyTrip Luxe Style)
           ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-8 sm:mt-10 w-full max-w-4xl"
        >
          {/* Universal 8 Service Category Switcher */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-3 max-w-full no-scrollbar px-1">
            {[
              { id: 'packages' as const, label: 'Holiday Packages', icon: Compass, color: 'text-brand-400' },
              { id: 'flights' as const, label: 'Flights', icon: Plane, color: 'text-sky-400' },
              { id: 'hotels' as const, label: 'Hotels & Villas', icon: Building, color: 'text-amber-400' },
              { id: 'cabs' as const, label: 'Airport & Cabs', icon: Car, color: 'text-indigo-400' },
              { id: 'bus' as const, label: 'Buses', icon: Bus, color: 'text-emerald-400' },
              { id: 'trains' as const, label: 'Trains & PNR', icon: Train, color: 'text-rose-400' },
              { id: 'activities' as const, label: 'Experiences', icon: Sparkles, color: 'text-purple-400' },
              { id: 'visa' as const, label: 'Visa Desk', icon: ShieldCheck, color: 'text-teal-400' },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-navy-950 shadow-xl scale-105'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/15'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand-600' : tab.color}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <form
            onSubmit={handleSearch}
            className="bg-black/60 backdrop-blur-2xl rounded-3xl sm:rounded-full border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.7)] p-2.5 sm:p-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 hover:border-logo-coral/40 transition-all text-left"
          >
            {/* 1. TOUR PACKAGES SEARCH */}
            {activeTab === 'packages' && (
              <>
                <div className="flex-1 flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-2xl sm:rounded-full transition-colors relative">
                  <MapPin className="w-5 h-5 text-logo-coral shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider leading-none mb-1">
                      {t('whereTo')}
                    </span>
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder={displayedPlaceholder}
                      className="w-full bg-transparent text-sm sm:text-base font-semibold text-white placeholder:text-slate-300 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="hidden sm:block w-px h-8 bg-white/20 shrink-0" />

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowTravelersDropdown(!showTravelersDropdown);
                      setShowSeasonDropdown(false);
                    }}
                    className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3 px-4 py-2 hover:bg-white/5 rounded-2xl sm:rounded-full transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-logo-lavender shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider leading-none mb-1">
                          {t('whoTravelling')}
                        </span>
                        <span className="text-sm font-semibold text-white block">{travelers}</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showTravelersDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showTravelersDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full mt-2 left-0 w-60 bg-navy-950/98 backdrop-blur-2xl border border-white/20 rounded-2xl p-2 shadow-2xl z-50 text-white"
                      >
                        {['1 Solo Explorer', '2 Adults (Couple / Honeymoon)', 'Family (2 Adults + 2 Kids)', 'Group Tour (6+ Travelers)'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setTravelers(opt);
                              setShowTravelersDropdown(false);
                            }}
                            className="w-full text-left px-3 py-2.5 rounded-xl text-xs hover:bg-white/15 transition-colors font-semibold"
                          >
                            {opt}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="hidden sm:block w-px h-8 bg-white/20 shrink-0" />

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowSeasonDropdown(!showSeasonDropdown);
                      setShowTravelersDropdown(false);
                    }}
                    className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3 px-4 py-2 hover:bg-white/5 rounded-2xl sm:rounded-full transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <Calendar className="w-4 h-4 text-logo-peach shrink-0" />
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider leading-none mb-1">
                          {t('whenDates')}
                        </span>
                        <span className="text-sm font-semibold text-white block">{travelSeason}</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showSeasonDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {showSeasonDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full mt-2 right-0 w-64 bg-navy-950/98 backdrop-blur-2xl border border-white/20 rounded-2xl p-2 shadow-2xl z-50 text-white"
                      >
                        {['Any Time (Flexible Dates)', 'Oct - Dec 2026 (Winter Special)', 'Jan - Mar 2027 (Spring Escape)', 'Apr - Jun 2027 (Summer Vacations)'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              setTravelSeason(opt);
                              setShowSeasonDropdown(false);
                            }}
                            className="w-full text-left px-3 py-2.5 rounded-xl text-xs hover:bg-white/15 transition-colors font-semibold"
                          >
                            {opt}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}

            {/* 2. FLIGHTS SEARCH */}
            {activeTab === 'flights' && (
              <>
                <div className="flex-1 flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-2xl sm:rounded-full">
                  <Plane className="w-5 h-5 text-sky-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider leading-none mb-1">
                      From Airport
                    </span>
                    <input
                      type="text"
                      value={flightFrom}
                      onChange={(e) => setFlightFrom(e.target.value)}
                      placeholder="Surat (STV) or Mumbai (BOM)"
                      className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="hidden sm:block w-px h-8 bg-white/20 shrink-0" />

                <div className="flex-1 flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-2xl sm:rounded-full">
                  <MapPin className="w-5 h-5 text-logo-coral shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider leading-none mb-1">
                      To Destination
                    </span>
                    <input
                      type="text"
                      value={flightTo}
                      onChange={(e) => setFlightTo(e.target.value)}
                      placeholder="Dubai (DXB), London, Bali..."
                      className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="hidden sm:block w-px h-8 bg-white/20 shrink-0" />

                <div className="flex items-center gap-2 px-4 py-2">
                  <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider leading-none mb-1">
                      Departure
                    </span>
                    <input
                      type="date"
                      value={flightDate}
                      onChange={(e) => setFlightDate(e.target.value)}
                      className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>
              </>
            )}

            {/* 3. HOTELS SEARCH */}
            {activeTab === 'hotels' && (
              <>
                <div className="flex-1 flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-2xl sm:rounded-full">
                  <Building className="w-5 h-5 text-amber-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider leading-none mb-1">
                      City, Hotel or Resort
                    </span>
                    <input
                      type="text"
                      value={hotelCity}
                      onChange={(e) => setHotelCity(e.target.value)}
                      placeholder="Santorini, Dubai, Goa, Kashmir..."
                      className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="hidden sm:block w-px h-8 bg-white/20 shrink-0" />

                <div className="flex items-center gap-2 px-4 py-2">
                  <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider leading-none mb-1">
                      Check-In Date
                    </span>
                    <input
                      type="date"
                      value={hotelCheckIn}
                      onChange={(e) => setHotelCheckIn(e.target.value)}
                      className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="hidden sm:block w-px h-8 bg-white/20 shrink-0" />

                <div className="px-4 py-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider leading-none mb-1">
                    Rooms &amp; Guests
                  </span>
                  <input
                    type="text"
                    value={hotelGuests}
                    onChange={(e) => setHotelGuests(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-white focus:outline-none"
                  />
                </div>
              </>
            )}

            {/* 4. CABS & TRANSFERS SEARCH */}
            {activeTab === 'cabs' && (
              <>
                <div className="flex-1 flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-2xl sm:rounded-full">
                  <Car className="w-5 h-5 text-indigo-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider leading-none mb-1">
                      Pickup Location
                    </span>
                    <input
                      type="text"
                      value={cabPickup}
                      onChange={(e) => setCabPickup(e.target.value)}
                      placeholder="Surat VIP Road, Airport..."
                      className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="hidden sm:block w-px h-8 bg-white/20 shrink-0" />

                <div className="flex-1 flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-2xl sm:rounded-full">
                  <MapPin className="w-5 h-5 text-logo-coral shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider leading-none mb-1">
                      Drop Destination
                    </span>
                    <input
                      type="text"
                      value={cabDrop}
                      onChange={(e) => setCabDrop(e.target.value)}
                      placeholder="Mumbai Airport, Ahmedabad..."
                      className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
                    />
                  </div>
                </div>
              </>
            )}

            {/* 5. BUS SEARCH */}
            {activeTab === 'bus' && (
              <>
                <div className="flex-1 flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-2xl sm:rounded-full">
                  <Bus className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider leading-none mb-1">
                      From City
                    </span>
                    <input
                      type="text"
                      value={busFrom}
                      onChange={(e) => setBusFrom(e.target.value)}
                      placeholder="Surat..."
                      className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="hidden sm:block w-px h-8 bg-white/20 shrink-0" />

                <div className="flex-1 flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-2xl sm:rounded-full">
                  <MapPin className="w-5 h-5 text-logo-peach shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider leading-none mb-1">
                      To City
                    </span>
                    <input
                      type="text"
                      value={busTo}
                      onChange={(e) => setBusTo(e.target.value)}
                      placeholder="Ahmedabad, Mumbai, Udaipur..."
                      className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
                    />
                  </div>
                </div>
              </>
            )}

            {/* 6. TRAIN SEARCH */}
            {activeTab === 'trains' && (
              <>
                <div className="flex-1 flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-2xl sm:rounded-full">
                  <Train className="w-5 h-5 text-rose-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider leading-none mb-1">
                      Origin Station
                    </span>
                    <input
                      type="text"
                      value={trainStation}
                      onChange={(e) => setTrainStation(e.target.value)}
                      placeholder="Surat (ST)"
                      className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="hidden sm:block w-px h-8 bg-white/20 shrink-0" />

                <div className="flex-1 flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-2xl sm:rounded-full">
                  <MapPin className="w-5 h-5 text-rose-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider leading-none mb-1">
                      Destination Station
                    </span>
                    <input
                      type="text"
                      value={trainDestination}
                      onChange={(e) => setTrainDestination(e.target.value)}
                      placeholder="Mumbai Central (BCT)"
                      className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
                    />
                  </div>
                </div>
              </>
            )}

            {/* 7. EXPERIENCES SEARCH */}
            {activeTab === 'activities' && (
              <div className="flex-1 flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-2xl sm:rounded-full">
                <Sparkles className="w-5 h-5 text-purple-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider leading-none mb-1">
                    City or Activity
                  </span>
                  <input
                    type="text"
                    value={activityCity}
                    onChange={(e) => setActivityCity(e.target.value)}
                    placeholder="Dubai Desert Safari, Santorini Yacht, Bali Rafting..."
                    className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* 8. VISA DESK SEARCH */}
            {activeTab === 'visa' && (
              <div className="flex-1 flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-2xl sm:rounded-full">
                <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider leading-none mb-1">
                    Destination Country
                  </span>
                  <input
                    type="text"
                    value={visaCountry}
                    onChange={(e) => setVisaCountry(e.target.value)}
                    placeholder="Greece / Schengen, UAE, United Kingdom, USA..."
                    className="w-full bg-transparent text-sm font-semibold text-white focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Search Submit Button */}
            <button
              type="submit"
              className="px-8 py-3.5 sm:py-3 rounded-full bg-gradient-to-r from-logo-coralDeep via-brand-500 to-logo-peachGold hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-logo-coralDeep/30 transition-transform active:scale-95 shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>
                {activeTab === 'packages'
                  ? t('searchBtn')
                  : activeTab === 'flights'
                  ? 'Search Flights'
                  : activeTab === 'hotels'
                  ? 'Search Hotels'
                  : activeTab === 'cabs'
                  ? 'Find Cabs'
                  : activeTab === 'bus'
                  ? 'Find Buses'
                  : activeTab === 'trains'
                  ? 'Check Trains'
                  : activeTab === 'activities'
                  ? 'Explore'
                  : 'Check Visa'}
              </span>
            </button>
          </form>
        </motion.div>

        {/* Quick Trending Destinations Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-6 flex items-center justify-center gap-2 flex-wrap"
        >
          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold mr-1">
            {t('popularNow')}
          </span>
          {['Greece & Santorini', 'Switzerland', 'Dubai', 'Bali', 'Kashmir', 'Vietnam'].map((tag) => (
            <button
              key={tag}
              onClick={() => handlePopularClick(tag)}
              className="px-3.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-slate-200 transition-all hover:scale-105"
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Trust Badges Strip (Clean, Balanced, Bottom) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-300 pt-6 border-t border-white/10 w-full"
        >
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-bold text-white">4.9/5</span>
            <span className="text-slate-400">(<AnimatedCounter target={1200} suffix="+" /> Surat Families)</span>
          </div>

          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Pure Veg &amp; Jain Food Care</span>
          </div>

          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-logo-coral" />
            <span>Physical Office at VIP Road, Vesu</span>
          </div>

          <div className="flex items-center gap-1.5">
            <PhoneCall className="w-4 h-4 text-logo-peach" />
            <span>24x7 Dedicated Travel Desk</span>
          </div>
        </motion.div>

      </div>

    </section>
  );
}
