'use client';

import React, { useState } from 'react';
import { Sparkles, MessageCircle, Phone, X } from 'lucide-react';
import { COMPANY_DETAILS, getGeneralWhatsAppUrl } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingConcierge() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3 select-none">
      
      {/* Quick Interactive Menu Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            id="concierge-menu"
            className="bg-navy-950/95 backdrop-blur-2xl border border-white/20 text-white rounded-3xl p-5 shadow-2xl w-[calc(100vw-2rem)] max-w-72 mb-1"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold text-xs uppercase tracking-wider text-amber-300">
                  Surat Travel Concierge
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Close concierge menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Need immediate assistance or bespoke itinerary planning? Connect with our destination designers right now.
            </p>

            <div className="space-y-2">
              <a
                href={getGeneralWhatsAppUrl("Hi The TraveloPedia, I want to connect with a holiday specialist right now.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                className="w-full py-2.5 px-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-white/15"
              >
                <Phone className="w-3.5 h-3.5 text-brand-400" />
                <span>Call: {COMPANY_DETAILS.phone}</span>
              </a>
            </div>

            <p className="text-[10px] text-slate-400 text-center mt-3">
              Office: 7, E-Space, VIP Road, Vesu, Surat
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Cox & Kings Style Action Pill (Matches "Ask Einaya" from screenshot!) */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="px-3.5 py-2.5 sm:px-5 sm:py-3 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider flex items-center gap-2.5 shadow-2xl shadow-blue-600/40 border border-blue-400/40 ring-4 ring-blue-500/20"
        aria-label="Ask Travelo Concierge"
        aria-expanded={isOpen}
      >
        <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
        <span className="sm:hidden">Ask Travelo</span>
        <span className="hidden sm:inline">Ask Travelo Concierge</span>
      </motion.button>
    </div>
  );
}
