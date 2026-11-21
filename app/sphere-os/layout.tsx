'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShieldAlert,
  Calendar,
  CheckCircle2,
  Video,
  FileSpreadsheet,
  BrainCircuit,
  SlidersHorizontal,
  Bell,
  Sparkles,
  UserCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export default function SphereOSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [absenceMode, setAbsenceMode] = useState(false);
  const [activeRole, setActiveRole] = useState<'Founder' | 'Ops Lead' | 'Saakshi' | 'Riddhi' | 'Anjali' | 'Client'>('Founder');
  const [showNotification, setShowNotification] = useState(false);

  const navItems = [
    { name: 'Command Center', href: '/sphere-os', icon: SlidersHorizontal },
    { name: 'My Day (Staff)', href: '/sphere-os/my-day', icon: CheckCircle2, badge: '3 Tasks' },
    { name: 'Client Portal', href: '/sphere-os/client-portal', icon: Video, badge: 'Pending Approval' },
    { name: 'Vendor Ledger & Ingest', href: '/sphere-os/vendor-ledger', icon: FileSpreadsheet },
    { name: 'Brand Brain & Vault', href: '/sphere-os/brand-brain', icon: BrainCircuit },
    { name: '7-Day Launchpad', href: '/sphere-os/onboarding', icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Top Bar / Global System Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Logo & Agency Identity */}
          <div className="flex items-center gap-3">
            <Link href="/sphere-os" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 via-orange-500 to-amber-400 p-[2px] shadow-lg shadow-rose-950/40">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center group-hover:bg-slate-900 transition-colors">
                  <Sparkles className="w-4 h-4 text-rose-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold tracking-tight text-white text-base">Sphere OS</span>
                  <span className="px-1.5 py-0.5 text-[10px] uppercase font-semibold tracking-wider rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    IllustrativeSphere
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Operating System • 15 Retainer Clients</p>
              </div>
            </Link>
          </div>

          {/* Center / Action Bar: Role Switcher & Absence Mode */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Absence Mode Switch */}
            <button
              onClick={() => setAbsenceMode(!absenceMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                absenceMode
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-lg shadow-amber-950/30'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  absenceMode ? 'bg-amber-400 animate-pulse' : 'bg-slate-500'
                }`}
              />
              <span>Absence Mode {absenceMode ? 'ON' : 'OFF'}</span>
            </button>

            {/* Quick Role Switcher */}
            <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 p-1 rounded-xl text-xs">
              <span className="text-[11px] text-slate-400 px-2 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5 text-slate-400" /> Role:
              </span>
              {(['Founder', 'Ops Lead', 'Saakshi', 'Riddhi', 'Client'] as const).map((role) => (
                <button
                  key={role}
                  onClick={() => setActiveRole(role)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    activeRole === role
                      ? 'bg-rose-500 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            {/* Notifications Alert Bell */}
            <button
              onClick={() => setShowNotification(!showNotification)}
              className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
              title="Chaser Alerts"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-slate-950" />
            </button>
          </div>
        </div>

        {/* Chaser Alert Banner (if absence mode or urgent notification) */}
        {absenceMode && (
          <div className="max-w-7xl mx-auto mt-2.5 px-3 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <strong>Absence Mode Active:</strong> Founder escalations are auto-delegated to Ops Lead. Only critical budget overages reach your phone.
            </span>
            <span className="text-[11px] text-amber-400/80">Chaser Safety Net Engaged</span>
          </div>
        )}
      </header>

      {/* Navigation Sub-header / Pill Bar */}
      <nav className="border-b border-slate-800/60 bg-slate-900/50 px-4 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-400' : 'text-slate-500'}`} />
                <span>{item.name}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      isActive ? 'bg-rose-500 text-white' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Page Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8">
        {children}
      </main>

      {/* Footer System Status Bar */}
      <footer className="border-t border-slate-900 bg-slate-950 px-4 py-3 text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Chaser Engine: <strong>Watching 24/7</strong></span>
            </span>
            <span>•</span>
            <span>Work-Back Protocol: <strong>D-14 to D active</strong></span>
            <span>•</span>
            <span>Evergreen Bank: <strong>28 fallback reels locked</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span>Role active: <strong className="text-slate-300">{activeRole}</strong></span>
            <span>•</span>
            <span>API Throttler: <span className="text-emerald-400">4.2 req/s safe</span></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
