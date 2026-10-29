import type { L, LList } from '@/lib/i18n';
import type { PhotoKey } from '@/content/media';

/**
 * Services offered by Om Agrosphere, as confirmed by the owner.
 *
 * `specs` intentionally stays empty until the business confirms capacity,
 * accepted volumes, packaging and moisture requirements. The UI renders a
 * clearly-marked placeholder row instead of an invented figure.
 */
export type ServiceSpec = { label: L; value: L };

export type Service = {
  slug: string;
  name: L;
  /** One-line summary for cards and navigation. */
  summary: L;
  /** Full explanation shown on the Services page. */
  body: LList;
  /** Which crops this service applies to, as free-text crop ids. */
  crops: string[];
  /**
   * Value pre-selected in the enquiry form's product list when a customer
   * arrives from this service. Defaults to the first crop's name.
   */
  inquiryInterest?: string;
  photoKey: PhotoKey;
  specs: ServiceSpec[];
};

export const services: Service[] = [
  {
    slug: 'grain-cleaning',
    name: { en: 'Grain Cleaning', mr: 'धान्य स्वच्छता' },
    summary: {
      en: 'Cleaning soybean, maize, wheat, bajra and jowar — removing dust, chaff, stones and other unwanted material.',
      mr: 'सोयाबीन, मका, गहू, बाजरी व ज्वारी यांतील धूळ, भुसा, दगड व इतर अनावश्यक पदार्थ वेगळे करणे.',
    },
    body: {
      en: [
        'We clean soybean, maize, wheat, bajra and jowar brought in by farmers and traders. Cleaning removes dust, chaff, straw, small stones and other material that is not part of the grain.',
        'Clean grain weighs honestly, stores better and is ready for sale or for the next processing step.',
        'Tell us the crop and the approximate quantity before you load the vehicle, and we will confirm what we can take, when, and at what rate.',
      ],
      mr: [
        'शेतकरी व व्यापारी आणत असलेले सोयाबीन, मका, गहू, बाजरी व ज्वारी आम्ही स्वच्छ करतो. स्वच्छतेमध्ये धूळ, भुसा, काड्या, लहान दगड व धान्याशी संबंध नसलेले इतर पदार्थ वेगळे केले जातात.',
        'स्वच्छ धान्याचे वजन योग्य राहते, साठवणूक चांगली होते आणि ते विक्रीसाठी किंवा पुढील प्रक्रियेसाठी तयार होते.',
        'वाहन भरण्यापूर्वी पीक व अंदाजे प्रमाण सांगा, आम्ही किती माल घेऊ शकतो, केव्हा घेऊ शकतो आणि दर काय असेल ते सांगू.',
      ],
    },
    crops: ['soybean', 'maize', 'wheat', 'bajra', 'jowar'],
    photoKey: 'service-cleaning',
    specs: [],
  },
  {
    slug: 'commodity-trading',
    name: {
      en: 'Agricultural Commodity Buying & Selling',
      mr: 'शेतीमाल खरेदी व विक्री',
    },
    summary: {
      en: 'Buying and selling soybean, maize, wheat, bajra and jowar. Availability and rate are confirmed on enquiry.',
      mr: 'सोयाबीन, मका, गहू, बाजरी व ज्वारी यांची खरेदी व विक्री. उपलब्धता व दर चौकशीवरून निश्चित होतात.',
    },
    body: {
      en: [
        'We buy and sell agricultural commodities — soybean, maize, wheat, bajra and jowar. Farmers can bring their produce to the unit, and buyers can ask what is available.',
        'Availability changes with the season and with what has come in, so we do not list every commodity as always in stock. Tell us what you need and the quantity, and we will confirm what is available and at what rate.',
        'If you are selling, tell us the crop, the quantity and where it is coming from. If you are buying, tell us the crop, the quantity and when you need it.',
      ],
      mr: [
        'आम्ही शेतीमालाची — सोयाबीन, मका, गहू, बाजरी व ज्वारी यांची — खरेदी व विक्री करतो. शेतकरी आपला माल युनिटवर आणू शकतात आणि खरेदीदार काय उपलब्ध आहे ते विचारू शकतात.',
        'उपलब्धता हंगामावर व येलेल्या मालावर अवलंबून बदलते, म्हणून प्रत्येक शेतीमाल सर्व वेळ उपलब्ध असल्याचे आम्ही सांगत नाही. तुम्हाला काय हवे आहे व किती प्रमाण, हे सांगा, आम्ही उपलब्धता व दर निश्चित करून सांगू.',
        'तुम्ही विकत असाल तर पीक, प्रमाण व माल कुठून येत आहे हे सांगा. तुम्ही खरेदी करत असाल तर पीक, प्रमाण व तो कधी हवा आहे हे सांगा.',
      ],
    },
    crops: ['soybean', 'maize', 'wheat', 'bajra', 'jowar'],
    photoKey: 'processed-grain-varieties',
    specs: [],
  },
  {
    slug: 'dal-processing',
    name: { en: 'Dal Processing', mr: 'डाळ प्रक्रिया' },
    summary: {
      en: 'Processing tur, moong, urad and chana into dal, and selling the finished dal.',
      mr: 'तूर, मूग, उडीद व हरभरा यांवर प्रक्रिया करून डाळ तयार करणे व तयार डाळ विकणे.',
    },
    body: {
      en: [
        'We process tur, moong, urad and chana into dal. The whole pulses are cleaned and processed into dal at our unit.',
        'The dal is also sold from the unit — tur dal, moong dal, urad dal and chana dal. Tell us which dal you need and the quantity, and we will confirm availability and rate.',
        'If you have your own pulses to process, tell us the pulse, the approximate quantity and the form you need. We will confirm what we can do for that lot.',
      ],
      mr: [
        'आम्ही तूर, मूग, उडीद व हरभरा यांवर प्रक्रिया करून डाळ तयार करतो. संपूर्ण कडधान्य स्वच्छ करून आमच्याच युनिटमध्ये डाळ तयार केली जाते.',
        'ही डाळ युनिटवरून विकलीही जाते — तूरडाळ, मूगडाळ, उडीदडाळ व चणाडाळ. तुम्हाला कोणती डाळ हवी आहे व किती प्रमाण, हे सांगा, आम्ही उपलब्धता व दर सांगू.',
        'तुमच्याकडे प्रक्रिया करायचे कडधान्य असल्यास कडधान्य, अंदाजे प्रमाण व हवे असलेले स्वरूप सांगा. त्या मालासाठी आम्ही काय करू शकतो ते सांगू.',
      ],
    },
    crops: ['tur', 'moong', 'urad', 'chana'],
    inquiryInterest: 'Tur Dal',
    photoKey: 'service-dal-milling',
    specs: [],
  },
  {
    slug: 'animal-feed-bharada',
    name: {
      en: 'Animal Feed Bharada Preparation',
      mr: 'पशुखाद्य भरडा तयार करणे',
    },
    summary: {
      en: 'Preparing पशुखाद्य भरडा by combining and coarsely processing maize, dal husk, chura, wheat and soybean.',
      mr: 'मका, डाळींचा भुसा, चुरा, गहू व सोयाबीन एकत्र करून जाडसर प्रक्रिया करून पशुखाद्य भरडा तयार करणे.',
    },
    body: {
      en: [
        'We prepare animal feed bharada — पशुखाद्य भरडा — by combining and coarsely processing maize, dal husk, chura, wheat and soybean.',
        'In simple terms: maize and wheat bring the grain, dal husk (डाळींचा भुसा) and chura (चुरा) are the finer by-products of pulse processing, and soybean is added to the mix. These ingredients are combined and ground coarsely to make the bharada.',
        'We do not claim that this bharada is a nutritionally balanced or certified feed, or that it is suited to a particular animal. Tell us the quantity you need and what you are feeding, and we will confirm what we can supply.',
      ],
      mr: [
        'आम्ही मका, डाळींचा भुसा, चुरा, गहू व सोयाबीन एकत्र करून जाडसर प्रक्रिया करून पशुखाद्य भरडा तयार करतो.',
        'सोप्या शब्दांत: मका व गहू हे धान्याचा भाग देतात, डाळींचा भुसा व चुरा हे डाळ प्रक्रियेतील बारीक उपपदार्थ आहेत, आणि सोयाबीन मिश्रणात घातले जाते. हे घटक एकत्र करून जाडसर दळून भरडा तयार केला जातो.',
        'हा भरडा पोषणदृष्ट्या संतुलित किंवा प्रमाणित खाद्य आहे, किंवा कोणत्यातरी विशिष्ट जनावरासाठी योग्य आहे — असा आम्ही दावा करत नाही. तुम्हाला किती प्रमाण हवे आहे व कशासाठी वापरणार आहात हे सांगा, आम्ही काय पुरवू शकतो ते सांगू.',
      ],
    },
    crops: ['maize', 'wheat', 'soybean'],
    inquiryInterest: 'Animal Feed Bharada',
    photoKey: 'machinery-with-output-bags',
    specs: [],
  },
];

export function findService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Crops and pulses confirmed as handled by the business. */
export type Crop = {
  id: string;
  name: L;
};

export const crops: Crop[] = [
  { id: 'soybean', name: { en: 'Soybean', mr: 'सोयाबीन' } },
  { id: 'maize', name: { en: 'Maize', mr: 'मका' } },
  { id: 'wheat', name: { en: 'Wheat', mr: 'गहू' } },
  { id: 'bajra', name: { en: 'Bajra', mr: 'बाजरी' } },
  { id: 'jowar', name: { en: 'Jowar', mr: 'ज्वारी' } },
  { id: 'tur', name: { en: 'Tur', mr: 'तूर' } },
  { id: 'moong', name: { en: 'Moong', mr: 'मूग' } },
  { id: 'urad', name: { en: 'Urad', mr: 'उडीद' } },
  { id: 'chana', name: { en: 'Chana', mr: 'हरभरा' } },
];
