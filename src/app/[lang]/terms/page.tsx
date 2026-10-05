import type { Metadata } from 'next';

import { pick, toLang, type Lang } from '@/lib/i18n';
import { site } from '@/content/site';
import { graph, localBusinessSchema, organizationSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { LegalPage, type LegalBlock } from '@/components/LegalPage';

type PageProps = { params: Promise<{ lang: string }> };

/** Update this when the terms text changes. */
const UPDATED = '5 October 2026';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = toLang((await params).lang);

  const title = lang === 'en' ? 'Terms & Conditions' : 'अटी व शर्ती';
  const description =
    lang === 'en'
      ? 'The terms that apply to using the Om Agrosphere website and to enquiries sent through it.'
      : 'ओम अ‍ॅग्रोस्फिअर संकेतस्थळाच्या वापरावर व त्याद्वारे पाठवल्या जाणाऱ्या चौकशींवर लागू असणाऱ्या अटी.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/terms`,
      languages: { 'en-IN': '/en/terms', 'mr-IN': '/mr/terms', 'x-default': '/en/terms' },
    },
  };
}

const blocks: LegalBlock[] = [
  {
    id: 'scope',
    title: { en: 'What these terms cover', mr: 'या अटी कशावर लागू होतात' },
    body: {
      en: 'These terms apply to your use of this website and to any enquiry you send through it. They do not replace the terms agreed for a specific processing job — those are confirmed separately, lot by lot, as described below.',
      mr: 'या अटी तुमच्या या संकेतस्थळाच्या वापरावर व त्याद्वारे पाठवल्या जाणाऱ्या चौकशीवर लागू होतात. त्या एखाद्या विशिष्ट प्रक्रिया कामासाठी ठरलेल्या अटींची जागा घेत नाहीत — त्या खाली सांगितल्याप्रमाणे प्रत्येक मालासाठी स्वतंत्रपणे ठरवल्या जातात.',
    },
  },
  {
    id: 'information',
    title: { en: 'What this website is', mr: 'हे संकेतस्थळ काय आहे' },
    body: {
      en: 'This site describes the processing services and products of Om Agrosphere. It is information, not an offer. Nothing on it creates a contract, and no price is displayed, because processing is quoted per lot.',
      mr: 'हे संकेतस्थळ ओम अ‍ॅग्रोस्फिअरच्या प्रक्रिया सेवा व उत्पादनांची माहिती देते. ही माहिती आहे, ऑफर नाही. यावरील कोणतीही गोष्ट करार तयार करत नाही, आणि कोणताही दर दाखवलेला नाही, कारण प्रक्रियेचा दर प्रत्येक मालासाठी वेगळा ठरतो.',
    },
  },
  {
    id: 'enquiries',
    title: { en: 'Enquiries and quotations', mr: 'चौकशी व दर' },
    list: {
      en: [
        'Sending an enquiry is a request for information. It does not reserve capacity or commit either side to anything.',
        'Availability, the quantity we can accept, the rate and the expected turnaround are confirmed by the business in reply to your enquiry. Until that confirmation, no rate or date should be treated as agreed.',
        'Rates quoted are for the lot described in your enquiry. If the material that arrives differs in crop, quantity or condition, the rate and the process may change, and we will tell you before starting.',
      ],
      mr: [
        'चौकशी पाठवणे म्हणजे माहिती मागणे. त्यामुळे क्षमता राखून ठेवली जात नाही किंवा कोणत्याही बाजूला बांधीलकी येत नाही.',
        'उपलब्धता, आम्ही घेऊ शकणारे प्रमाण, दर व अपेक्षित वेळ — हे व्यवसाय तुमच्या चौकशीच्या उत्तरात निश्चित करतो. त्या पुष्टीपूर्वी कोणताही दर किंवा तारीख मान्य झाली आहे असे मानू नये.',
        'दिलेला दर तुमच्या चौकशीत वर्णन केलेल्या मालासाठी असतो. आलेला माल पीक, प्रमाण किंवा स्थिती यांत वेगळा असल्यास दर व प्रक्रिया बदलू शकते, आणि सुरू करण्यापूर्वी आम्ही ते तुम्हाला सांगू.',
      ],
    },
  },
  {
    id: 'processing',
    title: { en: 'Terms for a processing job', mr: 'प्रक्रिया कामाच्या अटी' },
    body: {
      en: 'Each job is agreed separately before material is accepted: what is to be done, the expected outcome, the rate, and when the material will be ready. Those agreed points govern that job. The full standard terms for processing — covering delivery, weighing, grade settlement and responsibility for material on the premises — are being finalised by the business and will be provided in writing with your quotation.',
      mr: 'माल स्वीकारण्यापूर्वी प्रत्येक काम स्वतंत्रपणे ठरवले जाते: काय करायचे, अपेक्षित निकाल, दर, आणि माल कधी तयार होईल. ते ठरलेले मुद्दे त्या कामावर लागू होतात. प्रक्रियेच्या संपूर्ण मानक अटी — मालाची आवक, वजन, प्रकारांचे निपटारे व परिसरातील मालाची जबाबदारी यांसह — व्यवसायाकडून अंतिम करण्यात येत आहेत आणि तुमच्या दराबरोबर लिखित स्वरूपात दिल्या जातील.',
    },
  },
  {
    id: 'accuracy',
    title: { en: 'Accuracy of the information here', mr: 'येथील माहितीची अचूकता' },
    body: {
      en: 'We keep this site as accurate as we can and correct it when something changes. Details that the business has not yet confirmed are not published at all, and where a detail is pending you will see that stated plainly rather than a placeholder that looks like a fact. If you spot something wrong, tell us and we will fix it.',
      mr: 'हे संकेतस्थळ आम्ही शक्य तितके अचूक ठेवतो आणि काही बदलल्यास दुरुस्त करतो. व्यवसायाने अजून निश्चित न केलेले तपशील प्रकाशित केले जात नाहीत, आणि तपशील प्रलंबित असल्यास खरे वाटणारे खोटे मजकूर न देता तसे स्पष्ट लिहिलेले दिसते. काही चुकीचे आढळल्यास सांगा, आम्ही दुरुस्त करू.',
    },
  },
  {
    id: 'photographs',
    title: { en: 'Text and photographs', mr: 'मजकूर व छायाचित्रे' },
    body: {
      en: 'The text and any photographs on this site belong to Om Agrosphere. Photographs are of our own unit, machinery, produce and work. Please do not reuse them, or this site’s text, without asking us first.',
      mr: 'या संकेतस्थळावरील मजकूर व छायाचित्रे ओम अ‍ॅग्रोस्फिअरची आहेत. छायाचित्रे आमच्याच युनिट, यंत्रसामग्री, माल व कामाची आहेत. आधी विचारल्याशिवाय ती किंवा येथील मजकूर पुन्हा वापरू नका.',
    },
  },
  {
    id: 'acceptable-use',
    title: { en: 'Using the enquiry form', mr: 'चौकशी फॉर्मचा वापर' },
    list: {
      en: [
        'Send genuine enquiries. Automated or bulk submissions are blocked.',
        'Do not use the form to send unlawful, abusive or misleading content.',
        'Do not attempt to disrupt the site, probe it for weaknesses, or scrape it.',
      ],
      mr: [
        'खऱ्या चौकशी पाठवा. स्वयंचलित किंवा मोठ्या प्रमाणातील सबमिशन अडवली जातात.',
        'बेकायदेशीर, अपमानास्पद किंवा दिशाभूल करणारा मजकूर पाठवण्यासाठी फॉर्मचा वापर करू नका.',
        'संकेतस्थळात अडथळा आणण्याचा, त्यातील त्रुटी शोधण्याचा किंवा ते स्क्रॅप करण्याचा प्रयत्न करू नका.',
      ],
    },
  },
  {
    id: 'external',
    title: { en: 'Links to other services', mr: 'इतर सेवांच्या लिंक्स' },
    body: {
      en: 'The site links to Google Maps for directions and to WhatsApp or your email application for messaging. Those services are run by other companies under their own terms, and we do not control them.',
      mr: 'संकेतस्थळ दिशांसाठी Google Maps आणि संदेशासाठी व्हॉट्सअ‍ॅप किंवा तुमच्या ईमेल ॲपकडे लिंक देते. त्या सेवा इतर कंपन्यांकडून त्यांच्या स्वतःच्या अटींनुसार चालवल्या जातात, आणि त्यावर आमचे नियंत्रण नाही.',
    },
  },
  {
    id: 'liability',
    title: { en: 'Limit of responsibility', mr: 'जबाबदारीची मर्यादा' },
    body: {
      en: 'We work to keep this website available and correct, but we do not promise it will always be free of errors or interruptions. We are not responsible for loss caused by relying on website content alone — confirm the details of your job with us directly before acting on them. Nothing here limits any responsibility that cannot be limited under applicable law.',
      mr: 'हे संकेतस्थळ उपलब्ध व अचूक ठेवण्याचा आम्ही प्रयत्न करतो, पण ते कधीही त्रुटीरहित किंवा खंडरहित राहील असे आम्ही वचन देत नाही. केवळ संकेतस्थळावरील माहितीवर विसंबून झालेल्या नुकसानीस आम्ही जबाबदार नाही — त्यावर कार्य करण्यापूर्वी तुमच्या कामाचे तपशील आमच्याकडून थेट निश्चित करून घ्या. लागू कायद्यानुसार मर्यादित करता येणार नाही अशा कोणत्याही जबाबदारीवर येथे मर्यादा घातलेली नाही.',
    },
  },
  {
    id: 'law',
    title: { en: 'Governing law', mr: 'लागू कायदा' },
    body: {
      en: 'These terms are governed by the laws of India, and disputes are subject to the jurisdiction of the courts that have jurisdiction over Gangapur, Chhatrapati Sambhajinagar district, Maharashtra.',
      mr: 'या अटी भारताच्या कायद्यांनुसार चालतात, आणि वाद गंगापूर, छत्रपती संभाजीनगर जिल्हा, महाराष्ट्र येथे अधिकारक्षेत्र असलेल्या न्यायालयांच्या अधीन असतील.',
    },
  },
  {
    id: 'changes',
    title: { en: 'Changes to these terms', mr: 'या अटींतील बदल' },
    body: {
      en: 'If these terms change, the revision date at the top of this page changes with them. The terms in force when you send an enquiry are the ones that apply to it.',
      mr: 'या अटी बदलल्यास, या पानावरील वर दिलेली अद्ययावत तारीखही बदलेल. तुम्ही चौकशी पाठवताना ज्या अटी लागू होत्या, त्या त्यावर लागू होतील.',
    },
  },
  {
    id: 'contact',
    title: { en: 'Contact', mr: 'संपर्क' },
    body: {
      en: `Questions about these terms go to ${site.email}.`,
      mr: `या अटींबद्दलचे प्रश्न ${site.email} वर पाठवा.`,
    },
  },
];

export default async function TermsPage({ params }: PageProps) {
  const lang: Lang = toLang((await params).lang);

  const trail = [
    { name: { en: 'Home', mr: 'मुख्यपृष्ठ' }, path: '' },
    { name: { en: 'Terms & Conditions', mr: 'अटी व शर्ती' }, path: 'terms' },
  ];

  return (
    <>
      <JsonLd json={graph([organizationSchema(), localBusinessSchema()])} />

      <LegalPage
        lang={lang}
        eyebrow={{ en: 'Legal', mr: 'कायदेशीर' }}
        title={{ en: 'Terms & Conditions', mr: 'अटी व शर्ती' }}
        intro={{
          en: 'What applies when you use this website or send us an enquiry, and how the terms for an actual processing job are agreed.',
          mr: 'हे संकेतस्थळ वापरताना किंवा आम्हाला चौकशी पाठवताना काय लागू होते, आणि प्रत्यक्ष प्रक्रिया कामाच्या अटी कशा ठरवल्या जातात.',
        }}
        updated={pick({ en: UPDATED, mr: '५ ऑक्टोबर २०२६' }, lang)}
        trail={trail}
        blocks={blocks}
      />
    </>
  );
}
