'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Phone, 
  Mail, 
  Award, 
  TrendingUp, 
  DollarSign, 
  CheckCircle, 
  Briefcase, 
  Edit3, 
  Trash2, 
  MessageSquare, 
  UserPlus, 
  ShieldCheck, 
  X, 
  Building2,
  Calendar
} from 'lucide-react';
import { StaffMember, StaffDepartment, StaffRole } from '@/types/travel';
import { INITIAL_STAFF } from '@/data/seed-data';

const DEPARTMENTS: StaffDepartment[] = [
  'International Holidays',
  'Domestic Tours',
  'Visa & Ticketing',
  'Customized Luxury',
  'Finance & Accounts'
];

const ROLES: StaffRole[] = [
  'Managing Director',
  'Senior Holiday Specialist',
  'Travel Consultant',
  'Visa Operations Manager',
  'Air Ticketing Executive',
  'Accounts Executive'
];

export default function AdminStaffPage() {
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<StaffMember>>({
    name: '',
    employeeCode: '',
    department: 'International Holidays',
    role: 'Travel Consultant',
    phone: '',
    email: '',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    activeLeadsCount: 0,
    completedBookingsCount: 0,
    totalRevenueGenerated: 0,
    joinedDate: new Date().toISOString().split('T')[0]
  });

  // Load staff from localStorage or initial seed
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('travelopedia_staff');
      if (stored) {
        try {
          setStaffList(JSON.parse(stored));
        } catch (e) {
          setStaffList(INITIAL_STAFF);
        }
      } else {
        setStaffList(INITIAL_STAFF);
        localStorage.setItem('travelopedia_staff', JSON.stringify(INITIAL_STAFF));
      }
    }
  }, []);

  const saveStaff = (updated: StaffMember[]) => {
    setStaffList(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('travelopedia_staff', JSON.stringify(updated));
    }
  };

  // Filtered staff
  const filteredStaff = useMemo(() => {
    return staffList.filter((s) => {
      const matchesDept = selectedDept === 'all' || s.department === selectedDept;
      const matchesSearch = 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.employeeCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.phone.includes(searchQuery) ||
        s.role.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDept && matchesSearch;
    });
  }, [staffList, selectedDept, searchQuery]);

  // Aggregate Metrics
  const metrics = useMemo(() => {
    const totalStaff = staffList.length;
    const activeStaff = staffList.filter(s => s.status === 'active').length;
    const totalRevenue = staffList.reduce((sum, s) => sum + (s.totalRevenueGenerated || 0), 0);
    const totalBookings = staffList.reduce((sum, s) => sum + (s.completedBookingsCount || 0), 0);

    return { totalStaff, activeStaff, totalRevenue, totalBookings };
  }, [staffList]);

  // Open modal for add
  const handleAddNew = () => {
    const nextCode = `TP-SUR-${String(staffList.length + 1).padStart(3, '0')}`;
    setEditingStaff(null);
    setFormData({
      name: '',
      employeeCode: nextCode,
      department: 'International Holidays',
      role: 'Travel Consultant',
      phone: '+91 ',
      email: '',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      activeLeadsCount: 0,
      completedBookingsCount: 0,
      totalRevenueGenerated: 0,
      joinedDate: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  // Open modal for edit
  const handleEdit = (staff: StaffMember) => {
    setEditingStaff(staff);
    setFormData({ ...staff });
    setIsModalOpen(true);
  };

  // Save form
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Please enter employee name and mobile number.');
      return;
    }

    if (editingStaff) {
      // Update
      const updated = staffList.map(s => {
        if (s.id === editingStaff.id) {
          return {
            ...s,
            ...formData,
            id: s.id
          } as StaffMember;
        }
        return s;
      });
      saveStaff(updated);
    } else {
      // Create new
      const newEmployee: StaffMember = {
        id: `staff-${Date.now()}`,
        name: formData.name || '',
        employeeCode: formData.employeeCode || `TP-SUR-${staffList.length + 1}`,
        department: (formData.department as StaffDepartment) || 'International Holidays',
        role: (formData.role as StaffRole) || 'Travel Consultant',
        phone: formData.phone || '',
        email: formData.email || `${formData.name?.toLowerCase().replace(/\s+/g, '.')}@thetravelopedia.com`,
        avatar: formData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        activeLeadsCount: Number(formData.activeLeadsCount) || 0,
        completedBookingsCount: Number(formData.completedBookingsCount) || 0,
        totalRevenueGenerated: Number(formData.totalRevenueGenerated) || 0,
        status: (formData.status as 'active' | 'on_leave' | 'inactive') || 'active',
        joinedDate: formData.joinedDate || new Date().toISOString().split('T')[0]
      };
      saveStaff([newEmployee, ...staffList]);
    }

    setIsModalOpen(false);
  };

  // Delete staff member
  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name} from the staff roster?`)) {
      const updated = staffList.filter(s => s.id !== id);
      saveStaff(updated);
    }
  };

  // Status Badge Helper
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Active Duty</span>;
      case 'on_leave':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">On Leave</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">Inactive</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-brand-50 text-brand-600 uppercase tracking-wider">
              Surat VIP Road • Agency Team
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-brand-500" />
            Staff & Employee Desk (15 - 40 Roster)
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage holiday specialists, visa managers, ticketing executives, and accounts performance.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-2xl text-xs font-bold shadow-lg shadow-brand-500/20 transition-all self-start md:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Employee</span>
        </button>
      </div>

      {/* Aggregate Performance Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Workforce</span>
            <Users className="w-4 h-4 text-brand-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{metrics.totalStaff} Members</div>
          <span className="text-[11px] font-semibold text-emerald-600">Capacity scalable to 40+</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active on Duty</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600">{metrics.activeStaff} Active</div>
          <span className="text-[11px] text-slate-400 font-medium">Handling daily leads</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Revenue Driven</span>
            <DollarSign className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            ₹{(metrics.totalRevenue / 10000000).toFixed(2)} Cr
          </div>
          <span className="text-[11px] text-slate-400 font-medium">All completed bookings</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Completed Tours</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900">{metrics.totalBookings} Families</div>
          <span className="text-[11px] text-slate-400 font-medium">Delighted Travelers</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search employee name, code, phone, role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>

        {/* Department Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setSelectedDept('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
              selectedDept === 'all'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Departments ({staffList.length})
          </button>
          {DEPARTMENTS.map((dept) => {
            const count = staffList.filter(s => s.department === dept).length;
            return (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedDept === dept
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {dept} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Staff Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStaff.map((staff) => (
          <div
            key={staff.id}
            className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            {/* Header: Avatar + Info */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                  <img
                    src={staff.avatar || '/logo.png'}
                    alt={staff.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      (e.target as any).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900 group-hover:text-brand-600 transition-colors">
                    {staff.name}
                  </h3>
                  <div className="text-[11px] font-bold text-brand-600">
                    {staff.role}
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {staff.employeeCode}
                  </span>
                </div>
              </div>

              <div>{getStatusBadge(staff.status)}</div>
            </div>

            {/* Department & Contact */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400 text-[10px]">Department:</span>
                <span className="font-bold text-slate-800">{staff.department}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400 text-[10px]">Mobile:</span>
                <a href={`tel:${staff.phone}`} className="font-semibold hover:text-brand-600">
                  {staff.phone}
                </a>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="text-slate-400 text-[10px]">Email:</span>
                <span className="font-semibold truncate max-w-[170px] text-slate-700">{staff.email}</span>
              </div>
            </div>

            {/* Performance Metrics Row */}
            <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100 text-center">
              <div className="p-2 rounded-xl bg-slate-50">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Active Leads</span>
                <span className="text-xs font-black text-brand-600">{staff.activeLeadsCount}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Closed</span>
                <span className="text-xs font-black text-emerald-600">{staff.completedBookingsCount}</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Revenue</span>
                <span className="text-xs font-black text-slate-900">
                  ₹{(staff.totalRevenueGenerated / 100000).toFixed(1)}L
                </span>
              </div>
            </div>

            {/* Actions: Edit, Delete, WhatsApp */}
            <div className="pt-2 flex items-center justify-between gap-2">
              <a
                href={`https://wa.me/${staff.phone.replace(/[^0-9]/g, '')}?text=Hello%20${staff.name},%20regarding%20client%20leads%20at%20The%20TraveloPedia:`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleEdit(staff)}
                  className="p-2 text-slate-500 hover:text-brand-600 hover:bg-slate-100 rounded-xl transition-colors"
                  title="Edit Employee"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(staff.id, staff.name)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Remove from Roster"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT EMPLOYEE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-500" />
                {editingStaff ? 'Edit Staff Member' : 'Add New Employee (Up to 40)'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Employee Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyank Shah"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Employee Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TP-SUR-016"
                    value={formData.employeeCode}
                    onChange={(e) => setFormData({ ...formData, employeeCode: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value as StaffDepartment })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  >
                    {DEPARTMENTS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Designation / Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as StaffRole })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  >
                    {ROLES.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98250 12345"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Work Email</label>
                  <input
                    type="email"
                    placeholder="name@thetravelopedia.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Duty Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  >
                    <option value="active">Active Duty</option>
                    <option value="on_leave">On Leave</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-600 block mb-1">Joined Date</label>
                  <input
                    type="date"
                    value={formData.joinedDate}
                    onChange={(e) => setFormData({ ...formData, joinedDate: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold"
                  />
                </div>
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
                  {editingStaff ? 'Update Employee' : 'Add to Staff Roster'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
