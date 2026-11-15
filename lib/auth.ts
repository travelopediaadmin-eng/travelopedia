import { cookies } from 'next/headers';
import { readDb } from './db';

const COOKIE_NAME = 'travelo_admin_token';
const SESSION_SECRET = 'travelo_luxury_secret_session_key_2026';

export interface AdminSession {
  id: string;
  email: string;
  name: string;
  role: string;
  isAuthenticated: boolean;
}

export async function verifyCredentials(email: string, password: string):Promise<{ success: boolean; user?: { id: string; email: string; name: string; role: string }; error?: string }> {
  const db = readDb();
  const admin = db.adminUser;

  // Allow admin123 or TraveloAdmin2026! or default db password
  const validPasswords = [admin.passwordHash, 'admin123', 'TraveloAdmin2026!', 'admin'];

  if (email.toLowerCase().trim() === admin.email.toLowerCase().trim() && validPasswords.includes(password.trim())) {
    return {
      success: true,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    };
  }

  // Also support superuser login
  if (email.toLowerCase().trim() === 'admin' && validPasswords.includes(password.trim())) {
    return {
      success: true,
      user: {
        id: admin.id,
        email: 'admin@thetravelopedia.com',
        name: admin.name,
        role: 'superadmin'
      }
    };
  }

  return { success: false, error: 'Invalid email or password' };
}

export async function createAdminSession(user: { id: string; email: string; name: string; role: string }) {
  const cookieStore = cookies();
  const sessionData = {
    ...user,
    issuedAt: Date.now(),
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  };

  const token = Buffer.from(JSON.stringify(sessionData)).toString('base64');

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/'
  });

  return token;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) return null;

    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    if (!decoded || !decoded.email) return null;

    if (decoded.expiresAt && Date.now() > decoded.expiresAt) {
      return null;
    }

    return {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role || 'admin',
      isAuthenticated: true
    };
  } catch (err) {
    return null;
  }
}

export async function clearAdminSession() {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);
}
