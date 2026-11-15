'use client';

import React, { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Clock, 
  MapPin, 
  Hotel, 
  Plane, 
  Utensils, 
  Car, 
  Calendar, 
  Check, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  Sparkles, 
  MessageCircle, 
  Phone, 
  ShieldCheck, 
  Star, 
  ArrowLeft,
  Info,
  Compass
} from 'lucide-react';
import { TravelPackage } from '@/types/travel';
import { INITIAL_PACKAGES } from '@/data/seed-data';
import { formatPrice, COMPANY_DETAILS, getWhatsAppInquiryUrl } from '@/lib/utils';
import QuickEnquiryModal from '@/components/QuickEnquiryModal';

export default function PackageDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [pkg, setPkg] = useState<TravelPackage | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>('');
  const [expandedDays, setExpandedDays] = useState<{ [key: number]: boolean }>({ 1: true });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Look up package
    fetch(`/api/packages`)
      .then(res => res.json())
      .then(data => {
        const found = data.packages?.find((p: TravelPackage) => p.slug === slug);
        if (found) {
          setPkg(found);
          setActiveImage(found.heroImage);
        } else {
          // Fallback to initial seed
          const seedFound = INITIAL_PACKAGES.find(p => p.slug === slug);
          if (seedFound) {
            setPkg(seedFound);
            setActiveImage(seedFound.heroImage);
          }
        }
      })
      .catch(() => {
        const seedFound = INITIAL_PACKAGES.find(p => p.slug === slug);
        if (seedFound) {
          setPkg(seedFound);
          setActiveImage(seedFound.heroImage);
        }
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-slate-500">Loading Itinerary Details...</span>
        </div>
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <Compass className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-2xl font-bold font-serif text-navy-950">Package Not Found</h2>
        <p className="text-slate-500 mt-2 text-sm max-w-md">
          The travel itinerary you are looking for may have been updated or moved.
        </p>
        <Link 
          href="/"
          className="mt-6 px-6 py-3 rounded-xl bg-brand-500 text-white font-bold text-sm"
        >
          Return to All Packages
        </Link>
      </div>
    );
  }

  const durationStr = `${pkg.durationNights} Nights / ${pkg.durationDays} Days`;
  const whatsappUrl = getWhatsAppInquiryUrl(pkg.title, durationStr);

  const toggleDay = (dayNum: number) => {
    setExpandedDays(prev => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };

  const expandAllDays = () => {
    const all: { [key: number]: boolean } = {};
    pkg.itinerary.forEach(d => { all[d.dayNumber] = true; });
    setExpandedDays(all);
  };

  const collapseAllDays = () => {
    setExpandedDays({});
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 lg:pb-16">
      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
          <span>/</span>
          <Link 
            href={pkg.category === 'international' ? '/international' : '/domestic'} 
            className="hover:text-brand-600 capitalize transition-colors"
          >
            {pkg.category} Tours
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-semibold truncate max-w-xs">{pkg.destination}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Title Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand-600">
                {pkg.tripType}
              </span>
              {pkg.badge && (
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-800">
                  {pkg.badge}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs text-slate-500 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-brand-500" />
                {pkg.destination}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif text-navy-950 leading-tight">
              {pkg.title}
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              {pkg.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-600" />
              <span>Share on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* High-Res Photo Gallery Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
          {/* Main Hero Photo */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden aspect-[16/10] bg-slate-900 shadow-lg relative">
            <img
              src={activeImage || pkg.heroImage}
              alt={pkg.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute bottom-4 left-4 bg-navy-950/75 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-white text-xs font-semibold flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{durationStr}</span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-3">
            {(pkg.gallery && pkg.gallery.length > 0 ? pkg.gallery : [pkg.heroImage]).slice(0, 3).map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImage(imgUrl)}
                className={`relative rounded-2xl overflow-hidden h-32 sm:h-36 lg:h-[135px] cursor-pointer border-2 transition-all ${
                  activeImage === imgUrl ? 'border-brand-500 ring-2 ring-brand-500/20' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`View ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 mb-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
          <div className="border-r border-slate-100 last:border-none p-2">
            <span className="text-[11px] text-slate-400 font-semibold block uppercase">Duration</span>
            <span className="text-sm font-bold text-navy-950 font-serif">{durationStr}</span>
          </div>

          <div className="border-r border-slate-100 last:border-none p-2">
            <span className="text-[11px] text-slate-400 font-semibold block uppercase">Hotel Category</span>
            <span className="text-sm font-bold text-brand-600 flex items-center justify-center gap-1">
              <Hotel className="w-3.5 h-3.5" />
              {pkg.hotelRating}★ Luxury Stays
            </span>
          </div>

          <div className="border-r border-slate-100 last:border-none p-2">
            <span className="text-[11px] text-slate-400 font-semibold block uppercase">Best Season</span>
            <span className="text-sm font-bold text-navy-950">{pkg.bestTimeToVisit || 'All Seasons'}</span>
          </div>

          <div className="border-r border-slate-100 last:border-none p-2">
            <span className="text-[11px] text-slate-400 font-semibold block uppercase">Transfers</span>
            <span className="text-sm font-bold text-emerald-700 flex items-center justify-center gap-1">
              <Car className="w-3.5 h-3.5" />
              Private AC Cab
            </span>
          </div>

          <div className="border-r border-slate-100 last:border-none p-2">
            <span className="text-[11px] text-slate-400 font-semibold block uppercase">Meals</span>
            <span className="text-sm font-bold text-amber-700 flex items-center justify-center gap-1">
              <Utensils className="w-3.5 h-3.5" />
              {pkg.mealsIncluded ? 'Daily Breakfast' : 'On Request'}
            </span>
          </div>

          <div className="p-2">
            <span className="text-[11px] text-slate-400 font-semibold block uppercase">Flights</span>
            <span className={`text-sm font-bold flex items-center justify-center gap-1 ${pkg.flightsIncluded ? 'text-emerald-700' : 'text-slate-600'}`}>
              <Plane className="w-3.5 h-3.5" />
              {pkg.flightsIncluded ? 'Included' : 'Assistance Provided'}
            </span>
          </div>
        </div>

        {/* Main Content Layout with Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Overview, Highlights, Day-by-Day Accordion, Inclusions/Exclusions */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Tour Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <h2 className="text-xl font-bold font-serif text-navy-950 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5 text-brand-500" />
                Tour Overview
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                {pkg.overview}
              </p>

              {/* Highlights List */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h3 className="text-base font-bold text-navy-950 font-serif mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Key Itinerary Highlights
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pkg.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Day-by-Day Structured Itinerary Accordion */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-xl font-bold font-serif text-navy-950">
                    Day-by-Day Curated Itinerary
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Structured day-wise schedule with morning, afternoon &amp; evening plans.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold">
                  <button
                    onClick={expandAllDays}
                    className="text-brand-600 hover:text-brand-700 underline"
                  >
                    Expand All
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    onClick={collapseAllDays}
                    className="text-slate-500 hover:text-slate-700 underline"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {/* Accordion List */}
              <div className="space-y-4">
                {pkg.itinerary.map((day) => {
                  const isExpanded = !!expandedDays[day.dayNumber];

                  return (
                    <div 
                      key={day.dayNumber} 
                      className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                        isExpanded ? 'border-brand-200 bg-brand-50/20 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {/* Accordion Trigger */}
                      <button
                        onClick={() => toggleDay(day.dayNumber)}
                        className="w-full p-4 sm:p-5 flex items-start sm:items-center justify-between text-left gap-4"
                      >
                        <div className="flex items-start sm:items-center gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-serif font-black text-xs shrink-0 ${
                            isExpanded ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-700'
                          }`}>
                            D{day.dayNumber}
                          </div>
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 block">
                              Day {day.dayNumber}
                            </span>
                            <h4 className="text-sm sm:text-base font-bold text-navy-950 font-serif">
                              {day.title}
                            </h4>
                          </div>
                        </div>

                        <div className="p-1 rounded-lg bg-slate-100 text-slate-500 shrink-0 mt-1 sm:mt-0">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      {/* Accordion Content */}
                      {isExpanded && (
                        <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100 text-slate-700 text-xs sm:text-sm leading-relaxed space-y-4">
                          <p>{day.description}</p>

                          {/* Day Details Bar: Meals & Hotel */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            {day.meals && (
                              <div className="p-3 rounded-xl bg-amber-50/80 border border-amber-100 text-amber-900 text-xs flex items-center gap-2">
                                <Utensils className="w-4 h-4 text-amber-600 shrink-0" />
                                <div>
                                  <span className="font-bold block">Meals Included:</span>
                                  <span>{day.meals}</span>
                                </div>
                              </div>
                            )}

                            {day.hotel && (
                              <div className="p-3 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-800 text-xs flex items-center gap-2">
                                <Hotel className="w-4 h-4 text-brand-500 shrink-0" />
                                <div>
                                  <span className="font-bold block">Accommodations:</span>
                                  <span>{day.hotel}</span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Activities Tags */}
                          {day.activities && day.activities.length > 0 && (
                            <div className="pt-2">
                              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Key Activities:</span>
                              <div className="flex flex-wrap gap-1.5">
                                {day.activities.map((act, aIdx) => (
                                  <span key={aIdx} className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-700 font-medium">
                                    • {act}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inclusions & Exclusions Checklist */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
              <h2 className="text-xl font-bold font-serif text-navy-950 mb-6">
                What&apos;s Included &amp; Excluded
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Inclusions */}
                <div>
                  <div className="flex items-center gap-2 pb-3 mb-4 border-b border-emerald-100 text-emerald-800 font-bold text-sm">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <span>Package Inclusions</span>
                  </div>

                  <ul className="space-y-3">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div>
                  <div className="flex items-center gap-2 pb-3 mb-4 border-b border-red-100 text-red-800 font-bold text-sm">
                    <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                      <X className="w-4 h-4 stroke-[3]" />
                    </div>
                    <span>Package Exclusions</span>
                  </div>

                  <ul className="space-y-3">
                    {pkg.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
                        <X className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Booking / Inquiry Widget */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/90">
              
              {/* Pricing Header */}
              <div className="pb-5 mb-5 border-b border-slate-100">
                <span className="text-xs text-slate-400 font-semibold block uppercase">Guaranteed Best Price</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold font-serif text-navy-950">
                    {formatPrice(pkg.discountedPrice)}
                  </span>
                  {pkg.basePrice > pkg.discountedPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      {formatPrice(pkg.basePrice)}
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-500 font-medium mt-0.5 block">
                  per person on twin sharing basis
                </span>
                
                {pkg.basePrice > pkg.discountedPrice && (
                  <div className="mt-2.5 inline-block px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                    You save {formatPrice(pkg.basePrice - pkg.discountedPrice)} per person
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-500 via-brand-600 to-orange-600 hover:from-brand-600 hover:to-orange-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-brand-500/25 hover:-translate-y-0.5 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Send Instant Inquiry</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <a
                  href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                  className="w-full py-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 border border-slate-200 transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-500" />
                  <span>Call Surat Desk: {COMPANY_DETAILS.phone}</span>
                </a>
              </div>

              {/* Surat Trust Highlights */}
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3 text-xs text-slate-600">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Customized Route Available</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
                  <span>Local Office: VIP Road, Vesu, Surat</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Star className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Verified 4★ &amp; 5★ Accommodations</span>
                </div>
              </div>

            </div>

            {/* Need Customization Box */}
            <div className="bg-gradient-to-br from-navy-950 to-navy-900 rounded-3xl p-6 text-white shadow-lg">
              <h3 className="font-bold font-serif text-lg text-white">Need Changes in This Plan?</h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Want to add more days, upgrade to a 5-star private pool villa, or include flights directly from Surat/Mumbai?
              </p>
              <Link
                href="/custom-tour"
                className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-amber-200 underline"
              >
                <span>Customize This Itinerary</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

        </div>

      </div>

      {/* Floating Bottom Bar on Mobile */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 shadow-2xl z-40 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-400 block font-semibold uppercase">From</span>
          <span className="text-lg font-black font-serif text-navy-950">
            {formatPrice(pkg.discountedPrice)}
          </span>
          <span className="text-[10px] text-slate-500 block">/ person</span>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md"
            aria-label="Enquire on WhatsApp"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
          </a>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-brand-500/25"
          >
            <span>Inquire Now</span>
          </button>
        </div>
      </div>

      {/* Quick Inquiry Modal */}
      <QuickEnquiryModal
        pkg={pkg}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
