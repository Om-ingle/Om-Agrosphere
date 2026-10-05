'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { href, pick, type Lang } from '@/lib/i18n';
import { primaryNav, quoteNav } from '@/content/nav';
import { ui } from '@/content/ui';
import { directionsUrl, site, telHref, whatsappHref } from '@/content/site';
import { buildWhatsAppOpener } from '@/lib/inquiry-message';
import { Logo } from '@/components/Logo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ButtonLink, ButtonInternal } from '@/components/Button';
import {
  CloseIcon,
  MapPinIcon,
  MenuIcon,
  PhoneIcon,
  QuoteIcon,
  WhatsAppIcon,
} from '@/components/icons';

export function Header({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile panel whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape, and stop the page behind the panel from scrolling.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const isActive = (path: string) => {
    const target = href(lang, path);
    return path === '' ? pathname === target : pathname === target || pathname.startsWith(`${target}/`);
  };

  const tel = telHref();
  const wa = whatsappHref(buildWhatsAppOpener(lang));

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <Link
          href={href(lang)}
          className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-field-700 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          aria-label={`${site.name} — ${pick(ui.backHome, lang)}`}
        >
          <Logo lang={lang} compact />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {primaryNav.map((item) => (
              <li key={item.path}>
                <Link
                  href={href(lang, item.path)}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                  className={[
                    'rounded whitespace-nowrap px-3 py-2 text-sm transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-field-700 focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
                    isActive(item.path)
                      ? 'font-semibold text-field-800'
                      : 'text-ink-soft hover:bg-field-50 hover:text-field-800',
                  ].join(' ')}
                >
                  {pick(item.label, lang)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher lang={lang} className="hidden sm:flex" />

          {tel ? (
            <ButtonLink
              href={tel}
              variant="outline"
              className="hidden 2xl:inline-flex"
              aria-label={pick(ui.callUs, lang)}
            >
              <PhoneIcon className="h-4 w-4" />
              {pick(ui.call, lang)}
            </ButtonLink>
          ) : null}

          <ButtonInternal
            href={href(lang, quoteNav.path)}
            variant="accent"
            className="hidden sm:inline-flex"
          >
            <QuoteIcon className="h-4 w-4" />
            {pick(quoteNav.label, lang)}
          </ButtonInternal>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? pick(ui.close, lang) : pick(ui.openMenu, lang)}
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-ink/15 text-ink transition-colors hover:bg-field-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-field-700 focus-visible:ring-offset-2 focus-visible:ring-offset-paper xl:hidden"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel. Body scroll is locked while this is open, so the panel
          carries its own scroll — otherwise a long menu is simply cut off. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="max-h-[calc(100vh-3.75rem)] overflow-y-auto overscroll-contain border-t border-ink/10 bg-paper xl:hidden"
      >
        <nav aria-label="Primary mobile" className="mx-auto max-w-content px-4 py-4 sm:px-6">
          <ul className="flex flex-col">
            {primaryNav.map((item) => (
              <li key={item.path}>
                <Link
                  href={href(lang, item.path)}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                  className={[
                    'block rounded px-3 py-3 text-base transition-colors',
                    isActive(item.path)
                      ? 'bg-field-50 font-semibold text-field-800'
                      : 'text-ink-soft hover:bg-field-50',
                  ].join(' ')}
                >
                  {pick(item.label, lang)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-2.5 border-t border-ink/10 pt-4">
            <ButtonInternal href={href(lang, quoteNav.path)} size="lg" className="w-full">
              <QuoteIcon className="h-4 w-4" />
              {pick(ui.getQuote, lang)}
            </ButtonInternal>

            {wa ? (
              <ButtonLink
                href={wa}
                variant="whatsapp"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {pick(ui.whatsapp, lang)}
              </ButtonLink>
            ) : null}

            <div className="grid grid-cols-2 gap-2.5">
              {tel ? (
                <ButtonLink href={tel} variant="outline" size="lg">
                  <PhoneIcon className="h-4 w-4" />
                  {pick(ui.call, lang)}
                </ButtonLink>
              ) : null}
              <ButtonLink
                href={directionsUrl}
                variant="outline"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPinIcon className="h-4 w-4" />
                {pick(ui.directions, lang)}
              </ButtonLink>
            </div>

            <LanguageSwitcher lang={lang} className="mt-1 sm:hidden" />
          </div>
        </nav>
      </div>
    </header>
  );
}
