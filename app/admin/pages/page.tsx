'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Globe, 
  Plus, 
  Search, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Layers, 
  ShieldCheck,
  X,
  Sparkles
} from 'lucide-react';
import { WebsitePage } from '@/types/travel';
import { INITIAL_WEBSITE_PAGES } from '@/data/seed-data';

export default function AdminPagesPage() {
  const [pages, setPages] = useState<WebsitePage[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<WebsitePage | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<WebsitePage>>({
    title: '',
    slug: '',
    category: 'custom',
    metaTitle: '',
    metaDescription: '',
    isActive: true,
    isCustom: true
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('travelopedia_pages');
      if (stored) {
        try {
          setPages(JSON.parse(stored));
        } catch (e) {
          setPages(INITIAL_WEBSITE_PAGES);
        }
      } else {
        setPages(INITIAL_WEBSITE_PAGES);
        localStorage.setItem('travelopedia_pages', JSON.stringify(INITIAL_WEBSITE_PAGES));
      }
    }
  }, []);

  const savePages = (updated: WebsitePage[]) => {
    setPages(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('travelopedia_pages', JSON.stringify(updated));
    }
  };

  const filteredPages = useMemo(() => {
    return pages.filter((p) => {
      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch = 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.metaTitle.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCat && matchesSearch;
    });
  }, [pages, selectedCategory, searchQuery]);

  // Toggle page status
  const handleToggleStatus = (id: string) => {
    const updated = pages.map(p => {
      if (p.id === id) {
        return { ...p, isActive: !p.isActive, updatedAt: new Date().toISOString().split('T')[0] };
      }
      return p;
    });
    savePages(updated);
  };

  // Add new custom page
  const handleAddNew = () => {
    setEditingPage(null);
    setFormData({
      title: '',
      slug: '/special-offer',
      category: 'custom',
      metaTitle: 'Special Luxury Tour Offer | The TraveloPedia Surat',
      metaDescription: 'Exclusive limited-time travel package and holiday offers from The TraveloPedia.',
      isActive: true,
      isCustom: true
    });
    setIsModalOpen(true);
  };

  // Edit page
  const handleEdit = (page: WebsitePage) => {
    setEditingPage(page);
    setFormData({ ...page });
    setIsModalOpen(true);
  };

  // Save form
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      alert('Please provide page title and slug.');
      return;
    }

    let cleanSlug = formData.slug.trim();
    if (!cleanSlug.startsWith('/')) {
      cleanSlug = '/' + cleanSlug;
    }

    if (editingPage) {
      const updated = pages.map(p => {
        if (p.id === editingPage.id) {
          return {
            ...p,
            ...formData,
            slug: cleanSlug,
            updatedAt: new Date().toISOString().split('T')[0]
          } as WebsitePage;
        }
        return p;
      });
      savePages(updated);
    } else {
      const newPage: WebsitePage = {
        id: `page-${Date.now()}`,
        title: formData.title || '',
        slug: cleanSlug,
        category: formData.category || 'custom',
        metaTitle: formData.metaTitle || formData.title || '',
        metaDescription: formData.metaDescription || '',
        isActive: formData.isActive ?? true,
        isCustom: true,
        updatedAt: new Date().toISOString().split('T')[0]
      };
      savePages([...pages, newPage]);
    }

    setIsModalOpen(false);
  };

  // Delete custom page
  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the custom page "${title}"?`)) {
      const updated = pages.filter(p => p.id !== id);
      savePages(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-600 uppercase tracking-wider">
              Website CMS & Page Management
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Globe className="w-6 h-6 text-brand-500" />
            Website Pages & SEO Controller
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Configure public site pages, adjust SEO titles, toggle visibility, and launch landing pages.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl text-xs font-bold shadow-lg shadow-brand-500/20 transition-all self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Page</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Total Pages Configured
          </div>
          <div className="text-2xl font-black text-slate-900">{pages.length} Pages</div>
          <span className="text-[11px] text-slate-400 font-medium">Core, Services & Policies</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Live Public Pages
          </div>
          <div className="text-2xl font-black text-emerald-600">
            {pages.filter(p => p.isActive).length} Active
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold">Indexed on Google</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Travel Services Pages
          </div>
          <div className="text-2xl font-black text-blue-600">
            {pages.filter(p => p.category === 'service').length} Desks
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Flights, Hotels, Visa, etc.</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Custom Campaign Pages
          </div>
          <div className="text-2xl font-black text-purple-600">
            {pages.filter(p => p.isCustom).length} Custom
          </div>
          <span className="text-[11px] text-purple-600 font-semibold">Bespoke Promotions</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search page name, slug, SEO title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['all', 'core', 'service', 'policy', 'custom'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 capitalize ${
                selectedCategory === cat
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Pages' : `${cat} Pages`}
            </button>
          ))}
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              <tr>
                <th className="p-4">Page Title & URL Slug</th>
                <th className="p-4">Category</th>
                <th className="p-4">SEO Meta Title Preview</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredPages.map((page) => (
                <tr key={page.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-brand-500 shrink-0" />
                      <span>{page.title}</span>
                      {page.isCustom && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-purple-100 text-purple-700">
                          Custom Page
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-[11px] text-slate-400 mt-0.5 pl-6">
                      {page.slug}
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                      {page.category}
                    </span>
                  </td>

                  <td className="p-4 max-w-xs">
                    <div className="font-semibold text-slate-800 truncate">{page.metaTitle}</div>
                    <div className="text-[10px] text-slate-400 truncate">{page.metaDescription}</div>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleToggleStatus(page.id)}
                      className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                        page.isActive
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                      }`}
                    >
                      {page.isActive ? 'Live' : 'Draft / Off'}
                    </button>
                  </td>

                  <td className="p-4 text-right space-x-1">
                    <Link
                      href={page.slug}
                      target="_blank"
                      className="p-2 text-slate-400 hover:text-brand-600 inline-block rounded-lg transition-colors"
                      title="View Public Page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={() => handleEdit(page)}
                      className="p-2 text-slate-400 hover:text-slate-900 inline-block rounded-lg transition-colors"
                      title="Edit SEO & Title"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {page.isCustom && (
                      <button
                        onClick={() => handleDelete(page.id, page.title)}
                        className="p-2 text-slate-400 hover:text-rose-600 inline-block rounded-lg transition-colors"
                        title="Delete Custom Page"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Globe className="w-4 h-4 text-brand-500" />
                {editingPage ? 'Edit Page & SEO Settings' : 'Add New Website Page'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-1">Page Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diwali Luxury Specials"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">URL Path / Slug *</label>
                  <input
                    type="text"
                    required
                    placeholder="/diwali-special"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Page Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  >
                    <option value="core">Core Page</option>
                    <option value="service">Travel Service Desk</option>
                    <option value="policy">Policy / Terms</option>
                    <option value="custom">Custom Campaign</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-1">Google SEO Meta Title</label>
                <input
                  type="text"
                  placeholder="The TraveloPedia | Luxury Tour Packages from Surat"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-1">Google SEO Meta Description</label>
                <textarea
                  rows={3}
                  placeholder="Bespoke luxury holidays, 5-star hotel stays, and guaranteed Jain meal arrangements."
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveToggle"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-brand-600 rounded"
                />
                <label htmlFor="isActiveToggle" className="font-bold text-slate-800 text-xs">
                  Publish Live on Website
                </label>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold shadow-lg shadow-brand-500/20"
                >
                  {editingPage ? 'Save Changes' : 'Create Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
