'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building, 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Search, 
  ChevronRight, 
  Sparkles, 
  Coffee, 
  Wifi, 
  Bed, 
  FileText 
} from 'lucide-react';
import { SAMPLE_HOTELS } from '@/data/travel-services-data';
import { HotelProperty, HotelRoom } from '@/types/travel';
import { useCurrency } from '@/context/CurrencyContext';

export default function HotelsPage() {
  const { formatPrice } = useCurrency();

  const [destination, setDestination] = useState('Santorini / Dubai / Kashmir');
  const [starFilter, setStarFilter] = useState<number | 'All'>('All');
  const [pureVegOnly, setPureVegOnly] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<HotelProperty | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<HotelRoom | null>(null);

  // Booking Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [specialRequest, setSpecialRequest] = useState('100% Pure Jain Meals for all breakfasts');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [hotelRef, setHotelRef] = useState('');

  const filteredHotels = SAMPLE_HOTELS.filter((h) => {
    if (starFilter !== 'All' && h.stars !== starFilter) return false;
    if (pureVegOnly && !h.pureVegKitchen) return false;
    return true;
  });

  const handleBookRoom = (hotel: HotelProperty, room: HotelRoom) => {
    setSelectedHotel(hotel);
    setSelectedRoom(room);
    setIsModalOpen(true);
    setBookingConfirmed(false);
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `TRV-HTL-${Math.floor(1000 + Math.random() * 9000)}`;
    setHotelRef(ref);
    setBookingConfirmed(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Luxury Hotels &amp; Resorts</span>
        </div>

        {/* Search Header */}
        <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-navy-900 mb-8">
          <span className="text-xs uppercase font-bold text-amber-400 tracking-widest block mb-1">
            Handpicked 5-Star Properties &amp; Heritage Stays
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-6">
            Explore Luxury Hotels &amp; Private Villas
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-white/5 p-3 rounded-2xl border border-white/10">
            <div className="bg-black/30 p-3 rounded-xl md:col-span-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">City or Property</span>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-logo-coral shrink-0" />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-transparent text-sm font-bold text-white focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-black/30 p-3 rounded-xl">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Check-In / Out</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-white">15 Dec - 20 Dec (5N)</span>
              </div>
            </div>

            <div className="bg-black/30 p-3 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Rooms &amp; Guests</span>
                <span className="text-sm font-bold text-white">2 Adults, 1 Room</span>
              </div>
              <button
                type="button"
                className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Listing & Filter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
              <h3 className="font-bold text-sm text-slate-800 mb-4 pb-3 border-b border-slate-100">
                Filter Properties
              </h3>

              {/* Star Rating */}
              <div className="mb-5">
                <span className="text-xs font-bold text-slate-700 block mb-2.5">Hotel Category</span>
                {[
                  { label: 'All Categories', val: 'All' as const },
                  { label: '5-Star Ultra Luxury', val: 5 },
                  { label: '4-Star Premium', val: 4 }
                ].map((s) => (
                  <label key={s.label} className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer mb-2">
                    <input
                      type="radio"
                      name="stars"
                      checked={starFilter === s.val}
                      onChange={() => setStarFilter(s.val)}
                      className="text-brand-600 focus:ring-brand-500"
                    />
                    <span>{s.label}</span>
                  </label>
                ))}
              </div>

              {/* Dietary Care Checkbox */}
              <div>
                <span className="text-xs font-bold text-slate-700 block mb-2.5">Dining Care</span>
                <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pureVegOnly}
                    onChange={(e) => setPureVegOnly(e.target.checked)}
                    className="rounded text-brand-600 focus:ring-brand-500"
                  />
                  <span>Pure Veg / Jain Chef Supported</span>
                </label>
              </div>
            </div>

            {/* Quality Seal */}
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900">
              <div className="flex items-center gap-2 font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Verified Inspection</span>
              </div>
              <p>Every resort listed is personally reviewed by The Travelopedia directors for cleanliness, linen quality, and culinary care.</p>
            </div>
          </div>

          {/* Hotel Cards */}
          <div className="lg:col-span-3 space-y-6">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
                  
                  {/* Photo Column */}
                  <div className="md:col-span-5 relative min-h-[240px] md:min-h-full">
                    <img
                      src={hotel.images[0]}
                      alt={hotel.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{hotel.rating}</span>
                      <span className="text-slate-300">({hotel.reviewCount})</span>
                    </div>
                  </div>

                  {/* Info Column */}
                  <div className="md:col-span-7 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-brand-600 font-semibold mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{hotel.city}, {hotel.country}</span>
                      </div>

                      <h2 className="text-xl font-bold font-serif text-slate-900 mb-2">
                        {hotel.name}
                      </h2>

                      <p className="text-xs text-slate-500 leading-relaxed mb-4">
                        {hotel.overview}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {hotel.amenities.map((a) => (
                          <span
                            key={a}
                            className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium"
                          >
                            ✓ {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Room Options Inside Hotel */}
                    <div className="pt-4 border-t border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-2">
                        Available Room Categories:
                      </span>
                      
                      <div className="space-y-2.5">
                        {hotel.rooms.map((room) => (
                          <div
                            key={room.id}
                            className="bg-slate-50 p-3 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-slate-200/60"
                          >
                            <div>
                              <span className="font-bold text-xs text-slate-900 block">{room.name}</span>
                              <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                                <span>{room.bedType}</span>
                                <span>•</span>
                                <span className="text-emerald-700 font-semibold">{room.mealPlan}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                              <div className="text-right">
                                <span className="font-serif font-bold text-base text-navy-950 block">
                                  {formatPrice(room.pricePerNight)}
                                </span>
                                <span className="text-[10px] text-slate-400">/ night + taxes</span>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleBookRoom(hotel, room)}
                                className="px-4 py-2 rounded-full bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                              >
                                Reserve
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Hotel Reservation Modal */}
      {isModalOpen && selectedHotel && selectedRoom && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200">
            
            {!bookingConfirmed ? (
              <form onSubmit={handleConfirmReservation}>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-serif">Reserve Hotel Room</h3>
                    <p className="text-xs text-slate-500">
                      {selectedHotel.name} • {selectedRoom.name}
                    </p>
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
                    <label className="text-xs font-bold text-slate-700 block mb-1">Lead Guest Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ketan Vashi"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98251 XXXXX"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="guest@example.com"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Special Dietary / Room Requests</label>
                    <textarea
                      rows={2}
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                    <div>
                      <span className="text-slate-500 block">Rate per night:</span>
                      <span className="font-bold text-lg text-navy-950 font-serif">{formatPrice(selectedRoom.pricePerNight)}</span>
                    </div>
                    <span className="text-emerald-700 font-bold bg-emerald-100 px-2.5 py-1 rounded-full text-[11px]">
                      Breakfast &amp; Jain Meals Included
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
                    Confirm Hotel Voucher
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif font-bold text-slate-900 mb-1">Hotel Voucher Confirmed!</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Your stay at {selectedHotel.name} is confirmed.
                </p>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs mb-6 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Voucher Reference:</span>
                    <span className="font-mono font-bold text-brand-600">{hotelRef}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Guest Name:</span>
                    <span className="font-semibold text-slate-800">{guestName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Room:</span>
                    <span className="font-semibold text-slate-800">{selectedRoom.name}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5">
                  <Link
                    href={`/portal?ref=${hotelRef}`}
                    className="w-full py-3 rounded-full bg-navy-950 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download Voucher in Portal &rarr;</span>
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
