import { href, pick, type Lang } from '@/lib/i18n';
import type { Product } from '@/content/products';
import { Photo } from '@/components/Photo';
import { ButtonInternal } from '@/components/Button';
import { CheckIcon } from '@/components/icons';

/**
 * Product card. Kept deliberately factual: name, category, a short description,
 * and the confirmed intended uses. Package sizes and grades are not shown
 * because the business has not confirmed them yet — the card routes the
 * visitor to an enquiry instead of implying a specification we cannot stand behind.
 */
export function ProductCard({ product, lang }: { product: Product; lang: Lang }) {
  const quoteHref = `${href(lang, 'quote')}?interest=${encodeURIComponent(product.inquiryValue)}`;

  return (
    <article
      id={product.id}
      className="flex h-full flex-col overflow-hidden rounded border border-ink/10 bg-white shadow-card scroll-mt-header"
    >
      <div className="relative">
        <Photo
          photoKey={product.photoKey}
          lang={lang}
          className="aspect-[16/11] w-full"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-field-800/95 px-2.5 py-1 text-[0.68rem] font-semibold tracking-wide text-white uppercase">
          {pick(product.badge, lang)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-heading text-xl text-ink">
          {pick(product.name, lang)}
        </h3>

        {/* Marathi name shown alongside in English mode, and vice versa —
            customers often know the product by one name only. */}
        {lang === 'en' ? (
          <p lang="mr" className="mt-1 text-sm text-ink-muted">
            {product.name.mr}
          </p>
        ) : (
          <p lang="en" className="mt-1 text-sm text-ink-muted">
            {product.name.en}
          </p>
        )}

        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          {pick(product.summary, lang)}
        </p>

        {product.uses[lang].length > 0 ? (
          <ul className="mt-4 flex flex-col gap-2">
            {product.uses[lang].map((use) => (
              <li key={use} className="flex items-start gap-2 text-sm text-ink-soft">
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-field-600" />
                {use}
              </li>
            ))}
          </ul>
        ) : null}

        {product.specs.length > 0 ? (
          <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-ink/10 pt-5 text-sm">
            {product.specs.map((spec) => (
              <div key={spec.label.en}>
                <dt className="font-semibold text-ink-soft">{pick(spec.label, lang)}</dt>
                <dd className="mt-0.5 text-ink-muted">{pick(spec.value, lang)}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {product.packaging[lang].length > 0 ? (
          <div className="mt-5 border-t border-ink/10 pt-5">
            <h4 className="text-sm font-semibold text-ink-soft">
              {pick({ en: 'Packaging', mr: 'पॅकिंग' }, lang)}
            </h4>
            <ul className="mt-2 flex flex-col gap-1.5 text-sm text-ink-muted">
              {product.packaging[lang].map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-auto pt-6">
          <ButtonInternal href={quoteHref} size="lg" className="w-full sm:w-auto">
            {pick({ en: 'Enquire for bulk rates', mr: 'घाऊक दरासाठी चौकशी करा' }, lang)}
          </ButtonInternal>

          {product.specs.length === 0 && product.packaging[lang].length === 0 ? (
            <p className="mt-3 text-xs leading-relaxed text-ink-muted">
              {pick(
                {
                  en: 'Pack sizes and grades are still being confirmed. Ask us and we will tell you exactly what is available for your quantity.',
                  mr: 'पॅकिंगचे आकार व प्रकार अजून निश्चित होत आहेत. चौकशी करा, तुमच्या प्रमाणासाठी नेमके काय उपलब्ध आहे ते आम्ही सांगू.',
                },
                lang,
              )}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
