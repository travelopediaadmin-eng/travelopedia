import fs from 'fs';
import path from 'path';
import { TravelPackage, Destination, Enquiry, EnquiryStatus } from '@/types/travel';
import { INITIAL_PACKAGES, INITIAL_DESTINATIONS, INITIAL_ENQUIRIES } from '@/data/seed-data';

interface DatabaseSchema {
  packages: TravelPackage[];
  destinations: Destination[];
  enquiries: Enquiry[];
  bookings?: any[];
  payments?: any[];
  adminUser: {
    id: string;
    email: string;
    name: string;
    passwordHash: string; // Plaintext or hash for admin
    role: string;
  };
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'travelo-db.json');

// In-memory fallback if fs is constrained
let inMemoryDb: DatabaseSchema | null = null;

function getInitialDatabase(): DatabaseSchema {
  return {
    packages: INITIAL_PACKAGES,
    destinations: INITIAL_DESTINATIONS,
    enquiries: INITIAL_ENQUIRIES,
    adminUser: {
      id: 'admin-1',
      email: 'admin@thetravelopedia.com',
      name: 'The TraveloPedia Admin',
      passwordHash: 'admin123', // default demo password
      role: 'superadmin'
    }
  };
}

export function readDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DB_FILE)) {
      const initial = getInitialDatabase();
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      inMemoryDb = initial;
      return initial;
    }

    const content = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(content) as DatabaseSchema;
    inMemoryDb = parsed;
    return parsed;
  } catch (error) {
    console.error('Error reading database file, using memory fallback:', error);
    if (!inMemoryDb) {
      inMemoryDb = getInitialDatabase();
    }
    return inMemoryDb;
  }
}

export function writeDb(data: DatabaseSchema): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    inMemoryDb = data;
    return true;
  } catch (error) {
    console.error('Error writing to database file:', error);
    inMemoryDb = data;
    return false;
  }
}

// =================== PACKAGES ===================

export function getAllPackages(includeInactive = false): TravelPackage[] {
  const db = readDb();
  if (includeInactive) return db.packages;
  return db.packages.filter(p => p.active !== false);
}

export function getFeaturedPackages(): TravelPackage[] {
  const db = readDb();
  return db.packages.filter(p => p.featured && p.active !== false);
}

export function getPackageBySlug(slug: string): TravelPackage | null {
  const db = readDb();
  const pkg = db.packages.find(p => p.slug === slug);
  return pkg || null;
}

export function getPackageById(id: string): TravelPackage | null {
  const db = readDb();
  const pkg = db.packages.find(p => p.id === id);
  return pkg || null;
}

export function savePackage(packageData: Omit<TravelPackage, 'id' | 'createdAt'> & { id?: string }): TravelPackage {
  const db = readDb();
  
  if (packageData.id) {
    // Update existing
    const index = db.packages.findIndex(p => p.id === packageData.id);
    if (index !== -1) {
      const updated: TravelPackage = {
        ...db.packages[index],
        ...packageData,
        id: packageData.id,
        updatedAt: new Date().toISOString()
      };
      db.packages[index] = updated;
      writeDb(db);
      return updated;
    }
  }

  // Create new
  const newPackage: TravelPackage = {
    ...packageData,
    id: `pkg-${Date.now()}`,
    createdAt: new Date().toISOString()
  };

  db.packages.unshift(newPackage);
  writeDb(db);
  return newPackage;
}

