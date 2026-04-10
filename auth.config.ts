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
  },
  pages: {
    signIn: '/admin/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthConfig;

