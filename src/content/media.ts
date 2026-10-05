import type { L } from '@/lib/i18n';

/**
 * Photograph registry.
 *
 * Every image on the site is declared here as a *slot*. A slot describes the
 * photograph the business needs to supply, in both languages, before it can be
 * published. While `src` is `null` the <Photo> component renders a clearly
 * labelled "photograph to be added" panel — it never substitutes stock imagery
 * or an invented picture of the facility.
 *
 * ── To publish a real photograph ────────────────────────────────────────────
 *   1. Save the optimised file in `public/images/` (long edge ≈ 2000px,
 *      compressed; Next.js converts it to AVIF/WebP automatically).
 *   2. Set `src` below to `/images/<file-name>.jpg`.
 *   3. Check the `alt` text still describes what the photograph shows.
 * No other file needs to change.
 */
export type PhotoSlot = {
  /** Public path once supplied, e.g. `/images/facility-exterior.jpg`. */
  src: string | null;
  /** What the photograph should show — shown in the pending-photo panel. */
  subject: L;
  /** Alt text for screen readers and image search. Describe, don't keyword-stuff. */
  alt: L;
};

export type PhotoKey = keyof typeof photos;

export const photos = {
  'hero-facility': {
    src: null,
    subject: { en: 'Processing unit, wide view', mr: 'प्रक्रिया युनिटचे विस्तृत दृश्य' },
    alt: {
      en: 'The Om Agrosphere grain processing unit on the Dhule–Solapur Highway',
      mr: 'धुळे–सोलापूर महामार्गावरील ओम अ‍ॅग्रोस्फिअर धान्य प्रक्रिया युनिट',
    },
  },
  'intro-grain': {
    src: null,
    subject: { en: 'Cleaned grain in hand', mr: 'हातातील स्वच्छ केलेले धान्य' },
    alt: {
      en: 'Cleaned grain held in a pair of hands at the processing unit',
      mr: 'प्रक्रिया युनिटमध्ये हातात धरलेले स्वच्छ केलेले धान्य',
    },
  },
  'service-cleaning': {
    src: null,
    subject: { en: 'Grain cleaning machine at work', mr: 'धान्य स्वच्छता यंत्र सुरू असताना' },
    alt: {
      en: 'Grain cleaning machine separating dust and chaff from harvested grain',
      mr: 'कापणी केलेल्या धान्यातून धूळ व भुसा वेगळा करणारे स्वच्छता यंत्र',
    },
  },
  'service-sorting': {
    src: null,
    subject: { en: 'Sorting operation', mr: 'प्रतवारी करताना' },
    alt: {
      en: 'Grain being sorted into separate streams at the unit',
      mr: 'युनिटमध्ये धान्याची वेगवेगळ्या भागांत प्रतवारी होत असताना',
    },
  },
  'service-grading': {
    src: null,
    subject: { en: 'Graded grain lots', mr: 'ग्रेडिंग केलेले धान्य' },
    alt: {
      en: 'Graded grain lots separated by size after processing',
      mr: 'प्रक्रियेनंतर आकारानुसार वेगळे केलेले धान्याचे प्रकार',
    },
  },
  'service-dal-milling': {
    src: null,
    subject: { en: 'Dal mill in operation', mr: 'डाळ मिल सुरू असताना' },
    alt: {
      en: 'Dal milling machinery processing pulses into split dal',
      mr: 'कडधान्यापासून डाळ तयार करणारी डाळ मिल यंत्रणा',
    },
  },
  'service-spice-grinding': {
    src: null,
    subject: { en: 'Spice grinding at the unit', mr: 'युनिटमध्ये मसाला दळताना' },
    alt: {
      en: 'Whole spices being ground into powder at the Om Agrosphere unit',
      mr: 'ओम अ‍ॅग्रोस्फिअर युनिटमध्ये संपूर्ण मसाले पूड करून दळताना',
    },
  },
  'product-corn-grit': {
    src: null,
    subject: { en: 'Corn grit, close-up and packed', mr: 'मक्याचा भरडा — जवळून व पॅकिंगमध्ये' },
    alt: {
      en: 'Corn grit (makyacha bharda) supplied by Om Agrosphere for animal feed',
      mr: 'ओम अ‍ॅग्रोस्फिअरकडून जनावरांच्या खाद्यासाठी पुरवला जाणारा मक्याचा भरडा',
    },
  },
  'product-spice-powders': {
    src: null,
    subject: { en: 'Spice powder products', mr: 'मसाला पूड उत्पादने' },
    alt: {
      en: 'Spice powders supplied by Om Agrosphere',
      mr: 'ओम अ‍ॅग्रोस्फिअरकडून पुरवली जाणारी मसाला पूड',
    },
  },
  'facility-exterior': {
    src: null,
    subject: { en: 'Unit entrance from the highway', mr: 'महामार्गावरून युनिटचे प्रवेशद्वार' },
    alt: {
      en: 'Entrance to the Om Agrosphere processing unit seen from the highway',
      mr: 'महामार्गावरून दिसणारे ओम अ‍ॅग्रोस्फिअर प्रक्रिया युनिटचे प्रवेशद्वार',
    },
  },
  'facility-interior': {
    src: null,
    subject: { en: 'Inside the processing shed', mr: 'प्रक्रिया शेडचे अंतर्गत दृश्य' },
    alt: {
      en: 'Inside the processing shed, with machinery and grain in process',
      mr: 'यंत्रसामग्री व प्रक्रियेतील धान्यासह प्रक्रिया शेडचे अंतर्गत दृश्य',
    },
  },
  'machinery-overview': {
    src: null,
    subject: { en: 'Machinery line', mr: 'यंत्रसामग्रीची रांग' },
    alt: {
      en: 'The line of cleaning, sorting and grading machinery at the unit',
      mr: 'युनिटमधील स्वच्छता, प्रतवारी व ग्रेडिंग यंत्रांची रांग',
    },
  },
  'machinery-detail': {
    src: null,
    subject: { en: 'Machine detail / control panel', mr: 'यंत्राचा भाग / नियंत्रण पॅनेल' },
    alt: {
      en: 'Close view of processing machinery at the Om Agrosphere unit',
      mr: 'ओम अ‍ॅग्रोस्फिअर युनिटमधील प्रक्रिया यंत्राचे जवळून दृश्य',
    },
  },
  'operations-loading': {
    src: null,
    subject: { en: 'Loading or unloading a vehicle', mr: 'वाहनात माल भरताना किंवा उतरवताना' },
    alt: {
      en: 'Grain sacks being loaded onto a vehicle at the unit',
      mr: 'युनिटमध्ये वाहनात धान्याची पोती भरताना',
    },
  },
  'operations-packaging': {
    src: null,
    subject: { en: 'Packing processed material', mr: 'प्रक्रिया केलेले उत्पादन पॅक करताना' },
    alt: {
      en: 'Processed grain being weighed and packed into sacks',
      mr: 'प्रक्रिया केलेले धान्य वजन करून पोत्यांमध्ये भरताना',
    },
  },
  'operations-team': {
    src: null,
    subject: { en: 'The people who run the unit', mr: 'युनिट चालवणारी मंडळी' },
    alt: {
      en: 'Workers at the Om Agrosphere processing unit',
      mr: 'ओम अ‍ॅग्रोस्फिअर प्रक्रिया युनिटमधील कामगार',
    },
  },
  'farmer-delivery': {
    src: null,
    subject: { en: 'A farmer bringing produce in', mr: 'शेतकरी माल घेऊन येताना' },
    alt: {
      en: 'A farmer delivering harvested grain to the processing unit',
      mr: 'प्रक्रिया युनिटमध्ये कापणी केलेले धान्य आणणारा शेतकरी',
    },
  },
} satisfies Record<string, PhotoSlot>;

export function photo(key: PhotoKey): PhotoSlot {
  return photos[key];
}

/** Gallery grouping. Categories follow SRS §7.8. */
export const galleryCategories = [
  {
    id: 'facility',
    title: { en: 'Facility', mr: 'युनिट' } satisfies L,
    items: ['facility-exterior', 'facility-interior'] as PhotoKey[],
  },
  {
    id: 'machinery',
    title: { en: 'Machinery', mr: 'यंत्रसामग्री' } satisfies L,
    items: ['machinery-overview', 'machinery-detail'] as PhotoKey[],
  },
  {
    id: 'processing',
    title: { en: 'Processing', mr: 'प्रक्रिया' } satisfies L,
    items: ['service-cleaning', 'service-sorting', 'service-dal-milling', 'service-spice-grinding'] as PhotoKey[],
  },
  {
    id: 'products',
    title: { en: 'Products', mr: 'उत्पादने' } satisfies L,
    items: ['product-corn-grit', 'product-spice-powders'] as PhotoKey[],
  },
  {
    id: 'operations',
    title: { en: 'Operations', mr: 'कामकाज' } satisfies L,
    items: ['operations-loading', 'operations-packaging', 'operations-team'] as PhotoKey[],
  },
] as const;
