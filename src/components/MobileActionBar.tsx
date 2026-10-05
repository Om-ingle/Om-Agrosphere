'use client';

import Link from 'next/link';
import { href, pick, type Lang } from '@/lib/i18n';
import { quoteNav } from '@/content/nav';
import { ui } from '@/content/ui';
import { directionsUrl, telHref, whatsappHref } from '@/content/site';
import { buildWhatsAppOpener } from '@/lib/inquiry-message';
import { track } from '@/lib/analytics';
import { MapPinIcon, PhoneIcon, QuoteIcon, WhatsAppIcon } from '@/components/icons';

/**
 * Sticky mobile action bar (SRS §8.2).
 *
 * Four actions a customer needs while standing in a field or beside a loaded
 * vehicle: call, WhatsApp, directions, quote. Hidden on large screens, where
 * the header already exposes them.
 *
 * Buttons whose number is not yet configured are dropped rather than shown
 * broken — Call and WhatsApp appear automatically once the business supplies
 * the numbers.
 */
export function MobileActionBar({ lang }: { lang: Lang }) {
  const tel = telHref();
  const wa = whatsappHref(buildWhatsAppOpener(lang));

  /*
   * Short labels, deliberately: at 320px each of the four actions gets about
   * 80px, and "Get Directions" wraps to two lines there while "Directions"
   * does not. The full wording is still used everywhere else on the site.
   */
  const shortLabel = {
    call: { en: 'Call', mr: 'फोन' },
    whatsapp: ui.whatsappLabel,
    directions: { en: 'Directions', mr: 'दिशा' },
    quote: { en: 'Quote', mr: 'चौकशी' },
  } as const;

  const item =
    'flex min-h-[3.5rem] flex-1 flex-col items-center justify-center gap-1.5 px-1 py-2 text-[0.7rem] leading-tight font-semibold transition-colors active:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-grain-300';

  return (
    <nav
      aria-label={pick({ en: 'Quick contact', mr: 'त्वरित संपर्क' }, lang)}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-grain-400/30 bg-field-950/95 pb-[env(safe-area-inset-bottom)] text-field-100 shadow-[0_-10px_28px_-14px_rgba(13,27,18,0.65)] backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto flex max-w-content items-stretch divide-x divide-white/10">
        {tel ? (
          <li className="flex flex-1">
            <a href={tel} onClick={() => track('call_click')} className={item}>
              <PhoneIcon className="h-5 w-5 text-grain-300" />
              {pick(shortLabel.call, lang)}
            </a>
          </li>
        ) : null}

        {wa ? (
          <li className="flex flex-1">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track('whatsapp_click')}
              className={item}
            >
              <WhatsAppIcon className="h-5 w-5" />
              {pick(shortLabel.whatsapp, lang)}
            </a>
          </li>
        ) : null}

        <li className="flex flex-1">
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('directions_click')}
            className={item}
          >
            <MapPinIcon className="h-5 w-5 text-grain-300" />
            {pick(shortLabel.directions, lang)}
          </a>
        </li>

        {/* The amber cell is the one action the whole bar exists to drive. */}
        <li className="flex flex-1">
          <Link
            href={href(lang, quoteNav.path)}
            onClick={() => track('quote_click', { source: 'mobile_bar' })}
            className={[item, 'bg-grain-400 text-ink active:bg-grain-300'].join(' ')}
          >
            <QuoteIcon className="h-5 w-5" />
            {pick(shortLabel.quote, lang)}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
