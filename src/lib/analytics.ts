/**
 * Conversion tracking (SRS §16).
 *
 * Only business-meaningful actions are tracked: calls, WhatsApp, directions,
 * quote/contact submissions and product enquiries. No personal information is
 * ever passed to analytics — values are limited to an action label plus, at
 * most, a product or service name.
 *
 * GA4 is loaded only when NEXT_PUBLIC_GA_ID is set, so no third-party script
 * runs until analytics is deliberately switched on.
 */
import { site } from '@/content/site';

export type ConversionAction =
  | 'call_click'
  | 'whatsapp_click'
  | 'email_click'
  | 'directions_click'
  | 'quote_click'
  | 'quote_submit'
  | 'contact_submit'
  | 'product_enquiry'
  | 'service_enquiry';

type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fire an analytics event if GA4 is configured. Safe to call anywhere. */
export function track(action: ConversionAction, params: Params = {}): void {
  if (typeof window === 'undefined') return;
  if (!site.analytics.gaId) return;

  const payload: Params = { ...params };
  // Belt and braces: never let anything resembling a contact detail through.
  for (const key of Object.keys(payload)) {
    if (/phone|mobile|email|name|message/i.test(key)) delete payload[key];
  }

  window.gtag?.('event', action, payload);
}
