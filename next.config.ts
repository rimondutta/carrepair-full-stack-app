import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Remove X-Powered-By header for security
  poweredByHeader: false,

  // Image optimization — whitelist domains for external images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Production security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self)',
          },
          {
            // Content Security Policy
            // - default-src 'self'  : only load resources from own origin
            // - script-src 'self' 'unsafe-inline' : Next.js needs inline scripts for hydration
            // - style-src 'self' 'unsafe-inline' fonts.googleapis.com : Google Fonts + inline styles
            // - img-src *           : images may come from external CDNs (MongoDB URLs)
            // - font-src 'self' fonts.gstatic.com : Google Fonts
            // - connect-src 'self'  : API calls only to same origin
            // - frame-ancestors 'none' : nobody can embed this site in an iframe
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src * data: blob:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
          {
            // HSTS — force HTTPS for 2 years (applied by Vercel automatically too)
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/logo/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
