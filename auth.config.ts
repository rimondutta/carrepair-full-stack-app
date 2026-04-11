import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  providers: [], // We'll add the database-dependent providers in lib/auth.ts
  session: {
    strategy: 'jwt',
    maxAge: 8 * 60 * 60, // 8 hours — reasonable admin session window
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute = nextUrl.pathname.startsWith('/admin');
      const isAdminApiRoute = nextUrl.pathname.startsWith('/api/admin');
      const isLoginRoute = nextUrl.pathname === '/admin/login';

      if (isAdminRoute && !isLoginRoute) {
        if (isLoggedIn) return true;
        return false; // Redirect to login page
      } else if (isAdminApiRoute) {
        if (isLoggedIn) return true;
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      } else if (isLoginRoute && isLoggedIn) {
        return Response.redirect(new URL('/admin/dashboard', nextUrl));
      }
      return true;
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

