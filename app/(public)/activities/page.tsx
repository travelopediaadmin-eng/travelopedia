'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  Search, 
  Ticket, 
  Calendar, 
  Users 
} from 'lucide-react';
import { SAMPLE_ACTIVITIES } from '@/data/travel-services-data';
import { ActivityTour } from '@/types/travel';
import { useCurrency } from '@/context/CurrencyContext';

export default function ActivitiesPage() {
  const { formatPrice } = useCurrency();

  const [selectedDestination, setSelectedDestination] = useState('All');
  const [selectedActivity, setSelectedActivity] = useState<ActivityTour | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [travelerName, setTravelerName] = useState('');
  const [travelerPhone, setTravelerPhone] = useState('');
  const [slotDate, setSlotDate] = useState('2026-12-12');
  const [slotTime, setSlotTime] = useState('Morning Slot (09:30 AM)');
  const [paxCount, setPaxCount] = useState(2);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [activityRef, setActivityRef] = useState('');

  const filteredActivities = SAMPLE_ACTIVITIES.filter((a) => {
    if (selectedDestination !== 'All' && !a.destination.includes(selectedDestination)) return false;
    return true;
  });

  const handleBookActivity = (act: ActivityTour) => {
    setSelectedActivity(act);
    setIsModalOpen(true);
    setBookingConfirmed(false);
  };

  const handleConfirmActivity = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `TRV-ACT-${Math.floor(1000 + Math.random() * 9000)}`;
    setActivityRef(ref);
    setBookingConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Tours &amp; Activities</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-navy-900 mb-8">
          <span className="text-xs uppercase font-bold text-amber-400 tracking-widest block mb-1">
            Curated Local Experiences &amp; Priority Admissions
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-6">
            Things to Do, Cruises &amp; Guided Day Tours
          </h1>

          {/* Quick Destination Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Santorini', 'Dubai', 'Gulmarg'].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setSelectedDestination(d)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  selectedDestination === d
                    ? 'bg-brand-500 text-white shadow'
                    : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/20'
                }`}
              >
                {d === 'All' ? 'All Experiences' : d}
              </button>
            ))}
          </div>
        </div>

        {/* Activity Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredActivities.map((act) => (
            <div
              key={act.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-52 relative overflow-hidden">
                  <img
                    src={act.image}
                    alt={act.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{act.rating}</span>
                    <span className="text-slate-300">({act.reviewsCount})</span>
                  </span>

                  {act.skipTheLine && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-brand-500 text-white text-[10px] font-bold uppercase tracking-wider">
                      Skip The Line
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-brand-600 font-semibold mb-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{act.destination}, {act.country}</span>
                    <span>•</span>
                    <Clock className="w-3.5 h-3.5 ml-1" />
                    <span>{act.duration}</span>
                  </div>

                  <h3 className="text-lg font-bold font-serif text-slate-900 mb-3">
                    {act.title}
                  </h3>

                  <div className="space-y-1.5 mb-5">
                    {act.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <span className="text-brand-500 font-bold shrink-0">•</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-500">
                    <span className="bg-slate-100 px-2 py-0.5 rounded-lg">Guides: {act.guideLanguages.join(', ')}</span>
                    {act.includesPickUp && (
                      <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-lg font-semibold">
                        ✓ Hotel Pickup Included
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">From</span>
                  <span className="text-2xl font-black font-serif text-navy-950">
                    {formatPrice(act.price)}
                  </span>
                  <span className="text-[10px] text-slate-400 block">per person</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleBookActivity(act)}
                  className="px-6 py-2.5 rounded-full bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  Book Activity
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Activity Booking Modal */}
      {isModalOpen && selectedActivity && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200">
            
            {!bookingConfirmed ? (
              <form onSubmit={handleConfirmActivity}>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-serif">Book Experience</h3>
                    <p className="text-xs text-slate-500">{selectedActivity.title}</p>
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
                    <label className="text-xs font-bold text-slate-700 block mb-1">Lead Guest Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ketan Vashi"
                      value={travelerName}
                      onChange={(e) => setTravelerName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Date</label>
                      <input
                        type="date"
                        value={slotDate}
                        onChange={(e) => setSlotDate(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-500 cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Travellers</label>
                      <input
                        type="number"
                        min={1}
                        max={10}
                        value={paxCount}
                        onChange={(e) => setPaxCount(parseInt(e.target.value) || 1)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Time Slot</label>
                    <select
                      value={slotTime}
                      onChange={(e) => setSlotTime(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-500 bg-white"
                    >
                      <option>Morning Slot (09:30 AM)</option>
                      <option>Sunset Slot (03:30 PM - High Demand)</option>
                      <option>Full Day Expedited Slot</option>
                    </select>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                    <div>
                      <span className="text-slate-500 block">Total Payable ({paxCount} Guests):</span>
                      <span className="font-bold text-lg text-navy-950 font-serif">
                        {formatPrice(selectedActivity.price * paxCount)}
                      </span>
                    </div>
                    <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-1 rounded-full text-[11px]">
                      Instant E-Voucher
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
                    Confirm Experience
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-1">Activity Confirmed!</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Your tickets for {selectedActivity.title} are confirmed for {slotDate}.
                </p>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs mb-6 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Activity Voucher:</span>
                    <span className="font-mono font-bold text-brand-600">{activityRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Guest Name:</span>
                    <span className="font-semibold text-slate-800">{travelerName} ({paxCount} Pax)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Slot:</span>
                    <span className="font-semibold text-slate-800">{slotTime}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <Link
                    href={`/portal?ref=${activityRef}`}
                    className="w-full py-3 rounded-full bg-navy-950 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Ticket className="w-4 h-4" />
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
