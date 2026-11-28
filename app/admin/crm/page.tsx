'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  Phone, 
  Mail, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  Send, 
  MessageSquare, 
  UserCheck, 
  Plane, 
  Utensils, 
  ChevronRight, 
  ChevronLeft,
  X, 
  Edit3, 
  ShieldCheck, 
  MapPin, 
  Briefcase,
  AlertCircle,
  ExternalLink,
  Kanban,
  List,
  Sparkles
} from 'lucide-react';
import { Enquiry, StaffMember, EnquiryStatus, DietaryPreference, PaymentStatus } from '@/types/travel';
import { INITIAL_ENQUIRIES, INITIAL_STAFF } from '@/data/seed-data';

const PIPELINE_COLUMNS: { id: EnquiryStatus; title: string; color: string; border: string; bg: string }[] = [
  { id: 'New', title: 'New Leads', color: 'text-blue-600', border: 'border-blue-400', bg: 'bg-blue-50' },
  { id: 'Contacted', title: 'In Follow-Up', color: 'text-amber-600', border: 'border-amber-400', bg: 'bg-amber-50' },
  { id: 'Proposal Sent', title: 'Proposal Sent', color: 'text-purple-600', border: 'border-purple-400', bg: 'bg-purple-50' },
  { id: 'Confirmed', title: 'Deals Confirmed', color: 'text-emerald-600', border: 'border-emerald-400', bg: 'bg-emerald-50' },
  { id: 'Cancelled', title: 'Lost / Closed', color: 'text-rose-600', border: 'border-rose-400', bg: 'bg-rose-50' }
];

