import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  // Get the JWT for the current session
  const token = await getToken({
    secret: process.env.NEXTAUTH_SECRET,
    req,
  });

  // If a JWT is present, redirect to dashboard (never view landing page)
  if (token) return NextResponse.redirect(new URL('/petitions', req.url));

  // Otherwise carry on
  return NextResponse.next();
}

export const config = {
  // Check when visiting landing page or auth page
  matcher: ['/', '/auth/login'],
};
