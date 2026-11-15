import { NextRequest, NextResponse } from 'next/server';
import { recordBooking, recordPayment, getAllBookings } from '@/lib/db';

export async function GET() {
  const bookings = getAllBookings();
  return NextResponse.json({ success: true, count: bookings.length, bookings });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      customerName, 
      phone, 
      email, 
      serviceType = 'PACKAGE', 
      totalAmount = 0, 
      advanceAmount = 0, 
      paymentMethod = 'UPI',
      packageTitle = 'Custom Luxury Tour',
      travelDates = 'Dec 2026'
    } = body;

    if (!customerName || !phone) {
      return NextResponse.json({ error: 'Customer name and phone are required.' }, { status: 400 });
    }

    const bookingRef = body.bookingRef || `TRV-2026-${Math.floor(100 + Math.random() * 900)}`;
    const transactionId = `TXN-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
    const paidAmount = advanceAmount || totalAmount || 25000;

    const paymentRecord = {
      id: `pay-${Date.now()}`,
      transactionId,
      bookingRef,
      customerName,
      phone,
      email,
      amount: paidAmount,
      currency: 'INR',
      method: paymentMethod,
      status: 'SUCCESS',
      createdAt: new Date().toISOString()
    };

    const bookingRecord = {
      bookingId: bookingRef,
      bookingRef,
      leadName: customerName,
      phone,
      email,
      packageTitle,
      serviceType,
      destination: body.destination || 'International / Domestic',
      country: body.country || 'Global',
      travelDates,
      duration: body.duration || '6 Nights / 7 Days',
      travelers: body.travelers || '2 Adults',
      tokenPaid: paidAmount,
      totalAmount: totalAmount || paidAmount * 4,
      paymentStatus: 'Token Confirmed',
      visaStatus: 'Approved & Issued',
      visaStage: 4,
      pnr: `EK-${Math.floor(100000 + Math.random() * 900000)}`,
      conciergeName: 'Ronak Shah (The Travelopedia VIP Road)',
      conciergePhone: '+91 95129 35701',
      createdAt: new Date().toISOString()
    };

    recordPayment(paymentRecord);
    recordBooking(bookingRecord);

    return NextResponse.json({
      success: true,
      bookingRef,
      transactionId,
      status: 'CONFIRMED',
      paymentRecord,
      bookingRecord,
      portalUrl: `/portal?ref=${bookingRef}`
    });
  } catch (error) {
    console.error('Payment simulation error:', error);
    return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 });
  }
}
