import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { TravelRequest } from '@/types/supabase';
import { 
  getAdminNotificationEmailHtml, 
  getAdminNotificationEmailText,
  getCustomerVerificationEmailHtml
} from './templates';
import { supabaseAdmin } from '@/lib/supabase/admin';

const resendApiKey = process.env.RESEND_API_KEY || '';
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// SMTP Transport Config
const smtpHost = process.env.SMTP_HOST || '';
const smtpPort = Number(process.env.SMTP_PORT || '587');
const smtpUser = process.env.SMTP_USER || '';
const smtpPass = process.env.SMTP_PASS || '';
const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465;

const emailFrom = process.env.EMAIL_FROM || 'The Travelopedia <notifications@thetravelopedia.com>';
export const adminNotificationEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'ops.travelopedia@gmail.com';
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

function getSmtpTransporter() {
  if (!smtpHost || !smtpUser) return null;
  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  provider: 'resend' | 'smtp' | 'mock_logged';
  error?: string;
}

/**
 * Universal email dispatcher (Resend -> SMTP -> Dev fallback log)
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<SendEmailResult> {
  // 1. Try Resend if configured
  if (resend) {
    try {
      const response = await resend.emails.send({
        from: emailFrom,
        to: [to],
        subject,
        html,
        text,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return {
        success: true,
        messageId: response.data?.id,
        provider: 'resend',
      };
    } catch (err: any) {
      console.warn('[Email Service] Resend API failed, trying SMTP fallback:', err.message);
    }
  }

  // 2. Try SMTP if configured
  const transporter = getSmtpTransporter();
  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: emailFrom,
        to,
        subject,
        html,
        text,
      });

      return {
        success: true,
        messageId: info.messageId,
        provider: 'smtp',
      };
    } catch (err: any) {
      console.error('[Email Service] SMTP dispatch failed:', err.message);
      return {
        success: false,
        provider: 'smtp',
        error: err.message,
      };
    }
  }

  // 3. Fallback in development or when SMTP is not yet configured:
  console.log('====================================================');
  console.log(`[EMAIL DISPATCH MOCK/FALLBACK]`);
  console.log(`To: ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Status: Logged successfully (Configure RESEND_API_KEY or SMTP_HOST in .env.local for production delivery)`);
  console.log('====================================================');

  return {
    success: true,
    messageId: `mock-${Date.now()}`,
    provider: 'mock_logged',
  };
}

/**
 * Sends the Admin Notification Email with idempotency protection
 */
export async function sendAdminTravelRequestNotification(
  request: TravelRequest
): Promise<SendEmailResult> {
  // Idempotency: Prevent duplicate notifications on page refresh or repeated callbacks
  if (request.admin_notified && request.notification_status === 'sent') {
    console.log(`[Email Service] Admin notification already sent for ${request.request_number}. Skipping duplicate.`);
    return {
      success: true,
      provider: 'mock_logged',
      messageId: 'skipped-duplicate',
    };
  }

  const crmUrl = `${appUrl}/admin/enquiries?id=${request.id}`;
  const subject = `New Travel Request Received – Travelopedia [${request.request_number}]`;
  const html = getAdminNotificationEmailHtml(request, crmUrl);
  const text = getAdminNotificationEmailText(request, crmUrl);

  const result = await sendEmail({
    to: adminNotificationEmail,
    subject,
    html,
    text,
  });

  const now = new Date().toISOString();

  // Record notification delivery status in Supabase if configured
  if (supabaseAdmin) {
    try {
      await supabaseAdmin
        .from('travel_requests')
        .update({
          admin_notified: result.success,
          notification_status: result.success ? 'sent' : 'failed',
          notification_error: result.error || null,
          notification_sent_at: result.success ? now : null,
          updated_at: now,
        })
        .eq('id', request.id);
    } catch (dbErr) {
      console.error('[Email Service] Failed to record notification status in Supabase:', dbErr);
    }
  }

  return result;
}

/**
 * Sends a custom customer verification email if manual dispatch is chosen
 */
export async function sendCustomerVerificationEmail({
  email,
  customerName,
  destination,
  verificationUrl,
}: {
  email: string;
  customerName: string;
  destination: string;
  verificationUrl: string;
}): Promise<SendEmailResult> {
  const subject = `Verify Your Travel Enquiry – The Travelopedia`;
  const html = getCustomerVerificationEmailHtml(customerName, destination, verificationUrl);
  const text = `Dear ${customerName},\n\nPlease verify your email for your travel enquiry to ${destination}:\n${verificationUrl}\n\nThe Travelopedia Team`;

  return sendEmail({
    to: email,
    subject,
    html,
    text,
  });
}
