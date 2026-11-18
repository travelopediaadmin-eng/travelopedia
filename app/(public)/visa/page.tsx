'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  FileText, 
  PhoneCall, 
  Search,
  ExternalLink,
  Download,
  AlertCircle 
} from 'lucide-react';
import { SAMPLE_VISAS } from '@/data/travel-services-data';
import { VisaRequirement } from '@/types/travel';
import { useCurrency } from '@/context/CurrencyContext';

export default function VisaPage() {
  const { formatPrice } = useCurrency();

  const [selectedCountry, setSelectedCountry] = useState(SAMPLE_VISAS[0].id);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [dossierRef, setDossierRef] = useState('');

  const currentVisa = SAMPLE_VISAS.find((v) => v.id === selectedCountry) || SAMPLE_VISAS[0];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `TRV-VISA-${Math.floor(1000 + Math.random() * 9000)}`;
    setDossierRef(ref);
    setApplicationSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
          <Link href="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 font-semibold">Visa &amp; Immigration Assistance</span>
        </div>

        {/* Hero Header */}
        <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-navy-900 mb-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-bold text-amber-400 tracking-widest block mb-1">
              Surat Flagship Visa Desk • VIP Road, Vesu
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
              Fast-Track Visa Filing &amp; Document Verification
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We handle end-to-end dossier preparation, VFS appointment scheduling, confirmed flight/hotel vouchers, and biometric guidance with a 99% track record.
            </p>
          </div>
        </div>

        {/* Country Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
          {SAMPLE_VISAS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => { setSelectedCountry(v.id); setApplicationSubmitted(false); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCountry === v.id
                  ? 'bg-navy-950 text-white shadow-lg'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span className="text-base">{v.flag}</span>
              <span>{v.country}</span>
            </button>
          ))}
        </div>

        {/* Visa Detail & Checklist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Country Details & Checklist */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Overview Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-100 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{currentVisa.flag}</span>
                    <h2 className="text-xl font-bold font-serif text-slate-900">{currentVisa.country}</h2>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{currentVisa.visaType}</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 block">Approval Rate</span>
                  <span className="text-xl font-black text-emerald-700 font-serif">
                    {currentVisa.approvalRatePercentage}%
                  </span>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
                <div>
                  <span className="text-slate-400 block mb-0.5">Processing Time</span>
                  <span className="font-bold text-slate-800">{currentVisa.processingTimeDays}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Stay Validity</span>
                  <span className="font-bold text-slate-800">{currentVisa.validity}</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Embassy Fee</span>
                  <span className="font-bold text-slate-800">As per Consulate</span>
                </div>
                <div>
                  <span className="text-slate-400 block mb-0.5">Assistance Fee</span>
                  <span className="font-bold text-brand-600">Discuss on Call</span>
                </div>
              </div>

              {/* Document Checklist */}
              <div>
                <h3 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-500" />
                  Mandatory Document Checklist for Indian Passport Holders
                </h3>

                <div className="space-y-2.5">
                  {currentVisa.checklist.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-700 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* 4-Stage Process Guarantee */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
              <h3 className="font-bold text-sm text-slate-900 mb-4 font-serif">
                How The Travelopedia Handles Your Visa
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-brand-50/50 border border-brand-100">
                  <span className="w-6 h-6 rounded-full bg-brand-500 text-white font-bold text-xs flex items-center justify-center mb-2">1</span>
                  <strong className="block text-slate-900 mb-1">Doc Scrutiny</strong>
                  <span className="text-slate-500 text-[11px]">Bank statements &amp; ITR audited on VIP Road.</span>
                </div>

                <div className="p-4 rounded-2xl bg-brand-50/50 border border-brand-100">
                  <span className="w-6 h-6 rounded-full bg-brand-500 text-white font-bold text-xs flex items-center justify-center mb-2">2</span>
                  <strong className="block text-slate-900 mb-1">Dossier Filing</strong>
                  <span className="text-slate-500 text-[11px]">Confirmed flight PNR &amp; 5-star hotel vouchers attached.</span>
                </div>

                <div className="p-4 rounded-2xl bg-brand-50/50 border border-brand-100">
                  <span className="w-6 h-6 rounded-full bg-brand-500 text-white font-bold text-xs flex items-center justify-center mb-2">3</span>
                  <strong className="block text-slate-900 mb-1">Biometrics Slot</strong>
                  <span className="text-slate-500 text-[11px]">Expedited VFS Global / Consulate appointment booked.</span>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-2">4</span>
                  <strong className="block text-emerald-950 mb-1">Stamped Visa</strong>
                  <span className="text-emerald-700 text-[11px]">Passport collected &amp; hand-delivered to your address.</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Col: Instant Application Card */}
          <div>
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md sticky top-32">
              
              {!applicationSubmitted ? (
                <form onSubmit={handleApply}>
                  <span className="text-[10px] uppercase font-bold text-brand-600 tracking-wider block mb-1">
                    Free Initial Consultation
                  </span>
                  <h3 className="text-lg font-serif font-bold text-slate-900 mb-4">
                    Submit Visa Application Dossier
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Applicant Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ketan Vashi"
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">WhatsApp Mobile</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98251 XXXXX"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="ketan@example.com"
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Passport Number (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Z5928192"
                        value={passportNumber}
                        onChange={(e) => setPassportNumber(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-brand-500 uppercase"
                      />
                    </div>

                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-500">Documentation &amp; Filing:</span>
                        <span className="font-bold text-navy-950 font-serif">Discuss on Call</span>
                      </div>
                      <span className="text-[10px] text-slate-400 block leading-tight">
                        Embassy &amp; biometrics fees verified based on nationality &amp; visa type.
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-brand-500/25 transition-transform active:scale-95"
                  >
                    Initiate Visa File &rarr;
                  </button>
                </form>
              ) : (
                <div className="text-center py-4">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-slate-900 mb-1">Visa File Initiated!</h3>
                  <p className="text-xs text-slate-500 mb-4">
                    Your file for {currentVisa.country} has been logged under reference {dossierRef}.
                  </p>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs mb-6 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Dossier Code:</span>
                      <span className="font-mono font-bold text-brand-600">{dossierRef}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Applicant:</span>
                      <span className="font-semibold text-slate-800">{applicantName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Stage:</span>
                      <span className="font-bold text-emerald-700">Stage 1: Document Verification</span>
                    </div>
                  </div>

                  <Link
                    href={`/portal?ref=${dossierRef}`}
                    className="w-full py-3 rounded-full bg-navy-950 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg mb-2"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Track Live in Portal &rarr;</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setApplicationSubmitted(false)}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    Submit another passport
                  </button>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-slate-100 text-center text-xs text-slate-400">
                <span>Direct Visa Hotline: </span>
                <a href="tel:+919512935701" className="font-bold text-brand-600 hover:underline">
                  +91 95129 35701
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
