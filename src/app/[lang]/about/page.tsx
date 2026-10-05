import type { Metadata } from 'next';

import { href, pick, toLang, type Lang } from '@/lib/i18n';
import { trustPoints } from '@/content/faqs';
import { galleryCategories } from '@/content/media';
import { ui } from '@/content/ui';
import { addressLine, site } from '@/content/site';
import { breadcrumbSchema, graph, localBusinessSchema, organizationSchema } from '@/lib/seo';

import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { CtaBand } from '@/components/CtaBand';
import { Photo } from '@/components/Photo';
import { JsonLd } from '@/components/JsonLd';
import { ButtonInternal } from '@/components/Button';
import {
  ArrowRightIcon,
  FactoryIcon,
  LayersIcon,
  MapPinIcon,
  ShieldIcon,
  SproutIcon,
  TruckIcon,
} from '@/components/icons';

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = toLang((await params).lang);

  const title =
    lang === 'en'
      ? 'About Us — Agricultural Processing on the Dhule–Solapur Highway'
      : 'आमच्याविषयी — धुळे–सोलापूर महामार्गावरील कृषी प्रक्रिया';

  const description =
    lang === 'en'
      ? 'Om Agrosphere is an agricultural processing unit on the Dhule–Solapur Highway at Diwashi, Kasabkheda, near Bharat Petroleum, in Gangapur taluka. Learn what we do, how we work and what we stand for.'
      : 'ओम अॅग्रोस्फिअर हे धुळे–सोलापूर महामार्गावर, दिवाशी, कसबखेडा येथे, भारत पेट्रोलियमजवळ, गंगापूर तालुक्यातील कृषी प्रक्रिया युनिट आहे. आम्ही काय करतो, कसे काम करतो आणि कशासाठी उभे आहोत, हे जाणून घ्या.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/about`,
      languages: { 'en-IN': '/en/about', 'mr-IN': '/mr/about', 'x-default': '/en/about' },
    },
    openGraph: { type: 'website', url: `/${lang}/about`, title, description },
  };
}

