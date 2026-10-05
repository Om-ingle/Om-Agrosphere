import type { MetadataRoute } from 'next';
import { LANGS } from '@/lib/i18n';
import { services } from '@/content/services';

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://omagrosphere.com').replace(/\/+$/, '');

/**
 * Page paths that exist, without the language prefix. Each is emitted once per
 * language, with hreflang alternates so Google indexes the two variants as
 * translations rather than duplicates.
 */
const PATHS = [
  '',
  'about',
  'services',
  'products',
  'gallery',
  'faq',
  'quote',
  'contact',
  'privacy',
  'terms',
  ...services.map((service) => `services/${service.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PATHS.flatMap((path) => {
    const suffix = path ? `/${path}` : '';
    const languages = Object.fromEntries(
      LANGS.map((lang) => [lang === 'mr' ? 'mr-IN' : 'en-IN', `${SITE}/${lang}${suffix}`]),
    );

    return LANGS.map((lang) => ({
      url: `${SITE}/${lang}${suffix}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: path === '' ? 1 : path === 'quote' || path === 'contact' ? 0.9 : 0.7,
      alternates: { languages },
    }));
  });
}
