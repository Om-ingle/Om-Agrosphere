import Link from 'next/link';
import { href, pick, type L, type Lang } from '@/lib/i18n';

export type Crumb = { name: L; path: string };

/**
 * Visible breadcrumb trail. Mirrors the BreadcrumbList structured data emitted
 * by the page so the two never disagree.
 */
export function Breadcrumbs({ lang, trail }: { lang: Lang; trail: Crumb[] }) {
  return (
    <nav aria-label={pick({ en: 'Breadcrumb', mr: 'मार्गदर्शक' }, lang)} className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-muted">
        {trail.map((crumb, index) => {
          const last = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="font-medium text-ink-soft">
                  {pick(crumb.name, lang)}
                </span>
              ) : (
                <>
                  <Link
                    href={href(lang, crumb.path)}
                    className="rounded transition-colors hover:text-field-700 hover:underline hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-field-700 focus-visible:ring-offset-2"
                  >
                    {pick(crumb.name, lang)}
                  </Link>
                  <span aria-hidden="true" className="text-ink-muted/50">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
