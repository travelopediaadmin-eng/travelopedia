'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Plus,
  Filter,
  ArrowRight,
  ExternalLink,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  DollarSign,
  TrendingUp,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

export default function ClientHubPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [clients, setClients] = useState([
    {
      id: 'c1',
      name: 'Veda Café',
      handle: '@vedacafe.in',
      category: 'Food & Beverage',
      city: 'Mumbai',
      retainer: 45000,
      status: 'Active',
      deliverablesTarget: 16,
      deliverablesDone: 11,
      healthScore: 92,
      tier: 'Standard Retainer',
      nextDeliverable: '28 Dec 2026',
      contact: 'Aarav Patel (Brand Head)',
      phone: '+91 98201 12345',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      id: 'c2',
      name: 'The Travelopedia',
      handle: '@thetravelopedia',
      category: 'Travel & Tourism',
      city: 'Delhi NCR',
      retainer: 75000,
      status: 'Active',
      deliverablesTarget: 12,
      deliverablesDone: 9,
      healthScore: 98,
      tier: 'Pro Content Pkg',
      nextDeliverable: '30 Dec 2026',
      contact: 'Rohit Sharma (Founder)',
      phone: '+91 98110 54321',
      gradient: 'from-blue-500 to-cyan-600',
    },
    {
      id: 'c3',
      name: 'Orchid Resorts',
      handle: '@orchidresorts',
      category: 'Hospitality',
      city: 'Goa',
      retainer: 60000,
      status: 'Active',
      deliverablesTarget: 14,
      deliverablesDone: 8,
      healthScore: 89,
      tier: 'Growth Retainer',
      nextDeliverable: '02 Jan 2027',
      contact: 'Meera Rao (Marketing Dir)',
      phone: '+91 98330 67890',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      id: 'c4',
      name: 'Studio North',
      handle: '@studionorth.media',
      category: 'Media & Production',
      city: 'Bengaluru',
      retainer: 50000,
      status: 'Active',
      deliverablesTarget: 10,
      deliverablesDone: 7,
      healthScore: 95,
      tier: 'Standard Retainer',
      nextDeliverable: '05 Jan 2027',
      contact: 'Karan Mehra',
      phone: '+91 98450 99887',
      gradient: 'from-purple-500 to-indigo-600',
    },
    {
      id: 'c5',
      name: 'Artisan Bloom',
      handle: '@artisanbloom',
      category: 'Luxury Florals',
      city: 'Jaipur',
      retainer: 35000,
      status: 'Active',
      deliverablesTarget: 8,
      deliverablesDone: 5,
      healthScore: 91,
      tier: 'Starter Pack',
      nextDeliverable: '07 Jan 2027',
      contact: 'Pooja Singhania',
      phone: '+91 98140 33445',
      gradient: 'from-pink-500 to-rose-600',
    },
    {
      id: 'c6',
      name: 'Urban Luxe Living',
      handle: '@urbanluxeliving',
      category: 'Real Estate & Decor',
      city: 'Pune',
      retainer: 55000,
      status: 'On Hold',
      deliverablesTarget: 12,
      deliverablesDone: 4,
      healthScore: 78,
      tier: 'Growth Retainer',
      nextDeliverable: '12 Jan 2027',
      contact: 'Sameer Joshi',
      phone: '+91 98900 11223',
      gradient: 'from-violet-500 to-purple-600',
    },
  ]);

  const filtered = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'All' || c.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 max-w-[1700px] mx-auto pb-16 font-sans text-white/90">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-400" />
            Client Hub
          </h1>
          <p className="text-xs text-white/40 mt-1 font-medium">
            Manage all 15 agency retainers, SLA deliverables, Brand Brain setups, and relationship health.
          </p>
        </div>

        <Link
          href="/sphere-os/onboarding"
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-500/25 flex items-center gap-2 self-start sm:self-auto transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Onboard New Client</span>
        </Link>
      </div>

      {/* KPI Stats - Dark Glass with Left Border Glow */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl overflow-hidden hover:border-white/[0.14] transition-all">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-purple-500 to-indigo-500" />
          <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Total Retainers</span>
          <div className="text-3xl font-black text-white mt-1">15 Active</div>
          <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3 h-3" /> 100% Retainer Retention
          </span>
        </div>

        <div className="relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl overflow-hidden hover:border-white/[0.14] transition-all">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-cyan-500 to-blue-500" />
          <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Monthly Contract Value</span>
          <div className="text-3xl font-black text-white mt-1">₹8,45,000</div>
          <span className="text-[11px] text-cyan-400 font-bold flex items-center gap-1 mt-1">
            Avg. ₹56.3K / Client
          </span>
        </div>

        <div className="relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl overflow-hidden hover:border-white/[0.14] transition-all">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-emerald-500 to-teal-500" />
          <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Avg Agency Health</span>
          <div className="text-3xl font-black text-emerald-400 mt-1">94.2 / 100</div>
          <span className="text-[11px] text-white/40 flex items-center gap-1 mt-1">
            Fast approval velocity
          </span>
        </div>

        <div className="relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl overflow-hidden hover:border-white/[0.14] transition-all">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-orange-500 to-amber-500" />
          <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Content Output</span>
          <div className="text-3xl font-black text-white mt-1">248 Assets</div>
          <span className="text-[11px] text-orange-400 font-bold flex items-center gap-1 mt-1">
            Reels, Carousels & Stories
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white/[0.03] rounded-2xl border border-white/[0.08] p-4 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client name, industry, city..."
            className="w-full pl-9 pr-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50"
          />
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto text-xs font-semibold">
          {(['All', 'Active', 'On Hold'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                filterStatus === st
                  ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40 font-bold'
                  : 'bg-white/[0.03] text-white/50 hover:bg-white/[0.06] hover:text-white border border-white/[0.06]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Client Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="group relative bg-white/[0.03] rounded-2xl border border-white/[0.08] p-5 backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-purple-500/10"
          >
            <div>
              {/* Top row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${c.gradient} text-white font-black text-sm flex items-center justify-center shadow-lg shadow-purple-500/20`}>
                    {c.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm leading-tight group-hover:text-purple-300 transition-colors">{c.name}</h3>
                    <p className="text-[11px] text-white/40 font-medium">{c.handle} • {c.city}</p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    c.status === 'Active'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                  }`}
                >
                  {c.status}
                </span>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2 mt-3 text-[10px] font-semibold text-white/50">
                <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">{c.category}</span>
                <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold">
                  {c.tier}
                </span>
              </div>

              {/* Retainer & Progress */}
              <div className="mt-4 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Retainer Fee:</span>
                  <span className="font-black text-white text-sm">₹{c.retainer.toLocaleString('en-IN')}/mo</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-white/40">Deliverables Pace:</span>
                    <span className="font-bold text-purple-400">
                      {c.deliverablesDone} / {c.deliverablesTarget} Done
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                      style={{
                        width: `${(c.deliverablesDone / c.deliverablesTarget) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-white/40">Next Slot:</span>
                  <span className="font-bold text-white/80">{c.nextDeliverable}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 mt-4 border-t border-white/[0.06] text-xs font-bold">
              <Link
                href="/sphere-os/brand-brain"
                className="text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
              >
                <span>Brand Brain</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/sphere-os/client-portal"
                className="text-white/40 hover:text-white flex items-center gap-1 text-[11px] transition-colors"
              >
                <span>Review Portal</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
