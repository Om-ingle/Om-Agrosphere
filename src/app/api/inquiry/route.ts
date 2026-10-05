import { NextResponse } from 'next/server';

import { sendInquiryEmail } from '@/lib/email';
import { clientIdentifier, checkRateLimit } from '@/lib/rate-limit';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { buildInquiryMessage } from '@/lib/inquiry-message';
import { collectFieldErrors, inquirySchema } from '@/lib/validation';
import { whatsappHref } from '@/content/site';

/**
 * Inquiry endpoint (SRS §13, §17, §21 FR-QT-01…07).
 *
 * Everything the browser sends is treated as hostile and re-validated here.
 * Errors returned to the client are generic by design — no provider messages,
 * no stack traces, no configuration details.
 */

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Minimum time a human plausibly needs to fill in the form. */
const MIN_FILL_MS = 2_500;

function badRequest(body: Record<string, unknown>, status = 400) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

/**
 * The response a bot gets when it trips a spam check: indistinguishable from a
 * genuine acceptance, so it learns nothing about what caught it.
 */
function silentlyAccepted() {
  return NextResponse.json(
    { ok: true, delivered: false },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}

export async function POST(request: Request) {
  const ip = clientIdentifier(request.headers);

  // ── 1. Rate limit before doing any work ───────────────────────────────────
  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: 'rate-limited' },
      {
        status: 429,
        headers: {
          'Cache-Control': 'no-store',
          'Retry-After': String(limit.retryAfterSeconds),
        },
      },
    );
  }

  // ── 2. Parse ──────────────────────────────────────────────────────────────
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return badRequest({ ok: false, error: 'invalid-json' });
  }

  if (typeof payload !== 'object' || payload === null || Array.isArray(payload)) {
    return badRequest({ ok: false, error: 'invalid-body' });
  }

  // ── 3. Honeypot ───────────────────────────────────────────────────────────
  // Checked on the raw body, *before* validation: a hidden field that no real
  // visitor sees or fills. Doing it here rather than after `safeParse` means a
  // bot that trips it gets the normal success response instead of a field error
  // naming the honeypot — which would tell it exactly what to leave blank.
  const honeypot = (payload as Record<string, unknown>).company;
  if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
    return silentlyAccepted();
  }

  // ── 4. Validate ───────────────────────────────────────────────────────────
  const parsed = inquirySchema.safeParse(payload);
  if (!parsed.success) {
    return badRequest({ ok: false, error: 'validation', fields: collectFieldErrors(parsed.error) });
  }

  const inquiry = parsed.data;

  // ── 5. Anti-spam: submit timing ───────────────────────────────────────────
  // Instant submissions are automated. Same silent response as the honeypot.
  if (inquiry.elapsedMs < MIN_FILL_MS) {
    return silentlyAccepted();
  }

  const captcha = await verifyRecaptcha(inquiry.recaptchaToken, ip);
  if (captcha === 'fail') {
    return badRequest({ ok: false, error: 'spam-check', fields: { form: 'spam-check' } });
  }

  // ── 6. Deliver ────────────────────────────────────────────────────────────
  const delivery = await sendInquiryEmail(inquiry);

  // The WhatsApp follow-up is offered either way: if email failed it is the
  // fallback, and if email succeeded it is a faster channel for the customer.
  const waHref = whatsappHref(buildInquiryMessage(inquiry));

  if (!delivery.ok) {
    // `delivery.reason` is deliberately not returned — it describes our
    // configuration, which is not the visitor's business.
    console.error('[inquiry] delivery failed:', delivery.reason);
    return NextResponse.json(
      { ok: false, error: 'delivery-failed' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }

  return NextResponse.json(
    { ok: true, delivered: true, whatsappUrl: waHref },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}

/** Anything other than POST is not a valid enquiry. */
export function GET() {
  return NextResponse.json(
    { ok: false, error: 'method-not-allowed' },
    { status: 405, headers: { Allow: 'POST', 'Cache-Control': 'no-store' } },
  );
}
