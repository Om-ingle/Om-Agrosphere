'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useId, useMemo, useRef, useState } from 'react';

import { href, pick, type L, type Lang } from '@/lib/i18n';
import { inquiryInterests } from '@/content/products';
import { site } from '@/content/site';
import { track } from '@/lib/analytics';
import {
  UNITS,
  USER_TYPES,
  collectFieldErrors,
  inquirySchema,
  normaliseMobile,
  type FieldErrors,
  type InquiryInput,
} from '@/lib/validation';
import { buildInquiryMessage } from '@/lib/inquiry-message';
import { Button, ButtonLink } from '@/components/Button';
import { CheckIcon, WhatsAppIcon } from '@/components/icons';

/** Copy for the form, in both languages. */
const copy = {
  name: { en: 'Your name', mr: 'तुमचे नाव' },
  namePlaceholder: { en: 'e.g. Sunil Patil', mr: 'उदा. सुनील पाटील' },
  mobile: { en: 'Mobile number', mr: 'मोबाइल क्रमांक' },
  mobileHint: {
    en: '10-digit Indian mobile number. We use this only to reply to your enquiry.',
    mr: '१० अंकी भारतीय मोबाइल क्रमांक. तुमच्या चौकशीचे उत्तर देण्यासाठीच याचा वापर करतो.',
  },
  userType: { en: 'I am a', mr: 'मी आहे' },
  interests: { en: 'Crop or product you need', mr: 'तुम्हाला हवे असलेले पीक किंवा उत्पादन' },
  interestsHint: { en: 'Select all that apply.', mr: 'लागू असणारे सर्व निवडा.' },
  quantity: { en: 'Quantity', mr: 'प्रमाण' },
  quantityPlaceholder: { en: 'e.g. 50', mr: 'उदा. ५०' },
  unit: { en: 'Unit', mr: 'एकक' },
  preferredDate: { en: 'Preferred service date', mr: 'पसंतीची प्रक्रिया तारीख' },
  message: { en: 'Message or notes', mr: 'संदेश किंवा टिप्पणी' },
  messagePlaceholder: {
    en: 'Anything else we should know — moisture, grade your buyer asked for, how the material will arrive.',
    mr: 'आणखी काही सांगायचे असल्यास — ओलावा, खरेदीदाराने मागितलेला प्रकार, माल कसा येईल.',
  },
  consent: {
    en: 'I agree that Om Agrosphere may use these details to respond to my enquiry.',
    mr: 'माझ्या चौकशीचे उत्तर देण्यासाठी ओम अ‍ॅग्रोस्फिअर ही माहिती वापरू शकते, यास मी संमती देतो.',
  },
  consentLink: { en: 'Read our Privacy Policy', mr: 'आमचे गोपनीयता धोरण वाचा' },
  submit: { en: 'Send enquiry', mr: 'चौकशी पाठवा' },
  requiredNote: {
    en: 'Fields marked with * are required.',
    mr: '* चिन्हांकित माहिती आवश्यक आहे.',
  },
  successTitle: { en: 'Thank you — your enquiry has been sent.', mr: 'धन्यवाद — तुमची चौकशी पाठवली गेली आहे.' },
  successBody: {
    en: 'We have received your details and will get back to you. For a faster reply, send the same details on WhatsApp — it is already written out for you.',
    mr: 'तुमची माहिती आम्हाला मिळाली आहे, आम्ही संपर्क करू. झटपट उत्तरासाठी हीच माहिती व्हॉट्सअ‍ॅपवर पाठवा — ती तुमच्यासाठी तयार लिहिलेली आहे.',
  },
  successWhatsApp: { en: 'Continue on WhatsApp', mr: 'व्हॉट्सअ‍ॅपवर पुढे जा' },
  successAgain: { en: 'Send another enquiry', mr: 'अजून एक चौकशी पाठवा' },
  summaryTitle: { en: 'What you sent', mr: 'तुम्ही पाठवलेली माहिती' },
} as const;

const unitLabels: Record<(typeof UNITS)[number], { en: string; mr: string }> = {
  kg: { en: 'Kg', mr: 'किलो' },
  quintal: { en: 'Quintal', mr: 'क्विंटल' },
  ton: { en: 'Ton', mr: 'टन' },
};

