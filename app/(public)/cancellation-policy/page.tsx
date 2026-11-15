import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Calendar, ArrowLeft, ArrowRight, Clock, AlertTriangle } from 'lucide-react';

export default function CancellationPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-14 rounded-3xl border border-slate-200/90 shadow-lg text-slate-700 text-sm leading-relaxed space-y-8">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Customer Protection &amp; Clarity</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-navy-950">
            Cancellation &amp; Refund Policy
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            The TraveloPedia Surat • Transparent, Fair &amp; Clear Cancellation Guidelines
          </p>
        </div>

        {/* Cancellation Slabs Table */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-navy-950 font-serif">
            1. Standard Package Cancellation Slabs
          </h2>
          <p>
            In the event that you need to cancel your booked holiday itinerary, notice of cancellation must be communicated in writing via official email or WhatsApp from the registered traveler. Cancellation fees are calculated based on the date of receipt of written intimation:
          </p>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="p-3.5 sm:p-4">Notice Period Prior to Departure</th>
                  <th className="p-3.5 sm:p-4">Cancellation Retention Fee</th>
                  <th className="p-3.5 sm:p-4">Refund Percentage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">31 days or more</td>
                  <td className="p-3.5 sm:p-4 text-emerald-700 font-bold">15% of Package Cost + Non-Refundable Flights/Hotels</td>
                  <td className="p-3.5 sm:p-4 text-slate-800 font-bold">Up to 85% Refundable</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">16 to 30 days</td>
                  <td className="p-3.5 sm:p-4 text-amber-700 font-bold">35% of Total Tour Package Value</td>
                  <td className="p-3.5 sm:p-4 text-slate-800 font-bold">Up to 65% Refundable</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">8 to 15 days</td>
                  <td className="p-3.5 sm:p-4 text-orange-700 font-bold">60% of Total Tour Package Value</td>
                  <td className="p-3.5 sm:p-4 text-slate-800 font-bold">Up to 40% Refundable</td>
                </tr>
                <tr className="hover:bg-slate-50 bg-red-50/40">
                  <td className="p-3.5 sm:p-4 font-semibold text-red-900">0 to 7 days or No-Show</td>
                  <td className="p-3.5 sm:p-4 text-red-700 font-bold">100% of Package Cost</td>
                  <td className="p-3.5 sm:p-4 text-red-600 font-bold">Non-Refundable</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Peak Season Special Clauses */}
        <section className="space-y-3 p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Peak Holiday Seasons (Diwali, Christmas, New Year &amp; Long Weekends)</span>
          </div>
          <p className="text-xs leading-relaxed">
            During high-demand peak holiday dates (e.g. Diwali vacations, Christmas / New Year, Swiss glacier high season, Kashmir snow festival), hotels and airlines enforce 100% non-refundable booking conditions. In such cases, 100% of the hotel and ticket component remains non-refundable irrespective of the cancellation timeframe.
          </p>
        </section>

        {/* Flight & Visa Specifics */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy-950 font-serif">
            2. Flights, Cruise &amp; Visa Fees
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li><strong>Flight Cancellations:</strong> Air tickets are issued under airline-specific cancellation policies. Most promotional or group tickets are strictly non-refundable or carry hefty airline change penalties.</li>
            <li><strong>Visa Processing Charges:</strong> Government embassy visa fees and VFS appointment charges are strictly non-refundable once the file is submitted, regardless of visa approval or denial.</li>
            <li><strong>Houseboats &amp; Private Speedboats:</strong> Private charters (e.g. Dal Lake houseboats, Bali speedboats, Catamaran charters) are non-refundable within 14 days of departure.</li>
          </ul>
        </section>

        {/* Refund Processing Timeline */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy-950 font-serif">
            3. Refund Timelines &amp; Mode of Payment
          </h2>
          <p>
            Once a cancellation request is accepted, refunds are reconciled with overseas destination partners, airlines, and accommodation providers.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-3">
            <Clock className="w-5 h-5 text-brand-500 shrink-0" />
            <span>
              Eligible refunds will be directly transferred via NEFT/RTGS to the original traveler&apos;s bank account within <strong>7 to 10 working days</strong> following supplier settlement.
            </span>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold">
          <Link href="/terms" className="text-brand-600 hover:text-brand-700 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View Terms &amp; Conditions</span>
          </Link>
          <Link href="/contact" className="text-slate-500 hover:text-navy-950 flex items-center gap-1">
            <span>Contact Surat Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
