'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HardDrive,
  Search,
  UploadCloud,
  FolderPlus,
  Filter,
  FileVideo,
  FileImage,
  FileText,
  Download,
  Share2,
  Trash2,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

export default function AssetVaultPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Videos' | 'Images' | 'Brand Kits' | 'Audio'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState('All');

  const assets = [
    {
      id: 1,
      name: 'TRAV-20261124-SHOOT01-CLIP001.mp4',
      client: 'The Travelopedia',
      type: 'Videos',
      size: '240 MB',
      resolution: '3840x2160 (4K)',
      fps: '60 fps',
      date: '24 Nov 2026',
      badge: 'R2 Verified',
      color: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    },
    {
      id: 2,
      name: 'VEDA-20261124-PIZZA-HERO.jpg',
      client: 'Veda Café',
      type: 'Images',
      size: '5.2 MB',
      resolution: '4000x5000',
      fps: 'RAW',
      date: '24 Nov 2026',
      badge: 'Color Graded',
      color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    },
    {
      id: 3,
      name: 'ORCH-20261123-DRONE-SUNSET.mp4',
      client: 'Orchid Resorts',
      type: 'Videos',
      size: '480 MB',
      resolution: '4K DCI',
      fps: '30 fps',
      date: '23 Nov 2026',
      badge: 'R2 Verified',
      color: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    },
    {
      id: 4,
      name: 'ZAVERI-BRAND-GUIDELINES-2027.pdf',
      client: 'Zaveri Jewellers',
      type: 'Brand Kits',
      size: '14.8 MB',
      resolution: 'Vector PDF',
      fps: 'Document',
      date: '20 Nov 2026',
      badge: 'Approved',
      color: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    },
    {
      id: 5,
      name: 'STUDIO-PODCAST-VO-HINDI.wav',
      client: 'Studio North',
      type: 'Audio',
      size: '48 MB',
      resolution: '48kHz 24-bit',
      fps: 'Mastered',
      date: '22 Nov 2026',
      badge: 'Audio QC Pass',
      color: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    },
    {
      id: 6,
      name: 'VEDA-LOGO-TRANSPARENT-GOLD.png',
      client: 'Veda Café',
      type: 'Brand Kits',
      size: '120 KB',
      resolution: '2000x2000',
      fps: 'PNG Asset',
      date: '18 Nov 2026',
      badge: 'Vector Brand',
      color: 'bg-white/[0.08] text-white/70 border-white/[0.1]',
    },
  ];

  const filteredAssets = assets.filter((a) => {
    const matchesTab = activeTab === 'All' || a.type === activeTab;
    const matchesClient = selectedClient === 'All' || a.client === selectedClient;
    const matchesSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesClient && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-[1700px] mx-auto pb-16 font-sans text-white/90">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <HardDrive className="w-6 h-6 text-purple-400" />
            Asset Vault (Cloudflare R2 Direct)
          </h1>
          <p className="text-xs text-white/40 mt-1 font-medium">
            Zero-egress direct 4K video storage with automated canonical naming conventions and multi-tenant isolation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/sphere-os/vendor-ledger"
            className="px-3.5 py-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-white/80 rounded-xl text-xs font-bold transition-colors"
          >
            Vendor Ingest Inspector
          </Link>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-500/25 flex items-center gap-2 transition-all">
            <UploadCloud className="w-4 h-4" />
            <span>Direct 4K Upload</span>
          </button>
        </div>
      </div>

      {/* Storage KPI Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl overflow-hidden hover:border-white/[0.14] transition-all">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-purple-500 to-indigo-500" />
          <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Cloud Storage Used</span>
          <div className="text-3xl font-black text-white mt-1">428.4 GB</div>
          <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1 mt-1">
            <ArrowUpRight className="w-3 h-3" /> Cloudflare R2 (₹0 Egress)
          </span>
        </div>

        <div className="relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl overflow-hidden hover:border-white/[0.14] transition-all">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-cyan-500 to-blue-500" />
          <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Total Video Clips</span>
          <div className="text-3xl font-black text-white mt-1">1,492 Files</div>
          <span className="text-[11px] text-purple-400 font-bold flex items-center gap-1 mt-1">
            100% Canonical Naming
          </span>
        </div>

        <div className="relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl overflow-hidden hover:border-white/[0.14] transition-all">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-emerald-500 to-teal-500" />
          <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Evergreen Backup Bank</span>
          <div className="text-3xl font-black text-emerald-400 mt-1">45 Standby</div>
          <span className="text-[11px] text-white/40 flex items-center gap-1 mt-1">
            Auto-swap ready on SLA
          </span>
        </div>

        <div className="relative p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl overflow-hidden hover:border-white/[0.14] transition-all">
          <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-orange-500 to-amber-500" />
          <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">Upload Success SLA</span>
          <div className="text-3xl font-black text-white mt-1">99.98%</div>
          <span className="text-[11px] text-cyan-400 font-bold flex items-center gap-1 mt-1">
            Multi-part chunked hash
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white/[0.03] rounded-2xl border border-white/[0.08] p-4 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-2 w-full md:w-auto">
          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search filename, tag, resolution..."
              className="w-full pl-9 pr-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50"
            />
          </div>

          {/* Client Filter */}
          <select
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
            className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-2 text-xs font-semibold text-white/80 focus:outline-none focus:border-purple-500/50"
          >
            <option value="All" className="bg-[#141820]">All Clients</option>
            <option value="The Travelopedia" className="bg-[#141820]">The Travelopedia</option>
            <option value="Veda Café" className="bg-[#141820]">Veda Café</option>
            <option value="Orchid Resorts" className="bg-[#141820]">Orchid Resorts</option>
            <option value="Studio North" className="bg-[#141820]">Studio North</option>
            <option value="Zaveri Jewellers" className="bg-[#141820]">Zaveri Jewellers</option>
          </select>
        </div>

        {/* Category Tabs */}
        <div className="flex bg-white/[0.04] border border-white/[0.06] p-1 rounded-xl text-xs font-semibold text-white/60 overflow-x-auto no-scrollbar">
          {(['All', 'Videos', 'Images', 'Brand Kits', 'Audio'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-lg transition-all ${
                activeTab === tab ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40 font-bold' : 'hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map((asset) => (
          <div
            key={asset.id}
            className="group relative bg-white/[0.03] rounded-2xl border border-white/[0.08] p-4 backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/[0.14] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-purple-500/10"
          >
            <div>
              {/* Thumbnail Container */}
              <div className="w-full h-36 rounded-xl bg-[#070A10] border border-white/[0.06] relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
                {asset.type === 'Videos' ? (
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg z-20 group-hover:scale-110 transition-transform">
                    <FileVideo className="w-5 h-5 text-purple-400" />
                  </div>
                ) : asset.type === 'Images' ? (
                  <FileImage className="w-10 h-10 text-emerald-400 z-20" />
                ) : (
                  <FileText className="w-10 h-10 text-amber-400 z-20" />
                )}

                <div className="absolute top-2 left-2 z-20">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border backdrop-blur-md ${asset.color}`}>
                    {asset.badge}
                  </span>
                </div>

                <div className="absolute bottom-2 left-2 z-20 text-[10px] text-white/80 font-medium">
                  {asset.resolution} • {asset.fps}
                </div>

                <div className="absolute bottom-2 right-2 z-20 text-[10px] text-white/90 font-bold">
                  {asset.size}
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="mt-3">
                <h4 className="font-bold text-white text-xs truncate group-hover:text-purple-300 transition-colors" title={asset.name}>
                  {asset.name}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-white/40 mt-1">
                  <span>{asset.client}</span>
                  <span>{asset.date}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.06] text-xs font-semibold">
              <button className="text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
              <div className="flex items-center gap-2 text-white/40">
                <button className="hover:text-white transition-colors">
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button className="hover:text-rose-400 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
