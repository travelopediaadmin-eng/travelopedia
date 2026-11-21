'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  INITIAL_CLIENTS,
  INITIAL_DECISIONS,
  Client,
  DecisionItem,
} from '@/data/sphere-os-mock';
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Sparkles,
  TrendingUp,
  DollarSign,
  Users,
  ShieldCheck,
  Check,
  X,
  ChevronRight,
  Flame,
  CalendarDays,
  Layers,
  HelpCircle,
} from 'lucide-react';

export default function SphereOSCommandCenter() {
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [decisions, setDecisions] = useState<DecisionItem[]>(INITIAL_DECISIONS);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'green' | 'amber' | 'red'>('all');
  const [showResolveModal, setShowResolveModal] = useState<string | null>(null);

  React.useEffect(() => {
    fetch('/api/sphere-os/clients')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.clients) setClients(data.clients);
      })
      .catch((err) => console.warn('Could not fetch clients:', err));

    fetch('/api/sphere-os/decisions')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.decisions) setDecisions(data.decisions);
      })
      .catch((err) => console.warn('Could not fetch decisions:', err));
  }, []);

  const handleDecisionAction = async (id: string, actionName: string) => {
    setDecisions((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: 'approved' as const } : d))
    );
    setShowResolveModal(`Action applied: ${actionName}`);
    setTimeout(() => setShowResolveModal(null), 3000);

    try {
      await fetch('/api/sphere-os/decisions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decisionId: id, action: actionName }),
      });
    } catch (err) {
      console.warn('Failed to sync decision to server:', err);
    }
  };

  const filteredClients = clients.filter((c) => {
    if (selectedFilter === 'all') return true;
    return c.healthStatus === selectedFilter;
  });

  // Capacity calculations
  const totalRetainers = clients.reduce((acc, c) => acc + c.monthlyFee, 0);
  const totalReelsCommitted = clients.reduce((acc, c) => acc + c.package.reels, 0);
  const teamCapacityMaxReels = 85; // Saakshi (20) + Anjali (45) + Riddhi (10) + Bench (10)
  const capacityUsedPercent = Math.round((totalReelsCommitted / teamCapacityMaxReels) * 100);

  return (
    <div className="space-y-8">
      {/* Toast alert */}
      {showResolveModal && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-semibold animate-bounce">
          <CheckCircle className="w-4 h-4" />
          <span>{showResolveModal}</span>
        </div>
      )}

      {/* Hero / Executive Metric Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Monthly Retainer P&L */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Retainer Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-white tracking-tight">
              ₹{(totalRetainers / 1000).toFixed(0)}k <span className="text-xs font-normal text-slate-400">/ month</span>
            </div>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3" /> Average margin: 68%
            </div>
          </div>
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
            Across 15 retainers (5 pilot active)
          </div>
        </div>

        {/* Metric 2: Team Capacity Meter */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Team Capacity Meter</span>
            <Flame className={`w-4 h-4 ${capacityUsedPercent > 80 ? 'text-amber-400' : 'text-rose-400'}`} />
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-white tracking-tight">
              {capacityUsedPercent}% <span className="text-xs font-normal text-slate-400">load</span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  capacityUsedPercent > 85 ? 'bg-amber-400' : 'bg-rose-500'
                }`}
                style={{ width: `${Math.min(capacityUsedPercent, 100)}%` }}
              />
            </div>
          </div>
          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/60 flex justify-between">
            <span>{totalReelsCommitted} of {teamCapacityMaxReels} reels</span>
            <span className="text-emerald-400">Can take +1 client</span>
          </div>
        </div>

        {/* Metric 3: Decision Queue count */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Decision Queue</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-amber-400 tracking-tight">
              {decisions.filter((d) => d.status === 'pending').length} <span className="text-xs font-normal text-slate-400">pending</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Target: <strong>&lt; 30 mins / day</strong> in system
            </div>
          </div>
          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
            Next auto-escalation in 42 mins
          </div>
        </div>

        {/* Metric 4: Evergreen Safety Bank */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Evergreen Fallback Bank</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-white tracking-tight">
              32 <span className="text-xs font-normal text-slate-400">approved posts</span>
            </div>
            <div className="text-[11px] text-emerald-400 mt-0.5">
              100% of pilot clients protected
            </div>
          </div>
          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
            T-12h auto-fallback active
          </div>
        </div>
      </div>

      {/* Decision Queue Section: High-Leverage Founder Inbox */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-400" />
                The Decision Queue (Items that Truly Need You)
              </h2>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-amber-500/10 text-amber-400 rounded-full border border-amber-500/20">
                AI Recommendations Ready
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Every decision routes here with a pre-evaluated AI recommendation. 1-tap to unblock the team.
            </p>
          </div>
          <div className="text-xs text-slate-400">
            Pending:{' '}
            <strong className="text-white">
              {decisions.filter((d) => d.status === 'pending').length}
            </strong>
          </div>
        </div>

        <div className="divide-y divide-slate-800/70 mt-3">
          {decisions.filter((d) => d.status === 'pending').length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              All clear! No decisions currently blocked on the Founder.
            </div>
          ) : (
            decisions
              .filter((d) => d.status === 'pending')
              .map((decision) => (
                <div key={decision.id} className="py-4 first:pt-2 last:pb-2">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white px-2 py-0.5 bg-slate-800 rounded">
                          {decision.clientName}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded ${
                            decision.urgency === 'high'
                              ? 'bg-rose-500/20 text-rose-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}
                        >
                          {decision.urgency} priority
                        </span>
                        <span className="text-[11px] text-slate-500">• {decision.timestamp}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-slate-200">{decision.title}</h3>
                      <p className="text-xs text-slate-400">{decision.context}</p>

                      {/* AI Recommendation Box */}
                      <div className="mt-2.5 p-3 rounded-xl bg-slate-950/80 border border-rose-500/20 text-xs text-slate-300 flex items-start gap-2.5">
                        <Sparkles className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-rose-300">AI Recommendation:</strong> {decision.aiRecommendation}
                        </div>
                      </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="flex flex-wrap lg:flex-col items-stretch gap-2 min-w-[200px]">
                      {decision.options.map((option, idx) => (
                        <button
                          key={option.action}
                          onClick={() => handleDecisionAction(decision.id, option.label)}
                          className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-center flex items-center justify-center gap-1.5 ${
                            idx === 0
                              ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-950/50'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </section>

      {/* 15 Retainer Clients Health Matrix (Red-Amber-Green) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Client Health & Deliverable Tracker
            </h2>
            <p className="text-xs text-slate-400">
              Live status across all retainers. Clear gates prevent unapproved posts from going live.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
            {(['all', 'green', 'amber', 'red'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-all ${
                  selectedFilter === filter
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Client RAG Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map((client) => {
            const statusBg =
              client.healthStatus === 'green'
                ? 'border-emerald-500/30 bg-emerald-950/10'
                : client.healthStatus === 'amber'
                ? 'border-amber-500/30 bg-amber-950/10'
                : 'border-rose-500/30 bg-rose-950/10';

            const statusDot =
              client.healthStatus === 'green'
                ? 'bg-emerald-400'
                : client.healthStatus === 'amber'
                ? 'bg-amber-400'
                : 'bg-rose-400';

            return (
              <div
                key={client.id}
                className={`border rounded-2xl p-4 flex flex-col justify-between transition-all hover:border-slate-700 bg-slate-900/60 ${statusBg}`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${statusDot}`} />
                        <h3 className="text-sm font-bold text-white tracking-tight">{client.name}</h3>
                      </div>
                      <span className="text-[11px] text-slate-400">{client.vertical}</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-300">
                      ₹{(client.monthlyFee / 1000).toFixed(0)}k/mo
                    </span>
                  </div>

                  {/* Health Note */}
                  <div className="mt-3 p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 text-[11px] text-slate-300">
                    {client.healthReason}
                  </div>

                  {/* Package breakdown */}
                  <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800/50 text-center">
                    <div className="bg-slate-950/40 p-1.5 rounded-lg">
                      <div className="text-xs font-bold text-white">{client.package.reels}</div>
                      <div className="text-[10px] text-slate-500">Reels/mo</div>
                    </div>
                    <div className="bg-slate-950/40 p-1.5 rounded-lg">
                      <div className="text-xs font-bold text-white">{client.package.shoots}</div>
                      <div className="text-[10px] text-slate-500">Shoots</div>
                    </div>
                    <div className="bg-slate-950/40 p-1.5 rounded-lg">
                      <div className="text-xs font-bold text-emerald-400">{client.evergreenCount}</div>
                      <div className="text-[10px] text-slate-500">Evergreen</div>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Leads and Links */}
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span>Lead: <strong>{client.accountLead}</strong></span>
                    <span>•</span>
                    <span>SLA: <strong>{client.approvalSlaHours}h</strong></span>
                  </div>
                  <Link
                    href="/sphere-os/client-portal"
                    className="text-rose-400 hover:text-rose-300 font-medium flex items-center gap-0.5"
                  >
                    <span>Portal</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Launchpad to other modules */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Direct Module Access
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            href="/sphere-os/my-day"
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-rose-500/50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white group-hover:text-rose-300">
                Staff "My Day"
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Saakshi, Riddhi & Anjali's 3-task daily focus.
            </p>
          </Link>

          <Link
            href="/sphere-os/client-portal"
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-rose-500/50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white group-hover:text-rose-300">
                Client Review Portal
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Tokenized magic link for 1-click video approvals.
            </p>
          </Link>

          <Link
            href="/sphere-os/vendor-ledger"
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-rose-500/50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white group-hover:text-rose-300">
                Vendor Ledger & QC
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Count, ingest gate, and automated reconciliation.
            </p>
          </Link>

          <Link
            href="/sphere-os/brand-brain"
            className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-rose-500/50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white group-hover:text-rose-300">
                Brand Brain & Vault
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Client tone guides, Idea Adapter & Festival Engine.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
