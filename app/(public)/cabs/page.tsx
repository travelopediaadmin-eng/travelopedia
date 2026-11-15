'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Car, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Luggage, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  FileText, 
  PhoneCall, 
  Sparkles 
} from 'lucide-react';
import { SAMPLE_CABS } from '@/data/travel-services-data';
import { CabOption } from '@/types/travel';
import { useCurrency } from '@/context/CurrencyContext';

export default function CabsPage() {
  const { formatPrice } = useCurrency();

  const [serviceType, setServiceType] = useState<'airport' | 'outstation' | 'hourly'>('airport');
  const [pickupLocation, setPickupLocation] = useState('7, E-Space, VIP Road, Vesu, Surat');
  const [dropLocation, setDropLocation] = useState('Mumbai Chhatrapati Shivaji Airport (BOM) Terminal 2');
  const [pickupDate, setPickupDate] = useState('2026-12-10');
  const [pickupTime, setPickupTime] = useState('05:30 AM');

  // Booking Modal
  const [selectedCab, setSelectedCab] = useState<CabOption | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [travelerName, setTravelerName] = useState('');
  const [travelerPhone, setTravelerPhone] = useState('');
  const [flightPnr, setFlightPnr] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [cabRef, setCabRef] = useState('');

  const handleBookCab = (cab: CabOption) => {
    setSelectedCab(cab);
    setIsModalOpen(true);
    setBookingConfirmed(false);
  };

  const handleConfirmCab = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `TRV-CAB-${Math.floor(1000 + Math.random() * 9000)}`;
    setCabRef(ref);
    setBookingConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Airport Cabs &amp; Chauffeur Transfers</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-navy-900 mb-8">
          <span className="text-xs uppercase font-bold text-amber-400 tracking-widest block mb-1">
            VIP Chauffeur Services • Sanitized &amp; GPS Tracked
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-6">
            Private Airport &amp; Outstation Car Hire
          </h1>

          {/* Service Mode Tabs */}
          <div className="flex items-center gap-2 bg-white/10 rounded-full p-1 text-xs font-bold w-fit mb-6">
            {[
              { id: 'airport' as const, label: 'Airport Transfers' },
              { id: 'outstation' as const, label: 'Outstation One-Way / Return' },
              { id: 'hourly' as const, label: 'Hourly Local Rental (8h/80km)' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setServiceType(tab.id)}
                className={`px-4 py-2 rounded-full transition-all ${
                  serviceType === tab.id ? 'bg-brand-500 text-white shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
            <div className="bg-black/30 p-3 rounded-xl md:col-span-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Pickup Location</span>
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-white focus:outline-none"
              />
            </div>

            <div className="bg-black/30 p-3 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Destination / Airport</span>
              <input
                type="text"
                value={dropLocation}
                onChange={(e) => setDropLocation(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-white focus:outline-none"
              />
            </div>

            <div className="bg-black/30 p-3 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Date &amp; Time</span>
                <span className="text-xs font-bold text-white">{pickupDate} • {pickupTime}</span>
              </div>
              <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-[11px] font-bold">
                Live Pricing
              </span>
            </div>
          </div>
        </div>

        {/* Vehicle Options Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {SAMPLE_CABS.map((cab) => (
            <div
              key={cab.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={cab.image}
                    alt={cab.vehicleName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-navy-950/80 backdrop-blur-md text-white text-xs font-bold">
                    {cab.category}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 font-serif mb-2">
                    {cab.vehicleName}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {cab.idealFor}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-4 bg-slate-50 p-3 rounded-2xl">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Users className="w-4 h-4 text-brand-500" />
                      <span>Up to {cab.passengerCapacity} Pax</span>
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Luggage className="w-4 h-4 text-amber-500" />
                      <span>{cab.luggageCapacity} Bags Max</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                      ✓ Tolls Included
                    </span>
                    <span className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                      ✓ Driver Allowance
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 space-y-1">
                    <p>• Includes {cab.includedKms} Kms standard routing</p>
                    <p>• Extra Kms charged at ₹{cab.perExtraKm}/km only</p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Fixed Fare</span>
                  <span className="text-2xl font-black font-serif text-navy-950">
                    {formatPrice(cab.baseFare)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleBookCab(cab)}
                  className="px-6 py-2.5 rounded-full bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  Book Cab
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Seal */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base text-slate-900">Direct Surat VIP Road Dispatch</h4>
              <p className="text-xs text-slate-500">
                Commercial white-plate vehicles, verified drivers, and guaranteed on-time airport connection with flight tracking.
              </p>
            </div>
          </div>
          <a
            href="tel:+919512935701"
            className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shrink-0 transition-colors"
          >
            <PhoneCall className="w-4 h-4 text-brand-500" />
            <span>Emergency Cab Line: +91 95129 35701</span>
          </a>
        </div>

      </div>

      {/* Cab Booking Modal */}
      {isModalOpen && selectedCab && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200">
            
            {!bookingConfirmed ? (
              <form onSubmit={handleConfirmCab}>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-serif">Confirm Chauffeur Booking</h3>
                    <p className="text-xs text-slate-500">{selectedCab.vehicleName} ({selectedCab.category})</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Lead Passenger Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ketan Vashi"
                      value={travelerName}
                      onChange={(e) => setTravelerName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">WhatsApp / Contact Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98251 XXXXX"
                      value={travelerPhone}
                      onChange={(e) => setTravelerPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Flight Number / PNR (for terminal pickup sync)</label>
                    <input
                      type="text"
                      placeholder="e.g. EK-505 or 6E-7241"
                      value={flightPnr}
                      onChange={(e) => setFlightPnr(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                    <div>
                      <span className="text-slate-500 block">Total Fixed Fare:</span>
                      <span className="font-bold text-lg text-navy-950 font-serif">{formatPrice(selectedCab.baseFare)}</span>
                    </div>
                    <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-1 rounded-full text-[11px]">
                      Tolls &amp; State Tax Included
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 rounded-full border border-slate-300 text-slate-700 font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg"
                  >
                    Confirm Chauffeur
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-1">Chauffeur Booking Confirmed!</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Driver details and vehicle registration will be sent to {travelerPhone}.
                </p>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs mb-6 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cab Reference:</span>
                    <span className="font-mono font-bold text-brand-600">{cabRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Pickup:</span>
                    <span className="font-semibold text-slate-800">{pickupLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Vehicle:</span>
                    <span className="font-semibold text-slate-800">{selectedCab.vehicleName}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <Link
                    href={`/portal?ref=${cabRef}`}
                    className="w-full py-3 rounded-full bg-navy-950 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Voucher in Portal &rarr;</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-xs text-slate-500 hover:text-slate-700 py-1"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
