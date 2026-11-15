import React from 'react';
import Link from 'next/link';
import { Compass, Home, MessageCircle, ArrowRight, MapPin } from 'lucide-react';
import { COMPANY_DETAILS, getGeneralWhatsAppUrl } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200/90 shadow-xl space-y-6">
        
        {/* Animated Compass Icon */}
        <div className="w-20 h-20 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto shadow-inner">
          <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '20s' }} />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 block mb-2">
            Error 404 &bull; Off the Beaten Path
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-navy-950">
            Destination Not Found
          </h1>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            It looks like this itinerary or page has been moved or doesn&apos;t exist. Let our Surat travel concierges guide you back to your journey.
          </p>
        </div>

        {/* Quick Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
          <Link
            href="/international"
            className="p-4 rounded-2xl bg-slate-50 hover:bg-brand-50/50 border border-slate-200 hover:border-brand-300 transition-all group"
          >
            <span className="text-xs font-bold text-navy-950 block group-hover:text-brand-600">
              International Tours &rarr;
            </span>
            <span className="text-[11px] text-slate-500">
              Greece, Dubai, Switzerland, Bali, Vietnam
            </span>
          </Link>

          <Link
            href="/domestic"
            className="p-4 rounded-2xl bg-slate-50 hover:bg-brand-50/50 border border-slate-200 hover:border-brand-300 transition-all group"
          >
            <span className="text-xs font-bold text-navy-950 block group-hover:text-brand-600">
              Domestic Wonders &rarr;
            </span>
            <span className="text-[11px] text-slate-500">
              Kashmir, Rajasthan, Kerala, Himachal
            </span>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 py-3 px-5 rounded-xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <a
            href={getGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <p className="text-[11px] text-slate-400">
          The TraveloPedia &bull; VIP Road, Vesu, Surat &bull; Call: {COMPANY_DETAILS.phone}
        </p>
      </div>
    </div>
  );
}
