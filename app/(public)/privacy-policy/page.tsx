import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff, Server, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { COMPANY_DETAILS } from '@/lib/utils';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-14 rounded-3xl border border-slate-200/90 shadow-lg text-slate-700 text-sm leading-relaxed space-y-8">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Data Protection &amp; Confidentiality Protocol</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-navy-950">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Last Updated: November 2026 | The TraveloPedia ({COMPANY_DETAILS.address})
          </p>
        </div>

        {/* Intro */}
        <p className="text-slate-600 leading-relaxed">
          At <strong>The TraveloPedia</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), we recognize that planning luxury travel involves sharing highly sensitive personal and identification details. We are deeply committed to safeguarding your privacy, your family&apos;s travel credentials, and your confidential trip preferences.
        </p>

        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy-950 font-serif flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-navy-950 text-white text-xs flex items-center justify-center font-sans">1</span>
            Information We Collect
          </h2>
          <p>
            To craft tailor-made domestic and international itineraries, secure verified flight reservations, and file embassy visa applications, we collect only necessary personal data:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li><strong>Personal Contact Data:</strong> Full legal name, mobile/WhatsApp telephone number, residential address in India/abroad, and official email ID.</li>
            <li><strong>Travel Credentials:</strong> High-resolution passport scans (first and last pages), date of birth, nationality, previous visa histories, and frequent flyer numbers.</li>
            <li><strong>Visa Filing Supporting Documents:</strong> Employment/business letters, income proof (ITR / bank statements when mandated by foreign consulates for Schengen, UK, US, or Australian visas).</li>
            <li><strong>Special Care Preferences:</strong> Dietary specifications (such as strict Pure Vegetarian, Jain meal requirements, or child meal preferences), mobility assistance, and room bed configurations.</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy-950 font-serif flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-navy-950 text-white text-xs flex items-center justify-center font-sans">2</span>
            Strict Purpose of Data Use
          </h2>
          <p>
            Your information is utilized solely for lawful execution of your travel services:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600">
                <strong className="text-navy-950 block mb-0.5">Ticket &amp; Voucher Issuance</strong>
                Submitting passenger names to airlines, cruise liners, luxury rail services, and destination hotels.
              </div>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600">
                <strong className="text-navy-950 block mb-0.5">Consular Visa Submissions</strong>
                Compiling official cover letters, invitation vouchers, and visa appointment dossiers.
              </div>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600">
                <strong className="text-navy-950 block mb-0.5">Real-time Trip Concierge</strong>
                Sharing flight status alerts, private chauffeur details, and itinerary schedules via WhatsApp.
              </div>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600">
                <strong className="text-navy-950 block mb-0.5">GST &amp; Accounting Compliance</strong>
                Generating compliant GST tax invoices under the Ministry of Corporate Affairs and RBI guidelines.
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy-950 font-serif flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-navy-950 text-white text-xs flex items-center justify-center font-sans">3</span>
            Zero Telemarketing &amp; No Third-Party Sales
          </h2>
          <div className="p-4 bg-amber-50/70 border border-amber-200/70 rounded-2xl flex items-start gap-3">
            <Lock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 leading-relaxed">
              <strong>Our Sacred Trust:</strong> The TraveloPedia will <strong>NEVER sell, rent, monetize, or trade</strong> your personal contact phone numbers or passport details to third-party telemarketers, credit card issuers, or spam mailing brokers. Any communication you receive from us relates directly to your holiday quotation, confirmed voucher, or exclusive seasonal travel invitations from our Surat travel lounge.
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy-950 font-serif flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-navy-950 text-white text-xs flex items-center justify-center font-sans">4</span>
            Data Security &amp; Document Retention
          </h2>
          <p>
            We implement 256-bit SSL encryption across our web portals, restricted role-based internal file access, and secure workstation firewalls at our Surat office. Sensitive visa financial documents are permanently purged from active systems within 60 days following successful visa granting and travel completion.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy-950 font-serif flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-navy-950 text-white text-xs flex items-center justify-center font-sans">5</span>
            Contact Our Data Protection Officer
          </h2>
          <p className="text-xs text-slate-600">
            For questions regarding how your travel records are stored or to request a deletion of historical enquiry files:
          </p>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
            <p className="font-bold text-navy-950">The TraveloPedia Privacy Desk</p>
            <p className="text-slate-600">Address: {COMPANY_DETAILS.address}</p>
            <p className="text-slate-600">Direct Phone: {COMPANY_DETAILS.phone} | Email: {COMPANY_DETAILS.email}</p>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold">
          <Link href="/terms" className="text-brand-600 hover:text-brand-700 flex items-center gap-1">
            <span>Read Client Terms &amp; Conditions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link href="/" className="text-slate-500 hover:text-navy-950 flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>&larr; Back to Home</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
