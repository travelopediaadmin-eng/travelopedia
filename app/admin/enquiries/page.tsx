'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Download, 
  MessageCircle, 
  Phone, 
  Trash2, 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Filter,
  Eye,
  X
} from 'lucide-react';
import { Enquiry, EnquiryStatus } from '@/types/travel';
import { exportToCsv, getAdminCustomerWhatsAppUrl } from '@/lib/utils';

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [editNotes, setEditNotes] = useState('');
  const [updatingNote, setUpdatingNote] = useState(false);

  const fetchEnquiries = () => {
    fetch('/api/enquiries')
      .then(res => res.json())
      .then(data => {
        if (data.enquiries) {
          setEnquiries(data.enquiries);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        setEnquiries(prev =>
          prev.map(e => e.id === id ? { ...e, status: newStatus } : e)
        );
      }
    } catch (err) {
      console.error('Error changing status', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;

    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setEnquiries(prev => prev.filter(e => e.id !== id));
        if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
      }
    } catch (err) {
      console.error('Failed to delete enquiry', err);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setUpdatingNote(true);

    try {
      const res = await fetch(`/api/enquiries/${selectedEnquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: editNotes })
      });

      if (res.ok) {
        setEnquiries(prev =>
          prev.map(e => e.id === selectedEnquiry.id ? { ...e, notes: editNotes } : e)
        );
        setSelectedEnquiry(prev => prev ? { ...prev, notes: editNotes } : null);
      }
    } catch (err) {
      console.error('Failed to save notes', err);
    } finally {
      setUpdatingNote(false);
    }
  };

  const handleExportCSV = () => {
    const formattedData = filteredEnquiries.map(e => ({
      ID: e.id,
      Date: new Date(e.createdAt).toLocaleDateString('en-IN'),
      Name: e.customerName,
      Phone: e.phone,
      Email: e.email || 'N/A',
      Destination: e.destination,
      Package: e.packageTitle || 'Custom',
      TravelDate: e.travelDate,
      Adults: e.adults,
      Children: e.children,
      HotelCategory: e.hotelCategory,
      Budget: e.estimatedBudget,
      Status: e.status,
      SpecialRequests: e.specialRequests || '',
      StaffNotes: e.notes || ''
    }));

    exportToCsv(`travelopedia_leads_${new Date().toISOString().split('T')[0]}.csv`, formattedData);
  };

  const filteredEnquiries = enquiries.filter(enq => {
    if (statusFilter !== 'All' && enq.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        enq.customerName.toLowerCase().includes(q) ||
        enq.phone.toLowerCase().includes(q) ||
        enq.destination.toLowerCase().includes(q) ||
        (enq.email && enq.email.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Contacted':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Proposal Sent':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Cancelled':
        return 'bg-slate-100 text-slate-600 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-navy-950">
            Leads &amp; Enquiries Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track customer requests, manage pipeline stages, and follow up directly on WhatsApp.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Export to CSV/Excel</span>
          </button>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {['All', 'New', 'Contacted', 'Proposal Sent', 'Confirmed', 'Cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === st
                  ? 'bg-navy-950 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search by name, phone, destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

      </div>

      {/* Main Enquiries Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-4">Customer Details</th>
                <th className="py-3.5 px-4">Destination / Tour</th>
                <th className="py-3.5 px-4">Travel Date / Ppl</th>
                <th className="py-3.5 px-4">Budget</th>
                <th className="py-3.5 px-4">Pipeline Status</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredEnquiries.length > 0 ? (
                filteredEnquiries.map((enq) => {
                  const customerWhatsApp = getAdminCustomerWhatsAppUrl(enq.phone, enq.customerName, enq.destination);
                  const formattedDate = new Date(enq.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  });

                  return (
                    <tr key={enq.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Date */}
                      <td className="py-4 px-6 whitespace-nowrap text-slate-500">
                        {formattedDate}
                        <span className="block text-[10px] text-slate-400">{enq.source}</span>
                      </td>

                      {/* Customer Info */}
                      <td className="py-4 px-4">
                        <span className="font-bold text-navy-950 text-sm block">
                          {enq.customerName}
                        </span>
                        <div className="flex flex-col text-[11px] text-slate-500 mt-0.5">
                          <span>{enq.phone}</span>
                          {enq.email && <span className="text-slate-400">{enq.email}</span>}
                        </div>
                      </td>

                      {/* Destination / Package */}
                      <td className="py-4 px-4">
                        <span className="font-semibold text-slate-900 block truncate max-w-xs">
                          {enq.destination}
                        </span>
                        {enq.packageTitle && (
                          <span className="text-[11px] text-slate-400 truncate max-w-xs block">
                            {enq.packageTitle}
                          </span>
                        )}
                      </td>

                      {/* Travel Date & Travelers */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="text-slate-800">{enq.travelDate || 'Flexible'}</span>
                        <span className="block text-[11px] text-slate-500">
                          {enq.adults} Adults{enq.children > 0 ? `, ${enq.children} Kids` : ''}
                        </span>
                      </td>

                      {/* Budget */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-semibold text-slate-900">{enq.estimatedBudget || 'Flexible'}</span>
                        <span className="block text-[11px] text-slate-400">{enq.hotelCategory}</span>
                      </td>

                      {/* Status Selector */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <select
                          value={enq.status}
                          onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none cursor-pointer ${getStatusBadge(enq.status)}`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Proposal Sent">Proposal Sent</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>

                      {/* Action Icons */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View details */}
                          <button
                            onClick={() => {
                              setSelectedEnquiry(enq);
                              setEditNotes(enq.notes || '');
                            }}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                            title="View details & notes"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          {/* WhatsApp */}
                          <a
                            href={customerWhatsApp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4 fill-emerald-600" />
                          </a>

                          {/* Direct Phone */}
                          <a
                            href={`tel:${enq.phone.replace(/[^0-9+]/g, '')}`}
                            className="p-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                            title="Direct Call"
                          >
                            <Phone className="w-4 h-4" />
                          </a>

                          {/* Delete */}
                          <button
                            onClick={() => handleDelete(enq.id)}
                            className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    No enquiries match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enquiry Detail & Notes Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="bg-navy-950 text-white p-6 relative">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="absolute top-5 right-5 p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <span className="text-[10px] uppercase font-bold text-amber-400 block mb-1">
                Lead Details • {selectedEnquiry.id}
              </span>
              <h3 className="text-xl font-bold font-serif">{selectedEnquiry.customerName}</h3>
              <p className="text-xs text-slate-300">{selectedEnquiry.phone} • {selectedEnquiry.email}</p>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-2xl">
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Destination</span>
                  <span className="font-semibold text-slate-900">{selectedEnquiry.destination}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Travel Dates</span>
                  <span className="font-semibold text-slate-900">{selectedEnquiry.travelDate || 'Flexible'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Travelers</span>
                  <span className="font-semibold text-slate-900">{selectedEnquiry.adults} Adults, {selectedEnquiry.children} Kids</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Budget &amp; Hotel</span>
                  <span className="font-semibold text-slate-900">{selectedEnquiry.estimatedBudget} ({selectedEnquiry.hotelCategory})</span>
                </div>
              </div>

              {selectedEnquiry.specialRequests && (
                <div className="p-3 bg-amber-50/60 border border-amber-100 rounded-2xl">
                  <span className="text-amber-900 font-bold block text-[11px] mb-1">Customer Special Requests:</span>
                  <p className="text-slate-800 leading-relaxed">{selectedEnquiry.specialRequests}</p>
                </div>
              )}

              {/* Staff Notes Editor */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Internal Consultant Notes</label>
                <textarea
                  rows={3}
                  placeholder="Record call updates, follow-up schedule, quote details..."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={updatingNote}
                  className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs"
                >
                  {updatingNote ? 'Saving...' : 'Save Notes'}
                </button>

                <a
                  href={getAdminCustomerWhatsAppUrl(selectedEnquiry.phone, selectedEnquiry.customerName, selectedEnquiry.destination)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
