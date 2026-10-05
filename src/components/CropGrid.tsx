import { pick, type Lang } from '@/lib/i18n';
import { crops } from '@/content/services';
import { WheatIcon } from '@/components/icons';

/**
 * Supported crops (SRS §7.1.4).
 *
 * Rendered as a plain list of names rather than decorative illustrations —
 * a farmer scanning this needs to find their crop in under a second.
 */
export function CropGrid({ lang }: { lang: Lang }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
      {crops.map((crop) => (
        <li
          key={crop.id}
          className="flex flex-col items-center gap-2 rounded border border-ink/10 bg-white px-3 py-5 text-center"
        >
          <WheatIcon className="h-6 w-6 text-field-600" />
          <span className="text-sm font-semibold text-ink">{pick(crop.name, lang)}</span>
          {/* The other-language name helps customers who know the crop by
              only one name, or who are reading over someone's shoulder. */}
          <span
            className="text-xs text-ink-muted"
            lang={lang === 'en' ? 'mr' : 'en'}
          >
            {lang === 'en' ? crop.name.mr : crop.name.en}
          </span>
        </li>
      ))}
    </ul>
  );
}
