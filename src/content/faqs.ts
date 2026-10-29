import type { L } from '@/lib/i18n';
import { site } from '@/content/site';

/**
 * FAQ content (SRS §7.7).
 *
 * Every answer is limited to what the business has actually confirmed. Where a
 * fact is still pending (capacity, pack sizes) the answer says so honestly and
 * routes the customer to a working contact channel, instead of inventing a
 * detail.
 */
export type Faq = {
  id: string;
  question: L;
  answer: L;
  /** Show on the homepage FAQ preview. */
  featured?: boolean;
};

export const faqs: Faq[] = [
  {
    id: 'crops',
    featured: true,
    question: {
      en: 'Which crops and pulses do you work with?',
      mr: 'तुम्ही कोणती पिके व कडधान्य हाताळता?',
    },
    answer: {
      en: 'We clean and trade soybean, maize, wheat, bajra and jowar. We process tur, moong, urad and chana into dal. If your crop or pulse is not on this list, send us an enquiry and we will tell you honestly whether we can help.',
      mr: 'आम्ही सोयाबीन, मका, गहू, बाजरी व ज्वारी स्वच्छ करतो आणि त्यांची खरेदी-विक्री करतो. आम्ही तूर, मूग, उडीद व हरभरा यांची डाळ तयार करतो. या यादीत तुमचे पीक किंवा कडधान्य नसल्यास चौकशी पाठवा, आम्ही मदत करू शकतो की नाही हे प्रामाणिकपणे सांगू.',
    },
  },
  {
    id: 'services',
    featured: true,
    question: { en: 'What services do you provide?', mr: 'तुम्ही कोणत्या सेवा देतात?' },
    answer: {
      en: 'Four services: grain cleaning; agricultural commodity buying and selling; dal processing; and animal feed bharada preparation. Cleaning removes unwanted material from soybean, maize, wheat, bajra and jowar, and we also buy and sell those commodities. Dal processing turns tur, moong, urad and chana into dal, which we sell. Bharada is made by combining and coarsely processing maize, dal husk, chura, wheat and soybean.',
      mr: 'चार सेवा: धान्य स्वच्छता; शेतीमाल खरेदी व विक्री; डाळ प्रक्रिया; आणि पशुखाद्य भरडा तयार करणे. स्वच्छतेमध्ये सोयाबीन, मका, गहू, बाजरी व ज्वारीतील अनावश्यक पदार्थ वेगळे केले जातात, आणि या शेतीमालाची आम्ही खरेदी-विक्रीही करतो. डाळ प्रक्रियेत तूर, मूग, उडीद व हरभरा यांची डाळ तयार होते, जी आम्ही विकतो. मका, डाळींचा भुसा, चुरा, गहू व सोयाबीन एकत्र करून जाडसर प्रक्रिया करून भरडा तयार केला जातो.',
    },
  },
  {
    id: 'cleaning',
    question: { en: 'Do you provide grain cleaning?', mr: 'तुम्ही धान्य स्वच्छता करता का?' },
    answer: {
      en: 'Yes. We clean soybean, maize, wheat, bajra and jowar. Cleaning removes dust, chaff, straw, small stones and other unwanted material from harvested grain, so it weighs honestly, stores better and is ready for sale or for dal processing.',
      mr: 'होय. आम्ही सोयाबीन, मका, गहू, बाजरी व ज्वारी स्वच्छ करतो. स्वच्छतेमध्ये कापणी केलेल्या धान्यातील धूळ, भुसा, काड्या, लहान दगड व इतर अनावश्यक पदार्थ वेगळे केले जातात, त्यामुळे वजन योग्य राहते, साठवणूक चांगली होते आणि ते विक्रीसाठी किंवा डाळ प्रक्रियेसाठी तयार होते.',
    },
  },
  {
    id: 'commodities',
    featured: true,
    question: { en: 'Do you buy and sell grain?', mr: 'तुम्ही धान्याची खरेदी-विक्री करता का?' },
    answer: {
      en: 'Yes — soybean, maize, wheat, bajra and jowar. Farmers can bring their produce to the unit, and buyers can ask what is currently available. Availability changes with the season, so we do not treat every commodity as always in stock; send an enquiry with the crop and quantity and we will confirm availability and rate.',
      mr: 'होय — सोयाबीन, मका, गहू, बाजरी व ज्वारी. शेतकरी आपला माल युनिटवर आणू शकतात आणि खरेदीदार सध्या काय उपलब्ध आहे ते विचारू शकतात. उपलब्धता हंगामानुसार बदलते, म्हणून प्रत्येक शेतीमाल सर्व वेळ उपलब्ध असल्याचे आम्ही सांगत नाही; पीक व प्रमाण यासह चौकशी पाठवा, आम्ही उपलब्धता व दर सांगू.',
    },
  },
  {
    id: 'pulses',
    featured: true,
    question: {
      en: 'Which pulses do you process and sell?',
      mr: 'तुम्ही कोणते कडधान्य प्रक्रिया करून विकता?',
    },
    answer: {
      en: 'We process tur, moong, urad and chana into dal at our unit, and sell tur dal, moong dal, urad dal and chana dal. Tell us which dal you need and the quantity, and we will confirm availability and rate.',
      mr: 'आम्ही तूर, मूग, उडीद व हरभरा यांची आमच्याच युनिटमध्ये डाळ तयार करतो आणि तूरडाळ, मूगडाळ, उडीदडाळ व चणाडाळ विकतो. तुम्हाला कोणती डाळ हवी आहे व किती प्रमाण, हे सांगा, आम्ही उपलब्धता व दर सांगू.',
    },
  },
  {
    id: 'bharada',
    featured: true,
    question: { en: 'What is animal feed bharada?', mr: 'पशुखाद्य भरडा म्हणजे काय?' },
    answer: {
      en: 'Bharada — पशुखाद्य भरडा — is an animal feed made by combining and coarsely processing maize, dal husk, chura, wheat and soybean. We prepare it at our unit. We do not claim it is nutritionally balanced or certified, or that it suits a particular animal; tell us what you need and we will confirm what we can supply.',
      mr: 'भरडा — पशुखाद्य भरडा — म्हणजे मका, डाळींचा भुसा, चुरा, गहू व सोयाबीन एकत्र करून जाडसर प्रक्रिया करून तयार केलेले पशुखाद्य. तो आमच्याच युनिटमध्ये तयार होतो. तो पोषणदृष्ट्या संतुलित किंवा प्रमाणित आहे, किंवा कोणत्यातरी विशिष्ट जनावरासाठी योग्य आहे — असा आम्ही दावा करत नाही; तुम्हाला काय हवे आहे ते सांगा, आम्ही काय पुरवू शकतो ते सांगू.',
    },
  },
  {
    id: 'quantity',
    question: { en: 'What quantity can I bring?', mr: 'मी किती प्रमाण आणू शकतो?' },
    answer: {
      en: 'Quantities are handled case by case, so the honest answer depends on your lot and what you need done. Share the crop or pulse, the approximate quantity and your preferred date through the enquiry form or on WhatsApp, and we will confirm what we can take and when.',
      mr: 'प्रत्येक मालाची व गरजेची बाब वेगळी असते, त्यामुळे योग्य उत्तर तुमच्या मालावर व तुम्हाला काय हवे आहे यावर अवलंबून असते. चौकशी फॉर्मवर किंवा व्हॉट्सअ‍ॅपवर पीक किंवा कडधान्य, अंदाजे प्रमाण व तुमची पसंतीची तारीख कळवा, आम्ही किती माल व केव्हा घेऊ शकतो ते सांगू.',
    },
  },
  {
    id: 'quote',
    featured: true,
    question: { en: 'How can I request a quotation?', mr: 'मी दराची चौकशी कशी करू?' },
    answer: {
      en: 'Use the Get a Quote form and give us your name, mobile number, what you need and how much. You can also call or message us on WhatsApp. We will get back to you with the details for your requirement.',
      mr: 'दर चौकशी फॉर्म भरा आणि तुमचे नाव, मोबाइल क्रमांक, तुम्हाला काय हवे आहे व किती प्रमाण याची माहिती द्या. तुम्ही फोन करू शकता किंवा व्हॉट्सअ‍ॅपवर संदेश पाठवू शकता. तुमच्या गरजेनुसार माहिती घेऊन आम्ही संपर्क करू.',
    },
  },
  {
    id: 'bulk',
    question: { en: 'Do you accept bulk orders?', mr: 'तुम्ही घाऊक ऑर्डर घेता का?' },
    answer: {
      en: 'Yes. We work with farmers, traders, wholesale buyers and commercial buyers, alongside retail customers. For bulk quantities, mention the volume and the expected schedule in your enquiry so we can respond with the right information.',
      mr: 'होय. आम्ही शेतकरी, व्यापारी, घाऊक खरेदीदार व व्यावसायिक खरेदीदारांसोबतच किरकोळ ग्राहकांसोबतही काम करतो. घाऊक प्रमाणासाठी चौकशीत प्रमाण व अपेक्षित वेळ द्या, जेणेकरून आम्ही योग्य माहिती देऊ शकू.',
    },
  },
  {
    id: 'location',
    featured: true,
    question: { en: 'How do I reach the facility?', mr: 'मी युनिटपर्यंत कसा पोहोचू?' },
    answer: {
      en: `The unit is on the Dhule–Solapur Highway at Diwashi, Kasabkheda, near Bharat Petroleum. Use the Get Directions button on the Contact page to open the location in Google Maps, or call us on ${site.phoneDisplay} before you set out and we will guide you in.`,
      mr: `युनिट धुळे–सोलापूर महामार्गावर, दिवाशी, कसबखेडा येथे, भारत पेट्रोलियमजवळ आहे. संपर्क पानावरील "दिशा मिळवा" बटणावर क्लिक करून स्थान Google Maps मध्ये उघडा, किंवा निघण्यापूर्वी ${site.phoneDisplay} वर फोन करा, आम्ही रस्ता सांगू.`,
    },
  },
  {
    id: 'hours',
    question: { en: 'What are your operating hours?', mr: 'तुमची वेळ काय आहे?' },
    answer: {
      en: `We are open Monday to Saturday, 9:00 am to 6:00 pm, and Sunday, 9:00 am to 3:00 pm. If you are bringing a loaded vehicle, call ahead on ${site.phoneDisplay} so we can make space for you to unload.`,
      mr: `आम्ही सोमवार ते शनिवार सकाळी ९:०० ते सायंकाळी ६:०० आणि रविवारी सकाळी ९:०० ते दुपारी ३:०० उघडे असतो. भरलेले वाहन घेऊन येत असल्यास ${site.phoneDisplay} वर आधी फोन करा, म्हणजे माल उतरवण्यासाठी जागा करून देऊ.`,
    },
  },
  {
    id: 'contact',
    featured: true,
    question: { en: 'How can I contact Om Agrosphere?', mr: 'ओम अ‍ॅग्रोस्फिअरशी संपर्क कसा करू?' },
    answer: {
      en: `Call or message us on ${site.phoneDisplay} — the same number works on WhatsApp — email ${site.email}, or send an enquiry through the Get a Quote or Contact form.`,
      mr: `आम्हाला ${site.phoneDisplay} वर फोन करा किंवा संदेश पाठवा — हाच क्रमांक व्हॉट्सअ‍ॅपवरही चालतो — ${site.email} वर ईमेल करा, किंवा दर चौकशी अथवा संपर्क फॉर्मद्वारे चौकशी पाठवा.`,
    },
  },
];

