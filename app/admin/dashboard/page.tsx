'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Package, 
  CheckCircle2, 
  Clock, 
  TrendingUp, 
  PlusCircle, 
  ArrowRight, 
  MessageCircle, 
  Phone, 
  ExternalLink,
  Sparkles,
  Calendar
} from 'lucide-react';
import { Enquiry, EnquiryStatus } from '@/types/travel';
import { formatPrice, getAdminCustomerWhatsAppUrl } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = () => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.stats) {
          setStats(data.stats);
          setRecentEnquiries(data.stats.recentEnquiries || []);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (res.ok) {
        // update local list
        setRecentEnquiries(prev => 
          prev.map(e => e.id === id ? { ...e, status: newStatus } : e)
        );
        fetchDashboardData();
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-navy-950">
            The TraveloPedia Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Surat Headquarters • Real-time overview of leads, tour packages &amp; customer enquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/packages/new"
            className="px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center gap-2 shadow-md shadow-brand-500/20 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Package</span>
          </Link>

          <Link
            href="/admin/enquiries"
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2 border border-slate-200 transition-all"
          >
            <Users className="w-4 h-4 text-brand-500" />
            <span>Manage All Leads</span>
          </Link>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Enquiries */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Enquiries</span>
            <span className="text-3xl font-black font-serif text-navy-950 mt-1 block">
              {stats?.totalEnquiries || 0}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
              Across website &amp; custom wizard
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* New Leads Today */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">New Leads Today</span>
            <span className="text-3xl font-black font-serif text-brand-600 mt-1 block">
              {stats?.newToday || 0}
            </span>
            <span className="text-[11px] text-amber-600 font-semibold mt-1 block">
              Pending follow-up
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Active Packages */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Packages</span>
            <span className="text-3xl font-black font-serif text-navy-950 mt-1 block">
              {stats?.activePackages || 0}
            </span>
            <span className="text-[11px] text-slate-500 font-semibold mt-1 block">
              International &amp; Domestic
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Confirmed Bookings */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Confirmed Bookings</span>
            <span className="text-3xl font-black font-serif text-emerald-600 mt-1 block">
              {stats?.confirmedBookings || 0}
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
              Ready for travel departure
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Recent Enquiries Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold font-serif text-navy-950">
              Recent Leads &amp; Customer Inquiries
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Instant action pipeline: update status or connect directly on WhatsApp.
            </p>
          </div>

          <Link
            href="/admin/enquiries"
            className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            <span>View All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Customer</th>
                <th className="py-3.5 px-4">Destination / Package</th>
                <th className="py-3.5 px-4">Travel Date</th>
                <th className="py-3.5 px-4">Budget / Ppl</th>
                <th className="py-3.5 px-4">Status Pipeline</th>
                <th className="py-3.5 px-6 text-right">Quick Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {recentEnquiries.length > 0 ? (
                recentEnquiries.map((enq) => {
                  const customerWhatsApp = getAdminCustomerWhatsAppUrl(enq.phone, enq.customerName, enq.destination);

                  return (
                    <tr key={enq.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Customer Info */}
                      <td className="py-4 px-6">
                        <span className="font-bold text-navy-950 text-sm block">
                          {enq.customerName}
                        </span>
                        <div className="flex items-center gap-2 text-slate-400 text-[11px] mt-0.5">
                          <span>{enq.phone}</span>
                          {enq.email && <span>• {enq.email}</span>}
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

                      {/* Travel Date */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="text-slate-800">{enq.travelDate || 'Flexible'}</span>
                        <span className="block text-[11px] text-slate-400">{enq.durationDays}</span>
                      </td>

                      {/* Budget / Travelers */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-semibold text-slate-900">{enq.estimatedBudget || 'Flexible'}</span>
                        <span className="block text-[11px] text-slate-500">
                          {enq.adults} Adults{enq.children > 0 ? `, ${enq.children} Kids` : ''}
                        </span>
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

                      {/* Quick Contact Actions */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={customerWhatsApp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                            title="Chat with customer on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4 fill-emerald-600" />
                          </a>

                          <a
                            href={`tel:${enq.phone.replace(/[^0-9+]/g, '')}`}
                            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                            title="Call customer directly"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">
                    No recent inquiries found.
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
