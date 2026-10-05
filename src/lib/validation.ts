/**
 * Inquiry validation — shared by the browser form and the server API route.
 *
 * The server re-runs this in full. Client-side validation is a convenience for
 * the visitor; it is never the thing that keeps bad data out.
 */
import { z } from 'zod';

export const USER_TYPES = [
  'farmer',
  'trader',
  'wholesale-buyer',
  'retail-buyer',
  'commercial-buyer',
] as const;

export const UNITS = ['kg', 'quintal', 'ton'] as const;

/** Crop/product interests, matching `inquiryInterests` in content/products.ts. */
export const INTERESTS = [
  'Wheat',
  'Jowar',
  'Bajra',
  'Tur',
  'Chana',
  'Moong',
  'Urad',
  'Corn Grit',
  'Spices',
] as const;

/**
 * Indian mobile numbers: 10 digits starting 6–9, optionally prefixed with
 * +91 / 91 / 0. Spaces, hyphens and brackets are tolerated on input.
 */
const MOBILE_RE = /^(?:\+?91[\s-]?|0)?[6-9]\d{9}$/;

/** Collapse a user-typed number down to its bare 10 digits. */
export function normaliseMobile(raw: string): string {
  const stripped = raw.replace(/[\s\-()]/g, '');
  return stripped.replace(/^(?:\+?91|0)/, '');
}

/** Strip control characters and cap length. Runs before anything is stored or emailed. */
export function sanitiseText(raw: string, maxLength: number): string {
  return (
    raw
      // eslint-disable-next-line no-control-regex
      .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
      .replace(/\r\n/g, '\n')
      .trim()
      .slice(0, maxLength)
  );
}

const text = (max: number) =>
  z
    .string()
    .transform((value) => sanitiseText(value, max))
    .pipe(z.string().max(max));

export const inquirySchema = z.object({
  name: text(80).pipe(
    z
      .string()
      .min(2, 'Please enter your name.')
      .max(80, 'Please use 80 characters or fewer.'),
  ),

  mobile: z
    .string()
    .transform((value) => sanitiseText(value, 20))
    .refine((value) => MOBILE_RE.test(value.replace(/[\s\-()]/g, '')), {
      message: 'Enter a 10-digit Indian mobile number.',
    }),

  userType: z.enum(USER_TYPES),

  interests: z
    .array(z.enum(INTERESTS))
    .min(1, 'Select at least one crop or product.')
    .max(INTERESTS.length),

  quantity: z
    .string()
    .transform((value) => sanitiseText(value, 12))
    .refine((value) => value === '' || /^\d{1,9}(\.\d{1,2})?$/.test(value), {
      message: 'Enter quantity as a number, for example 250.',
    })
    .refine((value) => value === '' || Number(value) > 0, {
      message: 'Quantity must be greater than zero.',
    }),

  unit: z.enum(UNITS),

  /** ISO `yyyy-mm-dd` from the date input. */
  preferredDate: z
    .string()
    .transform((value) => sanitiseText(value, 10))
    .refine((value) => value === '' || /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: 'Enter a valid date.',
    })
    .refine(
      (value) => {
        if (value === '') return true;
        const parsed = new Date(`${value}T00:00:00Z`);
        if (Number.isNaN(parsed.getTime())) return false;
        // Reject dates the calendar rolls over (e.g. 2026-02-30).
        if (parsed.toISOString().slice(0, 10) !== value) return false;
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        return parsed >= today;
      },
      { message: 'Choose today or a future date.' },
    ),

  message: text(1200),

  /** Must be ticked — the visitor has been told how their data is used. */
  consent: z.literal(true, {
    errorMap: () => ({ message: 'Please confirm you agree to how we use your details.' }),
  }),

  /** Honeypot. Real people never fill this in; bots usually do. */
  company: z.string().max(0).optional().default(''),

  /** Milliseconds the visitor spent on the form before submitting. */
  elapsedMs: z.coerce.number().int().nonnegative().max(86_400_000),

  /** reCAPTCHA v3 token, when reCAPTCHA is configured. */
  recaptchaToken: z.string().max(4096).optional().default(''),

  /** Which page the enquiry came from, for the notification email. */
  source: z.string().max(64).optional().default('website'),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type Inquiry = z.output<typeof inquirySchema>;

/** Human-readable field errors keyed by form field, for inline display. */
export type FieldErrors = Partial<Record<keyof InquiryInput | 'form', string>>;

export function collectFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = (issue.path[0] ?? 'form') as keyof InquiryInput;
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}
