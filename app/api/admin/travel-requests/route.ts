import { NextResponse } from 'next/server';
import { getAllTravelRequests } from '@/lib/travel-requests';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { adminNotificationEmail } from '@/lib/email/service';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const verification = searchParams.get('verification'); // 'verified', 'pending'
    const search = searchParams.get('search')?.toLowerCase().trim();

    let requests = await getAllTravelRequests();

    if (status && status !== 'All') {
      requests = requests.filter(r => r.status === status);
    }

    if (verification === 'verified') {
      requests = requests.filter(r => r.email_verified);
    } else if (verification === 'pending') {
      requests = requests.filter(r => !r.email_verified);
    }

    if (search) {
      requests = requests.filter(
        r =>
          r.request_number.toLowerCase().includes(search) ||
          r.customer_name.toLowerCase().includes(search) ||
          r.customer_email.toLowerCase().includes(search) ||
          r.customer_mobile.toLowerCase().includes(search) ||
          r.destination.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({
      requests,
      adminNotificationEmail,
      totalCount: requests.length,
      verifiedCount: requests.filter(r => r.email_verified).length,
      pendingCount: requests.filter(r => !r.email_verified).length,
    });
  } catch (err: any) {
    console.error('[Admin Travel Requests API] Error fetching:', err);
    return NextResponse.json({ error: 'Failed to fetch travel requests' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, assigned_to } = body;

    if (!id) {
      return NextResponse.json({ error: 'Request ID is required' }, { status: 400 });
    }

    const now = new Date().toISOString();

    if (supabaseAdmin) {
      const updatePayload: any = { updated_at: now };
      if (status) updatePayload.status = status;
      if (assigned_to !== undefined) updatePayload.assigned_to = assigned_to;

      const { data, error } = await supabaseAdmin
        .from('travel_requests')
        .update(updatePayload)
        .eq('id', id)
        .select('*')
        .single();

      if (!error && data) {
        return NextResponse.json({ success: true, request: data });
      }
    }

    // Local fallback update
    const all = await getAllTravelRequests();
    const found = all.find(r => r.id === id);
    if (!found) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    if (status) found.status = status;
    if (assigned_to !== undefined) found.assigned_to = assigned_to;
    found.updated_at = now;

    return NextResponse.json({ success: true, request: found });
  } catch (err: any) {
    console.error('[Admin Travel Requests API] Error updating:', err);
    return NextResponse.json({ error: 'Failed to update request' }, { status: 500 });
  }
}
