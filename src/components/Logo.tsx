import type { Lang } from '@/lib/i18n';
import { site } from '@/content/site';
import { pick } from '@/lib/i18n';

type Props = {
  lang: Lang;
  /** `dark` renders the wordmark in white for use over dark panels. */
  tone?: 'light' | 'dark';
  className?: string;
  /** Hide the tagline on narrow screens inside the header. */
  compact?: boolean;
};

/**
 * Om Agrosphere wordmark.
 *
 * A hand-built mark rather than a placeholder logo file: two grain ears rising
 * out of a furrow, in the brand's field-green and grain-amber. It reads clearly
 * at header size and needs no image request.
 */
export function Logo({ lang, tone = 'light', className = '', compact = false }: Props) {
  const dark = tone === 'dark';
  const id = `logo-${tone}`;

  return (
    <span className={['flex items-center gap-2.5', className].join(' ')}>
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0"
        role="img"
        aria-label={site.name}
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2B5A37" />
            <stop offset="100%" stopColor="#162D1E" />
          </linearGradient>
        </defs>
        <rect width="40" height="40" rx="9" fill={`url(#${id})`} />
        {/* Furrow lines — the ground the crop grows from. */}
        <path
          d="M7 30.5h26"
          stroke="#E0A93B"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.55"
        />
        {/* Central stalk */}
        <path d="M20 30V12" stroke="#EBC264" strokeWidth="1.8" strokeLinecap="round" />
        {/* Grain ears, mirrored about the stalk */}
        <g fill="#EBC264">
          <path d="M20 13.4c1.9-.5 3.2-2 3.4-4.1-2.1.2-3.6 1.5-4.1 3.4Z" />
          <path d="M20 13.4c-1.9-.5-3.2-2-3.4-4.1 2.1.2 3.6 1.5 4.1 3.4Z" />
          <path d="M20 18.6c1.9-.5 3.2-2 3.4-4.1-2.1.2-3.6 1.5-4.1 3.4Z" />
          <path d="M20 18.6c-1.9-.5-3.2-2-3.4-4.1 2.1.2 3.6 1.5 4.1 3.4Z" />
          <path d="M20 23.8c1.9-.5 3.2-2 3.4-4.1-2.1.2-3.6 1.5-4.1 3.4Z" />
          <path d="M20 23.8c-1.9-.5-3.2-2-3.4-4.1 2.1.2 3.6 1.5 4.1 3.4Z" />
        </g>
      </svg>

      <span className="flex flex-col leading-none">
        <span
          className={[
            'font-heading text-[1.15rem] font-semibold tracking-tight',
            dark ? 'text-white' : 'text-ink',
          ].join(' ')}
        >
          {site.name}
        </span>
        {!compact ? (
          <span
            className={[
              'mt-1 text-[0.62rem] tracking-wide',
              dark ? 'text-field-100/70' : 'text-ink-muted',
            ].join(' ')}
          >
            {pick(site.tagline, lang)}
          </span>
        ) : null}
      </span>
    </span>
  );
}
