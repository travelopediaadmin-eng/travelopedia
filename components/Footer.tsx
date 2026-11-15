import React from 'react';
import Link from 'next/link';
import { 
  Compass, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Award, 
  HeartHandshake, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { COMPANY_DETAILS, getGeneralWhatsAppUrl } from '@/lib/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const internationalLinks = [
    { label: 'Greece & Santorini Caldera', href: '/packages/greece-santorini-caldera-luxury-romance' },
    { label: 'Dubai Extravaganza', href: '/packages/dubai-extravaganza-luxury' },
    { label: 'Enchanting Bali', href: '/packages/enchanting-bali-island-escape' },
    { label: 'Swiss Alps & Paris Odyssey', href: '/packages/swiss-paris-european-odyssey' },
    { label: 'Vietnam & Ha Long Bay', href: '/packages/vietnam-ha-long-bay-luxury-cruise' },
    { label: 'All International Tours', href: '/international' },
  ];

  const domesticLinks = [
    { label: 'Kashmir Paradise & Gondola', href: '/packages/kashmir-paradise-on-earth' },
    { label: 'Royal Rajasthan Palaces', href: '/packages/royal-rajasthan-heritage-trail' },
    { label: 'Serene Kerala Backwaters', href: '/packages/serene-kerala-backwaters-tea-gardens' },
    { label: 'Himachal Wonderland', href: '/packages/himachal-scenic-wonderland' },
    { label: 'All Domestic Tours', href: '/domestic' },
  ];

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Custom Tour Planner', href: '/custom-tour' },
    { label: 'Holiday Themes', href: '/themes' },
    { label: 'About Our Surat Agency', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Admin Login', href: '/admin/login' },
  ];

  const policies = [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Cancellation & Refund Policy', href: '/cancellation-policy' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
  ];

  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-8 border-t border-navy-800">
      {/* Trust Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-navy-800/80">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-navy-900/50 border border-navy-800/80">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">Cox &amp; Kings Inspired Luxury</h4>
              <p className="text-slate-400 text-sm mt-1">Curated 4-star and 5-star handpicked stays with premium private transfers and seamless execution.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-navy-900/50 border border-navy-800/80">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">Surat&apos;s Local Presence</h4>
              <p className="text-slate-400 text-sm mt-1">Walk into our VIP Road, Vesu head office anytime to sit with our destination specialists face-to-face.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-2xl bg-navy-900/50 border border-navy-800/80">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">24x7 Dedicated Travel Desk</h4>
              <p className="text-slate-400 text-sm mt-1">From airport pickup to check-out, our personal holiday concierges are on standby round the clock.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          
          {/* Brand & Address Column */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <Link href="/" className="inline-block py-2 px-4 rounded-2xl bg-white shadow-lg group">
                <img
                  src="/logo.png"
                  alt="The TraveloPedia"
                  className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed pr-4">
              The TraveloPedia is Surat&apos;s premier bespoke holiday agency. We engineer personalized journeys, luxury honeymoon retreats, and premium family itineraries across the globe.
            </p>

            {/* Address box */}
            <div className="space-y-3 pt-2 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  {COMPANY_DETAILS.address}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-500 shrink-0" />
                <a href={`tel:${COMPANY_DETAILS.phoneRaw}`} className="text-white font-semibold hover:text-brand-400 transition-colors">
                  {COMPANY_DETAILS.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-500 shrink-0" />
                <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-slate-300 hover:text-white transition-colors">
                  {COMPANY_DETAILS.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-slate-400 text-xs">
                  {COMPANY_DETAILS.officeHours}
                </span>
              </div>
            </div>

            {/* Google Map Link */}
            <div className="pt-2">
              <a
                href={COMPANY_DETAILS.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 bg-navy-900 px-3.5 py-2 rounded-lg border border-navy-800 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open Surat Office on Google Maps</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>

          {/* International Packages Column */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-serif">International Tours</h4>
            <ul className="space-y-2.5 text-sm">
              {internationalLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-slate-400 hover:text-brand-400 flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-navy-600" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Domestic Tours Column */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-serif">Domestic Wonders</h4>
            <ul className="space-y-2.5 text-sm">
              {domesticLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-slate-400 hover:text-brand-400 flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-navy-600" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick & Policy Links Column */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider font-serif">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors">
                    <ChevronRight className="w-3.5 h-3.5 text-navy-600" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-navy-800">
              <h5 className="text-xs uppercase font-bold text-slate-400 mb-2">Legal &amp; Policies</h5>
              <ul className="space-y-1.5 text-xs">
                {policies.map((pol) => (
                  <li key={pol.label}>
                    <Link href={pol.href} className="text-slate-400 hover:text-brand-400 transition-colors">
                      {pol.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-navy-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} The TraveloPedia. All rights reserved. Surat, Gujarat, India.
          </p>
          <div className="flex items-center gap-4">
            <span>GST Registered &amp; Verified Travel Planner</span>
            <span>•</span>
            <Link href="/admin/login" className="hover:text-slate-300 transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
