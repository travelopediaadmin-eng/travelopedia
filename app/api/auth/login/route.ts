import { NextResponse } from 'next/server';
import { verifyCredentials, createAdminSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const result = await verifyCredentials(email, password);

    if (!result.success || !result.user) {
      return NextResponse.json(
        { error: result.error || 'Invalid credentials' },
        { status: 401 }
      );
    }

    await createAdminSession(result.user);

    return NextResponse.json({
      success: true,
      user: result.user
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
