'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Settings,
  Database,
  Cloud,
  MessageSquare,
  Bot,
  Clock,
  Key,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Sparkles,
  Save,
} from 'lucide-react';

export default function SphereOSSettingsPage() {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-[1700px] mx-auto pb-16 font-sans text-white/90">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-8 z-50 bg-[#141820] text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 border border-white/[0.12] animate-bounce">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-purple-400" />
            Sphere OS System Configuration
          </h1>
          <p className="text-xs text-white/40 mt-1 font-medium">
            Manage your hybrid architecture connectors, rate limiters, storage buckets, and AI models.
          </p>
        </div>

        <button
          onClick={() => showToast('All configuration settings saved successfully!')}
          className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Configuration</span>
        </button>
      </div>

      {/* Integration Connectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Connector 1: Airtable Database */}
        <div className="bg-white/[0.03] rounded-2xl border border-white/[0.08] p-5 backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-sm">Airtable Enterprise Connector</h3>
                <p className="text-[11px] text-white/40">Leaky-bucket rate limiter (5 req/sec) + local cache</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              Connected
            </span>
          </div>

          <div className="space-y-3 text-xs font-semibold">
            <div>
              <label className="text-white/40 block mb-1">Airtable Personal Access Token (PAT)</label>
              <input
                type="password"
                defaultValue="patXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-purple-500/50 font-mono text-[11px]"
              />
            </div>
            <div>
              <label className="text-white/40 block mb-1">Base ID</label>
              <input
                defaultValue="appIllustrativeSphere2026"
                className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-purple-500/50 font-mono text-[11px]"
              />
            </div>
          </div>
        </div>

        {/* Connector 2: Cloudflare R2 Storage */}
        <div className="bg-white/[0.03] rounded-2xl border border-white/[0.08] p-5 backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center font-bold">
                <Cloud className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-sm">Cloudflare R2 Direct Uploads</h3>
                <p className="text-[11px] text-white/40">S3-compatible 4K video bucket with zero egress fees</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              Active
            </span>
          </div>

          <div className="space-y-3 text-xs font-semibold">
            <div>
              <label className="text-white/40 block mb-1">R2 Bucket Name</label>
              <input
                defaultValue="sphere-os-agency-vault"
                className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-purple-500/50 font-mono text-[11px]"
              />
            </div>
            <div>
              <label className="text-white/40 block mb-1">Account Endpoint URL</label>
              <input
                defaultValue="https://<accountid>.r2.cloudflarestorage.com"
                className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-purple-500/50 font-mono text-[11px]"
              />
            </div>
          </div>
        </div>

        {/* Connector 3: WhatsApp Cloud API */}
        <div className="bg-white/[0.03] rounded-2xl border border-white/[0.08] p-5 backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-sm">Meta WhatsApp Cloud API</h3>
                <p className="text-[11px] text-white/40">Voice-to-task pipeline & 1-tap quick replies</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              Verified
            </span>
          </div>

          <div className="space-y-3 text-xs font-semibold">
            <div>
              <label className="text-white/40 block mb-1">WhatsApp Webhook Verify Token</label>
              <input
                type="password"
                defaultValue="sphere_os_meta_webhook_2026_secure"
                className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-purple-500/50 font-mono text-[11px]"
              />
            </div>
            <div>
              <label className="text-white/40 block mb-1">Webhook Target URL</label>
              <div className="text-[11px] font-mono text-purple-300 bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.06] break-all select-all">
                https://yourdomain.com/api/sphere-os/whatsapp/webhook
              </div>
            </div>
          </div>
        </div>

        {/* Connector 4: Google Gemini AI Model */}
        <div className="bg-white/[0.03] rounded-2xl border border-white/[0.08] p-5 backdrop-blur-xl shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-sm">Google Gemini 1.5 Flash</h3>
                <p className="text-[11px] text-white/40">Sub-second brief & caption generation in Hinglish</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
              Online
            </span>
          </div>

          <div className="space-y-3 text-xs font-semibold">
            <div>
              <label className="text-white/40 block mb-1">Active Model</label>
              <select className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-purple-500/50">
                <option className="bg-[#141820]">gemini-1.5-flash (Recommended: Low Latency & Cost)</option>
                <option className="bg-[#141820]">gemini-1.5-pro (High Reasoning)</option>
              </select>
            </div>
            <div>
              <label className="text-white/40 block mb-1">Default Multi-Language Output</label>
              <select className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-purple-500/50">
                <option className="bg-[#141820]">Hinglish (Conversational Bollywood/Metropolitan)</option>
                <option className="bg-[#141820]">Gujlish (Ahmedabad/Surat Commercial)</option>
                <option className="bg-[#141820]">Formal English</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
