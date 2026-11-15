'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  Hotel, 
  Plane, 
  Send, 
  CheckCircle2, 
  MessageCircle, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  Phone,
  Compass,
  Utensils
} from 'lucide-react';
import { COMPANY_DETAILS, getGeneralWhatsAppUrl } from '@/lib/utils';

export default function CustomTourPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    destination: '',
    category: 'international',
    tripType: 'Family Holiday',
    departureCity: 'Surat',
    travelDate: '',
    duration: '5-7 Days',
    adults: '2',
    children: '0',
    hotelCategory: '4-Star Deluxe',
    budgetPerPerson: '₹50,000 - ₹1,00,000',
    needsFlights: true,
    needsVisa: true,
    needsTransfers: true,
    needsJainFood: false,
    customerName: '',
    phone: '',
    email: '',
    specialRequests: ''
  });

  const handleNext = () => {
    setError('');
    if (currentStep === 1 && !formData.destination) {
      setError('Please select or specify your dream destination.');
      return;
    }
    if (currentStep === 4) {
      if (!formData.customerName || !formData.phone) {
        setError('Please enter your full name and WhatsApp phone number.');
        return;
      }
      submitForm();
      return;
    }
    setCurrentStep(prev => prev + 1);
  };

  const handlePrev = () => {
    setError('');
    setCurrentStep(prev => Math.max(1, prev - 1));
  };

  const submitForm = async () => {
    setLoading(true);
    setError('');

    const formattedNotes = [
      `Departure City: ${formData.departureCity}`,
      `Trip Type: ${formData.tripType}`,
      `Inclusions needed: ${[
        formData.needsFlights ? 'Flights' : null,
        formData.needsVisa ? 'Visa' : null,
        formData.needsTransfers ? 'Transfers' : null,
        formData.needsJainFood ? 'Jain/Veg Food' : null,
      ].filter(Boolean).join(', ')}`,
      formData.specialRequests ? `Special notes: ${formData.specialRequests}` : ''
    ].filter(Boolean).join(' | ');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.customerName,
          phone: formData.phone,
          email: formData.email,
          destination: formData.destination,
          packageTitle: `Custom ${formData.duration} ${formData.destination} Tour`,
          travelDate: formData.travelDate || 'Flexible',
          durationDays: formData.duration,
          adults: Number(formData.adults) || 2,
          children: Number(formData.children) || 0,
          hotelCategory: formData.hotelCategory,
          estimatedBudget: formData.budgetPerPerson,
          specialRequests: formattedNotes,
          source: 'Custom Tour'
        })
      });

      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch (err: any) {
      setError('Unable to submit inquiry. Please try again or message us directly on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = `Hi The TraveloPedia, I just submitted a custom tour request for ${formData.destination} (${formData.duration}, ${formData.adults} Adults, Hotel: ${formData.hotelCategory}). Customer: ${formData.customerName}. Please share a tailored proposal.`;
  const whatsappUrl = `https://wa.me/${COMPANY_DETAILS.phoneRaw}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-slate-50 min-h-screen py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Bespoke Holiday Planning</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-navy-950 tracking-tight">
            Design Your Tailor-Made Journey
          </h1>
          <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Tell us how you like to travel. Our Surat travel architects will curate a custom day-by-day itinerary tailored to your exact tastes and budget.
          </p>
        </div>

        {/* Wizard Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden">
          
          {/* Step Progress Header */}
          <div className="bg-navy-950 text-white p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4 text-xs font-bold">
              <span className="text-amber-400 uppercase tracking-wider">
                Step {currentStep} of 4: {
                  currentStep === 1 ? 'Destination & Travel Style' :
                  currentStep === 2 ? 'Dates & Travelers' :
                  currentStep === 3 ? 'Hotel & Inclusions' :
                  'Budget & Contact Details'
                }
              </span>
              <span className="text-slate-400">
                {Math.round((currentStep / 4) * 100)}% Completed
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-navy-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-brand-500 to-amber-400 transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-10">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-navy-950">
                  Custom Tour Request Received!
                </h2>
                <p className="mt-3 text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.customerName}</strong>! Our destination planner will prepare a detailed day-wise quote for <strong>{formData.destination}</strong> and reach out to you within 24 hours.
                </p>

                {/* WhatsApp Quick Connect */}
                <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200 max-w-lg mx-auto">
                  <h4 className="text-sm font-bold text-slate-800 mb-2">Want Instant Quotation on WhatsApp?</h4>
                  <p className="text-xs text-slate-500 mb-4">
                    Send your request directly to our senior Surat consultant for priority processing.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>Connect on WhatsApp (+91 95129 35701)</span>
                  </a>
                </div>

                <div className="mt-8 flex justify-center gap-4 text-xs font-semibold">
                  <Link href="/" className="text-brand-600 hover:underline">
                    &larr; Back to Homepage
                  </Link>
                  <span className="text-slate-300">|</span>
                  <Link href="/international" className="text-slate-600 hover:underline">
                    Browse Popular Packages
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
                    {error}
                  </div>
                )}

                {/* STEP 1: Destination & Travel Style */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold font-serif text-navy-950 mb-1">Where do you want to travel?</h3>
                      <p className="text-xs text-slate-500">Pick a popular destination or type your chosen country/state.</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Destination *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Switzerland, Bali, Dubai, Kashmir, Vietnam, Japan..."
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                      />
                    </div>

                    {/* Quick Destination Chips */}
                    <div>
                      <span className="text-xs text-slate-400 font-semibold block mb-2">Popular choices from Surat:</span>
                      <div className="flex flex-wrap gap-2">
                        {['Dubai, UAE', 'Bali, Indonesia', 'Switzerland & Paris', 'Kashmir Valley', 'Kerala Backwaters', 'Royal Rajasthan', 'Vietnam', 'Singapore & Malaysia', 'Maldives'].map(dest => (
                          <button
                            key={dest}
                            type="button"
                            onClick={() => setFormData({ ...formData, destination: dest })}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                              formData.destination === dest 
                                ? 'bg-brand-500 text-white border-brand-500 shadow-sm' 
                                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {dest}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Trip Style */}
                    <div className="pt-4 border-t border-slate-100">
                      <label className="block text-xs font-bold text-slate-700 mb-2">Travel Style</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { id: 'Family Holiday', label: 'Family Holiday', desc: 'Relaxed & child friendly' },
                          { id: 'Honeymoon', label: 'Honeymoon Special', desc: 'Romantic villas & sunsets' },
                          { id: 'Customized', label: 'Private Custom Tour', desc: 'Paced exactly your way' },
                          { id: 'Group Tour', label: 'Group Tour', desc: 'Fun with friends / family' },
                        ].map(st => (
                          <div
                            key={st.id}
                            onClick={() => setFormData({ ...formData, tripType: st.id })}
                            className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                              formData.tripType === st.id
                                ? 'border-brand-500 bg-brand-50/30'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span className="text-xs font-bold text-navy-950 block">{st.label}</span>
                            <span className="text-[10px] text-slate-500">{st.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Dates, Duration & Travelers */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold font-serif text-navy-950 mb-1">When and who is traveling?</h3>
                      <p className="text-xs text-slate-500">Provide an approximate travel window and traveler count.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Approx. Travel Date / Month</label>
                        <input
                          type="text"
                          placeholder="e.g. Mid November 2026, or Diwali vacation"
                          value={formData.travelDate}
                          onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                          className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Trip Duration</label>
                        <select
                          value={formData.duration}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none"
                        >
                          <option value="4-5 Days">4 - 5 Days (Quick Getaway)</option>
                          <option value="5-7 Days">5 - 7 Days (Standard Vacation)</option>
                          <option value="8-10 Days">8 - 10 Days (Comprehensive Tour)</option>
                          <option value="11-14 Days">11 - 14 Days (Grand Expedition)</option>
                          <option value="15+ Days">15+ Days (Extended Journey)</option>
                        </select>
                      </div>
                    </div>

                    {/* Adults, Children, Departure City */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Adults (12+ yrs)</label>
                        <select
                          value={formData.adults}
                          onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none"
                        >
                          {[1, 2, 3, 4, 5, 6, 8, 10, 12, '15+'].map(n => (
                            <option key={n} value={n}>{n} Adults</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Children (2-11 yrs)</label>
                        <select
                          value={formData.children}
                          onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none"
                        >
                          {[0, 1, 2, 3, 4, 5].map(n => (
                            <option key={n} value={n}>{n} Children</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Departure City</label>
                        <select
                          value={formData.departureCity}
                          onChange={(e) => setFormData({ ...formData, departureCity: e.target.value })}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none"
                        >
                          <option value="Surat">Surat (STV)</option>
                          <option value="Ahmedabad">Ahmedabad (AMD)</option>
                          <option value="Mumbai">Mumbai (BOM)</option>
                          <option value="Delhi">Delhi (DEL)</option>
                          <option value="Other">Other City</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Hotel Category & Inclusions */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold font-serif text-navy-950 mb-1">Accommodations &amp; Services</h3>
                      <p className="text-xs text-slate-500">Pick your preferred hotel comfort standard and required services.</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">Preferred Hotel Category</label>
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        {[
                          { id: '3-Star Standard', title: '3-Star Standard', desc: 'Clean, comfortable & budget friendly' },
                          { id: '4-Star Deluxe', title: '4-Star Deluxe', desc: 'Premium amenities, pool & breakfast' },
                          { id: '5-Star Luxury', title: '5-Star Luxury', desc: 'World-class brands & top service' },
                          { id: 'Private Pool Villa / Heritage', title: 'Villas & Heritage', desc: 'Exclusive private luxury stays' },
                        ].map(h => (
                          <div
                            key={h.id}
                            onClick={() => setFormData({ ...formData, hotelCategory: h.id })}
                            className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                              formData.hotelCategory === h.id
                                ? 'border-brand-500 bg-brand-50/30'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <span className="text-xs font-bold text-navy-950 block">{h.title}</span>
                            <span className="text-[10px] text-slate-500">{h.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Services Checklist */}
                    <div className="pt-4 border-t border-slate-100">
                      <label className="block text-xs font-bold text-slate-700 mb-3">Included Services Required:</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100">
                          <input
                            type="checkbox"
                            checked={formData.needsFlights}
                            onChange={(e) => setFormData({ ...formData, needsFlights: e.target.checked })}
                            className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">Flight Tickets</span>
                            <span className="text-[11px] text-slate-500">Assistance with group or low-cost airfares</span>
                          </div>
                        </label>

                        <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100">
                          <input
                            type="checkbox"
                            checked={formData.needsVisa}
                            onChange={(e) => setFormData({ ...formData, needsVisa: e.target.checked })}
                            className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">Visa Assistance</span>
                            <span className="text-[11px] text-slate-500">Tourist visa filing, documents &amp; biometrics</span>
                          </div>
                        </label>

                        <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100">
                          <input
                            type="checkbox"
                            checked={formData.needsTransfers}
                            onChange={(e) => setFormData({ ...formData, needsTransfers: e.target.checked })}
                            className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">Private Airport Transfers</span>
                            <span className="text-[11px] text-slate-500">Dedicated chauffeurs and AC vehicles</span>
                          </div>
                        </label>

                        <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100">
                          <input
                            type="checkbox"
                            checked={formData.needsJainFood}
                            onChange={(e) => setFormData({ ...formData, needsJainFood: e.target.checked })}
                            className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500"
                          />
                          <div>
                            <span className="font-bold text-slate-900 block">Pure Veg / Jain Food Options</span>
                            <span className="text-[11px] text-slate-500">Customized meal plans adhering to dietary rules</span>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Budget & Contact Details */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold font-serif text-navy-950 mb-1">Your Details &amp; Budget</h3>
                      <p className="text-xs text-slate-500">Where should our Surat travel consultants send the proposal?</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Approx. Budget Per Person (Excluding International Flights)</label>
                      <select
                        value={formData.budgetPerPerson}
                        onChange={(e) => setFormData({ ...formData, budgetPerPerson: e.target.value })}
                        className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none"
                      >
                        <option value="Under ₹35,000 / person">Under ₹35,000 / person (Budget Friendly)</option>
                        <option value="₹35,000 - ₹50,000 / person">₹35,000 - ₹50,000 / person (Economy Deluxe)</option>
                        <option value="₹50,000 - ₹1,00,000 / person">₹50,000 - ₹1,00,000 / person (Premium Holiday)</option>
                        <option value="₹1,00,000 - ₹2,00,000 / person">₹1,00,000 - ₹2,00,000 / person (Luxury Experience)</option>
                        <option value="₹2,00,000+ / person">₹2,00,000+ / person (Ultra-Luxury / Europe)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sanjay & Bhavna Patel"
                          value={formData.customerName}
                          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                          className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Mobile Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98251 XXXXX"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email Address (Optional)</label>
                      <input
                        type="email"
                        placeholder="sanjay.patel@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Any Specific Requests / Must-See Places</label>
                      <textarea
                        rows={2}
                        placeholder="e.g. We want 2 nights in an overwater villa in Maldives, or priority tickets to Jungfraujoch in Switzerland..."
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                      />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous Step</span>
                    </button>
                  ) : <div />}

                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={loading}
                    className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 via-brand-600 to-orange-600 hover:from-brand-600 hover:to-orange-700 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-brand-500/25 hover:-translate-y-0.5 disabled:opacity-70 transition-all"
                  >
                    <span>{loading ? 'Submitting...' : currentStep === 4 ? 'Submit Custom Itinerary Request' : 'Continue to Next Step'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Surat Assurance Banner */}
        <div className="mt-8 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-navy-950 block">Prefer to Discuss in Person?</span>
              <span>Visit our Surat Head Office: 7, E-Space, VIP Road, Vesu (Near Khatu Shyam Mandir).</span>
            </div>
          </div>

          <a
            href={`tel:${COMPANY_DETAILS.phoneRaw}`}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 transition-colors shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-brand-500" />
            <span>Call: {COMPANY_DETAILS.phone}</span>
          </a>
        </div>

      </div>
    </div>
  );
}
