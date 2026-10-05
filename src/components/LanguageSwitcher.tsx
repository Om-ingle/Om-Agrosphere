'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LANGS, LANG_LABEL, toLang, type Lang } from '@/lib/i18n';
import { GlobeIcon } from '@/components/icons';

/**
 * Swap the language segment of the current path, preserving the rest.
 *
 * Only `usePathname` is used — deliberately not `useSearchParams`, which would
 * force every page through a Suspense boundary and out of static rendering.
 */
export function useLangSwap() {
  const pathname = usePathname();

  return (target: Lang): string => {
    const segments = (pathname ?? '/').split('/').filter(Boolean);
    // First segment is always the language, because of the [lang] route.
    if (segments.length > 0) {
      segments[0] = target;
    } else {
      segments.push(target);
    }
    return `/${segments.join('/')}`;
  };
}

type Props = {
  lang: Lang;
  /** Dark headers (over the hero) invert the control colours. */
  tone?: 'light' | 'dark';
  className?: string;
};

/**
 * English ↔ मराठी toggle.
 *
 * Rendered as two links rather than a dropdown: it is a two-option choice, it
 * switches the language of the whole page, and links mean it works without
 * JavaScript and can be crawled as a language alternate.
 */
export function LanguageSwitcher({ lang, tone = 'light', className = '' }: Props) {
  const toHref = useLangSwap();
  const dark = tone === 'dark';

  return (
    <div
      className={['flex items-center gap-1.5', className].join(' ')}
      role="group"
      aria-label="Language / भाषा"
    >
      <GlobeIcon
        className={['h-4 w-4 shrink-0', dark ? 'text-white/70' : 'text-ink-muted'].join(' ')}
      />
      {LANGS.map((code, index) => {
        const active = code === lang;
        return (
          <span key={code} className="flex items-center">
            {index > 0 ? (
              <span className={['mr-1.5', dark ? 'text-white/30' : 'text-ink-muted/40'].join(' ')}>
                /
              </span>
            ) : null}
            <Link
              href={toHref(code)}
              hrefLang={code === 'mr' ? 'mr-IN' : 'en-IN'}
              lang={code}
              aria-current={active ? 'true' : undefined}
              className={[
                'rounded px-1.5 py-1 text-sm transition-colors',
                'focus-visible:outline-none focus-visible:ring-2',
                active
                  ? dark
                    ? 'font-semibold text-white focus-visible:ring-white'
                    : 'font-semibold text-field-800 underline decoration-grain-500 decoration-2 underline-offset-4 focus-visible:ring-field-700'
                  : dark
                    ? 'text-white/70 hover:text-white focus-visible:ring-white'
                    : 'text-ink-muted hover:text-ink focus-visible:ring-field-700',
              ].join(' ')}
            >
              {LANG_LABEL[code]}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
