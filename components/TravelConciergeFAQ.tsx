'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  MessageCircle, 
  PhoneCall, 
  Utensils, 
  ShieldCheck, 
  MapPin, 
  Sparkles,
  Plane
} from 'lucide-react';
import { COMPANY_DETAILS, getGeneralWhatsAppUrl } from '@/lib/utils';

interface FAQItem {
  id: number;
  category: 'general' | 'meals' | 'visa' | 'surat';
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 1,
    category: 'meals',
    question: 'How do pure vegetarian and Jain dietary arrangements work on international tours?',
    answer: 'At The TraveloPedia, culinary peace of mind is our highest priority for Gujarati and Jain travelers. In Europe, Switzerland, Dubai, Bali, and Vietnam, we personally vet partner hotels and restaurants to guarantee pure vegetarian meals prepared without onion, garlic, or root vegetables upon request. On private tours, we can even arrange kitchen access or dedicated Indian specialty catering.'
  },
  {
    id: 2,
    category: 'visa',
    question: 'Do you assist with Schengen, UK, US, and Dubai tourist visas from Surat?',
    answer: 'Yes, 100%. Our dedicated Visa Concierge Desk on VIP Road, Vesu handles complete documentation: dossier preparation, confirmed flight/hotel reservation vouchers, financial scrutiny, cover letters, and priority biometric appointment slots at VFS Ahmedabad, Mumbai, or Pune.'
  },
  {
    id: 3,
    category: 'general',
    question: 'Why are prices shown as "Price on Request" instead of fixed rates?',
    answer: 'Luxury travel is never one-size-fits-all. Real luxury depends on your exact travel dates, airline availability from Surat or Mumbai, preferred room categories (private pool villa vs. mountain view suite), and group size. Rather than showing rigid or outdated prices, we discuss your dates directly and give you the most competitive, transparent quotation.'
  },
  {
    id: 4,
    category: 'surat',
    question: 'Can I visit your office in Surat for personal consultation?',
    answer: 'Absolutely! We welcome you to our physical office at 7, E-Space, Near Khatu Shyam Baba Mandir, VIP Road, Vesu, Surat (beside Domino\'s Pizza). You can sit with our senior travel architects over fresh coffee, view route maps on high-definition displays, and customize your itinerary face-to-face.'
  },
  {
    id: 5,
    category: 'general',
    question: 'Can our tour start directly from Surat Airport (STV) or Mumbai (BOM)?',
    answer: 'Yes. We provide complete end-to-end connectivity. We can book your direct flights from Surat Airport where available, or arrange a private chauffeur in a luxury commercial vehicle (Innova Crysta, Fortuner) directly from your doorstep in Surat to Mumbai Airport Terminal 2.'
  },
  {
    id: 6,
    category: 'visa',
    question: 'What is the token booking and confirmation procedure?',
    answer: 'Once you approve your custom day-by-day PDF itinerary, you can lock your dates and hotel slots with an advance token deposit. You will immediately receive an official branded voucher with a traceable reference number (e.g. TRV-HTL-XXXX) that can be accessed anytime in our Self-Service Portal.'
  },
  {
    id: 7,
    category: 'meals',
    question: 'Are in-flight meals pre-booked with Jain (VJML) or Hindu Veg (AVML) preference?',
    answer: 'Yes. When booking flights through The TraveloPedia, we pre-assign your dietary preferences directly with the airline’s GDS system so you receive your chosen hot meal without asking during flight.'
  },
  {
    id: 8,
    category: 'surat',
    question: 'What emergency support is available while traveling abroad?',
    answer: 'You have direct 24x7 WhatsApp and phone access to your assigned Surat desk concierge. Whether it’s an airline schedule change, luggage query, or hotel check-in assistance, our team actively coordinates with overseas ground partners in real time.'
  }
];

export default function TravelConciergeFAQ() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'meals' | 'visa' | 'surat'>('all');
  const [openIds, setOpenIds] = useState<{ [key: number]: boolean }>({ 1: true, 4: true });
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFAQ = (id: number) => {
    setOpenIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFAQs = FAQS.filter(faq => {
    if (activeCategory !== 'all' && faq.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <section className="py-24 bg-white border-t border-slate-200 relative overflow-hidden">
      
      {/* Decorative Brand Circles */}
      <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-logo-lavender/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-logo-peach/20 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-brand-600" />
            <span>Surat Travel Advisory &amp; FAQ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-navy-950 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about our luxury booking process, pure vegetarian food care abroad, visa assistance, and Surat Vesu desk consultation.
          </p>

          {/* Quick Search Input */}
          <div className="mt-8 max-w-lg mx-auto relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by keyword (e.g. Jain food, Visa, Surat office, Token)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 shadow-sm"
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'meals', label: '🥗 Pure Veg & Jain Meals' },
              { id: 'visa', label: '🛂 Visa & Bookings' },
              { id: 'surat', label: '📍 Surat VIP Road Office' },
            ].map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-navy-950 text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map(faq => {
              const isOpen = !!openIds[faq.id];

              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-serif font-bold text-base sm:text-lg text-navy-950 hover:text-brand-600 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <div className={`p-1 rounded-full bg-slate-100 text-slate-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-brand-50 text-brand-600' : ''
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-3xl border border-slate-200 p-6">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No matching questions found.</p>
              <p className="text-xs text-slate-500 mt-1">Feel free to ask our holiday specialist directly on WhatsApp.</p>
            </div>
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-navy-950 via-slate-900 to-navy-950 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block mb-1">
              Need Personal Guidance?
            </span>
            <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
              Still Have Questions About Your Upcoming Trip?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Connect with our senior holiday architects right now. We are happy to discuss custom dates, pricing &amp; hotel choices.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={getGeneralWhatsAppUrl("Hi The TraveloPedia, I have a few questions regarding holiday packages.")}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg hover:scale-105 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Ask on WhatsApp</span>
            </a>

            <a
              href={`tel:${COMPANY_DETAILS.phoneRaw}`}
              className="py-3 px-5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 border border-white/20 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-amber-300" />
              <span>Call: {COMPANY_DETAILS.phone}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
