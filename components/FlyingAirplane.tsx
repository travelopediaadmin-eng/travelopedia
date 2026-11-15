'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Sparkles, MapPin } from 'lucide-react';

interface FlightRoute {
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  tagline: string;
}

const ROUTES: FlightRoute[] = [
  { from: 'Surat', fromCode: 'STV', to: 'Dubai', toCode: 'DXB', tagline: 'Direct Emirates Connect' },
  { from: 'Surat', fromCode: 'STV', to: 'Zurich (Alps)', toCode: 'ZRH', tagline: 'Swiss Glacier Route' },
  { from: 'Surat', fromCode: 'STV', to: 'Bali', toCode: 'DPS', tagline: 'Island Private Villa' },
  { from: 'Surat', fromCode: 'STV', to: 'Srinagar', toCode: 'SXR', tagline: 'Kashmir Snow Express' },
];

export default function FlyingAirplane() {
  const [routeIdx, setRouteIdx] = useState(0);
  const [flightKey, setFlightKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRouteIdx((prev) => (prev + 1) % ROUTES.length);
      setFlightKey((prev) => prev + 1);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const route = ROUTES[routeIdx];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      
      {/* 1. Animated Contrail Vapor Line across the sky */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 800"
        fill="none"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="contrailGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#BAC4E2" stopOpacity="0" />
            <stop offset="40%" stopColor="#BAC4E2" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#F7B8B0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FACFA6" stopOpacity="1" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <motion.path
          key={`path-${flightKey}`}
          d="M -100,680 C 350,560 700,380 1550,120"
          stroke="url(#contrailGradient)"
          strokeWidth="2.5"
          strokeDasharray="6 6"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: 7, ease: 'easeInOut' }}
        />
      </svg>

      {/* 2. Flying 3D Luxury Passenger Airliner */}
      <motion.div
        key={`airplane-${flightKey}`}
        initial={{ x: '-15vw', y: '70vh', scale: 0.7, rotate: -22, opacity: 0 }}
        animate={{
          x: ['-10vw', '45vw', '110vw'],
          y: ['68vh', '38vh', '10vh'],
          scale: [0.75, 1.05, 0.9],
          rotate: [-24, -22, -18],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 7,
          ease: 'easeInOut',
          times: [0, 0.5, 1]
        }}
        className="absolute left-0 top-0 pointer-events-auto cursor-pointer group"
      >
        {/* Airplane Body Container */}
        <div className="relative flex items-center">
          
          {/* Glowing Jet Engine Contrail Stream */}
          <div className="absolute right-full top-1/2 -translate-y-1/2 w-48 sm:w-72 h-3 bg-gradient-to-l from-white/80 via-logo-lavender/50 to-transparent blur-sm rounded-full pointer-events-none" />
          <div className="absolute right-full top-1/2 -translate-y-1/2 w-28 h-1 bg-white blur-[1px] rounded-full pointer-events-none" />

          {/* SVG Passenger Airliner (White Luxury Jet) */}
          <div className="relative drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] filter group-hover:scale-110 transition-transform">
            <svg
              className="w-24 sm:w-36 h-auto"
              viewBox="0 0 240 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Aircraft Fuselage */}
              <path
                d="M 230,60 C 220,55 180,48 130,48 L 50,48 C 30,48 10,54 0,60 C 10,66 30,72 50,72 L 130,72 C 180,72 220,65 230,60 Z"
                fill="url(#jetBodyGradient)"
              />

              {/* Main Swept Wing (Front) */}
              <path
                d="M 120,65 L 70,115 L 55,115 L 90,65 Z"
                fill="#E2E8F0"
              />

              {/* Main Swept Wing (Top/Far side) */}
              <path
                d="M 120,55 L 75,10 L 60,10 L 90,55 Z"
                fill="#CBD5E1"
              />

              {/* Tail Vertical Stabilizer */}
              <path
                d="M 40,50 L 0,15 L 12,15 L 55,50 Z"
                fill="url(#tailGradient)"
              />

              {/* Horizontal Stabilizer */}
              <path
                d="M 35,62 L 10,80 L 0,80 L 25,62 Z"
                fill="#94A3B8"
              />

              {/* Passenger Windows (Warm Glowing Dots) */}
              {[60, 75, 90, 105, 120, 135, 150, 165, 180].map((wx, i) => (
                <rect
                  key={i}
                  x={wx}
                  y={57}
                  width={6}
                  height={4}
                  rx={1.5}
                  fill="#FEF08A"
                  className="animate-pulse"
                />
              ))}

              {/* Cockpit Windshield */}
              <path
                d="M 205,56 C 200,54 195,54 190,55 L 192,59 C 196,58 200,58 203,59 Z"
                fill="#38BDF8"
              />

              {/* Jet Engine Pod under Wing */}
              <ellipse cx="95" cy="80" rx="16" ry="6" fill="#64748B" />
              <ellipse cx="108" cy="80" rx="4" ry="5" fill="#0284C7" />

              {/* Glowing Jet Thrust */}
              <ellipse cx="80" cy="80" rx="6" ry="4" fill="#F97316" className="animate-ping" />

              {/* Navigation Strobe LEDs */}
              <circle cx="56" cy="114" r="2.5" fill="#EF4444" className="animate-ping" />
              <circle cx="62" cy="11" r="2.5" fill="#22C55E" className="animate-ping" />
              <circle cx="2" cy="16" r="2" fill="#FFFFFF" className="animate-ping" />

              <defs>
                <linearGradient id="jetBodyGradient" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#E2E8F0" />
                  <stop offset="50%" stopColor="#FFFFFF" />
                  <stop offset="90%" stopColor="#F8FAFC" />
                  <stop offset="100%" stopColor="#BAC4E2" />
                </linearGradient>
                <linearGradient id="tailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E86351" />
                  <stop offset="50%" stopColor="#6376BD" />
                  <stop offset="100%" stopColor="#2D2B2D" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Floating Live Flight HUD Pill above plane */}
          <div className="ml-3 sm:ml-4 px-3 sm:px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-xl border border-white/30 text-white shadow-2xl flex items-center gap-2 text-xs font-bold whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-amber-300 font-mono tracking-wider">{route.fromCode}</span>
            <span className="text-slate-400">✈</span>
            <span className="text-white font-mono tracking-wider">{route.toCode}</span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-[11px] text-logo-peach font-normal hidden sm:inline">{route.to}</span>
          </div>

        </div>
      </motion.div>

    </div>
  );
}
