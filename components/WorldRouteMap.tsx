'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plane, 
  MapPin, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Compass, 
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { WORLD_MAP_PATH } from '@/data/world-map-path';
import { COMPANY_DETAILS, formatPrice } from '@/lib/utils';

export interface RouteDestination {
  id: string;
  name: string;
  country: string;
  code: string;
  x: number;
  y: number;
  duration: string;
  price: number;
  badge: string;
  tagline: string;
  image: string;
  slug: string;
}

const SURAT_COORDS = { x: 702.3, y: 191.2, name: 'Surat (STV)', label: 'Surat Office (VIP Rd, Vesu)' };

const ROUTES: RouteDestination[] = [
  {
    id: 'greece',
    name: 'Greece & Santorini',
    country: 'Greece',
    code: 'ATH',
    x: 565.9,
    y: 144.5,
    duration: '8h 10m connect',
    price: 195000,
    badge: 'Aesthetic Romance 🇬🇷',
    tagline: 'Oia whitewashed cave villas, heated caldera plunge pool & Aegean catamaran',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80',
    slug: 'greece-santorini-caldera-luxury-romance'
  },
  {
    id: 'dubai',
    name: 'Dubai & Abu Dhabi',
    country: 'United Arab Emirates',
    code: 'DXB',
    x: 653.5,
    y: 180.0,
    duration: '3h 40m direct',
    price: 48000,
    badge: 'Trending in Surat 🔥',
    tagline: 'Private luxury yacht, 5★ Marina hotel & desert sunset dune bashing',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
    slug: 'dubai-extravaganza-luxury'
  },
  {
    id: 'swiss',
    name: 'Swiss Alps & Zurich',
    country: 'Switzerland',
    code: 'ZRH',
    x: 523.7,
    y: 118.4,
    duration: '8h 45m connect',
    price: 185000,
    badge: 'Europe Luxury 🏔️',
    tagline: 'First Cliff Walk, Glacier 3000, scenic Glacier Express & Swiss Pass',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80',
    slug: 'swiss-paris-european-odyssey'
  },
  {
    id: 'bali',
    name: 'Bali & Nusa Penida',
    country: 'Indonesia',
    code: 'DPS',
    x: 819.7,
    y: 273.2,
    duration: '7h 30m connect',
    price: 62000,
    badge: 'Honeymoon Choice 💖',
    tagline: 'Private cliffside pool villa, floating breakfast & speedboat tour',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
    slug: 'enchanting-bali-island-escape'
  },
  {
    id: 'kashmir',
    name: 'Kashmir Valley & Gulmarg',
    country: 'India',
    code: 'SXR',
    x: 707.7,
    y: 155.3,
    duration: '2h 30m direct/connect',
    price: 38500,
    badge: '100% Pure Veg & Jain ❄️',
    tagline: 'Guaranteed Gulmarg Gondola passes & heated Dal Lake houseboat',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80',
    slug: 'kashmir-paradise-on-earth'
  },
  {
    id: 'vietnam',
    name: 'Vietnam & Ha Long Bay',
    country: 'Vietnam',
    code: 'HAN',
    x: 794.0,
    y: 191.6,
    duration: '4h 50m direct',
    price: 55000,
    badge: 'Gen-Z Trending ⚡',
    tagline: '5-Star overnight luxury cruise, Golden Hands Bridge & street cuisine',
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80',
    slug: 'vietnam-ha-long-bay-luxury-cruise'
  },
  {
    id: 'paris',
    name: 'Paris & French Riviera',
    country: 'France',
    code: 'CDG',
    x: 506.5,
    y: 114.3,
    duration: '9h 15m connect',
    price: 210000,
    badge: 'Ultra Luxury 🥂',
    tagline: 'VIP Eiffel tower summit access, Seine cruise & Palace of Versailles',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    slug: 'swiss-paris-european-odyssey'
  },
  {
    id: 'maldives',
    name: 'Maldives Private Atolls',
    country: 'Maldives',
    code: 'MLE',
    x: 704.1,
    y: 238.4,
    duration: '3h 10m direct',
    price: 95000,
    badge: 'Overwater Lagoon 🌊',
    tagline: 'Private seaplane transfer, overwater villa & coral reef snorkeling',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80',
    slug: 'enchanting-bali-island-escape'
  }
];