const userTypeLabels: Record<(typeof USER_TYPES)[number], { en: string; mr: string }> = {
  farmer: { en: 'Farmer', mr: 'शेतकरी' },
  trader: { en: 'Trader', mr: 'व्यापारी' },
  'wholesale-buyer': { en: 'Wholesale buyer', mr: 'घाऊक खरेदीदार' },
  'retail-buyer': { en: 'Retail buyer', mr: 'किरकोळ खरेदीदार' },
  'commercial-buyer': { en: 'Commercial buyer', mr: 'व्यावसायिक खरेदीदार' },
};

/** Submission-level failures, keyed by the `error` code the API returns. */
const errorMessages: Record<string, L> = {  'rate-limited': {
    en: 'Too many enquiries have been sent from this connection. Please wait a few minutes, or contact us directly.',
    mr: 'या कनेक्शनवरून खूप चौकशी पाठवल्या गेल्या आहेत. कृपया काही मिनिटे थांबा, किंवा थेट संपर्क करा.',
  },
  'spam-check': {
    en: 'We could not verify that this submission came from a person. Please try again, or contact us directly.',
    mr: 'ही चौकशी व्यक्तीकडून आली आहे याची खात्री करता आली नाही. कृपया पुन्हा प्रयत्न करा, किंवा थेट संपर्क करा.',
  },
  'delivery-failed': {
    en: 'We could not deliver your enquiry just now. Please send it on WhatsApp or call us — your details are ready below.',
    mr: 'आत्ता तुमची चौकशी पोहोचवता आली नाही. कृपया व्हॉट्सअ‍ॅपवर पाठवा किंवा फोन करा — तुमची माहिती खाली तयार आहे.',
  },
};

/** Shown when a failure has no specific wording, or none we recognise. */
const genericError: L = {
  en: 'Something went wrong while sending your enquiry. Please try again, or contact us directly.',
  mr: 'चौकशी पाठवताना काहीतरी चुकले. कृपया पुन्हा प्रयत्न करा, किंवा थेट संपर्क करा.',
};

/**
 * Per-field error wording, in both languages.
 *
 * The schema in `lib/validation.ts` carries English messages, because that is
 * what the server logs and what the API returns. Showing those directly would
 * leave a Marathi visitor reading English errors, so every field the visitor
 * can get wrong is translated here and this copy is what actually renders.
 */
const fieldErrorCopy: Record<string, L> = {
  name: { en: 'Please enter your name.', mr: 'कृपया तुमचे नाव लिहा.' },
  mobile: {
    en: 'Enter a 10-digit Indian mobile number, for example 98765 43210.',
    mr: '१० अंकी भारतीय मोबाइल क्रमांक लिहा, उदा. ९८७६५ ४३२१०.',
  },
  userType: { en: 'Choose who you are.', mr: 'तुम्ही कोण आहात ते निवडा.' },
  interests: {
    en: 'Select at least one crop or product.',
    mr: 'किमान एक पीक किंवा उत्पादन निवडा.',
  },
  quantity: {
    en: 'Enter the quantity as a number, for example 50.',
    mr: 'प्रमाण आकड्यात लिहा, उदा. ५०.',
  },
  unit: { en: 'Choose a unit.', mr: 'एकक निवडा.' },
  preferredDate: {
    en: 'Choose today or a future date.',
    mr: 'आजची किंवा त्यानंतरची तारीख निवडा.',
  },
  consent: {
    en: 'Please confirm that we may use your details to answer your enquiry.',
    mr: 'तुमच्या चौकशीचे उत्तर देण्यासाठी माहिती वापरण्यास संमती द्या.',
  },
};

