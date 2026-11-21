'use client';

import React, { useState } from 'react';
import { INITIAL_CONTENT_ITEMS, ContentItem } from '@/data/sphere-os-mock';
import {
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Clock,
  Sparkles,
  ShieldCheck,
  Eye,
  Check,
  Share2,
  Copy,
  ThumbsUp,
  RotateCcw,
  Smartphone,
} from 'lucide-react';

export default function ClientApprovalPortal() {
  const [contentList, setContentList] = useState<ContentItem[]>(INITIAL_CONTENT_ITEMS);
  const [activeItem, setActiveItem] = useState<ContentItem>(INITIAL_CONTENT_ITEMS[0]);
  const [showSafeZone, setShowSafeZone] = useState(true);
  const [feedbackText, setFeedbackText] = useState('');
  const [timestampSec, setTimestampSec] = useState('0:04');
  const [statusNotification, setStatusNotification] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pending' | 'evergreen'>('pending');

  React.useEffect(() => {
    fetch('/api/sphere-os/content')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.content && data.content.length > 0) {
          setContentList(data.content);
          setActiveItem(data.content[0]);
        }
      })
      .catch((err) => console.warn('Could not fetch content:', err));
  }, []);

  const handleApprove = async (id: string) => {
    setContentList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, clientApprovalStatus: 'approved', status: 'Scheduled' } : c))
    );
    setStatusNotification('Post Approved! Locked into Publishing Engine schedule.');
    setTimeout(() => setStatusNotification(null), 3500);

    try {
      await fetch('/api/sphere-os/content', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentId: id, approvalStatus: 'approved' }),
      });
    } catch (err) {
      console.warn('Failed to sync approval:', err);
    }
  };

  const handleRequestChange = async (id: string) => {
    if (!feedbackText.trim()) {
      alert('Please enter your revision feedback first.');
      return;
    }
    const loggedFeedback = `[At ${timestampSec}]: ${feedbackText}`;
    setContentList((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              clientApprovalStatus: 'rework_requested',
              status: 'In edit',
              clientFeedback: loggedFeedback,
            }
          : c
      )
    );
    setStatusNotification(`Feedback logged at ${timestampSec}! Sent back to editor.`);
    setFeedbackText('');
    setTimeout(() => setStatusNotification(null), 3500);

    try {
      await fetch('/api/sphere-os/content', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentId: id,
          approvalStatus: 'rework_requested',
          feedback: loggedFeedback,
        }),
      });
    } catch (err) {
      console.warn('Failed to sync revision feedback:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Toast Notification */}
      {statusNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusNotification}</span>
        </div>
      )}

      {/* Client Header & Magic Link Verification Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 font-bold text-[10px] uppercase border border-rose-500/20">
              Verified Magic Link
            </span>
            <span className="text-xs text-slate-400">Auth Token: `zaveri-nov26-token-x9a`</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">
            Zaveri & Sons Heritage — Creative Approval Desk
          </h1>
          <p className="text-xs text-slate-400">
            Review your upcoming content. 1-click approve locks the slot for publishing.
          </p>
        </div>

        {/* 24-Hour SLA Badge */}
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-right">
          <div className="flex items-center justify-end gap-1.5 text-xs text-amber-400 font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>SLA Countdown: 18h 42m remaining</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Evergreen Fallback Reel #3 stands ready if unapproved.
          </div>
        </div>
      </div>

      {/* Tabs: Pending Review vs Evergreen Bank */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            activeTab === 'pending'
              ? 'bg-rose-500 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Pending Review ({contentList.filter((c) => c.clientApprovalStatus === 'pending').length})
        </button>
        <button
          onClick={() => setActiveTab('evergreen')}
          className={`px-3 py-1.5 rounded-lg transition-all ${
            activeTab === 'evergreen'
              ? 'bg-rose-500 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Evergreen Safety Bank (8 Pre-Approved Reels)
        </button>
      </div>

      {/* Main Review Section */}
      {activeTab === 'pending' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Phone Frame with 9:16 Reel Player and Safe Zone Overlay */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full flex items-center justify-between pb-2 text-xs text-slate-400 px-2">
              <span className="flex items-center gap-1.5 font-medium">
                <Smartphone className="w-3.5 h-3.5 text-rose-400" /> Instagram Preview (9:16)
              </span>
              <button
                onClick={() => setShowSafeZone(!showSafeZone)}
                className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                  showSafeZone
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    : 'bg-slate-900 text-slate-500 border-slate-800'
                }`}
              >
                {showSafeZone ? 'Safe Zone: ON' : 'Safe Zone: OFF'}
              </button>
            </div>

            {/* Simulated Mobile Mockup */}
            <div className="relative w-[300px] h-[580px] bg-black rounded-[40px] border-[6px] border-slate-800 shadow-2xl overflow-hidden flex flex-col justify-between">
              {/* Top Notch / Speaker Bar */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-slate-800 rounded-full z-30" />

              {/* Video Player */}
              <div className="relative w-full h-full bg-slate-900 flex items-center justify-center overflow-hidden">
                <img
                  src={activeItem.thumbnailUrl}
                  alt="Reel preview"
                  className="w-full h-full object-cover"
                />

                {/* Safe Zone Visual Overlays */}
                {showSafeZone && (
                  <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-3">
                    {/* Top Instagram Header Safe Zone */}
                    <div className="bg-red-500/15 border-b border-red-500/40 rounded p-1 text-[9px] text-red-300 font-mono">
                      ▲ Instagram Header Zone (Keep clear)
                    </div>

                    {/* Bottom Caption & Engagement Column Safe Zone */}
                    <div className="flex justify-between items-end gap-2">
                      <div className="flex-1 bg-red-500/15 border-t border-red-500/40 rounded p-1 text-[9px] text-red-300 font-mono">
                        ▼ Caption & UI Zone
                      </div>
                      <div className="w-10 h-32 bg-red-500/15 border-l border-red-500/40 rounded p-1 text-[8px] text-red-300 font-mono writing-mode-vertical">
                        Icons
                      </div>
                    </div>
                  </div>
                )}

                {/* Video Play Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                    ▶
                  </div>
                </div>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 mt-2">
              Tech-QC: 1080x1920 (9:16) • 30fps • 48kHz AAC (Passed)
            </span>
          </div>

          {/* Right Column: Copy, Captions, and Approval Action Controls */}
          <div className="lg:col-span-7 space-y-4">
            {/* Content Item Selector (if multiple items pending) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {contentList.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    activeItem.id === item.id
                      ? 'bg-rose-500/15 text-rose-300 border-rose-500/40'
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            {/* Post Information Box */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-rose-400 font-bold">
                  {activeItem.pillar} • {activeItem.format}
                </span>
                <h2 className="text-lg font-bold text-white tracking-tight">{activeItem.title}</h2>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>Scheduled: <strong>22 Nov 2026, 6:00 PM</strong></span>
                  <span>•</span>
                  <span>Assigned: <strong>{activeItem.assignee}</strong></span>
                </div>
              </div>

              {/* Caption Review */}
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span className="font-semibold text-slate-300">Instagram Caption:</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(activeItem.caption)}
                    className="text-rose-400 hover:text-rose-300 flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>
                <p className="text-slate-300 leading-relaxed">{activeItem.caption}</p>
              </div>

              {/* First Comment / CTA */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <span className="font-semibold text-slate-300 block mb-1">First Comment / Pinned CTA:</span>
                <p className="text-slate-400">{activeItem.firstComment}</p>
              </div>

              {/* Approval Decision Controls */}
              <div className="pt-3 border-t border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {/* Big Green 1-Click Approve */}
                  <button
                    onClick={() => handleApprove(activeItem.id)}
                    className="w-full sm:flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>Approve & Schedule Post</span>
                  </button>
                </div>

                {/* Timecode-based feedback */}
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-rose-400" />
                      Request Revision with Timecode
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] text-slate-400">At timestamp:</span>
                      <input
                        type="text"
                        value={timestampSec}
                        onChange={(e) => setTimestampSec(e.target.value)}
                        className="w-14 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-white text-[11px] text-center"
                      />
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    placeholder="e.g. Please change the subtitle font color to white and make logo transition 0.5s faster..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleRequestChange(activeItem.id)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                      <span>Send Revision to Editor</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Evergreen Safety Bank View */
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Evergreen Fallback Vault (Zaveri & Sons)
              </h3>
              <p className="text-xs text-slate-400">
                Pre-approved, timeless reels that automatically slot in if client approvals or shoots face emergency delays.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
              8 Reels Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            {[
              { title: 'The Gold Purity Guide', pillar: 'Education', views: '24k' },
              { title: 'Bridal Polki Styling Tips', pillar: 'Style', views: '38k' },
              { title: 'Behind the Craft: Surat Karigars', pillar: 'Heritage', views: '45k' },
              { title: 'How to Store Solitaire Rings', pillar: 'Care', views: '19k' },
            ].map((reel, idx) => (
              <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <div className="w-full h-32 bg-slate-900 rounded-lg flex items-center justify-center text-slate-600 text-xs font-mono">
                  [Evergreen Reel #{idx + 1}]
                </div>
                <div className="text-xs font-bold text-white">{reel.title}</div>
                <div className="text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{reel.pillar}</span>
                  <span className="text-emerald-400">Approved</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
