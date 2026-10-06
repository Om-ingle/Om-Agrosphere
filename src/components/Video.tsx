'use client';

import { useState } from 'react';
import { pick, type Lang } from '@/lib/i18n';
import { photo, video, type VideoKey } from '@/content/media';
import { Photo } from '@/components/Photo';
import { PlayIcon } from '@/components/icons';

type Props = {
  videoKey: VideoKey;
  lang: Lang;
  /** Tailwind classes controlling the frame's aspect ratio and rounding. */
  className?: string;
  /** Tailwind sizes attribute for the poster image. */
  sizes?: string;
  /** Dark panels need a darker pending-poster to sit correctly. */
  tone?: 'light' | 'dark';
};

const playLabel = { en: 'Play video', mr: 'व्हिडिओ चालवा' };

/**
 * A clip from the media registry.
 *
 * Shows the poster frame as a still image and attaches the player only once
 * the visitor asks for it. Nothing autoplays and no video data is fetched on
 * page load, so a page carrying eight clips still opens immediately — the
 * clips here are 4–12 MB each. The poster comes from the registry, so it is
 * served through next/image like any other photograph and lazy-loads below
 * the fold.
 */
export function Video({
  videoKey,
  lang,
  className = '',
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  tone = 'light',
}: Props) {
  const [playing, setPlaying] = useState(false);

  const clip = video(videoKey);
  const title = pick(clip.title, lang);
  const caption = pick(clip.caption, lang);
  const poster = photo(clip.poster).src;

  return (
    <figure className="flex flex-col">
      {playing ? (
        <div
          className={[
            'relative overflow-hidden rounded-sm border border-ink/15 bg-field-950',
            className,
          ].join(' ')}
        >
          {/* object-contain, not cover: these clips are portrait phone
              captures, and cropping a vertical frame to the card shape would
              hide part of what the clip is showing. */}
          <video
            className="h-full w-full object-contain"
            controls
            autoPlay
            playsInline
            preload="auto"
            poster={poster ?? undefined}
          >
            <source src={clip.src} type="video/mp4" />
            {caption}
          </video>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`${pick(playLabel, lang)}: ${title}`}
          className={[
            'group relative block w-full overflow-hidden rounded-sm border border-ink/10',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-field-700 focus-visible:ring-offset-2',
            className,
          ].join(' ')}
        >
          <Photo
            photoKey={clip.poster}
            lang={lang}
            tone={tone}
            className="h-full w-full"
            sizes={sizes}
          />

          {/* Resting scrim keeps the play badge legible over any frame. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center bg-field-950/25 transition-colors duration-200 group-hover:bg-field-950/15"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-field-800 shadow-lift transition-transform duration-200 group-hover:scale-105">
              <PlayIcon className="ml-0.5 h-6 w-6" />
            </span>
          </span>
        </button>
      )}

      <figcaption className="mt-3">
        <span className="font-heading text-sm text-ink">{title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-ink-soft">{caption}</span>
      </figcaption>
    </figure>
  );
}