export function updatePackage(id: string, updates: Partial<TravelPackage>): TravelPackage | null {
  const db = readDb();
  const index = db.packages.findIndex(p => p.id === id);
  if (index === -1) return null;

  const updated: TravelPackage = {
    ...db.packages[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  db.packages[index] = updated;
  writeDb(db);
  return updated;
}

export function deletePackage(id: string): boolean {
  const db = readDb();
  const initialLength = db.packages.length;
  db.packages = db.packages.filter(p => p.id !== id);
  if (db.packages.length !== initialLength) {
    writeDb(db);
    return true;
  }
  return false;
}

// =================== DESTINATIONS ===================

export function getAllDestinations(): Destination[] {
  const db = readDb();
  return db.destinations;
}

export function getDestinationBySlug(slug: string): Destination | null {
  const db = readDb();
  return db.destinations.find(d => d.slug === slug) || null;
}

export function saveDestination(destData: Omit<Destination, 'id'> & { id?: string }): Destination {
  const db = readDb();
  if (destData.id) {
    const idx = db.destinations.findIndex(d => d.id === destData.id);
    if (idx !== -1) {
      const updated = { ...db.destinations[idx], ...destData };
      db.destinations[idx] = updated;
      writeDb(db);
      return updated;
    }
  }

  const newDest: Destination = {
    ...destData,
    id: `dest-${Date.now()}`
  };
  db.destinations.push(newDest);
  writeDb(db);
  return newDest;
}

export function updateDestination(id: string, updates: Partial<Destination>): Destination | null {
  const db = readDb();
  const idx = db.destinations.findIndex(d => d.id === id);
  if (idx === -1) return null;
  const updated = { ...db.destinations[idx], ...updates };
  db.destinations[idx] = updated;
  writeDb(db);
  return updated;
}

export function deleteDestination(id: string): boolean {
  const db = readDb();
  const initialLen = db.destinations.length;
  db.destinations = db.destinations.filter(d => d.id !== id);
  if (db.destinations.length !== initialLen) {
    writeDb(db);
    return true;
  }
  return false;
}

// =================== ENQUIRIES ===================

export function getAllEnquiries(): Enquiry[] {
  const db = readDb();
  return db.enquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getEnquiryById(id: string): Enquiry | null {
  const db = readDb();
  return db.enquiries.find(e => e.id === id) || null;
}

export function createEnquiry(enquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'status'> & { status?: EnquiryStatus }): Enquiry {
  const db = readDb();
  const newEnquiry: Enquiry = {
    ...enquiryData,
    id: `enq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: enquiryData.status || 'New'
  };

  db.enquiries.unshift(newEnquiry);
  writeDb(db);
  return newEnquiry;
}

export function updateEnquiryStatus(id: string, status: EnquiryStatus, notes?: string): Enquiry | null {
  const db = readDb();
  const idx = db.enquiries.findIndex(e => e.id === id);
  if (idx === -1) return null;

  db.enquiries[idx].status = status;
  if (notes !== undefined) {
    db.enquiries[idx].notes = notes;
  }

  writeDb(db);
  return db.enquiries[idx];
}

export function deleteEnquiry(id: string): boolean {
  const db = readDb();
  const initialLen = db.enquiries.length;
  db.enquiries = db.enquiries.filter(e => e.id !== id);
  if (db.enquiries.length !== initialLen) {
    writeDb(db);
    return true;
  }
  return false;
}

// =================== STATS ===================

export function getDashboardStats() {
  const db = readDb();
  const today = new Date().toISOString().split('T')[0];

  const totalEnquiries = db.enquiries.length;
  const newToday = db.enquiries.filter(e => e.createdAt.startsWith(today) || e.status === 'New').length;
  const activePackages = db.packages.filter(p => p.active !== false).length;
  const confirmedBookings = db.enquiries.filter(e => e.status === 'Confirmed').length;

  const statusBreakdown = {
    New: db.enquiries.filter(e => e.status === 'New').length,
    Contacted: db.enquiries.filter(e => e.status === 'Contacted').length,
    ProposalSent: db.enquiries.filter(e => e.status === 'Proposal Sent').length,
    Confirmed: db.enquiries.filter(e => e.status === 'Confirmed').length,
    Cancelled: db.enquiries.filter(e => e.status === 'Cancelled').length
  };

  return {
    totalEnquiries,
    newToday,
    activePackages,
    confirmedBookings,
    statusBreakdown,
    recentEnquiries: db.enquiries.slice(0, 5)
  };
}

// =================== BOOKINGS & PAYMENTS ===================

export function recordBooking(booking: any) {
  const db = readDb();
  if (!db.bookings) db.bookings = [];
  db.bookings.unshift(booking);
  writeDb(db);
  return booking;
}

export function getAllBookings() {
  const db = readDb();
  return db.bookings || [];
}

export function getBookingByRef(ref: string) {
  const db = readDb();
  if (!db.bookings) return null;
  return db.bookings.find((b: any) => b.bookingRef === ref || b.bookingId === ref) || null;
}

export function recordPayment(payment: any) {
  const db = readDb();
  if (!db.payments) db.payments = [];
  db.payments.unshift(payment);
  writeDb(db);
  return payment;
}

