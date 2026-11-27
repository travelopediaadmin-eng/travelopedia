'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Star, 
  Globe, 
  Check, 
  X, 
  Save 
} from 'lucide-react';
import { Destination, TravelCategory } from '@/types/travel';
import { INITIAL_DESTINATIONS } from '@/data/seed-data';

export default function AdminDestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDest, setEditingDest] = useState<Destination | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    countryOrState: '',
    category: 'international' as TravelCategory,
    coverImage: '',
    tagline: '',
    packagesCount: 3,
    topAttractions: '',
    featured: true
  });

  const fetchDestinations = () => {
    fetch('/api/destinations')
      .then(res => res.json())
      .then(data => {
        if (data.destinations && data.destinations.length > 0) {
          setDestinations(data.destinations);
        } else {
          setDestinations(INITIAL_DESTINATIONS);
        }
      })
      .catch(() => {
        setDestinations(INITIAL_DESTINATIONS);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const openCreateModal = () => {
    setEditingDest(null);
    setFormData({
      name: '',
      countryOrState: '',
      category: 'international',
      coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      tagline: '',
      packagesCount: 3,
      topAttractions: 'Burj Khalifa, Desert Safari, Marina Cruise',
      featured: true
    });
    setIsModalOpen(true);
  };

  const openEditModal = (dest: Destination) => {
    setEditingDest(dest);
    setFormData({
      name: dest.name,
      countryOrState: dest.countryOrState,
      category: dest.category,
      coverImage: dest.coverImage,
      tagline: dest.tagline,
      packagesCount: dest.packagesCount,
      topAttractions: dest.topAttractions.join(', '),
      featured: dest.featured
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.countryOrState) return;

    const payload = {
      ...formData,
      topAttractions: formData.topAttractions.split(',').map(s => s.trim()).filter(Boolean),
      id: editingDest?.id
    };

    try {
      const url = editingDest ? `/api/destinations/${editingDest.id}` : '/api/destinations';
      const method = editingDest ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchDestinations();
      }
    } catch (err) {
      console.error('Failed to save destination', err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete destination: "${name}"?`)) return;

    try {
      const res = await fetch(`/api/destinations/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDestinations(prev => prev.filter(d => d.id !== id));
      }
    } catch (err) {
      console.error('Failed to delete destination', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-navy-950">
            Destinations &amp; Categories Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage trending visual tiles, country cards, and top attractions shown on homepage.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-brand-500/20 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Destination</span>
        </button>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {destinations.map((dest) => (
          <div 
            key={dest.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="relative h-44 bg-slate-900 overflow-hidden">
              <img
                src={dest.coverImage}
                alt={dest.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/20">
                  {dest.category}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-bold font-serif text-lg leading-tight">{dest.name}</h3>
                <span className="text-[11px] text-slate-300 block">{dest.countryOrState}</span>
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <p className="text-xs text-slate-500 line-clamp-1 italic">
                  &quot;{dest.tagline}&quot;
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {dest.topAttractions.slice(0, 3).map((attr, aIdx) => (
                    <span key={aIdx} className="px-2 py-0.5 bg-slate-100 rounded-lg text-[10px] text-slate-600 font-medium">
                      {attr}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-brand-600">
                  {dest.packagesCount} Active Tours
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(dest)}
                    className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                    title="Edit Destination"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(dest.id, dest.name)}
                    className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                    title="Delete Destination"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Destination Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="bg-navy-950 text-white p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold font-serif">
                  {editingDest ? 'Edit Destination' : 'Add New Destination'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Shown in the trending regions showcase on the home page.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Destination Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dubai & UAE, Bali, Switzerland..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Country / State *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. United Arab Emirates"
                    value={formData.countryOrState}
                    onChange={(e) => setFormData({ ...formData, countryOrState: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as TravelCategory })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold focus:outline-none"
                  >
                    <option value="international">International</option>
                    <option value="domestic">Domestic</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Cover Image URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Futuristic Skylines, Gold Souks & Desert Safaris"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Top Attractions (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="Burj Khalifa, Palm Jumeirah, Desert Safari, Dubai Frame"
                  value={formData.topAttractions}
                  onChange={(e) => setFormData({ ...formData, topAttractions: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featDest"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500"
                />
                <label htmlFor="featDest" className="font-bold text-slate-700 cursor-pointer">
                  Featured on Home Page Carousel
                </label>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold flex items-center gap-1.5 shadow-md shadow-brand-500/20"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Destination</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
