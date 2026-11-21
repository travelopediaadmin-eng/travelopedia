import { NextResponse } from 'next/server';
import { getClients } from '@/lib/airtable';

export async function GET() {
  try {
    const clients = await getClients();
    return NextResponse.json({ success: true, clients });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}
