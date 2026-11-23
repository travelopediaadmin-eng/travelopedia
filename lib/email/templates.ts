import { TravelRequest } from '@/types/supabase';
import { COMPANY_DETAILS } from '@/lib/utils';

export function getAdminNotificationEmailHtml(request: TravelRequest, crmUrl: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Verified Travel Request</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
    .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05); }
    .header { background: linear-gradient(135deg, #020617 0%, #0f172a 100%); padding: 32px 28px; text-align: left; border-bottom: 2px solid #f59e0b; }
    .logo-badge { display: inline-block; padding: 4px 12px; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 9999px; font-size: 11px; font-weight: 700; color: #fbbf24; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; }
    .title { color: #ffffff; margin: 0 0 6px 0; font-size: 22px; font-weight: 800; }
    .subtitle { color: #94a3b8; margin: 0; font-size: 13px; }
    .content { padding: 28px; }
    .pill-status { display: inline-flex; align-items: center; padding: 6px 14px; background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; border-radius: 9999px; font-size: 12px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 20px; }
    .intro { font-size: 14px; line-height: 1.6; color: #334155; margin-bottom: 24px; }
    .details-table { width: 100%; border-collapse: separate; border-spacing: 0; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; margin-bottom: 28px; }
    .details-table tr:nth-child(even) { background-color: #f8fafc; }
    .details-table td { padding: 12px 16px; font-size: 13px; border-bottom: 1px solid #e2e8f0; }
    .details-table tr:last-child td { border-bottom: none; }
    .details-label { font-weight: 700; color: #64748b; width: 38%; }
    .details-value { font-weight: 600; color: #0f172a; }
    .btn { display: inline-block; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff !important; font-size: 13px; font-weight: 700; text-decoration: none; padding: 14px 28px; border-radius: 12px; border: 1px solid #334155; box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15); }
    .footer { padding: 20px 28px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #64748b; line-height: 1.5; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="logo-badge">Travelopedia CRM System</div>
      <h1 class="title">New Travel Request Received</h1>
      <p class="subtitle">Customer email has been verified successfully via Supabase Auth</p>
    </div>
    
    <div class="content">
      <div class="pill-status">
        ✓ Status: NEW (Verified Enquiry)
      </div>

      <p class="intro">
        Hello Admin,<br><br>
        A new travel enquiry has been received and verified through the <strong>Travelopedia</strong> luxury travel platform. Please review the customer travel specifications below and assign a travel concierge.
      </p>

      <table class="details-table">
        <tr>
          <td class="details-label">Request ID</td>
          <td class="details-value" style="color: #d97706; font-family: monospace; font-size: 14px;">${request.request_number}</td>
        </tr>
        <tr>
          <td class="details-label">Customer Name</td>
          <td class="details-value">${request.customer_name}</td>
        </tr>
        <tr>
          <td class="details-label">Email Address</td>
          <td class="details-value"><a href="mailto:${request.customer_email}" style="color: #2563eb; text-decoration: none;">${request.customer_email}</a></td>
        </tr>
        <tr>
          <td class="details-label">Mobile Number</td>
          <td class="details-value"><a href="tel:${request.customer_mobile}" style="color: #0f172a; text-decoration: none; font-weight: 700;">${request.customer_mobile}</a></td>
        </tr>
        <tr>
          <td class="details-label">Destination</td>
          <td class="details-value" style="color: #047857; font-weight: 700;">${request.destination}</td>
        </tr>
        <tr>
          <td class="details-label">Travel Date</td>
          <td class="details-value">${request.travel_start_date}</td>
        </tr>
        <tr>
          <td class="details-label">Return Date</td>
          <td class="details-value">${request.travel_return_date || 'Flexible / Open'}</td>
        </tr>
        <tr>
          <td class="details-label">Travellers Count</td>
          <td class="details-value">${request.travellers_count} Traveller(s)</td>
        </tr>
        <tr>
          <td class="details-label">Estimated Budget</td>
          <td class="details-value">${request.budget || 'Bespoke / Discuss on Call'}</td>
        </tr>
        <tr>
          <td class="details-label">Additional Requirements</td>
          <td class="details-value" style="white-space: pre-line;">${request.requirements || 'Standard Luxury Package Quotation Requested'}</td>
        </tr>
        <tr>
          <td class="details-label">Submission Source</td>
          <td class="details-value">${request.source || 'Website Enquiry'}</td>
        </tr>
      </table>

      <div style="text-align: center; margin: 32px 0 16px 0;">
        <a href="${crmUrl}" class="btn">
          Open Request in CRM Admin Panel →
        </a>
      </div>
    </div>

    <div class="footer">
      <strong>The Travelopedia</strong> • Luxury Bespoke Holidays<br>
      Flagship Office: ${COMPANY_DETAILS.address}<br>
      Surat Desk Hotline: ${COMPANY_DETAILS.phone} • WhatsApp: ${COMPANY_DETAILS.phoneRaw}<br>
      <em>This is an automated operational notification generated upon verified customer submission.</em>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export function getAdminNotificationEmailText(request: TravelRequest, crmUrl: string): string {
  return `
Hello Admin,

A new travel enquiry has been received through the Travelopedia website.

Request Details:

Request ID: ${request.request_number}
Customer Name: ${request.customer_name}
Email: ${request.customer_email}
Mobile: ${request.customer_mobile}
Destination: ${request.destination}
Travel Date: ${request.travel_start_date}
Return Date: ${request.travel_return_date || 'Flexible'}
Travellers: ${request.travellers_count}
Budget: ${request.budget || 'Bespoke / Discuss on Call'}
Requirements: ${request.requirements || 'None specified'}

Request Status: NEW
Verification: Verified via Supabase Auth

Please log in to the Travelopedia CRM Admin Panel to review and process this request:
${crmUrl}

Regards,
Travelopedia System
  `.trim();
}

export function getCustomerVerificationEmailHtml(customerName: string, destination: string, verificationUrl: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify Your Travel Enquiry</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
    .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: #020617; padding: 32px 28px; text-align: center; border-bottom: 2px solid #f59e0b; }
    .title { color: #ffffff; margin: 8px 0 0 0; font-size: 22px; font-weight: 800; font-family: Georgia, serif; }
    .content { padding: 32px 28px; }
    .btn { display: inline-block; background: #f59e0b; color: #020617 !important; font-size: 14px; font-weight: 800; text-decoration: none; padding: 15px 32px; border-radius: 12px; }
    .footer { padding: 20px 28px; background: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 11px; color: #64748b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div style="font-size: 11px; font-weight: 700; color: #fbbf24; text-transform: uppercase; letter-spacing: 0.1em;">The Travelopedia</div>
      <h1 class="title">Verify Your Travel Enquiry</h1>
    </div>
    <div class="content">
      <p style="font-size: 15px; color: #1e293b; line-height: 1.6;">
        Dear <strong>${customerName}</strong>,
      </p>
      <p style="font-size: 14px; color: #475569; line-height: 1.6;">
        Thank you for choosing <strong>The Travelopedia</strong> for your bespoke holiday to <strong>${destination}</strong>.
      </p>
      <p style="font-size: 14px; color: #475569; line-height: 1.6;">
        To protect your itinerary privacy and connect you directly with our Surat VIP Road holiday concierge, please confirm your email address by clicking the button below:
      </p>
      
      <div style="text-align: center; margin: 32px 0;">
        <a href="${verificationUrl}" class="btn">
          Verify Email &amp; Confirm Enquiry →
        </a>
      </div>

      <p style="font-size: 12px; color: #94a3b8; line-height: 1.5;">
        If the button does not work, copy and paste this link into your browser:<br>
        <a href="${verificationUrl}" style="color: #2563eb; word-break: break-all;">${verificationUrl}</a>
      </p>
    </div>
    <div class="footer">
      <strong>The Travelopedia</strong> • VIP Road, Vesu, Surat - 395007<br>
      Direct Desk: ${COMPANY_DETAILS.phone}
    </div>
  </div>
</body>
</html>
  `.trim();
}
