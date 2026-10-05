/**
 * Builds the plain-text inquiry summary used for the notification email and the
 * pre-filled WhatsApp message (SRS §13).
 *
 * Kept in one place so both channels say exactly the same thing — a customer
 * who submits the form and then taps WhatsApp sees the same details they typed.
 */
import type { Inquiry } from '@/lib/validation';

const USER_TYPE_LABELS: Record<Inquiry['userType'], string> = {
  farmer: 'Farmer',
  trader: 'Trader',
  'wholesale-buyer': 'Wholesale Buyer',
  'retail-buyer': 'Retail Buyer',
  'commercial-buyer': 'Commercial Buyer',
};

const UNIT_LABELS: Record<Inquiry['unit'], string> = {
  kg: 'Kg',
  quintal: 'Quintal',
  ton: 'Ton',
};

/** `dd/mm/yyyy`, which is how dates are written and read locally. */
function formatDate(value: string): string {
  if (!value) return '';
  const [year, month, day] = value.split('-');
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}`;
}

export type MessageOptions = {
  /** Mask the mobile number — used when the message is shown on screen. */
  redactMobile?: boolean;
};

/**
 * The WhatsApp / email body, in the structure the SRS specifies.
 *
 * The mobile number is included in full for the business notification (they
 * need it to reply) but masked when rendered into the on-screen WhatsApp
 * confirmation panel, so a shoulder-surfer cannot read it.
 */
export function buildInquiryMessage(
  inquiry: Inquiry,
  { redactMobile = false }: MessageOptions = {},
): string {
  const mobile = redactMobile
    ? `+91 ${inquiry.mobile.slice(0, 5)}${'•'.repeat(Math.max(0, inquiry.mobile.length - 5))}`
    : `+91 ${inquiry.mobile}`;

  const quantity = inquiry.quantity
    ? `${inquiry.quantity} ${UNIT_LABELS[inquiry.unit]}`
    : `Not specified (${UNIT_LABELS[inquiry.unit]})`;

  const lines = [
    'Om Agrosphere — Processing Enquiry',
    '',
    `Name: ${inquiry.name}`,
    `Mobile: ${mobile}`,
    `User Type: ${USER_TYPE_LABELS[inquiry.userType]}`,
    `Interest: ${inquiry.interests.join(', ')}`,
    `Quantity: ${quantity}`,
  ];

  const date = formatDate(inquiry.preferredDate);
  if (date) lines.push(`Preferred Date: ${date}`);

  if (inquiry.message) {
    lines.push('', 'Message:', inquiry.message);
  }

  return lines.join('\n');
}

/**
 * Pre-filled WhatsApp text for someone who taps a WhatsApp button *before*
 * filling the form — a greeting, not a fabricated enquiry.
 *
 * Every WhatsApp entry point on the site uses this same opener so the business
 * always receives a message that starts the same way, whichever button the
 * customer happened to press.
 */
export function buildWhatsAppOpener(lang: 'en' | 'mr'): string {
  return lang === 'mr'
    ? 'नमस्कार, मला ओम अ‍ॅग्रोस्फिअरच्या प्रक्रिया सेवेबद्दल माहिती हवी आहे.'
    : 'Hello, I would like to know more about Om Agrosphere processing services.';
}
