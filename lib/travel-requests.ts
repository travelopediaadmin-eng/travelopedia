import { supabaseAdmin, isSupabaseAdminConfigured } from '@/lib/supabase/admin';
import { TravelRequest, TravelRequestSubmissionInput } from '@/types/supabase';
import fs from 'fs';
import path from 'path';

const LOCAL_DB_PATH = path.join(process.cwd(), 'data', 'travel-requests-local.json');

function ensureLocalDb(): TravelRequest[] {
  try {
    const dir = path.dirname(LOCAL_DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(LOCAL_DB_PATH)) {
      fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const data = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
    return JSON.parse(data) as TravelRequest[];
  } catch (err) {
    console.error('[Travel Requests] Error reading local store:', err);
    return [];
  }
}

function writeLocalDb(requests: TravelRequest[]) {
  try {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(requests, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Travel Requests] Error writing local store:', err);
  }
}

function generateLocalRequestNumber(requests: TravelRequest[]): string {
  const year = new Date().getFullYear();
  const count = requests.length + 1001;
  return `TRV-${year}-${String(count).padStart(4, '0')}`;
}

export async function createTravelRequest(
  input: TravelRequestSubmissionInput
): Promise<{ request: TravelRequest; isDuplicate: boolean }> {
  const now = new Date().toISOString();

  // Try Supabase first if configured
  if (supabaseAdmin) {
    try {
      // Check for recent duplicate submission within 10 minutes for same email + destination
      const tenMinsAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
      const { data: existing } = await supabaseAdmin
        .from('travel_requests')
        .select('*')
        .eq('customer_email', input.customer_email.toLowerCase().trim())
        .eq('destination', input.destination.trim())
        .gte('created_at', tenMinsAgo)
        .order('created_at', { ascending: false })
        .limit(1);

      if (existing && existing.length > 0) {
        return { request: existing[0] as TravelRequest, isDuplicate: true };
      }

      // Generate request_number
      const year = new Date().getFullYear();
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const requestNumber = `TRV-${year}-${randomSuffix}`;

      const { data, error } = await supabaseAdmin
        .from('travel_requests')
        .insert({
          request_number: requestNumber,
          customer_name: input.customer_name.trim(),
          customer_email: input.customer_email.toLowerCase().trim(),
          customer_mobile: input.customer_mobile.trim(),
          destination: input.destination.trim(),
          travel_start_date: input.travel_start_date,
          travel_return_date: input.travel_return_date || null,
          travellers_count: Number(input.travellers_count) || 2,
          budget: input.budget || 'Bespoke / Discuss on Call',
          requirements: input.requirements || '',
          email_verified: false,
          status: 'pending_verification',
          admin_notified: false,
          notification_status: 'pending',
          source: input.source || 'Website Enquiry',
        })
        .select('*')
        .single();

      if (error) throw error;
      return { request: data as TravelRequest, isDuplicate: false };
    } catch (err: any) {
      console.warn('[Travel Requests] Supabase insert failed, using fallback storage:', err.message);
    }
  }

  // Local fallback storage
  const requests = ensureLocalDb();
  const existing = requests.find(
    r =>
      r.customer_email.toLowerCase() === input.customer_email.toLowerCase().trim() &&
      r.destination.toLowerCase() === input.destination.toLowerCase().trim() &&
      Date.now() - new Date(r.created_at).getTime() < 10 * 60 * 1000
  );

  if (existing) {
    return { request: existing, isDuplicate: true };
  }

  const newRequest: TravelRequest = {
    id: `req-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
    request_number: generateLocalRequestNumber(requests),
    customer_id: null,
    customer_name: input.customer_name.trim(),
    customer_email: input.customer_email.toLowerCase().trim(),
    customer_mobile: input.customer_mobile.trim(),
    destination: input.destination.trim(),
    travel_start_date: input.travel_start_date,
    travel_return_date: input.travel_return_date || null,
    travellers_count: Number(input.travellers_count) || 2,
    budget: input.budget || 'Bespoke / Discuss on Call',
    requirements: input.requirements || '',
    email_verified: false,
    status: 'pending_verification',
    assigned_to: null,
    admin_notified: false,
    notification_status: 'pending',
    notification_error: null,
    notification_sent_at: null,
    source: input.source || 'Website Enquiry',
    created_at: now,
    updated_at: now,
  };

  requests.unshift(newRequest);
  writeLocalDb(requests);
  return { request: newRequest, isDuplicate: false };
}

export async function getTravelRequestById(id: string): Promise<TravelRequest | null> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('travel_requests')
        .select('*')
        .eq('id', id)
        .single();
      if (!error && data) return data as TravelRequest;
    } catch (err) {
      console.warn('[Travel Requests] Supabase fetch by ID failed:', err);
    }
  }

  const requests = ensureLocalDb();
  return requests.find(r => r.id === id) || null;
}

export async function markTravelRequestVerified(
  id: string,
  customerId?: string
): Promise<TravelRequest | null> {
  const now = new Date().toISOString();

  if (supabaseAdmin) {
    try {
      const updateData: any = {
        email_verified: true,
        status: 'new',
        updated_at: now,
      };
      if (customerId) updateData.customer_id = customerId;

      const { data, error } = await supabaseAdmin
        .from('travel_requests')
        .update(updateData)
        .eq('id', id)
        .select('*')
        .single();

      if (!error && data) return data as TravelRequest;
    } catch (err) {
      console.warn('[Travel Requests] Supabase verify update failed:', err);
    }
  }

  const requests = ensureLocalDb();
  const idx = requests.findIndex(r => r.id === id);
  if (idx !== -1) {
    requests[idx].email_verified = true;
    requests[idx].status = 'new';
    if (customerId) requests[idx].customer_id = customerId;
    requests[idx].updated_at = now;
    writeLocalDb(requests);
    return requests[idx];
  }

  return null;
}

export async function updateTravelRequestEmail(
  id: string,
  newEmail: string
): Promise<TravelRequest | null> {
  const now = new Date().toISOString();
  const cleanEmail = newEmail.toLowerCase().trim();

  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('travel_requests')
        .update({ customer_email: cleanEmail, updated_at: now })
        .eq('id', id)
        .select('*')
        .single();
      if (!error && data) return data as TravelRequest;
    } catch (err) {
      console.warn('[Travel Requests] Supabase email update failed:', err);
    }
  }

  const requests = ensureLocalDb();
  const idx = requests.findIndex(r => r.id === id);
  if (idx !== -1) {
    requests[idx].customer_email = cleanEmail;
    requests[idx].updated_at = now;
    writeLocalDb(requests);
    return requests[idx];
  }

  return null;
}

export async function getAllTravelRequests(): Promise<TravelRequest[]> {
  if (supabaseAdmin) {
    try {
      const { data, error } = await supabaseAdmin
        .from('travel_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) return data as TravelRequest[];
    } catch (err) {
      console.warn('[Travel Requests] Supabase list failed:', err);
    }
  }

  return ensureLocalDb();
}
