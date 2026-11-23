'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  MessageCircle, 
  Phone, 
  RotateCw, 
  ArrowRight,
  ShieldCheck,
  Compass,
  MapPin,
  Calendar,
  Users
} from 'lucide-react';
import { COMPANY_DETAILS } from '@/lib/utils';
import { TravelRequest } from '@/types/supabase';

type VerifyState = 'loading' | 'success' | 'failed' | 'expired' | 'pending';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get('request_id');
  const token = searchParams.get('token');
  const emailParam = searchParams.get('email');
  const tokenHash = searchParams.get('token_hash');
  const supabaseType = searchParams.get('type') || 'signup';

  const [state, setState] = useState<VerifyState>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [requestData, setRequestData] = useState<TravelRequest | null>(null);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    // If neither token nor token_hash is provided, but request_id exists -> show pending
    if (requestId && !token && !tokenHash && typeof window !== 'undefined' && !window.location.hash) {
      setState('pending');
      return;
    }

    // Check for Supabase hash fragment #access_token=... or token_hash in query
    let hashTokenHash = tokenHash;
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      if (accessToken) {
        hashTokenHash = accessToken;
      }
    }

    if (!requestId && !token && !hashTokenHash) {
      setState('failed');
      setErrorMessage('Invalid verification link. No request identifier was found.');
      return;
    }

    verifyToken(hashTokenHash);
  }, [requestId, token, tokenHash]);

  const verifyToken = async (activeHash?: string | null) => {
    setState('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/requests/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request_id: requestId,
          token: token || undefined,
          supabase_token_hash: activeHash || undefined,
          supabase_type: supabaseType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.expired) {
          setState('expired');
          setErrorMessage(data.error || 'Your verification link has expired.');
        } else {
          setState('failed');
          setErrorMessage(data.error || 'Verification failed. The link may be invalid or already used.');
        }
        return;
      }

      setRequestData(data.request);
      setState('success');
    } catch (err: any) {
      setState('failed');
      setErrorMessage('A network error occurred while verifying. Please check your internet and retry.');
    }
  };

  const handleResend = async () => {
    if (!requestId || isResending) return;
    setIsResending(true);
    setResendSuccess(false);

    try {
      const res = await fetch('/api/requests/resend-verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request_id: requestId }),
      });
      const data = await res.json();
      if (res.ok) {
        setResendSuccess(true);
      } else {
        alert(data.error || 'Failed to resend email');
      }
    } catch (err) {
      alert('Network error while resending.');
    } finally {
      setIsResending(false);
    }
  };

  const whatsappMessage = requestData
    ? `Hi The TraveloPedia, I just verified my enquiry (${requestData.request_number}) for ${requestData.destination}. Please connect me with my Surat travel concierge.`
    : `Hi The TraveloPedia, I verified my travel enquiry on your website. Please assist me.`;
  const whatsappUrl = `https://wa.me/${COMPANY_DETAILS.phoneRaw}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-slate-50 min-h-[85vh] py-12 sm:py-20 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full">

        {/* 1. LOADING STATE */}
        {state === 'loading' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200/90 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-brand-600 flex items-center justify-center mx-auto mb-5 border border-amber-200">
              <RotateCw className="w-8 h-8 animate-spin text-brand-500" />
            </div>
            <h2 className="text-2xl font-bold font-serif text-navy-950 mb-2">
              Verifying Your Travel Request
            </h2>
            <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
              Validating your secure confirmation token with Supabase Authentication. Please wait a moment...
            </p>
          </div>
        )}

        {/* 2. SUCCESS STATE (State B) */}
        {state === 'success' && (
          <div className="bg-white rounded-3xl shadow-2xl border border-emerald-100 overflow-hidden animate-scale-up">
            
            {/* Top Celebration Banner */}
            <div className="bg-gradient-to-br from-navy-950 via-slate-900 to-navy-900 p-8 sm:p-10 text-white text-center border-b border-amber-400/20 relative">
              <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border-2 border-emerald-400/40 text-emerald-300 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-500/10">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-400/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Email Confirmed</span>
              </span>

              <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight">
                Email Verified Successfully!
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                Your travel request has been accepted. Our Surat VIP Road concierge and admin team have received priority email notification.
              </p>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Request Reference Pill */}
              {requestData && (
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200/70 pb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Request ID
                    </span>
                    <span className="font-mono font-bold text-base text-brand-600 bg-brand-50 px-3 py-1 rounded-lg border border-brand-200">
                      {requestData.request_number}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block font-semibold">Destination:</span>
                      <span className="font-bold text-navy-950 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-500" />
                        {requestData.destination}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block font-semibold">Travel Date:</span>
                      <span className="font-bold text-navy-950 flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-500" />
                        {requestData.travel_start_date}
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block font-semibold">Travellers:</span>
                      <span className="font-bold text-navy-950 flex items-center gap-1 mt-0.5">
                        <Users className="w-3.5 h-3.5 text-blue-500" />
                        {requestData.travellers_count} Traveller(s)
                      </span>
                    </div>

                    <div>
                      <span className="text-slate-400 block font-semibold">Status:</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 mt-0.5">
                        NEW • PRIORITY
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* What Happens Next Card */}
              <div className="rounded-2xl p-4 bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-2">
                <span className="font-bold flex items-center gap-1.5 text-amber-900 text-sm">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  What Happens Next?
                </span>
                <p className="leading-relaxed text-amber-900/90">
                  1. Our senior travel architect at <strong>7, E-Space, VIP Road, Vesu</strong> is reviewing hotel availability and flight connects.
                </p>
                <p className="leading-relaxed text-amber-900/90">
                  2. We will contact you with a bespoke day-by-day itinerary tailored to your dietary preferences (Pure Veg / Jain).
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Chat with Surat Concierge on WhatsApp</span>
                </a>

                <div className="flex gap-2">
                  <Link
                    href="/"
                    className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                  >
                    <span>Return to Home</span>
                  </Link>
                  <a
                    href={`tel:${COMPANY_DETAILS.phoneRaw}`}
                    className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-600" />
                    <span>Call Surat Desk</span>
                  </a>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* 3. EXPIRED STATE (State D) */}
        {state === 'expired' && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-amber-200 text-center animate-scale-up">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest block mb-1">
              Link Expired
            </span>
            <h2 className="text-2xl font-bold font-serif text-navy-950 mb-2">
              Verification Link Has Expired
            </h2>
            <p className="text-sm text-slate-600 mb-6 max-w-sm mx-auto leading-relaxed">
              Security links expire after 24 hours. Don&apos;t worry, your travel specifications are saved. You can request a fresh verification link below.
            </p>

            {resendSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs mb-4">
                ✓ A fresh verification link has been sent to your email! Please check your inbox.
              </div>
            ) : (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="w-full py-4 rounded-2xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-navy-950/20 transition-all mb-4"
              >
                <RotateCw className={`w-4 h-4 ${isResending ? 'animate-spin' : ''}`} />
                <span>{isResending ? 'Sending...' : 'Request New Verification Email'}</span>
              </button>
            )}

            <Link
              href="/"
              className="text-xs text-brand-600 hover:underline font-bold inline-block"
            >
              ← Back to The Travelopedia Homepage
            </Link>
          </div>
        )}

        {/* 4. FAILED STATE (State C) */}
        {state === 'failed' && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-red-200 text-center animate-scale-up">
            <div className="w-16 h-16 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">
              Verification Issue
            </span>
            <h2 className="text-2xl font-bold font-serif text-navy-950 mb-2">
              Unable to Verify Email
            </h2>
            <p className="text-sm text-slate-600 mb-6 max-w-sm mx-auto leading-relaxed">
              {errorMessage || 'The verification link may be invalid, expired, or already used.'}
            </p>

            <div className="space-y-3">
              <button
                onClick={() => verifyToken()}
                className="w-full py-3.5 rounded-2xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <RotateCw className="w-4 h-4" />
                <span>Retry Verification</span>
              </button>

              <Link
                href="/custom-tour"
                className="w-full py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center transition-colors block"
              >
                Submit a New Travel Request
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-emerald-700 hover:underline font-bold inline-flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-600" />
                <span>Contact Surat Desk via WhatsApp for Help</span>
              </a>
            </div>
          </div>
        )}

        {/* 5. PENDING DIRECT NAVIGATION (State A) */}
        {state === 'pending' && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200 text-center animate-scale-up">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Clock className="w-8 h-8" />
            </div>

            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
              Enquiry In Progress
            </span>
            <h2 className="text-2xl font-bold font-serif text-navy-950 mb-2">
              Awaiting Email Confirmation
            </h2>
            <p className="text-sm text-slate-600 mb-6 max-w-sm mx-auto leading-relaxed">
              Please check your inbox ({emailParam || 'your registered email'}) and click the confirmation link to finalize your luxury travel request.
            </p>

            {resendSuccess ? (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs mb-4">
                ✓ Verification email resent! Please check your spam/promotions folder.
              </div>
            ) : (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="w-full py-3.5 rounded-2xl bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all mb-3"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                <span>{isResending ? 'Sending...' : 'Resend Verification Email'}</span>
              </button>
            )}

            <Link
              href="/"
              className="text-xs text-brand-600 hover:underline font-bold"
            >
              ← Back to The Travelopedia
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
