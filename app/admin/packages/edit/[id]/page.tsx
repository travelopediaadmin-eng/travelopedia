'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PackageForm from '@/components/PackageForm';
import { TravelPackage } from '@/types/travel';

export default function EditPackagePage() {
  const params = useParams();
  const id = params?.id as string;

  const [pkg, setPkg] = useState<TravelPackage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`/api/packages/${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.package) {
            setPkg(data.package);
          }
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200">
        <h2 className="text-xl font-bold font-serif text-slate-800">Package not found</h2>
        <Link href="/admin/packages" className="mt-4 inline-block text-xs font-bold text-brand-600">
          &larr; Return to Packages List
        </Link>
      </div>
    );
  }

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
            Edit Package: {pkg.title}
          </h1>
          <p className="text-xs text-slate-500">
            Update itinerary, pricing, day schedule, or inclusions.
          </p>
        </div>
      </div>

      <PackageForm initialData={pkg} isEdit={true} />
    </div>
  );
}
