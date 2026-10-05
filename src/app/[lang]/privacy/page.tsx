import type { Metadata } from 'next';

import { pick, toLang, type Lang } from '@/lib/i18n';
import { site } from '@/content/site';
import { graph, localBusinessSchema, organizationSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { LegalPage, type LegalBlock } from '@/components/LegalPage';

type PageProps = { params: Promise<{ lang: string }> };

/** Update this when the policy text changes. */
const UPDATED = '5 October 2026';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = toLang((await params).lang);

  const title = lang === 'en' ? 'Privacy Policy' : 'गोपनीयता धोरण';
  const description =
    lang === 'en'
      ? 'What information Om Agrosphere collects through its enquiry form, why it is collected, where it goes and how to have it removed.'
      : 'ओम अ‍ॅग्रोस्फिअरच्या चौकशी फॉर्मद्वारे कोणती माहिती गोळा केली जाते, ती का गोळा केली जाते, ती कुठे जाते आणि ती काढून टाकण्यासाठी काय करावे.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/privacy`,
      languages: { 'en-IN': '/en/privacy', 'mr-IN': '/mr/privacy', 'x-default': '/en/privacy' },
    },
    robots: { index: true, follow: true },
  };
}

const blocks: LegalBlock[] = [
  {
    id: 'what-we-collect',
    title: { en: 'What we collect', mr: 'आम्ही कोणती माहिती गोळा करतो' },
    body: {
      en: 'We only collect what the enquiry form asks for. Nothing else is captured, and there is no tracking of individual visitors by default.',
      mr: 'चौकशी फॉर्ममध्ये विचारलेली माहितीच आम्ही गोळा करतो. त्याशिवाय काहीही घेतले जात नाही, आणि डीफॉल्टनुसार वैयक्तिक अभ्यागतांचा मागोवा घेतला जात नाही.',
    },
    list: {
      en: [
        'Your name.',
        'Your mobile number.',
        'Whether you are a farmer, trader, wholesale buyer, retail buyer or commercial buyer.',
        'The crop or product you are enquiring about, the quantity and unit, and your preferred date.',
        'Anything you choose to write in the message field.',
      ],
      mr: [
        'तुमचे नाव.',
        'तुमचा मोबाइल क्रमांक.',
        'तुम्ही शेतकरी, व्यापारी, घाऊक खरेदीदार, किरकोळ खरेदीदार की व्यावसायिक खरेदीदार.',
        'तुम्ही चौकशी करत असलेले पीक किंवा उत्पादन, प्रमाण व एकक, आणि तुमची पसंतीची तारीख.',
        'संदेशाच्या जागेत तुम्ही स्वेच्छेने लिहिलेली कोणतीही माहिती.',
      ],
    },
  },
  {
    id: 'why',
    title: { en: 'Why we collect it', mr: 'ते का गोळा करतो' },
    body: {
      en: 'For one purpose: to answer your enquiry. The crop and quantity tell us whether we can handle your lot, the mobile number is how we reply, and the preferred date tells us when to expect you.',
      mr: 'एकाच कारणासाठी: तुमच्या चौकशीचे उत्तर देण्यासाठी. पीक व प्रमाण यावरून तुमचा माल आम्ही हाताळू शकतो का हे कळते, मोबाइल क्रमांकाने आम्ही उत्तर देतो, आणि पसंतीच्या तारखेवरून तुम्ही कधी याल हे समजते.',
    },
  },
  {
    id: 'what-we-do-not-do',
    title: { en: 'What we do not do', mr: 'आम्ही काय करत नाही' },
    list: {
      en: [
        'We do not sell, rent or trade your details to anyone.',
        'We do not add you to a marketing list or send promotional messages.',
        'We do not ask for your email, address, Aadhaar number, bank details or any payment information through this site.',
        'We do not use your details for anything other than responding to the enquiry you sent.',
      ],
      mr: [
        'आम्ही तुमची माहिती कोणालाही विकत नाही, भाड्याने देत नाही किंवा बदलत नाही.',
        'आम्ही तुम्हाला जाहिरात यादीत टाकत नाही किंवा प्रचारात्मक संदेश पाठवत नाही.',
        'या संकेतस्थळाद्वारे आम्ही तुमचा ईमेल, पत्ता, आधार क्रमांक, बँक तपशील किंवा पैशांची माहिती मागत नाही.',
        'तुम्ही पाठवलेल्या चौकशीचे उत्तर देण्याशिवाय तुमच्या माहितीचा वापर आम्ही करत नाही.',
      ],
    },
  },
  {
    id: 'where-it-goes',
    title: { en: 'Where your enquiry goes', mr: 'तुमची चौकशी कुठे जाते' },
    body: {
      en: 'Your enquiry is sent from this site to a transactional email service, which delivers it to the business mailbox shown on the Contact page. The business then reads and answers it. The site itself does not store your enquiry in a database.',
      mr: 'तुमची चौकशी या संकेतस्थळावरून एका ईमेल सेवेकडे जाते, जी ती संपर्क पानावर दिलेल्या व्यवसायाच्या मेलबॉक्समध्ये पोहोचवते. त्यानंतर व्यवसाय ती वाचून उत्तर देतो. संकेतस्थळ स्वतः तुमची चौकशी कोणत्याही डेटाबेसमध्ये साठवत नाही.',
    },
  },
  {
    id: 'spam-protection',
    title: { en: 'Spam protection', mr: 'स्पॅम संरक्षण' },
    body: {
      en: 'To stop automated submissions, the form records the time taken to fill it, includes a field that only a bot would complete, and may verify the submission with Google reCAPTCHA when that is switched on. These checks are used to decide whether a submission is genuine; they are not used to profile you.',
      mr: 'स्वयंचलित सबमिशन थांबवण्यासाठी, फॉर्म भरण्यास लागलेला वेळ नोंदवला जातो, फक्त बॉट भरेल असे क्षेत्र ठेवले जाते, आणि ते सुरू असल्यास Google reCAPTCHA द्वारे सबमिशनची खात्री केली जाऊ शकते. या तपासण्या सबमिशन खरे आहे का हे ठरवण्यासाठी वापरल्या जातात; तुमची प्रोफाइल तयार करण्यासाठी नाही.',
    },
  },
  {
    id: 'cookies',
    title: { en: 'Cookies and analytics', mr: 'कुकीज व विश्लेषण' },
    body: {
      en: 'By default this site sets no cookies and runs no analytics. If the business enables website analytics in future, it will be configured to anonymise IP addresses, and this section will say so before it is switched on. Your language choice is held in the page address, not in a cookie.',
      mr: 'डीफॉल्टनुसार हे संकेतस्थळ कोणतीही कुकी ठेवत नाही व विश्लेषण चालवत नाही. भविष्यात व्यवसायाने विश्लेषण सुरू केल्यास ते IP पत्ते अवैयक्तिक करण्यासाठी संरचित केले जाईल, आणि सुरू करण्यापूर्वी हा भाग तसे सांगेल. तुमची भाषा निवड कुकीमध्ये नाही, तर पानाच्या पत्त्यात ठेवली जाते.',
    },
  },
  {
    id: 'retention',
    title: { en: 'How long we keep it', mr: 'किती काळ ठेवतो' },
    body: {
      en: 'Enquiries live in the business mailbox and are kept only as long as they are useful for answering you and for the record of work agreed. Ask us to delete yours and we will, unless we are required to keep it for a legal or accounting reason — in which case we will tell you that.',
      mr: 'चौकशी व्यवसायाच्या मेलबॉक्समध्ये राहते आणि तुम्हाला उत्तर देण्यासाठी तसेच ठरलेल्या कामाच्या नोंदीसाठी उपयुक्त असेपर्यंतच ठेवली जाते. तुमची चौकशी हटवायला सांगितल्यास आम्ही हटवू — कायदेशीर किंवा हिशोबाच्या कारणास्तव ठेवणे बंधनकारक असेल तर ते आम्ही तुम्हाला सांगू.',
    },
  },
  {
    id: 'your-rights',
    title: { en: 'Access, correction and removal', mr: 'माहिती पाहणे, दुरुस्ती व हटवणे' },
    body: {
      en: 'You can ask what we hold about you, ask us to correct it, or ask us to delete it. Write to the address below and say what you want done. There is no charge and no form to fill in.',
      mr: 'आमच्याकडे तुमची कोणती माहिती आहे हे विचारू शकता, दुरुस्ती सांगू शकता किंवा हटवायला सांगू शकता. खालील पत्त्यावर लिहा आणि काय करायचे ते सांगा. यासाठी कोणतेही शुल्क नाही व फॉर्म भरण्याची गरज नाही.',
    },
  },
  {
    id: 'security',
    title: { en: 'How it is protected', mr: 'संरक्षण कसे केले जाते' },
    body: {
      en: 'The site is served over an encrypted connection. Form input is validated again on the server before it is used, submissions are rate-limited, and the credentials used to send email are held in server-side environment variables — never in the pages your browser downloads. If something goes wrong, you see a plain message, never a technical error trace.',
      mr: 'हे संकेतस्थळ एन्क्रिप्टेड कनेक्शनवरून दिले जाते. फॉर्ममधील माहिती वापरण्यापूर्वी सर्व्हरवर पुन्हा तपासली जाते, सबमिशनवर मर्यादा ठेवली जाते, आणि ईमेल पाठवण्यासाठी वापरलेली क्रेडेन्शियल्स सर्व्हरवरील एन्व्हायर्नमेंट व्हेरिएबल्समध्ये ठेवली जातात — तुमचा ब्राउझर डाउनलोड करत असलेल्या पानांमध्ये कधीही नाही. काही चुकल्यास तुम्हाला साधा संदेश दिसतो, तांत्रिक एरर कधीही नाही.',
    },
  },
  {
    id: 'contact',
    title: { en: 'Who to contact', mr: 'कोणाशी संपर्क साधावा' },
    body: {
      en: `Questions about this policy, or about the details you have sent us, go to ${site.email}.`,
      mr: `या धोरणाबद्दल किंवा तुम्ही पाठवलेल्या माहितीबद्दलचे प्रश्न ${site.email} वर पाठवा.`,
    },
  },
];

export default async function PrivacyPage({ params }: PageProps) {
  const lang: Lang = toLang((await params).lang);

  const trail = [
    { name: { en: 'Home', mr: 'मुख्यपृष्ठ' }, path: '' },
    { name: { en: 'Privacy Policy', mr: 'गोपनीयता धोरण' }, path: 'privacy' },
  ];

  return (
    <>
      <JsonLd json={graph([organizationSchema(), localBusinessSchema()])} />

      <LegalPage
        lang={lang}
        eyebrow={{ en: 'Legal', mr: 'कायदेशीर' }}
        title={{ en: 'Privacy Policy', mr: 'गोपनीयता धोरण' }}
        intro={{
          en: 'What we collect through this website, why, and what you can ask us to do about it — in plain language, without the usual padding.',
          mr: 'या संकेतस्थळाद्वारे आम्ही कोणती माहिती गोळा करतो, का करतो, आणि तुम्ही त्याबद्दल काय सांगू शकता — सोप्या भाषेत, नेहमीच्या वळणदार शब्दांशिवाय.',
        }}
        updated={pick({ en: UPDATED, mr: '५ ऑक्टोबर २०२६' }, lang)}
        trail={trail}
        blocks={blocks}
      />
    </>
  );
}
