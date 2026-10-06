/**
 * Security headers.
 *
 * CSP note: Next.js App Router injects inline bootstrap scripts, and GA4 (when
 * enabled) loads from googletagmanager.com. A nonce-based CSP would require
 * middleware-generated nonces on every request, which forces all pages out of
 * static rendering. For a brochure site that is a bad trade, so script-src
 * allows 'unsafe-inline' and is tightly scoped to known hosts instead.
 */

/*
 * React's development build calls eval() to rebuild callstacks and to power
 * Fast Refresh; its production build never does. Only `next dev` needs the
 * relaxation, so it is granted there and nowhere else.
 *
 * The test fails closed: anything other than an explicit "development" —
 * including an unset NODE_ENV — gets the strict policy, so a production build
 * can never inherit it. The shipped CSP is byte-for-byte what it was before.
 */
const isDevServer = process.env.NODE_ENV === 'development';

const scriptSrc = [
  "'self'",
  "'unsafe-inline'",
  ...(isDevServer ? ["'unsafe-eval'"] : []),
  // googletagmanager.com: GA4. google.com/gstatic.com: reCAPTCHA v3, loaded
  // only when the business configures a site key.
  'https://www.googletagmanager.com',
  'https://www.google.com',
  'https://www.gstatic.com',
].join(' ');

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  `script-src ${scriptSrc}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https://*.googleapis.com https://*.gstatic.com https://*.google.com https://*.ggpht.com https://www.google-analytics.com",
  "connect-src 'self' https://www.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://www.google.com",
  "frame-src https://www.google.com https://maps.google.com",
  'upgrade-insecure-requests',
].join('; ');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Business photographs are served from /public — no remote hosts needed.
    remotePatterns: [],
  },
  async redirects() {
    // The site lives under /en and /mr. Send the bare root to English rather
    // than rendering a page outside the language layout.
    return [{ source: '/', destination: '/en', permanent: false }];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
