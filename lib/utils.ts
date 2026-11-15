import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const COMPANY_DETAILS = {
  name: "The TraveloPedia",
  tagline: "Curated Luxury Holidays & Bespoke Journeys",
  phone: "+91 95129 35701",
  phoneRaw: "919512935701",
  email: "info@thetravelopedia.com",
  adminEmail: "admin@thetravelopedia.com",
  domain: "thetravelopedia.com",
  address: "7, E-Space, Near Khatu Shyam Baba Mandir, VIP Road, Vesu, Beside Domino's Pizza, Surat, Gujarat 395007",
  officeHours: "Mon - Sat: 10:00 AM - 8:00 PM | Sun: By Appointment",
  mapUrl: "https://maps.google.com/?q=VIP+Road+Vesu+Surat+Gujarat+395007"
};

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatIndianNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

/**
 * Creates WhatsApp inquiry URL with customized pre-filled message
 */
export function getWhatsAppInquiryUrl(packageName: string, duration: string): string {
  const message = `Hi, I am interested in ${packageName} (Duration: ${duration}). Please share details.`;
  return `https://wa.me/${COMPANY_DETAILS.phoneRaw}?text=${encodeURIComponent(message)}`;
}

/**
 * General WhatsApp inquiry URL
 */
export function getGeneralWhatsAppUrl(customMessage?: string): string {
  const message = customMessage || `Hi The TraveloPedia, I would like to plan my upcoming vacation. Please connect me with a holiday specialist.`;
  return `https://wa.me/${COMPANY_DETAILS.phoneRaw}?text=${encodeURIComponent(message)}`;
}

/**
 * Admin follow-up WhatsApp URL to chat with customer
 */
export function getAdminCustomerWhatsAppUrl(customerPhone: string, customerName: string, destinationOrPackage: string): string {
  // Strip non-numeric
  let cleanPhone = customerPhone.replace(/[^0-9]/g, '');
  if (cleanPhone.length === 10) {
    cleanPhone = '91' + cleanPhone;
  }
  const message = `Hi ${customerName}, greetings from The TraveloPedia (Surat)! Thank you for your inquiry regarding ${destinationOrPackage}. I am your dedicated travel consultant. May I share the detailed itinerary and customized quote with you?`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Helper to download array of objects as CSV in browser
 */
export function exportToCsv(filename: string, rows: object[]) {
  if (!rows || !rows.length) return;
  const separator = ',';
  const keys = Object.keys(rows[0]);
  const csvContent =
    keys.join(separator) +
    '\n' +
    rows
      .map(row => {
        return keys
          .map(k => {
            let cell = (row as any)[k] === null || (row as any)[k] === undefined ? '' : (row as any)[k];
            cell = cell instanceof Date ? cell.toLocaleString() : cell.toString();
            cell = cell.replace(/"/g, '""');
            if (cell.search(/("|,|\n)/g) >= 0) {
              cell = `"${cell}"`;
            }
            return cell;
          })
          .join(separator);
      })
      .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
