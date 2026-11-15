'use client';

import React from 'react';
import { WORLD_MAP_PATH } from '@/data/world-map-path';

export default function WorldMapBackground() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-full object-cover opacity-[0.045] mix-blend-multiply"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Subtle Latitude & Longitude Meridians */}
        <g stroke="#2D2B2D" strokeWidth="0.5" strokeDasharray="3 6" opacity="0.6">
          <line x1="0" y1="250" x2="1000" y2="250" /> {/* Equator */}
          <line x1="0" y1="185" x2="1000" y2="185" /> {/* Tropic of Cancer */}
          <line x1="0" y1="315" x2="1000" y2="315" /> {/* Tropic of Capricorn */}
          <line x1="500" y1="0" x2="500" y2="500" /> {/* Prime Meridian */}
          <line x1="250" y1="0" x2="250" y2="500" />
          <line x1="750" y1="0" x2="750" y2="500" />
        </g>

        {/* Continents Vector Path in Brand Pastel Palette */}
        <path
          d={WORLD_MAP_PATH}
          fill="#BAC4E2"
          stroke="#6376BD"
          strokeWidth="0.8"
        />

        {/* Surat Origin Hub Indicator */}
        <circle cx="702.3" cy="191.2" r="3.5" fill="#E86351" />
        <circle cx="702.3" cy="191.2" r="8" stroke="#E86351" strokeWidth="0.8" strokeDasharray="2 2" />

        {/* Faint Flight Paths across continents */}
        <g stroke="#F7B8B0" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.7">
          {/* Surat to Dubai */}
          <path d="M 702.3,191.2 Q 675,170 653.5,180.0" fill="none" />
          {/* Surat to Zurich */}
          <path d="M 702.3,191.2 Q 600,120 523.7,118.4" fill="none" />
          {/* Surat to Paris */}
          <path d="M 702.3,191.2 Q 580,115 506.5,114.3" fill="none" />
          {/* Surat to Bali */}
          <path d="M 702.3,191.2 Q 770,240 819.7,273.2" fill="none" />
          {/* Surat to Vietnam */}
          <path d="M 702.3,191.2 Q 750,180 794.0,191.6" fill="none" />
          {/* Surat to London */}
          <path d="M 702.3,191.2 Q 570,110 499.6,106.9" fill="none" />
        </g>
      </svg>
    </div>
  );
}
