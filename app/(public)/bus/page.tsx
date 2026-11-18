'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bus, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight, 
  Ticket, 
  Wifi, 
  Zap, 
  Search,
  User,
  Phone
} from 'lucide-react';
import { SAMPLE_BUSES } from '@/data/travel-services-data';
import { BusOption } from '@/types/travel';
import { useCurrency } from '@/context/CurrencyContext';
import { COMPANY_DETAILS } from '@/lib/utils';

export default function BusPage() {
  const { formatPrice } = useCurrency();

  const [fromCity, setFromCity] = useState('Surat');
  const [toCity, setToCity] = useState('Ahmedabad');
  const [journeyDate, setJourneyDate] = useState('2026-12-10');
  
  // Seat selection state
  const [selectedBus, setSelectedBus] = useState<BusOption | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [passengerName, setPassengerName] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [ticketRef, setTicketRef] = useState('');

  const handleSelectSeats = (bus: BusOption) => {
    setSelectedBus(bus);
    setSelectedSeat('L4 (Lower Sleeper)');
    setIsModalOpen(true);
    setBookingConfirmed(false);
  };

  const handleConfirmTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `TRV-BUS-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketRef(ref);
    setBookingConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Luxury Bus Bookings</span>
        </div>

        {/* Search Header */}
        <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-navy-900 mb-8">
          <span className="text-xs uppercase font-bold text-amber-400 tracking-widest block mb-1">
            Volvo Multi-Axle &amp; BharatBenz Luxury AC Sleepers
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-6">
            Book Intercity Premium Buses
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
            <div className="bg-black/30 p-3 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">From City</span>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <input
                  type="text"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-black/30 p-3 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">To City</span>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-logo-coral shrink-0" />
                <input
                  type="text"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-black/30 p-3 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Date of Journey</span>
              <input
                type="date"
                value={journeyDate}
                onChange={(e) => setJourneyDate(e.target.value)}
                className="w-full bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
              />
            </div>

            <div className="bg-black/30 p-3 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Class</span>
                <span className="text-xs font-bold text-white">AC Sleeper (2+1)</span>
              </div>
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
              >
                <Search className="w-4 h-4" />
                <span>Find</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bus List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Showing verified luxury departures from Surat</span>
            <span>All coaches feature sanitized sleeper cabins &amp; charging</span>
          </div>

          {SAMPLE_BUSES.map((bus) => (
            <div
              key={bus.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Operator info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-base text-slate-900">{bus.operatorName}</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold">
                      ★ {bus.rating}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-500 mb-3">{bus.busType}</p>

                  <div className="flex items-center gap-8">
                    <div>
                      <span className="text-xl font-black text-navy-950 font-mono block">{bus.departureTime}</span>
                      <span className="text-xs text-slate-500 block">{bus.fromCity}</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[11px] text-slate-400 mb-1">{bus.duration}</span>
                      <div className="w-24 h-0.5 bg-slate-200 relative flex items-center justify-center">
                        <Bus className="w-3.5 h-3.5 text-emerald-500 bg-white" />
                      </div>
                    </div>

                    <div>
                      <span className="text-xl font-black text-navy-950 font-mono block">{bus.arrivalTime}</span>
                      <span className="text-xs text-slate-500 block">{bus.toCity}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing & Seat Selection */}
                <div className="lg:border-l lg:border-slate-100 lg:pl-6 flex lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-3">
                  <div className="text-left lg:text-right">
                    <span className="text-lg font-black font-serif text-navy-950 block">
                      Fare on Request
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600 block">
                      {bus.availableSeats} berths available
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                      className="px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-md hover:scale-105 active:scale-95 transition-all"
                      title="Call to Book Bus"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleSelectSeats(bus)}
                      className="px-5 py-2 rounded-full bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all"
                    >
                      Select Seats
                    </button>
                  </div>
                </div>
              </div>

              {/* Boarding Points Strip */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                <span><strong>Boarding:</strong> {bus.boardingPoint}</span>
                <span><strong>Dropping:</strong> {bus.droppingPoint}</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Seat Picker & M-Ticket Modal */}
      {isModalOpen && selectedBus && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200">
            
            {!bookingConfirmed ? (
              <form onSubmit={handleConfirmTicket}>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-serif">Select Sleeper Berth</h3>
                    <p className="text-xs text-slate-500">{selectedBus.operatorName}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                  >
                    ✕
                  </button>
                </div>

                {/* Deck Preview Layout */}
                <div className="mb-5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-2">
                    Lower Deck Layout (Select Berth):
                  </span>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {['L1', 'L2', 'L3', 'L4 (Selected)', 'L5', 'L6', 'L7', 'L8'].map((seat) => {
                      const isSel = selectedSeat?.startsWith(seat.split(' ')[0]);
                      return (
                        <button
                          key={seat}
                          type="button"
                          onClick={() => setSelectedSeat(`${seat.split(' ')[0]} (Lower Sleeper)`)}
                          className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                            isSel
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-400'
                          }`}
                        >
                          {seat.split(' ')[0]}
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-[10px] text-slate-500 block mt-2">
                    Selected Berth: <strong className="text-emerald-700">{selectedSeat}</strong>
                  </span>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Passenger Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ketan Vashi"
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Number (for SMS M-Ticket)</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98251 XXXXX"
                      value={passengerPhone}
                      onChange={(e) => setPassengerPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                    <div>
                      <span className="text-slate-500 block">Bus Fare:</span>
                      <span className="font-bold text-base text-navy-950 font-serif">Fare Discussed on Call</span>
                    </div>
                    <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-1 rounded-full text-[11px]">
                      Surat Booking Desk
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
                    Request Bus Reservation
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-1">Bus M-Ticket Confirmed!</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Your seat {selectedSeat} on {selectedBus.operatorName} is locked.
                </p>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs mb-6 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ticket Reference:</span>
                    <span className="font-mono font-bold text-brand-600">{ticketRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Passenger:</span>
                    <span className="font-semibold text-slate-800">{passengerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Route:</span>
                    <span className="font-semibold text-slate-800">{selectedBus.fromCity} &rarr; {selectedBus.toCity}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <Link
                    href={`/portal?ref=${ticketRef}`}
                    className="w-full py-3 rounded-full bg-navy-950 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>View Ticket in Portal &rarr;</span>
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
