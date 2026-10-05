import 'server-only';

/**
 * Google reCAPTCHA v3 verification (SRS §13.2, §21 FR-QT-07).
 *
 * Only runs when both the site key and the secret are configured. When they are
 * not, the endpoint relies on the honeypot field, the submit-timing check and
 * the rate limiter — all of which are always active, so the form is protected
 * out of the box and reCAPTCHA can be layered on later.
 */

const VERIFY_ENDPOINT = 'https://www.google.com/recaptcha/api/siteverify';

/** reCAPTCHA v3 returns 0.0–1.0. 0.5 is Google's suggested starting threshold. */
const SCORE_THRESHOLD = 0.5;

export type RecaptchaResult = 'pass' | 'fail' | 'disabled' | 'error';

export async function verifyRecaptcha(
  token: string,
  remoteIp?: string,
): Promise<RecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return 'disabled';

  // reCAPTCHA is configured, so a missing token is a failure, not a pass.
  if (!token) return 'fail';

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp && remoteIp !== 'unknown') body.set('remoteip', remoteIp);

    const response = await fetch(VERIFY_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) return 'error';

    const result = (await response.json()) as {
      success?: boolean;
      score?: number;
      action?: string;
    };

    if (!result.success) return 'fail';

    // A low score means Google thinks this is likely automated. If the score is
    // absent (v2 keys), fall back to the success flag alone.
    if (typeof result.score === 'number' && result.score < SCORE_THRESHOLD) {
      return 'fail';
    }

    return 'pass';
  } catch {
    // Fail open on a Google outage: a genuine customer must not be blocked
    // because a third party is unreachable. The honeypot and rate limit remain.
    return 'error';
  }
}
