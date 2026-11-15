import React from 'react';
import Link from 'next/link';
import { 
  Compass, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Award, 
  HeartHandshake, 
  Users, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { COMPANY_DETAILS, getGeneralWhatsAppUrl } from '@/lib/utils';

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>About The TraveloPedia</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-navy-950 tracking-tight leading-tight">
            Surat&apos;s Premier Curators of Luxury Travel
          </h1>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Headquartered in Vesu, Surat, we bring world-class bespoke itineraries, handpicked 4★/5★ luxury accommodations, and dedicated personal concierges to discerning Gujarati travelers.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200/80 mb-16">
          <div className="space-y-4">
            <div className="mb-2">
              <img
                src="/logo.png"
                alt="The TraveloPedia"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
            <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block">Our Heritage &amp; Inspiration</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-navy-950">
              Inspired by the Heritage of Cox &amp; Kings, Rooted in Surat
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              When we founded <strong>The TraveloPedia</strong>, we envisioned a travel agency that bridges the gap between mass-market packaged tours and true luxury travel. Drawing deep inspiration from the legendary service culture of heritage icons like Cox &amp; Kings, we craft journeys where every detail is tailored.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              We understand the nuances of Gujarati travelers: the desire for premium private transport, clean and luxurious stays, flexible pacing, and the assurance of authentic vegetarian and Jain dining options wherever you land.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-2xl font-black font-serif text-navy-950 block">10,000+</span>
                <span className="text-xs text-slate-500 font-medium">Happy Travelers</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-2xl font-black font-serif text-brand-600 block">4.9 / 5★</span>
                <span className="text-xs text-slate-500 font-medium">Google Rating</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80"
              alt="The TraveloPedia Experience"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
              <p className="font-serif font-bold text-base text-amber-300">The TraveloPedia Head Office</p>
              <p className="text-slate-300">7, E-Space, VIP Road, Vesu, Beside Domino&apos;s Pizza, Surat</p>
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm text-center">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mx-auto mb-4">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold font-serif text-navy-950 mb-2">No Cookie-Cutter Itineraries</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every itinerary is built from scratch. You choose the departure flight, villa upgrades, private vehicle size, and pacing.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-4">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold font-serif text-navy-950 mb-2">Face-to-Face Consultation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No endless automated call centers. Sit down directly with our senior destination designers in our VIP Road Vesu office.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold font-serif text-navy-950 mb-2">100% Transparent Pricing</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Zero hidden resort surcharges, surprise visa costs, or forced shopping stops. What we quote is what you pay.
            </p>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h3 className="text-2xl font-bold font-serif">Visit Us at Our Surat Head Office</h3>
            <p className="text-xs text-slate-300 mt-1 max-w-lg">
              {COMPANY_DETAILS.address} • Call: {COMPANY_DETAILS.phone}
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition-colors"
            >
              Contact Office
            </Link>

            <a
              href={getGeneralWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
