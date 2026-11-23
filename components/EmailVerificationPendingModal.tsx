'use client';

import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Clock, 
  RotateCw, 
  Edit3, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ShieldCheck, 
  ExternalLink,
  MessageCircle,
  Phone
} from 'lucide-react';
import { COMPANY_DETAILS } from '@/lib/utils';

interface EmailVerificationPendingModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestId: string;
  requestNumber?: string;
  email: string;
  onEmailChanged?: (newEmail: string) => void;
}

export default function EmailVerificationPendingModal({
  isOpen,
  onClose,
  requestId,
  requestNumber,
  email: initialEmail,
  onEmailChanged,
}: EmailVerificationPendingModalProps) {
  const [email, setEmail] = useState(initialEmail);
  const [cooldown, setCooldown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Change Email state
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmailInput, setNewEmailInput] = useState('');
  const [isSubmittingChange, setIsSubmittingChange] = useState(false);

  useEffect(() => {
    setEmail(initialEmail);
    setNewEmailInput(initialEmail);
  }, [initialEmail]);

  // Cooldown countdown timer
  useEffect(() => {
    if (!isOpen) return;
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, cooldown]);

  if (!isOpen) return null;

  const handleResend = async () => {
    if (cooldown > 0 || isResending) return;

    setIsResending(true);
    setResendStatus(null);

    try {
      const res = await fetch('/api/requests/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request_id: requestId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to resend');
      }

      setResendStatus({
        type: 'success',
        message: data.message || `Verification link resent to ${email}`,
      });
      setCooldown(data.cooldownSeconds || 60);
    } catch (err: any) {
      setResendStatus({
        type: 'error',
        message: err.message || 'Could not resend email. Please try again.',
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleSaveEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newEmailInput.trim().toLowerCase();
    if (!clean || !clean.includes('@')) {
      setResendStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmittingChange(true);
    setResendStatus(null);

    try {
      const res = await fetch('/api/requests/change-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request_id: requestId, new_email: clean }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update email');
      }

      setEmail(clean);
      setIsEditingEmail(false);
      setCooldown(60);
      setResendStatus({
        type: 'success',
        message: `Email updated to ${clean}. Verification email sent!`,
      });
      if (onEmailChanged) onEmailChanged(clean);
    } catch (err: any) {
      setResendStatus({
        type: 'error',
        message: err.message || 'Failed to update email address.',
      });
    } finally {
      setIsSubmittingChange(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-scale-up">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-navy-950 via-slate-900 to-navy-900 p-6 text-white text-center relative border-b border-amber-400/20">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Mail className="w-8 h-8" />
          </div>

          <span className="text-[11px] font-bold text-amber-300 uppercase tracking-widest block mb-1">
            Verification Required
          </span>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
            Please Verify Your Email
          </h3>
          {requestNumber && (
            <p className="text-xs text-slate-400 font-mono mt-1">
              Reference: <span className="text-amber-300 font-bold">{requestNumber}</span>
            </p>
          )}
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 space-y-5">
          
          {/* Target Email Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-xs text-slate-500 block mb-1 font-medium">
              We sent a secure verification link to:
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="font-bold text-navy-950 text-sm sm:text-base break-all">
                {email}
              </span>
              {!isEditingEmail && (
                <button
                  type="button"
                  onClick={() => setIsEditingEmail(true)}
                  className="p-1 rounded-lg text-brand-600 hover:text-brand-700 hover:bg-brand-50 transition-colors"
                  title="Change email"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Change Email Form (Accordion) */}
          {isEditingEmail && (
            <form onSubmit={handleSaveEmail} className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
              <label className="text-xs font-bold text-amber-900 block">
                Update Email Address (Fix Typo):
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={newEmailInput}
                  onChange={(e) => setNewEmailInput(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                />
                <button
                  type="submit"
                  disabled={isSubmittingChange}
                  className="px-4 py-2 bg-navy-950 text-white text-xs font-bold rounded-xl hover:bg-navy-900 transition-colors disabled:opacity-50"
                >
                  {isSubmittingChange ? 'Saving...' : 'Update & Send'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditingEmail(false)}
                  className="px-2 py-2 text-slate-500 hover:text-slate-800 text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* Feedback Alerts */}
          {resendStatus && (
            <div className={`p-3.5 rounded-xl text-xs flex items-start gap-2 ${
              resendStatus.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {resendStatus.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              )}
              <span className="leading-relaxed">{resendStatus.message}</span>
            </div>
          )}

          {/* Instructions List */}
          <div className="space-y-2 text-xs text-slate-600 leading-relaxed bg-white rounded-2xl p-4 border border-slate-100">
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-brand-50 text-brand-600 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
              <span>Open your email inbox and look for email from <strong>The Travelopedia</strong>.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-brand-50 text-brand-600 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
              <span>Click the button <strong>&quot;Verify Email &amp; Confirm Enquiry&quot;</strong>.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-brand-50 text-brand-600 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
              <span>Cannot find it? Please check your <strong>Spam / Promotions</strong> folder.</span>
            </div>
          </div>

          {/* Resend Action with Cooldown */}
          <div className="pt-2 flex flex-col items-center gap-2">
            <button
              onClick={handleResend}
              disabled={cooldown > 0 || isResending}
              className={`w-full py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                cooldown > 0
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  : 'bg-navy-950 hover:bg-navy-900 text-white shadow-md hover:shadow-lg'
              }`}
            >
              <RotateCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
              <span>
                {cooldown > 0
                  ? `Resend Email in ${cooldown}s`
                  : isResending
                  ? 'Resending...'
                  : 'Resend Verification Email'}
              </span>
            </button>
            
            <p className="text-[11px] text-slate-400 text-center">
              Our Surat VIP holiday architect prioritizes your itinerary right after verification.
            </p>
          </div>

          {/* Surat Desk Helpline */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Surat Desk Verified</span>
            </div>
            <a
              href={`https://wa.me/${COMPANY_DETAILS.phoneRaw}?text=${encodeURIComponent(`Hi The Travelopedia, I submitted enquiry ${requestNumber || ''} and need assistance verifying my email.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3 fill-emerald-600" />
              <span>Need Help? Chat on WhatsApp</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
