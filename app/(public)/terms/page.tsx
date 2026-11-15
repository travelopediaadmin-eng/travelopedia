import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileText, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { COMPANY_DETAILS } from '@/lib/utils';

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-14 rounded-3xl border border-slate-200/90 shadow-lg text-slate-700 text-sm leading-relaxed space-y-8">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-wider mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>Official Client Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-navy-950">
            Terms &amp; Conditions of Service
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Last Updated: November 2026 | The TraveloPedia (VIP Road, Vesu, Surat, Gujarat)
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy-950 font-serif flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-navy-950 text-white text-xs flex items-center justify-center font-sans">1</span>
            Booking, Advance Token &amp; Payment Schedule
          </h2>
          <p>
            All holiday itineraries, flight reservations, and luxury accommodations arranged by <strong>The TraveloPedia</strong> ({COMPANY_DETAILS.address}) are strictly subject to supplier availability at the moment of reservation.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li><strong>Initial Token Deposit:</strong> A minimum non-refundable booking deposit of 25% to 30% of the total tour cost is required to block flights, hotels, and private transfers.</li>
            <li><strong>Interim Payment:</strong> 50% of the total package value must be cleared at least 25 days prior to the departure date.</li>
            <li><strong>Final Settlement:</strong> The remaining 100% balance must be settled in full prior to the issuance of final hotel vouchers, airline tickets, and private driver details (typically 10-14 days prior to departure).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy-950 font-serif flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-navy-950 text-white text-xs flex items-center justify-center font-sans">2</span>
            Passports, Visa Regulations &amp; Consular Authority
          </h2>
          <p>
            For all international holidays (Dubai, Europe/Schengen, Bali, Vietnam, UK, USA, etc.), the passenger is solely responsible for possessing a passport with at least <strong>6 months of remaining validity</strong> from the date of return and at least 2 blank visa pages.
          </p>
          <p className="text-xs text-slate-600">
            While The TraveloPedia holiday architects provide meticulous document verification, file preparation, appointment booking, and visa advisory, <strong>the grant, rejection, or delay of visas rests 100% with the respective sovereign embassy or consulate</strong>. In the event of visa rejection by consular authorities, standard supplier cancellation charges remain applicable.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy-950 font-serif flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-navy-950 text-white text-xs flex items-center justify-center font-sans">3</span>
            Pure Vegetarian &amp; Jain Dining Arrangements
          </h2>
          <p>
            We take immense pride in catering to Gujarati and Jain dietary preferences. Whenever requested in the booking agreement:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li>Our travel desk pre-notifies overseas hotels, houseboats, cruise kitchens, and local restaurants regarding strict vegetarian / Jain requirements (no onion, garlic, root vegetables).</li>
            <li>In select remote or high-altitude international locations, Indian buffet restaurants or specialized packed meal hampers from certified Indian catering partners will be coordinated.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy-950 font-serif flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-navy-950 text-white text-xs flex items-center justify-center font-sans">4</span>
            Airlines, Flight Schedules &amp; Baggage
          </h2>
          <p>
            Airlines operate under independent terms of carriage. Any schedule adjustments, flight delays, terminal reassignments, or baggage allowances are strictly governed by the operating airline. The TraveloPedia provides round-the-clock desk assistance to coordinate alternative connections or re-scheduling in unforeseen flight disruptions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy-950 font-serif flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-navy-950 text-white text-xs flex items-center justify-center font-sans">5</span>
            Hotel Check-In &amp; Incidental Deposits
          </h2>
          <p>
            Standard international hotel check-in time is generally 2:00 PM - 3:00 PM, and check-out is 11:00 AM - 12:00 PM. Early check-in or late check-out is subject to room availability and hotel discretion. Most 4-star and 5-star properties require a credit card pre-authorization or refundable cash deposit at check-in for personal telephone, mini-bar, or room service incidentals.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy-950 font-serif flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-navy-950 text-white text-xs flex items-center justify-center font-sans">6</span>
            Force Majeure &amp; Surat Jurisdiction
          </h2>
          <p>
            The TraveloPedia shall not be held liable for failure or delays in performing obligations resulting from natural calamities, acts of God, extreme weather (snowstorms, volcanic ash, typhoons), border closures, political strikes, civil unrest, or health advisories.
          </p>
          <p className="text-xs text-slate-500">
            Any dispute, claim, or legal matter arising out of services provided by The TraveloPedia shall be subject exclusively to the legal jurisdiction of the competent courts in <strong>Surat, Gujarat, India</strong>.
          </p>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold">
          <Link href="/cancellation-policy" className="text-brand-600 hover:text-brand-700 flex items-center gap-1">
            <span>Read Cancellation &amp; Refund Policy</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link href="/contact" className="text-slate-500 hover:text-navy-950 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Questions? Visit Surat Desk</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
