'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Ticket, 
  Search, 
  Plane, 
  Hotel, 
  Car, 
  Utensils, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Download, 
  Printer, 
  MessageCircle, 
  Phone, 
  FileText, 
  Calendar, 
  MapPin, 
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { COMPANY_DETAILS } from '@/lib/utils';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';

interface BookingRecord {
  bookingId: string;
  leadName: string;
  phone: string;
  email: string;
  packageTitle: string;
  destination: string;
  country: string;
  travelDates: string;
  duration: string;
  travelers: string;
  tokenPaid: number;
  totalAmount: number;
  paymentStatus: 'Token Confirmed' | 'Fully Paid' | 'Deposit Pending';
  visaStatus: 'Approved & Issued' | 'In Process' | 'Documents Verified';
  visaStage: number; // 1-4
  conciergeName: string;
  conciergePhone: string;
  pnr: string;
  flightRoute: string;
  airline: string;
  hotelName: string;
  hotelVoucher: string;
  mealPlan: string;
  chauffeurDetails: string;
  itinerarySummary: { day: string; title: string; desc: string }[];
}

const SEED_BOOKINGS: { [key: string]: BookingRecord } = {
  'TRV-2026-881': {
    bookingId: 'TRV-2026-881',
    leadName: 'Mr. Ketan & Ami Vashi',
    phone: '+91 98251 12345',
    email: 'ketan.vashi@gmail.com',
    packageTitle: 'Greece & Santorini Caldera Luxury Romance',
    destination: 'Santorini & Athens',
    country: 'Greece',
    travelDates: '18 Nov 2026 - 25 Nov 2026',
    duration: '6 Nights / 7 Days',
    travelers: '2 Adults (Couple Honeymoon)',
    tokenPaid: 58500,
    totalAmount: 195000,
    paymentStatus: 'Token Confirmed',
    visaStatus: 'Approved & Issued',
    visaStage: 4,
    conciergeName: 'Ronak Shah (Senior Architect, VIP Road)',
    conciergePhone: '+91 95129 35701',
    pnr: 'EK-782194',
    flightRoute: 'Surat (STV) → Mumbai (BOM) → Athens (ATH)',
    airline: 'Emirates Business & Economy Partner',
    hotelName: 'Canaves Oia Epitome Luxury Suites (Santorini Caldera View)',
    hotelVoucher: 'HTL-GR-99482',
    mealPlan: '100% Pure Vegetarian & Jain Breakfast + Candlelight Dinner',
    chauffeurDetails: 'Private Mercedes Sprinter with English/Greek speaking chauffeur',
    itinerarySummary: [
      { day: 'Day 1', title: 'Arrival at Athens & Acropolis Sunset', desc: 'Private transfer from Athens airport to 5★ Grand Bretagne hotel.' },
      { day: 'Day 2', title: 'High-Speed Ferry to Santorini Caldera', desc: 'Transfer to Piraeus port, business class ferry tickets to Thira Santorini.' },
      { day: 'Day 3', title: 'Private Catamaran Sunset Cruise', desc: 'Sail past Red Beach, White Beach, hot springs with Jain meal hamper.' },
      { day: 'Day 4', title: 'Oia Village Walk & Photography Session', desc: 'Professional 1-hour sunset photoshoot overlooking blue domes.' },
      { day: 'Day 5', title: 'Leisure & Luxury Spa Retreat', desc: 'Heated plunge pool relaxation at Canaves Caldera cave suite.' },
      { day: 'Day 6', title: 'Return Flight to Athens & Shopping', desc: 'Scenic flight to Athens, Plaka district evening shopping.' },
      { day: 'Day 7', title: 'Homeward Bound to Surat', desc: 'Private transfer to Athens airport for flight connection back to Surat STV.' }
    ]
  },
  'TRV-2026-942': {
    bookingId: 'TRV-2026-942',
    leadName: 'Mr. Sanjay & Bhavna Patel',
    phone: '+91 98251 98765',
    email: 'sanjay.patel@pateltextiles.in',
    packageTitle: 'Kashmir Paradise on Earth & Gulmarg Gondola',
    destination: 'Srinagar, Gulmarg & Pahalgam',
    country: 'India',
    travelDates: '22 Dec 2026 - 28 Dec 2026',
    duration: '5 Nights / 6 Days',
    travelers: '4 Adults (Family Vacation)',
    tokenPaid: 45000,
    totalAmount: 154000,
    paymentStatus: 'Token Confirmed',
    visaStatus: 'Approved & Issued',
    visaStage: 4,
    conciergeName: 'Priya Choksi (Domestic Lead, VIP Road)',
    conciergePhone: '+91 95129 35701',
    pnr: '6E-44829',
    flightRoute: 'Surat (STV) → Delhi (DEL) → Srinagar (SXR)',
    airline: 'IndiGo Express Connecting Flight',
    hotelName: 'The Khyber Himalayan Resort & Spa (Gulmarg) + Luxury Dal Lake Houseboat',
    hotelVoucher: 'HTL-KSH-88120',
    mealPlan: 'Guaranteed 100% Pure Veg & Jain Kitchen (No Onion, No Garlic)',
    chauffeurDetails: 'Dedicated AC Toyota Innova Crysta throughout Kashmir itinerary',
    itinerarySummary: [
      { day: 'Day 1', title: 'Srinagar Arrival & Shikara Sunset', desc: 'Chauffeur pickup, traditional Kahwa welcome, sunset Shikara on Dal Lake.' },
      { day: 'Day 2', title: 'Scenic Gulmarg & Guaranteed Gondola Pass', desc: 'VIP Gondola Phase 1 & Phase 2 snow experience with snowmobiles.' },
      { day: 'Day 3', title: 'Gulmarg to Pahalgam Valley', desc: 'Visit saffron fields at Pampore, riverside pine forest resort check-in.' },
      { day: 'Day 4', title: 'Betaab & Aru Valley Sightseeing', desc: 'Private local union cab to snow valley meadows and crystal streams.' },
      { day: 'Day 5', title: 'Srinagar Mughal Gardens & Shopping', desc: 'Visit Shalimar Bagh, Nishat Bagh, and authentic Kashmiri Pashmina shawls.' },
      { day: 'Day 6', title: 'Departure to Surat Airport', desc: 'Private chauffeur transfer to Srinagar airport for return connection.' }
    ]
  }
};

