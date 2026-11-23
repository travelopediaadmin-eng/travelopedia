import { NextResponse } from 'next/server';
import { getTravelRequestById } from '@/lib/travel-requests';
import { generateVerificationToken } from '@/lib/tokens';
import { sendCustomerVerificationEmail } from '@/lib/email/service';
import { supabaseAdmin } from '@/lib/supabase/admin';

const resendCooldownMap = new Map<string, number>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { request_id } = body;

    if (!request_id) {
      return NextResponse.json({ error: 'Request ID is required' }, { status: 400 });
    }

    const travelRequest = await getTravelRequestById(request_id);
    if (!travelRequest) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    if (travelRequest.email_verified) {
      return NextResponse.json({
        success: true,
        alreadyVerified: true,
        message: 'This email is already verified.',
      });
    }

    // Cooldown check (60 seconds)
    const now = Date.now();
    const lastSent = resendCooldownMap.get(request_id) || 0;
    const cooldownMs = 60 * 1000;
    const remainingSeconds = Math.ceil((lastSent + cooldownMs - now) / 1000);

    if (now < lastSent + cooldownMs) {
      return NextResponse.json(
        {
          error: `Please wait ${remainingSeconds} second(s) before requesting another email.`,
          cooldownRemaining: remainingSeconds,
        },
        { status: 429 }
      );
    }

    resendCooldownMap.set(request_id, now);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    let verificationUrl = '';

    if (supabaseAdmin) {
      try {
        const { data: linkData, error: linkErr } = await supabaseAdmin.auth.admin.generateLink({
          type: 'signup',
          email: travelRequest.customer_email,
          password: `Travelopedia_${Math.random().toString(36).slice(2, 10)}!`,
          options: {
            redirectTo: `${appUrl}/verify-email?request_id=${travelRequest.id}`,
          },
        });
        if (!linkErr && linkData?.properties?.action_link) {
          verificationUrl = linkData.properties.action_link;
        }
      } catch (authErr) {
        console.warn('[Resend Route] Supabase link generation error:', authErr);
      }
    }

    if (!verificationUrl) {
      const token = generateVerificationToken(travelRequest.id, travelRequest.customer_email);
      verificationUrl = `${appUrl}/verify-email?request_id=${travelRequest.id}&token=${token}&email=${encodeURIComponent(travelRequest.customer_email)}`;
    }

    await sendCustomerVerificationEmail({
      email: travelRequest.customer_email,
      customerName: travelRequest.customer_name,
      destination: travelRequest.destination,
      verificationUrl,
    });

    return NextResponse.json({
      success: true,
      message: `Verification link resent to ${travelRequest.customer_email}.`,
      cooldownSeconds: 60,
    });

  } catch (error: any) {
    console.error('[Resend Route] Error resending verification:', error);
    return NextResponse.json(
      { error: 'Failed to resend verification email. Please try again shortly.' },
      { status: 500 }
    );
  }
}
