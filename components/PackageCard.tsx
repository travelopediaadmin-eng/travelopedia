'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Plane, 
  Hotel, 
  Utensils, 
  Car, 
  Camera, 
  ArrowRight, 
  MessageCircle, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Star,
  Phone
} from 'lucide-react';
import { motion } from 'framer-motion';
import { TravelPackage } from '@/types/travel';
import { getWhatsAppInquiryUrl, COMPANY_DETAILS } from '@/lib/utils';
import { useCurrency } from '@/context/CurrencyContext';

interface PackageCardProps {
  pkg: TravelPackage;
  onQuickInquire?: (pkg: TravelPackage) => void;
}

export default function PackageCard({ pkg, onQuickInquire }: PackageCardProps) {
  const { formatPrice } = useCurrency();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const images = pkg.gallery && pkg.gallery.length > 0 ? pkg.gallery : [pkg.heroImage];

  const durationText = `${pkg.durationNights}N / ${pkg.durationDays}D`;
  const whatsappUrl = getWhatsAppInquiryUrl(pkg.title, `${pkg.durationNights} Nights / ${pkg.durationDays} Days`);

  // Auto-advance photos on card hover (Airbnb Luxe style)
  useEffect(() => {
    if (!isHovered || images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 2200);

    return () => clearInterval(timer);
  }, [isHovered, images.length]);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between relative"
    >
      {/* Top Image Section with Smooth Crossfade */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={images[currentImageIndex] || pkg.heroImage}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-all duration-700 ease-out"
          loading="lazy"
        />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

        {/* Subtle holographic sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-logo-coral/10 via-transparent to-logo-lavender/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        {/* Gallery Slider Controls (Manual Chevrons) */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="Previous image"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            {/* Dots Indicator */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full z-10">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    currentImageIndex === i ? 'w-3.5 bg-logo-peach' : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center z-10">
          {pkg.badge && (
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-gradient-to-r from-logo-coralDeep to-brand-500 text-white shadow-md">
              {pkg.badge}
            </span>
          )}
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-navy-950/85 text-amber-300 backdrop-blur-md border border-white/15">
            {pkg.tripType}
          </span>
        </div>

        {/* Duration Badge Bottom Left */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold z-10">
          <Clock className="w-3.5 h-3.5 text-logo-peach" />
          <span>{durationText}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Destination & Rating */}
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="inline-flex items-center gap-1 font-bold text-logo-coralDeep uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>{pkg.destination}</span>
            </span>

            <span className="inline-flex items-center gap-1 font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full text-[11px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>4.9</span>
            </span>
          </div>

          {/* Title */}
          <Link href={`/packages/${pkg.slug}`}>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-navy-950 group-hover:text-logo-periwinkleDark transition-colors line-clamp-2 leading-snug">
              {pkg.title}
            </h3>
          </Link>

          {/* Subtitle / Highlights summary */}
          <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {pkg.subtitle}
          </p>

          {/* Key Inclusions Icons */}
          <div className="mt-5 pt-3 border-t border-slate-100 grid grid-cols-4 gap-2 text-center text-xs text-slate-600">
            <div className={`p-1.5 rounded-xl bg-slate-50 flex flex-col items-center gap-1 ${pkg.flightsIncluded ? 'text-emerald-700' : 'text-slate-400'}`}>
              <Plane className="w-3.5 h-3.5" />
              <span className="text-[10px] font-medium leading-none">Flights</span>
            </div>
            <div className="p-1.5 rounded-xl bg-slate-50 flex flex-col items-center gap-1 text-slate-700">
              <Hotel className="w-3.5 h-3.5 text-logo-coralDeep" />
              <span className="text-[10px] font-medium leading-none">{pkg.hotelRating}★ Stays</span>
            </div>
            <div className={`p-1.5 rounded-xl bg-slate-50 flex flex-col items-center gap-1 ${pkg.mealsIncluded ? 'text-slate-700' : 'text-slate-400'}`}>
              <Utensils className="w-3.5 h-3.5 text-amber-600" />
              <span className="text-[10px] font-medium leading-none">Jain / Veg</span>
            </div>
            <div className={`p-1.5 rounded-xl bg-slate-50 flex flex-col items-center gap-1 ${pkg.transfersIncluded ? 'text-slate-700' : 'text-slate-400'}`}>
              <Car className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-[10px] font-medium leading-none">Private Car</span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA Actions */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-3.5 bg-slate-50/80 border border-slate-200/70 rounded-2xl px-3.5 py-2.5">
            <div>
              <span className="text-[10px] uppercase font-bold text-brand-600 block tracking-wider">
                Custom Itinerary
              </span>
              <span className="text-base sm:text-lg font-black text-navy-950 font-serif block">
                Price on Request
              </span>
            </div>
            <a
              href={`tel:${COMPANY_DETAILS.phoneRaw}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition-all"
              title="Call to Discuss Pricing"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call to Discuss</span>
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Link
              href={`/packages/${pkg.slug}`}
              className="flex-1 py-2.5 px-3 rounded-2xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors group/btn shadow-sm"
            >
              <span>View Itinerary</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </Link>

            {onQuickInquire && (
              <button
                type="button"
                onClick={() => onQuickInquire(pkg)}
                className="py-2.5 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                title="Send Instant Enquiry"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-500" />
                <span>Quote</span>
              </button>
            )}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 transition-all active:scale-95 shrink-0"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
