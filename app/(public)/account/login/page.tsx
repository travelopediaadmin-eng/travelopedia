'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Lock, 
  Mail, 
  Phone, 
  Compass, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight,
  Sparkles 
} from 'lucide-react';

export default function CustomerLoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login and redirect to portal
    try {
      localStorage.setItem('travelopedia_customer', JSON.stringify({
        email: email || 'ketan.vashi@gmail.com',
        name: fullName || 'Mr. Ketan Vashi',
        phone: phone || '+91 98251 12345'
      }));
    } catch {
      // ignore
    }
    router.push('/portal?ref=TRV-2026-881');
  };

  const handleDemoLogin = () => {
    try {
      localStorage.setItem('travelopedia_customer', JSON.stringify({
        email: 'ketan.vashi@gmail.com',
        name: 'Mr. Ketan & Ami Vashi',
        phone: '+91 98251 12345'
      }));
    } catch {
      // ignore
    }
    router.push('/portal?ref=TRV-2026-881');
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Customer Account</span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl">
          
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-3">
              <Compass className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">
              {mode === 'login' ? 'Customer Account Sign In' : 'Create New Account'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Access your confirmed bookings, visa files, and digital vouchers.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-100 rounded-full p-1 text-xs font-bold mb-6">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-2 rounded-full transition-all text-center ${
                mode === 'login' ? 'bg-white text-navy-950 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 py-2 rounded-full transition-all text-center ${
                mode === 'register' ? 'bg-white text-navy-950 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Full Legal Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ketan Vashi"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="ketan.vashi@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">WhatsApp Mobile</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98251 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-navy-950 hover:bg-navy-900 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95"
            >
              {mode === 'login' ? 'Sign In & Open My Trips' : 'Complete Registration'}
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-400 block mb-2.5">
              Testing the platform?
            </span>
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>1-Click Demo Login (Ketan Vashi • Greece Trip)</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
