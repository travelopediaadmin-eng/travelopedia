import { NextResponse } from 'next/server';
import { getTravelRequestById, updateTravelRequestEmail } from '@/lib/travel-requests';
import { generateVerificationToken } from '@/lib/tokens';
import { sendCustomerVerificationEmail } from '@/lib/email/service';
import { supabaseAdmin } from '@/lib/supabase/admin';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { request_id, new_email } = body;

    if (!request_id || !new_email) {
      return NextResponse.json({ error: 'Request ID and new email are required' }, { status: 400 });
    }

    const cleanEmail = new_email.toLowerCase().trim();
    if (!EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const travelRequest = await getTravelRequestById(request_id);
    if (!travelRequest) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    if (travelRequest.email_verified) {
      return NextResponse.json({ error: 'Cannot change email for an already verified request.' }, { status: 400 });
    }

    const updated = await updateTravelRequestEmail(request_id, cleanEmail);
    if (!updated) {
      return NextResponse.json({ error: 'Failed to update email' }, { status: 500 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    let verificationUrl = '';

    if (supabaseAdmin) {
      try {
        const { data: linkData, error: linkErr } = await supabaseAdmin.auth.admin.generateLink({
          type: 'signup',
          email: cleanEmail,
          password: `Travelopedia_${Math.random().toString(36).slice(2, 10)}!`,
          options: {
            redirectTo: `${appUrl}/verify-email?request_id=${updated.id}`,
          },
        });
        if (!linkErr && linkData?.properties?.action_link) {
          verificationUrl = linkData.properties.action_link;
        }
      } catch (authErr) {
        console.warn('[Change Email Route] Supabase link generation error:', authErr);
      }
    }

    if (!verificationUrl) {
      const token = generateVerificationToken(updated.id, cleanEmail);
      verificationUrl = `${appUrl}/verify-email?request_id=${updated.id}&token=${token}&email=${encodeURIComponent(cleanEmail)}`;
    }

    await sendCustomerVerificationEmail({
      email: cleanEmail,
      customerName: updated.customer_name,
      destination: updated.destination,
      verificationUrl,
    });

    return NextResponse.json({
      success: true,
      newEmail: cleanEmail,
      message: `Email updated to ${cleanEmail}. Verification link has been sent.`,
    });

  } catch (error: any) {
    console.error('[Change Email Route] Error changing email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
