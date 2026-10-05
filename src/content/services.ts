import type { L, LList } from '@/lib/i18n';

/**
 * Services offered by Om Agrosphere (SRS §7.3, §21).
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
  photoKey:
    | 'service-cleaning'
    | 'service-sorting'
    | 'service-grading'
    | 'service-dal-milling'
    | 'service-spice-grinding';
  specs: ServiceSpec[];
};

export const services: Service[] = [
  {
    slug: 'grain-cleaning',
    name: { en: 'Grain Cleaning', mr: 'धान्य स्वच्छता' },
    summary: {
      en: 'Removing dust, chaff, stones and other unwanted material from harvested grain.',
      mr: 'कापणी केलेल्या धान्यातील धूळ, भुसा, दगड व इतर अनावश्यक पदार्थ वेगळे करणे.',
    },
    body: {
      en: [
        'Grain that comes straight from the field carries dust, chaff, straw, small stones and other material that has nothing to do with the crop itself. Cleaning removes that material before anything else is done with the grain.',
        'The result is grain that weighs honestly, stores better and is ready for the next step — whether that is grading, milling, or sale.',
        'Tell us what you are bringing and what you want the final material to be, and we will suggest the right process for it.',
      ],
      mr: [
        'शेतातून थेट आलेल्या धान्यात धूळ, भुसा, काड्या, लहान दगड व इतर अनावश्यक पदार्थ असतात. धान्यावर पुढील कोणतीही प्रक्रिया करण्यापूर्वी हे पदार्थ वेगळे करणे आवश्यक असते.',
        'यामुळे धान्याचे वजन योग्य राहते, साठवणूक चांगली होते आणि पुढील टप्प्यासाठी — मग तो ग्रेडिंग, दळण किंवा विक्री असो — धान्य तयार होते.',
        'तुम्ही कोणता माल आणत आहात आणि अंतिम माल कसा हवा आहे हे सांगा, आम्ही त्यासाठी योग्य प्रक्रिया सुचवू.',
      ],
    },
    crops: ['wheat', 'jowar', 'bajra', 'tur', 'chana', 'moong', 'urad'],
    photoKey: 'service-cleaning',
    specs: [],
  },
  {
    slug: 'grain-sorting',
    name: { en: 'Grain Sorting', mr: 'धान्य प्रतवारी' },
    summary: {
      en: 'Separating grain on the basis of physical characteristics so that lots come out uniform.',
      mr: 'धान्याच्या भौतिक गुणधर्मांनुसार वेगळे करून एकसारखे भाग तयार करणे.',
    },
    body: {
      en: [
        'Sorting separates grain on the basis of physical characteristics — things like size, weight and shape. Mixed material goes in; separate, more uniform streams come out.',
        'Uniform lots are easier to sell, easier to price and easier to process further. Buyers can see what they are getting, and a single lot no longer carries the weak material of the whole harvest.',
        'Sorting is most useful when your grain is of mixed quality, or when a buyer has asked for a particular standard.',
      ],
      mr: [
        'प्रतवारीमध्ये धान्य आकार, वजन व रचना यांसारख्या भौतिक गुणधर्मांनुसार वेगळे केले जाते. मिश्र माल आत जातो आणि एकसारखे, स्वतंत्र भाग बाहेर पडतात.',
        'एकसारख्या भागांची विक्री सोपी होते, भाव ठरवणे सोपे होते आणि पुढील प्रक्रिया सुलभ होते. खरेदीदाराला काय मिळत आहे हे स्पष्ट दिसते आणि एका भागावर संपूर्ण मालाचा तोल सहन करावा लागत नाही.',
        'धान्य मिश्र दर्जाचे असल्यास किंवा खरेदीदाराने विशिष्ट दर्जा मागितल्यास प्रतवारी विशेष उपयोगी पडते.',
      ],
    },
    crops: ['wheat', 'jowar', 'bajra', 'tur', 'chana', 'moong', 'urad'],
    photoKey: 'service-sorting',
    specs: [],
  },
  {
    slug: 'grain-grading',
    name: { en: 'Grain Grading', mr: 'धान्य ग्रेडिंग' },
    summary: {
      en: 'Separating grain by size and quality so each grade can be sold or used on its own terms.',
      mr: 'आकार व दर्जानुसार धान्य वेगळे करून प्रत्येक प्रकार स्वतंत्रपणे वापरण्यास योग्य करणे.',
    },
    body: {
      en: [
        'Grading takes separation one step further by fixing clear grades — usually by size, and by how clean and sound the grain is. Each grade is then handled as its own lot.',
        'This matters when different buyers want different things from the same crop: a premium grade for one purpose, a standard grade for another, and a residual grade for feed or industrial use.',
        'If you already have a grade specification from your buyer, share it with us and we will process to that specification.',
      ],
      mr: [
        'ग्रेडिंगमध्ये प्रतवारी पुढे नेऊन ठराविक प्रकार निश्चित केले जातात — सामान्यतः आकारानुसार, तसेच धान्य किती स्वच्छ व निरोगी आहे त्यानुसार. त्यानंतर प्रत्येक प्रकार स्वतंत्र माल म्हणून हाताळला जातो.',
        'एकाच पिकातून वेगवेगळ्या खरेदीदारांना वेगवेगळे हवे असते तेव्हा हे महत्त्वाचे ठरते: एका उपयोगासाठी उच्च प्रतीचा प्रकार, दुसऱ्यासाठी सामान्य प्रकार आणि खाद्य किंवा उद्योगासाठी उरलेला प्रकार.',
        'तुमच्या खरेदीदाराने ग्रेडचे वर्णन दिले असल्यास ते आम्हाला सांगा, आम्ही त्याच वर्णनानुसार प्रक्रिया करू.',
      ],
    },
    crops: ['wheat', 'jowar', 'bajra', 'tur', 'chana', 'moong', 'urad'],
    photoKey: 'service-grading',
    specs: [],
  },
  {
    slug: 'dal-milling',
    name: { en: 'Dal Milling / Pulse Processing', mr: 'डाळ मिल / कडधान्य प्रक्रिया' },
    summary: {
      en: 'Processing pulses such as tur, chana, moong and urad into dal.',
      mr: 'तूर, हरभरा, मूग व उडीद यांसारख्या कडधान्यावर प्रक्रिया करून डाळ तयार करणे.',
    },
    body: {
      en: [
        'Dal milling turns whole pulses into dal. In broad terms the pulse is cleaned, the outer husk is separated, the grain is split, and the result is graded — with each step adjusted for the particular pulse being processed.',
        'Tur, chana, moong and urad behave differently from one another, so the process and the expected outcome differ for each. Bring us the pulse and tell us what you need — whole, split, with or without husk — and we will confirm what we can do for that lot.',
        'Dal milling is usually taken up along with cleaning and grading, so the material you take away is ready for sale or for your own use.',
      ],
      mr: [
        'डाळ मिलमध्ये संपूर्ण कडधान्यावर प्रक्रिया करून डाळ तयार होते. सर्वसाधारणपणे कडधान्य स्वच्छ केले जाते, बाहेरील साल वेगळी केली जाते, दाणे फोडले जातात आणि तयार मालाचे प्रकार केले जातात — प्रत्येक टप्पा त्या विशिष्ट कडधान्यानुसार ठरवला जातो.',
        'तूर, हरभरा, मूग व उडीद यांचे गुणधर्म वेगवेगळे असल्याने प्रक्रिया व त्याचा निकालही वेगळा असतो. तुमचे कडधान्य घेऊन या आणि तुम्हाला काय हवे आहे ते सांगा — संपूर्ण, फोडलेले, सालीसकट किंवा साल काढून — त्या मालासाठी आम्ही काय करू शकतो ते आम्ही सांगू.',
        'डाळ मिलची प्रक्रिया सामान्यतः स्वच्छता व ग्रेडिंगसोबतच केली जाते, जेणेकरून तुम्ही घेऊन जाणारा माल विक्रीसाठी किंवा स्वतःच्या वापरासाठी तयार असेल.',
      ],
    },
    crops: ['tur', 'chana', 'moong', 'urad'],
    photoKey: 'service-dal-milling',
    specs: [],
  },
  {
    slug: 'spice-grinding',
    name: { en: 'Spice Grinding & Packaging', mr: 'मसाला दळण व पॅकिंग' },
    summary: {
      en: 'Grinding whole spices into powder, and packing the ground material for supply.',
      mr: 'संपूर्ण मसाले कुटून पूड करणे आणि तयार पूड पुरवठ्यासाठी पॅक करणे.',
    },
    body: {
      en: [
        'Spice grinding runs alongside our grain work. Spices that arrive whole are cleaned and ground, and the resulting powder can be packed for supply.',
        'This covers two kinds of requirement: customers who have their own raw spice and want it ground, and buyers who want finished spice powder supplied to them in bulk or in retail packs.',
        'Which spices are available at any given time depends on the season and on the raw material we have in hand. The full list of varieties and pack sizes is being confirmed with the business — send an enquiry naming the spice and the quantity you need and we will tell you what is possible.',
      ],
      mr: [
        'मसाला दळण हे आमच्या धान्य प्रक्रियेसोबतच चालते. संपूर्ण मसाले स्वच्छ करून कुटले जातात आणि तयार पूड पुरवठ्यासाठी पॅक केली जाऊ शकते.',
        'यात दोन प्रकारच्या गरजा येतात: स्वतःचा कच्चा मसाला दळून घ्यायचा असलेले ग्राहक, आणि तयार मसाला पूड घाऊक किंवा किरकोळ पॅकमध्ये हवी असलेले खरेदीदार.',
        'कोणते मसाले कधी उपलब्ध असतील हे हंगामावर व आमच्याकडील कच्च्या मालावर अवलंबून असते. प्रकारांची व पॅकिंगच्या आकारांची संपूर्ण यादी व्यवसायाकडून निश्चित होत आहे — तुम्हाला हवा असलेला मसाला व प्रमाण लिहून चौकशी पाठवा, काय शक्य आहे ते आम्ही सांगू.',
      ],
    },
    // Spices are not in the crop list, so no crop chips are shown for this one.
    crops: [],
    inquiryInterest: 'Spices',
    photoKey: 'service-spice-grinding',
    specs: [],
  },
];

export function findService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Crops confirmed as supported by the business (SRS §3.1). */
export type Crop = {
  id: string;
  name: L;
  /**
   * `feed` marks crops that also feed into corn-grit style animal feed work.
   * Kept explicit rather than inferred so the site never implies a capability
   * the business has not confirmed.
   */
  note?: L;
};

export const crops: Crop[] = [
  { id: 'wheat', name: { en: 'Wheat', mr: 'गहू' } },
  { id: 'jowar', name: { en: 'Jowar', mr: 'ज्वारी' } },
  { id: 'bajra', name: { en: 'Bajra', mr: 'बाजरी' } },
  { id: 'tur', name: { en: 'Tur', mr: 'तूर' } },
  { id: 'chana', name: { en: 'Chana', mr: 'हरभरा' } },
  { id: 'moong', name: { en: 'Moong', mr: 'मूग' } },
  { id: 'urad', name: { en: 'Urad', mr: 'उडीद' } },
];
