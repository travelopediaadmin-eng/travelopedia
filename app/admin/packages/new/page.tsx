'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PackageForm from '@/components/PackageForm';

export default function NewPackagePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
        <Link
          href="/admin/packages"
          className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold font-serif text-navy-950">
            Create New Tour Package
          </h1>
          <p className="text-xs text-slate-500">
            Publish a new curated itinerary to the public website catalog.
          </p>
        </div>
      </div>

      <PackageForm isEdit={false} />
    </div>
  );
}