/** Localised wording for a field error, falling back to the schema's message. */
function errorText(key: string, fallback: string | undefined, lang: Lang): string {
  if (!fallback) return '';
  const copy = fieldErrorCopy[key];
  return copy ? pick(copy, lang) : fallback;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

type Props = {
  lang: Lang;
  /** Recorded in the notification email so the owner knows where it came from. */
  source: 'quote' | 'contact';
  /** `compact` drops the intro copy — used inside the Contact page column. */
  compact?: boolean;
};

export function InquiryForm({ lang, source, compact = false }: Props) {
  const uid = useId();
  const field = (name: string) => `${uid}-${name}`;

  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [sentSummary, setSentSummary] = useState<string | null>(null);

  const [values, setValues] = useState({
    name: '',
    mobile: '',
    userType: 'farmer' as (typeof USER_TYPES)[number],
    interests: [] as string[],
    quantity: '',
    unit: 'quintal' as (typeof UNITS)[number],
    preferredDate: '',
    message: '',
    consent: false,
    company: '', // honeypot
  });

  // Time the form was first shown, for the submit-timing spam check.
  const openedAt = useRef(Date.now());
  const formRef = useRef<HTMLFormElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  /**
   * Preselect the product when the visitor arrived from a product card
   * (`/quote?interest=Tur%20Dal`). Read after mount rather than with
   * useSearchParams, which would push every page out of static rendering.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const requested = new URLSearchParams(window.location.search).get('interest');
    if (!requested) return;
    const match = inquiryInterests.find((item) => item.value === requested);
    if (match) {
      setValues((current) => ({ ...current, interests: [match.value] }));
    }
  }, []);

  // Send keyboard focus to the error summary so screen reader users hear what failed.
  useEffect(() => {
    if (Object.keys(errors).length > 0 || formError) {
      errorSummaryRef.current?.focus();
    }
  }, [errors, formError]);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const toggleInterest = (value: string) => {
    setValues((current) => ({
      ...current,
      interests: current.interests.includes(value)
        ? current.interests.filter((item) => item !== value)
        : [...current.interests, value],
    }));
  };

  /** Fetch a fresh reCAPTCHA token, when reCAPTCHA is configured. */
  const getRecaptchaToken = async (): Promise<string> => {
    const siteKey = site.recaptchaSiteKey;
    if (!siteKey) return '';

    const grecaptcha = (
      window as unknown as {
        grecaptcha?: {
          ready?: (callback: () => void) => void;
          execute?: (key: string, options: { action: string }) => Promise<string>;
        };
      }
    ).grecaptcha;

    if (!grecaptcha?.execute) return '';

    try {
      await new Promise<void>((resolve) => {
        if (grecaptcha.ready) grecaptcha.ready(() => resolve());
        else resolve();
      });
      return (await grecaptcha.execute(siteKey, { action: 'inquiry' })) ?? '';
    } catch {
      // A token we cannot obtain is left empty; the server decides what to do.
      return '';
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;

    setFormError(null);
    setErrors({});

    const candidate: InquiryInput = {
      name: values.name,
      mobile: values.mobile,
      userType: values.userType,
      interests: values.interests as InquiryInput['interests'],
      quantity: values.quantity,
      unit: values.unit,
      preferredDate: values.preferredDate,
      message: values.message,
      consent: values.consent as true,
      company: values.company,
      elapsedMs: Date.now() - openedAt.current,
      recaptchaToken: '',
      source,
    };

    // Client-side pass first, so obvious mistakes never cost a round trip.
    const local = inquirySchema.safeParse(candidate);
    if (!local.success) {
      setErrors(collectFieldErrors(local.error));
      return;
    }

    setStatus('submitting');

    try {
      const recaptchaToken = await getRecaptchaToken();

      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...local.data, recaptchaToken }),
      });

      const result = (await response.json().catch(() => null)) as
        | {
            ok?: boolean;
            whatsappUrl?: string | null;
            error?: string;
            fields?: FieldErrors;
          }
        | null;

      if (response.ok && result?.ok) {
        track(source === 'quote' ? 'quote_submit' : 'contact_submit', { source: 'form' });
        setSentSummary(buildInquiryMessage(local.data, { redactMobile: true }));
        setWhatsappUrl(result.whatsappUrl ?? null);
        setStatus('success');

        // Return the form to a clean slate for the "send another" flow.
        setValues((current) => ({
          ...current,
          name: '',
          mobile: '',
          interests: [],
          quantity: '',
          preferredDate: '',
          message: '',
          consent: false,
        }));
        openedAt.current = Date.now();
        return;
      }

      if (response.status === 400 && result?.fields) {
        setErrors(result.fields);
        setStatus('idle');
        return;
      }

      setFormError(result?.error ?? 'generic');
      setStatus('error');
    } catch {
      // Network failure — never surface the underlying error to the visitor.
      setFormError('generic');
      setStatus('error');
    }
  }

  // ── Success state ─────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded border border-field-600/30 bg-field-50 p-6 sm:p-8"
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-field-700 text-white">
            <CheckIcon className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-heading text-xl text-ink">{pick(copy.successTitle, lang)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {pick(copy.successBody, lang)}
            </p>
          </div>
        </div>

        {sentSummary ? (
          <details className="mt-6 rounded border border-ink/10 bg-white">
            <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-ink-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-field-700">
              {pick(copy.summaryTitle, lang)}
            </summary>
            <pre className="overflow-x-auto border-t border-ink/10 px-4 py-3 text-xs leading-relaxed whitespace-pre-wrap text-ink-soft">
              {sentSummary}
            </pre>
          </details>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          {whatsappUrl ? (
            <ButtonLink
              href={whatsappUrl}
              variant="whatsapp"
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {pick(copy.successWhatsApp, lang)}
            </ButtonLink>
          ) : null}

          <Button variant="outline" size="lg" onClick={() => setStatus('idle')}>
            {pick(copy.successAgain, lang)}
          </Button>
        </div>
      </div>
    );
  }

  const errorKeys = Object.keys(errors);
  const busy = status === 'submitting';

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* reCAPTCHA is loaded only when the business configures a site key. */}
      {site.recaptchaSiteKey ? (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${site.recaptchaSiteKey}`}
          strategy="lazyOnload"
        />
      ) : null}

      {/* Error summary — focused on failure so it is announced. */}
      <div
        ref={errorSummaryRef}
        tabIndex={-1}
        aria-live="assertive"
        className={errorKeys.length > 0 || formError ? 'rounded border border-red-600/40 bg-red-50 p-4' : 'sr-only'}
      >
        {errorKeys.length > 0 || formError ? (
          <>
            <p className="text-sm font-semibold text-red-800">
              {pick(
                { en: 'Please check the highlighted fields.', mr: 'कृपया ठळक केलेली माहिती तपासा.' },
                lang,
              )}
            </p>
            <ul className="mt-2 flex list-inside list-disc flex-col gap-1 text-sm text-red-800">
              {formError ? (
                <li>{pick(errorMessages[formError] ?? genericError, lang)}</li>
              ) : null}
              {errorKeys.map((key) => {
                const text = errorText(key, errors[key as keyof FieldErrors], lang);
                return text ? <li key={key}>{text}</li> : null;
              })}
            </ul>
          </>
        ) : null}
      </div>

      {/* Failure state with direct fallbacks (SRS §7.5 failure behaviour). */}
      {status === 'error' && formError ? (
        <div className="rounded border border-red-600/30 bg-white p-5">
          <h3 className="font-heading text-lg text-ink">
            {pick(
              { en: 'We could not send your enquiry', mr: 'तुमची चौकशी पाठवता आली नाही' },
              lang,
            )}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            {pick(errorMessages[formError] ?? genericError, lang)}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {whatsappHrefForFallback(sentSummary, values, lang) ? (
              <ButtonLink
                href={whatsappHrefForFallback(sentSummary, values, lang)!}
                variant="whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {pick({ en: 'Send on WhatsApp', mr: 'व्हॉट्सअ‍ॅपवर पाठवा' }, lang)}
              </ButtonLink>
            ) : null}
            <ButtonLink
              href={`mailto:${site.email}`}
              variant="outline"
              target="_self"
            >
              {site.email}
            </ButtonLink>
            <Button type="submit" variant="outline">
              {pick({ en: 'Try again', mr: 'पुन्हा प्रयत्न करा' }, lang)}
            </Button>
          </div>
        </div>
      ) : null}

      {!compact ? (
        <p className="text-sm text-ink-muted">{pick(copy.requiredNote, lang)}</p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor={field('name')} className="field-label">
            {pick(copy.name, lang)} <span className="text-red-700">*</span>
          </label>
          <input
            id={field('name')}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={80}
            placeholder={pick(copy.namePlaceholder, lang)}
            value={values.name}
            onChange={(event) => setValues((c) => ({ ...c, name: event.target.value }))}
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? field('name-error') : undefined}
            className="field-control"
          />
          {errors.name ? (
            <p id={field('name-error')} className="field-error">
              errorText('name', errors.name, lang)
            </p>
          ) : null}
        </div>

        {/* Mobile */}
        <div>
          <label htmlFor={field('mobile')} className="field-label">
            {pick(copy.mobile, lang)} <span className="text-red-700">*</span>
          </label>
          <input
            id={field('mobile')}
            name="mobile"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            required
            maxLength={20}
            placeholder="98765 43210"
            value={values.mobile}
            onChange={(event) => setValues((c) => ({ ...c, mobile: event.target.value }))}
            onBlur={(event) =>
              setValues((c) => ({ ...c, mobile: normaliseMobile(event.target.value) }))
            }
            aria-invalid={errors.mobile ? 'true' : undefined}
            aria-describedby={errors.mobile ? field('mobile-error') : field('mobile-hint')}
            className="field-control"
          />
          {errors.mobile ? (
            <p id={field('mobile-error')} className="field-error">
              errorText('mobile', errors.mobile, lang)
            </p>
          ) : (
            <p id={field('mobile-hint')} className="field-hint">
              {pick(copy.mobileHint, lang)}
            </p>
          )}
        </div>
      </div>

      {/* User type */}
      <fieldset>
        <legend className="field-label">
          {pick(copy.userType, lang)} <span className="text-red-700">*</span>
        </legend>
        <div className="mt-1 flex flex-wrap gap-2">
          {USER_TYPES.map((type) => (
            <label
              key={type}
              className={[
                'cursor-pointer rounded border px-3.5 py-2 text-sm transition-colors',
                'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-field-700 has-[:focus-visible]:ring-offset-2',
                values.userType === type
                  ? 'border-field-700 bg-field-700 font-semibold text-white'
                  : 'border-ink/20 bg-white text-ink-soft hover:border-field-600/50 hover:bg-field-50',
              ].join(' ')}
            >
              <input
                type="radio"
                name="userType"
                value={type}
                checked={values.userType === type}
                onChange={() => setValues((c) => ({ ...c, userType: type }))}
                className="sr-only"
              />
              {pick(userTypeLabels[type], lang)}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Interests */}
      <fieldset aria-describedby={errors.interests ? field('interests-error') : field('interests-hint')}>
        <legend className="field-label">
          {pick(copy.interests, lang)} <span className="text-red-700">*</span>
        </legend>
        <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {inquiryInterests.map((item) => {
            const checked = values.interests.includes(item.value);
            return (
              <label
                key={item.value}
                className={[
                  'flex cursor-pointer items-center gap-2.5 rounded border px-3 py-2.5 text-sm transition-colors',
                  'has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-field-700 has-[:focus-visible]:ring-offset-2',
                  checked
                    ? 'border-field-600 bg-field-50 font-semibold text-field-800'
                    : 'border-ink/20 bg-white text-ink-soft hover:border-field-600/50',
                ].join(' ')}
              >
                <input
                  type="checkbox"
                  name="interests"
                  value={item.value}
                  checked={checked}
                  onChange={() => toggleInterest(item.value)}
                  className="h-4 w-4 shrink-0 accent-field-700"
                />
                {pick(item.label, lang)}
              </label>
            );
          })}
        </div>
        {errors.interests ? (
          <p id={field('interests-error')} className="field-error">
            errorText('interests', errors.interests, lang)
          </p>
        ) : (
          <p id={field('interests-hint')} className="field-hint">
            {pick(copy.interestsHint, lang)}
          </p>
        )}
      </fieldset>

      {/* Quantity + unit */}
      <div className="grid gap-5 sm:grid-cols-3">
        <div className="sm:col-span-2">
          <label htmlFor={field('quantity')} className="field-label">
            {pick(copy.quantity, lang)}{' '}
            <span className="font-normal text-ink-muted">({pick({ en: 'optional', mr: 'ऐच्छिक' }, lang)})</span>
          </label>
          <input
            id={field('quantity')}
            name="quantity"
            type="text"
            inputMode="decimal"
            maxLength={12}
            placeholder={pick(copy.quantityPlaceholder, lang)}
            value={values.quantity}
            onChange={(event) =>
              setValues((c) => ({
                ...c,
                // Keep the field numeric as the visitor types.
                quantity: event.target.value.replace(/[^\d.]/g, ''),
              }))
            }
            aria-invalid={errors.quantity ? 'true' : undefined}
            aria-describedby={errors.quantity ? field('quantity-error') : undefined}
            className="field-control"
          />
          {errors.quantity ? (
            <p id={field('quantity-error')} className="field-error">
              errorText('quantity', errors.quantity, lang)
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor={field('unit')} className="field-label">
            {pick(copy.unit, lang)}
          </label>
          <select
            id={field('unit')}
            name="unit"
            value={values.unit}
            onChange={(event) =>
              setValues((c) => ({ ...c, unit: event.target.value as (typeof UNITS)[number] }))
            }
            className="field-control"
          >
            {UNITS.map((unit) => (
              <option key={unit} value={unit}>
                {pick(unitLabels[unit], lang)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Preferred date */}
      <div className="sm:max-w-xs">
        <label htmlFor={field('date')} className="field-label">
          {pick(copy.preferredDate, lang)}{' '}
          <span className="font-normal text-ink-muted">({pick({ en: 'optional', mr: 'ऐच्छिक' }, lang)})</span>
        </label>
        <input
          id={field('date')}
          name="preferredDate"
          type="date"
          min={today}
          value={values.preferredDate}
          onChange={(event) => setValues((c) => ({ ...c, preferredDate: event.target.value }))}
          aria-invalid={errors.preferredDate ? 'true' : undefined}
          aria-describedby={errors.preferredDate ? field('date-error') : undefined}
          className="field-control"
        />
        {errors.preferredDate ? (
          <p id={field('date-error')} className="field-error">
            errorText('preferredDate', errors.preferredDate, lang)
          </p>
        ) : null}
      </div>

      {/* Message */}
      <div>
        <label htmlFor={field('message')} className="field-label">
          {pick(copy.message, lang)}{' '}
          <span className="font-normal text-ink-muted">({pick({ en: 'optional', mr: 'ऐच्छिक' }, lang)})</span>
        </label>
        <textarea
          id={field('message')}
          name="message"
          rows={4}
          maxLength={1200}
          placeholder={pick(copy.messagePlaceholder, lang)}
          value={values.message}
          onChange={(event) => setValues((c) => ({ ...c, message: event.target.value }))}
          className="field-control resize-y"
        />
      </div>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor={field('company')}>Company</label>
        <input
          id={field('company')}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(event) => setValues((c) => ({ ...c, company: event.target.value }))}
        />
      </div>

      {/* Consent */}
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-soft">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(event) => setValues((c) => ({ ...c, consent: event.target.checked }))}
            aria-invalid={errors.consent ? 'true' : undefined}
            aria-describedby={errors.consent ? field('consent-error') : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 accent-field-700"
          />
          <span>
            {pick(copy.consent, lang)}{' '}
            <Link
              href={href(lang, 'privacy')}
              className="font-semibold text-field-700 underline decoration-grain-500 underline-offset-2"
            >
              {pick(copy.consentLink, lang)}
            </Link>
          </span>
        </label>
        {errors.consent ? (
          <p id={field('consent-error')} className="field-error">
            errorText('consent', errors.consent, lang)
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={busy} aria-busy={busy}>
          {busy ? pick({ en: 'Sending…', mr: 'पाठवत आहे…' }, lang) : pick(copy.submit, lang)}
        </Button>

        <span className="text-xs text-ink-muted">
          {pick(
            { en: 'We reply to enquiries as soon as we can.', mr: 'चौकशीचे उत्तर आम्ही शक्य तितक्या लवकर देतो.' },
            lang,
          )}
        </span>
      </div>
    </form>
  );
}

/**
 * WhatsApp fallback for the failure state. Rebuilds the message from what the
 * visitor has typed so nothing is lost when email delivery fails.
 */
function whatsappHrefForFallback(
  summary: string | null,
  values: { name: string; mobile: string; interests: string[]; quantity: string; unit: string; message: string },
  lang: Lang,
): string | null {
  if (!site.whatsapp) return null;
  if (summary) return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(summary)}`;

  const lines = [
    'Om Agrosphere — Processing Enquiry',
    '',
    `Name: ${values.name || '—'}`,
    `Mobile: +91 ${values.mobile || '—'}`,
    `Interest: ${values.interests.join(', ') || '—'}`,
    `Quantity: ${values.quantity ? `${values.quantity} ${values.unit}` : '—'}`,
  ];
  if (values.message) lines.push('', 'Message:', values.message);
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
}
