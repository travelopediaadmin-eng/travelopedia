'use client';

import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, MessageCircle, Phone, Calendar, User, Mail, Sparkles, ShieldCheck } from 'lucide-react';
import { TravelPackage } from '@/types/travel';
import { COMPANY_DETAILS, getWhatsAppInquiryUrl } from '@/lib/utils';
import EmailVerificationPendingModal from '@/components/EmailVerificationPendingModal';

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
    hotelCategory: '5-Star Luxury',
    estimatedBudget: '',
    dietaryPreference: 'Jain Friendly',
    departureCity: 'Surat',
    flightAssistance: true,
    specialRequests: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Verification Pending State
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [pendingRequestId, setPendingRequestId] = useState('');
  const [pendingRequestNumber, setPendingRequestNumber] = useState('');
  const [pendingEmail, setPendingEmail] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    setError('');
    setShowPendingModal(false);
    setLoading(false);
    setFormData({
      customerName: '',
      phone: '',
      email: '',
      travelDate: '',
      adults: '2',
      children: '0',
      hotelCategory: '5-Star Luxury',
      estimatedBudget: '',
      dietaryPreference: 'Jain Friendly',
      departureCity: 'Surat',
      flightAssistance: true,
      specialRequests: ''
    });
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, pkg, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName || !formData.phone) {
      setError('Please provide your full name and phone number.');
      return;
    }

    if (!formData.email || !formData.email.includes('@')) {
      setError('Please provide a valid email address for itinerary verification.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const destination = pkg?.destination || 'Custom Luxury Destination';
      const requirements = [
        `Package: ${pkg?.title || 'Custom Request'}`,
        `Hotel: ${formData.hotelCategory}`,
        `Travelers: ${formData.adults} Adults, ${formData.children} Children`,
        `Dietary: ${formData.dietaryPreference}`,
        `Departure: ${formData.departureCity}`,
        formData.specialRequests ? `Special notes: ${formData.specialRequests}` : null
      ].filter(Boolean).join(' | ');

      // Save directly into local CRM store for 15-40 staff management
      if (typeof window !== 'undefined') {
        try {
          const existingStr = localStorage.getItem('travelopedia_enquiries');
          const existing = existingStr ? JSON.parse(existingStr) : [];
          const newLead = {
            id: `enq-${Date.now()}`,
            createdAt: new Date().toISOString(),
            customerName: formData.customerName,
            phone: formData.phone,
            email: formData.email,
            packageId: pkg?.id,
            packageTitle: pkg?.title || 'Custom Tour',
            destination: destination,
            travelDate: formData.travelDate || 'Flexible',
            durationDays: pkg ? `${pkg.durationDays} Days` : 'Custom Duration',
            adults: Number(formData.adults) || 2,
            children: Number(formData.children) || 0,
            hotelCategory: formData.hotelCategory,
            estimatedBudget: formData.estimatedBudget || (pkg ? `₹${(pkg.discountedPrice * 2).toLocaleString('en-IN')}` : '₹2,00,000'),
            dietaryPreference: formData.dietaryPreference,
            flightAssistance: formData.flightAssistance,
            departureCity: formData.departureCity,
            dealValue: pkg ? pkg.discountedPrice * (Number(formData.adults) || 2) : 200000,
            advancePaid: 0,
            paymentStatus: 'Unpaid',
            status: 'New',
            source: pkg ? 'Package Page' : 'Quick Inquiry',
            specialRequests: formData.specialRequests,
            notes: `Website Lead. Food: ${formData.dietaryPreference}, City: ${formData.departureCity}`
          };
          localStorage.setItem('travelopedia_enquiries', JSON.stringify([newLead, ...existing]));
        } catch (localErr) {
          console.warn('Local CRM save notice:', localErr);
        }
      }

      const res = await fetch('/api/requests/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.customerName,
          customer_mobile: formData.phone,
          customer_email: formData.email,
          destination,
          travel_start_date: formData.travelDate || 'Flexible',
          travellers_count: Number(formData.adults) || 2,
          budget: formData.estimatedBudget || 'Flexible / Discuss on Call',
          requirements,
          source: pkg ? `Package Page: ${pkg.title}` : 'Quick Inquiry Modal'
        })
      });

      if (res.ok) {
        const data = await res.json();
        setPendingRequestId(data.requestId);
        setPendingRequestNumber(data.requestNumber);
        setPendingEmail(data.email);
        setShowPendingModal(true);
      } else {
        // Fallback for static hosting: direct WhatsApp confirmation
        const directMsg = `Namaste The TraveloPedia! I have submitted an inquiry for ${destination} for ${formData.adults} Adults. Contact: ${formData.customerName} (${formData.phone}), Food: ${formData.dietaryPreference}. Please share the luxury itinerary.`;
        window.open(`https://wa.me/${COMPANY_DETAILS.phoneRaw}?text=${encodeURIComponent(directMsg)}`, '_blank');
        onClose();
      }
    } catch (err: any) {
      // Fallback for static hosting
      const directMsg = `Namaste The TraveloPedia! I have submitted an inquiry for ${pkg?.destination || 'Custom Destination'} for ${formData.adults} Adults. Contact: ${formData.customerName} (${formData.phone}), Food: ${formData.dietaryPreference}. Please share the luxury itinerary.`;
      window.open(`https://wa.me/${COMPANY_DETAILS.phoneRaw}?text=${encodeURIComponent(directMsg)}`, '_blank');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const packageTitle = pkg ? pkg.title : 'Custom Luxury Holiday Enquiry';
  const duration = pkg ? `${pkg.durationNights}N / ${pkg.durationDays}D` : 'Bespoke Duration';
  const whatsappUrl = getWhatsAppInquiryUrl(packageTitle, duration);

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fade-in"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-scale-up">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-navy-950 to-navy-900 p-6 text-white relative">
            <button
              onClick={onClose}
              type="button"
              aria-label="Close enquiry form"
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Luxury Consultation</span>
            </div>
            <h3 className="font-serif font-bold text-xl text-white">
              {pkg ? 'Request Custom Itinerary & Quote' : 'Plan Your Bespoke Holiday'}
            </h3>
            <p className="text-xs text-slate-300 mt-1 line-clamp-1">
              {pkg ? pkg.title : 'Connect with our Surat VIP Road travel specialists'}
            </p>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
                  {error}
                </div>
              )}

              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Shah"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>
                </div>
              </div>

              {/* Email & Travel Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address * <span className="text-[10px] text-brand-600 font-semibold">(Verification Required)</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="rajesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tentative Travel Date</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={formData.travelDate}
                      onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
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

              {/* Dietary & Departure City Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Dietary Preference</label>
                  <select
                    value={formData.dietaryPreference}
                    onChange={(e) => setFormData({ ...formData, dietaryPreference: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-emerald-700 focus:outline-none"
                  >
                    <option value="Jain Friendly">Jain Friendly (No Onion/Garlic/Potato)</option>
                    <option value="Pure Vegetarian">Pure Vegetarian (Indian Veg Meals)</option>
                    <option value="Regular / Any">Regular / Any Meals</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Departure City</label>
                  <select
                    value={formData.departureCity}
                    onChange={(e) => setFormData({ ...formData, departureCity: e.target.value })}
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                  >
                    <option value="Surat">Surat (STV / Direct / Connecting)</option>
                    <option value="Mumbai">Mumbai (BOM Airport / Chhatrapati Shivaji)</option>
                    <option value="Ahmedabad">Ahmedabad (AMD Airport)</option>
                    <option value="Delhi">Delhi (DEL Airport)</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Special Requirements (e.g. Jain / Pure Veg, Flight assistance)</label>
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
                  className="flex-1 py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 disabled:opacity-70 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting & Verifying...' : 'Submit & Verify Email'}</span>
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

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Protected by Supabase Auth Email Verification. Zero spam.</span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Verification Pending Modal */}
      {showPendingModal && (
        <EmailVerificationPendingModal
          isOpen={showPendingModal}
          onClose={() => {
            setShowPendingModal(false);
            onClose();
          }}
          requestId={pendingRequestId}
          requestNumber={pendingRequestNumber}
          email={pendingEmail}
          onEmailChanged={(newE) => setPendingEmail(newE)}
        />
      )}
    </>
  );
}
