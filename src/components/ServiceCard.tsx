import Link from 'next/link';
import { href, pick, type Lang } from '@/lib/i18n';
import type { Service } from '@/content/services';
import { ui } from '@/content/ui';
import { Photo } from '@/components/Photo';
import { ArrowRightIcon, LayersIcon } from '@/components/icons';

/**
 * Service card. The whole card is a link, with the photograph carrying the
 * visual weight and the copy kept to a single explanatory sentence.
 */
export function ServiceCard({ service, lang }: { service: Service; lang: Lang }) {
  const url = href(lang, `services/${service.slug}`);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-ink/10 bg-white shadow-card transition-[box-shadow,border-color] duration-200 hover:border-grain-500/40 hover:shadow-lift">
      <Photo
        photoKey={service.photoKey}
        lang={lang}
        className="aspect-[4/3] w-full border-b border-ink/10"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-heading text-lg text-ink">
          <Link
            href={url}
            className="rounded after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-field-700 focus-visible:ring-offset-2"
          >
            {pick(service.name, lang)}
          </Link>
        </h3>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">
          {pick(service.summary, lang)}
        </p>

        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-field-700">
          {pick(ui.learnMore, lang)}
          <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}

/**
 * Compact service row used on the Services page index and in the footer-adjacent
 * cross-links. Icon-led, no photograph — keeps the page from repeating imagery.
 */
export function ServiceSummaryRow({ service, lang }: { service: Service; lang: Lang }) {
  return (
    <li>
      <Link
        href={href(lang, `services/${service.slug}`)}
        className="flex items-start gap-3.5 rounded border border-ink/10 bg-white p-4 transition-colors hover:border-field-600/40 hover:bg-field-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-field-700 focus-visible:ring-offset-2"
      >
        <LayersIcon className="mt-0.5 h-5 w-5 shrink-0 text-field-600" />
        <span className="flex flex-col gap-1">
          <span className="font-heading text-base text-ink">{pick(service.name, lang)}</span>
          <span className="text-sm leading-relaxed text-ink-soft">
            {pick(service.summary, lang)}
          </span>
        </span>
      </Link>
    </li>
  );
}
