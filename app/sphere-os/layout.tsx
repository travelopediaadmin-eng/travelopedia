'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Kanban,
  HardDrive,
  CheckCheck,
  Send,
  FileSpreadsheet,
  BarChart3,
  Bot,
  AlertOctagon,
  Settings,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Bell,
  Search,
  Menu,
  X,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  dotColor: string;
  dotGlow: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export default function SphereOSLightLuxuryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [absenceMode, setAbsenceMode] = useState(false);

  const navigationSections: NavSection[] = [
    {
      title: 'WORKSPACE',
      items: [
        {
          name: 'Dashboard',
          href: '/sphere-os',
          icon: LayoutDashboard,
          dotColor: 'bg-purple-400',
          dotGlow: 'shadow-[0_0_8px_rgba(168,85,247,0.8)]',
        },
        {
          name: 'Client Hub',
          href: '/sphere-os/clients',
          icon: Users,
          badge: '15 Active',
          dotColor: 'bg-cyan-400',
          dotGlow: 'shadow-[0_0_8px_rgba(6,182,212,0.8)]',
        },
        {
          name: 'Content Planner',
          href: '/sphere-os/planner',
          icon: Calendar,
          dotColor: 'bg-emerald-400',
          dotGlow: 'shadow-[0_0_8px_rgba(16,185,129,0.8)]',
        },
        {
          name: 'Production Board',
          href: '/sphere-os/my-day',
          icon: Kanban,
          badge: 'Staff',
          dotColor: 'bg-amber-400',
          dotGlow: 'shadow-[0_0_8px_rgba(245,158,11,0.8)]',
        },
        {
          name: 'Asset Vault',
          href: '/sphere-os/assets',
          icon: HardDrive,
          dotColor: 'bg-blue-400',
          dotGlow: 'shadow-[0_0_8px_rgba(59,130,246,0.8)]',
        },
      ],
    },
    {
      title: 'OPERATIONS & TOOLS',
      items: [
        {
          name: 'Quality Gate',
          href: '/sphere-os/qc',
          icon: CheckCheck,
          dotColor: 'bg-emerald-400',
          dotGlow: 'shadow-[0_0_8px_rgba(16,185,129,0.8)]',
        },
        {
          name: 'Publishing Engine',
          href: '/sphere-os/publishing',
          icon: Send,
          dotColor: 'bg-cyan-400',
          dotGlow: 'shadow-[0_0_8px_rgba(6,182,212,0.8)]',
        },
        {
          name: 'Vendor Ledger',
          href: '/sphere-os/vendor-ledger',
          icon: FileSpreadsheet,
          dotColor: 'bg-orange-400',
          dotGlow: 'shadow-[0_0_8px_rgba(249,115,22,0.8)]',
        },
        {
          name: 'Performance & Leads',
          href: '/sphere-os/reports',
          icon: TrendingUp,
          dotColor: 'bg-purple-400',
          dotGlow: 'shadow-[0_0_8px_rgba(168,85,247,0.8)]',
        },
        {
          name: 'Report Studio',
          href: '/sphere-os/client-portal',
          icon: BarChart3,
          dotColor: 'bg-blue-400',
          dotGlow: 'shadow-[0_0_8px_rgba(59,130,246,0.8)]',
        },
      ],
    },
    {
      title: 'INTELLIGENCE & SYSTEM',
      items: [
        {
          name: 'AI Chaser',
          href: '/sphere-os/brand-brain',
          icon: Bot,
          badge: '24/7',
          dotColor: 'bg-purple-400',
          dotGlow: 'shadow-[0_0_8px_rgba(168,85,247,0.8)]',
        },
        {
          name: 'Decision Queue',
          href: '/sphere-os/decisions',
          icon: AlertOctagon,
          badge: '2 Pending',
          dotColor: 'bg-rose-400',
          dotGlow: 'shadow-[0_0_8px_rgba(244,63,94,0.8)]',
        },
        {
          name: '7-Day Launchpad',
          href: '/sphere-os/onboarding',
          icon: ShieldCheck,
          dotColor: 'bg-emerald-400',
          dotGlow: 'shadow-[0_0_8px_rgba(16,185,129,0.8)]',
        },
        {
          name: 'Settings',
          href: '/sphere-os/settings',
          icon: Settings,
          dotColor: 'bg-slate-400',
          dotGlow: 'shadow-[0_0_8px_rgba(148,163,184,0.8)]',
        },
      ],
    },
  ];

  // Flat list for lookups and external compatibility
  const navigationItems = navigationSections.flatMap((section) => section.items);

  // Active navigation lookup
  const currentNav =
    navigationItems.find(
      (item) =>
        pathname === item.href ||
        (item.href !== '/sphere-os' && pathname?.startsWith(item.href))
    ) || navigationItems[0];

  const handleNavClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white/90 flex font-sans antialiased selection:bg-purple-500/30 selection:text-white relative overflow-x-hidden">
      {/* Ambient Radial Gradient Glows in Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 right-1/4 w-[650px] h-[650px] bg-purple-600/[0.07] rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -left-32 w-[550px] h-[550px] bg-cyan-500/[0.05] rounded-full blur-[130px]" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-[140px]" />
      </div>

      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ULTRA-DARK GLASS SIDEBAR (#070A10) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between w-64 bg-[#070A10]/95 backdrop-blur-2xl border-r border-white/[0.06] text-white/80 transition-transform duration-300 ease-out shadow-[4px_0_30px_rgba(0,0,0,0.6)] ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header & Navigation Area */}
        <div className="flex flex-col flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-transparent">
          {/* Brand Logo & Glowing 3D Orb */}
          <div className="p-4 border-b border-white/[0.06] relative">
            <Link
              href="/sphere-os"
              onClick={handleNavClick}
              className="flex items-center gap-3 group"
            >
              {/* Glowing Animated Orb Container */}
              <div className="relative shrink-0">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 opacity-60 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse" />
                <div className="relative w-10 h-10 rounded-2xl bg-[#070A10] border border-white/20 p-[2px] flex items-center justify-center overflow-hidden shadow-2xl">
                  <div className="relative w-full h-full rounded-[14px] bg-gradient-to-br from-purple-900/60 via-[#0A0D14] to-cyan-950/60 flex items-center justify-center overflow-hidden">
                    <div
                      className="absolute w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 via-indigo-400 to-cyan-400 blur-[2px] opacity-90 animate-spin"
                      style={{ animationDuration: '9s' }}
                    />
                    <div className="relative w-4 h-4 rounded-full bg-gradient-to-b from-white/95 via-purple-300 to-indigo-600 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
                    <div className="absolute top-1 left-1.5 w-1 h-1 rounded-full bg-white blur-[0.5px]" />
                  </div>
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-base tracking-tight text-white group-hover:text-purple-300 transition-colors drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
                    Sphere OS
                  </span>
                  <span className="text-[9px] font-extrabold tracking-wider px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
                    PRO
                  </span>
                </div>
                <p className="text-[10px] text-white/50 font-medium tracking-tight truncate">
                  The Operating System for{' '}
                  <span className="text-purple-400 font-semibold">IllustrativeSphere</span>
                </p>
              </div>
            </Link>

            <div className="text-[9px] uppercase tracking-wider text-white/30 font-bold mt-2.5 px-0.5">
              Plan • Create • Manage • Grow
            </div>
          </div>

          {/* Navigation Sections with Dividers */}
          <nav className="p-3 space-y-4">
            {navigationSections.map((section, sIdx) => (
              <div key={section.title || sIdx} className="space-y-1">
                {/* Section Divider Header */}
                <div className="pt-2 pb-1 px-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">
                      {section.title}
                    </span>
                    <div className="w-8 h-[1px] bg-gradient-to-r from-white/[0.08] to-transparent" />
                  </div>
                </div>

                {/* Section Items */}
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      (item.href !== '/sphere-os' && pathname?.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleNavClick}
                        className={`group relative flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 border-l-2 ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-600/20 via-purple-500/10 to-cyan-600/10 text-white border-purple-500 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_4px_16px_rgba(168,85,247,0.15)] font-semibold'
                            : 'text-white/60 hover:text-white hover:bg-white/[0.04] border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Accent dot (Vantage style) */}
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200 ${
                              isActive
                                ? 'bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.9)] scale-110'
                                : `${item.dotColor} ${item.dotGlow} opacity-60 group-hover:opacity-100 group-hover:scale-110`
                            }`}
                          />

                          <Icon
                            className={`w-4 h-4 shrink-0 transition-colors duration-200 ${
                              isActive
                                ? 'text-purple-300'
                                : 'text-white/50 group-hover:text-white/90'
                            }`}
                          />
                          <span className="truncate">{item.name}</span>
                        </div>

                        {/* Optional Badges */}
                        {item.badge && (
                          <div className="shrink-0 ml-1.5">
                            {item.badge.includes('Pending') ? (
                              <span className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-rose-500/15 text-rose-300 border border-rose-500/30 shadow-[0_0_10px_rgba(244,63,94,0.25)]">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                                {item.badge}
                              </span>
                            ) : item.badge === '24/7' ? (
                              <span className="inline-flex items-center text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-purple-500/15 text-purple-300 border border-purple-500/30 shadow-[0_0_8px_rgba(168,85,247,0.2)]">
                                {item.badge}
                              </span>
                            ) : item.badge === '15 Active' ? (
                              <span className="inline-flex items-center text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_8px_rgba(6,182,212,0.2)]">
                                {item.badge}
                              </span>
                            ) : item.badge === 'Staff' ? (
                              <span className="inline-flex items-center text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-[0_0_8px_rgba(245,158,11,0.2)]">
                                {item.badge}
                              </span>
                            ) : (
                              <span className="inline-flex items-center text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-white/[0.08] text-white/70 border border-white/[0.08]">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Feature Pill & User Profile Card */}
        <div className="border-t border-white/[0.06] bg-[#070A10]/95 backdrop-blur-2xl p-3 space-y-2.5">
          {/* What's New? Banner (Untitled UI style) */}
          <div className="p-2.5 rounded-xl bg-gradient-to-b from-white/[0.05] to-white/[0.02] border border-white/[0.08] relative overflow-hidden group">
            <div className="absolute -top-8 -right-8 w-16 h-16 bg-purple-500/20 rounded-full blur-xl group-hover:bg-purple-500/35 transition-all duration-300" />
            <div className="flex items-center gap-2 relative">
              <div className="p-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-[0_0_8px_rgba(168,85,247,0.3)]">
                <Sparkles className="w-3 h-3" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white/90">What&apos;s new?</span>
                  <span className="text-[8px] font-bold text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
                    v2.1
                  </span>
                </div>
                <p className="text-[10px] text-white/40 truncate">AI Brand Brain 2.0 active</p>
              </div>
            </div>
          </div>

          {/* User Profile Card */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] transition-all duration-200">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-[2px] shadow-[0_0_10px_rgba(168,85,247,0.35)]">
                  <div className="w-full h-full bg-[#0A0D14] rounded-full flex items-center justify-center font-black text-[11px] text-white">
                    RS
                  </div>
                </div>
                {/* Green online dot */}
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#070A10] shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
              </div>
              <div className="min-w-0 text-left">
                <div className="text-xs font-bold text-white/90 truncate leading-tight">
                  Rohit Sinha
                </div>
                <div className="text-[10px] text-white/50 font-medium flex items-center gap-1">
                  <span className="text-purple-400 font-semibold">Owner</span>
                  <span>•</span>
                  <span className="text-emerald-400">Online</span>
                </div>
              </div>
            </div>

            {/* Version pill */}
            <span className="px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-[9px] font-mono text-white/60">
              v1.0 Pro
            </span>
          </div>

          {/* Help & Support link */}
          <div className="flex items-center justify-between px-1 text-[11px] text-white/40 hover:text-white/70 transition-colors">
            <Link
              href="/sphere-os/settings"
              onClick={handleNavClick}
              className="flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Help & Support</span>
            </Link>
            <span className="text-[9px] text-white/30 font-mono">SphereOS</span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA - DEEP CHARCOAL CANVAS (#0A0D14) */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 relative z-10">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-40 h-16 border-b border-white/[0.06] bg-[#0A0D14]/80 backdrop-blur-2xl px-4 lg:px-8 flex items-center justify-between gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          {/* Left: Mobile Toggle & Page Title / Breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors"
              aria-label="Toggle navigation"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Dynamic Breadcrumbs */}
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="text-white/40 font-medium">Sphere OS</span>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <div className="flex items-center gap-1.5 text-white/90 font-semibold px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                {currentNav && <currentNav.icon className="w-3.5 h-3.5 text-purple-400" />}
                <span>{currentNav ? currentNav.name : 'Overview'}</span>
              </div>
            </div>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-md mx-2 sm:mx-4">
            <div className="flex items-center gap-2.5 px-3.5 py-2 bg-white/[0.03] hover:bg-white/[0.05] focus-within:bg-white/[0.06] border border-white/[0.08] focus-within:border-purple-500/50 rounded-xl text-xs text-white/50 transition-all duration-200 shadow-inner group">
              <Search className="w-4 h-4 text-white/40 group-focus-within:text-purple-400 transition-colors shrink-0" />
              <input
                type="text"
                placeholder="Search anything... (Ctrl + K)"
                className="bg-transparent focus:outline-none text-white/90 placeholder-white/40 w-full text-xs"
              />
              <div className="hidden md:flex items-center gap-1 shrink-0">
                <kbd className="px-1.5 py-0.5 text-[9px] font-mono text-white/40 bg-white/[0.06] border border-white/[0.08] rounded">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Absence Mode Switch */}
            <button
              onClick={() => setAbsenceMode(!absenceMode)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border backdrop-blur-xl transition-all duration-200 ${
                absenceMode
                  ? 'bg-amber-500/15 text-amber-300 border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                  : 'bg-white/[0.03] text-white/60 border-white/[0.08] hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              <span className="relative flex h-2 w-2">
                {absenceMode && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                )}
                <span
                  className={`relative inline-flex rounded-full h-2 w-2 ${
                    absenceMode ? 'bg-amber-400' : 'bg-white/40'
                  }`}
                />
              </span>
              <span className="hidden md:inline">Absence</span>
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                  absenceMode
                    ? 'bg-amber-400/20 text-amber-200'
                    : 'bg-white/10 text-white/50'
                }`}
              >
                {absenceMode ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Notification Bell with Badge */}
            <button
              className="relative p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] text-white/70 hover:text-white transition-all duration-200 group shadow-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4 transition-transform group-hover:rotate-12 duration-200" />
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-[9px] font-bold text-white ring-2 ring-[#0A0D14] shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse">
                3
              </span>
            </button>

            {/* Header User Profile Badge */}
            <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-white/[0.08]">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 p-[2px] shadow-[0_0_10px_rgba(168,85,247,0.35)]">
                  <div className="w-full h-full bg-[#0A0D14] rounded-full flex items-center justify-center font-bold text-xs text-white">
                    RS
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#0A0D14] shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
              </div>
              <div className="hidden lg:block text-left">
                <div className="text-xs font-bold text-white/90 leading-tight">Rohit Sinha</div>
                <div className="text-[10px] text-white/40 font-medium">Owner</div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="flex-1 p-4 lg:p-6 max-w-[1700px] w-full mx-auto relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
