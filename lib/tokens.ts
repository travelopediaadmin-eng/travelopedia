import crypto from 'crypto';

const SECRET_KEY = 
  process.env.SUPABASE_SERVICE_ROLE_KEY || 
  process.env.CRON_SECRET || 
  'travelopedia-secure-verification-secret-key-2026';

export function generateVerificationToken(requestId: string, email: string): string {
  const timestamp = Date.now();
  const payload = `${requestId}:${email.toLowerCase().trim()}:${timestamp}`;
  const signature = crypto.createHmac('sha256', SECRET_KEY).update(payload).digest('hex');
  const combined = `${payload}:${signature}`;
  return Buffer.from(combined).toString('base64url');
}

export interface TokenValidationResult {
  valid: boolean;
  expired: boolean;
  requestId?: string;
  email?: string;
  error?: string;
}

export function verifyVerificationToken(token: string): TokenValidationResult {
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf-8');
    const parts = decoded.split(':');
    if (parts.length !== 4) {
      return { valid: false, expired: false, error: 'Malformed verification token' };
    }

    const [requestId, email, timestampStr, signature] = parts;
    const timestamp = parseInt(timestampStr, 10);
    const expectedPayload = `${requestId}:${email}:${timestamp}`;
    const expectedSignature = crypto.createHmac('sha256', SECRET_KEY).update(expectedPayload).digest('hex');

    if (signature !== expectedSignature) {
      return { valid: false, expired: false, error: 'Invalid token signature' };
    }

    // 24-hour expiration check
    const maxAgeMs = 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp > maxAgeMs) {
      return { valid: false, expired: true, requestId, email, error: 'Verification link expired' };
    }

    return {
      valid: true,
      expired: false,
      requestId,
      email,
    };
  } catch (err) {
    return { valid: false, expired: false, error: 'Could not decode verification token' };
  }
}