export default async function AboutPage({ params }: PageProps) {
  const lang: Lang = toLang((await params).lang);

  const trustIcons = [FactoryIcon, LayersIcon, MapPinIcon, SproutIcon, TruckIcon, ShieldIcon];

  const trail = [
    { name: { en: 'Home', mr: 'मुख्यपृष्ठ' }, path: '' },
    { name: { en: 'About', mr: 'आमच्याविषयी' }, path: 'about' },
  ];

  return (
    <>
      <JsonLd
        json={graph([
          organizationSchema(),
          localBusinessSchema(),
          breadcrumbSchema(
            lang,
            trail.map((crumb) => ({ name: pick(crumb.name, lang), path: crumb.path })),
          ),
        ])}
      />

      <PageHeader
        lang={lang}
        eyebrow={{ en: 'About us', mr: 'आमच्याविषयी' }}
        title={{
          en: 'A processing unit built around the crops this region grows',
          mr: 'या भागात पिकणाऱ्या पिकांभोवती उभारलेले प्रक्रिया युनिट',
        }}
        intro={{
          en: 'Om Agrosphere cleans, sorts, grades and mills agricultural produce on the Dhule–Solapur Highway. This page explains what we do, how we work, and where we are.',
          mr: 'ओम अॅग्रोस्फिअर धुळे–सोलापूर महामार्गावर शेतमालाची स्वच्छता, प्रतवारी, ग्रेडिंग व दळण करते. हे पान आम्ही काय करतो, कसे काम करतो आणि आम्ही कुठे आहोत हे सांगते.',
        }}
        trail={trail}
      />

      {/* Business overview */}
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow={{ en: 'Overview', mr: 'आढावा' }}
              title={{ en: 'What Om Agrosphere is', mr: 'ओम अॅग्रोस्फिअर म्हणजे काय' }}
              as="h2"
              lang={lang}
            />

            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink-soft">
              <p>
                {pick(
                  {
                    en: 'Om Agrosphere is an agricultural processing business on the Dhule–Solapur Highway at Diwashi, Kasabkheda, in Gangapur taluka, Chhatrapati Sambhajinagar district. It exists to do one thing well: take agricultural produce that arrives mixed, dirty or unsorted, and put it through the processes that make it more useful and more sellable.',
                    mr: 'ओम अॅग्रोस्फिअर हा धुळे–सोलापूर महामार्गावर, दिवाशी, कसबखेडा येथे, गंगापूर तालुक्यात, छत्रपती संभाजीनगर जिल्ह्यातील कृषी प्रक्रिया व्यवसाय आहे. त्याचा एकच उद्देश आहे: मिसळलेला, धूळयुक्त किंवा वेगळा न केलेला शेतमाल घेऊन, त्याला अधिक उपयुक्त व विक्रीयोग्य बनवणाऱ्या प्रक्रियांतून घालणे.',
                  },
                  lang,
                )}
              </p>
              <p>
                {pick(
                  {
                    en: `The business started in ${site.founded} and is run by its own owner, ${site.owner.name}.`,
                    mr: `हा व्यवसाय ${site.founded} मध्ये सुरू झाला आणि तो त्याचे मालक ${site.owner.name} चालवतात.`,
                  },
                  lang,
                )}
              </p>
              <p>
                {pick(
                  {
                    en: 'The services are grain cleaning, grain sorting, grain grading, dal milling, and spice grinding and packaging. The crops we work with are wheat, jowar, bajra, tur, chana, moong and urad. Alongside processing other people’s material, we supply corn grit for animal feed and spice powders ground at our own unit.',
                    mr: 'सेवा आहेत — धान्य स्वच्छता, धान्य प्रतवारी, धान्य ग्रेडिंग, डाळ मिल आणि मसाला दळण व पॅकिंग. आम्ही काम करतो ती पिके — गहू, ज्वारी, बाजरी, तूर, हरभरा, मूग व उडीद. इतरांच्या मालावर प्रक्रिया करण्यासोबतच, आम्ही जनावरांच्या खाद्यासाठी मक्याचा भरडा आणि आमच्याच युनिटमध्ये कुटलेली मसाला पूड पुरवतो.',
                  },
                  lang,
                )}
              </p>
              <p>
                {pick(
                  {
                    en: 'Our customers are farmers bringing their own harvest, traders handling produce for others, wholesale and commercial buyers sourcing in bulk, and retail customers who want a specific product. All of them need the same thing from us: a clear answer about what we can take, when, and at what rate.',
                    mr: 'आमचे ग्राहक म्हणजे स्वतःची कापणी आणणारे शेतकरी, दुसऱ्यांचा माल हाताळणारे व्यापारी, मोठ्या प्रमाणात माल घेणारे घाऊक व व्यावसायिक खरेदीदार, आणि विशिष्ट उत्पादन हवे असलेले किरकोळ ग्राहक. या सर्वांना आमच्याकडून एकच हवे असते: किती माल घेऊ, केव्हा घेऊ आणि दर काय — याचे स्पष्ट उत्तर.',
                  },
                  lang,
                )}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Photo
              photoKey="facility-exterior"
              lang={lang}
              className="aspect-[4/5] w-full rounded border border-ink/10"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </div>
      </Section>

      {/* Vision and mission */}
      <Section tone="dim" divider>
        <SectionHeading
          eyebrow={{ en: 'Direction', mr: 'दिशा' }}
          title={{ en: 'Vision and mission', mr: 'ध्येय व कार्य' }}
          lang={lang}
          intro={{
            en: 'Stated plainly, because a vision nobody can act on is not worth printing.',
            mr: 'स्पष्टपणे मांडलेले, कारण ज्यावर काही करता येत नाही असे ध्येय लिहून ठेवण्यात अर्थ नाही.',
          }}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <article className="rounded border border-ink/10 bg-white p-6 shadow-card sm:p-8">
            <h2 className="font-heading text-xl text-ink">
              {pick({ en: 'Our vision', mr: 'आमचे ध्येय' }, lang)}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              {pick(
                {
                  en: 'That produce grown in this region should not lose value simply because it left the field unsorted, uncleaned or unmilled. Processing done close to where the crop is grown keeps more of that value with the people who grew it, and gives buyers material they can actually work with.',
                  mr: 'या भागात पिकलेला शेतमाल फक्त स्वच्छ न केलेला, वेगळा न केलेला किंवा न दळलेला शेतातून निघाला म्हणून त्याचे मूल्य गमावू नये. पीक पिकते तिथ्याच्या जवळ प्रक्रिया झाल्यास ते मूल्य पिकवणाऱ्यांकडेच जास्त प्रमाणात राहते आणि खरेदीदारांना खरोखर वापरता येईल असा माल मिळतो.',
                },
                lang,
              )}
            </p>
          </article>

          <article className="rounded border border-ink/10 bg-white p-6 shadow-card sm:p-8">
            <h2 className="font-heading text-xl text-ink">
              {pick({ en: 'Our mission', mr: 'आमचे कार्य' }, lang)}
            </h2>
            <ul className="mt-4 flex flex-col gap-3 text-base leading-relaxed text-ink-soft">
              {[
                {
                  en: 'Run cleaning, sorting, grading and milling to a standard a buyer can rely on lot after lot.',
                  mr: 'स्वच्छता, प्रतवारी, ग्रेडिंग व दळण अशा दर्जाने करणे की खरेदीदार प्रत्येक मालावर विसंबू शकेल.',
                },
                {
                  en: 'Quote honestly on quantity and rate, and say no when we cannot take a lot rather than waste a farmer’s trip.',
                  mr: 'प्रमाण व दराबाबत प्रामाणिक उत्तर देणे, आणि माल घेऊ शकत नसल्यास शेतकऱ्याचा खर्च वाचवण्यासाठी नकार देणे.',
                },
                {
                  en: 'Keep the enquiry process simple enough to use from a phone, in Marathi or English.',
                  mr: 'चौकशीची प्रक्रिया फोनवरून वापरता येईल इतकी सोपी ठेवणे — मराठी किंवा इंग्रजीत.',
                },
              ].map((line) => (
                <li key={line.en} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-grain-500"
                  />
                  {pick(line, lang)}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Section>

      {/* Processing philosophy */}
      <Section tone="paper" divider>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5 lg:order-2">
            <Photo
              photoKey="machinery-overview"
              lang={lang}
              className="aspect-[4/5] w-full rounded border border-ink/10"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>

          <div className="lg:col-span-7 lg:order-1">
            <SectionHeading
              eyebrow={{ en: 'How we work', mr: 'आम्ही कसे काम करतो' }}
              title={{ en: 'Our approach to processing', mr: 'प्रक्रियेकडे पाहण्याचा आमचा दृष्टिकोन' }}
              lang={lang}
            />

            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink-soft">
              <p>
                {pick(
                  {
                    en: 'Every lot that comes in is different. Moisture, how clean the grain already is, how mixed the varieties are, and what the customer intends to do with the finished material all change what the right process is.',
                    mr: 'येणारा प्रत्येक माल वेगळा असतो. ओलावा, धान्य आधीच किती स्वच्छ आहे, प्रकार किती मिसळलेले आहेत, आणि ग्राहक तयार मालाचे काय करणार आहे — यावर योग्य प्रक्रिया ठरते.',
                  },
                  lang,
                )}
              </p>
              <p>
                {pick(
                  {
                    en: 'So we ask before we start. What is the material, roughly how much of it is there, and what does the customer need it to be at the end? That conversation takes a minute and saves a lot of wasted processing.',
                    mr: 'म्हणून आम्ही सुरू करण्यापूर्वी विचारतो. माल काय आहे, अंदाजे किती आहे, आणि शेवटी ग्राहकाला तो कसा हवा आहे? या चर्चेला एक मिनिट लागते आणि त्यामुळे निष्फळ प्रक्रिया टळते.',
                  },
                  lang,
                )}
              </p>
              <p>
                {pick(
                  {
                    en: 'We also say when a job is not for us. If a crop is outside what we handle, or a quantity is beyond what we can take on, we will tell you rather than take the work and disappoint you later.',
                    mr: 'आमच्यासाठी नसलेले काम असेल तर तेही आम्ही सांगतो. पीक आम्ही हाताळत नसलेले असेल, किंवा प्रमाण आमच्या क्षमतेबाहेर असेल, तर काम घेऊन नंतर निराश करण्यापेक्षा आम्ही आधीच सांगतो.',
                  },
                  lang,
                )}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Trust points */}
      <Section tone="dim" divider>
        <SectionHeading eyebrow={{ en: 'Why us', mr: 'आम्हालाच का' }} title={ui.whyUs} lang={lang} />

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map((point, index) => {
            const Icon = trustIcons[index % trustIcons.length]!;
            return (
              <li
                key={point.title.en}
                className="flex flex-col gap-3 rounded border border-ink/10 bg-white p-5 shadow-card"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded bg-field-50 text-field-700">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-heading text-base text-ink">{pick(point.title, lang)}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{pick(point.body, lang)}</p>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Infrastructure */}
      <Section tone="dark" divider>
        <SectionHeading
          eyebrow={{ en: 'Infrastructure', mr: 'यंत्रसामग्री व सुविधा' }}
          title={ui.insideFacility}
          intro={{
            en: 'Photographs of the unit, the machinery and the work as it happens. Each one is published as soon as it is ready.',
            mr: 'युनिट, यंत्रसामग्री व चालू असलेल्या कामाची छायाचित्रे. प्रत्येक छायाचित्र तयार होताच प्रकाशित केले जाते.',
          }}
          tone="dark"
          lang={lang}
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryCategories
            .find((category) => category.id === 'machinery')!
            .items.concat(galleryCategories.find((category) => category.id === 'facility')!.items)
            .map((key) => (
              <li key={key}>
                <Photo
                  photoKey={key}
                  lang={lang}
                  tone="dark"
                  className="aspect-[4/3] w-full rounded border border-white/15"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </li>
            ))}
        </ul>

        <div className="mt-8">
          <ButtonInternal href={href(lang, 'gallery')} variant="onDark">
            {pick(ui.viewAll, lang)}
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonInternal>
        </div>
      </Section>

      {/* Location advantage */}
      <Section tone="paper" divider>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={{ en: 'Location', mr: 'ठिकाण' }}
              title={{ en: 'Why the highway location matters', mr: 'महामार्गावरील ठिकाणाचे महत्त्व' }}
              lang={lang}
            />
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col gap-4 text-base leading-relaxed text-ink-soft">
              <p>
                {pick(
                  {
                    en: 'Produce moves on the Dhule–Solapur Highway. A processing unit sitting on it is a unit that loaded vehicles can reach directly, without a detour into town traffic or a narrow market lane that a tractor-trolley cannot comfortably take. Ours is at Diwashi, in Gangapur taluka.',
                    mr: 'शेतमाल धुळे–सोलापूर महामार्गावरून हलतो. महामार्गावरचे युनिट म्हणजे भरलेली वाहने थेट पोहोचू शकतील असे युनिट — शहरातील गर्दीत किंवा ट्रॅक्टर-ट्रॉली सहज जाऊ शकत नाही अशा अरुंद बाजारपेठेच्या गल्लीत वळण घ्यावे लागत नाही. आमचे युनिट गंगापूर तालुक्यातील दिवाशी येथे आहे.',
                  },
                  lang,
                )}
              </p>
              <p>
                {pick(
                  {
                    en: 'Om Agrosphere is at Diwashi, near Bharat Petroleum, just off the highway. That landmark is easy to give over the phone, easy to find on a map, and easy to describe to a driver who has not been here before.',
                    mr: 'ओम अॅग्रोस्फिअर दिवाशी येथे, भारत पेट्रोलियमजवळ, महामार्गालगतच आहे. ही खूण फोनवर सांगणे सोपे, नकाशावर शोधणे सोपे आणि यापूर्वी इथे न आलेल्या चालकाला समजावणे सोपे आहे.',
                  },
                  lang,
                )}
              </p>
              <p className="text-sm text-ink-muted">
                {pick(
                  {
                    en: `Full address: ${addressLine('en')}. Google Plus Code ${site.location.plusCode}.`,
                    mr: `संपूर्ण पत्ता: ${addressLine('mr')}. Google प्लस कोड ${site.location.plusCode}.`,
                  },
                  lang,
                )}
              </p>
            </div>
          </div>
        </div>
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}
