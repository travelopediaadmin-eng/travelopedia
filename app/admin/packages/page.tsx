'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Package, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Star, 
  Eye, 
  EyeOff, 
  Search,
  ExternalLink,
  MapPin,
  Clock
} from 'lucide-react';
import { TravelPackage } from '@/types/travel';
import { formatPrice } from '@/lib/utils';

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const fetchPackages = () => {
    fetch('/api/packages?all=true')
      .then(res => res.json())
      .then(data => {
        if (data.packages) {
          setPackages(data.packages);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleToggleFeatured = async (pkg: TravelPackage) => {
    try {
      const res = await fetch(`/api/packages/${pkg.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !pkg.featured })
      });
      if (res.ok) {
        setPackages(prev =>
          prev.map(p => p.id === pkg.id ? { ...p, featured: !p.featured } : p)
        );
      }
    } catch (err) {
      console.error('Error toggling featured', err);
    }
  };

  const handleToggleActive = async (pkg: TravelPackage) => {
    try {
      const res = await fetch(`/api/packages/${pkg.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !pkg.active })
      });
      if (res.ok) {
        setPackages(prev =>
          prev.map(p => p.id === pkg.id ? { ...p, active: !p.active } : p)
        );
      }
    } catch (err) {
      console.error('Error toggling active', err);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete package: "${title}"?`)) return;

    try {
      const res = await fetch(`/api/packages/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPackages(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete package', err);
    }
  };

  const filtered = packages.filter(pkg => {
    if (categoryFilter !== 'All' && pkg.category !== categoryFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        pkg.title.toLowerCase().includes(q) ||
        pkg.destination.toLowerCase().includes(q) ||
        pkg.subcategory.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-navy-950">
            Tour Packages Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Create, edit, feature, and manage all domestic &amp; international travel itineraries.
          </p>
        </div>

        <Link
          href="/admin/packages/new"
          className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-brand-500/20 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Package</span>
        </Link>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {['All', 'international', 'domestic'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                categoryFilter === cat
                  ? 'bg-navy-950 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat === 'All' ? 'All Packages' : cat === 'international' ? 'International' : 'Domestic'}
            </button>
          ))}
        </div>

        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search packages by title or destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>

      {/* Packages Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Tour Package</th>
                <th className="py-3.5 px-4">Category / Region</th>
                <th className="py-3.5 px-4">Duration</th>
                <th className="py-3.5 px-4">Offer Price</th>
                <th className="py-3.5 px-4 text-center">Featured</th>
                <th className="py-3.5 px-4 text-center">Active Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.length > 0 ? (
                filtered.map((pkg) => (
                  <tr key={pkg.id} className="hover:bg-slate-50/70 transition-colors">
                    
                    {/* Package Info & Thumbnail */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={pkg.heroImage}
                          alt={pkg.title}
                          className="w-14 h-11 rounded-xl object-cover shrink-0 bg-slate-100"
                        />
                        <div className="truncate max-w-sm">
                          <Link 
                            href={`/admin/packages/edit/${pkg.id}`}
                            className="font-bold text-navy-950 text-sm hover:text-brand-600 transition-colors block truncate"
                          >
                            {pkg.title}
                          </Link>
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <MapPin className="w-3 h-3 text-brand-500" />
                            {pkg.destination}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="capitalize font-semibold text-slate-900 block">{pkg.category}</span>
                      <span className="text-[11px] text-slate-400 block">{pkg.subcategory}</span>
                    </td>

                    {/* Duration */}
                    <td className="py-4 px-4 whitespace-nowrap font-medium text-slate-800">
                      {pkg.durationNights}N / {pkg.durationDays}D
                      <span className="block text-[10px] text-slate-400">{pkg.tripType}</span>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="font-bold text-navy-950 font-serif text-sm">
                        {formatPrice(pkg.discountedPrice)}
                      </span>
                      {pkg.basePrice > pkg.discountedPrice && (
                        <span className="block text-[10px] text-slate-400 line-through">
                          {formatPrice(pkg.basePrice)}
                        </span>
                      )}
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleToggleFeatured(pkg)}
                        className={`p-1.5 rounded-xl transition-colors ${
                          pkg.featured 
                            ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' 
                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                        }`}
                        title={pkg.featured ? 'Featured on homepage (click to disable)' : 'Not featured (click to feature)'}
                      >
                        <Star className={`w-4 h-4 ${pkg.featured ? 'fill-amber-500 text-amber-500' : ''}`} />
                      </button>
                    </td>

                    {/* Active Toggle */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleToggleActive(pkg)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                          pkg.active !== false
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {pkg.active !== false ? 'Active' : 'Hidden'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/packages/${pkg.slug}`}
                          target="_blank"
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                          title="View on Live Website"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        <Link
                          href={`/admin/packages/edit/${pkg.id}`}
                          className="p-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                          title="Edit Package"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => handleDelete(pkg.id, pkg.title)}
                          className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                          title="Delete Package"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-400">
                    No packages match the current criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
