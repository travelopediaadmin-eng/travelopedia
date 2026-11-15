'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Trash2, 
  Save, 
  ArrowLeft, 
  Sparkles, 
  Image as ImageIcon, 
  Calendar, 
  MapPin, 
  Hotel, 
  Utensils, 
  Car,
  CheckCircle2,
  X
} from 'lucide-react';
import { TravelPackage, ItineraryDay, TripType, TravelCategory } from '@/types/travel';

interface PackageFormProps {
  initialData?: TravelPackage | null;
  isEdit?: boolean;
}

export default function PackageForm({ initialData, isEdit = false }: PackageFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    subtitle: initialData?.subtitle || '',
    category: (initialData?.category || 'international') as TravelCategory,
    subcategory: initialData?.subcategory || 'Middle East',
    destination: initialData?.destination || '',
    durationNights: initialData?.durationNights || 5,
    durationDays: initialData?.durationDays || 6,
    tripType: (initialData?.tripType || 'Customized') as TripType,
    basePrice: initialData?.basePrice || 50000,
    discountedPrice: initialData?.discountedPrice || 45000,
    hotelRating: initialData?.hotelRating || 4,
    flightsIncluded: initialData?.flightsIncluded || false,
    mealsIncluded: initialData?.mealsIncluded !== undefined ? initialData.mealsIncluded : true,
    transfersIncluded: initialData?.transfersIncluded !== undefined ? initialData.transfersIncluded : true,
    bestTimeToVisit: initialData?.bestTimeToVisit || 'October to April',
    badge: initialData?.badge || 'Bestseller',
    featured: initialData?.featured !== undefined ? initialData.featured : true,
    active: initialData?.active !== undefined ? initialData.active : true,
    heroImage: initialData?.heroImage || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    galleryText: initialData?.gallery?.join('\n') || '',
    overview: initialData?.overview || '',
    highlightsText: initialData?.highlights?.join('\n') || '',
    inclusionsText: initialData?.inclusions?.join('\n') || '',
    exclusionsText: initialData?.exclusions?.join('\n') || '',
  });

  // Dynamic Day-wise Itinerary
  const [itinerary, setItinerary] = useState<ItineraryDay[]>(
    initialData?.itinerary && initialData.itinerary.length > 0 
      ? initialData.itinerary 
      : [
          {
            dayNumber: 1,
            title: 'Arrival & Welcome Dinner',
            description: 'Arrive at destination airport. Chauffeur pick up and transfer to luxury hotel.',
            meals: 'Dinner',
            hotel: '4-Star / 5-Star City Resort',
            activities: ['Airport Meet & Greet', 'Check-in', 'Welcome Dinner']
          },
          {
            dayNumber: 2,
            title: 'Full Day Sightseeing & Key Landmarks',
            description: 'Explore the iconic monuments, viewpoints, and cultural attractions.',
            meals: 'Breakfast, Dinner',
            hotel: '4-Star / 5-Star City Resort',
            activities: ['Guided Sightseeing', 'Cultural Tour']
          }
        ]
  );

  // Auto-slug generator
  const handleTitleChange = (val: string) => {
    setFormData(prev => ({
      ...prev,
      title: val,
      slug: !isEdit && !prev.slug ? val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : prev.slug
    }));
  };

  // Itinerary handlers
  const handleAddDay = () => {
    const nextDayNum = itinerary.length + 1;
    setItinerary(prev => [
      ...prev,
      {
        dayNumber: nextDayNum,
        title: `Day ${nextDayNum} Excursion`,
        description: 'Explore local sights, enjoy cultural experiences and shopping.',
        meals: 'Breakfast',
        hotel: 'Same Hotel / Luxury Resort',
        activities: ['Sightseeing']
      }
    ]);
  };

  const handleRemoveDay = (index: number) => {
    if (itinerary.length <= 1) return;
    const filtered = itinerary.filter((_, i) => i !== index);
    // Renumber days
    const renumbered = filtered.map((d, i) => ({ ...d, dayNumber: i + 1 }));
    setItinerary(renumbered);
  };

  const handleDayChange = (index: number, field: keyof ItineraryDay, value: any) => {
    setItinerary(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.destination) {
      setError('Title and Destination are required.');
      return;
    }

    setLoading(true);
    setError('');

    const galleryArray = formData.galleryText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const highlightsArray = formData.highlightsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const inclusionsArray = formData.inclusionsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const exclusionsArray = formData.exclusionsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      subtitle: formData.subtitle,
      category: formData.category,
      subcategory: formData.subcategory,
      destination: formData.destination,
      durationNights: Number(formData.durationNights),
      durationDays: Number(formData.durationDays),
      tripType: formData.tripType,
      basePrice: Number(formData.basePrice),
      discountedPrice: Number(formData.discountedPrice),
      hotelRating: Number(formData.hotelRating),
      flightsIncluded: Boolean(formData.flightsIncluded),
      mealsIncluded: Boolean(formData.mealsIncluded),
      transfersIncluded: Boolean(formData.transfersIncluded),
      bestTimeToVisit: formData.bestTimeToVisit,
      badge: formData.badge,
      featured: Boolean(formData.featured),
      active: Boolean(formData.active),
      heroImage: formData.heroImage,
      gallery: galleryArray.length > 0 ? galleryArray : [formData.heroImage],
      overview: formData.overview,
      highlights: highlightsArray,
      inclusions: inclusionsArray,
      exclusions: exclusionsArray,
      itinerary: itinerary
    };

    try {
      const url = isEdit && initialData?.id ? `/api/packages/${initialData.id}` : '/api/packages';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to save package');
      }

      router.refresh();
      router.push('/admin/packages');
    } catch (err: any) {
      setError(err.message || 'Error occurred while saving');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* 1. Basic Information */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="text-lg font-bold font-serif text-navy-950 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-500" />
          <span>Basic Package Information</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Package Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Dubai Extravaganza: Skyline & Desert Luxury"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">URL Slug (Unique)</label>
            <input
              type="text"
              required
              placeholder="dubai-extravaganza-luxury"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Subtitle / Tagline</label>
          <input
            type="text"
            placeholder="e.g. Burj Khalifa At The Top, Premium 4x4 Desert Safari & Marina Dhow Cruise"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as TravelCategory })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
            >
              <option value="international">International Tours</option>
              <option value="domestic">Domestic Tours</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Subcategory / Region</label>
            <input
              type="text"
              placeholder="e.g. Middle East, Southeast Asia, Europe, Kashmir"
              value={formData.subcategory}
              onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Destination Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Dubai, UAE"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* 2. Duration, Pricing & Features */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="text-lg font-bold font-serif text-navy-950 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-500" />
          <span>Duration, Pricing &amp; Badges</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nights</label>
            <input
              type="number"
              min="1"
              value={formData.durationNights}
              onChange={(e) => setFormData({ ...formData, durationNights: Number(e.target.value) })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Days</label>
            <input
              type="number"
              min="1"
              value={formData.durationDays}
              onChange={(e) => setFormData({ ...formData, durationDays: Number(e.target.value) })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Base Price (₹)</label>
            <input
              type="number"
              value={formData.basePrice}
              onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Offer Price (₹)</label>
            <input
              type="number"
              value={formData.discountedPrice}
              onChange={(e) => setFormData({ ...formData, discountedPrice: Number(e.target.value) })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Trip Style</label>
            <select
              value={formData.tripType}
              onChange={(e) => setFormData({ ...formData, tripType: e.target.value as TripType })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
            >
              <option value="Customized">Customized Private Tour</option>
              <option value="Group Tour">Group Tour</option>
              <option value="Honeymoon">Honeymoon Special</option>
              <option value="Luxury Expedition">Luxury Expedition</option>
              <option value="Family Holiday">Family Holiday</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Hotel Category</label>
            <select
              value={formData.hotelRating}
              onChange={(e) => setFormData({ ...formData, hotelRating: Number(e.target.value) })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
            >
              <option value="3">3-Star Comfortable</option>
              <option value="4">4-Star Deluxe</option>
              <option value="5">5-Star Luxury</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Badge Tag</label>
            <input
              type="text"
              placeholder="e.g. Bestseller, Trending, Luxury Special"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs font-bold text-slate-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500"
            />
            <span>Featured on Home Page</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
              className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500"
            />
            <span>Active &amp; Visible to Public</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.flightsIncluded}
              onChange={(e) => setFormData({ ...formData, flightsIncluded: e.target.checked })}
              className="w-4 h-4 rounded text-brand-500 focus:ring-brand-500"
            />
            <span>Flights Included</span>
          </label>
        </div>
      </div>

      {/* 3. Media & Imagery */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="text-lg font-bold font-serif text-navy-950 border-b border-slate-100 pb-3 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-blue-500" />
          <span>Photos &amp; Visual Gallery</span>
        </h2>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Cover / Hero Image URL *</label>
          <input
            type="url"
            required
            placeholder="https://images.unsplash.com/..."
            value={formData.heroImage}
            onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Gallery Image URLs (One URL per line)</label>
          <textarea
            rows={3}
            placeholder="https://images.unsplash.com/photo-1&#10;https://images.unsplash.com/photo-2"
            value={formData.galleryText}
            onChange={(e) => setFormData({ ...formData, galleryText: e.target.value })}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>

      {/* 4. Overview, Highlights, Inclusions & Exclusions */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
        <h2 className="text-lg font-bold font-serif text-navy-950 border-b border-slate-100 pb-3">
          Overview, Highlights &amp; Checklists
        </h2>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Tour Overview</label>
          <textarea
            rows={3}
            placeholder="Describe the experience, destination vibe, and unique selling points..."
            value={formData.overview}
            onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Key Highlights (1 per line)</label>
            <textarea
              rows={5}
              placeholder="Burj Khalifa 124th Floor&#10;Desert Safari with BBQ Dinner&#10;Marina Dhow Cruise"
              value={formData.highlightsText}
              onChange={(e) => setFormData({ ...formData, highlightsText: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-emerald-700 mb-1">Inclusions (1 per line)</label>
            <textarea
              rows={5}
              placeholder="5 Nights Hotel Stay&#10;Daily Breakfast Buffet&#10;Airport Private Transfers"
              value={formData.inclusionsText}
              onChange={(e) => setFormData({ ...formData, inclusionsText: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-red-700 mb-1">Exclusions (1 per line)</label>
            <textarea
              rows={5}
              placeholder="International Airfare&#10;Personal Expenses&#10;Tourist City Taxes"
              value={formData.exclusionsText}
              onChange={(e) => setFormData({ ...formData, exclusionsText: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-red-500/20"
            />
          </div>
        </div>
      </div>

      {/* 5. Dynamic Day-wise Itinerary Builder */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-bold font-serif text-navy-950">
              Dynamic Day-by-Day Itinerary Builder
            </h2>
            <p className="text-xs text-slate-500">
              Add days and customize each day&apos;s schedule, meals, and accommodations.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddDay}
            className="px-4 py-2 rounded-xl bg-brand-50 hover:bg-brand-100 text-brand-600 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Day {itinerary.length + 1}</span>
          </button>
        </div>

        <div className="space-y-4">
          {itinerary.map((day, idx) => (
            <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs uppercase tracking-wider text-brand-600 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-brand-500 text-white flex items-center justify-center font-bold text-xs">
                    {day.dayNumber}
                  </span>
                  <span>Day {day.dayNumber} Details</span>
                </span>

                {itinerary.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveDay(idx)}
                    className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                    title="Remove Day"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Day Title</label>
                <input
                  type="text"
                  placeholder="e.g. Arrival in Dubai & Marina Dhow Cruise"
                  value={day.title}
                  onChange={(e) => handleDayChange(idx, 'title', e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Day Description</label>
                <textarea
                  rows={2}
                  placeholder="Describe the day's experiences, morning/afternoon timing..."
                  value={day.description}
                  onChange={(e) => handleDayChange(idx, 'description', e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Meals Included</label>
                  <input
                    type="text"
                    placeholder="e.g. Breakfast, BBQ Dinner"
                    value={day.meals || ''}
                    onChange={(e) => handleDayChange(idx, 'meals', e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Hotel / Stay</label>
                  <input
                    type="text"
                    placeholder="e.g. 5-Star Hotel or Resort"
                    value={day.hotel || ''}
                    onChange={(e) => handleDayChange(idx, 'hotel', e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Save Action Buttons */}
      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={() => router.push('/admin/packages')}
          className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors"
        >
          Cancel &amp; Return
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 via-brand-600 to-orange-600 hover:from-brand-600 hover:to-orange-700 text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-brand-500/25 disabled:opacity-70 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'Saving Package...' : isEdit ? 'Update Package' : 'Publish New Tour Package'}</span>
        </button>
      </div>
    </form>
  );
}
