'use client';

import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { track, type ConversionAction } from '@/lib/analytics';

type Props = {
  href: string;
  action: ConversionAction;
  params?: Record<string, string>;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'>;

/**
 * An anchor that records a conversion event before navigating away.
 *
 * Used for the actions the SRS asks us to measure — calls, WhatsApp, email and
 * directions. Kept as a plain <a> so tel:/mailto:/wa.me links work even when
 * JavaScript is unavailable.
 */
export function TrackedLink({ href, action, params, children, ...rest }: Props) {
  return (
    <a href={href} onClick={() => track(action, params)} {...rest}>
      {children}
    </a>
  );
}
