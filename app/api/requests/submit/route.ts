import { NextResponse } from 'next/server';
import { createTravelRequest } from '@/lib/travel-requests';
import { generateVerificationToken } from '@/lib/tokens';
import { sendCustomerVerificationEmail } from '@/lib/email/service';
import { supabaseAdmin } from '@/lib/supabase/admin';

// Simple in-memory rate limiting map for submissions (IP or Email -> count, resetTime)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count += 1;
  return true;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[0-9+\s\-()]{10,20}$/;

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'local';
    // Max 10 submissions per IP per 10 minutes
    if (!checkRateLimit(`submit-ip-${ip}`, 10, 10 * 60 * 1000)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please wait a few minutes before trying again.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // 1. Validate required fields
    const customer_name = (body.customer_name || body.customerName || '').trim();
    const customer_email = (body.customer_email || body.email || '').trim().toLowerCase();
    const customer_mobile = (body.customer_mobile || body.phone || '').trim();
    const destination = (body.destination || '').trim();
    const travel_start_date = (body.travel_start_date || body.travelDate || '').trim();
    const travel_return_date = (body.travel_return_date || body.returnDate || '').trim();
    const travellers_count = Number(body.travellers_count || body.adults || 2);
    const budget = (body.budget || body.estimatedBudget || body.budgetPerPerson || 'Flexible').trim();
    const requirements = (body.requirements || body.specialRequests || '').trim();
    const source = (body.source || 'Website Enquiry').trim();

    if (!customer_name || customer_name.length < 2) {
      return NextResponse.json({ error: 'Please enter your full name (minimum 2 characters).' }, { status: 400 });
    }

    if (!customer_email || !EMAIL_REGEX.test(customer_email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!customer_mobile || !PHONE_REGEX.test(customer_mobile)) {
      return NextResponse.json({ error: 'Please enter a valid mobile number (minimum 10 digits).' }, { status: 400 });
    }

    if (!destination) {
      return NextResponse.json({ error: 'Please select or specify your travel destination.' }, { status: 400 });
    }

    if (!travel_start_date) {
      return NextResponse.json({ error: 'Please specify your tentative travel date.' }, { status: 400 });
    }

    // 2. Create the travel request in database (with pending_verification status)
    const { request: travelRequest, isDuplicate } = await createTravelRequest({
      customer_name,
      customer_email,
      customer_mobile,
      destination,
      travel_start_date,
      travel_return_date,
      travellers_count,
      budget,
      requirements,
      source,
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // 3. Generate verification link
    let verificationUrl = '';

    // If Supabase Auth is active, register or generate Supabase confirmation link
    if (supabaseAdmin) {
      try {
        const { data: linkData, error: linkErr } = await supabaseAdmin.auth.admin.generateLink({
          type: 'signup',
          email: customer_email,
          password: `Travelopedia_${Math.random().toString(36).slice(2, 10)}!`,
          options: {
            redirectTo: `${appUrl}/verify-email?request_id=${travelRequest.id}`,
            data: {
              full_name: customer_name,
              phone: customer_mobile,
              request_id: travelRequest.id,
            },
          },
        });

        if (!linkErr && linkData?.properties?.action_link) {
          verificationUrl = linkData.properties.action_link;
        }
      } catch (authErr) {
        console.warn('[Submit Route] Supabase admin.generateLink error, using signed token:', authErr);
      }
    }

    // Fallback or Direct signed token link
    if (!verificationUrl) {
      const token = generateVerificationToken(travelRequest.id, customer_email);
      verificationUrl = `${appUrl}/verify-email?request_id=${travelRequest.id}&token=${token}&email=${encodeURIComponent(customer_email)}`;
    }

    // 4. Send customer verification email
    await sendCustomerVerificationEmail({
      email: customer_email,
      customerName: customer_name,
      destination,
      verificationUrl,
    });

    return NextResponse.json({
      success: true,
      requestId: travelRequest.id,
      requestNumber: travelRequest.request_number,
      email: travelRequest.customer_email,
      status: travelRequest.status,
      isDuplicate,
      message: 'Travel enquiry submitted. Please verify your email to finalize.',
    }, { status: 201 });

  } catch (error: any) {
    console.error('[Submit Route] Error creating request:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your request. Please try again.' },
      { status: 500 }
    );
  }
}
