import { NextResponse } from 'next/server';

const UPSTREAM_BASE = (process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || '').replace(/\/$/, '');
const AUTH_TOKEN = process.env.STRAPI_AUTH_TOKEN || '';

if (!UPSTREAM_BASE) {
  console.warn('[api/login] Missing STRAPI_URL env variable');
}

if (!AUTH_TOKEN) {
  console.warn('[api/login] Missing STRAPI_AUTH_TOKEN env variable');
}

export async function POST(req: Request) {
  if (!UPSTREAM_BASE) {
    return NextResponse.json({ error: 'Server config missing STRAPI_URL' }, { status: 500 });
  }

  if (!AUTH_TOKEN) {
    return NextResponse.json({ error: 'Server config missing STRAPI_AUTH_TOKEN' }, { status: 500 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }
  const { identifier, password } = body || {};
  if (!identifier || !password) {
    return NextResponse.json({ error: 'Missing identifier or password' }, { status: 400 });
  }

  try {
    const upstreamRes = await fetch(`${UPSTREAM_BASE}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify({ identifier, password }),
      cache: 'no-store'
    });

    const data = await upstreamRes.json().catch(() => null);

    if (!upstreamRes.ok) {
      const msg = (data && (data.error?.message || data.message)) || 'Login failed';
      return NextResponse.json({ error: msg, status: upstreamRes.status }, { status: upstreamRes.status });
    }

    const { jwt, user } = data as { jwt: string; user: any };
    if (!jwt || !user) {
      return NextResponse.json({ error: 'Unexpected upstream response' }, { status: 502 });
    }

    const res = NextResponse.json({ user: sanitizeUser(user) });
    // Set httpOnly cookie for better security than localStorage
    res.cookies.set('auth_token', jwt, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      // secure true only in production to avoid local dev issues
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });
    return res;
  } catch (err: any) {
    console.error('[api/login] Network/Server error', err);
    return NextResponse.json({ error: 'Upstream connection error' }, { status: 502 });
  }
}

function sanitizeUser(user: any) {
  if (!user || typeof user !== 'object') return user;
  const { password, resetPasswordToken, confirmationToken, ...rest } = user;
  return rest;
}
