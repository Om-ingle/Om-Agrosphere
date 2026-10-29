import type { L, LList } from '@/lib/i18n';
import type { PhotoKey } from '@/content/media';

/**
 * Products sold from the unit, as confirmed by the owner.
 *
 * Only fields the business has confirmed appear here. `specs` and
 * `packaging` stay empty until verified — the UI marks them "To be provided"
 * rather than publishing invented grades or pack sizes.
 */
export type ProductSpec = { label: L; value: L };

export type Product = {
  id: string;
  /** Used in the inquiry form's product list. */
  inquiryValue: string;
  name: L;
  category: L;
  /** Short line for product cards. */
  summary: L;
  body: LList;
  /** Intended use, stated only as far as confirmed. */
  uses: LList;
  specs: ProductSpec[];
  packaging: LList;
  photoKey: PhotoKey;
  /** Marketing label shown on the card, e.g. "Dal". */
  badge: L;
};

export const products: Product[] = [
  {
    id: 'tur-dal',
    inquiryValue: 'Tur Dal',
    name: { en: 'Tur Dal', mr: 'तूरडाळ' },
    category: { en: 'Dal', mr: 'डाळ' },
    badge: { en: 'Dal', mr: 'डाळ' },
    summary: {
      en: 'Tur dal processed and sold at our unit.',
      mr: 'आमच्याच युनिटमध्ये प्रक्रिया करून विकली जाणारी तूरडाळ.',
    },
    body: {
      en: [
        'Tur dal is made from whole tur (pigeon pea) processed into split dal at our unit.',
        'We process the pulse ourselves and sell the finished dal. Tell us the quantity you need and we will confirm availability and rate.',
      ],
      mr: [
        'तूरडाळ संपूर्ण तूर प्रक्रिया करून आमच्याच युनिटमध्ये तयार केली जाते.',
        'कडधान्यावर आम्ही स्वतः प्रक्रिया करतो आणि तयार डाळ विकतो. तुम्हाला किती प्रमाण हवे आहे ते सांगा, आम्ही उपलब्धता व दर सांगू.',
      ],
    },
    uses: {
      en: ['For cooking and food preparation', 'Available by enquiry'],
      mr: ['स्वयंपाक व अन्न तयारीसाठी', 'चौकशीद्वारे उपलब्ध'],
    },
    specs: [],
    // TODO: pack sizes, once the business confirms them.
    packaging: { en: [], mr: [] },
    photoKey: 'grain-quality-closeup',
  },
  {
    id: 'moong-dal',
    inquiryValue: 'Moong Dal',
    name: { en: 'Moong Dal', mr: 'मूगडाळ' },
    category: { en: 'Dal', mr: 'डाळ' },
    badge: { en: 'Dal', mr: 'डाळ' },
    summary: {
      en: 'Moong dal processed and sold at our unit.',
      mr: 'आमच्याच युनिटमध्ये प्रक्रिया करून विकली जाणारी मूगडाळ.',
    },
    body: {
      en: [
        'Moong dal is made from whole moong processed into split dal at our unit.',
        'We process the pulse ourselves and sell the finished dal. Tell us the quantity you need and we will confirm availability and rate.',
      ],
      mr: [
        'मूगडाळ संपूर्ण मूग प्रक्रिया करून आमच्याच युनिटमध्ये तयार केली जाते.',
        'कडधान्यावर आम्ही स्वतः प्रक्रिया करतो आणि तयार डाळ विकतो. तुम्हाला किती प्रमाण हवे आहे ते सांगा, आम्ही उपलब्धता व दर सांगू.',
      ],
    },
    uses: {
      en: ['For cooking and food preparation', 'Available by enquiry'],
      mr: ['स्वयंपाक व अन्न तयारीसाठी', 'चौकशीद्वारे उपलब्ध'],
    },
    specs: [],
    // TODO: pack sizes, once the business confirms them.
    packaging: { en: [], mr: [] },
    photoKey: 'pulse-green-in-hand',
  },
  {
    id: 'urad-dal',
    inquiryValue: 'Urad Dal',
    name: { en: 'Urad Dal', mr: 'उडीदडाळ' },
    category: { en: 'Dal', mr: 'डाळ' },
    badge: { en: 'Dal', mr: 'डाळ' },
    summary: {
      en: 'Urad dal processed and sold at our unit.',
      mr: 'आमच्याच युनिटमध्ये प्रक्रिया करून विकली जाणारी उडीदडाळ.',
    },
    body: {
      en: [
        'Urad dal is made from whole urad processed into split dal at our unit.',
        'We process the pulse ourselves and sell the finished dal. Tell us the quantity you need and we will confirm availability and rate.',
      ],
      mr: [
        'उडीदडाळ संपूर्ण उडीद प्रक्रिया करून आमच्याच युनिटमध्ये तयार केली जाते.',
        'कडधान्यावर आम्ही स्वतः प्रक्रिया करतो आणि तयार डाळ विकतो. तुम्हाला किती प्रमाण हवे आहे ते सांगा, आम्ही उपलब्धता व दर सांगू.',
      ],
    },
    uses: {
      en: ['For cooking and food preparation', 'Available by enquiry'],
      mr: ['स्वयंपाक व अन्न तयारीसाठी', 'चौकशीद्वारे उपलब्ध'],
    },
    specs: [],
    // TODO: pack sizes, once the business confirms them.
    packaging: { en: [], mr: [] },
    photoKey: 'pulse-grain-dark',
  },
  {
    id: 'chana-dal',
    inquiryValue: 'Chana Dal',
    name: { en: 'Chana Dal', mr: 'चणाडाळ' },
    category: { en: 'Dal', mr: 'डाळ' },
    badge: { en: 'Dal', mr: 'डाळ' },
    summary: {
      en: 'Chana dal processed and sold at our unit.',
      mr: 'आमच्याच युनिटमध्ये प्रक्रिया करून विकली जाणारी चणाडाळ.',
    },
    body: {
      en: [
        'Chana dal is made from whole chana (gram) processed into split dal at our unit.',
        'We process the pulse ourselves and sell the finished dal. Tell us the quantity you need and we will confirm availability and rate.',
      ],
      mr: [
        'चणाडाळ संपूर्ण हरभरा प्रक्रिया करून आमच्याच युनिटमध्ये तयार केली जाते.',
        'कडधान्यावर आम्ही स्वतः प्रक्रिया करतो आणि तयार डाळ विकतो. तुम्हाला किती प्रमाण हवे आहे ते सांगा, आम्ही उपलब्धता व दर सांगू.',
      ],
    },
    uses: {
      en: ['For cooking and food preparation', 'Available by enquiry'],
      mr: ['स्वयंपाक व अन्न तयारीसाठी', 'चौकशीद्वारे उपलब्ध'],
    },
    specs: [],
    // TODO: pack sizes, once the business confirms them.
    packaging: { en: [], mr: [] },
    photoKey: 'bulk-processed-grain',
  },
  {
    id: 'animal-feed-bharada',
    inquiryValue: 'Animal Feed Bharada',
    name: { en: 'Animal Feed Bharada', mr: 'पशुखाद्य भरडा' },
    category: { en: 'Animal Feed', mr: 'पशुखाद्य' },
    badge: { en: 'Animal feed', mr: 'पशुखाद्य' },
    summary: {
      en: 'Bharada made by combining and coarsely processing maize, dal husk, chura, wheat and soybean.',
      mr: 'मका, डाळींचा भुसा, चुरा, गहू व सोयाबीन एकत्र करून जाडसर प्रक्रिया करून तयार केलेला भरडा.',
    },
    body: {
      en: [
        'Bharada — पशुखाद्य भरडा — is an animal feed made by combining and coarsely processing maize, dal husk (डाळींचा भुसा), chura (चुरा), wheat and soybean at our unit.',
        'The ingredients are mixed and ground coarsely. Tell us the quantity you need and we will confirm availability and rate.',
        'We do not claim that this bharada is a nutritionally balanced or certified feed, or that it is suited to a particular animal. Ask us about your requirement and we will tell you what we can supply.',
      ],
      mr: [
        'भरडा — पशुखाद्य भरडा — म्हणजे मका, डाळींचा भुसा, चुरा, गहू व सोयाबीन एकत्र करून आमच्याच युनिटमध्ये जाडसर प्रक्रिया करून तयार केलेले पशुखाद्य.',
        'हे घटक एकत्र करून जाडसर दळले जातात. तुम्हाला किती प्रमाण हवे आहे ते सांगा, आम्ही उपलब्धता व दर सांगू.',
        'हा भरडा पोषणदृष्ट्या संतुलित किंवा प्रमाणित खाद्य आहे, किंवा कोणत्यातरी विशिष्ट जनावरासाठी योग्य आहे — असा आम्ही दावा करत नाही. तुमच्या गरजेबद्दल विचारा, आम्ही काय पुरवू शकतो ते सांगू.',
      ],
    },
    uses: {
      en: ['Animal feed ingredient', 'Available by enquiry'],
      mr: ['पशुखाद्यातील घटक', 'चौकशीद्वारे उपलब्ध'],
    },
    specs: [],
    // TODO: pack sizes, once the business confirms them.
    packaging: { en: [], mr: [] },
    photoKey: 'product-animal-feed-bharada',
  },
];