function CustomerPortalInner() {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const searchParams = useSearchParams();
  const refParam = searchParams.get('ref');

  const [searchQuery, setSearchQuery] = useState('');
  const [booking, setBooking] = useState<BookingRecord | null>(SEED_BOOKINGS['TRV-2026-881']);
  const [error, setError] = useState('');

  useEffect(() => {
    if (refParam) {
      const clean = refParam.trim().toUpperCase();
      if (SEED_BOOKINGS[clean]) {
        setBooking(SEED_BOOKINGS[clean]);
      } else if (clean.startsWith('TRV-FL-')) {
        setBooking({
          bookingId: clean,
          leadName: 'Mr. Ketan Vashi',
          phone: '+91 98251 12345',
          email: 'ketan.vashi@gmail.com',
          packageTitle: 'Confirmed Domestic & International Flight Ticket',
          destination: 'Dubai (DXB) / Mumbai (BOM)',
          country: 'United Arab Emirates',
          travelDates: '10 Dec 2026 - 15 Dec 2026',
          duration: 'Direct Flight Routing',
          travelers: '1 Adult (Economy)',
          tokenPaid: 24500,
          totalAmount: 24500,
          paymentStatus: 'Fully Paid',
          visaStatus: 'Approved & Issued',
          visaStage: 4,
          conciergeName: 'Ronak Shah (The Travelopedia VIP Road)',
          conciergePhone: '+91 95129 35701',
          pnr: clean.replace('TRV-FL-', 'EK-'),
          flightRoute: 'Surat / Mumbai (BOM) → Dubai (DXB)',
          airline: 'Emirates Airline Partner',
          hotelName: 'Airport Transit & Lounge Access',
          hotelVoucher: 'E-TICKET-CONFIRMED',
          mealPlan: 'Guaranteed 100% Pure Vegetarian & Jain Meal (AVML/VJML)',
          chauffeurDetails: 'Surat to Mumbai Airport VIP Chauffeur on Request',
          itinerarySummary: [
            { day: 'Flight', title: 'Confirmed Flight e-Ticket Issued', desc: 'Baggage 30kg + 7kg cabin. Web check-in available 48 hours prior.' }
          ]
        });
      } else if (clean.startsWith('TRV-HTL-')) {
        setBooking({
          bookingId: clean,
          leadName: 'Mr. Ketan Vashi',
          phone: '+91 98251 12345',
          email: 'ketan.vashi@gmail.com',
          packageTitle: 'Luxury 5-Star Hotel & Cave Suite Reservation',
          destination: 'Santorini Caldera',
          country: 'Greece',
          travelDates: '15 Dec 2026 - 20 Dec 2026',
          duration: '5 Nights / 6 Days',
          travelers: '2 Adults (Couple Retreat)',
          tokenPaid: 38500,
          totalAmount: 192500,
          paymentStatus: 'Token Confirmed',
          visaStatus: 'Approved & Issued',
          visaStage: 4,
          conciergeName: 'Ronak Shah (The Travelopedia VIP Road)',
          conciergePhone: '+91 95129 35701',
          pnr: 'HTL-RES-9912',
          flightRoute: 'Hotel Direct Voucher Confirmation',
          airline: 'N/A',
          hotelName: 'Canaves Oia Epitome Luxury Cave Suites (Santorini)',
          hotelVoucher: clean,
          mealPlan: 'Pure Vegetarian & Jain Breakfast + Heated Plunge Pool Access',
          chauffeurDetails: 'Complimentary Airport to Resort Chauffeur Sprinter',
          itinerarySummary: [
            { day: 'Day 1-5', title: 'Luxury Caldera Cave Suite', desc: 'Private plunge pool, sunset caldera views, daily Jain gourmet breakfast.' }
          ]
        });
      } else if (clean.startsWith('TRV-CAB-')) {
        setBooking({
          bookingId: clean,
          leadName: 'Mr. Ketan Vashi',
          phone: '+91 98251 12345',
          email: 'ketan.vashi@gmail.com',
          packageTitle: 'VIP Airport & Chauffeur Transfer Voucher',
          destination: 'Mumbai International Airport T2',
          country: 'India',
          travelDates: '10 Dec 2026 (05:30 AM Departure)',
          duration: 'Point to Point Transfer',
          travelers: '4 Passengers (Sedan / Crysta)',
          tokenPaid: 4200,
          totalAmount: 4200,
          paymentStatus: 'Fully Paid',
          visaStatus: 'Approved & Issued',
          visaStage: 4,
          conciergeName: 'Surat Fleet Desk (VIP Road)',
          conciergePhone: '+91 95129 35701',
          pnr: clean,
          flightRoute: 'Surat VIP Road, Vesu → Mumbai Airport T2',
          airline: 'White Plate Commercial Chauffeur',
          hotelName: 'N/A',
          hotelVoucher: 'DISPATCH-ACTIVE',
          mealPlan: 'Complimentary Mineral Water & Refreshments',
          chauffeurDetails: 'Commercial Uniformed Chauffeur with GPS Vehicle Tracking',
          itinerarySummary: [
            { day: 'Transfer', title: 'Confirmed On-Time Chauffeur Dispatch', desc: 'All tolls and Gujarat-Maharashtra border state taxes included.' }
          ]
        });
      } else if (clean.startsWith('TRV-BUS-')) {
        setBooking({
          bookingId: clean,
          leadName: 'Mr. Ketan Vashi',
          phone: '+91 98251 12345',
          email: 'ketan.vashi@gmail.com',
          packageTitle: 'Volvo Multi-Axle Luxury AC Sleeper M-Ticket',
          destination: 'Ahmedabad (Paldi Cross Roads)',
          country: 'India',
          travelDates: '10 Dec 2026 (23:15 Departure)',
          duration: 'Overnight Sleeper',
          travelers: '1 Passenger (Lower Sleeper L4)',
          tokenPaid: 850,
          totalAmount: 850,
          paymentStatus: 'Fully Paid',
          visaStatus: 'Approved & Issued',
          visaStage: 4,
          conciergeName: 'Bus Helpdesk (Surat Central)',
          conciergePhone: '+91 95129 35701',
          pnr: clean,
          flightRoute: 'Surat Ring Road Sahara Darwaja → Ahmedabad Paldi',
          airline: 'Patel Tours & Travels VIP Class',
          hotelName: 'N/A',
          hotelVoucher: 'M-TICKET-ISSUED',
          mealPlan: 'Water Bottle & Sanitized Linen Blanket Provided',
          chauffeurDetails: 'Volvo B11R Multi-Axle Coach with Live Tracking',
          itinerarySummary: [
            { day: 'Night', title: 'Confirmed Sleeper Berth L4', desc: 'Individual USB charging, ambient LED reading light, AC controls.' }
          ]
        });
      } else if (clean.startsWith('TRV-ACT-')) {
        setBooking({
          bookingId: clean,
          leadName: 'Mr. Ketan Vashi',
          phone: '+91 98251 12345',
          email: 'ketan.vashi@gmail.com',
          packageTitle: 'Santorini Sunset Luxury Catamaran Cruise Experience',
          destination: 'Santorini Island',
          country: 'Greece',
          travelDates: '12 Dec 2026 (03:30 PM Sunset Slot)',
          duration: '5 Hours Sailing',
          travelers: '2 Guests',
          tokenPaid: 29000,
          totalAmount: 29000,
          paymentStatus: 'Fully Paid',
          visaStatus: 'Approved & Issued',
          visaStage: 4,
          conciergeName: 'Ronak Shah (The Travelopedia VIP Road)',
          conciergePhone: '+91 95129 35701',
          pnr: clean,
          flightRoute: 'Amoudi Bay / Vlychada Marina Sailing',
          airline: 'Catamaran Cruise Partner',
          hotelName: 'N/A',
          hotelVoucher: 'SKIP-THE-LINE-PASS',
          mealPlan: 'Vegetarian Greek Feast, Fresh Fruits, Wine & Cold Drinks',
          chauffeurDetails: 'Return Hotel Transfer from Oia / Fira Included',
          itinerarySummary: [
            { day: 'Cruise', title: 'Catamaran Sunset Sailing', desc: 'Snorkeling equipment, hot springs volcanic soak, Oia sunset viewpoint.' }
          ]
        });
      } else if (clean.startsWith('TRV-VISA-')) {
        setBooking({
          bookingId: clean,
          leadName: 'Mr. Ketan Vashi',
          phone: '+91 98251 12345',
          email: 'ketan.vashi@gmail.com',
          packageTitle: 'Schengen (Europe) Tourist Visa Dossier Assistance',
          destination: 'Greece, Switzerland & France',
          country: 'Europe (Schengen Area)',
          travelDates: 'Filing: Nov 2026 • Travel: Dec 2026',
          duration: '90 Days Stay Validity',
          travelers: '1 Applicant Passport',
          tokenPaid: 2500,
          totalAmount: 10300,
          paymentStatus: 'Token Confirmed',
          visaStatus: 'Documents Verified',
          visaStage: 2,
          conciergeName: 'Surat Visa Desk (VIP Road, Vesu)',
          conciergePhone: '+91 95129 35701',
          pnr: clean,
          flightRoute: 'Confirmed Dummy Flight Itinerary for VFS Included',
          airline: 'Emirates & Lufthansa Flight Reservations',
          hotelName: '5-Star Hotel Vouchers for Schengen Visa Included',
          hotelVoucher: 'DOSSIER-ACTIVE',
          mealPlan: 'N/A',
          chauffeurDetails: 'VFS Global Ahmedabad / Mumbai Appointment Escort',
          itinerarySummary: [
            { day: 'Stage 1', title: 'Document Scrutiny Completed', desc: 'Bank statements and 2-year ITR verified on VIP Road.' },
            { day: 'Stage 2', title: 'Embassy Dossier Prepared', desc: 'Flight dummy tickets, hotel vouchers, and cover letter prepared.' }
          ]
        });
      }
    }
  }, [refParam]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const clean = searchQuery.trim().toUpperCase();
    if (!clean) {
      setError('Please enter a booking reference number or telephone.');
      return;
    }

    if (SEED_BOOKINGS[clean]) {
      setBooking(SEED_BOOKINGS[clean]);
      return;
    }

    // Check by phone number
    const foundByPhone = Object.values(SEED_BOOKINGS).find(b => b.phone.replace(/[^0-9]/g, '').includes(clean.replace(/[^0-9]/g, '')));
    if (foundByPhone) {
      setBooking(foundByPhone);
      return;
    }

    setError('No active booking found for this reference. Please check your token voucher or message our Surat desk.');
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Ticket className="w-3.5 h-3.5 text-logo-coralDeep" />
            <span>Traveller Self-Service Lounge</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-navy-950 tracking-tight">
            My Trip Portal &amp; Digital Vouchers
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Access your live itinerary, verified flight PNRs, hotel confirmations, visa stages, and download official travel vouchers issued by our Surat VIP Road office.
          </p>
        </div>

        {/* Search Bar / Lookup Widget */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl max-w-3xl mx-auto mb-10">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Booking Ref (e.g. TRV-2026-881) or Phone..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 uppercase tracking-wider"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-navy-950/20 transition-all shrink-0 cursor-pointer"
            >
              Search Booking
            </button>
          </form>

          {/* Quick Demo Buttons */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="text-slate-400 font-semibold">Test Sample Bookings:</span>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => { setSearchQuery('TRV-2026-881'); setBooking(SEED_BOOKINGS['TRV-2026-881']); setError(''); }}
                className="px-3 py-1 rounded-xl bg-brand-50 text-brand-700 hover:bg-brand-100 font-semibold border border-brand-200 transition-colors"
              >
                Sample 1: TRV-2026-881 (Greece Romance)
              </button>
              <button
                type="button"
                onClick={() => { setSearchQuery('TRV-2026-942'); setBooking(SEED_BOOKINGS['TRV-2026-942']); setError(''); }}
                className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold border border-slate-200 transition-colors"
              >
                Sample 2: TRV-2026-942 (Kashmir Luxury)
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 text-red-600 text-xs font-semibold border border-red-200">
              {error}
            </div>
          )}
        </div>

        {/* =========================================================================
            ACTIVE BOOKING DASHBOARD & DIGITAL VOUCHER
           ========================================================================= */}
        {booking && (
          <div className="space-y-8 animate-fade-in print:p-0">
            
            {/* Top Overview Banner */}
            <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-navy-800">
              <div className="absolute top-0 right-0 w-80 h-80 bg-logo-coral/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-wider border border-emerald-500/30">
                      ✓ {booking.paymentStatus}
                    </span>
                    <span className="text-slate-400 text-xs font-mono">
                      Ref: {booking.bookingId}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-white">
                    {booking.packageTitle}
                  </h2>
                  <p className="text-slate-300 text-sm mt-1">
                    Booked for: <strong>{booking.leadName}</strong> &bull; {booking.travelers}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-2 border border-white/20 transition-all cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print / Save Voucher</span>
                  </button>

                  <a
                    href={`https://wa.me/${COMPANY_DETAILS.phoneRaw}?text=${encodeURIComponent(
                      `Hi The TraveloPedia, I am checking my booking ${booking.bookingId} for ${booking.leadName}. Need an update.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>WhatsApp Concierge</span>
                  </a>
                </div>
              </div>

              {/* Key Quick Metrics Strip */}
              <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">Travel Window</span>
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-logo-peach" />
                    {booking.travelDates}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Duration</span>
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-logo-coral" />
                    {booking.duration}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Token Deposit Received</span>
                  <span className="font-bold text-emerald-400 font-mono text-sm">
                    {formatPrice(booking.tokenPaid)}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Total Package Value</span>
                  <span className="font-bold text-white font-mono text-sm">
                    {formatPrice(booking.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* Stage Tracker: Visa & Documentation Progress */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="text-lg font-bold font-serif text-navy-950 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    Visa &amp; Travel Clearance Status
                  </h3>
                  <p className="text-xs text-slate-500">Official embassy filing timeline managed by Surat consular desk</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold self-start sm:self-auto border border-emerald-200">
                  Current Status: {booking.visaStatus}
                </span>
              </div>

              {/* 4-Step Progress Line */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                  { step: 1, title: 'Document Verification', desc: 'Passports & financials verified', done: booking.visaStage >= 1 },
                  { step: 2, title: 'Embassy Dossier Filing', desc: 'Appointment & cover letter submitted', done: booking.visaStage >= 2 },
                  { step: 3, title: 'Biometrics / Submission', desc: 'Consulate biometrics completed', done: booking.visaStage >= 3 },
                  { step: 4, title: 'Visa Stamped & Vouchers Ready', desc: 'Official travel approval granted', done: booking.visaStage >= 4 },
                ].map((st) => (
                  <div
                    key={st.step}
                    className={`p-4 rounded-2xl border transition-all ${
                      st.done 
                        ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' 
                        : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        st.done ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-white'
                      }`}>
                        {st.done ? '✓' : st.step}
                      </div>
                      <span className="font-bold text-xs">{st.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug pl-8">{st.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Logistics Grid: Flights, Hotels, Dining, Transfers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Card 1: Flights */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                      <Plane className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-navy-950">Flight Reservations</h4>
                      <span className="text-[11px] text-slate-400">{booking.airline}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-mono text-xs font-bold">
                    PNR: {booking.pnr}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Routing:</span>
                    <span className="font-semibold text-slate-800">{booking.flightRoute}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Luggage Allowance:</span>
                    <span className="font-semibold text-slate-800">30 KG Check-in + 7 KG Cabin / Person</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Seat Assignment:</span>
                    <span className="font-semibold text-emerald-600">Pre-assigned Window &amp; Aisle</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Hotel & Luxury Accommodation */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                      <Hotel className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-navy-950">Accommodations</h4>
                      <span className="text-[11px] text-slate-400">Verified Luxury Voucher</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-mono text-xs font-bold">
                    {booking.hotelVoucher}
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Property:</span>
                    <span className="font-semibold text-slate-800 text-right max-w-[240px] truncate">{booking.hotelName}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Check-In / Out:</span>
                    <span className="font-semibold text-slate-800">14:00 Check-in | 11:00 Check-out</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Dietary Guarantee:</span>
                    <span className="font-semibold text-emerald-600">{booking.mealPlan}</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Chauffeur & Transfers */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-3">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-navy-950">Chauffeur &amp; Airport Meet</h4>
                    <span className="text-[11px] text-slate-400">Dedicated AC Vehicle</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {booking.chauffeurDetails}. Chauffeur will hold a customized The TraveloPedia placard at the arrivals exit gate.
                </p>
              </div>

              {/* Card 4: Assigned Personal Concierge */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-3">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-navy-950">Assigned Surat Concierge</h4>
                    <span className="text-[11px] text-slate-400">VIP Road Vesu Holiday Desk</span>
                  </div>
                </div>

                <div className="text-xs space-y-1">
                  <p className="font-bold text-slate-800">{booking.conciergeName}</p>
                  <p className="text-slate-500">Direct Helpline: {booking.conciergePhone} (24x7 Active On Tour)</p>
                </div>
              </div>

            </div>

            {/* Day-by-Day Digital Itinerary Summary */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
              <h3 className="text-lg font-bold font-serif text-navy-950 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-500" />
                Day-by-Day Journey Schedule
              </h3>

              <div className="space-y-3">
                {booking.itinerarySummary.map((item) => (
                  <div key={item.day} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <span className="px-2.5 py-1 rounded-lg bg-navy-950 text-white font-mono text-xs font-bold shrink-0">
                        {item.day}
                      </span>
                      <div>
                        <strong className="text-sm text-navy-950 block">{item.title}</strong>
                        <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-emerald-600 font-semibold shrink-0">
                      ✓ Confirmed Slot
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Official GST Invoice & Surat Seal Note */}
            <div className="p-6 rounded-3xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-bold text-navy-950 text-sm">Official The TraveloPedia Client Voucher</p>
                <p className="mt-0.5 text-slate-500">7, E-Space, VIP Road, Vesu, Surat, Gujarat 395007 &bull; GST Registration Verified</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Voucher PDF</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default function CustomerPortalPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 pt-36 pb-16 flex items-center justify-center text-slate-500 text-xs font-bold">
          Loading Booking Portal &amp; Vouchers...
        </div>
      }
    >
      <CustomerPortalInner />
    </Suspense>
  );
}

