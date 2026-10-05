'use client';

import { useState } from 'react';
import { pick, type Lang } from '@/lib/i18n';
import type { Faq } from '@/content/faqs';
import { ChevronDownIcon } from '@/components/icons';

/**
 * Accessible FAQ accordion.
 *
 * Built on native <details>/<summary>, which gives keyboard operation, screen
 * reader semantics and in-page find support for free. React only tracks the
 * open state so the chevron can rotate.
 */
export function FaqList({ items, lang }: { items: Faq[]; lang: Lang }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <details
            key={item.id}
            open={isOpen}
            onToggle={(event) => {
              // onToggle also fires when React sets `open`, so only react to
              // genuine user toggles to avoid fighting the controlled state.
              const next = (event.currentTarget as HTMLDetailsElement).open;
              if (next !== isOpen) setOpen(next ? item.id : null);
            }}
            className="group"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-field-700 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
              <h3 className="font-heading text-base leading-snug text-ink sm:text-lg">
                {pick(item.question, lang)}
              </h3>
              <ChevronDownIcon
                className={[
                  'mt-0.5 h-5 w-5 shrink-0 text-field-700 transition-transform duration-200',
                  isOpen ? 'rotate-180' : '',
                ].join(' ')}
              />
            </summary>

            <div className="pb-5 pr-8">
              <p className="text-sm leading-relaxed text-ink-soft sm:text-base">
                {pick(item.answer, lang)}
              </p>
            </div>
          </details>
        );
      })}
    </div>
  );
}
