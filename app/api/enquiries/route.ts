import { NextResponse } from 'next/server';
import { getAllEnquiries, createEnquiry } from '@/lib/db';
import { EnquiryStatus } from '@/types/travel';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as EnquiryStatus | null;
    const search = searchParams.get('search')?.toLowerCase();

    let enquiries = getAllEnquiries();

    if (status && status !== ('All' as any)) {
      enquiries = enquiries.filter(e => e.status === status);
    }

    if (search) {
      enquiries = enquiries.filter(e => 
        e.customerName.toLowerCase().includes(search) ||
        e.phone.toLowerCase().includes(search) ||
        e.destination.toLowerCase().includes(search) ||
        (e.packageTitle && e.packageTitle.toLowerCase().includes(search)) ||
        e.email.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ enquiries });
  } catch (error) {
    console.error('Failed to get enquiries:', error);
    return NextResponse.json({ error: 'Failed to retrieve enquiries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.customerName || !body.phone || !body.destination) {
      return NextResponse.json(
        { error: 'Customer name, phone, and destination are required' },
        { status: 400 }
      );
    }

    const newEnquiry = createEnquiry({
      customerName: body.customerName,
      phone: body.phone,
      email: body.email || '',
      packageId: body.packageId,
      packageTitle: body.packageTitle,
      destination: body.destination,
      travelDate: body.travelDate || 'Flexible',
      durationDays: body.durationDays || '5-7 Days',
      adults: Number(body.adults) || 2,
      children: Number(body.children) || 0,
      hotelCategory: body.hotelCategory || '4-Star',
      estimatedBudget: body.estimatedBudget || 'Flexible',
      specialRequests: body.specialRequests || '',
      source: body.source || 'Custom Tour',
      notes: body.notes || ''
    });

    return NextResponse.json({
      success: true,
      enquiry: newEnquiry,
      message: 'Enquiry submitted successfully'
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create enquiry:', error);
    return NextResponse.json({ error: 'Failed to submit enquiry' }, { status: 500 });
  }
}
