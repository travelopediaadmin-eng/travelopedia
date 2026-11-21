'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Calendar,
  FolderTree,
  Video,
  FileSpreadsheet,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Download,
  AlertCircle,
} from 'lucide-react';

interface DayStep {
  day: number;
  title: string;
  focus: string;
  tasks: string[];
  artifactOrRule: string;
  completed: boolean;
}

export default function OnboardingLaunchpad() {
  const [steps, setSteps] = useState<DayStep[]>([
    {
      day: 1,
      title: 'Pick 3 Pilot Clients & Set Drive Templates',
      focus: 'Folder Standard & Naming Convention',
      tasks: [
        'Select 3 pilot clients (e.g. Zaveri & Sons, Urban Chai, Kalyan Silks).',
        'Create 8 standard folders: 01-Brand, 02-Planning, 03-Raw, 04-Edits, 05-Final, 06-Posted, 07-Reports, 08-Docs.',
        'Fix master naming convention: CLIENT-YYYYMMDD-SHOOT01-CLIP001.mp4.',
      ],
      artifactOrRule: 'Zero files on phones rule starts today.',
      completed: true,
    },
    {
      day: 2,
      title: 'Build Master Content Tracker & Work-Back Dates',
      focus: '12 Statuses Pipeline',
      tasks: [
        'Import CSVs into Airtable Base: Clients, Content_Items, Tasks, Vendor_Deals.',
        'Configure work-back deadlines: Brief/Shoot D-14, Ingest D-10, First Draft D-7, QC D-5, Approval D-4, Scheduled D-3, Posted D.',
        'Test automated status transitions from Idea to Posted.',
      ],
      artifactOrRule: 'A post date automatically generates earlier deadlines.',
      completed: true,
    },
    {
      day: 3,
      title: 'Vendor Ledger & Agreement Clause Update',
      focus: 'Reconciliation & Ingest Gate',
      tasks: [
        'Update vendor terms: Same-day upload (within 6 hrs of shoot).',
        'Enforce clause: Unusable/failed content is non-billable.',
        'Share vendor upload link with Rahul Cinematics & VisualCraft.',
      ],
      artifactOrRule: 'Month end becomes a transparent report instead of an argument.',
      completed: false,
    },
    {
      day: 4,
      title: 'Run 1-Hour Reel Quality Benchmark with Anjali',
      focus: 'Tech-QC Export Standard',
      tasks: [
        'Test 20-second clip across 3 export presets on phone and laptop.',
        'Lock export standard: 1080x1920 (9:16), 30 fps CFR, H.264 MP4, 15-20 Mbps, 48 kHz AAC audio.',
        'Turn iPhone HDR Video toggle OFF in Camera Settings (Rec.709 sRGB only).',
      ],
      artifactOrRule: 'Keep 4K files as masters only and deliver pristine 1080p.',
      completed: false,
    },
    {
      day: 5,
      title: 'Block Agency Weekly Rhythm in Calendars',
      focus: 'Protect Creative Time from Urgent Work',
      tasks: [
        'Monday: 45-min planning sprint (Blockers, shoots, next 14 days).',
        'Tue-Wed: Batched shoot days with same-day ingest.',
        'Thursday: Schedule lock for next week & Evergreen check.',
        'Friday: Creative Hour (2 hours protected like client meeting).',
      ],
      artifactOrRule: 'Production runs 14 days ahead of posting.',
      completed: false,
    },
    {
      day: 6,
      title: 'Build Evergreen Bank of 6 Approved Posts per Client',
      focus: 'Safety Net for Late Work',
      tasks: [
        'Create 6-8 timeless, pre-approved reels per pilot client.',
        'Tag posts with Brand Brain pillars (Education, Craft, Behind the Scenes).',
        'Enable T-12h auto-fallback toggle in Command Center.',
      ],
      artifactOrRule: 'One missing person never becomes a missing post.',
      completed: false,
    },
    {
      day: 7,
      title: 'Run First Monday Sprint from Tracker',
      focus: '100% System Adoption',
      tasks: [
        'Review 14-day upcoming calendar in Command Center.',
        'Verify Saakshi, Riddhi, and Anjali only work from "My Day".',
        'Send first tokenized client review links via WhatsApp.',
      ],
      artifactOrRule: 'If it isn\'t in Sphere OS, it doesn\'t exist.',
      completed: false,
    },
  ]);

  const toggleTask = (dayNum: number) => {
    setSteps((prev) =>
      prev.map((s) => (s.day === dayNum ? { ...s, completed: !s.completed } : s))
    );
  };

  const completedCount = steps.filter((s) => s.completed).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-rose-400 font-bold">
            Implementation Blueprint • Section 13
          </span>
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">
            Sphere OS: 7-Day Rollout Playbook
          </h1>
          <p className="text-xs text-slate-400">
            Launch the 3 pilot clients step-by-step. Prove the workflow for 30 days before full 15-client scaling.
          </p>
        </div>

        {/* Progress Badge */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-right min-w-[180px]">
          <div className="text-xs text-slate-400">Rollout Progress</div>
          <div className="text-xl font-bold text-white mt-0.5">
            {completedCount} of 7 Days <span className="text-xs font-semibold text-rose-400">({progressPercent}%)</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
            <div
              className="h-full bg-rose-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Export Standard Cheat Sheet */}
      <div className="bg-gradient-to-r from-rose-950/20 via-slate-900 to-slate-900 border border-rose-500/20 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Technical Export Standard (Copy to Editor SOP)
            </h3>
          </div>
          <span className="text-[11px] text-emerald-400 font-semibold">Instagram Optimized</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <span className="text-slate-500 text-[10px] block">Resolution:</span>
            <strong className="text-white">1080x1920 (9:16)</strong>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <span className="text-slate-500 text-[10px] block">Framerate:</span>
            <strong className="text-white">30.00 fps (CFR Match)</strong>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <span className="text-slate-500 text-[10px] block">Bitrate:</span>
            <strong className="text-white">15 – 20 Mbps H.264</strong>
          </div>
          <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <span className="text-slate-500 text-[10px] block">Audio Profile:</span>
            <strong className="text-white">48 kHz AAC (-14 LUFS)</strong>
          </div>
        </div>
      </div>

      {/* Day by Day Cards */}
      <div className="space-y-4">
        {steps.map((step) => (
          <div
            key={step.day}
            className={`bg-slate-900/80 border rounded-2xl p-5 transition-all space-y-3 ${
              step.completed
                ? 'border-emerald-500/40 bg-emerald-950/5'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    step.completed
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  D{step.day}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">{step.title}</h3>
                  <span className="text-[11px] text-slate-400 font-medium">{step.focus}</span>
                </div>
              </div>

              <button
                onClick={() => toggleTask(step.day)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  step.completed
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <CheckCircle2 className={`w-3.5 h-3.5 ${step.completed ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span>{step.completed ? 'Completed' : 'Mark as Done'}</span>
              </button>
            </div>

            {/* Task Checklist */}
            <ul className="space-y-1.5 text-xs text-slate-300">
              {step.tasks.map((task, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-slate-500 font-mono">•</span>
                  <span>{task}</span>
                </li>
              ))}
            </ul>

            {/* Rule Callout */}
            <div className="pt-1 flex items-center gap-2 text-[11px] text-rose-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Core Rule: {step.artifactOrRule}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
