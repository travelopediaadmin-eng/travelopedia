'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  BarChart3,
  Users,
  Film,
  DollarSign,
  ArrowUpRight,
  Calendar,
  Download,
  Share2,
  Sparkles,
} from 'lucide-react';

export default function ReportsAndPerformancePage() {
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  return (
    <div className="space-y-6 max-w-[1700px] mx-auto pb-16 font-sans text-white/90">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-400" />
            Performance & Lead Analytics
          </h1>
          <p className="text-xs text-white/40 mt-1 font-medium">
            Agency-wide revenue metrics, client engagement scores, reach velocity, and monthly ROI reports.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-2 bg-white/[0.04] border border-white/[0.08] text-white/80 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 hover:bg-white/[0.08] transition-colors">
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-500/25 flex items-center gap-1.5 transition-all">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Monthly Dossier</span>
          </button>
        </div>
      </div>

      {/* 4 Performance KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl overflow-hidden hover:border-white/[0.14] transition-all space-y-1">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-purple-500 to-indigo-500" />
          <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Gross Monthly Revenue</span>
          <div className="text-3xl font-black text-white">₹8,45,000</div>
          <div className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+24% MoM</span>
            <span className="text-white/30 font-normal">• 15 Retainers</span>
          </div>
        </div>

        <div className="relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl overflow-hidden hover:border-white/[0.14] transition-all space-y-1">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-cyan-500 to-blue-500" />
          <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Total Organic Reach</span>
          <div className="text-3xl font-black text-cyan-400">3.84 Million</div>
          <div className="text-xs font-bold text-cyan-400 flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+42% Growth</span>
            <span className="text-white/30 font-normal">• Across Meta & YT</span>
          </div>
        </div>

        <div className="relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl overflow-hidden hover:border-white/[0.14] transition-all space-y-1">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-purple-500 to-pink-500" />
          <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Inbound Leads Generated</span>
          <div className="text-3xl font-black text-purple-400">1,240 Leads</div>
          <div className="text-xs font-bold text-purple-400 flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+18% Conv.</span>
            <span className="text-white/30 font-normal">• WhatsApp / DMs</span>
          </div>
        </div>

        <div className="relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl overflow-hidden hover:border-white/[0.14] transition-all space-y-1">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-emerald-500 to-teal-500" />
          <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Agency Profit Margin</span>
          <div className="text-3xl font-black text-emerald-400">68.2%</div>
          <div className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-1">
            <span>₹5.76L Net Profit</span>
            <span className="text-white/30 font-normal">• Post-Vendor</span>
          </div>
        </div>
      </div>

      {/* Visual Chart & Client Revenue Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Growth Curve */}
        <div className="lg:col-span-8 bg-white/[0.03] rounded-2xl border border-white/[0.08] p-6 backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <h3 className="font-extrabold text-white text-sm">Monthly Revenue & Content Pace</h3>
            <div className="flex items-center gap-3 text-xs font-semibold text-white/40">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                <span>Revenue (₹)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span>Reach Velocity</span>
              </span>
            </div>
          </div>

          <div className="h-64 w-full relative pt-4">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="reportsRevGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#A855F7" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#A855F7" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              <line x1="50" y1="30" x2="590" y2="30" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <line x1="50" y1="80" x2="590" y2="80" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <line x1="50" y1="130" x2="590" y2="130" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <line x1="50" y1="180" x2="590" y2="180" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

              <path
                d="M 60 140 C 140 130, 200 110, 280 85 C 360 60, 440 90, 520 45 L 580 30 L 580 180 L 60 180 Z"
                fill="url(#reportsRevGlow)"
              />
              <path
                d="M 60 140 C 140 130, 200 110, 280 85 C 360 60, 440 90, 520 45 L 580 30"
                fill="none"
                stroke="#A855F7"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle cx="580" cy="30" r="5" fill="#A855F7" stroke="#0A0D14" strokeWidth="2.5" />
            </svg>

            <div className="flex justify-between pl-12 pr-4 text-xs font-semibold text-white/30 pt-2 border-t border-white/[0.04]">
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec (Proj.)</span>
            </div>
          </div>
        </div>

        {/* Top Retainer Breakdown */}
        <div className="lg:col-span-4 bg-white/[0.03] rounded-2xl border border-white/[0.08] p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <h3 className="font-extrabold text-white text-sm">Top Client Accounts</h3>
              <span className="text-xs font-bold text-purple-400">15 Clients</span>
            </div>

            <div className="space-y-3 mt-4">
              {[
                { name: 'Zaveri Jewellers', fee: '₹90,000/mo', share: '10.6%', color: 'from-purple-500 to-indigo-500' },
                { name: 'The Travelopedia', fee: '₹75,000/mo', share: '8.8%', color: 'from-cyan-500 to-blue-500' },
                { name: 'Orchid Resorts', fee: '₹60,000/mo', share: '7.1%', color: 'from-emerald-500 to-teal-500' },
                { name: 'Studio North', fee: '₹50,000/mo', share: '5.9%', color: 'from-amber-500 to-orange-500' },
                { name: 'Veda Café', fee: '₹45,000/mo', share: '5.3%', color: 'from-rose-500 to-pink-500' },
              ].map((c, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-white">{c.name}</span>
                    <span className="text-white/60">{c.fee}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${c.color} rounded-full`} style={{ width: `${parseFloat(c.share) * 5}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/sphere-os/client-portal"
            className="w-full mt-4 py-2.5 text-center text-xs font-bold text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 rounded-xl transition-all block"
          >
            Open Client Dossier Studio →
          </Link>
        </div>
      </div>
    </div>
  );
}
