import { NextRequest, NextResponse } from 'next/server';
import { getContentItems, updateContentApproval } from '@/lib/airtable';

export async function GET() {
  try {
    const content = await getContentItems();
    return NextResponse.json({ success: true, content });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { contentId, approvalStatus, feedback } = body;

    if (!contentId || !approvalStatus) {
      return NextResponse.json(
        { success: false, error: 'contentId and approvalStatus are required' },
        { status: 400 }
      );
    }

    const success = await updateContentApproval(contentId, approvalStatus, feedback);
    return NextResponse.json({ success });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update approval' },
      { status: 500 }
    );
  }
}
