'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, MessageCircle, Phone, Calendar, User, Mail, Sparkles } from 'lucide-react';
import { TravelPackage } from '@/types/travel';
import { COMPANY_DETAILS, getWhatsAppInquiryUrl } from '@/lib/utils';

interface QuickEnquiryModalProps {
  pkg?: TravelPackage | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickEnquiryModal({ pkg, isOpen, onClose }: QuickEnquiryModalProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    travelDate: '',
    adults: '2',
    children: '0',
    hotelCategory: '4-Star',
    estimatedBudget: '',
    specialRequests: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setError('');
    }
  }, [isOpen, pkg]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone) {
      setError('Please provide your name and phone number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          packageId: pkg?.id,
          packageTitle: pkg?.title || 'Custom Travel Enquiry',
          destination: pkg?.destination || 'Requested Destination',
          source: pkg ? 'Package Page' : 'Quick Inquiry'
        })
      });

      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch (err: any) {
      setError('Unable to send inquiry. Please try again or chat via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const packageTitle = pkg ? pkg.title : 'Custom Luxury Holiday Enquiry';
  const duration = pkg ? `${pkg.durationNights}N / ${pkg.durationDays}D` : 'Bespoke Duration';
  const whatsappUrl = getWhatsAppInquiryUrl(packageTitle, duration);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-scale-up">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-950 to-navy-900 text-white p-6 relative">
          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-500/20 text-amber-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Surat Travel Specialist</span>
          </div>

          <h3 className="text-xl font-bold font-serif text-white">
            {pkg ? 'Enquire About This Tour' : 'Plan Your Dream Vacation'}
          </h3>
          <p className="text-xs text-slate-300 mt-1 line-clamp-1">
            {packageTitle}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-navy-950 font-serif">Inquiry Received!</h4>
              <p className="text-sm text-slate-600 mt-2 max-w-sm mx-auto">
                Thank you, <strong>{formData.customerName}</strong>! Our destination expert from our Surat office will connect with you within 30 minutes.
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Instant Follow-up on WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-xs bg-red-50 text-red-600 rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Shah"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>
                </div>
              </div>

              {/* Email & Travel Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email (Optional)</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="rajesh@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Approx. Travel Date</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>
                </div>
              </div>

              {/* Adults, Children, Hotel preference */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Adults</label>
                  <select
                    value={formData.adults}
                    onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, '10+'].map(n => (
                      <option key={n} value={n}>{n} Adult{n !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Children</label>
                  <select
                    value={formData.children}
                    onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  >
                    {[0, 1, 2, 3, 4].map(n => (
                      <option key={n} value={n}>{n} Kid{n !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Hotel Category</label>
                  <select
                    value={formData.hotelCategory}
                    onChange={(e) => setFormData({ ...formData, hotelCategory: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  >
                    <option value="4-Star">4-Star Deluxe</option>
                    <option value="5-Star">5-Star Luxury</option>
                    <option value="3-Star">3-Star Standard</option>
                    <option value="Private Villa">Private Pool Villa</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Special Requirements (e.g. Jain / Veg food, flights, etc.)</label>
                <textarea
                  rows={2}
                  placeholder="Tell us if you require pure vegetarian/Jain food, specific flight timings from Surat or Mumbai..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 disabled:opacity-70 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting...' : 'Request Detailed Itinerary'}</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                  title="Direct WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 fill-emerald-600 text-emerald-600" />
                </a>
              </div>

              <p className="text-[11px] text-slate-400 text-center">
                🔒 Your privacy is 100% protected. No spam. Direct consultation from Surat desk.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
