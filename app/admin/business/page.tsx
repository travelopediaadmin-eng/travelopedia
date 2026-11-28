'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  DollarSign, 
  TrendingUp, 
  Award, 
  BarChart3, 
  PieChart, 
  Users, 
  Download, 
  Calendar, 
  CheckCircle, 
  ArrowUpRight, 
  MapPin, 
  Utensils, 
  Briefcase,
  Layers,
  Sparkles
} from 'lucide-react';
import { Enquiry, StaffMember } from '@/types/travel';
import { INITIAL_ENQUIRIES, INITIAL_STAFF } from '@/data/seed-data';

export default function AdminBusinessPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [staffList, setStaffList] = useState<StaffMember[]>([]);

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
      }
    }
  }, []);

  // Financial Calculations
  const businessStats = useMemo(() => {
    const totalPipelineValue = enquiries.reduce((sum, e) => sum + (e.dealValue || 0), 0);
    const confirmedEnquiries = enquiries.filter(e => e.status === 'Confirmed');
    const totalConfirmedRevenue = confirmedEnquiries.reduce((sum, e) => sum + (e.dealValue || 0), 0);
    const totalAdvanceCollected = enquiries.reduce((sum, e) => sum + (e.advancePaid || 0), 0);
    const balancePending = Math.max(0, totalConfirmedRevenue - totalAdvanceCollected);

    // Monthly Target (e.g., ₹25,00,000)
    const monthlyTarget = 2500000;
    const targetAchievedPercentage = Math.min(100, Math.round((totalConfirmedRevenue / monthlyTarget) * 100));

    // Dietary distribution
    const jainCount = enquiries.filter(e => e.dietaryPreference === 'Jain Friendly').length;
    const vegCount = enquiries.filter(e => e.dietaryPreference === 'Pure Vegetarian').length;
    const regularCount = enquiries.filter(e => e.dietaryPreference === 'Regular / Any' || !e.dietaryPreference).length;

    // Destination breakdown
    const destMap: { [key: string]: { count: number; revenue: number } } = {};
    enquiries.forEach(e => {
      const dest = e.destination || 'Other';
      if (!destMap[dest]) destMap[dest] = { count: 0, revenue: 0 };
      destMap[dest].count += 1;
      destMap[dest].revenue += (e.dealValue || 0);
    });

    const topDestinations = Object.entries(destMap)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    return {
      totalPipelineValue,
      totalConfirmedRevenue,
      totalAdvanceCollected,
      balancePending,
      monthlyTarget,
      targetAchievedPercentage,
      jainPercentage: enquiries.length ? Math.round((jainCount / enquiries.length) * 100) : 0,
      vegPercentage: enquiries.length ? Math.round((vegCount / enquiries.length) * 100) : 0,
      regularPercentage: enquiries.length ? Math.round((regularCount / enquiries.length) * 100) : 0,
      topDestinations
    };
  }, [enquiries]);

  // Staff Rankings Leaderboard
  const staffLeaderboard = useMemo(() => {
    return [...staffList].sort((a, b) => b.totalRevenueGenerated - a.totalRevenueGenerated);
  }, [staffList]);

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Enquiry ID', 'Customer Name', 'Phone', 'Destination', 'Travel Date', 'Status', 'Deal Value (INR)', 'Advance Paid (INR)', 'Payment Status', 'Assigned Staff', 'Dietary Preference'];
    const rows = enquiries.map(e => [
      e.id,
      `"${e.customerName}"`,
      `"${e.phone}"`,
      `"${e.destination}"`,
      e.travelDate,
      e.status,
      e.dealValue || 0,
      e.advancePaid || 0,
      e.paymentStatus || 'Unpaid',
      `"${e.assignedStaffName || 'Unassigned'}"`,
      `"${e.dietaryPreference || 'Jain Friendly'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `travelopedia_business_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-600 uppercase tracking-wider">
              Executive Analytics & Revenue Desk
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-emerald-500" />
            Agency Business & Revenue Performance
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Cash collection, confirmed deals, staff leaderboard, and Surat traveler demographics.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold shadow-md transition-all self-start md:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Accounting CSV</span>
        </button>
      </div>

      {/* Main Financial Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Confirmed Booking Revenue
          </div>
          <div className="text-3xl font-black text-slate-900">
            ₹{(businessStats.totalConfirmedRevenue / 100000).toFixed(2)}L
          </div>
          <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
            <CheckCircle className="w-3.5 h-3.5" />
            Confirmed Holiday Packages
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Advance Tokens Collected
          </div>
          <div className="text-3xl font-black text-emerald-600">
            ₹{(businessStats.totalAdvanceCollected / 100000).toFixed(2)}L
          </div>
          <span className="text-[11px] font-semibold text-slate-500 mt-1 block">
            Cleared into Bank Accounts
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Outstanding Receivables
          </div>
          <div className="text-3xl font-black text-amber-600">
            ₹{(businessStats.balancePending / 100000).toFixed(2)}L
          </div>
          <span className="text-[11px] font-semibold text-slate-400 mt-1 block">
            Due prior to final vouchers
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Total Inquiries Pipeline
          </div>
          <div className="text-3xl font-black text-purple-600">
            ₹{(businessStats.totalPipelineValue / 100000).toFixed(2)}L
          </div>
          <span className="text-[11px] font-semibold text-slate-400 mt-1 block">
            Combined active opportunity
          </span>
        </div>
      </div>

      {/* Target Progress Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Monthly Sales Target Progress
            </h3>
            <span className="text-xs text-slate-500">
              Agency Goal: ₹{(businessStats.monthlyTarget / 100000).toFixed(1)} Lakhs • Realized: ₹{(businessStats.totalConfirmedRevenue / 100000).toFixed(2)} Lakhs
            </span>
          </div>
          <div className="text-xl font-black text-brand-600">
            {businessStats.targetAchievedPercentage}% Achieved
          </div>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden p-0.5">
          <div
            className="bg-gradient-to-r from-brand-500 to-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${businessStats.targetAchievedPercentage}%` }}
          />
        </div>
      </div>

      {/* Two Column Layout: Staff Leaderboard + Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Staff Leaderboard (2 Columns wide) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                Staff Performance Leaderboard (Top Producers)
              </h3>
              <p className="text-xs text-slate-400">Ranked by closed volume and cumulative revenue</p>
            </div>
            <Link
              href="/admin/staff"
              className="text-xs font-bold text-brand-600 hover:text-brand-700"
            >
              Manage 40 Staff &rarr;
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                <tr>
                  <th className="p-3">Rank & Specialist</th>
                  <th className="p-3">Department</th>
                  <th className="p-3 text-center">Tours Closed</th>
                  <th className="p-3 text-right">Revenue Delivered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {staffLeaderboard.slice(0, 8).map((staff, index) => (
                  <tr key={staff.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full font-black text-xs flex items-center justify-center shrink-0 ${
                        index === 0 ? 'bg-amber-100 text-amber-800' :
                        index === 1 ? 'bg-slate-200 text-slate-700' :
                        index === 2 ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {index + 1}
                      </span>
                      <div>
                        <div className="font-bold text-slate-900">{staff.name}</div>
                        <div className="text-[10px] text-slate-400">{staff.employeeCode}</div>
                      </div>
                    </td>
                    <td className="p-3 text-slate-600 font-semibold">{staff.department}</td>
                    <td className="p-3 text-center font-bold text-emerald-600">
                      {staff.completedBookingsCount}
                    </td>
                    <td className="p-3 text-right font-black text-slate-900">
                      ₹{(staff.totalRevenueGenerated / 100000).toFixed(1)}L
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Demographics & Top Destinations (1 Column wide) */}
        <div className="space-y-6">
          {/* Jain / Pure Veg Preferences in Surat */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Utensils className="w-4 h-4 text-emerald-600" />
              Surat Dining & Dietary Demographics
            </h3>
            <p className="text-xs text-slate-400">Essential for menu curation & chef arrangements abroad</p>

            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-emerald-700">Jain Friendly (No Root Veg)</span>
                  <span className="text-emerald-800">{businessStats.jainPercentage}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${businessStats.jainPercentage}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-blue-700">Pure Vegetarian</span>
                  <span className="text-blue-800">{businessStats.vegPercentage}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${businessStats.vegPercentage}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-slate-600">Regular / Any</span>
                  <span className="text-slate-800">{businessStats.regularPercentage}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-slate-400 h-2 rounded-full" style={{ width: `${businessStats.regularPercentage}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Top Revenue Destinations */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-500" />
              Top Booking Destinations
            </h3>

            <div className="space-y-2.5 pt-1">
              {businessStats.topDestinations.map((dest, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{dest.name}</span>
                    <span className="text-[10px] text-slate-400">{dest.count} inquiries</span>
                  </div>
                  <span className="font-black text-slate-800">
                    ₹{(dest.revenue / 100000).toFixed(1)}L
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
