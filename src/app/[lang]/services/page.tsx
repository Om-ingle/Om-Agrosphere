import type { Metadata } from 'next';

import { pick, toLang, type Lang } from '@/lib/i18n';
import { services } from '@/content/services';
import { ui } from '@/content/ui';
import { breadcrumbSchema, graph, localBusinessSchema, organizationSchema, servicesSchema } from '@/lib/seo';

import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { ServiceCard } from '@/components/ServiceCard';
import { Photo } from '@/components/Photo';
import { Video } from '@/components/Video';
import { CropGrid } from '@/components/CropGrid';
import { CtaBand } from '@/components/CtaBand';
import { JsonLd } from '@/components/JsonLd';
import { CheckIcon } from '@/components/icons';

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = toLang((await params).lang);

  const title =
    lang === 'en'
      ? 'Services — Grain Cleaning, Sorting, Grading, Dal Milling & Spice Grinding'
      : 'सेवा — धान्य स्वच्छता, प्रतवारी, ग्रेडिंग, डाळ मिल व मसाला दळण';

  const description =
    lang === 'en'
      ? 'Grain cleaning, grain sorting, grain grading, dal milling and spice grinding for wheat, jowar, bajra, tur, chana, moong and urad on the Dhule–Solapur Highway at Gangapur, Maharashtra. Send an enquiry for your lot.'
      : 'धुळे–सोलापूर महामार्गावर, गंगापूर, महाराष्ट्र येथे गहू, ज्वारी, बाजरी, तूर, हरभरा, मूग व उडीद यांच्यासाठी धान्य स्वच्छता, प्रतवारी, ग्रेडिंग, डाळ मिल व मसाला दळण. तुमच्या मालासाठी चौकशी पाठवा.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/services`,
      languages: { 'en-IN': '/en/services', 'mr-IN': '/mr/services', 'x-default': '/en/services' },
    },
    openGraph: { type: 'website', url: `/${lang}/services`, title, description },
  };
}

