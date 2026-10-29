import { pick, type Lang } from '@/lib/i18n';
import { crops } from '@/content/services';
import { WheatIcon } from '@/components/icons';

/**
 * Supported crops (SRS §7.1.4).
 *
 * A hairline grid rather than a row of floating cards — a farmer scanning this
 * needs to find their crop in under a second, and a row of boxed cards made the
 * list harder to read than the names themselves.
 */
export function CropGrid({ lang }: { lang: Lang }) {
  return (
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-3 lg:grid-cols-9">
      {crops.map((crop) => (
        <li
          key={crop.id}
          className="flex flex-col items-center gap-1.5 bg-white px-3 py-6 text-center"
        >
          <WheatIcon className="h-5 w-5 text-field-500" />
          <span className="font-heading text-base leading-tight text-ink">
            {pick(crop.name, lang)}
          </span>
          {/* The other-language name helps customers who know the crop by
              only one name, or who are reading over someone's shoulder. */}
          <span className="text-xs text-ink-muted" lang={lang === 'en' ? 'mr' : 'en'}>
            {lang === 'en' ? crop.name.mr : crop.name.en}
          </span>
        </li>
      ))}
    </ul>
  );
}
