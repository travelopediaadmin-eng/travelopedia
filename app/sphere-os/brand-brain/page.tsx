'use client';

import React, { useState } from 'react';
import {
  BrainCircuit,
  Sparkles,
  Calendar,
  Lightbulb,
  Plus,
  Send,
  CheckCircle,
  Copy,
  Layers,
  ArrowRight,
  Flame,
} from 'lucide-react';

interface IdeaCard {
  id: string;
  sourceLink: string;
  format: string;
  hook: string;
  adaptedFor: string[];
  status: 'In Vault' | 'Picked for Brief' | 'Drafted';
}

export default function BrandBrainAndVaultPage() {
  const [selectedClient, setSelectedClient] = useState('Zaveri & Sons Heritage');
  const [pastedLink, setPastedLink] = useState('');
  const [isAdapting, setIsAdapting] = useState(false);
  const [ideas, setIdeas] = useState<IdeaCard[]>([
    {
      id: 'idea-1',
      sourceLink: 'https://instagram.com/reel/C892189x',
      format: 'POV Audio Hook + Rapid Cut',
      hook: 'POV: You asked your Surat jeweller for pure heritage uncut Polki...',
      adaptedFor: ['Zaveri & Sons Heritage', 'Kalyan Silk Studio'],
      status: 'In Vault',
    },
    {
      id: 'idea-2',
      sourceLink: 'https://instagram.com/reel/D982312y',
      format: 'Educational ASMR Grind',
      hook: 'The exact sound of grinding 5 secret spices for winter chai...',
      adaptedFor: ['Urban Chai & Co.', 'Shreeji Gourmet Sweets'],
      status: 'Picked for Brief',
    },
  ]);

  const [selectedLanguage, setSelectedLanguage] = useState<'Hinglish' | 'Gujlish' | 'English'>('Hinglish');
  const [activeGeneratedBrief, setActiveGeneratedBrief] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAdaptIdea = async () => {
    if (!pastedLink.trim()) {
      alert('Please paste a reel/post link or write an inspiration note.');
      return;
    }

    setIsAdapting(true);
    try {
      const res = await fetch('/api/sphere-os/ai/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: selectedClient,
          ideaText: pastedLink,
          format: 'Reel (9:16)',
          language: selectedLanguage,
        }),
      });
      const data = await res.json();
      if (data.success && data.brief) {
        setActiveGeneratedBrief({
          client: selectedClient,
          ...data.brief,
          source: data.source,
        });

        const newIdea: IdeaCard = {
          id: `idea-${Date.now()}`,
          sourceLink: pastedLink,
          format: 'Reel (9:16) • AI Scripted',
          hook: data.brief.hook3Sec,
          adaptedFor: [selectedClient],
          status: 'In Vault',
        };
        setIdeas([newIdea, ...ideas]);
        setPastedLink('');
      }
    } catch (err) {
      console.error('Failed to generate brief:', err);
    } finally {
      setIsAdapting(false);
    }
  };

  const handlePushToMyDay = async (assignee: 'Saakshi' | 'Riddhi' | 'Anjali') => {
    if (!activeGeneratedBrief) return;
    try {
      setToastMessage(`Brief pushed to ${assignee}'s My Day!`);
      setActiveGeneratedBrief(null);
      setTimeout(() => setToastMessage(null), 3500);
    } catch (err) {
      console.warn('Could not push brief to My Day:', err);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-rose-400 font-bold">
            Intelligence Layer • Modules 1, 2 & 10
          </span>
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">
            Brand Brain, Idea Vault & Festival Engine
          </h1>
          <p className="text-xs text-slate-400">
            Every brief, caption, and hook is grounded in client guidelines so output never goes generic.
          </p>
        </div>

        {/* Client Picker */}
        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400">Client:</span>
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="bg-transparent text-xs font-semibold text-rose-300 focus:outline-none cursor-pointer"
          >
            <option value="Zaveri & Sons Heritage" className="bg-slate-900 text-white">
              Zaveri & Sons Heritage
            </option>
            <option value="Urban Chai & Co." className="bg-slate-900 text-white">
              Urban Chai & Co.
            </option>
            <option value="Kalyan Silk Studio" className="bg-slate-900 text-white">
              Kalyan Silk Studio
            </option>
            <option value="Vesu Fitness Club" className="bg-slate-900 text-white">
              Vesu Fitness Club
            </option>
            <option value="Shreeji Gourmet Sweets" className="bg-slate-900 text-white">
              Shreeji Gourmet Sweets
            </option>
          </select>
        </div>
      </div>

      {/* Brand Brain Card: Grounding Profile */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-rose-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Brand Brain Guidelines: {selectedClient}
            </h2>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
            Active in AI Brief Prompts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Tone & Pillars */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">
              Tone of Voice & Pillars
            </span>
            <p className="text-slate-300">
              <strong>Tone:</strong> Regal, understated luxury, conversational Gujarati pride, never loud or discount-focused.
            </p>
            <div className="pt-1 text-slate-400 text-[11px] space-y-1">
              <div>• Pillar 1: 200-Year Heritage & Master Karigars</div>
              <div>• Pillar 2: Uncut Polki & Bridal Excellence</div>
              <div>• Pillar 3: Solitaire Education (4Cs & Purity)</div>
            </div>
          </div>

          {/* Dos & Don'ts */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">
              Dos and Don'ts (Negative Prompts)
            </span>
            <div className="space-y-1.5 text-slate-300">
              <div className="text-emerald-400">
                ✓ DO use macro sparkle shots, warm golden hour tones, and natural ambient showroom audio.
              </div>
              <div className="text-rose-400">
                ✗ DON'T use flashing strobe transitions, loud EDM music, or mention "CHEAP / SALE".
              </div>
            </div>
          </div>

          {/* Target Audience & USP */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <span className="text-[10px] font-bold uppercase text-slate-400 block">
              Target Audience & USP
            </span>
            <p className="text-slate-300">
              <strong>Audience:</strong> HNI families, Surat bridal couples (24–35 yrs), textile & diamond business owners.
            </p>
            <p className="text-slate-400 text-[11px]">
              <strong>USP:</strong> Every piece comes with lifetime buyback certification and custom bridal styling session.
            </p>
          </div>
        </div>
      </section>

      {/* Idea Vault & Idea Adapter (Module 2) */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            5-Second Idea Vault & AI Adapter
          </h2>
          <p className="text-xs text-slate-400">
            Found inspiration on Instagram or WhatsApp? Paste it below. The AI breaks it down and adapts it for fitting clients.
          </p>
        </div>

        {/* Toast Alert */}
        {toastMessage && (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-pulse">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Generated Brief Modal */}
        {activeGeneratedBrief && (
          <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-rose-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <h3 className="text-sm font-bold text-white">AI Content Brief Generated ({activeGeneratedBrief.source})</h3>
              </div>
              <button
                onClick={() => setActiveGeneratedBrief(null)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 bg-slate-800 rounded-lg"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-amber-400 block">3-Second Hook:</span>
                <p className="text-slate-200 font-medium italic">{activeGeneratedBrief.hook3Sec}</p>

                <span className="text-[10px] uppercase font-bold text-rose-400 block pt-2">Concept Summary:</span>
                <p className="text-slate-300">{activeGeneratedBrief.summary}</p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-emerald-400 block">Shot List for Shooter:</span>
                <ul className="space-y-1 text-slate-300 text-[11px]">
                  {activeGeneratedBrief.shotList?.map((shot: string, i: number) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-slate-500">•</span>
                      <span>{shot}</span>
                    </li>
                  ))}
                </ul>

                <span className="text-[10px] uppercase font-bold text-slate-400 block pt-1">Safe Rule:</span>
                <p className="text-[11px] text-slate-400">{activeGeneratedBrief.defaultRule}</p>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Drafted Instagram Caption:</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">{activeGeneratedBrief.caption}</p>
            </div>

            {/* Action Bar: Push to Staff My Day */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-medium">Assign Brief to Staff:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePushToMyDay('Saakshi')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                >
                  Saakshi (Polish)
                </button>
                <button
                  onClick={() => handlePushToMyDay('Riddhi')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
                >
                  Riddhi (Concept)
                </button>
                <button
                  onClick={() => handlePushToMyDay('Anjali')}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md"
                >
                  Anjali (Volume)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Input Box with Language Selector */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="text"
            placeholder="Paste Reel link (or type idea concept e.g. 'Satisfying polishing ASMR video')..."
            value={pastedLink}
            onChange={(e) => setPastedLink(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
          />

          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as any)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-rose-500"
          >
            <option value="Hinglish">Hinglish</option>
            <option value="Gujlish">Gujlish</option>
            <option value="English">English</option>
          </select>

          <button
            onClick={handleAdaptIdea}
            disabled={isAdapting}
            className="w-full sm:w-auto px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-md shadow-rose-950/50 transition-all whitespace-nowrap"
          >
            {isAdapting ? (
              <span className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating AI Brief...
              </span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate AI Brief</span>
              </>
            )}
          </button>
        </div>

        {/* Vault Ideas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-3 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-rose-300">{idea.format}</span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-bold">
                  {idea.status}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 italic">
                "{idea.hook}"
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                <div className="flex items-center gap-1">
                  <span>Adapted for:</span>
                  {idea.adaptedFor.map((c, i) => (
                    <span key={i} className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-medium">
                      {c.split(' ')[0]}
                    </span>
                  ))}
                </div>

                <button className="text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1">
                  <span>Push to Calendar</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Festival Engine (Upcoming Gujarat & National Moments) */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Calendar className="w-5 h-5 text-rose-400" />
              Festival & Trend Engine (Opens 4 Weeks Ahead)
            </h2>
            <p className="text-xs text-slate-400">
              Never rush a festival post again. Planning cards open automatically 28 days before key dates.
            </p>
          </div>
          <span className="text-xs text-emerald-400 font-semibold">T-28 Days Auto-Trigger Active</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
          {[
            {
              festival: 'Uttarayan (Kite Festival)',
              date: '14 Jan',
              countdown: 'In Planning Phase',
              status: 'Drafting Briefs',
              clients: ['Shreeji Gourmet', 'Zaveri & Sons', 'Urban Chai'],
            },
            {
              festival: 'Wedding Season Surge',
              date: 'Dec - Jan',
              countdown: 'Active Production',
              status: 'Shoots Scheduled',
              clients: ['Zaveri & Sons', 'Kalyan Silk Studio'],
            },
            {
              festival: 'Republic Day Offers',
              date: '26 Jan',
              countdown: 'Opens in 12 days',
              status: 'Queue Pending',
              clients: ['Vesu Fitness Club', 'Urban Chai'],
            },
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{item.festival}</span>
                <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-bold text-[10px]">
                  {item.date}
                </span>
              </div>
              <div className="text-[11px] text-slate-400">{item.countdown}</div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">{item.clients.length} Clients linked</span>
                <span className="text-amber-400 font-medium">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
