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
    return (
      <div
        className={[
          'relative flex flex-col items-center justify-center gap-2 overflow-hidden text-center',
          pending
            ? 'bg-field-800/60 text-field-100/80'
            : 'bg-paper-deep bg-chaff text-ink-muted',
          className,
        ].join(' ')}
        role="img"
        aria-label={`${pick(ui.photoPendingTitle, lang)}: ${pick(slot.subject, lang)}`}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className={['h-7 w-7', pending ? 'text-field-200/70' : 'text-soil-300'].join(' ')}
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
        <p className="px-4 text-xs font-semibold tracking-wide uppercase">
          {pick(ui.photoPendingTitle, lang)}
        </p>
        <p className="max-w-[22ch] px-4 text-[0.7rem] leading-snug opacity-80">
          {pick(slot.subject, lang)}
        </p>
      </div>
    );
  }

  return (
    <div className={['relative overflow-hidden', className].join(' ')}>
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
