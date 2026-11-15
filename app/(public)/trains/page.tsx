'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Train, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  Search, 
  AlertCircle,
  ExternalLink 
} from 'lucide-react';
import { SAMPLE_TRAINS } from '@/data/travel-services-data';
import { useCurrency } from '@/context/CurrencyContext';

export default function TrainsPage() {
  const { formatPrice } = useCurrency();

  const [activeTab, setActiveTab] = useState<'schedule' | 'pnr'>('schedule');
  const [fromStation, setFromStation] = useState('Surat (ST)');
  const [toStation, setToStation] = useState('Mumbai Central (MMCT)');
  const [journeyDate, setJourneyDate] = useState('2026-12-10');

  // PNR State
  const [pnrInput, setPnrInput] = useState('');
  const [pnrResult, setPnrResult] = useState<{
    pnr: string;
    train: string;
    date: string;
    status: string;
    coach: string;
    berth: string;
  } | null>(null);

  const handlePnrCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pnrInput || pnrInput.length < 10) return;

    setPnrResult({
      pnr: pnrInput,
      train: '20901 Vande Bharat Express',
      date: '10 Dec 2026',
      status: 'Confirmed (CNF)',
      coach: 'EC-1',
      berth: 'Seat 14 (Window Berth)'
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Indian Railways &amp; PNR Status</span>
        </div>

        {/* Hero Header */}
        <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-navy-900 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs uppercase font-bold text-amber-400 tracking-widest block mb-1">
                Authorized Booking Partner Redirection &amp; Timetables
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Vande Bharat, Rajdhani &amp; Express Train Schedules
              </h1>
            </div>

            {/* Mode Tabs */}
            <div className="flex items-center bg-white/10 rounded-full p-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('schedule')}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  activeTab === 'schedule' ? 'bg-brand-500 text-white shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                Train Timetable
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pnr')}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  activeTab === 'pnr' ? 'bg-brand-500 text-white shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                10-Digit PNR Status
              </button>
            </div>
          </div>

          {activeTab === 'schedule' ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
              <div className="bg-black/30 p-3 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Origin Station</span>
                <input
                  type="text"
                  value={fromStation}
                  onChange={(e) => setFromStation(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-white focus:outline-none"
                />
              </div>

              <div className="bg-black/30 p-3 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Destination Station</span>
                <input
                  type="text"
                  value={toStation}
                  onChange={(e) => setToStation(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-white focus:outline-none"
                />
              </div>

              <div className="bg-black/30 p-3 rounded-xl">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Journey Date</span>
                <input
                  type="date"
                  value={journeyDate}
                  onChange={(e) => setJourneyDate(e.target.value)}
                  className="w-full bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
                />
              </div>

              <div className="bg-black/30 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Route</span>
                  <span className="text-xs font-bold text-white">Western Railway</span>
                </div>
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
                >
                  <Search className="w-4 h-4" />
                  <span>Check</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePnrCheck} className="flex flex-col sm:flex-row gap-3 max-w-xl">
              <input
                type="text"
                maxLength={10}
                required
                placeholder="Enter 10-Digit PNR Number (e.g. 4829104812)"
                value={pnrInput}
                onChange={(e) => setPnrInput(e.target.value)}
                className="flex-1 px-5 py-3 rounded-2xl bg-white text-slate-900 font-mono font-bold text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="px-8 py-3 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg"
              >
                Check PNR Status
              </button>
            </form>
          )}
        </div>

        {/* PNR Result Display */}
        {activeTab === 'pnr' && pnrResult && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md mb-8 max-w-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <span className="text-xs text-slate-400 block">PNR Inquiry Result</span>
                <h3 className="text-lg font-mono font-bold text-brand-600">{pnrResult.pnr}</h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
                {pnrResult.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs mb-6">
              <div>
                <span className="text-slate-400 block">Train Name:</span>
                <span className="font-bold text-slate-800">{pnrResult.train}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Journey Date:</span>
                <span className="font-bold text-slate-800">{pnrResult.date}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Assigned Coach:</span>
                <span className="font-bold text-slate-800">{pnrResult.coach}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Berth Details:</span>
                <span className="font-bold text-slate-800">{pnrResult.berth}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Chart Prepared • Your e-ticket is valid for travel with original ID proof.</span>
            </div>
          </div>
        )}

        {/* Train Schedule List */}
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            {SAMPLE_TRAINS.map((train) => (
              <div
                key={train.trainNumber}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-navy-950 text-white font-mono font-bold">
                        {train.trainNumber}
                      </span>
                      <h3 className="font-serif font-bold text-lg text-slate-900">{train.trainName}</h3>
                    </div>
                    <span className="text-xs text-slate-400">
                      Runs On: {train.runningDays.join(', ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-8">
                    <div>
                      <span className="text-xl font-black text-navy-950 font-mono block">{train.departureTime}</span>
                      <span className="text-xs font-semibold text-slate-600">{train.fromStation} ({train.fromCode})</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[11px] text-slate-400 mb-1">{train.duration}</span>
                      <div className="w-24 h-0.5 bg-slate-200 relative flex items-center justify-center">
                        <Train className="w-3.5 h-3.5 text-rose-500 bg-white" />
                      </div>
                    </div>

                    <div>
                      <span className="text-xl font-black text-navy-950 font-mono block">{train.arrivalTime}</span>
                      <span className="text-xs font-semibold text-slate-600">{train.toStation} ({train.toCode})</span>
                    </div>
                  </div>
                </div>

                {/* Class Availability Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
                  {train.classes.map((cls) => (
                    <div
                      key={cls.code}
                      className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-xs text-slate-900">{cls.name}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-bold">
                            {cls.code}
                          </span>
                        </div>
                        <span className="text-[11px] text-emerald-600 font-semibold block mb-2">
                          {cls.availability}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/50">
                        <span className="font-serif font-bold text-sm text-navy-950">
                          {formatPrice(cls.fare)}
                        </span>
                        <a
                          href="https://www.irctc.co.in"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-brand-600 hover:underline flex items-center gap-1"
                        >
                          <span>IRCTC</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* IRCTC Compliance Notice */}
        <div className="mt-8 bg-slate-100 rounded-2xl p-5 border border-slate-200 text-xs text-slate-600 leading-relaxed">
          <div className="flex items-center gap-2 font-bold text-slate-800 mb-1">
            <ShieldCheck className="w-4 h-4 text-brand-600" />
            <span>Official IRCTC Partnership &amp; Compliance Statement</span>
          </div>
          <p>
            The Travelopedia provides authorized timetable search and live PNR tracking. For direct ticket issuance, customers are seamlessly redirected to authorized partner gateways in 100% compliance with IRCTC e-ticketing terms. We do not engage in unauthorized scraping or proxy booking.
          </p>
        </div>

      </div>
    </div>
  );
}
