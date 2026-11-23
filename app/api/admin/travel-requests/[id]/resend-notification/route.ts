import { NextResponse } from 'next/server';
import { getTravelRequestById } from '@/lib/travel-requests';
import { sendAdminTravelRequestNotification } from '@/lib/email/service';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const travelRequest = await getTravelRequestById(id);

    if (!travelRequest) {
      return NextResponse.json({ error: 'Travel request not found' }, { status: 404 });
    }

    // Force send even if previously attempted
    const forcedRequest = { ...travelRequest, admin_notified: false };
    const result = await sendAdminTravelRequestNotification(forcedRequest);

    return NextResponse.json({
      success: result.success,
      provider: result.provider,
      error: result.error,
      message: result.success
        ? 'Admin notification sent successfully'
        : `Email delivery issue: ${result.error}`,
    });
  } catch (err: any) {
    console.error('[Resend Admin Notification API] Error:', err);
    return NextResponse.json({ error: 'Failed to send admin notification' }, { status: 500 });
  }
}
