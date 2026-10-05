import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Bitter, Inter, Noto_Sans_Devanagari } from 'next/font/google';

import '@/app/globals.css';

import { HTML_LANG, LANGS, isLang, type Lang } from '@/lib/i18n';
import { SITE_URL, site } from '@/content/site';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MobileActionBar } from '@/components/MobileActionBar';
import { Analytics } from '@/components/Analytics';

/**
 * Fonts: one Latin serif for headings (sturdy, agricultural, not corporate),
 * one Latin sans for body copy, and Noto Sans Devanagari for Marathi.
 * next/font self-hosts these, so there is no render-blocking request to Google.
 */
const heading = Bitter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  weight: ['600', '700'],
});

const body = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  display: 'swap',
  variable: '--font-devanagari',
});

/**
 * Only /en and /mr exist. Anything else 404s instead of rendering a page in a
 * language we have no content for.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: '#162D1E',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${site.name} — ${site.tagline[lang]}`,
      template: `%s | ${site.name}`,
    },
    description: site.shortDescription[lang],
    applicationName: site.name,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'en-IN': '/en',
        'mr-IN': '/mr',
        'x-default': '/en',
      },
    },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: lang === 'mr' ? 'mr_IN' : 'en_IN',
      url: `/${lang}`,
      title: `${site.name} — ${site.tagline[lang]}`,
      description: site.shortDescription[lang],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${site.name} — ${site.tagline[lang]}`,
      description: site.shortDescription[lang],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
    },
    verification: site.analytics.googleSiteVerification
      ? { google: site.analytics.googleSiteVerification }
      : undefined,
    formatDetection: { telephone: true, address: true, email: true },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const typed: Lang = lang;

  return (
    <html
      lang={HTML_LANG[typed]}
      className={`${heading.variable} ${body.variable} ${devanagari.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        {/* Keyboard users reach the content without tabbing the whole header. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-field-800 focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          {typed === 'mr' ? 'मुख्य आशयाकडे जा' : 'Skip to main content'}
        </a>

        <Header lang={typed} />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer lang={typed} />
        <MobileActionBar lang={typed} />

        {/* Clears the fixed mobile action bar — including the safe-area inset
            on notched phones — so the footer is never covered. */}
        <div
          aria-hidden="true"
          className="h-[calc(3.75rem+env(safe-area-inset-bottom))] lg:hidden"
        />

        <Analytics />
      </body>
    </html>
  );
}
