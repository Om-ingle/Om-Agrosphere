import Image from 'next/image';
import type { Lang } from '@/lib/i18n';
import { pick } from '@/lib/i18n';
import { photo, type PhotoKey } from '@/content/media';
import { ui } from '@/content/ui';

type Props = {
  photoKey: PhotoKey;
  lang: Lang;
  /** Tailwind classes for the wrapper — controls aspect ratio and rounding. */
  className?: string;
  /** Tailwind sizes attribute; defaults to full-width viewport. */
  sizes?: string;
  /** Above-the-fold images should be priority; everything else lazy-loads. */
  priority?: boolean;
  /** Dark panels need a darker placeholder panel to sit correctly. */
  tone?: 'light' | 'dark';
};

/**
 * Renders a photograph from the registry.
 *
 * While a slot has no `src`, this renders an honest "photograph to be added"
 * panel instead of a stock image — publishing a stock photo of someone else's
 * facility as our own would be exactly the kind of fabricated content the
 * project rules forbid.
 */
export function Photo({
  photoKey,
  lang,
  className = '',
  sizes = '100vw',
  priority = false,
  tone = 'light',
}: Props) {
  const slot = photo(photoKey);

  if (!slot.src) {
    const pending = tone === 'dark';
    const subject = pick(slot.subject, lang);
    const label = pick(ui.photoPendingTitle, lang);

    return (
      <div
        className={[
          'relative flex flex-col items-center justify-center overflow-hidden text-center',
          pending ? 'bg-field-800 text-field-100' : 'bg-paper-dim bg-chaff text-ink-soft',
          className,
        ].join(' ')}
        role="img"
        aria-label={`${label}: ${subject}`}
      >
        {/* Inset hairline: reads as a reserved plate rather than a broken image. */}
        <span
          aria-hidden="true"
          className={[
            'pointer-events-none absolute inset-2 rounded-sm border border-dashed',
            pending ? 'border-white/15' : 'border-soil-300/60',
          ].join(' ')}
        />

        {/* Dark plates get a single warm glow so they do not read as flat green. */}
        {pending ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(224,169,59,0.16),transparent_62%)]"
          />
        ) : null}

        <span
          className={[
            'relative flex h-10 w-10 items-center justify-center rounded-full',
            pending ? 'bg-white/5 text-grain-300' : 'bg-white text-soil-500 shadow-card',
          ].join(' ')}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4.5" width="18" height="15" rx="2" />
            <circle cx="8.5" cy="10" r="1.6" />
            <path d="M3.5 17.5 9 12.5l4 3.5 3-2.5 4.5 4" />
          </svg>
        </span>

        <span
          className={[
            'relative mt-3 max-w-[26ch] px-5 font-heading text-xs leading-snug sm:text-sm',
            pending ? 'text-field-100/90' : 'text-ink-soft',
          ].join(' ')}
        >
          {subject}
        </span>

        <span
          className={[
            'relative mt-2 px-5 text-[0.6rem] font-semibold tracking-[0.16em] uppercase',
            pending ? 'text-field-100/45' : 'text-ink-muted/75',
          ].join(' ')}
        >
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className={['relative overflow-hidden bg-paper-deep', className].join(' ')}>
      <Image
        src={slot.src}
        alt={pick(slot.alt, lang)}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        className="object-cover"
      />
    </div>
  );
}
