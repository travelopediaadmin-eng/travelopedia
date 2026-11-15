import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-[65vh] flex flex-col items-center justify-center p-6 bg-slate-50/50">
      <div className="flex flex-col items-center gap-4">
        {/* Dual luxury pulsing spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-brand-200 animate-ping opacity-30" />
          <div className="w-12 h-12 rounded-full border-4 border-brand-500 border-t-transparent animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-xs font-bold tracking-widest text-navy-950 uppercase font-sans">
            The TraveloPedia
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Preparing your travel experience...
          </p>
        </div>
      </div>
    </div>
  );
}
