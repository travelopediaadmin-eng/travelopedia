'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Lock, 
  Globe, 
  Compass, 
  ShieldCheck, 
  Heart, 
  Users, 
  Crown, 
  Plane,
  Building
} from 'lucide-react';
import { COMPANY_DETAILS, getGeneralWhatsAppUrl } from '@/lib/utils';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency, CurrencyCode } from '@/context/CurrencyContext';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  const isHomepage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
      {/* Top Notification Strip (Auto-collapses smoothly on scroll) */}
      <div 
        className={`bg-navy-950 text-slate-300 text-[11px] px-4 border-b border-white/10 transition-all duration-300 overflow-hidden ${
          isScrolled ? 'max-h-0 py-0 opacity-0 pointer-events-none border-b-0' : 'max-h-12 py-1.5 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-logo-coral shrink-0" />
              <span className="truncate">{t('suratOffice')}</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>{t('trustedPartner')}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Switcher Pill */}
            <div className="flex items-center bg-white/10 rounded-full p-0.5 text-[10px] font-bold">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  language === 'en' ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('gu')}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  language === 'gu' ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
                title="ગુજરાતી"
              >
                ગુજરાતી
              </button>
              <button
                type="button"
                onClick={() => setLanguage('hi')}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  language === 'hi' ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-300 hover:text-white'
                }`}
                title="हिंदी"
              >
                हिंदी
              </button>
            </div>

            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
              aria-label="Select Currency"
              className="bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white text-[10px] font-bold rounded-full px-2 py-0.5 border border-white/20 focus:outline-none cursor-pointer transition-colors"
            >
              <option value="INR" className="bg-navy-950 text-white">INR (₹)</option>
              <option value="USD" className="bg-navy-950 text-white">USD ($)</option>
              <option value="EUR" className="bg-navy-950 text-white">EUR (€)</option>
              <option value="AED" className="bg-navy-950 text-white">AED (د.إ)</option>
              <option value="GBP" className="bg-navy-950 text-white">GBP (£)</option>
            </select>

            <span className="text-white/20">|</span>

            <a 
              href={`tel:${COMPANY_DETAILS.phoneRaw}`} 
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-logo-peach" />
              <span className="font-semibold">{COMPANY_DETAILS.phone}</span>
            </a>
            <span className="text-white/20">|</span>
            <Link 
              href="/admin/login" 
              className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors"
              title="Admin Staff Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Cox & Kings Style Navbar */}
      <div 
        className={`w-full transition-all duration-300 ${
          isScrolled || !isHomepage
            ? 'bg-white border-b border-slate-200/90 shadow-md py-2.5 sm:py-3'
            : 'bg-white border-b border-slate-200/80 shadow-sm py-3 sm:py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Seamless Luxury Brand Logo with Black Typography & Pastel Elements */}
            <Link href="/" className="flex items-center shrink-0 group py-1 relative">
              <img
                src="/logo.png"
                alt="The TraveloPedia"
                className="relative h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation Links with Dropdowns (Cox & Kings style) */}
            <nav className="hidden lg:flex items-center gap-1">
              
              {/* 1. Ways to Travel */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('ways')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-navy-950 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <span>{t('waysToTravel')}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'ways' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] p-2.5 z-50 text-xs space-y-1"
                    >
                      <Link
                        href="/custom-tour"
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-slate-800 transition-colors"
                      >
                        <Sparkles className="w-4 h-4 text-brand-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold block text-slate-900">Tailor-Made Custom Tours</span>
                          <span className="text-[11px] text-slate-500">Paced exactly to your schedule</span>
                        </div>
                      </Link>

                      <Link
                        href="/themes"
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-slate-800 transition-colors"
                      >
                        <Heart className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold block text-slate-900">Honeymoon &amp; Romantic Escapes</span>
                          <span className="text-[11px] text-slate-500">Private pool villas &amp; sunsets</span>
                        </div>
                      </Link>

                      <Link
                        href="/themes"
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-slate-800 transition-colors"
                      >
                        <Users className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold block text-slate-900">Family &amp; Multi-Gen Vacations</span>
                          <span className="text-[11px] text-slate-500">Relaxed itineraries &amp; Jain meals</span>
                        </div>
                      </Link>

                      <Link
                        href="/themes"
                        className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-slate-800 transition-colors"
                      >
                        <Crown className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                        <div>
                          <span className="font-bold block text-slate-900">Luxury Expeditions</span>
                          <span className="text-[11px] text-slate-500">5-Star resorts &amp; private chauffeurs</span>
                        </div>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 2. Destinations */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('destinations')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-navy-950 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <span>{t('destinations')}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'destinations' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] p-3.5 z-50 text-xs"
                    >
                      <div className="grid grid-cols-2 gap-2 mb-2.5 pb-2.5 border-b border-slate-100">
                        <Link href="/international" className="font-bold text-brand-600 hover:text-brand-700 bg-brand-50/70 hover:bg-brand-50 p-2 rounded-xl text-center transition-colors">
                          International &rarr;
                        </Link>
                        <Link href="/domestic" className="font-bold text-navy-950 hover:text-brand-600 bg-slate-100 hover:bg-slate-200 p-2 rounded-xl text-center transition-colors">
                          Domestic &rarr;
                        </Link>
                      </div>

                      <div className="space-y-1">
                        {[
                          { name: 'Greece & Santorini', slug: 'greece-santorini-caldera-luxury-romance' },
                          { name: 'Dubai & UAE', slug: 'dubai-extravaganza-luxury' },
                          { name: 'Bali & Nusa Penida', slug: 'enchanting-bali-island-escape' },
                          { name: 'Swiss Alps & Paris', slug: 'swiss-paris-european-odyssey' },
                          { name: 'Kashmir Valley & Gulmarg', slug: 'kashmir-paradise-on-earth' },
                          { name: 'Serene Kerala', slug: 'serene-kerala-backwaters-tea-gardens' },
                          { name: 'Royal Rajasthan', slug: 'royal-rajasthan-heritage-trail' },
                          { name: 'Vietnam & Ha Long Bay', slug: 'vietnam-ha-long-bay-luxury-cruise' },
                          { name: 'Himachal Wonderland', slug: 'himachal-scenic-wonderland' },
                        ].map(d => (
                          <Link
                            key={d.slug}
                            href={`/packages/${d.slug}`}
                            className="block p-2 rounded-xl text-slate-700 hover:text-brand-600 hover:bg-slate-50 transition-colors font-semibold"
                          >
                            • {d.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3. Inspiration */}
              <Link
                href="/themes"
                className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-navy-950 hover:bg-slate-50 rounded-xl transition-colors"
              >
                {t('inspiration')}
              </Link>

              {/* 4. About Us */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('about')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-navy-950 hover:bg-slate-50 rounded-xl transition-colors"
                >
                  <span>{t('aboutUs')}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'about' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-0 top-full mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18)] p-2 z-50 text-xs space-y-1"
                    >
                      <Link
                        href="/about"
                        className="block p-2 rounded-xl text-slate-700 hover:text-brand-600 hover:bg-slate-50 transition-colors font-semibold"
                      >
                        Our Surat Agency
                      </Link>
                      <Link
                        href="/contact"
                        className="block p-2 rounded-xl text-slate-700 hover:text-brand-600 hover:bg-slate-50 transition-colors font-semibold"
                      >
                        Visit VIP Road Office
                      </Link>
                      <Link
                        href="/terms"
                        className="block p-2 rounded-xl text-slate-700 hover:text-brand-600 hover:bg-slate-50 transition-colors font-semibold"
                      >
                        Terms &amp; Policies
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 5. My Trip Self-Service Portal Link */}
              <Link
                href="/portal"
                className="px-3 py-2 text-xs sm:text-sm font-bold text-brand-600 hover:text-brand-700 bg-brand-50/70 hover:bg-brand-100/70 rounded-xl transition-colors flex items-center gap-1.5 border border-brand-200/50"
              >
                <Compass className="w-3.5 h-3.5 text-brand-500" />
                <span>{t('myTripPortal')}</span>
              </Link>

            </nav>

            {/* Header Right: Phone & TALK TO A SPECIALIST (Exact Cox & Kings style) */}
            <div className="hidden sm:flex items-center gap-4">
              <a
                href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                className="hidden xl:flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-brand-600 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-brand-500" />
                <span>{COMPANY_DETAILS.phone}</span>
              </a>

              <Link
                href="/custom-tour"
                className="px-6 py-2.5 rounded-full bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-navy-950/20 hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 border border-navy-800"
              >
                {t('talkToSpecialist')}
              </Link>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden absolute inset-x-0 top-full bg-white border-b border-slate-200 p-6 shadow-2xl text-slate-800 max-h-[85vh] overflow-y-auto">
            {/* Mobile Language Switcher */}
            <div className="mb-4 pb-4 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">Language / ભાષા:</span>
              <div className="flex items-center bg-slate-100 rounded-xl p-1 gap-1">
                {(['en', 'gu', 'hi'] as const).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLanguage(l)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      language === l ? 'bg-brand-500 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {l === 'en' ? 'EN' : l === 'gu' ? 'ગુજરાતી' : 'हिंदी'}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Currency Switcher */}
            <div className="mb-4 pb-4 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600">Currency / ચલણ:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-slate-100 text-slate-800 text-xs font-bold rounded-lg px-2.5 py-1 border border-slate-200 focus:outline-none"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="AED">AED (د.إ)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2.5">
              <Link href="/" className="p-2 text-base font-bold text-slate-900 hover:text-brand-600">
                Home
              </Link>
              <Link href="/portal" className="p-2 text-base font-bold text-brand-600 bg-brand-50 rounded-xl flex items-center gap-2">
                <Compass className="w-4 h-4 text-brand-500" />
                <span>{t('myTripPortal')}</span>
              </Link>
              <Link href="/international" className="p-2 text-base font-bold text-slate-900 hover:text-brand-600">
                International Tours
              </Link>
              <Link href="/domestic" className="p-2 text-base font-bold text-slate-900 hover:text-brand-600">
                Domestic Wonders
              </Link>
              <Link href="/themes" className="p-2 text-base font-bold text-slate-900 hover:text-brand-600">
                {t('inspiration')}
              </Link>
              <Link href="/custom-tour" className="p-2 text-base font-bold text-brand-600">
                Custom Tailor-Made Planner
              </Link>
              <Link href="/about" className="p-2 text-base font-bold text-slate-900 hover:text-brand-600">
                {t('aboutUs')}
              </Link>
              <Link href="/contact" className="p-2 text-base font-bold text-slate-900 hover:text-brand-600">
                Contact &amp; VIP Road Office
              </Link>

              <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
                <Link
                  href="/custom-tour"
                  className="w-full py-3 rounded-full bg-navy-950 text-center font-bold text-xs uppercase tracking-wider text-white shadow-lg"
                >
                  {t('talkToSpecialist')}
                </Link>

                <a
                  href={getGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full bg-emerald-500 text-center font-bold text-xs uppercase tracking-wider text-white shadow-lg"
                >
                  Chat on WhatsApp
                </a>

                <div className="text-center text-xs text-slate-500 pt-2">
                  <p className="font-semibold text-slate-800">The TraveloPedia Surat</p>
                  <p>7, E-Space, VIP Road, Vesu</p>
                  <p className="text-brand-600 font-bold mt-1">Call: {COMPANY_DETAILS.phone}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Luxury Brand Gradient Scroll Progress Hairline Indicator */}
      <motion.div
        className="h-[2px] bg-gradient-to-r from-logo-coral via-logo-peach to-logo-lavender origin-left w-full shadow-[0_0_8px_rgba(247,184,176,0.6)]"
        style={{ scaleX }}
      />
    </header>
  );
}
