'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plane, 
  Search, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Filter, 
  ArrowRight, 
  Luggage, 
  Utensils, 
  ChevronRight,
  Ticket,
  AlertCircle
} from 'lucide-react';
import { SAMPLE_FLIGHTS } from '@/data/travel-services-data';
import { FlightTicket } from '@/types/travel';
import { useCurrency } from '@/context/CurrencyContext';
import { useLanguage } from '@/context/LanguageContext';
import { COMPANY_DETAILS } from '@/lib/utils';

export default function FlightsPage() {
  const { formatPrice } = useCurrency();
  const { t } = useLanguage();

  const [fromCity, setFromCity] = useState('Surat / Mumbai (BOM)');
  const [toCity, setToCity] = useState('Dubai (DXB)');
  const [tripType, setTripType] = useState<'One Way' | 'Round Trip'>('Round Trip');
  const [selectedAirlineFilter, setSelectedAirlineFilter] = useState('All');
  const [nonStopOnly, setNonStopOnly] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<FlightTicket | null>(null);

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [passengerName, setPassengerName] = useState('');
  const [passengerEmail, setPassengerEmail] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('');
  const [mealPreference, setMealPreference] = useState('Jain Vegetarian (No Onion / Garlic)');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [generatedRef, setGeneratedRef] = useState('');

  const filteredFlights = SAMPLE_FLIGHTS.filter((f) => {
    if (selectedAirlineFilter !== 'All' && f.airline !== selectedAirlineFilter) return false;
    if (nonStopOnly && f.stops > 0) return false;
    return true;
  });

  const handleBookClick = (flight: FlightTicket) => {
    setSelectedFlight(flight);
    setIsBookingOpen(true);
    setBookingConfirmed(false);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `TRV-FL-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedRef(ref);
    setBookingConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Flights Booking</span>
        </div>

        {/* Flight Search Widget Card */}
        <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-navy-900 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs uppercase font-bold text-amber-400 tracking-widest block mb-1">
                Luxury Airline Desk • Surat &amp; Global Hubs
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Book Domestic &amp; International Flights
              </h1>
            </div>

            {/* Trip Type Tabs */}
            <div className="flex items-center bg-white/10 rounded-full p-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setTripType('Round Trip')}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  tripType === 'Round Trip' ? 'bg-brand-500 text-white shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                Round Trip
              </button>
              <button
                type="button"
                onClick={() => setTripType('One Way')}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  tripType === 'One Way' ? 'bg-brand-500 text-white shadow' : 'text-slate-300 hover:text-white'
                }`}
              >
                One Way
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
            <div className="bg-black/30 p-3 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">From</span>
              <input
                type="text"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-white focus:outline-none"
              />
            </div>

            <div className="bg-black/30 p-3 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">To</span>
              <input
                type="text"
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                className="w-full bg-transparent text-sm font-bold text-white focus:outline-none"
              />
            </div>

            <div className="bg-black/30 p-3 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Departure Date</span>
              <input
                type="date"
                defaultValue="2026-12-10"
                className="w-full bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
              />
            </div>

            <div className="bg-black/30 p-3 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Travellers</span>
                <span className="text-sm font-bold text-white">1 Adult, Economy</span>
              </div>
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-brand-500/30 transition-transform active:scale-95"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <span className="font-bold text-sm text-slate-800 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-brand-500" />
                  Filters
                </span>
                <button
                  onClick={() => { setSelectedAirlineFilter('All'); setNonStopOnly(false); }}
                  className="text-xs text-brand-600 hover:underline font-semibold"
                >
                  Reset
                </button>
              </div>

              {/* Stops Filter */}
              <div className="mb-5">
                <span className="text-xs font-bold text-slate-700 block mb-2.5">Stops</span>
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer mb-2">
                  <input
                    type="checkbox"
                    checked={nonStopOnly}
                    onChange={(e) => setNonStopOnly(e.target.checked)}
                    className="rounded text-brand-600 focus:ring-brand-500"
                  />
                  <span>Non-Stop Flights Only</span>
                </label>
              </div>

              {/* Airline Filter */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-2.5">Airlines</span>
                {['All', 'Emirates', 'Air India', 'Singapore Airlines', 'IndiGo', 'Qatar Airways'].map((al) => (
                  <label key={al} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer mb-2">
                    <input
                      type="radio"
                      name="airline"
                      checked={selectedAirlineFilter === al}
                      onChange={() => setSelectedAirlineFilter(al)}
                      className="text-brand-600 focus:ring-brand-500"
                    />
                    <span>{al}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Surat Jain / Veg Care Notice */}
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-xs text-emerald-800">
              <div className="flex items-center gap-2 font-bold mb-1.5 text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Culinary Guarantee</span>
              </div>
              <p className="leading-relaxed">
                All international flights booked through The Travelopedia include pre-ordered guaranteed Pure Vegetarian / Jain special meals directly on airline PNR.
              </p>
            </div>
          </div>

          {/* Flights Listing */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>Showing <strong>{filteredFlights.length}</strong> verified flights</span>
              <span>Prices include all taxes &amp; supplier fees</span>
            </div>

            {filteredFlights.map((flight) => (
              <div
                key={flight.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Airline & Timing Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-sm text-slate-900">{flight.airline}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-mono">
                        {flight.flightNumber}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 font-semibold">
                        {flight.cabinClass}
                      </span>
                    </div>

                    <div className="flex items-center gap-6 sm:gap-10">
                      <div>
                        <span className="text-xl sm:text-2xl font-black text-navy-950 font-mono block">
                          {flight.departureTime}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 block">{flight.fromCode}</span>
                        <span className="text-[11px] text-slate-400 truncate max-w-[120px] block">{flight.fromCity}</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-[11px] text-slate-400 mb-1">{flight.duration}</span>
                        <div className="w-24 sm:w-32 h-0.5 bg-slate-200 relative flex items-center justify-center">
                          <Plane className="w-3.5 h-3.5 text-brand-500 bg-white" />
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 mt-1">
                          {flight.stops === 0 ? 'Non-Stop' : `${flight.stops} Stop (${flight.layoverCity})`}
                        </span>
                      </div>

                      <div>
                        <span className="text-xl sm:text-2xl font-black text-navy-950 font-mono block">
                          {flight.arrivalTime}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 block">{flight.toCode}</span>
                        <span className="text-[11px] text-slate-400 truncate max-w-[120px] block">{flight.toCity}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Booking Action */}
                  <div className="sm:border-l sm:border-slate-100 sm:pl-6 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                    <div className="text-left sm:text-right">
                      <span className="text-2xl font-black text-navy-950 font-serif block">
                        {formatPrice(flight.price)}
                      </span>
                      <span className="text-[10px] text-slate-400 block">per adult • all inclusive</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleBookClick(flight)}
                      className="px-6 py-2.5 rounded-full bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all"
                    >
                      Book Flight
                    </button>
                  </div>
                </div>

                {/* Flight Highlights Strip */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Luggage className="w-3.5 h-3.5 text-slate-400" />
                    <span>Check-in: {flight.baggage} | Cabin: {flight.cabinBaggage}</span>
                  </span>
                  <span className="flex items-center gap-1 text-emerald-600 font-medium">
                    <Utensils className="w-3.5 h-3.5" />
                    <span>Pure Veg &amp; Jain Meal Request Supported</span>
                  </span>
                  <span className="text-slate-400 ml-auto">
                    Only <strong className="text-rose-600">{flight.seatsLeft} seats</strong> left at this fare
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Booking Drawer / Modal */}
      {isBookingOpen && selectedFlight && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200">
            
            {!bookingConfirmed ? (
              <form onSubmit={handleConfirmBooking}>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-serif">Confirm Flight Booking</h3>
                    <p className="text-xs text-slate-500">
                      {selectedFlight.airline} {selectedFlight.flightNumber} • {selectedFlight.fromCode} &rarr; {selectedFlight.toCode}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsBookingOpen(false)}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Primary Passenger Name (as on Passport / Aadhaar)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ketan Vashi"
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98251 XXXXX"
                        value={passengerPhone}
                        onChange={(e) => setPassengerPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="ketan@example.com"
                        value={passengerEmail}
                        onChange={(e) => setPassengerEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">In-Flight Meal Care</label>
                    <select
                      value={mealPreference}
                      onChange={(e) => setMealPreference(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-500 bg-white"
                    >
                      <option>Jain Vegetarian (No Onion / Garlic)</option>
                      <option>Hindu Pure Vegetarian Meal (AVML)</option>
                      <option>Diabetic Vegetarian Meal</option>
                      <option>Standard In-Flight Selection</option>
                    </select>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                    <div>
                      <span className="text-slate-500 block">Total Payable Fare:</span>
                      <span className="font-bold text-lg text-navy-950 font-serif">{formatPrice(selectedFlight.price)}</span>
                    </div>
                    <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-1 rounded-full text-[11px]">
                      Instant E-Ticket
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsBookingOpen(false)}
                    className="flex-1 py-3 rounded-full border border-slate-300 text-slate-700 font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-500/25 transition-all"
                  >
                    Confirm &amp; Issue E-Ticket
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-1">Flight Booking Confirmed!</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Your electronic ticket has been issued with guaranteed {mealPreference}.
                </p>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs mb-6 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Booking Reference:</span>
                    <span className="font-mono font-bold text-brand-600">{generatedRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Passenger:</span>
                    <span className="font-semibold text-slate-800">{passengerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Flight:</span>
                    <span className="font-semibold text-slate-800">{selectedFlight.airline} ({selectedFlight.flightNumber})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Route:</span>
                    <span className="font-semibold text-slate-800">{selectedFlight.fromCode} &rarr; {selectedFlight.toCode}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <Link
                    href={`/portal?ref=${generatedRef}`}
                    className="w-full py-3 rounded-full bg-navy-950 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>View in My Trip Portal &rarr;</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setIsBookingOpen(false)}
                    className="text-xs text-slate-500 hover:text-slate-700 py-1"
                  >
                    Close Window
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
