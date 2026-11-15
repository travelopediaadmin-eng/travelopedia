'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, Globe, Sparkles } from 'lucide-react';
import PackageCard from '@/components/PackageCard';
import QuickEnquiryModal from '@/components/QuickEnquiryModal';
import { INITIAL_PACKAGES } from '@/data/seed-data';
import { TravelPackage } from '@/types/travel';

export default function InternationalPage() {
  const [packages, setPackages] = useState<TravelPackage[]>(
    INITIAL_PACKAGES.filter(p => p.category === 'international')
  );
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedPkg, setSelectedPkg] = useState<TravelPackage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/packages')
      .then(res => res.json())
      .then(data => {
        if (data.packages && data.packages.length > 0) {
          setPackages(data.packages.filter((p: TravelPackage) => p.category === 'international'));
        }
      })
      .catch(() => {});
  }, []);

  const regions = ['All', 'Middle East', 'Southeast Asia', 'Europe'];

  const filtered = selectedRegion === 'All'
    ? packages
    : packages.filter(p => p.subcategory === selectedRegion);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-navy-950 text-white p-8 sm:p-14 mb-12 shadow-2xl">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80')` }}
          />
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Globe className="w-3.5 h-3.5" />
              <span>Global Luxury Journeys</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
              International Tour Packages
            </h1>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore the futuristic skylines of Dubai, lush private pool villas of Bali, the snow-capped Swiss Alps, and the romantic canals of Europe. Vetted 4★ and 5★ hotels with pure vegetarian &amp; Jain meal assistance.
            </p>
          </div>
        </div>

        {/* Region Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2">
            {regions.map((reg) => (
              <button
                key={reg}
                onClick={() => setSelectedRegion(reg)}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  selectedRegion === reg
                    ? 'bg-navy-950 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {reg === 'All' ? 'All International' : reg}
              </button>
            ))}
          </div>

          <span className="text-xs font-semibold text-slate-500">
            Showing {filtered.length} Curated Tour{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(pkg => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              onQuickInquire={(p) => {
                setSelectedPkg(p);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>

        {/* Tailor-Made CTA */}
        <div className="mt-16 p-8 rounded-3xl bg-white border border-slate-200 text-center max-w-2xl mx-auto shadow-sm">
          <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-2" />
          <h3 className="text-xl font-bold font-serif text-navy-950">Want a Different Country or Extended Route?</h3>
          <p className="text-xs text-slate-500 mt-1">
            We curate bespoke journeys to Singapore, Thailand, Japan, Maldives, USA, UK, and Scandinavia.
          </p>
          <Link
            href="/custom-tour"
            className="mt-4 inline-block px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md"
          >
            Request Custom International Route
          </Link>
        </div>

      </div>

      <QuickEnquiryModal
        pkg={selectedPkg}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
