import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'accent' | 'whatsapp' | 'outline' | 'ghost' | 'onDark';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60';

const variants: Record<Variant, string> = {
  primary:
    'bg-field-700 text-white hover:bg-field-800 active:bg-field-900 focus-visible:ring-field-700 focus-visible:ring-offset-paper',
  accent:
    'bg-grain-400 text-ink hover:bg-grain-300 active:bg-grain-500 focus-visible:ring-grain-500 focus-visible:ring-offset-paper',
  whatsapp:
    'bg-[#128C7E] text-white hover:bg-[#0e7568] active:bg-[#0b5f55] focus-visible:ring-[#128C7E] focus-visible:ring-offset-paper',
  outline:
    'border border-field-700/35 bg-transparent text-field-800 hover:border-field-700 hover:bg-field-50 active:bg-field-100 focus-visible:ring-field-700 focus-visible:ring-offset-paper',
  ghost:
    'bg-transparent text-field-800 underline decoration-field-700/40 decoration-1 underline-offset-4 hover:decoration-field-700 focus-visible:ring-field-700 focus-visible:ring-offset-paper',
  onDark:
    'border border-white/35 bg-white/5 text-white hover:border-white/70 hover:bg-white/10 active:bg-white/15 focus-visible:ring-white focus-visible:ring-offset-field-900',
};

/** Sizes carry a minimum height so every button clears a 44px touch target. */
const sizes: Record<Size, string> = {
  md: 'min-h-[2.75rem] px-4 py-2.5 text-sm',
  lg: 'min-h-[3rem] px-5 py-3 text-base',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

/** Anchor styled as a button — used for tel:, WhatsApp and external links. */
export function ButtonLink({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: CommonProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  'aria-label'?: string;
}) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  const classes = [base, variants[variant], sizes[size], className].join(' ');

  if (external) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

/** Next.js Link styled as a button — used for in-site navigation. */
export function ButtonInternal({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: CommonProps & { href: string; 'aria-label'?: string }) {
  return (
    <Link href={href} className={[base, variants[variant], sizes[size], className].join(' ')} {...rest}>
      {children}
    </Link>
  );
}

/** Native button styled consistently with the links above. */
export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={[base, variants[variant], sizes[size], className].join(' ')} {...rest}>
      {children}
    </button>
  );
}

export const buttonClasses = { base, variants, sizes };
