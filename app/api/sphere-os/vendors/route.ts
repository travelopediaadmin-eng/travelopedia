import { NextRequest, NextResponse } from 'next/server';
import { getVendorDeliverables, recordVendorIngest } from '@/lib/airtable';

export async function GET() {
  try {
    const vendors = await getVendorDeliverables();
    return NextResponse.json({ success: true, vendors });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch vendor deliverables' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vendorId, itemsDelivered, itemsAccepted } = body;

    if (!vendorId) {
      return NextResponse.json(
        { success: false, error: 'vendorId is required' },
        { status: 400 }
      );
    }

    const success = await recordVendorIngest({
      vendorId,
      itemsDelivered: Number(itemsDelivered || 1),
      itemsAccepted: Number(itemsAccepted || 1),
    });
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to record vendor ingest' },
      { status: 500 }
    );
  }
}
