import type { MetadataRoute } from 'next';

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://omagrosphere.com').replace(/\/+$/, '');

/**
 * robots.txt (SRS §23).
 *
 * The API route is disallowed so crawlers never touch the inquiry endpoint.
 * Everything else is open — this is a public business site.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
