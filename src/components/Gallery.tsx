import { pick, type Lang } from '@/lib/i18n';
import { galleryCategories } from '@/content/media';
import { Photo } from '@/components/Photo';

/**
 * Gallery (SRS §7.8).
 *
 * A plain responsive grid grouped by category — no lightbox library, no
 * carousel. Every slot is a real photograph from the registry, so as soon as
 * the business supplies images they appear here with no code change.
 */
export function Gallery({ lang, limitPerCategory }: { lang: Lang; limitPerCategory?: number }) {
  return (
    <div className="flex flex-col gap-12">
      {galleryCategories.map((category) => {
        const items = limitPerCategory
          ? category.items.slice(0, limitPerCategory)
          : category.items;

        return (
          <section key={category.id} aria-labelledby={`gallery-${category.id}`}>
            <div className="flex items-center gap-4">
              <h3
                id={`gallery-${category.id}`}
                className="font-heading text-lg text-ink sm:text-xl"
              >
                {pick(category.title, lang)}
              </h3>
              <span aria-hidden="true" className="h-px flex-1 bg-ink/10" />
            </div>

            <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((key) => (
                <li key={key}>
                  <Photo
                    photoKey={key}
                    lang={lang}
                    className="aspect-[4/3] w-full rounded border border-ink/10"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
