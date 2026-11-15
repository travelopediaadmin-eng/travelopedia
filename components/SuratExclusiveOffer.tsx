'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gift, 
  Sparkles, 
  Copy, 
  Check, 
  MessageCircle, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Flame
} from 'lucide-react';
import { COMPANY_DETAILS } from '@/lib/utils';

export default function SuratExclusiveOffer() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const promoCode = 'SURATLUXE5000';

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappClaimUrl = `https://wa.me/${COMPANY_DETAILS.phoneRaw}?text=${encodeURIComponent(
    `Hi The TraveloPedia, I just unlocked the Surat VIP Privilege code "${promoCode}" on your website! Please apply ₹5,000 credit towards my upcoming holiday package.`
  )}`;

  return (
    <section className="py-20 bg-gradient-to-b from-white via-[#FAF7F5] to-white relative overflow-hidden">
      
      {/* Background glow circles */}
      <div className="absolute top-1/2 left-10 w-80 h-80 rounded-full bg-logo-lavender/25 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-80 h-80 rounded-full bg-logo-peach/25 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Title */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-logo-coral/20 border border-logo-coral/40 text-logo-coralDeep text-xs font-bold uppercase tracking-wider mb-4">
          <Flame className="w-3.5 h-3.5 fill-logo-coralDeep" />
          <span>Surat Exclusive Privilege</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-logo-charcoal tracking-tight">
          Unlock Your Surat VIP Travel Credit
        </h2>
        <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
          Planning your 2026 family vacation or luxury honeymoon? Tap below to reveal your instant desk discount code.
        </p>

        {/* Interactive Scratch / Reveal Card */}
        <div className="mt-10 max-w-xl mx-auto">
          {!isRevealed ? (
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsRevealed(true)}
              className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-navy-950 via-logo-charcoal to-navy-950 text-white cursor-pointer shadow-2xl border-2 border-dashed border-logo-peach/50 group overflow-hidden"
            >
              {/* Shimmer sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-logo-coral to-logo-peach flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-300">
                  <Gift className="w-10 h-10 text-white" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold font-serif text-logo-peach">
                    Tap to Scratch &amp; Reveal Voucher
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Special welcome privilege for Surat residents visiting our Vesu office or booking online.
                  </p>
                </div>

                <div className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-wider text-amber-300 group-hover:bg-white/20 transition-colors">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tap Here to Unlock (₹5,000 Off)</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="relative p-8 sm:p-10 rounded-3xl bg-white shadow-2xl border-2 border-logo-coralDeep/30 overflow-hidden"
            >
              {/* Confetti particles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-logo-coral/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-logo-peach/30 rounded-full blur-2xl" />

              <div className="relative z-10 flex flex-col items-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Privilege Voucher Unlocked!</span>
                </span>

                <h3 className="text-3xl sm:text-4xl font-black font-serif text-logo-charcoal">
                  FLAT ₹5,000 CREDIT
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Valid on any International 5-Star Tour Package with The TraveloPedia Surat.
                </p>

                {/* Promo code pill */}
                <div className="mt-6 flex items-center justify-between gap-3 p-2 pl-6 bg-slate-100 rounded-full border border-slate-300/80 w-full max-w-sm">
                  <span className="font-mono font-extrabold tracking-widest text-lg text-logo-charcoal">
                    {promoCode}
                  </span>

                  <button
                    onClick={handleCopy}
                    className="px-5 py-2.5 rounded-full bg-logo-charcoal hover:bg-black text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Claim CTA on WhatsApp */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3 w-full max-w-md">
                  <a
                    href={whatsappClaimUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/25 transition-transform active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Claim on WhatsApp Now</span>
                  </a>

                  <button
                    onClick={() => setIsRevealed(false)}
                    className="py-3 px-4 rounded-full text-slate-500 hover:text-slate-800 text-xs font-semibold"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-4 flex items-center gap-4 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-500" />
                    Expires in 7 days
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    1 Voucher per family
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
