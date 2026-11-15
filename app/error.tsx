'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home, MessageCircle } from 'lucide-react';
import { COMPANY_DETAILS, getGeneralWhatsAppUrl } from '@/lib/utils';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 text-center border border-slate-200/90 shadow-xl space-y-6">
        
        <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
            Temporary Interruption
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-navy-950">
            Something Went Wrong
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
            We encountered an unexpected issue while loading this travel page. Our system desk has logged this event.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="w-full py-3 px-5 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Reloading Page</span>
          </button>

          <Link
            href="/"
            className="w-full py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>

          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Assistance on WhatsApp ({COMPANY_DETAILS.phone})</span>
          </a>
        </div>
      </div>
    </div>
  );
}
