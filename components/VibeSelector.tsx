'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export interface VibeItem {
  id: string;
  label: string;
  emoji: string;
  tagline: string;
  badgeColor: string;
  searchFilter: string;
}

export const VIBES: VibeItem[] = [
  {
    id: 'all',
    label: 'All Vibes',
    emoji: '✨',
    tagline: 'Full luxury collection',
    badgeColor: 'bg-logo-charcoal text-white',
    searchFilter: '',
  },
  {
    id: 'beach-chill',
    label: 'Beach & Floating Villa',
    emoji: '🏖️',
    tagline: 'Bali, Maldives & Tropics',
    badgeColor: 'bg-teal-500 text-white',
    searchFilter: 'Bali',
  },
  {
    id: 'snow-peak',
    label: 'Snow & High Altitude',
    emoji: '❄️',
    tagline: 'Switzerland & Kashmir',
    badgeColor: 'bg-blue-600 text-white',
    searchFilter: 'Switzerland',
  },
  {
    id: 'skyline-luxe',
    label: 'Futuristic Skylines',
    emoji: '🌃',
    tagline: 'Dubai Marina & Night Safari',
    badgeColor: 'bg-logo-coralDeep text-white',
    searchFilter: 'Dubai',
  },
  {
    id: 'honeymoon',
    label: 'Ultra-Romantic Honeymoon',
    emoji: '💍',
    tagline: 'Private Suites & Candlelight',
    badgeColor: 'bg-pink-600 text-white',
    searchFilter: 'Honeymoon',
  },
  {
    id: 'aegean-greece',
    label: 'Aegean & Caldera Romance',
    emoji: '🇬🇷',
    tagline: 'Santorini & Whitewashed Domes',
    badgeColor: 'bg-sky-600 text-white',
    searchFilter: 'Greece',
  },
  {
    id: 'heritage-royal',
    label: 'Royal Forts & Heritage',
    emoji: '👑',
    tagline: 'Rajasthan Palaces & Kerala',
    badgeColor: 'bg-amber-600 text-white',
    searchFilter: 'Rajasthan',
  },
];

export default function VibeSelector({
  activeVibe,
  onSelectVibe,
}: {
  activeVibe: string;
  onSelectVibe: (vibe: VibeItem) => void;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-logo-coralDeep" />
        <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500">
          Filter by 2026 Travel Vibe:
        </span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-3 scrollbar-none">
        {VIBES.map((vibe) => {
          const isActive = activeVibe === vibe.id;
          return (
            <motion.button
              key={vibe.id}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectVibe(vibe)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs font-bold transition-all shrink-0 shadow-sm ${
                isActive
                  ? 'bg-logo-charcoal text-white shadow-xl shadow-logo-charcoal/20 border-2 border-logo-coral'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <span className="text-base">{vibe.emoji}</span>
              <div className="text-left">
                <span className="block leading-none">{vibe.label}</span>
                <span className={`text-[10px] block mt-0.5 font-normal ${isActive ? 'text-logo-peach' : 'text-slate-400'}`}>
                  {vibe.tagline}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