export default async function ServicesPage({ params }: PageProps) {
  const lang: Lang = toLang((await params).lang);

  const trail = [
    { name: { en: 'Home', mr: 'मुख्यपृष्ठ' }, path: '' },
    { name: { en: 'Services', mr: 'सेवा' }, path: 'services' },
  ];

  return (
    <>
      <JsonLd
        json={graph([
          organizationSchema(),
          localBusinessSchema(),
          ...servicesSchema(lang),
          breadcrumbSchema(
            lang,
            trail.map((crumb) => ({ name: pick(crumb.name, lang), path: crumb.path })),
          ),
        ])}
      />

      <PageHeader
        lang={lang}
        eyebrow={{ en: 'Services', mr: 'सेवा' }}
        title={{
          en: 'Five processing services, explained plainly',
          mr: 'पाच प्रक्रिया सेवा, स्पष्ट शब्दांत',
        }}
        intro={{
          en: 'Cleaning, sorting, grading, dal milling and spice grinding. Most lots go through more than one of them before they leave. Open any service to see what it does and what it changes about your material.',
          mr: 'स्वच्छता, प्रतवारी, ग्रेडिंग, डाळ मिल व मसाला दळण. बहुतेक माल येथून बाहेर पडण्यापूर्वी यापैकी एकापेक्षा जास्त प्रक्रियांतून जातो. प्रत्येक सेवा उघडून पहा — ती काय करते आणि तुमच्या मालात काय बदल घडवते.',
        }}
        trail={trail}
      />

      {/* Service cards — the index. Full explanations live on each service page. */}
      <Section tone="paper">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} lang={lang} />
          ))}
        </div>
      </Section>

      {/* The unit itself — what the five services above actually run on. */}
      <Section tone="dark" divider>
        <SectionHeading
          eyebrow={{ en: 'Inside the unit', mr: 'युनिटच्या आत' }}
          title={{ en: 'The plant these services run on', mr: 'या सेवा ज्या यंत्रणेवर चालतात' }}
          intro={{
            en: 'Our own machinery, photographed and filmed at the unit. Nothing on this page is a stock image or a picture of somebody else’s plant.',
            mr: 'आमचीच यंत्रसामग्री, युनिटमध्ये छायाचित्रित व चित्रित केलेली. या पानावरील काहीही स्टॉक प्रतिमा किंवा दुसऱ्याच्या कारखान्याचे चित्र नाही.',
          }}
          tone="dark"
          lang={lang}
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(['machinery-processing-unit', 'machinery-grain-processing', 'grain-quality-closeup'] as const).map(
            (key) => (
              <li key={key}>
                <Photo
                  photoKey={key}
                  lang={lang}
                  tone="dark"
                  className="aspect-[4/3] w-full rounded border border-white/15"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </li>
            ),
          )}
        </ul>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(
            [
              'machine-operation',
              'grain-processing-machine',
              'grain-processing-output',
              'grain-processing-closeup',
              'processing-line-interior',
            ] as const
          ).map((key) => (
            <Video
              key={key}
              videoKey={key}
              lang={lang}
              tone="dark"
              className="aspect-[3/4]"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ))}
        </div>
      </Section>

      {/* Crops */}
      <Section tone="dim" divider>
        <SectionHeading
          eyebrow={{ en: 'Crops', mr: 'पिके' }}
          title={ui.supportedCrops}
          intro={{
            en: 'These seven crops are the ones we can confirm. If yours is not listed, ask anyway — we will give you a straight answer.',
            mr: 'ही सात पिके आम्ही निश्चितपणे सांगू शकतो. तुमचे पीक यात नसल्यास तरी विचारा — आम्ही स्पष्ट उत्तर देऊ.',
          }}
          lang={lang}
        />
        <div className="mt-10">
          <CropGrid lang={lang} />
        </div>
      </Section>

      {/* How a lot moves through the unit */}
      <Section tone="paper" divider>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={{ en: 'What to expect', mr: 'काय अपेक्षित करावे' }}
              title={{ en: 'Bringing material to us', mr: 'आमच्याकडे माल आणताना' }}
              lang={lang}
            />
          </div>

          <div className="lg:col-span-7">
            <ol className="flex flex-col gap-6">
              {[
                {
                  title: { en: 'Tell us what you have', mr: 'तुमच्याकडे काय आहे ते सांगा' },
                  body: {
                    en: 'Call, message on WhatsApp, or send the enquiry form. Give us the crop, the approximate quantity and your preferred date.',
                    mr: 'फोन करा, व्हाट्सअ‍ॅपवर संदेश पाठवा, किंवा चौकशी फॉर्म पाठवा. पीक, अंदाजे प्रमाण व तुमची पसंतीची तारीख सांगा.',
                  },
                },
                {
                  title: { en: 'We confirm what we can take', mr: 'आम्ही किती घेऊ शकतो ते सांगतो' },
                  body: {
                    en: 'You get a clear answer on whether we can handle the lot, when to bring it, and what it will cost. If we cannot take it, we say so before you load the vehicle.',
                    mr: 'माल हाताळू शकतो का, कधी आणावा आणि खर्च किती — याचे स्पष्ट उत्तर मिळते. घेऊ शकत नसल्यास, वाहन भरण्यापूर्वीच सांगतो.',
                  },
                },
                {
                  title: { en: 'Bring it to the unit', mr: 'युनिटवर माल आणा' },
                  body: {
                    en: 'The unit is on the highway at Diwashi, near Bharat Petroleum. Call when you are close if you need space to unload.',
                    mr: 'युनिट महामार्गावर, दिवाशी येथे, भारत पेट्रोलियमजवळ आहे. माल उतरवण्यासाठी जागा हवी असल्यास जवळ आल्यावर फोन करा.',
                  },
                },
                {
                  title: { en: 'Collect it processed', mr: 'प्रक्रिया झालेला माल घ्या' },
                  body: {
                    en: 'Your material goes through the agreed process and is graded as discussed. Ask for the material to be packed separately if you need the grades kept apart.',
                    mr: 'तुमचा माल ठरलेल्या प्रक्रियेतून जातो व ठरल्याप्रमाणे प्रकारांत विभागला जातो. प्रकार वेगवेगळे हवे असल्यास वेगवेगळे पॅक करायला सांगा.',
                  },
                },
              ].map((step, index) => (
                <li key={step.title.en} className="flex gap-4">
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-field-700 text-sm font-semibold text-white"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-base text-ink">{pick(step.title, lang)}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {pick(step.body, lang)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded border border-ink/10 bg-paper-dim p-5">
              <h3 className="flex items-center gap-2 font-heading text-base text-ink">
                <CheckIcon className="h-5 w-5 text-field-600" />
                {pick({ en: 'Come prepared', mr: 'तयारी करून या' }, lang)}
              </h3>
              <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-soft">
                {[
                  {
                    en: 'Tell us the approximate quantity before you travel.',
                    mr: 'निघण्यापूर्वी अंदाजे प्रमाण सांगा.',
                  },
                  {
                    en: 'Bring any grade specification from your buyer.',
                    mr: 'खरेदीदाराने दिलेले ग्रेडचे वर्णन असल्यास सोबत आणा.',
                  },
                  {
                    en: 'Know how you want the finished material separated.',
                    mr: 'तयार माल कसा वेगळा हवा आहे ते ठरवून या.',
                  },
                  {
                    en: 'Call ahead for loaded vehicles so we can arrange unloading space.',
                    mr: 'भरलेल्या वाहनासाठी आधी फोन करा, म्हणजे उतरवण्याची जागा ठरवता येईल.',
                  },
                ].map((line) => (
                  <li key={line.en} className="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-grain-500"
                    />
                    {pick(line, lang)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Unconfirmed capabilities, stated honestly */}
      <Section tone="dim" divider>
        <div className="max-w-prose">
          <h2 className="font-heading text-xl text-ink">
            {pick({ en: 'What we do not publish yet', mr: 'आम्ही अजून काय प्रकाशित करत नाही' }, lang)}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            {pick(
              {
                en: 'Processing capacity, accepted volumes, moisture requirements and packaging options are not listed on this page, because the business has not confirmed the figures we would need to publish. Rather than print a number we cannot stand behind, we will answer your specific question directly — send an enquiry or ask on WhatsApp and you will get a real answer.',
                mr: 'प्रक्रिया क्षमता, स्वीकारले जाणारे प्रमाण, ओलाव्याची आवश्यकता व पॅकिंगचे पर्याय या पानावर दिलेले नाहीत, कारण ते प्रकाशित करण्यासाठी लागणारे आकडे व्यवसायाकडून निश्चित झालेले नाहीत. ज्याची खात्री देता येणार नाही असा आकडा छापण्यापेक्षा, तुमच्या विशिष्ट प्रश्नाचे उत्तर आम्ही थेट देऊ — चौकशी पाठवा किंवा व्हाट्सअ‍ॅपवर विचारा, खरे उत्तर मिळेल.',
              },
              lang,
            )}
          </p>
        </div>
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}
