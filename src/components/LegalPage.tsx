import { pick, type L, type Lang } from '@/lib/i18n';
import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import type { Crumb } from '@/components/Breadcrumbs';

export type LegalBlock = {
  id: string;
  title: L;
  /** Optional paragraph. */
  body?: L;
  /** Optional bullet list, rendered under the paragraph. */
  list?: { en: string[]; mr: string[] };
};

type Props = {
  lang: Lang;
  eyebrow: L;
  title: L;
  intro: L;
  /** Human-readable revision date, e.g. "5 October 2026". */
  updated: string;
  trail: Crumb[];
  blocks: LegalBlock[];
};

/**
 * Shared shell for the Privacy Policy and Terms pages.
 *
 * Legal pages are read for what they *do not* claim as much as for what they
 * do, so the structure is deliberately plain: one column, a real heading per
 * clause, anchor ids so paragraphs can be linked to directly.
 */
export function LegalPage({ lang, eyebrow, title, intro, updated, trail, blocks }: Props) {
  return (
    <>
      <PageHeader lang={lang} eyebrow={eyebrow} title={title} intro={intro} trail={trail} />

      <Section tone="paper">
        <div className="max-w-prose">
          <p className="text-sm text-ink-muted">
            {pick({ en: 'Last updated', mr: 'शेवटचे अद्ययावत' }, lang)}: {updated}
          </p>

          <div className="mt-10 flex flex-col gap-10">
            {blocks.map((block, index) => (
              <section key={block.id} id={block.id} className="scroll-mt-header">
                <h2 className="font-heading text-xl leading-snug text-ink">
                  <span aria-hidden="true" className="mr-2 text-grain-600">
                    {index + 1}.
                  </span>
                  {pick(block.title, lang)}
                </h2>

                {block.body ? (
                  <p className="mt-4 text-base leading-relaxed text-ink-soft">
                    {pick(block.body, lang)}
                  </p>
                ) : null}

                {block.list ? (
                  <ul className="mt-4 flex flex-col gap-2.5 text-base leading-relaxed text-ink-soft">
                    {block.list[lang].map((item) => (
                      <li key={item} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-grain-500"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
