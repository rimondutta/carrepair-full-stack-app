import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export const proxy = NextAuth(authConfig).auth;

export const config = {
  // Protect admin pages and admin API routes
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
