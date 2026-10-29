import type { L } from '@/lib/i18n';

/**
 * Shared interface strings — buttons, form labels, states — in both languages.
 * Page-specific prose lives in the page files; this file holds the repeated,
 * reusable wording so it stays consistent and translatable in one place.
 */
export const ui = {
  // ── Actions ───────────────────────────────────────────────────────────────
  getQuote: { en: 'Get a Quote', mr: 'दर चौकशी करा' } satisfies L,
  whatsapp: { en: 'WhatsApp Us', mr: 'व्हॉट्सअ‍ॅप करा' } satisfies L,
  call: { en: 'Call Now', mr: 'फोन करा' } satisfies L,
  callUs: { en: 'Call Us', mr: 'आम्हाला फोन करा' } satisfies L,
  email: { en: 'Email Us', mr: 'ईमेल करा' } satisfies L,
  directions: { en: 'Get Directions', mr: 'दिशा मिळवा' } satisfies L,
  viewServices: { en: 'View Services', mr: 'सेवा पहा' } satisfies L,
  viewProducts: { en: 'View Products', mr: 'उत्पादने पहा' } satisfies L,
  viewAll: { en: 'View all', mr: 'सर्व पहा' } satisfies L,
  learnMore: { en: 'Learn more', mr: 'अधिक माहिती' } satisfies L,
  enquireNow: { en: 'Send Enquiry', mr: 'चौकशी पाठवा' } satisfies L,
  enquireAbout: { en: 'Enquire about this', mr: 'याबद्दल चौकशी करा' } satisfies L,
  backHome: { en: 'Back to home', mr: 'मुख्यपृष्ठावर परत' } satisfies L,

  // ── Labels ────────────────────────────────────────────────────────────────
  phone: { en: 'Phone', mr: 'फोन' } satisfies L,
  whatsappLabel: { en: 'WhatsApp', mr: 'व्हॉट्सअ‍ॅप' } satisfies L,
  emailLabel: { en: 'Email', mr: 'ईमेल' } satisfies L,
  hours: { en: 'Operating hours', mr: 'कामकाजाची वेळ' } satisfies L,
  locationLabel: { en: 'Location', mr: 'पत्ता' } satisfies L,
  language: { en: 'Language', mr: 'भाषा' } satisfies L,
  menu: { en: 'Menu', mr: 'मेनू' } satisfies L,
  close: { en: 'Close', mr: 'बंद करा' } satisfies L,
  openMenu: { en: 'Open navigation menu', mr: 'मेनू उघडा' } satisfies L,
  required: { en: 'Required', mr: 'आवश्यक' } satisfies L,
  optional: { en: 'Optional', mr: 'ऐच्छिक' } satisfies L,

  // ── Pending / placeholder wording ─────────────────────────────────────────
  toBeProvided: { en: 'To be provided', mr: 'देय आहे' } satisfies L,
  awaitingConfirmation: {
    en: 'Being confirmed by the business',
    mr: 'व्यवसायाकडून निश्चित होत आहे',
  } satisfies L,
  photoPendingTitle: {
    en: 'Photograph to be added',
    mr: 'छायाचित्र लवकरच जोडले जाईल',
  } satisfies L,

  // ── Section headings reused across pages ──────────────────────────────────
  whyUs: { en: 'Why Om Agrosphere', mr: 'ओम अ‍ॅग्रोस्फिअर का' } satisfies L,
  coreServices: { en: 'What we do', mr: 'आम्ही काय करतो' } satisfies L,
  supportedCrops: {
    en: 'Crops and pulses we handle',
    mr: 'आम्ही हाताळत असलेली पिके व कडधान्ये',
  } satisfies L,
  featuredProducts: { en: 'Our products', mr: 'आमची उत्पादने' } satisfies L,
  insideFacility: { en: 'Inside our processing unit', mr: 'आमच्या प्रक्रिया युनिटमध्ये' } satisfies L,
  findUs: { en: 'Where to find us', mr: 'आम्हाला कुठे भेटावे' } satisfies L,
  commonQuestions: { en: 'Common questions', mr: 'नेहमीचे प्रश्न' } satisfies L,

  // ── Form states ───────────────────────────────────────────────────────────
  sending: { en: 'Sending…', mr: 'पाठवत आहे…' } satisfies L,
  submitFailedTitle: {
    en: 'We could not send your enquiry',
    mr: 'तुमची चौकशी पाठवता आली नाही',
  } satisfies L,
  submitFailedBody: {
    en: 'Something went wrong on our side. Please try again, or reach us directly using one of the options below.',
    mr: 'आमच्याकडे काहीतरी चुकले. कृपया पुन्हा प्रयत्न करा, किंवा खालील पर्यायांपैकी एक वापरून थेट संपर्क करा.',
  } satisfies L,
  tryAgain: { en: 'Try again', mr: 'पुन्हा प्रयत्न करा' } satisfies L,
} as const;

export type UIKey = keyof typeof ui;
