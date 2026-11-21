import { NextRequest, NextResponse } from 'next/server';
import { getDecisions, resolveDecision } from '@/lib/airtable';

export async function GET() {
  try {
    const decisions = await getDecisions();
    return NextResponse.json({ success: true, decisions });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch decisions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { decisionId, action } = body;

    if (!decisionId || !action) {
      return NextResponse.json(
        { success: false, error: 'decisionId and action are required' },
        { status: 400 }
      );
    }

    const success = await resolveDecision(decisionId, action);
    return NextResponse.json({ success, message: `Action ${action} resolved` });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to resolve decision' },
      { status: 500 }
    );
  }
}
