import { NextRequest, NextResponse } from 'next/server';
import { getClients, addClient } from '@/lib/airtable';

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, vertical, monthlyFee, reels, approvalSlaHours } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Client name is required' },
        { status: 400 }
      );
    }

    const created = await addClient({
      name,
      vertical: vertical || 'Commercial Hospitality',
      monthlyFee: Number(monthlyFee) || 50000,
      package: {
        reels: Number(reels) || 12,
        posts: 4,
        stories: 20,
        shoots: 1,
        adBudget: 25000,
      },
      approvalSlaHours: Number(approvalSlaHours) || 24,
    });

    return NextResponse.json({ success: true, client: created });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to add client' },
      { status: 500 }
    );
  }
}
