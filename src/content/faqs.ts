import type { L } from '@/lib/i18n';
import { site } from '@/content/site';

/**
 * FAQ content (SRS §7.7).
 *
 * Every answer is limited to what the business has actually confirmed. Where a
 * fact is still pending (capacity, pack sizes, spice varieties) the answer says
 * so honestly and routes the customer to a working contact channel, instead of
 * inventing a detail.
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
    question: { en: 'Which crops do you process?', mr: 'तुम्ही कोणती पिके प्रक्रिया करता?' },
    answer: {
      en: 'We work with wheat, jowar, bajra, tur, chana, moong and urad. The service that applies to each crop depends on what you need — cleaning, sorting, grading or dal milling. If your crop is not on this list, send us an enquiry and we will tell you honestly whether we can help.',
      mr: 'आम्ही गहू, ज्वारी, बाजरी, तूर, हरभरा, मूग व उडीद यांवर काम करतो. प्रत्येक पिकासाठी कोणती सेवा लागू होते हे तुमच्या गरजेवर अवलंबून असते — स्वच्छता, प्रतवारी, ग्रेडिंग किंवा डाळ मिल. या यादीत तुमचे पीक नसल्यास चौकशी पाठवा, आम्ही मदत करू शकतो की नाही हे प्रामाणिकपणे सांगू.',
    },
  },
  {
    id: 'services',
    featured: true,
    question: { en: 'What services do you provide?', mr: 'तुम्ही कोणत्या सेवा देतात?' },
    answer: {
      en: 'Five services: grain cleaning, grain sorting, grain grading, dal milling / pulse processing, and spice grinding and packaging. Cleaning removes unwanted material, sorting separates grain by physical characteristics, grading fixes clear quality and size grades, dal milling processes pulses into dal, and spice grinding turns whole spices into packed powder.',
      mr: 'पाच सेवा: धान्य स्वच्छता, धान्य प्रतवारी, धान्य ग्रेडिंग, डाळ मिल / कडधान्य प्रक्रिया आणि मसाला दळण व पॅकिंग. स्वच्छतेमध्ये अनावश्यक पदार्थ वेगळे केले जातात, प्रतवारीत धान्य भौतिक गुणधर्मांनुसार वेगळे होते, ग्रेडिंगमध्ये दर्जा व आकारानुसार प्रकार ठरवले जातात, डाळ मिलमध्ये कडधान्यावर प्रक्रिया करून डाळ तयार होते आणि मसाला दळणात संपूर्ण मसाले कुटून पॅक केलेली पूड तयार होते.',
    },
  },
  {
    id: 'cleaning',
    question: { en: 'Do you provide grain cleaning?', mr: 'तुम्ही धान्य स्वच्छता करता का?' },
    answer: {
      en: 'Yes. Cleaning removes dust, chaff, straw, small stones and other unwanted material from harvested grain. It is usually the first step before grading or milling, because clean grain weighs honestly and stores better.',
      mr: 'होय. स्वच्छतेमध्ये कापणी केलेल्या धान्यातील धूळ, भुसा, काड्या, लहान दगड व इतर अनावश्यक पदार्थ वेगळे केले जातात. ग्रेडिंग किंवा दळणापूर्वीचा हा सामान्यतः पहिला टप्पा असतो, कारण स्वच्छ धान्याचे वजन योग्य राहते व साठवणूक चांगली होते.',
    },
  },
  {
    id: 'sorting-grading',
    featured: true,
    question: { en: 'Do you provide grain sorting and grading?', mr: 'तुम्ही धान्य प्रतवारी व ग्रेडिंग करता का?' },
    answer: {
      en: 'Yes. Sorting separates grain on the basis of physical characteristics such as size, weight and shape. Grading goes further and fixes clear grades, so each grade can be sold or used on its own terms. If your buyer has given you a grade specification, bring it along and we will process to that.',
      mr: 'होय. प्रतवारीमध्ये धान्य आकार, वजन व रचना यांसारख्या भौतिक गुणधर्मांनुसार वेगळे केले जाते. ग्रेडिंगमध्ये त्यापुढे जाऊन ठराविक प्रकार निश्चित केले जातात, जेणेकरून प्रत्येक प्रकार स्वतंत्रपणे विकता किंवा वापरता येतो. तुमच्या खरेदीदाराने ग्रेडचे वर्णन दिले असल्यास ते सोबत आणा, आम्ही त्यानुसार प्रक्रिया करू.',
    },
  },
  {
    id: 'pulses',
    question: { en: 'Do you process pulses?', mr: 'तुम्ही कडधान्य प्रक्रिया करता का?' },
    answer: {
      en: 'Yes — tur, chana, moong and urad. Dal milling covers cleaning the pulse, separating the husk, splitting the grain and grading the result, adjusted for whichever pulse you bring. Tell us whether you want it whole, split, with husk or without, and we will confirm what we can do for that lot.',
      mr: 'होय — तूर, हरभरा, मूग व उडीद. डाळ मिलमध्ये कडधान्य स्वच्छ करणे, साल वेगळी करणे, दाणे फोडणे व तयार मालाचे प्रकार करणे यांचा समावेश होतो — तुम्ही आणलेल्या कडधान्यानुसार यात बदल होतो. तुम्हाला संपूर्ण, फोडलेले, सालीसकट किंवा साल काढून हवे आहे हे सांगा, त्या मालासाठी आम्ही काय करू शकतो ते सांगू.',
    },
  },
  {
    id: 'corn-grit',
    featured: true,
    question: { en: 'Do you supply corn grit?', mr: 'तुम्ही मक्याचा भरडा पुरवता का?' },
    answer: {
      en: 'Yes. Corn grit — मक्याचा भरडा — is supplied in bulk for animal feed use. It is produced from maize processed at our own unit. Send an enquiry with the quantity you need and we will confirm availability and rate.',
      mr: 'होय. मक्याचा भरडा जनावरांच्या खाद्यासाठी मोठ्या प्रमाणात पुरवला जातो. तो आमच्याच युनिटमध्ये प्रक्रिया केलेल्या मक्यापासून तयार होतो. तुम्हाला हवे असलेले प्रमाण लिहून चौकशी पाठवा, आम्ही उपलब्धता व दर सांगू.',
    },
  },
  {
    id: 'spices',
    question: { en: 'Which spice products are available?', mr: 'कोणती मसाला उत्पादने उपलब्ध आहेत?' },
    answer: {
      en: 'We grind spice powders at our unit. The full list of varieties and pack sizes is being confirmed and will be published on the Products page. Until then, send an enquiry naming the spice and quantity you need and we will tell you what is available.',
      mr: 'आम्ही आमच्या युनिटमध्ये मसाला पूड कुटतो. प्रकारांची व पॅकिंगच्या आकारांची संपूर्ण यादी निश्चित होत आहे आणि उत्पादने पानावर प्रकाशित केली जाईल. तोपर्यंत तुम्हाला हवा असलेला मसाला व प्रमाण लिहून चौकशी पाठवा, आम्ही काय उपलब्ध आहे ते सांगू.',
    },
  },
  {
    id: 'quantity',
    question: { en: 'What quantity can I bring?', mr: 'मी किती प्रमाण आणू शकतो?' },
    answer: {
      en: 'Quantities are handled case by case, so the honest answer depends on your lot and the service you need. Share the crop, the approximate quantity and your preferred date through the enquiry form or on WhatsApp, and we will confirm what we can take and when.',
      mr: 'प्रत्येक मालाची व प्रक्रियेची गरज वेगळी असते, त्यामुळे योग्य उत्तर तुमच्या मालावर व हव्या असलेल्या सेवेवर अवलंबून असते. चौकशी फॉर्मवर किंवा व्हॉट्सअ‍ॅपवर पीक, अंदाजे प्रमाण व तुमची पसंतीची तारीख कळवा, आम्ही किती माल व केव्हा घेऊ शकतो ते सांगू.',
    },
  },
  {
    id: 'quote',
    featured: true,
    question: { en: 'How can I request a quotation?', mr: 'मी दराची चौकशी कशी करू?' },
    answer: {
      en: 'Use the Get a Quote form and give us your name, mobile number, what you are bringing and how much. You can also call or message us on WhatsApp. We will get back to you with the details for your requirement.',
      mr: 'दर चौकशी फॉर्म भरा आणि तुमचे नाव, मोबाइल क्रमांक, काय आणत आहात व किती प्रमाण याची माहिती द्या. तुम्ही फोन करू शकता किंवा व्हॉट्सअ‍ॅपवर संदेश पाठवू शकता. तुमच्या गरजेनुसार माहिती घेऊन आम्ही संपर्क करू.',
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
    title: { en: 'Processing is what we do', mr: 'प्रक्रिया हेच आमचे काम' },
    body: {
      en: 'Cleaning, sorting, grading and dal milling are the business — not a side activity. Your material goes through a unit built and run for that purpose.',
      mr: 'स्वच्छता, प्रतवारी, ग्रेडिंग व डाळ मिल हाच आमचा व्यवसाय आहे — ही उपकाम नाही. तुमचा माल याच कामासाठी उभारलेल्या व चालवल्या जाणाऱ्या युनिटमधून जातो.',
    },
  },
  {
    title: { en: 'Straight answers on quantity and rate', mr: 'प्रमाण व दराबाबत स्पष्ट उत्तर' },
    body: {
      en: 'Tell us the crop and the approximate quantity and you get a clear answer on what we can take, when, and at what rate — before you load the vehicle.',
      mr: 'पीक व अंदाजे प्रमाण सांगा आणि माल वाहनात भरण्यापूर्वीच किती घेऊ, केव्हा घेऊ व दर काय — याचे स्पष्ट उत्तर मिळेल.',
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
    title: { en: 'Cleaning, grading and milling in one place', mr: 'स्वच्छता, ग्रेडिंग व दळण एकाच ठिकाणी' },
    body: {
      en: 'You do not have to move the same lot between three different places. Bring the material once and take it away ready for sale or use.',
      mr: 'एकाच मालाला तीन वेगवेगळ्या ठिकाणी नेण्याची गरज नाही. माल एकदाच आणा आणि विक्रीसाठी किंवा वापरासाठी तयार घेऊन जा.',
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
