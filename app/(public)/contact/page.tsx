'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  Building
} from 'lucide-react';
import { COMPANY_DETAILS, getGeneralWhatsAppUrl } from '@/lib/utils';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    destination: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError('Please provide your name and contact number.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name,
          phone: formData.phone,
          email: formData.email,
          destination: formData.destination || 'General Contact Inquiry',
          packageTitle: 'Contact Form Inquiry',
          specialRequests: formData.message,
          source: 'Contact Form'
        })
      });

      if (!res.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch (err) {
      setError('Unable to send message. Please try again or chat via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-bold uppercase tracking-wider mb-2">
            <Building className="w-3.5 h-3.5" />
            <span>Connect with Us</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-navy-950 tracking-tight">
            Contact Our Surat Travel Desk
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Have a question about a destination or wish to plan an upcoming vacation? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* Contact Details & Office Location Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-navy-950 text-white rounded-3xl p-8 shadow-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
                Surat Head Office
              </span>
              <h2 className="text-2xl font-bold font-serif mb-6">
                The TraveloPedia
              </h2>

              <div className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs font-medium block">Address</span>
                    <p className="font-semibold text-slate-200 mt-0.5 leading-snug">
                      {COMPANY_DETAILS.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs font-medium block">Phone / WhatsApp</span>
                    <a href={`tel:${COMPANY_DETAILS.phoneRaw}`} className="font-bold text-white text-base hover:text-brand-400 transition-colors block mt-0.5">
                      {COMPANY_DETAILS.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs font-medium block">Email Address</span>
                    <a href={`mailto:${COMPANY_DETAILS.email}`} className="font-semibold text-slate-200 hover:text-white transition-colors block mt-0.5">
                      {COMPANY_DETAILS.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs font-medium block">Consultation Hours</span>
                    <p className="text-xs text-slate-300 mt-0.5">
                      {COMPANY_DETAILS.officeHours}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-navy-800 flex flex-col sm:flex-row gap-3">
                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                  className="py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 border border-white/20 transition-all"
                >
                  <Phone className="w-4 h-4 text-brand-400" />
                  <span>Direct Call</span>
                </a>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
              <span>
                Authorized Travel Desk for Gujarat &amp; Mumbai international flights &amp; luxury hotel bookings.
              </span>
            </div>
          </div>

          {/* Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-200/80">
            <h2 className="text-2xl font-bold font-serif text-navy-950 mb-2">
              Send an Inquiry
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Fill out the details below and our destination specialist will contact you with answers and customized itineraries.
            </p>

            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold font-serif text-navy-950">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-600 mt-2 max-w-sm mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our team on VIP Road, Surat has received your note and will be in touch shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', destination: '', message: '' });
                  }}
                  className="mt-6 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 text-xs bg-red-50 text-red-600 rounded-xl border border-red-200">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ketan Vashi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98XXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="ketan@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Destination Interested</label>
                    <input
                      type="text"
                      placeholder="e.g. Dubai, Switzerland, Bali, Kashmir..."
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message / Requirements</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your preferred travel dates, number of travelers, budget or any special requests..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20 disabled:opacity-70 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Sending Message...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Embedded Interactive Google Map */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl font-bold font-serif text-navy-950 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-500" />
                Find Us on VIP Road, Vesu
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                7, E-Space, Near Khatu Shyam Baba Mandir, VIP Road, Vesu, Beside Domino&apos;s Pizza, Surat.
              </p>
            </div>

            <a
              href={COMPANY_DETAILS.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 hover:text-brand-700"
            >
              <span>Open in Google Maps App</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden aspect-[21/9] min-h-[300px] border border-slate-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14885.556740679803!2d72.7788484!3d21.1368943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e38e833b919%3A0xe54e195159f84852!2sVIP%20Road%2C%20Vesu%2C%20Surat%2C%20Gujarat%20395007!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The TraveloPedia Surat Office Location"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
