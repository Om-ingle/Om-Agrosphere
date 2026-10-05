import type { L, LList } from '@/lib/i18n';

/**
 * Products (SRS §7.4).
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
  photoKey: 'product-corn-grit' | 'product-spice-powders';
  /** Marketing label shown on the card, e.g. "Animal feed". */
  badge: L;
};

export const products: Product[] = [
  {
    id: 'corn-grit',
    inquiryValue: 'Corn Grit',
    name: { en: 'Corn Grit', mr: 'मक्याचा भरडा' },
    category: { en: 'Animal Feed', mr: 'जनावरांचे खाद्य' },
    badge: { en: 'Animal feed', mr: 'जनावरांचे खाद्य' },
    summary: {
      en: 'Corn grit supplied in bulk for animal feed use.',
      mr: 'जनावरांच्या खाद्यासाठी मोठ्या प्रमाणात पुरवला जाणारा मक्याचा भरडा.',
    },
    body: {
      en: [
        'Corn grit — मक्याचा भरडा — is maize that has been processed into a coarse, broken form. It is used as an animal feed ingredient.',
        'Because it is produced at our own unit, the material comes from maize we have processed ourselves rather than from an unknown source. Tell us the quantity you need and what you are feeding, and we will confirm availability and rate for your requirement.',
      ],
      mr: [
        'मक्याचा भरडा म्हणजे प्रक्रिया करून जाडसर, फोडलेल्या स्वरूपात तयार केलेला मका. याचा वापर जनावरांच्या खाद्यात घटक म्हणून केला जातो.',
        'हा माल आमच्याच युनिटमध्ये तयार होत असल्याने तो आम्ही स्वतः प्रक्रिया केलेल्या मक्यापासून बनतो, अनोळखी स्रोताकडून येत नाही. तुम्हाला किती प्रमाण हवे आहे आणि कशासाठी वापरणार आहात हे सांगा, आम्ही उपलब्धता व दर निश्चित करून सांगू.',
      ],
    },
    uses: {
      en: ['Animal feed ingredient', 'Supplied in bulk to traders and buyers'],
      mr: ['जनावरांच्या खाद्यातील घटक', 'व्यापारी व खरेदीदारांना मोठ्या प्रमाणात पुरवठा'],
    },
    specs: [
      // Add confirmed grades here, e.g.:
      // { label: { en: 'Available grades', mr: 'उपलब्ध प्रकार' }, value: { en: '…', mr: '…' } },
    ],
    // TODO: pack sizes, once the business confirms them.
    packaging: { en: [], mr: [] },
    photoKey: 'product-corn-grit',
  },
  {
    id: 'spice-powders',
    inquiryValue: 'Spices',
    name: { en: 'Spice Powders', mr: 'मसाला पूड' },
    category: { en: 'Spices', mr: 'मसाले' },
    badge: { en: 'Spices', mr: 'मसाले' },
    summary: {
      en: 'Ground spice powders, available for retail and wholesale enquiry.',
      mr: 'कुटलेली मसाला पूड — किरकोळ व घाऊक चौकशीसाठी उपलब्ध.',
    },
    body: {
      en: [
        'We grind spice powders at our unit. Which spices are available at any given time depends on the season and on the raw material we have in hand.',
        'The full list of spice varieties and pack sizes is being confirmed with the business and will be published here. In the meantime, send us an enquiry with the spice and quantity you need and we will tell you what is available.',
      ],
      mr: [
        'आम्ही आमच्या युनिटमध्ये मसाला पूड कुटतो. कोणते मसाले कधी उपलब्ध असतील हे हंगामावर व आमच्याकडील कच्च्या मालावर अवलंबून असते.',
        'मसाल्यांची संपूर्ण यादी व पॅकिंगचे आकार व्यवसायाकडून निश्चित होत आहेत आणि लवकरच येथे प्रकाशित केले जातील. तोपर्यंत तुम्हाला हवा असलेला मसाला व प्रमाण यासह चौकशी पाठवा, आम्ही काय उपलब्ध आहे ते सांगू.',
      ],
    },
    uses: {
      en: ['Retail packs', 'Wholesale supply'],
      mr: ['किरकोळ पॅक', 'घाऊक पुरवठा'],
    },
    specs: [],
    // TODO: pack sizes, once the business confirms them.
    packaging: { en: [], mr: [] },
    photoKey: 'product-spice-powders',
  },
];

/** Values offered in the inquiry form's "Crop / Product interest" field. */
export const inquiryInterests = [
  { value: 'Wheat', label: { en: 'Wheat', mr: 'गहू' } satisfies L },
  { value: 'Jowar', label: { en: 'Jowar', mr: 'ज्वारी' } satisfies L },
  { value: 'Bajra', label: { en: 'Bajra', mr: 'बाजरी' } satisfies L },
  { value: 'Tur', label: { en: 'Tur', mr: 'तूर' } satisfies L },
  { value: 'Chana', label: { en: 'Chana', mr: 'हरभरा' } satisfies L },
  { value: 'Moong', label: { en: 'Moong', mr: 'मूग' } satisfies L },
  { value: 'Urad', label: { en: 'Urad', mr: 'उडीद' } satisfies L },
  { value: 'Corn Grit', label: { en: 'Corn Grit', mr: 'मक्याचा भरडा' } satisfies L },
  { value: 'Spices', label: { en: 'Spices', mr: 'मसाले' } satisfies L },
] as const;
