'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Compass, Lock, Mail, ArrowRight, ShieldCheck, Key } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let loggedIn = false;
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        if (res.ok) loggedIn = true;
      } catch (apiErr) {
        // Fallback for static hosting
      }

      // Check admin credentials
      const cleanEmail = email.trim().toLowerCase();
      if (!loggedIn && (cleanEmail === 'admin@thetravelopedia.com' || cleanEmail === 'travelo@thetravelopedia.com')) {
        if (password === 'admin123' || password === 'thetravelopedia') {
          loggedIn = true;
        }
      }

      if (loggedIn) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('travelopedia_admin_auth', JSON.stringify({
            email: cleanEmail,
            name: 'The TraveloPedia Admin',
            role: 'superadmin',
            loggedInAt: new Date().toISOString()
          }));
        }
        window.location.href = '/admin/dashboard';
        return;
      }

      throw new Error('Invalid email or password (Use: admin@thetravelopedia.com / admin123)');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setEmail('admin@thetravelopedia.com');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        
        {/* Brand Logo Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2 group">
            <div className="py-2.5 px-5 bg-white rounded-2xl shadow-xl group-hover:scale-105 transition-transform">
              <img
                src="/logo.png"
                alt="The TraveloPedia"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
            <span className="text-[10px] tracking-widest uppercase font-bold text-amber-400 mt-1">
              Surat Admin Management Portal
            </span>
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100">
          <h2 className="text-xl font-bold font-serif text-navy-950">
            Sign In to Admin Dashboard
          </h2>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            Manage packages, customer inquiries, and bookings.
          </p>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="admin@thetravelopedia.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 disabled:opacity-70 transition-all mt-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Fill Credentials Helper */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="w-full py-2.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center gap-1.5 border border-amber-200 transition-colors"
            >
              <Key className="w-3.5 h-3.5 text-amber-600" />
              <span>Fill Default Demo Credentials</span>
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              Default: <strong>admin@thetravelopedia.com</strong> / <strong>admin123</strong>
            </p>
          </div>

        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link href="/" className="text-xs text-slate-400 hover:text-white transition-colors">
            &larr; Return to The TraveloPedia Public Website
          </Link>
        </div>

      </div>
    </div>
  );
}