export default function AdminCRMPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [selectedStaffFilter, setSelectedStaffFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<Enquiry | null>(null);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [showNewModal, setShowNewModal] = useState(false);

  // New Lead Form State
  const [newLead, setNewLead] = useState<Partial<Enquiry>>({
    customerName: '',
    phone: '',
    email: '',
    destination: 'Dubai, UAE',
    travelDate: new Date().toISOString().split('T')[0],
    adults: 2,
    children: 0,
    hotelCategory: '5-Star',
    estimatedBudget: '₹2,00,000',
    dietaryPreference: 'Jain Friendly',
    flightAssistance: true,
    departureCity: 'Surat',
    dealValue: 200000,
    advancePaid: 0,
    paymentStatus: 'Unpaid',
    status: 'New',
    source: 'Quick Inquiry',
    notes: 'Walk-in / Direct phone inquiry at Surat VIP Road office.'
  });

  // Load from localStorage or initial seed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEnq = localStorage.getItem('travelopedia_enquiries');
      if (storedEnq) {
        try {
          setEnquiries(JSON.parse(storedEnq));
        } catch (e) {
          setEnquiries(INITIAL_ENQUIRIES);
        }
      } else {
        setEnquiries(INITIAL_ENQUIRIES);
        localStorage.setItem('travelopedia_enquiries', JSON.stringify(INITIAL_ENQUIRIES));
      }

      const storedStaff = localStorage.getItem('travelopedia_staff');
      if (storedStaff) {
        try {
          setStaffList(JSON.parse(storedStaff));
        } catch (e) {
          setStaffList(INITIAL_STAFF);
        }
      } else {
        setStaffList(INITIAL_STAFF);
        localStorage.setItem('travelopedia_staff', JSON.stringify(INITIAL_STAFF));
      }
    }
  }, []);

  // Save changes to localStorage
  const saveEnquiries = (updated: Enquiry[]) => {
    setEnquiries(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('travelopedia_enquiries', JSON.stringify(updated));
    }
  };

  // Filtered Leads
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((lead) => {
      const matchesSearch = 
        lead.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.phone.includes(searchQuery) ||
        lead.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.assignedStaffName && lead.assignedStaffName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStaff = selectedStaffFilter === 'all' || lead.assignedStaffId === selectedStaffFilter;

      return matchesSearch && matchesStaff;
    });
  }, [enquiries, searchQuery, selectedStaffFilter]);

  // Overall Financial & Pipeline Metrics
  const metrics = useMemo(() => {
    const totalLeads = enquiries.length;
    const confirmedLeads = enquiries.filter(l => l.status === 'Confirmed');
    const totalPipelineValue = enquiries.reduce((sum, l) => sum + (l.dealValue || 0), 0);
    const totalAdvanceCollected = enquiries.reduce((sum, l) => sum + (l.advancePaid || 0), 0);
    const conversionRate = totalLeads > 0 ? Math.round((confirmedLeads.length / totalLeads) * 100) : 0;

    return {
      totalLeads,
      confirmedCount: confirmedLeads.length,
      totalPipelineValue,
      totalAdvanceCollected,
      conversionRate
    };
  }, [enquiries]);

  // Move Lead to Another Stage
  const handleMoveStage = (leadId: string, newStatus: EnquiryStatus) => {
    const updated = enquiries.map((l) => {
      if (l.id === leadId) {
        return { ...l, status: newStatus };
      }
      return l;
    });
    saveEnquiries(updated);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
  };

  // Assign to Staff
  const handleAssignStaff = (leadId: string, staffId: string) => {
    const staff = staffList.find(s => s.id === staffId);
    const updated = enquiries.map((l) => {
      if (l.id === leadId) {
        return {
          ...l,
          assignedStaffId: staff ? staff.id : undefined,
          assignedStaffName: staff ? staff.name : undefined
        };
      }
      return l;
    });
    saveEnquiries(updated);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({
        ...selectedLead,
        assignedStaffId: staff ? staff.id : undefined,
        assignedStaffName: staff ? staff.name : undefined
      });
    }
  };

  // Update Deal Details
  const handleUpdateDeal = (leadId: string, dealValue: number, advancePaid: number, paymentStatus: PaymentStatus) => {
    const updated = enquiries.map((l) => {
      if (l.id === leadId) {
        return {
          ...l,
          dealValue,
          advancePaid,
          paymentStatus
        };
      }
      return l;
    });
    saveEnquiries(updated);
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({
        ...selectedLead,
        dealValue,
        advancePaid,
        paymentStatus
      });
    }
  };

  // Create New Lead
  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.customerName || !newLead.phone) {
      alert('Please provide customer name and phone number.');
      return;
    }

    const assigned = staffList.find(s => s.id === newLead.assignedStaffId);

    const created: Enquiry = {
      id: `enq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      customerName: newLead.customerName || '',
      phone: newLead.phone || '',
      email: newLead.email || 'customer@travelopedia.com',
      destination: newLead.destination || 'Dubai, UAE',
      travelDate: newLead.travelDate || '2026-12-01',
      adults: Number(newLead.adults) || 2,
      children: Number(newLead.children) || 0,
      hotelCategory: newLead.hotelCategory || '5-Star',
      estimatedBudget: newLead.estimatedBudget || '₹2,00,000',
      dietaryPreference: (newLead.dietaryPreference as DietaryPreference) || 'Jain Friendly',
      flightAssistance: newLead.flightAssistance ?? true,
      departureCity: newLead.departureCity || 'Surat',
      dealValue: Number(newLead.dealValue) || 200000,
      advancePaid: Number(newLead.advancePaid) || 0,
      paymentStatus: (newLead.paymentStatus as PaymentStatus) || 'Unpaid',
      status: (newLead.status as EnquiryStatus) || 'New',
      source: 'Quick Inquiry',
      assignedStaffId: assigned ? assigned.id : undefined,
      assignedStaffName: assigned ? assigned.name : undefined,
      notes: newLead.notes || 'Inquiry logged from CRM Desk.'
    };

    saveEnquiries([created, ...enquiries]);
    setShowNewModal(false);
  };

  // WhatsApp Proposal Message Generator
  const generateWhatsAppMessage = (lead: Enquiry) => {
    const staff = lead.assignedStaffName || 'The TraveloPedia Holiday Desk';
    const text = `Namaste ${lead.customerName}! ✈️
Greetings from *The TraveloPedia* (VIP Road, Vesu, Surat).

We have customized your dream holiday to *${lead.destination}*:
📅 Travel Date: ${lead.travelDate}
👥 Travelers: ${lead.adults} Adults${lead.children ? `, ${lead.children} Kids` : ''}
🏨 Hotel Category: ${lead.hotelCategory} Luxury
🍲 Food Preference: *${lead.dietaryPreference || 'Jain / Pure Veg Friendly'}*
✈️ Departure: ${lead.departureCity || 'Surat / Mumbai'}
💰 Estimated Package: ₹${(lead.dealValue || 0).toLocaleString('en-IN')}

Assigned Specialist: *${staff}* (The TraveloPedia Surat)
📍 7, E-Space, VIP Road, Vesu, Surat
📞 Call/WhatsApp: +91 95129 35701

Shall we share the day-wise itinerary brochure PDF?`;

    return encodeURIComponent(text);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-50 text-brand-600 uppercase tracking-wider">
              Surat HQ • 40-Staff Integrated CRM
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Kanban className="w-6 h-6 text-brand-500" />
            Travel Agency CRM & Sales Pipeline
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Real-time lead assignment, stage tracking, Jain/Veg meal preferences, and deal closures.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* View Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'kanban' 
                  ? 'bg-white text-brand-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Pipeline Board</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'list' 
                  ? 'bg-white text-brand-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table View</span>
            </button>
          </div>

          <button
            onClick={() => setShowNewModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl text-xs font-bold shadow-lg shadow-brand-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Customer Inquiry</span>
          </button>
        </div>
      </div>

      {/* Real-time CRM Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Inquiries</span>
            <Users className="w-4 h-4 text-brand-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{metrics.totalLeads}</div>
          <span className="text-[11px] font-semibold text-emerald-600">Across 15-40 Employee Desks</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pipeline Deal Value</span>
            <DollarSign className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            ₹{(metrics.totalPipelineValue / 100000).toFixed(1)} Lakhs
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Estimated Luxury Bookings</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Advance Received</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600">
            ₹{(metrics.totalAdvanceCollected / 100000).toFixed(2)} Lakhs
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold">Cleared into Accounts</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Win Conversion</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{metrics.conversionRate}%</div>
          <span className="text-[11px] text-slate-400 font-medium">From Inquiries to Booked</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search customer, mobile, destination..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-bold text-slate-600">Assignee:</span>
          </div>
          <select
            value={selectedStaffFilter}
            onChange={(e) => setSelectedStaffFilter(e.target.value)}
            className="py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          >
            <option value="all">All 40 Staff Members</option>
            {staffList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.department}) - {s.employeeCode}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* View 1: KANBAN BOARD */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start">
          {PIPELINE_COLUMNS.map((column) => {
            const columnLeads = filteredEnquiries.filter((l) => l.status === column.id);
            const columnValue = columnLeads.reduce((sum, l) => sum + (l.dealValue || 0), 0);

            return (
              <div
                key={column.id}
                className="bg-slate-50/80 rounded-2xl border border-slate-200 p-3 flex flex-col min-h-[500px]"
              >
                {/* Column Header */}
                <div className={`p-3 rounded-xl ${column.bg} border ${column.border} mb-3 flex items-center justify-between`}>
                  <div>
                    <h3 className={`text-xs font-black uppercase tracking-wider ${column.color}`}>
                      {column.title}
                    </h3>
                    <div className="text-[11px] font-bold text-slate-500">
                      ₹{(columnValue / 1000).toLocaleString('en-IN')}k total
                    </div>
                  </div>
                  <span className={`w-6 h-6 rounded-full font-black text-xs flex items-center justify-center bg-white shadow-sm ${column.color}`}>
                    {columnLeads.length}
                  </span>
                </div>

                {/* Column Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto">
                  {columnLeads.length === 0 ? (
                    <div className="h-28 border border-dashed border-slate-300 rounded-xl flex items-center justify-center text-[11px] text-slate-400 font-medium">
                      No leads in this stage
                    </div>
                  ) : (
                    columnLeads.map((lead) => (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group hover:border-brand-300 space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-xs font-bold text-slate-900 group-hover:text-brand-600 transition-colors block">
                              {lead.customerName}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-brand-500 shrink-0" />
                              {lead.destination}
                            </span>
                          </div>

                          <span className="text-xs font-black text-slate-900 shrink-0">
                            ₹{(lead.dealValue || 0).toLocaleString('en-IN')}
                          </span>
                        </div>

                        {/* Customer Requirements Badges */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {lead.dietaryPreference && (
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold rounded-md flex items-center gap-1">
                              <Utensils className="w-2.5 h-2.5" />
                              {lead.dietaryPreference}
                            </span>
                          )}
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded-md">
                            {lead.hotelCategory}
                          </span>
                          {lead.flightAssistance && (
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 text-[9px] font-bold rounded-md flex items-center gap-1">
                              <Plane className="w-2.5 h-2.5" />
                              Flight
                            </span>
                          )}
                        </div>

                        {/* Assignee Footer & Quick Stage Changer */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                          <div className="flex items-center gap-1.5 text-slate-600 truncate max-w-[130px]">
                            <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 font-bold flex items-center justify-center shrink-0 text-[9px]">
                              {lead.assignedStaffName ? lead.assignedStaffName[0] : 'U'}
                            </div>
                            <span className="font-semibold truncate">
                              {lead.assignedStaffName || 'Unassigned'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            {lead.advancePaid && lead.advancePaid > 0 ? (
                              <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded font-bold text-[9px]">
                                Paid ₹{(lead.advancePaid / 1000)}k
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* View 2: LIST / TABLE VIEW */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                <tr>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Destination & Date</th>
                  <th className="p-3.5">Dietary & Hotel</th>
                  <th className="p-3.5">Deal Value</th>
                  <th className="p-3.5">Assigned Specialist</th>
                  <th className="p-3.5">Pipeline Stage</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredEnquiries.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{lead.customerName}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{lead.phone}</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-brand-600">{lead.destination}</div>
                      <div className="text-[11px] text-slate-500">{lead.travelDate} ({lead.adults} Ad, {lead.children} Ch)</div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold rounded-md inline-block mb-1">
                        {lead.dietaryPreference || 'Jain Friendly'}
                      </span>
                      <div className="text-[11px] text-slate-500">{lead.hotelCategory}</div>
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">
                      ₹{(lead.dealValue || 0).toLocaleString('en-IN')}
                      {lead.advancePaid ? (
                        <div className="text-[10px] text-emerald-600 font-semibold">Adv: ₹{lead.advancePaid.toLocaleString('en-IN')}</div>
                      ) : null}
                    </td>
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px]">
                          {lead.assignedStaffName ? lead.assignedStaffName[0] : 'U'}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-800">{lead.assignedStaffName || 'Unassigned'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <select
                        value={lead.status}
                        onChange={(e) => handleMoveStage(lead.id, e.target.value as EnquiryStatus)}
                        className="py-1 px-2.5 rounded-lg text-xs font-bold bg-slate-100 border border-slate-300"
                      >
                        <option value="New">📥 New Lead</option>
                        <option value="Contacted">📞 In Follow-Up</option>
                        <option value="Proposal Sent">📝 Proposal Sent</option>
                        <option value="Confirmed">🤝 Confirmed</option>
                        <option value="Cancelled">❌ Lost</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-brand-50 hover:text-brand-600 rounded-lg text-xs font-bold transition-colors"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* LEAD DETAIL & ACTION DRAWER / MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-500 text-white flex items-center justify-center font-black">
                  {selectedLead.customerName[0]}
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 leading-tight">
                    {selectedLead.customerName}
                  </h2>
                  <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>{selectedLead.phone}</span>
                    <span>•</span>
                    <span>{selectedLead.email}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
              {/* Pipeline Status Banner */}
              <div className="p-4 rounded-2xl bg-brand-50 border border-brand-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600">Current Sales Stage</span>
                  <div className="text-sm font-black text-slate-900">{selectedLead.status}</div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleMoveStage(selectedLead.id, e.target.value as EnquiryStatus)}
                    className="py-1.5 px-3 bg-white border border-brand-300 rounded-xl font-bold text-xs text-brand-700 shadow-sm"
                  >
                    <option value="New">📥 New Lead</option>
                    <option value="Contacted">📞 In Follow-Up</option>
                    <option value="Proposal Sent">📝 Proposal Sent</option>
                    <option value="Confirmed">🤝 Confirmed Deal</option>
                    <option value="Cancelled">❌ Closed / Lost</option>
                  </select>
                </div>
              </div>

              {/* Travel Specifications */}
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3">
                  Customer Travel Specifications
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Destination</span>
                    <span className="font-bold text-slate-900 text-xs">{selectedLead.destination}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Travel Date</span>
                    <span className="font-bold text-slate-900 text-xs">{selectedLead.travelDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Pax Details</span>
                    <span className="font-bold text-slate-900 text-xs">
                      {selectedLead.adults} Adults, {selectedLead.children} Kids
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Food Preference</span>
                    <span className="font-bold text-emerald-700 text-xs">
                      {selectedLead.dietaryPreference || 'Jain Friendly'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Hotel Tier</span>
                    <span className="font-bold text-slate-900 text-xs">{selectedLead.hotelCategory}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Flight Support</span>
                    <span className="font-bold text-slate-900 text-xs">
                      {selectedLead.flightAssistance ? `Required (${selectedLead.departureCity || 'Surat'})` : 'Self Arranged'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Staff Assignment Roster */}
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">
                  Assigned Employee Desk (40 Staff Roster)
                </h3>
                <select
                  value={selectedLead.assignedStaffId || ''}
                  onChange={(e) => handleAssignStaff(selectedLead.id, e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-xs text-slate-800"
                >
                  <option value="">-- Unassigned (General Pool) --</option>
                  {staffList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} • {s.department} ({s.employeeCode})
                    </option>
                  ))}
                </select>
              </div>

              {/* Deal Financials & Payment Tracking */}
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-3">
                  Financials & Advance Payment
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">Total Deal Value (₹)</label>
                    <input
                      type="number"
                      value={selectedLead.dealValue || 0}
                      onChange={(e) => handleUpdateDeal(
                        selectedLead.id, 
                        Number(e.target.value), 
                        selectedLead.advancePaid || 0, 
                        selectedLead.paymentStatus || 'Unpaid'
                      )}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">Advance Received (₹)</label>
                    <input
                      type="number"
                      value={selectedLead.advancePaid || 0}
                      onChange={(e) => handleUpdateDeal(
                        selectedLead.id, 
                        selectedLead.dealValue || 0, 
                        Number(e.target.value), 
                        Number(e.target.value) > 0 ? 'Advance Received' : 'Unpaid'
                      )}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-xs"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">Payment Status</label>
                    <select
                      value={selectedLead.paymentStatus || 'Unpaid'}
                      onChange={(e) => handleUpdateDeal(
                        selectedLead.id, 
                        selectedLead.dealValue || 0, 
                        selectedLead.advancePaid || 0, 
                        e.target.value as PaymentStatus
                      )}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-xs"
                    >
                      <option value="Unpaid">Unpaid</option>
                      <option value="Advance Received">Advance Received</option>
                      <option value="Full Paid">Full Paid</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Special Requests & Notes */}
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">
                  Customer Notes & Special Requests
                </h3>
                <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl text-slate-700 text-xs italic">
                  "{selectedLead.specialRequests || selectedLead.notes || 'No specific requests noted.'}"
                </div>
              </div>
            </div>

            {/* Modal Footer / Direct Action Buttons */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-2">
              <a
                href={`tel:${selectedLead.phone}`}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Client</span>
              </a>

              <a
                href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=${generateWhatsAppMessage(selectedLead)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Send WhatsApp Luxury Quotation</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* NEW CUSTOMER INQUIRY MODAL */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-brand-500" />
                Log Walk-In / Phone Customer Inquiry
              </h2>
              <button
                onClick={() => setShowNewModal(false)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Customer Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dhaval Kothari"
                    value={newLead.customerName}
                    onChange={(e) => setNewLead({ ...newLead, customerName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98250 12345"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Destination</label>
                  <input
                    type="text"
                    placeholder="e.g. Dubai, Bali, Kashmir"
                    value={newLead.destination}
                    onChange={(e) => setNewLead({ ...newLead, destination: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Tentative Travel Date</label>
                  <input
                    type="date"
                    value={newLead.travelDate}
                    onChange={(e) => setNewLead({ ...newLead, travelDate: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Adults</label>
                  <input
                    type="number"
                    min="1"
                    value={newLead.adults}
                    onChange={(e) => setNewLead({ ...newLead, adults: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Kids (Below 12)</label>
                  <input
                    type="number"
                    min="0"
                    value={newLead.children}
                    onChange={(e) => setNewLead({ ...newLead, children: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Food Preference</label>
                  <select
                    value={newLead.dietaryPreference}
                    onChange={(e) => setNewLead({ ...newLead, dietaryPreference: e.target.value as DietaryPreference })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-emerald-700"
                  >
                    <option value="Jain Friendly">Jain Friendly</option>
                    <option value="Pure Vegetarian">Pure Vegetarian</option>
                    <option value="Regular / Any">Regular / Any</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Assign to Specialist</label>
                  <select
                    value={newLead.assignedStaffId || ''}
                    onChange={(e) => setNewLead({ ...newLead, assignedStaffId: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  >
                    <option value="">Select Staff Member</option>
                    {staffList.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.department})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Estimated Budget (₹)</label>
                  <input
                    type="number"
                    value={newLead.dealValue}
                    onChange={(e) => setNewLead({ ...newLead, dealValue: Number(e.target.value) })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-600 block mb-1">Customer Notes</label>
                <textarea
                  rows={2}
                  placeholder="Special requirements, hotel preference, anniversaries, etc."
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl font-bold shadow-lg shadow-brand-500/20"
                >
                  Add Lead to CRM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
