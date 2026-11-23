'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  AlertOctagon,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  MessageCircle,
  Share2,
} from 'lucide-react';

export default function DecisionQueuePage() {
  const [decisions, setDecisions] = useState([
    {
      id: 'd1',
      title: 'Approve Reel: Secret Waterfalls in Goa',
      client: 'The Travelopedia',
      time: '2 hours ago',
      deadline: 'Due in 4 hours (Publish at 6 PM)',
      urgency: 'High',
      type: 'Creative Approval',
      description: 'Hook test passed with 84% Retention prediction. Need sign-off on sound sync.',
      gradientBorder: 'from-purple-500 to-indigo-500',
    },
    {
      id: 'd2',
      title: 'Review Poster: Truffle Pizza Launch',
      client: 'Veda Café',
      time: '3 hours ago',
      deadline: 'Due in 8 hours',
      urgency: 'Medium',
      type: 'Copy & Design',
      description: 'Zomato promo code discount copy verified with client brand guidelines.',
      gradientBorder: 'from-amber-500 to-orange-500',
    },
    {
      id: 'd3',
      title: 'Release Milestone Payout: Rahul Cinematics',
      client: 'Vendor Payout',
      time: '5 hours ago',
      deadline: 'Net 7 Terms',
      urgency: 'Medium',
      type: 'Vendor Ledger',
      description: 'Delivered 8 raw 4K clips for Orchid Resorts. Metadata verified by Quality Gate.',
      gradientBorder: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'd4',
      title: 'Approve Script: Brand Film Ep 02',
      client: 'Studio North',
      time: '6 hours ago',
      deadline: 'Tomorrow 10 AM',
      urgency: 'Low',
      type: 'Scripting',
      description: 'Hinglish conversational script prepared by Brand Brain generator.',
      gradientBorder: 'from-cyan-500 to-blue-500',
    },
  ]);

  const [toast, setToast] = useState<string | null>(null);

  const handleAction = (id: string, action: 'Approved' | 'Rejected') => {
    setDecisions((prev) => prev.filter((d) => d.id !== id));
    setToast(`Item #${id} successfully ${action}!`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-[1700px] mx-auto pb-16 font-sans text-white/90">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-8 z-50 bg-[#141820] text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 border border-white/[0.12] animate-bounce">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <AlertOctagon className="w-6 h-6 text-rose-400" />
            Decision Queue (Agency Lead Clearout)
          </h1>
          <p className="text-xs text-white/40 mt-1 font-medium">
            Zero-friction bottleneck resolution: approve scripts, creatives, vendor payouts, and client disputes in seconds.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setDecisions([]);
              setToast('All pending decisions cleared and synced!');
            }}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/25 flex items-center gap-1.5 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Approve All ({decisions.length})</span>
          </button>
        </div>
      </div>

      {/* Decisions List */}
      <div className="space-y-3">
        {decisions.map((item) => (
          <div
            key={item.id}
            className="relative bg-white/[0.03] rounded-2xl border border-white/[0.08] p-5 backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/[0.14] transition-all shadow-lg overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            {/* 4px Gradient Left Border */}
            <div className={`absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b ${item.gradientBorder}`} />

            <div className="space-y-1.5 flex-1 pl-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-white/70">
                  {item.type}
                </span>
                <span className="text-xs font-bold text-white/50">• {item.client}</span>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                    item.urgency === 'High'
                      ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                      : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                  }`}
                >
                  {item.urgency} Urgency
                </span>
              </div>

              <h3 className="font-bold text-white text-sm">{item.title}</h3>
              <p className="text-xs text-white/50">{item.description}</p>

              <div className="flex items-center gap-4 text-[11px] text-white/30 font-semibold pt-1">
                <span className="flex items-center gap-1 text-white/60">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>{item.deadline}</span>
                </span>
                <span>Created {item.time}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end md:self-center">
              <button
                onClick={() => handleAction(item.id, 'Rejected')}
                className="px-4 py-2 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-xs font-bold transition-colors"
              >
                Reject / Nudge
              </button>
              <button
                onClick={() => handleAction(item.id, 'Approved')}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold shadow-lg shadow-emerald-500/25 transition-all"
              >
                Approve & Fire
              </button>
            </div>
          </div>
        ))}

        {decisions.length === 0 && (
          <div className="bg-white/[0.03] rounded-3xl border border-white/[0.08] backdrop-blur-xl p-12 text-center space-y-3 shadow-xl">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-white">Decision Queue Empty!</h3>
            <p className="text-xs text-white/40 max-w-sm mx-auto">
              Every single operational bottleneck has been cleared. The 15 retainers are operating with zero blockers.
            </p>
            <Link
              href="/sphere-os"
              className="inline-block px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-xs shadow-md shadow-purple-500/20"
            >
              Back to Master Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