export default function WorldRouteMap() {
  const [selectedRoute, setSelectedRoute] = useState<RouteDestination>(ROUTES[0]);

  // Calculate curve control point for curved flight trajectory
  const getCurvePath = (x1: number, y1: number, x2: number, y2: number) => {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const dist = Math.sqrt(dx * dx + dy * dy);
    // Arc upwards towards the poles
    const curvature = Math.min(dist * 0.28, 45);
    const ctrlX = midX;
    const ctrlY = midY - curvature;
    return `M ${x1},${y1} Q ${ctrlX},${ctrlY} ${x2},${y2}`;
  };

  const whatsappInquiryUrl = `https://wa.me/${COMPANY_DETAILS.phoneRaw}?text=${encodeURIComponent(
    `Hi The TraveloPedia Surat! I am viewing the Global Route Map on your website for ${selectedRoute.name} (${selectedRoute.code}). Please share itinerary details and flight options from Surat/Mumbai.`
  )}`;

  const handleSelectRoute = (route: RouteDestination) => {
    setSelectedRoute(route);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50/70 to-white relative overflow-hidden border-t border-slate-200/70">
      
      {/* Background Soft Brand Auras */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-logo-lavender/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-logo-peach/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-logo-lavender/30 border border-logo-lavender/60 text-logo-periwinkleDark text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-logo-coralDeep" />
            <span>Surat Global Departure Radar 2026</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-logo-charcoal tracking-tight">
            The Entire World, Curated from Surat
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            From our headquarters on VIP Road, Vesu to Greece, Swiss Alps, Dubai Marina, and Bali. Click any city marker or button to watch the live flight trajectory draw directly to your dream destination.
          </p>
        </div>

        {/* Quick Filter Destination Chips - 1 Click Selection */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {ROUTES.map((route) => {
            const isCurrent = selectedRoute.id === route.id;
            return (
              <button
                key={route.id}
                onClick={() => handleSelectRoute(route)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isCurrent
                    ? 'bg-navy-950 text-white shadow-lg shadow-navy-950/20 scale-105 ring-2 ring-logo-coral/40'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 shadow-sm hover:scale-[1.02]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-logo-coral' : 'bg-slate-400'}`} />
                <span>{route.name}</span>
                <span className="text-[10px] opacity-75">({route.code})</span>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            INTERACTIVE ULTRA-LIGHT LUXURY VECTOR WORLD MAP
           ========================================================================= */}
        <div className="relative bg-white rounded-3xl sm:rounded-[36px] border border-slate-200/90 shadow-xl overflow-hidden p-3 sm:p-6 lg:p-8">
          
          {/* Top Map HUD Bar */}
          <div className="flex items-center justify-between pb-4 mb-2 border-b border-slate-100 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-logo-coralDeep animate-pulse" />
                <span>Base Hub: Surat Airport (STV)</span>
              </div>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span className="text-slate-500 hidden sm:inline">VIP Road Vesu Holiday Desk</span>
            </div>

            <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
              <span className="hidden md:inline">EQUIRECTANGULAR WGS84</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">LIVE RADAR</span>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative aspect-[2/1] w-full select-none">
            <svg
              viewBox="0 0 1000 500"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                {/* Active Flight Arc Gradient */}
                <linearGradient id="flightArcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#E86351" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#FACFA6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#6376BD" stopOpacity="0.95" />
                </linearGradient>

                {/* Ambient glow filter */}
                <filter id="mapGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* 1. Subtle Equator and Tropic Meridian Guides */}
              <g stroke="#94A3B8" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.45">
                <line x1="0" y1="250" x2="1000" y2="250" />
                <line x1="0" y1="185" x2="1000" y2="185" />
                <line x1="0" y1="315" x2="1000" y2="315" />
                <line x1="500" y1="0" x2="500" y2="500" />
                <line x1="250" y1="0" x2="250" y2="500" />
                <line x1="750" y1="0" x2="750" y2="500" />
              </g>

              {/* 2. Continents Vector Paths (Light Luxury Palette) */}
              <path
                d={WORLD_MAP_PATH}
                fill="#BAC4E2"
                fillOpacity="0.22"
                stroke="#6376BD"
                strokeWidth="0.8"
                strokeOpacity="0.4"
                className="transition-colors duration-300"
              />

              {/* 3. Inactive Curved Flight Paths (Clickable) */}
              {ROUTES.map((route) => {
                if (route.id === selectedRoute.id) return null;
                const pathD = getCurvePath(SURAT_COORDS.x, SURAT_COORDS.y, route.x, route.y);
                return (
                  <g key={`inactive-${route.id}`} className="cursor-pointer" onClick={() => handleSelectRoute(route)}>
                    {/* Visual dashed arc */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#BAC4E2"
                      strokeWidth="1"
                      strokeDasharray="3 4"
                      opacity="0.55"
                      className="transition-opacity hover:opacity-90"
                    />
                    {/* Generous invisible hit zone along the arc */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="16"
                    />
                  </g>
                );
              })}

              {/* 4. Active Highlighted Flight Trajectory - Smoothly Draws on Simple Click */}
              {selectedRoute && (
                <g key={`active-group-${selectedRoute.id}`}>
                  {/* Glowing background blur line */}
                  <motion.path
                    d={getCurvePath(SURAT_COORDS.x, SURAT_COORDS.y, selectedRoute.x, selectedRoute.y)}
                    fill="none"
                    stroke="url(#flightArcGradient)"
                    strokeWidth="4"
                    opacity="0.4"
                    filter="url(#mapGlow)"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                  />

                  {/* Sharp animated foreground flight line that draws from Surat */}
                  <motion.path
                    d={getCurvePath(SURAT_COORDS.x, SURAT_COORDS.y, selectedRoute.x, selectedRoute.y)}
                    fill="none"
                    stroke="url(#flightArcGradient)"
                    strokeWidth="2.5"
                    strokeDasharray="16 10"
                    className="animate-flight-dash"
                    initial={{ pathLength: 0, opacity: 0.5 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.1, ease: 'easeOut' }}
                  />
                </g>
              )}

              {/* 5. Destination City Markers - Generous Click Targets & Centered Radar Pulse */}
              {ROUTES.map((route) => {
                const isSelected = selectedRoute.id === route.id;

                return (
                  <g
                    key={`marker-${route.id}`}
                    onClick={() => handleSelectRoute(route)}
                    className="cursor-pointer group"
                  >
                    {/* Generous Invisible Click Target (radius 22px = 44px hit diameter) */}
                    <circle
                      cx={route.x}
                      cy={route.y}
                      r="22"
                      fill="transparent"
                      className="cursor-pointer"
                    />

                    {/* Perfectly Centered Radar Pulse Ring on Active Destination (SVG Radius Animation - Gentle slow wave) */}
                    {isSelected && (
                      <motion.circle
                        cx={route.x}
                        cy={route.y}
                        fill="none"
                        stroke="#E86351"
                        strokeWidth="1.5"
                        initial={{ r: 6, opacity: 0.85 }}
                        animate={{ r: [6, 18], opacity: [0.85, 0] }}
                        transition={{ repeat: Infinity, duration: 2.8, ease: 'easeOut' }}
                      />
                    )}

                    {/* Outer Pin Circle */}
                    <circle
                      cx={route.x}
                      cy={route.y}
                      r={isSelected ? 6 : 4}
                      fill={isSelected ? '#E86351' : '#2D2B2D'}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      className="transition-transform duration-200 group-hover:scale-125"
                    />

                    {/* Clickable Airport Code Badge */}
                    <g className="cursor-pointer">
                      <rect
                        x={route.x - 13}
                        y={route.y - 18}
                        width="26"
                        height="11"
                        rx="5.5"
                        fill={isSelected ? '#2D2B2D' : '#FFFFFF'}
                        stroke={isSelected ? '#E86351' : '#CBD5E1'}
                        strokeWidth="1"
                        className="transition-colors drop-shadow-sm group-hover:stroke-brand-500"
                      />
                      <text
                        x={route.x}
                        y={route.y - 10}
                        textAnchor="middle"
                        fill={isSelected ? '#FFFFFF' : '#334155'}
                        fontSize="7"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                        className="select-none pointer-events-none"
                      >
                        {route.code}
                      </text>
                    </g>
                  </g>
                );
              })}

              {/* 6. Surat Origin Landmark Hub Pin (VIP Road, Vesu) */}
              <g className="cursor-pointer">
                {/* SVG Centered Radar Wave from Surat (Gentle slow wave) */}
                <motion.circle
                  cx={SURAT_COORDS.x}
                  cy={SURAT_COORDS.y}
                  fill="none"
                  stroke="#E86351"
                  strokeWidth="1.5"
                  initial={{ r: 7, opacity: 0.85 }}
                  animate={{ r: [7, 22], opacity: [0.85, 0] }}
                  transition={{ repeat: Infinity, duration: 3.2, ease: 'easeOut' }}
                />

                <circle
                  cx={SURAT_COORDS.x}
                  cy={SURAT_COORDS.y}
                  r="6.5"
                  fill="#E86351"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  className="shadow-lg"
                />
                <circle cx={SURAT_COORDS.x} cy={SURAT_COORDS.y} r="2" fill="#FFFFFF" />

                {/* Surat Label */}
                <g transform={`translate(${SURAT_COORDS.x}, ${SURAT_COORDS.y + 16})`}>
                  <rect
                    x="-42"
                    y="-1"
                    width="84"
                    height="14"
                    rx="7"
                    fill="#2D2B2D"
                    className="shadow-md"
                  />
                  <text
                    x="0"
                    y="9.5"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="7.5"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                  >
                    ★ SURAT (STV)
                  </text>
                </g>
              </g>

            </svg>
          </div>

          {/* =========================================================================
              ACTIVE ROUTE PREVIEW CARD (Connected Flight HUD)
             ========================================================================= */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedRoute.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              
              {/* Left: Thumbnail & Route Badges */}
              <div className="md:col-span-5 flex items-center gap-4">
                <div className="w-24 sm:w-28 h-20 sm:h-24 rounded-2xl overflow-hidden shrink-0 shadow-md border-2 border-white relative">
                  <img
                    src={selectedRoute.image}
                    alt={selectedRoute.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-1.5 left-2 text-[10px] font-bold text-white uppercase">
                    {selectedRoute.code}
                  </span>
                </div>

                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 text-[10px] font-bold uppercase tracking-wider mb-1 border border-brand-100">
                    {selectedRoute.badge}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold font-serif text-navy-950">
                    {selectedRoute.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">
                    {selectedRoute.tagline}
                  </p>
                </div>
              </div>

              {/* Middle: Flight Specs from Surat */}
              <div className="md:col-span-4 flex items-center justify-around py-3 px-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Origin Hub
                  </span>
                  <span className="font-bold text-slate-800">
                    Surat STV
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-logo-coral" />
                    {selectedRoute.duration}
                  </span>
                  <div className="w-16 h-px bg-slate-300 relative my-1">
                    <Plane className="w-3 h-3 text-brand-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <span className="text-[9px] text-emerald-600 font-bold">Verified Airline</span>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                    Destination
                  </span>
                  <span className="font-bold text-slate-800">
                    {selectedRoute.code}
                  </span>
                </div>
              </div>

              {/* Right: Pricing & 1-Click CTA */}
              <div className="md:col-span-3 flex flex-row md:flex-col items-center md:items-end justify-between gap-3">
                <div className="text-left md:text-right">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-brand-600 block">
                    Tailored Luxury Tour
                  </span>
                  <div className="text-lg sm:text-xl font-black text-navy-950 font-serif">
                    Discuss on Call
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/packages/${selectedRoute.slug}`}
                    className="px-4 py-2.5 rounded-full bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>View Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-md hover:scale-105 transition-all cursor-pointer"
                    title="Enquire on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>

    </section>
  );
}