/** Values offered in the inquiry form's "Crop / Product interest" field. */
export const inquiryInterests = [
  { value: 'Tur Dal', label: { en: 'Tur Dal', mr: 'तूरडाळ' } satisfies L },
  { value: 'Moong Dal', label: { en: 'Moong Dal', mr: 'मूगडाळ' } satisfies L },
  { value: 'Urad Dal', label: { en: 'Urad Dal', mr: 'उडीदडाळ' } satisfies L },
  { value: 'Chana Dal', label: { en: 'Chana Dal', mr: 'चणाडाळ' } satisfies L },
  {
    value: 'Animal Feed Bharada',
    label: { en: 'Animal Feed Bharada', mr: 'पशुखाद्य भरडा' } satisfies L,
  },
  { value: 'Wheat', label: { en: 'Wheat', mr: 'गहू' } satisfies L },
  { value: 'Maize', label: { en: 'Maize', mr: 'मका' } satisfies L },
  { value: 'Soybean', label: { en: 'Soybean', mr: 'सोयाबीन' } satisfies L },
  { value: 'Bajra', label: { en: 'Bajra', mr: 'बाजरी' } satisfies L },
  { value: 'Jowar', label: { en: 'Jowar', mr: 'ज्वारी' } satisfies L },
] as const;
