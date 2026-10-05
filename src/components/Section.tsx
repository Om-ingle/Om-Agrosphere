import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Vertical rhythm. `tight` for stacked related sections. */
  spacing?: 'tight' | 'normal' | 'loose';
  /** Background treatment. */
  tone?: 'paper' | 'dim' | 'deep' | 'dark' | 'field';
  id?: string;
  className?: string;
  /** Renders a decorative hairline along the top edge. */
  divider?: boolean;
};

const tones: Record<NonNullable<Props['tone']>, string> = {
  paper: 'bg-paper text-ink',
  dim: 'bg-paper-dim text-ink',
  deep: 'bg-paper-deep text-ink',
  dark: 'bg-field-900 bg-weave text-field-100',
  field: 'bg-field-800 bg-weave text-white',
};

const spacings: Record<NonNullable<Props['spacing']>, string> = {
  tight: 'py-12 sm:py-14',
  normal: 'py-16 sm:py-20',
  loose: 'py-20 sm:py-28',
};

/**
 * Consistent horizontal gutters and vertical rhythm for every band of content.
 * Keeping this in one place is what stops the page from drifting out of
 * alignment as sections are added.
 */
export function Section({
  children,
  spacing = 'normal',
  tone = 'paper',
  id,
  className = '',
  divider = false,
}: Props) {
  return (
    <section
      id={id}
      className={[
        'relative',
        tones[tone],
        spacings[spacing],
        divider ? 'border-t border-ink/10' : '',
        id ? 'scroll-mt-header' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
