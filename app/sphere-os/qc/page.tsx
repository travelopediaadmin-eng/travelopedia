'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Eye,
  Sliders,
} from 'lucide-react';

export default function QualityGatePage() {
  const [activeStep, setActiveStep] = useState(3);
  const [safeZoneOverlay, setSafeZoneOverlay] = useState(true);
  const [qcChecklist, setQcChecklist] = useState([
    { id: 1, label: 'Resolution check (1080x1920 9:16 vertical)', passed: true, detail: 'Exact 9:16 vertical 4K downsampled' },
    { id: 2, label: 'Audio loudness standard (-14 LUFS compliant)', passed: true, detail: '-13.8 LUFS measured with clear dialogue' },
    { id: 3, label: 'Safe Zone typography compliance (No UI cut-off)', passed: true, detail: 'Hooks inside 1080x1420 center safe box' },
    { id: 4, label: 'No third-party watermarks or CapCut logos', passed: true, detail: 'Clean timeline export' },
    { id: 5, label: 'Brand Brain typography (Syne / Outfit / Plus Jakarta)', passed: true, detail: 'Matched Brand Brain font package' },
    { id: 6, label: 'Captions synchronized with 0.1s lip-sync tolerance', passed: true, detail: 'SRT subtitle cues verified' },
  ]);

  const toggleCheck = (id: number) => {
    setQcChecklist((prev) =>
      prev.map((c) => (c.id === id ? { ...c, passed: !c.passed } : c))
    );
  };

  const allPassed = qcChecklist.every((c) => c.passed);

  return (
    <div className="space-y-6 max-w-[1700px] mx-auto pb-16 font-sans text-white/90">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <CheckCheck className="w-6 h-6 text-purple-400" />
            Quality Gate (QC Engine)
          </h1>
          <p className="text-xs text-white/40 mt-1 font-medium">
            Rigorous automated 6-point verification before any creative reaches client eyes or social queues.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/sphere-os/client-portal"
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-all"
          >
            <span>Client Review Portal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Stepper Progress Bar */}
      <div className="bg-white/[0.03] rounded-2xl border border-white/[0.08] p-5 backdrop-blur-xl shadow-xl">
        <div className="flex items-center justify-between relative max-w-3xl mx-auto px-4">
          <div className="absolute top-1/2 left-8 right-8 h-1 bg-white/[0.08] -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-8 h-1 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 -translate-y-1/2 z-0 transition-all duration-300 shadow-[0_0_12px_rgba(168,85,247,0.5)]"
            style={{ width: `${((activeStep - 1) / 4) * 100}%` }}
          />

          {[
            { num: 1, label: 'Upload' },
            { num: 2, label: 'Auto Scan' },
            { num: 3, label: 'QC Gate' },
            { num: 4, label: 'Client Approve' },
            { num: 5, label: 'Publish' },
          ].map((st) => {
            const isCompleted = st.num < activeStep;
            const isCurrent = st.num === activeStep;

            return (
              <div key={st.num} className="relative z-10 flex flex-col items-center gap-1.5">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isCompleted
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                      : isCurrent
                      ? 'bg-[#0A0D14] border-2 border-purple-500 text-purple-300 shadow-md ring-4 ring-purple-500/20'
                      : 'bg-[#0A0D14] border-2 border-white/[0.1] text-white/30'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : st.num}
                </div>
                <span className={`text-[11px] font-bold ${isCurrent ? 'text-purple-300' : 'text-white/40'}`}>
                  {st.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Inspector + Checklist Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 9:16 Video Player with Safe Zone (Col 5) */}
        <div className="lg:col-span-5 bg-white/[0.03] rounded-2xl border border-white/[0.08] p-5 backdrop-blur-xl shadow-xl flex flex-col items-center">
          <div className="w-full flex items-center justify-between pb-3 border-b border-white/[0.06] text-xs">
            <span className="font-extrabold text-white">Live 9:16 Safe Zone Simulator</span>
            <button
              onClick={() => setSafeZoneOverlay(!safeZoneOverlay)}
              className={`px-3 py-1 rounded-lg text-xs font-bold border transition-colors ${
                safeZoneOverlay
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                  : 'bg-white/[0.04] text-white/50 border-white/[0.08]'
              }`}
            >
              Safe Zone: {safeZoneOverlay ? 'ON' : 'OFF'}
            </button>
          </div>

          {/* 9:16 Frame */}
          <div className="relative w-72 h-[480px] bg-[#070A10] rounded-3xl mt-4 overflow-hidden shadow-2xl flex items-center justify-center border-4 border-white/[0.1]">
            {/* Background Simulated Video */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-[#0A0D14] to-purple-950/80 flex flex-col justify-between p-4 text-white">
              <div className="flex items-center justify-between text-[10px] text-white/80">
                <span className="font-bold">The Travelopedia</span>
                <span className="px-2 py-0.5 rounded bg-black/60 text-[9px] border border-white/10">4K 60fps</span>
              </div>

              {/* Center Play Button */}
              <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center self-center shadow-xl cursor-pointer hover:scale-105 transition-transform">
                <Play className="w-6 h-6 fill-white ml-0.5 text-white" />
              </div>

              {/* Bottom Caption & Audio */}
              <div className="space-y-1">
                <p className="text-xs font-bold line-clamp-2 text-white/90">
                  5 Secrets in Goa that tourists never see! Episode 01 is finally live 🌊
                </p>
                <div className="text-[10px] text-purple-300 font-semibold">♫ Original Audio - Travelopedia Original</div>
              </div>
            </div>

            {/* Instagram Safe Zone Overlays (Top notch & bottom comment area) */}
            {safeZoneOverlay && (
              <div className="absolute inset-0 pointer-events-none border border-cyan-400/30 m-2 rounded-2xl flex flex-col justify-between p-2">
                <div className="bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[8px] font-bold p-1 rounded text-center">
                  Top Header Safe Zone (Avoid text here)
                </div>
                <div className="border border-dashed border-cyan-400/50 rounded-xl p-2 text-center text-[9px] font-bold text-cyan-300 bg-cyan-950/40">
                  Target Hook & Subtitle Box
                </div>
                <div className="bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[8px] font-bold p-1 rounded text-center">
                  Bottom IG Caption & Audio Safe Margin
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Technical Checklist & Release Buttons (Col 7) */}
        <div className="lg:col-span-7 bg-white/[0.03] rounded-2xl border border-white/[0.08] p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <div>
                <h3 className="font-extrabold text-white text-sm">Automated 6-Point Checklist</h3>
                <p className="text-xs text-white/40">Click any check to manually override if required by client.</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                {qcChecklist.filter((c) => c.passed).length} / {qcChecklist.length} Passed
              </span>
            </div>

            <div className="space-y-3">
              {qcChecklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                    item.passed
                      ? 'bg-emerald-500/[0.06] border-emerald-500/25 hover:border-emerald-500/40'
                      : 'bg-rose-500/[0.06] border-rose-500/25 hover:border-rose-500/40'
                  }`}
                >
                  <div className="mt-0.5">
                    {item.passed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-white">{item.label}</div>
                    <div className="text-[11px] text-white/40 mt-0.5">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Decision Bar */}
          <div className="flex items-center justify-between gap-3 pt-6 mt-6 border-t border-white/[0.06]">
            <button className="px-5 py-2.5 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-xs font-bold transition-colors">
              Reject with Notes
            </button>
            <div className="flex items-center gap-2">
              <Link
                href="/sphere-os/client-portal"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg shadow-purple-600/30 transition-all"
              >
                Pass QC & Send for Client Approval →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
