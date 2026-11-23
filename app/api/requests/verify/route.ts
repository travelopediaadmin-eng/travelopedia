import { NextResponse } from 'next/server';
import { getTravelRequestById, markTravelRequestVerified } from '@/lib/travel-requests';
import { verifyVerificationToken } from '@/lib/tokens';
import { sendAdminTravelRequestNotification } from '@/lib/email/service';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { createEnquiry } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { request_id, token, supabase_token_hash, supabase_type } = body;

    if (!request_id) {
      return NextResponse.json({ error: 'Missing request ID' }, { status: 400 });
    }

    const travelRequest = await getTravelRequestById(request_id);
    if (!travelRequest) {
      return NextResponse.json({ error: 'Travel request not found or expired.' }, { status: 404 });
    }

    // If already verified, return idempotent success
    if (travelRequest.email_verified && travelRequest.status !== 'pending_verification') {
      // Ensure admin was notified
      if (!travelRequest.admin_notified) {
        await sendAdminTravelRequestNotification(travelRequest);
      }
      return NextResponse.json({
        success: true,
        alreadyVerified: true,
        request: travelRequest,
        message: 'Email was already verified.',
      });
    }

    let isVerified = false;
    let customerUserId: string | undefined = undefined;

    // 1. Verify via Supabase Auth OTP/token_hash if provided
    if (supabase_token_hash && supabaseAdmin) {
      try {
        const { data, error } = await supabaseAdmin.auth.verifyOtp({
          token_hash: supabase_token_hash,
          type: (supabase_type as any) || 'signup',
        });

        if (!error && data?.user) {
          isVerified = true;
          customerUserId = data.user.id;
        }
      } catch (authErr) {
        console.warn('[Verify Route] Supabase verifyOtp error:', authErr);
      }
    }

    // 2. Verify via signed verification token
    if (!isVerified && token) {
      const tokenResult = verifyVerificationToken(token);
      if (!tokenResult.valid) {
        if (tokenResult.expired) {
          return NextResponse.json(
            { error: 'Verification link has expired. Please request a new one.', expired: true },
            { status: 410 }
          );
        }
        return NextResponse.json(
          { error: tokenResult.error || 'Invalid verification link.' },
          { status: 400 }
        );
      }

      if (tokenResult.requestId === request_id) {
        isVerified = true;
      }
    }

    if (!isVerified) {
      return NextResponse.json(
        { error: 'Verification failed. Please check your link or request a new verification email.' },
        { status: 400 }
      );
    }

    // 3. Mark travel request as verified & status: 'new'
    const updatedRequest = await markTravelRequestVerified(request_id, customerUserId);
    if (!updatedRequest) {
      return NextResponse.json({ error: 'Failed to update request status.' }, { status: 500 });
    }

    // 4. Send Admin Notification Email (Idempotent)
    const emailResult = await sendAdminTravelRequestNotification(updatedRequest);

    // 5. Sync to legacy enquiries store so existing admin views also display it
    try {
      createEnquiry({
        customerName: updatedRequest.customer_name,
        phone: updatedRequest.customer_mobile,
        email: updatedRequest.customer_email,
        destination: updatedRequest.destination,
        packageTitle: `Travel Request (${updatedRequest.request_number})`,
        travelDate: updatedRequest.travel_start_date,
        durationDays: updatedRequest.travel_return_date ? `${updatedRequest.travel_start_date} to ${updatedRequest.travel_return_date}` : 'Custom',
        adults: updatedRequest.travellers_count,
        children: 0,
        hotelCategory: 'Luxury',
        estimatedBudget: updatedRequest.budget || 'Bespoke',
        specialRequests: updatedRequest.requirements || '',
        source: (updatedRequest.source as any) || 'Custom Tour',
        notes: `Verified via Supabase Auth. Request ID: ${updatedRequest.request_number}`,
        status: 'New'
      });
    } catch (syncErr) {
      console.warn('[Verify Route] Legacy enquiries sync note:', syncErr);
    }

    return NextResponse.json({
      success: true,
      request: updatedRequest,
      adminNotified: emailResult.success,
      message: 'Email verified successfully. Your luxury travel request is accepted.',
    });

  } catch (error: any) {
    console.error('[Verify Route] Error during verification:', error);
    return NextResponse.json(
      { error: 'Internal server error while verifying email. Please try again.' },
      { status: 500 }
    );
  }
}
