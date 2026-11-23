'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Filter,
  Film,
  Instagram,
  Youtube,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Send,
  Eye,
} from 'lucide-react';

export default function ContentPlannerPage() {
  const [viewMode, setViewMode] = useState<'Month' | 'Week' | 'Day'>('Month');
  const [selectedClient, setSelectedClient] = useState('All Clients (15)');

  const calendarEvents = [
    {
      day: 24,
      title: 'Goa Travel Ep 01',
      client: 'The Travelopedia',
      platform: 'Instagram Reel',
      time: '06:00 PM',
      color: 'bg-purple-500/15 border-purple-500/30 text-purple-300',
      status: 'Scheduled',
    },
    {
      day: 25,
      title: 'Chef Special Pizza Drop',
      client: 'Veda Café',
      platform: 'Meta Carousel',
      time: '01:00 PM',
      color: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
      status: 'In QC',
    },
    {
      day: 26,
      title: 'Sunset Pool Villa Tour',
      client: 'Orchid Resorts',
      platform: 'YouTube Shorts',
      time: '07:30 PM',
      color: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
      status: 'Ready',
    },
    {
      day: 27,
      title: 'Wedding Diamond Collection',
      client: 'Zaveri Jewellers',
      platform: 'Instagram Reel',
      time: '05:00 PM',
      color: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
      status: 'Draft',
    },
    {
      day: 28,
      title: 'Studio BTS Montage',
      client: 'Studio North',
      platform: 'LinkedIn Post',
      time: '11:00 AM',
      color: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
      status: 'Scheduled',
    },
  ];

  return (
    <div className="space-y-6 max-w-[1700px] mx-auto pb-16 font-sans text-white/90">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-purple-400" />
            Content Planner & Schedule Engine
          </h1>
          <p className="text-xs text-white/40 mt-1 font-medium">
            Multi-client editorial calendar with automated posting, safe zone previews, and Evergreen backup slots.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/sphere-os/brand-brain"
            className="px-3.5 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Idea Generator</span>
          </Link>
          <Link
            href="/sphere-os/publishing"
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-500/25 flex items-center gap-1.5 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Publishing Engine</span>
          </Link>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="bg-white/[0.03] rounded-2xl border border-white/[0.08] p-4 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
        {/* Month Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.06] p-1 rounded-xl">
            <button className="p-1.5 hover:bg-white/[0.08] rounded-lg text-white/60 hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-extrabold text-sm text-white px-3">December 2026</span>
            <button className="p-1.5 hover:bg-white/[0.08] rounded-lg text-white/60 hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button className="text-xs font-bold text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 px-3 py-1.5 rounded-xl border border-purple-500/20 transition-all">
            Today
          </button>
        </div>

        {/* Client & View Mode Toggles */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-1.5 text-xs font-semibold text-white/80 focus:outline-none focus:border-purple-500/50"
          >
            <option className="bg-[#141820]">All Clients (15)</option>
            <option className="bg-[#141820]">The Travelopedia</option>
            <option className="bg-[#141820]">Veda Café</option>
            <option className="bg-[#141820]">Orchid Resorts</option>
            <option className="bg-[#141820]">Studio North</option>
            <option className="bg-[#141820]">Zaveri Jewellers</option>
          </select>

          <div className="flex bg-white/[0.04] border border-white/[0.06] p-1 rounded-xl text-xs font-bold text-white/60">
            {(['Month', 'Week', 'Day'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  viewMode === mode ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40 font-bold' : 'hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Grid (Dark Glass View) */}
      <div className="bg-white/[0.03] rounded-3xl border border-white/[0.08] backdrop-blur-xl shadow-xl overflow-hidden">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-white/[0.06] bg-white/[0.02] text-center text-xs font-bold text-white/40 py-3">
          <span>Monday</span>
          <span>Tuesday</span>
          <span>Wednesday</span>
          <span>Thursday</span>
          <span>Friday</span>
          <span>Saturday</span>
          <span>Sunday</span>
        </div>

        {/* Calendar Cells (4 Weeks) */}
        <div className="grid grid-cols-7 grid-rows-4 divide-x divide-y divide-white/[0.05] text-xs min-h-[500px]">
          {Array.from({ length: 28 }).map((_, idx) => {
            const dayNum = idx + 1;
            const event = calendarEvents.find((e) => e.day === dayNum);
            const isToday = dayNum === 24;

            return (
              <div
                key={idx}
                className={`p-2 min-h-[120px] transition-colors flex flex-col justify-between ${
                  isToday ? 'bg-purple-500/[0.06] border-purple-500/20' : 'hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                      isToday
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/30'
                        : 'text-white/60'
                    }`}
                  >
                    {dayNum}
                  </span>
                  {isToday && (
                    <span className="text-[9px] font-black uppercase text-purple-400 tracking-wider">
                      Today
                    </span>
                  )}
                </div>

                {event && (
                  <div
                    className={`mt-2 p-2 rounded-xl border text-[10px] space-y-1 ${event.color} shadow-lg backdrop-blur-sm hover:scale-[1.02] transition-transform cursor-pointer`}
                  >
                    <div className="font-extrabold truncate text-white">{event.title}</div>
                    <div className="flex items-center justify-between text-[9px] font-semibold opacity-80">
                      <span>{event.client}</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center justify-between pt-1 border-t border-white/[0.08] text-[8px] font-bold">
                      <span>{event.platform}</span>
                      <span className="underline">{event.status}</span>
                    </div>
                  </div>
                )}

                <div className="mt-auto" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
