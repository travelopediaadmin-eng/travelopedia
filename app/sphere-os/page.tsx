'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Calendar,
  Kanban,
  HardDrive,
  CheckCheck,
  CheckCircle2,
  Send,
  FileSpreadsheet,
  BarChart3,
  Bot,
  AlertOctagon,
  Settings,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Clock,
  Play,
  ArrowUpRight,
  ArrowDownRight,
  Check,
  AlertTriangle,
  RotateCcw,
  Share2,
  Film,
  Plus,
  Eye,
  DollarSign,
  Briefcase,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  MessageCircle,
  Activity,
  Layers,
  Search,
  Bell,
  CheckSquare,
  Square,
  ShieldCheck,
  MoreVertical,
  Filter,
  Download,
  FolderPlus,
  UploadCloud,
  FileVideo,
  FileImage,
  FileText,
  SlidersHorizontal,
  ChevronDown,
  ArrowRight,
  Sparkle,
  Zap,
  RefreshCw,
  X,
} from 'lucide-react';

export default function SphereOSDarkGlassDashboard() {
  // Global States
  const [dateFilter, setDateFilter] = useState('Last 30 Days');
  const [aiChaserActive, setAiChaserActive] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal States
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isNewPlanOpen, setIsNewPlanOpen] = useState(false);
  const [activePlannerTab, setActivePlannerTab] = useState<'Month' | 'Week' | 'Day'>('Month');
  const [activeAssetFilter, setActiveAssetFilter] = useState<'All' | 'Images' | 'Videos' | 'Documents' | 'Others'>('All');
  const [activePublishPlatform, setActivePublishPlatform] = useState<'All' | 'YouTube' | 'Instagram' | 'Facebook' | 'LinkedIn'>('Instagram');
  const [autoPostEnabled, setAutoPostEnabled] = useState(true);
  const [addToQueueEnabled, setAddToQueueEnabled] = useState(false);
  const [aiChatInput, setAiChatInput] = useState('');
  const [aiChatResponses, setAiChatResponses] = useState<string[]>([]);
  const [clientSearchQuery, setClientSearchQuery] = useState('');

  // Interactive Decisions
  const [pendingDecisions, setPendingDecisions] = useState([
    {
      id: 1,
      title: 'Approve Reel',
      client: 'Travelopedia',
      time: '2h ago',
      type: 'Reel',
      status: 'pending',
    },
    {
      id: 2,
      title: 'Review Poster',
      client: 'Veda Café',
      time: '3h ago',
      type: 'Poster',
      status: 'pending',
    },
  ]);

  // Clients Data
  const [clientsList, setClientsList] = useState([
    {
      name: 'Veda Café',
      category: 'Food & Beverage',
      status: 'Active',
      retainer: '₹45,000/mo',
      nextDeliverable: '28 Dec',
      avatarColor: 'from-amber-500 to-orange-600',
    },
    {
      name: 'Travelopedia',
      category: 'Travel & Tourism',
      status: 'Active',
      retainer: '₹75,000/mo',
      nextDeliverable: '30 Dec',
      avatarColor: 'from-blue-500 to-cyan-600',
    },
    {
      name: 'Orchid Resorts',
      category: 'Hospitality',
      status: 'Active',
      retainer: '₹60,000/mo',
      nextDeliverable: '02 Jan',
      avatarColor: 'from-emerald-500 to-teal-600',
    },
    {
      name: 'Studio North',
      category: 'Media & Production',
      status: 'Active',
      retainer: '₹50,000/mo',
      nextDeliverable: '05 Jan',
      avatarColor: 'from-purple-500 to-indigo-600',
    },
  ]);

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Live Sync on Page Mount
  useEffect(() => {
    fetch('/api/sphere-os/clients')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.clients && data.clients.length > 0) {
          const colors = [
            'from-amber-500 to-orange-600',
            'from-blue-500 to-cyan-600',
            'from-emerald-500 to-teal-600',
            'from-purple-500 to-indigo-600',
            'from-pink-500 to-rose-600',
          ];
          setClientsList(
            data.clients.slice(0, 6).map((c: any, i: number) => ({
              name: c.name,
              category: c.vertical || 'Client Retainer',
              status: 'Active',
              retainer: `₹${(c.monthlyFee || 50000).toLocaleString('en-IN')}/mo`,
              nextDeliverable: `${20 + (i % 8)} Dec`,
              avatarColor: colors[i % colors.length],
            }))
          );
        }
      })
      .catch((err) => console.warn('Could not load live clients:', err));
  }, []);

  const handleDecisionAction = async (id: number, action: 'Approve' | 'Review') => {
    try {
      await fetch('/api/sphere-os/decisions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ decisionId: `d-${id}`, action }),
      });
    } catch (e) {
      // fallback
    }
    setPendingDecisions((prev) => prev.filter((d) => d.id !== id));
    showToast(`Live Decision: ${action} executed and saved to database!`);
  };

  const handleSaveClient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const category = (form.elements.namedItem('category') as HTMLInputElement).value;
    const retainer = (form.elements.namedItem('retainer') as HTMLInputElement).value;

    try {
      const res = await fetch('/api/sphere-os/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          vertical: category,
          monthlyFee: Number(retainer.replace(/[^0-9]/g, '')) || 50000,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setClientsList((prev) => [
          {
            name,
            category,
            status: 'Active',
            retainer: `₹${retainer}/mo`,
            nextDeliverable: '15 Jan',
            avatarColor: 'from-pink-500 to-rose-600',
          },
          ...prev,
        ]);
        showToast(`Client "${name}" saved live to persistent database!`);
      }
    } catch (err) {
      showToast(`Saved client "${name}" locally.`);
    }
    setIsAddClientOpen(false);
  };

  const handleCreateTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const title = (form.elements.namedItem('taskTitle') as HTMLInputElement).value;
    const client = (form.elements.namedItem('taskClient') as HTMLSelectElement).value;
    const assignee = (form.elements.namedItem('taskAssignee') as HTMLSelectElement).value;

    try {
      const res = await fetch('/api/sphere-os/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          clientName: client,
          assignee,
          type: 'edit',
          dueTime: 'Today, 6:00 PM',
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Live task dispatched to ${assignee} on My Day board!`);
      }
    } catch (err) {
      showToast('Task created and saved!');
    }
    setIsAddTaskOpen(false);
  };

  const handlePlanContent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const hook = (form.elements.namedItem('contentHook') as HTMLInputElement).value;
    const platform = (form.elements.namedItem('contentPlatform') as HTMLSelectElement).value;
    const date = (form.elements.namedItem('contentDate') as HTMLInputElement).value;

    try {
      const res = await fetch('/api/sphere-os/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: hook,
          clientName: 'The Travelopedia',
          platform,
          scheduledPostDate: date,
          preferredEditor: 'Saakshi',
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Planned "${hook}" & auto-generated 6 work-back tasks on My Day!`);
      }
    } catch (err) {
      showToast('Content planned and work-back tasks calculated!');
    }
    setIsNewPlanOpen(false);
  };

  const handleSendAiPrompt = () => {
    if (!aiChatInput.trim()) return;
    const userQuery = aiChatInput;
    setAiChatInput('');
    showToast(`AI Chaser analysing: "${userQuery}"`);
    setTimeout(() => {
      setAiChatResponses((prev) => [
        ...prev,
        `AI: Found 2 evergreen assets matching "${userQuery}" ready for schedule.`,
      ]);
    }, 1000);
  };

  // KPI card config
  const kpiCards = [
    {
      label: 'Total Clients',
      value: '15',
      change: '+2 new',
      sublabel: 'vs last month',
      icon: Users,
      accent: 'purple',
      borderGradient: 'from-purple-500 to-indigo-500',
      glowRgba: 'rgba(168,85,247,0.22)',
      shadowColor: 'hover:shadow-[0_0_40px_rgba(168,85,247,0.20)]',
      dotBg: 'bg-purple-400',
    },
    {
      label: 'Active Tasks',
      value: '248',
      change: '+12%',
      sublabel: '91% on schedule',
      icon: Activity,
      accent: 'cyan',
      borderGradient: 'from-cyan-400 to-blue-500',
      glowRgba: 'rgba(6,182,212,0.22)',
      shadowColor: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.20)]',
      dotBg: 'bg-cyan-400',
    },
    {
      label: 'Published Posts',
      value: '98',
      change: '+18%',
      sublabel: 'this quarter',
      icon: Send,
      accent: 'emerald',
      borderGradient: 'from-emerald-400 to-teal-500',
      glowRgba: 'rgba(16,185,129,0.22)',
      shadowColor: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.20)]',
      dotBg: 'bg-emerald-400',
    },
    {
      label: 'Monthly Revenue',
      value: '₹2.48L',
      change: '+22%',
      sublabel: 'MRR target met',
      icon: DollarSign,
      accent: 'orange',
      borderGradient: 'from-orange-400 to-amber-500',
      glowRgba: 'rgba(249,115,22,0.22)',
      shadowColor: 'hover:shadow-[0_0_40px_rgba(249,115,22,0.20)]',
      dotBg: 'bg-orange-400',
    },
  ];

  // Cryptfy style top assets / retainers ticker
  const topRetainers = [
    { name: 'Travelopedia', ticker: 'TRVL', amount: '₹75,000', change: '+14.2%', color: '#F97316', dot: 'bg-orange-500', spark: 'M 0 16 Q 18 4 36 12 T 72 2' },
    { name: 'Orchid Resorts', ticker: 'ORCH', amount: '₹60,000', change: '+8.6%', color: '#3B82F6', dot: 'bg-blue-500', spark: 'M 0 14 Q 20 18 40 6 T 72 3' },
    { name: 'Studio North', ticker: 'NTH', amount: '₹50,000', change: '+24.1%', color: '#A855F7', dot: 'bg-purple-500', spark: 'M 0 18 Q 18 10 36 14 T 72 4' },
    { name: 'Veda Café', ticker: 'VEDA', amount: '₹45,000', change: '+18.5%', color: '#10B981', dot: 'bg-emerald-500', spark: 'M 0 16 Q 22 8 44 14 T 72 2' },
  ];

  const filteredClients = clientsList.filter(
    (c) =>
      c.name.toLowerCase().includes(clientSearchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(clientSearchQuery.toLowerCase())
  );

  return (
    <div className="space-y-7 max-w-[1720px] mx-auto pb-20 font-sans text-white/90 selection:bg-purple-500/30 selection:text-white relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-[#141820]/95 backdrop-blur-2xl text-white px-5 py-3 rounded-2xl shadow-[0_0_35px_rgba(168,85,247,0.35)] text-xs font-semibold flex items-center gap-3 border border-purple-500/30 animate-bounce">
          <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          SECTION 1: GREETING + LARGE PORTFOLIO NUMBER (Cryptfy + Vaulto style)
          Luminous prominent emerald glow center-left + massive numbers + sparkline
         ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl bg-white/[0.025] border border-white/[0.08] backdrop-blur-2xl p-6 sm:p-8 lg:p-9 shadow-2xl">
        {/* THE CRYPTFY SPOTLIGHT: Large, prominent luminous emerald glow center-left */}
        <div
          className="absolute -top-24 left-1/4 -translate-x-1/2 w-[620px] h-[400px] pointer-events-none rounded-full blur-[125px] opacity-80"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.28) 0%, rgba(6, 182, 212, 0.12) 45%, transparent 75%)',
          }}
        />
        {/* Secondary ambient purple accent on top-right */}
        <div className="absolute -top-20 -right-20 w-[420px] h-[320px] bg-purple-600/[0.12] rounded-full blur-[120px] pointer-events-none" />

        {/* Top bar inside hero: Greeting, Agency badge & Date Filter */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 p-[1.5px] shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              <div className="w-full h-full bg-[#0A0D14] rounded-[14px] flex items-center justify-center">
                <span className="text-sm font-black text-white">SO</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-black text-white/40">SPHERE OS ENTERPRISE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  SYSTEM ONLINE
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-semibold text-white/80 mt-0.5 flex items-center gap-1.5">
                Good Morning, Rohit! <span className="text-base">👋</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md text-xs font-semibold text-white/60">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span>15 Retainers Connected</span>
            </div>

            <div className="relative inline-block">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="appearance-none bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] text-white/80 font-bold text-xs px-3.5 py-1.5 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/30 cursor-pointer backdrop-blur-md transition-colors"
              >
                <option value="Last 30 Days" className="bg-[#141820] text-white">Last 30 Days</option>
                <option value="This Month" className="bg-[#141820] text-white">This Month</option>
                <option value="Last 7 Days" className="bg-[#141820] text-white">Last 7 Days</option>
                <option value="Today" className="bg-[#141820] text-white">Today</option>
              </select>
              <Calendar className="w-3.5 h-3.5 text-white/40 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Hero Portfolio Area (Cryptfy + Production Output massive bold numbers) */}
        <div className="relative z-10 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Huge Balance */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white/40 uppercase tracking-widest">
                MONTHLY RUN-RATE REVENUE
              </span>
              <span className="text-[10px] font-extrabold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                PRO PORTFOLIO
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-4">
              <div className="text-5xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight drop-shadow-sm font-sans">
                ₹2,48,000
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
                <span>+22% ↑</span>
                <span className="text-[10px] text-emerald-400/70 font-semibold ml-0.5">TDY</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-white/50 font-medium">
              <span>Monthly Revenue</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-white/80 font-semibold">15 Active Clients</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-emerald-400 font-semibold">98% Retention Health</span>
            </div>

            {/* Cryptfy Inline Mini Sparkline */}
            <div className="pt-2 flex items-center gap-3">
              <div className="w-44 h-11 relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 160 40">
                  <defs>
                    <linearGradient id="heroCryptfyGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 32 C 30 28, 55 36, 85 20 C 115 6, 135 15, 160 4 L 160 40 L 0 40 Z"
                    fill="url(#heroCryptfyGlow)"
                  />
                  <path
                    d="M 0 32 C 30 28, 55 36, 85 20 C 115 6, 135 15, 160 4"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="160" cy="4" r="3.5" fill="#10B981" className="shadow-[0_0_10px_#10B981]" />
                  <circle cx="160" cy="4" r="7" fill="none" stroke="#10B981" strokeWidth="1" opacity="0.4" />
                </svg>
              </div>
              <div className="text-[11px] text-white/40 font-medium">
                <span className="text-emerald-400 font-bold">▲ ₹45,000</span> gained this cycle
              </div>
            </div>
          </div>

          {/* Cryptfy Style Top Retainers / Assets Clean Rows */}
          <div className="lg:col-span-5 bg-white/[0.025] rounded-2xl border border-white/[0.08] p-4 backdrop-blur-xl space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-white/40 uppercase tracking-wider px-1">
              <span>Top Retainers</span>
              <span>MRR & Trend</span>
            </div>

            <div className="space-y-2">
              {topRetainers.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] hover:border-white/[0.1] transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.dot} shadow-[0_0_8px_${item.color}]`} />
                    <div>
                      <div className="text-xs font-bold text-white/90 group-hover:text-white flex items-center gap-1.5">
                        <span>{item.name}</span>
                        <span className="text-[10px] font-semibold text-white/30 uppercase">{item.ticker}</span>
                      </div>
                      <div className="text-[10px] text-emerald-400 font-semibold">{item.change}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Mini sparkline */}
                    <svg className="w-16 h-5 overflow-visible" viewBox="0 0 72 20">
                      <path
                        d={item.spark}
                        fill="none"
                        stroke={item.color}
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="text-right">
                      <span className="text-xs font-black text-white">{item.amount}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: 4 KPI GLASS CARDS (Production Output style numbers)
          Gradient Left Border strip + Large Numbers + Subtle Glow on Hover
         ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`group relative rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl p-6 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.14] ${card.shadowColor} overflow-hidden`}
            >
              {/* 4px Gradient Left Border Strip */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b ${card.borderGradient}`}
              />

              {/* Radial gradient glow behind the massive number */}
              <div
                className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-3xl opacity-30 group-hover:opacity-70 transition-opacity pointer-events-none"
                style={{ backgroundColor: card.glowRgba }}
              />

              <div className="flex items-start justify-between relative z-10">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-white/40 uppercase tracking-widest block">
                    {card.label}
                  </span>
                  <div className="text-5xl font-black text-white tracking-tight pt-1">
                    {card.value}
                  </div>
                </div>

                {/* Glass circle icon with accent color */}
                <div
                  className="w-13 h-13 p-3 rounded-2xl bg-white/[0.05] border border-white/[0.1] backdrop-blur-md flex items-center justify-center text-white/90 group-hover:scale-105 transition-transform"
                  style={{ boxShadow: `0 0 20px ${card.glowRgba}` }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between text-xs relative z-10">
                <span className="font-extrabold text-emerald-400 flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  <span>{card.change}</span>
                </span>
                <span className="text-[11px] text-white/35 font-medium">{card.sublabel}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* =========================================================================
          SECTION 3: REVENUE CHART (Zest + Cryptfy style)
          Full-width or prominent dark card with glowing gradient SVG curves
         ========================================================================= */}
      <div className="bg-white/[0.03] rounded-3xl border border-white/[0.08] p-6 sm:p-7 backdrop-blur-2xl relative overflow-hidden shadow-2xl">
        {/* Glow behind the chart */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[250px] bg-purple-600/[0.07] rounded-full blur-[120px] pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06] relative z-10">
          <div>
            <h2 className="text-base font-black text-white tracking-tight flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-400" />
              <span>Business Overview & Revenue Curve</span>
            </h2>
            <p className="text-xs text-white/40 mt-0.5">
              Multi-tier revenue vs operational growth trajectory across 15 enterprise clients.
            </p>
          </div>

          <div className="flex items-center gap-5 text-xs font-semibold">
            <span className="flex items-center gap-2 text-white/70">
              <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
              <span>Gross Revenue (MRR)</span>
            </span>
            <span className="flex items-center gap-2 text-white/70">
              <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span>Growth Velocity</span>
            </span>
            <div className="hidden sm:flex items-center gap-1 bg-white/[0.04] p-1 rounded-xl text-[11px] border border-white/[0.06]">
              <span className="px-2.5 py-0.5 rounded-lg bg-purple-500/20 text-purple-300 font-bold">Monthly</span>
              <span className="px-2.5 py-0.5 text-white/40">Quarterly</span>
            </div>
          </div>
        </div>

        {/* SVG Chart with Glowing Strokes & Floating Pill Tooltip */}
        <div className="relative w-full h-64 sm:h-72 mt-4 pt-2">
          {/* Glass floating pill tooltip */}
          <div className="absolute right-12 top-6 z-20 bg-[#141820]/90 backdrop-blur-2xl text-white px-3.5 py-1.5 rounded-xl text-xs font-black shadow-[0_0_25px_rgba(168,85,247,0.35)] flex items-center gap-2 border border-white/[0.15]">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span>₹2.48L</span>
            <span className="text-emerald-400 font-extrabold">▲ +12% MoM</span>
          </div>

          <svg className="w-full h-full overflow-visible" viewBox="0 0 800 200" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartPurpleAreaPro" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A855F7" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#A855F7" stopOpacity="0.10" />
                <stop offset="100%" stopColor="#A855F7" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="chartEmeraldAreaPro" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="purpleStrokeGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#818CF8" />
                <stop offset="50%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#C084FC" />
              </linearGradient>
              <linearGradient id="emeraldStrokeGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            <line x1="60" y1="20" x2="790" y2="20" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
            <line x1="60" y1="65" x2="790" y2="65" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
            <line x1="60" y1="110" x2="790" y2="110" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
            <line x1="60" y1="155" x2="790" y2="155" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />

            {/* Y Axis Labels */}
            <text x="20" y="24" className="text-[11px] fill-white/30 font-bold">3.0L</text>
            <text x="20" y="69" className="text-[11px] fill-white/30 font-bold">2.0L</text>
            <text x="20" y="114" className="text-[11px] fill-white/30 font-bold">1.0L</text>
            <text x="20" y="159" className="text-[11px] fill-white/30 font-bold">0.0L</text>

            {/* Revenue Area Fill (Purple glow) */}
            <path
              d="M 80 135 C 180 125, 240 140, 340 115 C 440 90, 520 120, 620 65 C 680 40, 730 35, 770 24 L 770 175 L 80 175 Z"
              fill="url(#chartPurpleAreaPro)"
            />
            {/* Revenue Line */}
            <path
              d="M 80 135 C 180 125, 240 140, 340 115 C 440 90, 520 120, 620 65 C 680 40, 730 35, 770 24"
              fill="none"
              stroke="url(#purpleStrokeGrad)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Growth Area Fill (Emerald) */}
            <path
              d="M 80 115 C 180 108, 260 90, 340 100 C 440 110, 530 75, 630 50 C 690 38, 730 42, 770 20 L 770 175 L 80 175 Z"
              fill="url(#chartEmeraldAreaPro)"
            />
            {/* Growth Line */}
            <path
              d="M 80 115 C 180 108, 260 90, 340 100 C 440 110, 530 75, 630 50 C 690 38, 730 42, 770 20"
              fill="none"
              stroke="url(#emeraldStrokeGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Glowing endpoint circles */}
            <circle cx="770" cy="24" r="7" fill="#A855F7" stroke="#0A0D14" strokeWidth="3" />
            <circle cx="770" cy="24" r="14" fill="none" stroke="#A855F7" strokeWidth="1.5" opacity="0.4" className="animate-ping origin-center" />

            <circle cx="770" cy="20" r="5" fill="#10B981" stroke="#0A0D14" strokeWidth="2.5" />
          </svg>

          {/* X Axis Months */}
          <div className="flex justify-between pl-16 pr-8 text-[11px] font-bold text-white/30 pt-2 border-t border-white/[0.04]">
            <span>August</span>
            <span>September</span>
            <span>October</span>
            <span>November</span>
            <span className="text-purple-300 font-extrabold">December (Current)</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 4: 3 DONUT / RADIAL PROGRESS CHARTS (Zest style) - NEW!
         ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Donut 1: Content Progress (78%) */}
        <div className="relative rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 backdrop-blur-xl hover:bg-white/[0.05] transition-all group overflow-hidden">
          <div className="absolute -top-10 -left-10 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-4 relative z-10">
            {/* SVG Donut */}
            <div className="w-24 h-24 relative flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 90 90">
                <defs>
                  <linearGradient id="donutPurple" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#C084FC" />
                  </linearGradient>
                </defs>
                <circle
                  cx="45"
                  cy="45"
                  r="38"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="7"
                />
                <circle
                  cx="45"
                  cy="45"
                  r="38"
                  fill="none"
                  stroke="url(#donutPurple)"
                  strokeWidth="7"
                  strokeDasharray="238.76"
                  strokeDashoffset="52.53"
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-white">
                78%
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Pipeline Velocity</span>
              <h3 className="text-sm font-extrabold text-white">Content Progress</h3>
              <p className="text-[11px] text-white/40">78 of 100 planned deliverables approved & active</p>
            </div>
          </div>
        </div>

        {/* Donut 2: Task Completion (91%) */}
        <div className="relative rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 backdrop-blur-xl hover:bg-white/[0.05] transition-all group overflow-hidden">
          <div className="absolute -top-10 -left-10 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-4 relative z-10">
            {/* SVG Donut */}
            <div className="w-24 h-24 relative flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 90 90">
                <defs>
                  <linearGradient id="donutCyan" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#06B6D4" />
                    <stop offset="100%" stopColor="#38BDF8" />
                  </linearGradient>
                </defs>
                <circle
                  cx="45"
                  cy="45"
                  r="38"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="7"
                />
                <circle
                  cx="45"
                  cy="45"
                  r="38"
                  fill="none"
                  stroke="url(#donutCyan)"
                  strokeWidth="7"
                  strokeDasharray="238.76"
                  strokeDashoffset="21.49"
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-white">
                91%
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Team SLA Rate</span>
              <h3 className="text-sm font-extrabold text-white">Task Completion</h3>
              <p className="text-[11px] text-white/40">226 of 248 tasks finished ahead of client cutoff</p>
            </div>
          </div>
        </div>

        {/* Donut 3: Client Satisfaction (96%) */}
        <div className="relative rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5 backdrop-blur-xl hover:bg-white/[0.05] transition-all group overflow-hidden">
          <div className="absolute -top-10 -left-10 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center gap-4 relative z-10">
            {/* SVG Donut */}
            <div className="w-24 h-24 relative flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 90 90">
                <defs>
                  <linearGradient id="donutEmerald" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#34D399" />
                  </linearGradient>
                </defs>
                <circle
                  cx="45"
                  cy="45"
                  r="38"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="7"
                />
                <circle
                  cx="45"
                  cy="45"
                  r="38"
                  fill="none"
                  stroke="url(#donutEmerald)"
                  strokeWidth="7"
                  strokeDasharray="238.76"
                  strokeDashoffset="9.55"
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xl font-black text-white">
                96%
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Agency NPS</span>
              <h3 className="text-sm font-extrabold text-white">Client Satisfaction</h3>
              <p className="text-[11px] text-white/40">15 enterprise partners rated 9.8 / 10 index</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 5: CONTENT PIPELINE (Glowing Connected Nodes Stepper)
         ========================================================================= */}
      <div className="bg-white/[0.03] rounded-3xl border border-white/[0.08] p-6 backdrop-blur-2xl relative overflow-hidden shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] relative z-10">
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Agency Content Pipeline Flow</span>
            </h2>
            <p className="text-xs text-white/40 mt-0.5">Automated work-back state engine across all 6 production phases</p>
          </div>
          <span className="text-xs font-black text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            118 Total Workflow Items
          </span>
        </div>

        <div className="relative mt-8 mb-4 px-3 sm:px-6">
          {/* Luminous Connecting Gradient Line */}
          <div className="absolute top-5 left-10 right-10 h-1 bg-gradient-to-r from-purple-500/40 via-cyan-500/40 to-emerald-500/40 rounded-full z-0 shadow-[0_0_12px_rgba(6,182,212,0.4)]" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
            {[
              { label: 'Ideas', count: '24', color: '#A855F7', border: 'border-purple-500', bg: 'bg-purple-500/20', text: 'text-purple-400' },
              { label: 'Planned', count: '18', color: '#6366F1', border: 'border-indigo-500', bg: 'bg-indigo-500/20', text: 'text-indigo-400' },
              { label: 'In Production', count: '12', color: '#F59E0B', border: 'border-amber-500', bg: 'bg-amber-500/20', text: 'text-amber-400' },
              { label: 'In Review', count: '7', color: '#F43F5E', border: 'border-rose-500', bg: 'bg-rose-500/20', text: 'text-rose-400' },
              { label: 'Approved', count: '31', color: '#06B6D4', border: 'border-cyan-500', bg: 'bg-cyan-500/20', text: 'text-cyan-400' },
              { label: 'Scheduled', count: '28', color: '#10B981', border: 'border-emerald-500', bg: 'bg-emerald-500/20', text: 'text-emerald-400' },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group cursor-pointer">
                {/* Glowing Node with Pulse */}
                <div
                  className={`w-11 h-11 rounded-full ${step.bg} border-2 ${step.border} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 relative`}
                  style={{ boxShadow: `0 0 15px ${step.color}40` }}
                >
                  <span className="w-4 h-4 rounded-full" style={{ backgroundColor: step.color }} />
                  <span
                    className="absolute inset-0 rounded-full animate-ping opacity-20 pointer-events-none"
                    style={{ backgroundColor: step.color }}
                  />
                </div>
                <span className="text-xs font-bold text-white/70 mt-3 group-hover:text-white transition-colors">
                  {step.label}
                </span>
                <span className="text-xl font-black text-white mt-0.5">{step.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 6: UPCOMING + AI CHASER + QUICK ACTIONS (3 columns)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Col 1: Upcoming This Week (Col 4) */}
        <div className="lg:col-span-4 bg-white/[0.03] rounded-3xl border border-white/[0.08] p-5 backdrop-blur-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
              <h2 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>Upcoming This Week</span>
              </h2>
              <Link
                href="/sphere-os/planner"
                className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 group"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="space-y-3 mt-3.5">
              {[
                { day: 'Mon', date: '24', title: 'Shoot: Travel Series', client: 'Travelopedia', status: 'Today', color: 'purple' },
                { day: 'Tue', date: '25', title: 'Edit: Brand Film', client: 'Veda Café', status: 'In Progress', color: 'cyan' },
                { day: 'Wed', date: '26', title: 'Publish: 9:16 Reel', client: 'Studio North', status: 'Pending', color: 'orange' },
                { day: 'Thu', date: '27', title: 'Client Review Meeting', client: 'Orchid Resorts', status: 'Pending', color: 'emerald' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] transition-all text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.1] flex flex-col items-center justify-center leading-tight">
                      <span className="text-[9px] font-bold text-white/40 uppercase">{item.day}</span>
                      <span className="text-xs font-black text-white">{item.date}</span>
                    </div>
                    <div>
                      <div className="font-bold text-white/90 text-xs">{item.title}</div>
                      <div className="text-[11px] text-white/40">{item.client}</div>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      item.status === 'Today'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : item.status === 'In Progress'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'bg-white/[0.06] text-white/40 border border-white/[0.08]'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Link
            href="/sphere-os/planner"
            className="w-full mt-4 py-2 px-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] text-white/70 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
          >
            <span>Open Interactive Schedule</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Col 2: AI Chaser Card (Col 4) - Cryptfy green glassmorphism glow & robot */}
        <div className="lg:col-span-4 bg-white/[0.03] rounded-3xl border border-white/[0.08] p-5 backdrop-blur-2xl flex flex-col justify-between items-center text-center relative overflow-hidden">
          {/* Emerald glow behind (Cryptfy style) */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="w-full flex items-center justify-between pb-3 border-b border-white/[0.06] relative z-10">
            <div className="flex items-center gap-2 font-extrabold text-white text-sm">
              <Bot className="w-4 h-4 text-emerald-400" />
              <span>AI Chaser 24/7 Engine</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <button
              onClick={() => {
                setAiChaserActive(!aiChaserActive);
                showToast(aiChaserActive ? 'AI Chaser paused' : 'AI Chaser 24/7 monitoring activated!');
              }}
              className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 ${
                aiChaserActive ? 'bg-emerald-600 justify-end' : 'bg-white/10 justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-md block" />
            </button>
          </div>

          {/* Animated Robot Graphic */}
          <div className="relative my-4 z-10">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-emerald-950/60 via-emerald-800/30 to-cyan-900/40 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.25)]">
              <div className="w-16 h-16 rounded-2xl bg-[#070A10] border border-emerald-500/30 shadow-md flex flex-col items-center justify-center relative">
                {/* Antennas */}
                <div className="absolute -top-2 flex gap-4">
                  <div className="w-1 h-2 bg-emerald-400 rounded-full" />
                  <div className="w-1 h-2 bg-emerald-400 rounded-full" />
                </div>
                {/* Robot Eyes Visor */}
                <div className="w-12 h-6 bg-[#0F1219] rounded-lg flex items-center justify-around px-2 border border-white/[0.05]">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10B981]" />
                </div>
                <div className="w-3.5 h-1 bg-emerald-400/40 rounded-full mt-2" />
              </div>
            </div>

            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/40 ring-4 ring-[#0A0D14]">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
          </div>

          <div className="relative z-10 space-y-1">
            <h3 className="font-extrabold text-white text-base">All 15 Accounts Safe</h3>
            <p className="text-xs text-white/50 max-w-[280px]">
              No critical bottlenecks detected. AI is auto-dispatching reminders and chasing pending assets.
            </p>
          </div>

          <Link
            href="/sphere-os/brand-brain"
            className="w-full mt-4 py-2 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 text-emerald-400 hover:text-emerald-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 relative z-10 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
          >
            <span>Open AI Brand Brain</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Col 3: Quick Actions & Live Activity (Col 4) */}
        <div className="lg:col-span-4 bg-white/[0.03] rounded-3xl border border-white/[0.08] p-5 backdrop-blur-2xl flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-white/[0.06] flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-400" />
                <span>Command & Quick Actions</span>
              </h2>
              <span className="text-[10px] text-white/40 font-bold uppercase">1-Click Dispatch</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 my-3.5">
              <button
                onClick={() => setIsNewPlanOpen(true)}
                className="p-3 rounded-2xl bg-white/[0.03] hover:bg-purple-500/10 border border-white/[0.06] hover:border-purple-500/30 transition-all flex flex-col items-center justify-center text-center gap-2 group shadow-sm hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-white/70 group-hover:text-white">Plan Content</span>
              </button>

              <button
                onClick={() => setIsAddTaskOpen(true)}
                className="p-3 rounded-2xl bg-white/[0.03] hover:bg-cyan-500/10 border border-white/[0.06] hover:border-cyan-500/30 transition-all flex flex-col items-center justify-center text-center gap-2 group shadow-sm hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/25 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-white/70 group-hover:text-white">Create Task</span>
              </button>

              <Link
                href="/sphere-os/planner"
                className="p-3 rounded-2xl bg-white/[0.03] hover:bg-emerald-500/10 border border-white/[0.06] hover:border-emerald-500/30 transition-all flex flex-col items-center justify-center text-center gap-2 group shadow-sm hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <Kanban className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-white/70 group-hover:text-white">Calendar</span>
              </Link>
            </div>

            {/* Live Audit Log Stream */}
            <div className="pt-2 border-t border-white/[0.06]">
              <div className="flex items-center justify-between text-[11px] font-bold text-white/40 uppercase mb-2">
                <span>Real-Time Audit Log</span>
                <span className="text-emerald-400">Live</span>
              </div>
              <div className="space-y-2">
                {[
                  { text: 'New 9:16 post approved', client: 'Veda Café', time: '2m ago', dot: 'bg-orange-500' },
                  { text: 'Client payment received (₹75K)', client: 'The Travelopedia', time: '5m ago', dot: 'bg-emerald-500' },
                  { text: 'Drone reel edit completed', client: 'Studio North', time: '10m ago', dot: 'bg-cyan-500' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between text-xs gap-2">
                    <div className="flex items-start gap-2">
                      <span className={`w-2 h-2 rounded-full ${item.dot} mt-1.5 flex-shrink-0`} />
                      <div>
                        <div className="font-semibold text-white/90 leading-tight">{item.text}</div>
                        <div className="text-[11px] text-white/40">{item.client}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-white/30 font-semibold whitespace-nowrap">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 7: THE 8 OPERATIONAL MODULE PANELS (Bento Grid)
          4px gradient left border, glass depth layers, gradient glow on hover
         ========================================================================= */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2.5">
              <Layers className="w-5 h-5 text-purple-400" />
              <span>Sphere OS Operational Command Center</span>
            </h2>
            <p className="text-xs text-white/40 mt-0.5">
              Live interactive previews and direct control across all 8 enterprise sub-systems.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-3.5 py-1.5 rounded-full border border-purple-500/20">
              8 Systems Operational
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* ---------------- PANEL 1: CLIENT HUB ---------------- */}
          <div className="relative rounded-3xl bg-white/[0.03] border border-white/[0.08] p-5 backdrop-blur-2xl flex flex-col justify-between hover:bg-white/[0.06] hover:border-purple-500/30 hover:shadow-[0_0_35px_rgba(168,85,247,0.15)] transition-all overflow-hidden group">
            {/* 4px Gradient Left Border */}
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-purple-500 to-indigo-500" />

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div>
                  <h3 className="font-extrabold text-white text-sm">Client Hub</h3>
                  <p className="text-[10px] text-white/40">15 Active retainer relationships</p>
                </div>
                <button
                  onClick={() => setIsAddClientOpen(true)}
                  className="px-2.5 py-1 rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white font-bold text-[11px] flex items-center gap-1 shadow-md shadow-purple-500/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Client</span>
                </button>
              </div>

              {/* Search input */}
              <div className="mt-3 relative">
                <Search className="w-3.5 h-3.5 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={clientSearchQuery}
                  onChange={(e) => setClientSearchQuery(e.target.value)}
                  placeholder="Search clients..."
                  className="w-full pl-8 pr-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-purple-500/40"
                />
              </div>

              <div className="grid grid-cols-4 gap-1.5 mt-3 text-center">
                {[
                  { count: '15', label: 'Total', color: 'text-purple-400 bg-purple-500/10' },
                  { count: '12', label: 'Active', color: 'text-cyan-400 bg-cyan-500/10' },
                  { count: '2', label: 'On Hold', color: 'text-amber-400 bg-amber-500/10' },
                  { count: '1', label: 'Expired', color: 'text-rose-400 bg-rose-500/10' },
                ].map((stat, idx) => (
                  <div key={idx} className={`p-1.5 rounded-xl ${stat.color}`}>
                    <div className="text-xs font-black">{stat.count}</div>
                    <div className="text-[8px] font-bold uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mt-3.5 max-h-[190px] overflow-y-auto no-scrollbar">
                {filteredClients.map((client, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-xs hover:bg-white/[0.05] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${client.avatarColor} text-white font-black text-xs flex items-center justify-center shadow-sm`}>
                        {client.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-white/90 text-xs">{client.name}</div>
                        <div className="text-[10px] text-white/40">{client.category}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] font-black text-white">{client.retainer}</div>
                      <div className="text-[9px] text-white/30">Next: {client.nextDeliverable}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/sphere-os/clients"
              className="mt-4 text-center text-xs font-bold text-purple-400 hover:text-purple-300 block pt-3 border-t border-white/[0.06]"
            >
              Open Client Hub →
            </Link>
          </div>

          {/* ---------------- PANEL 2: CONTENT PLANNER ---------------- */}
          <div className="relative rounded-3xl bg-white/[0.03] border border-white/[0.08] p-5 backdrop-blur-2xl flex flex-col justify-between hover:bg-white/[0.06] hover:border-purple-500/30 hover:shadow-[0_0_35px_rgba(168,85,247,0.15)] transition-all overflow-hidden group">
            {/* 4px Gradient Left Border */}
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-purple-500 to-indigo-500" />

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div>
                  <h3 className="font-extrabold text-white text-sm">Content Planner</h3>
                  <p className="text-[10px] text-white/40">Work-back calendar schedule</p>
                </div>
                <button
                  onClick={() => setIsNewPlanOpen(true)}
                  className="px-2.5 py-1 rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white font-bold text-[11px] flex items-center gap-1 shadow-md shadow-purple-500/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Plan</span>
                </button>
              </div>

              <div className="flex items-center justify-between mt-3">
                <span className="text-xs font-bold text-white/80 flex items-center gap-1">
                  <span>December 2026</span>
                  <ChevronDown className="w-3.5 h-3.5 text-white/40" />
                </span>
                <div className="flex bg-white/[0.04] p-0.5 rounded-xl text-[10px] font-semibold text-white/50 border border-white/[0.06]">
                  {(['Month', 'Week', 'Day'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActivePlannerTab(tab)}
                      className={`px-2.5 py-0.5 rounded-lg transition-colors ${
                        activePlannerTab === tab ? 'bg-purple-500/25 text-purple-300 font-bold' : 'hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mini Calendar Matrix */}
              <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[10px]">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <span key={i} className="text-white/30 font-bold">{d}</span>
                ))}
                <div className="p-1.5 rounded-lg bg-white/[0.02] text-white/30">22</div>
                <div className="p-1.5 rounded-lg bg-white/[0.02] text-white/30">23</div>
                <div className="p-1.5 rounded-lg bg-purple-500/25 text-purple-300 font-black border border-purple-500/40 shadow-[0_0_8px_rgba(168,85,247,0.3)]">24</div>
                <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 font-black">25</div>
                <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-300 font-black">26</div>
                <div className="p-1.5 rounded-lg bg-white/[0.02] text-white/50">27</div>
                <div className="p-1.5 rounded-lg bg-white/[0.02] text-white/50">28</div>
              </div>

              <div className="mt-3.5">
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2">Content Hooks Ready</div>
                <div className="space-y-1.5">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-200 text-[11px] font-semibold flex items-center justify-between border border-purple-500/20">
                    <span className="truncate">Winter Special Offer Reel</span>
                    <span className="text-[9px] bg-purple-500/20 px-1.5 py-0.5 rounded font-bold text-purple-300">Veda Café</span>
                  </div>
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-200 text-[11px] font-semibold flex items-center justify-between border border-cyan-500/20">
                    <span className="truncate">Travel Tips Series Hook #4</span>
                    <span className="text-[9px] bg-cyan-500/20 px-1.5 py-0.5 rounded font-bold text-cyan-300">Travelopedia</span>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-200 text-[11px] font-semibold flex items-center justify-between border border-emerald-500/20">
                    <span className="truncate">Resort Drone Sunset Reel</span>
                    <span className="text-[9px] bg-emerald-500/20 px-1.5 py-0.5 rounded font-bold text-emerald-300">Orchid</span>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/sphere-os/planner"
              className="mt-4 text-center text-xs font-bold text-purple-400 hover:text-purple-300 block pt-3 border-t border-white/[0.06]"
            >
              Open Content Planner →
            </Link>
          </div>

          {/* ---------------- PANEL 3: PRODUCTION BOARD ---------------- */}
          <div className="relative rounded-3xl bg-white/[0.03] border border-white/[0.08] p-5 backdrop-blur-2xl flex flex-col justify-between hover:bg-white/[0.06] hover:border-cyan-500/30 hover:shadow-[0_0_35px_rgba(6,182,212,0.15)] transition-all overflow-hidden group">
            {/* 4px Gradient Left Border */}
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-cyan-400 to-blue-500" />

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div>
                  <h3 className="font-extrabold text-white text-sm">Production Board</h3>
                  <p className="text-[10px] text-white/40">Real-time team Kanban pipeline</p>
                </div>
                <button
                  onClick={() => setIsAddTaskOpen(true)}
                  className="px-2.5 py-1 rounded-xl bg-cyan-600/80 hover:bg-cyan-600 text-white font-bold text-[11px] flex items-center gap-1 shadow-md shadow-cyan-500/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Task</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5 mt-3">
                <div className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-bold text-white/50">
                    <span>To Do</span>
                    <span className="px-1.5 py-0.5 bg-white/[0.06] rounded text-white/50">24</span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-[10px]">
                    <span className="font-bold text-white/80 block truncate">Shoot: Travel Series</span>
                    <span className="text-white/35 text-[9px]">Travelopedia</span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-[10px]">
                    <span className="font-bold text-white/80 block truncate">Script: Brand Reel</span>
                    <span className="text-white/35 text-[9px]">Veda Café</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-2xl bg-cyan-500/5 border border-cyan-500/15 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-bold text-cyan-400">
                    <span>In Progress</span>
                    <span className="px-1.5 py-0.5 bg-cyan-500/20 rounded text-cyan-300">18</span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[10px]">
                    <span className="font-bold text-cyan-100 block truncate">Edit: Drone Reel</span>
                    <span className="text-cyan-400 text-[9px]">Saakshi • QC Pass</span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[10px]">
                    <span className="font-bold text-cyan-100 block truncate">Audio Master</span>
                    <span className="text-cyan-400 text-[9px]">Studio North</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 mt-2.5">
                <div className="p-2.5 rounded-2xl bg-orange-500/5 border border-orange-500/15 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-bold text-orange-400">
                    <span>Review</span>
                    <span className="px-1.5 py-0.5 bg-orange-500/20 rounded text-orange-300">12</span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-orange-500/10 border border-orange-500/20 text-[10px]">
                    <span className="font-bold text-orange-100 block truncate">Final Color Pass</span>
                    <span className="text-orange-400 text-[9px]">Orchid Resorts</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/15 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-bold text-emerald-400">
                    <span>Done</span>
                    <span className="px-1.5 py-0.5 bg-emerald-500/20 rounded text-emerald-300">31</span>
                  </div>
                  <div className="p-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[10px]">
                    <span className="font-bold text-emerald-100 block truncate">1080x1920 Export</span>
                    <span className="text-emerald-400 text-[9px]">Published</span>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/sphere-os/my-day"
              className="mt-4 text-center text-xs font-bold text-cyan-400 hover:text-cyan-300 block pt-3 border-t border-white/[0.06]"
            >
              Open Production Board →
            </Link>
          </div>

          {/* ---------------- PANEL 4: ASSET VAULT ---------------- */}
          <div className="relative rounded-3xl bg-white/[0.03] border border-white/[0.08] p-5 backdrop-blur-2xl flex flex-col justify-between hover:bg-white/[0.06] hover:border-emerald-500/30 hover:shadow-[0_0_35px_rgba(16,185,129,0.15)] transition-all overflow-hidden group">
            {/* 4px Gradient Left Border */}
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-emerald-400 to-teal-500" />

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div>
                  <h3 className="font-extrabold text-white text-sm">Asset Vault</h3>
                  <p className="text-[10px] text-white/40">Cloudflare R2 storage</p>
                </div>
                <button
                  onClick={() => showToast('Opening direct R2 upload engine...')}
                  className="px-2.5 py-1 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white font-bold text-[11px] flex items-center gap-1 shadow-md shadow-emerald-500/20"
                >
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload</span>
                </button>
              </div>

              <div className="flex items-center gap-1 mt-3 overflow-x-auto no-scrollbar pb-1 text-[10px] font-semibold text-white/40">
                {(['All', 'Images', 'Videos', 'Documents'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveAssetFilter(cat)}
                    className={`px-2.5 py-0.5 rounded-lg whitespace-nowrap transition-colors ${
                      activeAssetFilter === cat
                        ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                        : 'hover:bg-white/[0.04] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2.5">
                {[
                  { name: 'Travel-01.mp4', size: '240 MB', Icon: FileVideo, color: 'text-purple-400 bg-purple-500/10' },
                  { name: 'Cafe-01.jpg', size: '5.2 MB', Icon: FileImage, color: 'text-emerald-400 bg-emerald-500/10' },
                  { name: 'Drone-02.mp4', size: '480 MB', Icon: FileVideo, color: 'text-cyan-400 bg-cyan-500/10' },
                  { name: 'BrandKit.pdf', size: '12 MB', Icon: FileText, color: 'text-orange-400 bg-orange-500/10' },
                ].map((file, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] transition-all flex flex-col justify-between"
                  >
                    <div className={`w-full h-12 rounded-xl ${file.color} flex items-center justify-center`}>
                      <file.Icon className="w-5 h-5" />
                    </div>
                    <div className="mt-2">
                      <div className="font-bold text-white/80 text-[10px] truncate">{file.name}</div>
                      <div className="text-[9px] text-white/30">{file.size}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/sphere-os/assets"
              className="mt-4 text-center text-xs font-bold text-emerald-400 hover:text-emerald-300 block pt-3 border-t border-white/[0.06]"
            >
              Open Asset Vault →
            </Link>
          </div>

          {/* ---------------- PANEL 5: QUALITY GATE ---------------- */}
          <div className="relative rounded-3xl bg-white/[0.03] border border-white/[0.08] p-5 backdrop-blur-2xl flex flex-col justify-between hover:bg-white/[0.06] hover:border-emerald-500/30 hover:shadow-[0_0_35px_rgba(16,185,129,0.15)] transition-all overflow-hidden group">
            {/* 4px Gradient Left Border */}
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-emerald-400 to-teal-500" />

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div>
                  <h3 className="font-extrabold text-white text-sm">Quality Gate</h3>
                  <p className="text-[10px] text-white/40">Frame-by-frame compliance</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Passed
                </span>
              </div>

              <div className="flex items-center justify-between text-[9px] font-bold text-white/30 mt-2.5 px-1">
                <span className="text-purple-400">Upload</span>
                <span>→</span>
                <span className="text-purple-400">Review</span>
                <span>→</span>
                <span className="text-purple-400">QC</span>
                <span>→</span>
                <span className="text-white/80">Approve</span>
                <span>→</span>
                <span>Publish</span>
              </div>

              {/* Video preview container */}
              <div className="relative w-full h-24 rounded-2xl bg-[#070A10] mt-2.5 flex items-center justify-center overflow-hidden border border-white/[0.06]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <button
                  onClick={() => showToast('Playing Travelopedia Episode 04 QC Preview...')}
                  className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center shadow-lg hover:scale-110 hover:bg-white/20 transition-all z-20 border border-white/[0.15]"
                >
                  <Play className="w-4 h-4 ml-0.5 fill-current" />
                </button>
                <div className="absolute bottom-2 left-2.5 z-20 text-[10px] text-white/80 font-bold truncate max-w-[85%]">
                  Travelopedia_Goa_01.mp4 (9:16)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5 mt-2.5 text-[10px] font-semibold">
                {['Video Quality', 'Audio Clear', 'Brand Safe', 'No Watermark'].map((check, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-emerald-400 bg-emerald-500/10 p-1 rounded-lg border border-emerald-500/15">
                    <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                    <span>{check}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/[0.06]">
              <button
                onClick={() => showToast('Item sent back to Editor with revision notes.')}
                className="flex-1 py-1.5 px-2 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-[10px] font-bold transition-colors"
              >
                Reject
              </button>
              <button
                onClick={() => showToast('QC Passed! Video moved to Client Approval Stage.')}
                className="flex-1 py-1.5 px-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-[10px] font-bold shadow-md shadow-purple-500/20 transition-colors"
              >
                Approve & Next
              </button>
            </div>
          </div>

          {/* ---------------- PANEL 6: PUBLISHING ENGINE ---------------- */}
          <div className="relative rounded-3xl bg-white/[0.03] border border-white/[0.08] p-5 backdrop-blur-2xl flex flex-col justify-between hover:bg-white/[0.06] hover:border-cyan-500/30 hover:shadow-[0_0_35px_rgba(6,182,212,0.15)] transition-all overflow-hidden group">
            {/* 4px Gradient Left Border */}
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-cyan-400 to-blue-500" />

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div>
                  <h3 className="font-extrabold text-white text-sm">Publishing Engine</h3>
                  <p className="text-[10px] text-white/40">Multi-network auto syndication</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mt-2.5 overflow-x-auto no-scrollbar text-[9px] font-bold">
                {(['All', 'YouTube', 'Instagram', 'Facebook', 'LinkedIn'] as const).map((plat) => (
                  <button
                    key={plat}
                    onClick={() => setActivePublishPlatform(plat)}
                    className={`px-2.5 py-0.5 rounded-lg whitespace-nowrap transition-colors ${
                      activePublishPlatform === plat
                        ? 'bg-white/[0.12] text-white border border-white/[0.15]'
                        : 'bg-white/[0.02] text-white/40 hover:text-white'
                    }`}
                  >
                    {plat}
                  </button>
                ))}
              </div>

              <div className="mt-3 p-2.5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex gap-2.5">
                <div className="w-13 h-13 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white flex-shrink-0">
                  <Film className="w-6 h-6" />
                </div>
                <div className="text-[10px]">
                  <div className="font-bold text-white/90 line-clamp-1">Explore Hidden Waterfalls with Travelopedia ✈️</div>
                  <div className="text-white/40 text-[9px] line-clamp-2 mt-0.5">
                    Exclusive teaser live reel scheduled with geo-tags and audio sync...
                  </div>
                </div>
              </div>

              <div className="mt-2.5 space-y-1.5 text-[10px]">
                <div className="flex items-center justify-between text-white/40">
                  <span className="font-semibold">Schedule Date:</span>
                  <span className="font-bold text-white/80">27 Dec 2026, 06:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white/40">Auto-Post Queue:</span>
                  <button
                    onClick={() => setAutoPostEnabled(!autoPostEnabled)}
                    className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors ${
                      autoPostEnabled ? 'bg-emerald-600 justify-end' : 'bg-white/10 justify-start'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-white block shadow" />
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => showToast('Post scheduled across Instagram and YouTube!')}
              className="mt-4 w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-extrabold text-[11px] shadow-md shadow-purple-500/20 flex items-center justify-center gap-1.5 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Schedule Post</span>
            </button>
          </div>

          {/* ---------------- PANEL 7: AI CHASER & DECISION QUEUE ---------------- */}
          <div className="relative rounded-3xl bg-white/[0.03] border border-white/[0.08] p-5 backdrop-blur-2xl flex flex-col justify-between hover:bg-white/[0.06] hover:border-purple-500/30 hover:shadow-[0_0_35px_rgba(168,85,247,0.15)] transition-all overflow-hidden group">
            {/* 4px Gradient Left Border */}
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-purple-500 to-indigo-500" />
            <div className="absolute -top-10 -right-10 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] relative z-10">
                <div>
                  <h3 className="font-extrabold text-white text-sm">AI Chaser & Decisions</h3>
                  <p className="text-[10px] text-white/40">Autopilot triage & pending approvals</p>
                </div>
              </div>

              <div className="mt-3 p-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-[10px] relative z-10">
                <div className="flex items-center gap-1.5 font-bold text-purple-300">
                  <Bot className="w-4 h-4 text-purple-400" />
                  <span>2 tasks need your sign-off:</span>
                </div>
                <div className="mt-1 space-y-0.5 text-white/50 text-[10px] pl-5 font-medium">
                  <div>• Client reel approval - Veda Café</div>
                  <div>• Final poster delivery - Travelopedia</div>
                </div>
              </div>

              <div className="mt-3 relative z-10">
                <div className="flex items-center justify-between text-[10px] font-bold text-white/50 mb-1.5">
                  <span>Decision Queue</span>
                  <span className="text-[9px] text-rose-400 font-extrabold bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                    {pendingDecisions.length} Pending
                  </span>
                </div>

                <div className="space-y-1.5">
                  {pendingDecisions.map((dec) => (
                    <div
                      key={dec.id}
                      className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-[10px]"
                    >
                      <div>
                        <div className="font-bold text-white/90">{dec.title}</div>
                        <div className="text-white/40 text-[9px]">{dec.client} • {dec.time}</div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleDecisionAction(dec.id, 'Approve')}
                          className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[9px] shadow-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDecisionAction(dec.id, 'Review')}
                          className="px-2 py-1 bg-white/[0.08] hover:bg-white/[0.14] text-white/70 rounded-lg font-bold text-[9px]"
                        >
                          Review
                        </button>
                      </div>
                    </div>
                  ))}
                  {pendingDecisions.length === 0 && (
                    <div className="text-center py-3 text-[10px] text-white/40 italic">
                      All decisions completed! ✓
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center gap-2 relative z-10">
              <input
                type="text"
                value={aiChatInput}
                onChange={(e) => setAiChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendAiPrompt()}
                placeholder="Ask AI Chaser anything..."
                className="w-full text-[11px] px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-purple-500/40"
              />
              <button
                onClick={handleSendAiPrompt}
                className="p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-md shadow-purple-500/20"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ---------------- PANEL 8: REPORT STUDIO ---------------- */}
          <div className="relative rounded-3xl bg-white/[0.03] border border-white/[0.08] p-5 backdrop-blur-2xl flex flex-col justify-between hover:bg-white/[0.06] hover:border-emerald-500/30 hover:shadow-[0_0_35px_rgba(16,185,129,0.15)] transition-all overflow-hidden group">
            {/* 4px Gradient Left Border */}
            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-emerald-400 to-teal-500" />
            <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div>
                  <h3 className="font-extrabold text-white text-sm">Report Studio</h3>
                  <p className="text-[10px] text-white/40">Automated client dashboards</p>
                </div>
                <span className="text-[10px] font-bold text-white/60 bg-white/[0.06] px-2 py-0.5 rounded-lg border border-white/[0.08]">
                  This Month ▾
                </span>
              </div>

              <div className="flex items-center gap-2 mt-2.5 text-[10px] font-bold text-white/40">
                <span className="text-purple-400 border-b-2 border-purple-500 pb-0.5">Overview</span>
                <span className="hover:text-white px-1 cursor-pointer">Clients</span>
                <span className="hover:text-white px-1 cursor-pointer">Content</span>
                <span className="hover:text-white px-1 cursor-pointer">Revenue</span>
              </div>

              <div className="mt-3 p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-white/80">Revenue Growth</span>
                  <span className="text-emerald-400 font-black">+32% MoM</span>
                </div>
                <div className="h-9 w-full mt-1.5">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 200 40">
                    <defs>
                      <linearGradient id="miniGrowthPro" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#A855F7" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 10 32 Q 60 28 100 18 T 190 6"
                      fill="none"
                      stroke="url(#miniGrowthPro)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="mt-3">
                <div className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5">Top Client Accounts</div>
                <div className="space-y-1.5 text-[10px]">
                  {[
                    { name: 'Travelopedia', amount: '₹75,000' },
                    { name: 'Orchid Resorts', amount: '₹60,000' },
                    { name: 'Studio North', amount: '₹50,000' },
                  ].map((client, idx) => (
                    <div key={idx} className="flex items-center justify-between font-semibold p-1 rounded-lg bg-white/[0.02]">
                      <span className="text-white/70">{client.name}</span>
                      <span className="font-black text-white">{client.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/sphere-os/client-portal"
              className="mt-4 text-center text-xs font-bold text-emerald-400 hover:text-emerald-300 block pt-3 border-t border-white/[0.06] relative z-10"
            >
              Open Report Studio →
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 8: BRAND HERO BANNER (Dark glass with multiple gradient glow blobs)
         ========================================================================= */}
      <div className="rounded-3xl bg-white/[0.025] border border-white/[0.08] p-6 sm:p-8 backdrop-blur-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-white relative overflow-hidden shadow-2xl">
        {/* Luminous Glow blobs behind banner */}
        <div className="absolute left-8 -top-10 w-56 h-56 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-16 -bottom-10 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-1/2 top-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-[2px] shadow-[0_0_30px_rgba(168,85,247,0.35)]">
            <div className="w-full h-full bg-[#0A0D14] rounded-[14px] flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-400 blur-[1px]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white">Sphere OS</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-extrabold border border-purple-500/30">
                v1.0 Pro
              </span>
            </div>
            <p className="text-xs text-white/50 mt-1 font-medium">
              The Complete Creative Business Operating System for <strong className="text-white/80">IllustrativeSphere</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10 text-xs font-semibold text-white/60">
          {[
            { icon: Zap, text: 'Automated Workflows', color: 'text-purple-400' },
            { icon: Bot, text: 'AI-Powered Assistant', color: 'text-cyan-400' },
            { icon: TrendingUp, text: 'Real-Time Analytics', color: 'text-emerald-400' },
            { icon: ShieldCheck, text: 'Enterprise Security', color: 'text-blue-400' },
          ].map((badge, idx) => (
            <div key={idx} className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
              <badge.icon className={`w-4 h-4 ${badge.color}`} />
              <span>{badge.text}</span>
            </div>
          ))}
        </div>

        <div className="relative z-10">
          <Link
            href="/sphere-os/onboarding"
            className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-black text-xs sm:text-sm shadow-[0_0_30px_rgba(168,85,247,0.35)] flex items-center gap-2.5 transition-all group"
          >
            <span>Let&apos;s Build Your Dream Business with Sphere OS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* =========================================================================
          MODALS (Dark Glass Theme: bg-[#10141D], border-white/[0.12], gradient CTAs)
         ========================================================================= */}

      {/* 1. Modal: Add Client */}
      {isAddClientOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#10141D] rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/[0.12] animate-in fade-in zoom-in-95 duration-200 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] relative z-10">
              <h3 className="font-black text-white text-base">Add New Client Retainer</h3>
              <button
                onClick={() => setIsAddClientOpen(false)}
                className="text-white/40 hover:text-white text-sm font-bold p-1 rounded-lg hover:bg-white/[0.06]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSaveClient} className="space-y-4 mt-4 text-xs font-semibold relative z-10">
              <div>
                <label className="text-white/50 block mb-1">Client Name</label>
                <input
                  name="name"
                  required
                  placeholder="e.g. Nirvana Luxury Stays"
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
              <div>
                <label className="text-white/50 block mb-1">Industry / Category</label>
                <input
                  name="category"
                  required
                  placeholder="e.g. Luxury Hospitality"
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
              <div>
                <label className="text-white/50 block mb-1">Monthly Retainer (₹)</label>
                <input
                  name="retainer"
                  required
                  defaultValue="60,000"
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setIsAddClientOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/[0.1] text-white/50 font-bold hover:bg-white/[0.04]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-extrabold shadow-lg shadow-purple-500/25 transition-all"
                >
                  Save & Onboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Modal: Create Task */}
      {isAddTaskOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#10141D] rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/[0.12] animate-in fade-in zoom-in-95 duration-200 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] relative z-10">
              <h3 className="font-black text-white text-base">Create Production Task</h3>
              <button
                onClick={() => setIsAddTaskOpen(false)}
                className="text-white/40 hover:text-white text-sm font-bold p-1 rounded-lg hover:bg-white/[0.06]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateTask} className="space-y-4 mt-4 text-xs font-semibold relative z-10">
              <div>
                <label className="text-white/50 block mb-1">Task Title</label>
                <input
                  name="taskTitle"
                  required
                  placeholder="e.g. Cut 3 Hooks for Goa Reel"
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20"
                />
              </div>
              <div>
                <label className="text-white/50 block mb-1">Client</label>
                <select name="taskClient" className="w-full px-3.5 py-2.5 bg-[#141820] border border-white/[0.1] rounded-xl text-white focus:outline-none focus:border-cyan-500/50">
                  <option className="bg-[#141820]">The Travelopedia</option>
                  <option className="bg-[#141820]">Veda Café</option>
                  <option className="bg-[#141820]">Orchid Resorts</option>
                  <option className="bg-[#141820]">Studio North</option>
                </select>
              </div>
              <div>
                <label className="text-white/50 block mb-1">Assignee</label>
                <select name="taskAssignee" className="w-full px-3.5 py-2.5 bg-[#141820] border border-white/[0.1] rounded-xl text-white focus:outline-none focus:border-cyan-500/50">
                  <option value="Saakshi" className="bg-[#141820]">Saakshi (Senior Polish Editor)</option>
                  <option value="Anjali" className="bg-[#141820]">Anjali (Volume Editor)</option>
                  <option value="Riddhi" className="bg-[#141820]">Riddhi (Creative Lead)</option>
                  <option value="Rahul" className="bg-[#141820]">Rahul (Cinematographer)</option>
                </select>
              </div>
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setIsAddTaskOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/[0.1] text-white/50 font-bold hover:bg-white/[0.04]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-extrabold shadow-lg shadow-cyan-500/25 transition-all"
                >
                  Create & Push to Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Modal: Plan Content */}
      {isNewPlanOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#10141D] rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/[0.12] animate-in fade-in zoom-in-95 duration-200 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-purple-500/15 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] relative z-10">
              <div>
                <h3 className="font-black text-white text-base">Plan Content Item</h3>
                <p className="text-[10px] text-white/40">Work-Back Auto-Schedule Engine</p>
              </div>
              <button
                onClick={() => setIsNewPlanOpen(false)}
                className="text-white/40 hover:text-white text-sm font-bold p-1 rounded-lg hover:bg-white/[0.06]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handlePlanContent} className="space-y-4 mt-4 text-xs font-semibold relative z-10">
              <div>
                <label className="text-white/50 block mb-1">Content Hook / Idea</label>
                <input
                  name="contentHook"
                  required
                  placeholder="e.g. 5 Secret Rooftop Spots in Jaipur"
                  className="w-full px-3.5 py-2.5 bg-white/[0.04] border border-white/[0.1] rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
              <div>
                <label className="text-white/50 block mb-1">Platform</label>
                <select name="contentPlatform" className="w-full px-3.5 py-2.5 bg-[#141820] border border-white/[0.1] rounded-xl text-white focus:outline-none focus:border-purple-500/50">
                  <option value="Instagram" className="bg-[#141820]">Instagram (9:16 Reel)</option>
                  <option value="YouTube" className="bg-[#141820]">YouTube Shorts (9:16)</option>
                  <option value="Meta" className="bg-[#141820]">Meta Carousel (1:1)</option>
                  <option value="LinkedIn" className="bg-[#141820]">LinkedIn Story (4:5)</option>
                </select>
              </div>
              <div>
                <label className="text-white/50 block mb-1">Target Live Post Date (D)</label>
                <input
                  name="contentDate"
                  type="date"
                  defaultValue="2026-12-25"
                  className="w-full px-3.5 py-2.5 bg-[#141820] border border-white/[0.1] rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                />
                <span className="text-[10px] text-purple-400 font-bold block mt-1.5 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-purple-400" />
                  <span>Auto-generates D-14 shoot, D-10 ingest, D-7 edit, D-5 QC, D-4 approvals!</span>
                </span>
              </div>
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setIsNewPlanOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/[0.1] text-white/50 font-bold hover:bg-white/[0.04]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold shadow-lg shadow-purple-500/25 transition-all"
                >
                  Save & Auto-Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
