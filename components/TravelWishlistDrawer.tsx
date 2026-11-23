'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, X, ArrowRight, Share2, Trash2 } from 'lucide-react';
import { INITIAL_PACKAGES } from '@/data/seed-data';
import { getWhatsAppInquiryUrl } from '@/lib/utils';

const STORAGE_KEY = 'travelopedia_wishlist';

export default function TravelWishlistDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);

  const syncWishlist = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      setSavedSlugs(Array.isArray(saved) ? saved : []);
    } catch {
      setSavedSlugs([]);
    }
  };

  useEffect(() => {
    syncWishlist();
    const handleOpen = () => setIsOpen(true);
    const handleUpdate = () => syncWishlist();
    window.addEventListener('open-travel-wishlist', handleOpen);
    window.addEventListener('travel-wishlist-updated', handleUpdate);
    return () => {
      window.removeEventListener('open-travel-wishlist', handleOpen);
      window.removeEventListener('travel-wishlist-updated', handleUpdate);
    };
  }, []);

  const removeItem = (slug: string) => {
    const next = savedSlugs.filter(item => item !== slug);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setSavedSlugs(next);
    window.dispatchEvent(new CustomEvent('travel-wishlist-updated'));
  };

  const clearWishlist = () => {
    localStorage.setItem(STORAGE_KEY, '[]');
    setSavedSlugs([]);
    window.dispatchEvent(new CustomEvent('travel-wishlist-updated'));
  };

  const savedPackages = INITIAL_PACKAGES.filter(pkg => savedSlugs.includes(pkg.slug));

  return (
    <>
      {savedSlugs.length > 0 && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed left-3 bottom-24 lg:bottom-6 z-40 h-12 px-3.5 rounded-full bg-white border border-slate-200 text-navy-950 shadow-xl flex items-center gap-2"
          aria-label={`Open saved trips (${savedSlugs.length})`}
        >
          <Heart className="w-4 h-4 fill-brand-500 text-brand-500" />
          <span className="text-xs font-bold">{savedSlugs.length}</span>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex justify-end bg-navy-950/60 backdrop-blur-sm">
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
            >
              <div className="p-5 sm:p-6 bg-navy-950 text-white flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-300">My shortlist</p>
                  <h2 className="mt-1 font-serif text-xl font-bold">Saved trips</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
                  aria-label="Close saved trips"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
                {savedPackages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center px-8">
                    <Heart className="w-10 h-10 text-slate-300" />
                    <h3 className="mt-4 font-bold text-navy-950">No saved trips yet</h3>
                    <p className="mt-1 text-xs text-slate-500">Tap the heart on a package to create your shortlist.</p>
                  </div>
                ) : (
                  savedPackages.map(pkg => (
                    <article key={pkg.id} className="border border-slate-200 rounded-2xl p-3 flex gap-3">
                      <img src={pkg.heroImage} alt={pkg.title} className="w-24 h-24 rounded-xl object-cover" />
                      <div className="min-w-0 flex-1">
                        <Link href={`/packages/${pkg.slug}`} onClick={() => setIsOpen(false)}>
                          <h3 className="text-sm font-bold text-navy-950 line-clamp-2 hover:text-brand-600">{pkg.title}</h3>
                        </Link>
                        <p className="mt-1 text-[11px] text-slate-500">{pkg.durationNights}N / {pkg.durationDays}D · {pkg.destination}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <a
                            href={getWhatsAppInquiryUrl(pkg.title, `${pkg.durationNights}N / ${pkg.durationDays}D`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-emerald-50 text-emerald-700"
                            aria-label={`Share ${pkg.title} on WhatsApp`}
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </a>
                          <button
                            type="button"
                            onClick={() => removeItem(pkg.slug)}
                            className="p-2 rounded-lg bg-slate-100 text-slate-500"
                            aria-label={`Remove ${pkg.title}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                          <Link
                            href={`/packages/${pkg.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="ml-auto p-2 rounded-lg bg-navy-950 text-white"
                            aria-label={`View ${pkg.title}`}
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))
                )}
              </div>

              {savedPackages.length > 0 && (
                <div className="p-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={clearWishlist}
                    className="w-full py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600"
                  >
                    Clear all saved trips
                  </button>
                </div>
              )}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