export const featuredFaqs = faqs.filter((f) => f.featured);

/**
 * Trust points (SRS §7.1.6). Each one is a factual statement about how the
 * business works — no awards, certifications, capacities or statistics, because
 * none have been confirmed.
 */
export const trustPoints: { title: L; body: L }[] = [
  {
    title: { en: 'Cleaning, trading and processing', mr: 'स्वच्छता, खरेदी-विक्री व प्रक्रिया' },
    body: {
      en: 'Grain cleaning, commodity buying and selling, dal processing and animal feed preparation are the business — not a side activity. Your material goes through a unit built and run for that purpose.',
      mr: 'धान्य स्वच्छता, शेतीमालाची खरेदी-विक्री, डाळ प्रक्रिया व पशुखाद्य तयार करणे हाच आमचा व्यवसाय आहे — ही उपकाम नाही. तुमचा माल याच कामासाठी उभारलेल्या व चालवल्या जाणाऱ्या युनिटमधून जातो.',
    },
  },
  {
    title: { en: 'Straight answers on quantity and rate', mr: 'प्रमाण व दराबाबत स्पष्ट उत्तर' },
    body: {
      en: 'Tell us the crop or product and the approximate quantity and you get a clear answer on what we can take, when, and at what rate — before you load the vehicle.',
      mr: 'पीक किंवा उत्पादन व अंदाजे प्रमाण सांगा आणि माल वाहनात भरण्यापूर्वीच किती घेऊ, केव्हा घेऊ व दर काय — याचे स्पष्ट उत्तर मिळेल.',
    },
  },
  {
    title: { en: 'On the Dhule–Solapur Highway', mr: 'धुळे–सोलापूर महामार्गावर' },
    body: {
      en: 'The unit sits on the highway at Diwashi, near Bharat Petroleum, so loaded vehicles can reach it directly without entering congested market roads.',
      mr: 'युनिट महामार्गावर, दिवाशी येथे, भारत पेट्रोलियमजवळ आहे, त्यामुळे भरलेली वाहने गर्दीच्या बाजारपेठेच्या रस्त्यांत न जाता थेट पोहोचू शकतात.',
    },
  },
  {
    title: { en: 'Run by people from agriculture', mr: 'शेतीतील माणसांकडून चालवले जाते' },
    body: {
      en: 'We buy, handle and process agricultural produce every working day. We understand what a harvest season demands, because it is the same work our customers are in.',
      mr: 'आम्ही दर कामकाजाच्या दिवशी शेतमाल खरेदी करतो, हाताळतो व प्रक्रिया करतो. कापणीच्या हंगामाची मागणी काय असते हे आम्हाला माहीत आहे, कारण आमचे ग्राहक ज्यात आहेत तेच काम आम्ही करतो.',
    },
  },
  {
    title: { en: 'Grain, dal and feed in one place', mr: 'धान्य, डाळ व खाद्य एकाच ठिकाणी' },
    body: {
      en: 'You do not have to move the same lot between different places. Bring grain for cleaning, pulses for dal, or ask about buying and selling — and collect dal or bharada from the same unit.',
      mr: 'एकाच मालाला वेगवेगळ्या ठिकाणी नेण्याची गरज नाही. स्वच्छतेसाठी धान्य, डाळीसाठी कडधान्य आणा, किंवा खरेदी-विक्रीबद्दल विचारा — आणि त्याच युनिटमधून डाळ किंवा भरडा घेऊन जा.',
    },
  },
  {
    title: { en: 'Enquiries answered in Marathi or English', mr: 'चौकशी मराठी किंवा इंग्रजीत उत्तर' },
    body: {
      en: 'Write or call in Marathi or English — whichever you are comfortable with. Send your requirement and we will respond with the information you asked for.',
      mr: 'मराठी किंवा इंग्रजीत लिहा किंवा फोन करा — तुम्हाला जे सोपे वाटते ते. तुमची गरज कळवा, आम्ही मागितलेल्या माहितीसह उत्तर देऊ.',
    },
  },
];
