import type { ReactNode } from 'react';
import { pick, type L, type Lang } from '@/lib/i18n';
import { Breadcrumbs, type Crumb } from '@/components/Breadcrumbs';

type Props = {
  lang: Lang;
  eyebrow?: L;
  title: L;
  intro?: L;
  trail: Crumb[];
  children?: ReactNode;
};

/**
 * Standard masthead for every inner page: breadcrumb, eyebrow, single H1 and
 * an optional intro. Keeping the H1 and breadcrumb together is what guarantees
 * each page has exactly one H1 in the right place.
 */
export function PageHeader({ lang, eyebrow, title, intro, trail, children }: Props) {
  return (
    <header className="relative border-b border-ink/10 bg-paper-dim">
      {/* A single amber hairline marks the top of every inner page — the same
          mark the homepage hero uses, so the brand reads consistently. */}
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-grain-500/40" />
      <div className="mx-auto max-w-content px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Breadcrumbs lang={lang} trail={trail} />

        {eyebrow ? <p className="eyebrow text-grain-600">{pick(eyebrow, lang)}</p> : null}

        <h1 className="mt-3 max-w-4xl font-heading text-[1.85rem] leading-[1.15] text-balance text-ink sm:text-4xl lg:text-[2.6rem]">
          {pick(title, lang)}
        </h1>

        {intro ? (
          <p className="mt-5 max-w-prose text-base leading-relaxed text-pretty text-ink-soft sm:text-lg">
            {pick(intro, lang)}
          </p>
        ) : null}

        {children}
      </div>
    </header>
  );
}
