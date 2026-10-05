import type { L } from '@/lib/i18n';

/**
 * Single source of truth for Om Agrosphere business facts.
 *
 * RULE: nothing in this file may be guessed. Everything here was supplied by
 * the business. If a fact is not known, it is `null` and the UI hides the
 * matching element rather than showing something that looks like real
 * information.
 *
 * Only genuinely deployment-specific values (site URL, email credentials,
 * analytics IDs) are read from the environment — a customer's phone number is
 * not a secret, and the site must show it the moment it is deployed.
 */

export const site = {
  name: 'Om Agrosphere',

  tagline: {
    en: 'Processing Agriculture, Progressing All',
    mr: 'प्रक्रिया शेतीची, प्रगती सर्वांची',
  } satisfies L,

  owner: {
    name: 'Rajesh Ingle',
    designation: { en: 'Owner', mr: 'मालक' } satisfies L,
  },

  /** Year the business started trading, as confirmed by the owner. */
  founded: '2026',

  /** One-line description used for metadata and structured data. */
  shortDescription: {
    en: 'Manufacturer and supplier of corn grit for animal feed and ground spice powders, and a grain processing unit offering cleaning, sorting, grading and dal milling on the Dhule–Solapur Highway, Gangapur, Maharashtra.',
    mr: 'जनावरांच्या खाद्यासाठी मक्याचा भरडा व मसाला पूड तयार करणारे व पुरवणारे, तसेच धुळे–सोलापूर महामार्गावर, गंगापूर, महाराष्ट्र येथे धान्य स्वच्छता, प्रतवारी, ग्रेडिंग व डाळ मिल सेवा देणारे कृषी प्रक्रिया युनिट.',
  } satisfies L,

  email: 'omagrosphere@gmail.com',

  /** Digits only, country code first — this is what `tel:` and `wa.me` need. */
  phone: '919423397938',
  /** How the number is written for people to read. */
  phoneDisplay: '+91 94233 97938',

  /** Same number, also reachable on WhatsApp. */
  whatsapp: '919423397938',

  /**
   * Opening hours. `display` is shown verbatim; `specification` feeds
   * LocalBusiness structured data, which is what lets search engines show
   * "Open now" against the listing.
   */
  hours: {
    display: {
      en: 'Mon–Sat: 9:00 am – 6:00 pm · Sun: 9:00 am – 3:00 pm',
      mr: 'सोमवार–शनिवार: सकाळी ९:०० – सायंकाळी ६:०० · रविवार: सकाळी ९:०० – दुपारी ३:००',
    } satisfies L,
    specification: [
      {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
      { days: ['Sunday'], opens: '09:00', closes: '15:00' },
    ],
  },

  location: {
    streetAddress: {
      en: 'Dhule–Solapur Highway, near Bharat Petroleum, Diwashi, Kasabkheda',
      mr: 'धुळे–सोलापूर महामार्ग, भारत पेट्रोलियमजवळ, दिवाशी, कसबखेडा',
    } satisfies L,
    /** The landmark, kept short for one-line use. */
    landmark: {
      en: 'Near Bharat Petroleum, Diwashi',
      mr: 'भारत पेट्रोलियमजवळ, दिवाशी',
    } satisfies L,
    /**
     * Taluka (revenue block) per India Post's record for PIN 423702, whose
     * post offices — including Pimpalgaon Diwashi, the one serving this
     * village — are all listed under block Gangapur. Corroborated by
     * OpenStreetMap. Not Kannad, which is a different taluka ~29 km north.
     */
    locality: { en: 'Gangapur', mr: 'गंगापूर' } satisfies L,
    district: { en: 'Chhatrapati Sambhajinagar', mr: 'छत्रपती संभाजीनगर' } satisfies L,
    region: { en: 'Maharashtra', mr: 'महाराष्ट्र' } satisfies L,
    postalCode: '423702',
    /** Google Plus Code for the premises — useful for drivers and delivery. */
    plusCode: 'X4RJ+499',
    /** The business's own Google Maps place link. */
    mapsUrl: 'https://maps.app.goo.gl/rKmN5MYnuktt9XxQ7',
    /**
     * Latitude and longitude of the premises, read off Google Maps for the
     * business's own listing. Feeds the GeoCoordinates block in structured data.
     */
    geo: { lat: 19.99085649978752, lng: 75.12847823793373 },
    /**
     * The Google Maps "Embed a map" src for the business's own listing — a pin
     * on the premises rather than a search for the address. Google Maps
     * generated this snippet itself, so it matches the map the owner sees.
     */
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3749.424394833785!2d75.12592477500205!3d19.990695181411443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb8d0004305f69%3A0x85910cb2e6caa9a6!2sOm%20Agrosphere!5e0!3m2!1sen!2sin!4v1791173954902!5m2!1sen!2sin',
  },

  /** No social profiles supplied. Added to Organization `sameAs` when provided. */
  social: [] as { label: string; url: string }[],

  analytics: {
    gaId: env(process.env.NEXT_PUBLIC_GA_ID),
    googleSiteVerification: env(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION),
  },

  recaptchaSiteKey: env(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
} as const;

/** Normalise an environment value to a trimmed string or null. */
function env(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : null;
}

/** Absolute site origin, without a trailing slash. */
export const SITE_URL = (
  env(process.env.NEXT_PUBLIC_SITE_URL) ?? 'https://omagrosphere.com'
).replace(/\/+$/, '');

/** The full postal address, on one line. */
export function addressLine(lang: 'en' | 'mr'): string {
  const l = site.location;
  return `${[
    l.streetAddress[lang],
    `${l.locality[lang]}, ${l.district[lang]}`,
    l.region[lang],
  ].join(', ')} ${l.postalCode}`;
}

/** Taluka, district and state, without the street or PIN — for compact blocks. */
export function localityLine(lang: 'en' | 'mr'): string {
  const l = site.location;
  return `${l.locality[lang]}, ${l.district[lang]}, ${l.region[lang]}`;
}

/** Directions link — the business's own Google Maps place link. */
export const directionsUrl = site.location.mapsUrl;

/** Google Maps embed of the business's own listing — an exact pin. */
export const mapEmbedUrl = site.location.mapEmbedUrl;

export function telHref(): string | null {
  return site.phone ? `tel:+${site.phone}` : null;
}

export function whatsappHref(message?: string): string | null {
  if (!site.whatsapp) return null;
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function mailtoHref(subject: string, body?: string): string {
  const params = new URLSearchParams({ subject });
  if (body) params.set('body', body);
  return `mailto:${site.email}?${params.toString()}`;
}
