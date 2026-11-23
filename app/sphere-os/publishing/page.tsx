'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Send,
  Calendar,
  Clock,
  Instagram,
  Youtube,
  Facebook,
  Linkedin,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Film,
  Image as ImageIcon,
  Share2,
} from 'lucide-react';

export default function PublishingEnginePage() {
  const [selectedPlatform, setSelectedPlatform] = useState<'Instagram' | 'YouTube' | 'Facebook' | 'LinkedIn'>('Instagram');
  const [autoPost, setAutoPost] = useState(true);
  const [evergreenFallback, setEvergreenFallback] = useState(true);
  const [scheduleDate, setScheduleDate] = useState('2026-11-27');
  const [scheduleTime, setScheduleTime] = useState('18:00');

  const publishingQueue = [
    {
      id: 1,
      title: 'Top 5 Hidden Waterfalls in North Goa',
      client: 'The Travelopedia',
      platform: 'Instagram Reel',
      scheduledFor: '27 Nov, 06:00 PM',
      status: 'Ready to Fire',
      badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    },
    {
      id: 2,
      title: 'Woodfired Truffle Margherita Reel',
      client: 'Veda Café',
      platform: 'Instagram Reel',
      scheduledFor: '28 Nov, 01:00 PM',
      status: 'Evergreen Standby',
      badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    },
    {
      id: 3,
      title: 'Luxury Villa Tour 4K Teaser',
      client: 'Orchid Resorts',
      platform: 'YouTube Shorts',
      scheduledFor: '28 Nov, 07:30 PM',
      status: 'Queued',
      badgeColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    },
  ];

  return (
    <div className="space-y-6 max-w-[1700px] mx-auto pb-16 font-sans text-white/90">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Send className="w-6 h-6 text-purple-400" />
            Publishing Engine
          </h1>
          <p className="text-xs text-white/40 mt-1 font-medium">
            Multi-platform automated scheduler with T-12h Evergreen fallback protection and SLA publishing logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/sphere-os/planner"
            className="px-3.5 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/80 rounded-xl text-xs font-bold transition-colors"
          >
            Editorial Calendar
          </Link>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-all">
            <Send className="w-4 h-4" />
            <span>Schedule Post</span>
          </button>
        </div>
      </div>

      {/* Main Split: Post Composer & Live Preview (Left) vs Schedule Queue (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Composer & Preview (Col 7) */}
        <div className="lg:col-span-7 bg-white/[0.03] rounded-2xl border border-white/[0.08] p-6 backdrop-blur-xl shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <h3 className="font-extrabold text-white text-sm">Post Composer & Media Preview</h3>
            {/* Platform Selector */}
            <div className="flex items-center gap-1 bg-white/[0.04] border border-white/[0.06] p-1 rounded-xl text-xs font-bold">
              {[
                { name: 'Instagram', icon: Instagram },
                { name: 'YouTube', icon: Youtube },
                { name: 'Facebook', icon: Facebook },
                { name: 'LinkedIn', icon: Linkedin },
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.name}
                    onClick={() => setSelectedPlatform(p.name as any)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                      selectedPlatform === p.name
                        ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40 shadow-sm'
                        : 'text-white/40 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{p.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Client & Content Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
            <div>
              <label className="text-white/40 block mb-1">Target Client Retainer</label>
              <select className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-purple-500/50">
                <option className="bg-[#141820]">The Travelopedia (@thetravelopedia)</option>
                <option className="bg-[#141820]">Veda Café (@vedacafe.in)</option>
                <option className="bg-[#141820]">Orchid Resorts (@orchidresorts_goa)</option>
                <option className="bg-[#141820]">Studio North (@studionorth.media)</option>
              </select>
            </div>
            <div>
              <label className="text-white/40 block mb-1">Select Approved Media from Vault</label>
              <select className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-purple-500/50">
                <option className="bg-[#141820]">TRAV-20261124-GOA-EP01.mp4 (4K 60fps)</option>
                <option className="bg-[#141820]">VEDA-20261124-PIZZA-HERO.jpg</option>
                <option className="bg-[#141820]">ORCH-20261123-DRONE-SUNSET.mp4</option>
              </select>
            </div>
          </div>

          {/* Caption & Hashtag Box */}
          <div className="space-y-1.5 text-xs font-semibold">
            <div className="flex items-center justify-between text-white/50">
              <label>Caption & Hook (Brand Brain Verified)</label>
              <button className="text-purple-400 hover:text-purple-300 flex items-center gap-1 font-bold text-[11px] transition-colors">
                <Sparkles className="w-3 h-3" />
                <span>Regenerate with AI</span>
              </button>
            </div>
            <textarea
              rows={4}
              defaultValue="Explore the world with The Travelopedia! ✈️ Discover secret waterfalls, untouched sands, and the authentic pulse of Goa. Tag someone you want to escape with! 👇 #Travelopedia #HiddenGoa #TravelIndia #LuxuryTravel"
              className="w-full p-3 bg-white/[0.04] border border-white/[0.08] rounded-xl focus:outline-none focus:border-purple-500/50 text-white/90 text-xs"
            />
          </div>

          {/* Schedule Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs font-semibold">
            <div>
              <label className="text-white/40 block mb-1">Schedule Date & Time</label>
              <div className="flex items-center gap-2">
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg focus:outline-none text-white text-xs"
                />
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg focus:outline-none text-white text-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Auto Post via Graph API:</span>
                <button
                  onClick={() => setAutoPost(!autoPost)}
                  className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors ${
                    autoPost ? 'bg-purple-600 justify-end' : 'bg-white/10 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white block shadow" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/70">Evergreen Fallback (T-12h):</span>
                <button
                  onClick={() => setEvergreenFallback(!evergreenFallback)}
                  className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors ${
                    evergreenFallback ? 'bg-emerald-600 justify-end' : 'bg-white/10 justify-start'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white block shadow" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Active Publishing Queue (Col 5) */}
        <div className="lg:col-span-5 bg-white/[0.03] rounded-2xl border border-white/[0.08] p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <h3 className="font-extrabold text-white text-sm">Upcoming Publishing Queue</h3>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                SLA: 98.4%
              </span>
            </div>

            <div className="space-y-3 mt-4">
              {publishingQueue.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
                      {item.client}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                      {item.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-white text-xs">{item.title}</h4>

                  <div className="flex items-center justify-between text-[11px] text-white/40 pt-1 border-t border-white/[0.05]">
                    <span className="flex items-center gap-1 font-semibold text-purple-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.scheduledFor}</span>
                    </span>
                    <span className="text-[10px] font-bold text-white/60">{item.platform}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/[0.06]">
            <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-purple-300">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>AI Automated Safeguard</span>
              </div>
              <p className="text-[11px] text-white/50 leading-relaxed">
                If client approval stalls within 12 hours of scheduled slot, Sphere OS automatically swaps in a pre-approved Evergreen asset so your posting streak never breaks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
