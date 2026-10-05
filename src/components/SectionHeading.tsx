import type { ReactNode } from 'react';
import type { Lang, L } from '@/lib/i18n';
import { pick } from '@/lib/i18n';

type Props = {
  eyebrow?: L;
  title: L;
  intro?: L;
  lang: Lang;
  /** Heading level, so pages keep a correct document outline. */
  as?: 'h1' | 'h2' | 'h3';
  align?: 'start' | 'center';
  tone?: 'light' | 'dark';
  children?: ReactNode;
};

/**
 * Consistent section heading: small uppercase eyebrow, serif heading, optional
 * intro paragraph. Keeps hierarchy uniform across every page.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  lang,
  as: Tag = 'h2',
  align = 'start',
  tone = 'light',
  children,
}: Props) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';
  const dark = tone === 'dark';

  return (
    <div className={['flex flex-col gap-3', alignment].join(' ')}>
      {eyebrow ? (
        <p className={['eyebrow', dark ? 'text-grain-300' : 'text-grain-600'].join(' ')}>
          {pick(eyebrow, lang)}
        </p>
      ) : null}

      <Tag
        className={[
          'font-heading text-balance',
          Tag === 'h1'
            ? 'text-[1.9rem] leading-[1.15] sm:text-4xl lg:text-[2.75rem]'
            : 'text-[1.6rem] leading-snug sm:text-[1.75rem]',
          dark ? 'text-white' : 'text-ink',
        ].join(' ')}
      >
        {pick(title, lang)}
      </Tag>

      {/* Short rule under the heading — an earthy, non-decorative divider. */}
      <span
        aria-hidden="true"
        className={[
          'rule-grain',
          dark ? 'bg-grain-400/60' : '',
          align === 'center' ? 'mx-auto' : '',
        ].join(' ')}
      />

      {intro ? (
        <p
          className={[
            'max-w-prose text-pretty leading-relaxed',
            dark ? 'text-field-100/85' : 'text-ink-soft',
          ].join(' ')}
        >
          {pick(intro, lang)}
        </p>
      ) : null}

      {children}
    </div>
  );
}
