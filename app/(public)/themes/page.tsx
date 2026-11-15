'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles, Users, Crown, Mountain, Ship, ArrowRight } from 'lucide-react';

export default function ThemesPage() {
  const themes = [
    {
      title: 'Honeymoon & Romantic Retreats',
      desc: 'Private pool villas, sunset catamaran cruises, candlelit dinners, and serene landscapes designed for newlyweds.',
      destinations: 'Bali, Maldives, Switzerland, Paris, Kashmir',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      icon: Heart,
      filter: 'Honeymoon'
    },
    {
      title: 'Family & Multi-Gen Vacations',
      desc: 'Comfortable pacing, spacious family suites, theme parks, snow activities, and pure vegetarian / Jain dining options.',
      destinations: 'Dubai, Singapore, Himachal, Disneyland Paris, Kerala',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      icon: Users,
      filter: 'Family'
    },
    {
      title: 'Luxury Expeditions & 5-Star Villas',
      desc: 'Bespoke chauffeur services, private luxury yachts, 5-star palace hotels, and VIP fast-track airport concierge.',
      destinations: 'Switzerland, Dubai, Rajasthan Palaces, Vietnam Cruises',
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
      icon: Crown,
      filter: 'Luxury'
    },
    {
      title: 'Heritage, Culture & Royalty',
      desc: 'Centuries of architecture, living palace havelis, ancient temples, Mughal gardens, and artisan bazaar trails.',
      destinations: 'Udaipur, Jaipur, Jodhpur, Hanoi Old Quarter, Lucerne',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      icon: Mountain,
      filter: 'Heritage'
    },
    {
      title: 'Scenic Nature & Backwaters',
      desc: 'Emerald tea plantations, tranquil houseboats, mist-covered mountain valleys, and natural rainforest waterfalls.',
      destinations: 'Alleppey, Munnar, Kashmir Valley, Ha Long Bay karsts',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
      icon: Ship,
      filter: 'Nature'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Collections</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-navy-950 tracking-tight">
            Explore Holidays by Theme
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Every vacation is unique. Choose your travel passion and let us tailor every minute to perfection.
          </p>
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme, idx) => {
            const Icon = theme.icon;
            return (
              <div 
                key={idx} 
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <img
                    src={theme.image}
                    alt={theme.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center border border-white/20">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold font-serif text-white group-hover:text-amber-300 transition-colors">
                      {theme.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {theme.desc}
                    </p>

                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Top Destinations:
                      </span>
                      <span className="text-xs font-semibold text-brand-600">
                        {theme.destinations}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      href={`/custom-tour?theme=${encodeURIComponent(theme.title)}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-brand-500 hover:text-white text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <span>Plan This Theme</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
