import { NextResponse } from 'next/server';
import { getEnquiryById, updateEnquiryStatus, deleteEnquiry } from '@/lib/db';
import { EnquiryStatus } from '@/types/travel';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const enquiry = getEnquiryById(params.id);
  if (!enquiry) {
    return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
  }
  return NextResponse.json({ enquiry });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status, notes } = body;

    const validStatuses: EnquiryStatus[] = ['New', 'Contacted', 'Proposal Sent', 'Confirmed', 'Cancelled'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const updated = updateEnquiryStatus(params.id, status, notes);
    if (!updated) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error) {
    console.error('Failed to update enquiry:', error);
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const deleted = deleteEnquiry(params.id);
  if (!deleted) {
    return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: 'Enquiry deleted' });
}
