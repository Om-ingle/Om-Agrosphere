import 'server-only';

import { buildInquiryMessage } from '@/lib/inquiry-message';
import type { Inquiry } from '@/lib/validation';

/**
 * Inquiry email delivery (SRS §14).
 *
 * Uses Resend's HTTP API directly rather than pulling in the SDK — it is a
 * single POST, and keeping the dependency out means fewer packages to audit.
 * Credentials are read from the server environment only and never reach the
 * browser bundle (hence `server-only` above).
 *
 * When RESEND_API_KEY is not configured the function reports failure honestly,
 * and the form falls back to WhatsApp / phone / email so the lead is not lost.
 */

export type DeliveryResult =
  | { ok: true; id: string | null }
  | { ok: false; reason: 'not-configured' | 'rejected' | 'network' };

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Minimal HTML body. Inline styles only — email clients ignore stylesheets. */
function renderHtml(inquiry: Inquiry, plain: string): string {
  const rows: [string, string][] = [
    ['Name', inquiry.name],
    ['Mobile', `+91 ${inquiry.mobile}`],
    ['User type', inquiry.userType.replace(/-/g, ' ')],
    ['Interest', inquiry.interests.join(', ')],
    ['Quantity', inquiry.quantity ? `${inquiry.quantity} ${inquiry.unit}` : `— (${inquiry.unit})`],
    ['Preferred date', inquiry.preferredDate || '—'],
    ['Submitted from', inquiry.source],
  ];

  const body = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 14px 6px 0;color:#6B6358;font:600 13px system-ui,sans-serif;vertical-align:top;white-space:nowrap">${escapeHtml(
          label,
        )}</td><td style="padding:6px 0;color:#15120E;font:14px system-ui,sans-serif">${escapeHtml(
          value,
        )}</td></tr>`,
    )
    .join('');

  const notes = inquiry.message
    ? `<h2 style="margin:22px 0 8px;font:600 14px system-ui,sans-serif;color:#15120E">Message</h2>
       <div style="white-space:pre-wrap;color:#3A342C;font:14px/1.6 system-ui,sans-serif">${escapeHtml(
         inquiry.message,
       )}</div>`
    : '';

  return `<!doctype html><html><body style="margin:0;background:#FBF8F2;padding:24px">
    <div style="max-width:600px;margin:0 auto;background:#fff;border:1px solid rgba(21,18,14,.1);border-radius:6px;overflow:hidden">
      <div style="background:#162D1E;padding:18px 22px">
        <p style="margin:0;color:#EBC264;font:600 12px system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase">Om Agrosphere</p>
        <h1 style="margin:6px 0 0;color:#fff;font:600 19px system-ui,sans-serif">New processing enquiry</h1>
      </div>
      <div style="padding:20px 22px">
        <table style="border-collapse:collapse;width:100%">${body}</table>
        ${notes}
        <p style="margin:26px 0 0;padding-top:16px;border-top:1px solid rgba(21,18,14,.1);color:#6B6358;font:12px/1.6 system-ui,sans-serif">
          Reply to this customer on +91 ${escapeHtml(inquiry.mobile)}.<br />
          Sent automatically from the Om Agrosphere website enquiry form.
        </p>
      </div>
    </div>
    <pre style="display:none">${escapeHtml(plain)}</pre>
  </body></html>`;
}

export async function sendInquiryEmail(inquiry: Inquiry): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL;
  const to = process.env.INQUIRY_TO_EMAIL ?? 'omagrosphere@gmail.com';

  if (!apiKey || !from) {
    // Deliberately logged with no personal data — just the fact of the miss.
    console.warn('[inquiry] RESEND_API_KEY or INQUIRY_FROM_EMAIL is not set; email not sent.');
    return { ok: false, reason: 'not-configured' };
  }

  const plain = buildInquiryMessage(inquiry);
  const subject = `Processing enquiry — ${inquiry.name} — ${inquiry.interests.join(', ')}`;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        // No reply_to: the form collects a mobile number, not an email address,
        // so there is no honest address to send replies to. The number is in
        // the body and the footer of the HTML.
        subject,
        text: plain,
        html: renderHtml(inquiry, plain),
      }),
      // Never let a hanging provider hold the request open.
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      // Log the status only — the provider body can echo submitted content.
      console.error(`[inquiry] email provider rejected the request (HTTP ${response.status}).`);
      return { ok: false, reason: 'rejected' };
    }

    const payload = (await response.json().catch(() => null)) as { id?: string } | null;
    return { ok: true, id: payload?.id ?? null };
  } catch (error) {
    console.error(
      '[inquiry] email delivery failed:',
      error instanceof Error ? error.name : 'unknown error',
    );
    return { ok: false, reason: 'network' };
  }
}
