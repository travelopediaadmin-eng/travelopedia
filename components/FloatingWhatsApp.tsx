'use client';

import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { COMPANY_DETAILS, getGeneralWhatsAppUrl } from '@/lib/utils';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 group">
      {/* Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-navy-900 text-white text-xs px-3.5 py-2.5 rounded-2xl shadow-xl border border-navy-800 animate-bounce duration-1000">
          <div>
            <p className="font-bold text-amber-400">Need help planning?</p>
            <p className="text-slate-300">Chat with Surat Travel Desk</p>
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault();
              setShowTooltip(false);
            }} 
            className="p-1 hover:text-slate-400"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getGeneralWhatsAppUrl("Hello The TraveloPedia, I am looking to plan a holiday. Please connect me with your travel consultant.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with The TraveloPedia on WhatsApp"
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-emerald-400/30"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
}
