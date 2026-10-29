import type { Metadata } from 'next';

import { pick, toLang, type Lang } from '@/lib/i18n';
import { galleryCategories, galleryVideos } from '@/content/media';
import { breadcrumbSchema, graph, localBusinessSchema, organizationSchema } from '@/lib/seo';

import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { Gallery } from '@/components/Gallery';
import { CtaBand } from '@/components/CtaBand';
import { JsonLd } from '@/components/JsonLd';

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = toLang((await params).lang);

  const title = lang === 'en' ? 'Gallery — Facility, Machinery & Operations' : 'छायाचित्रे — युनिट, यंत्रसामग्री व कामकाज';
  const description =
    lang === 'en'
      ? 'Photographs and video of the Om Agrosphere processing unit, machinery, processing operations and products on the Dhule–Solapur Highway, Maharashtra.'
      : 'धुळे–सोलापूर महामार्ग, महाराष्ट्र येथील ओम अ‍ॅग्रोस्फिअर प्रक्रिया युनिट, यंत्रसामग्री, प्रक्रिया व उत्पादनांची छायाचित्रे व व्हिडिओ.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/gallery`,
      languages: { 'en-IN': '/en/gallery', 'mr-IN': '/mr/gallery', 'x-default': '/en/gallery' },
    },
    openGraph: { type: 'website', url: `/${lang}/gallery`, title, description },
  };
}

export default async function GalleryPage({ params }: PageProps) {
  const lang: Lang = toLang((await params).lang);

  const trail = [
    { name: { en: 'Home', mr: 'मुख्यपृष्ठ' }, path: '' },
    { name: { en: 'Gallery', mr: 'छायाचित्रे' }, path: 'gallery' },
  ];

  const totalPhotos = galleryCategories.reduce(
    (count, category) => count + category.items.length,
    0,
  );
  const totalVideos = galleryVideos.length;

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
        eyebrow={{ en: 'Gallery', mr: 'छायाचित्रे' }}
        title={{ en: 'Our unit, as it actually looks', mr: 'आमचे युनिट, प्रत्यक्षात जसे आहे' }}
        intro={{
          en: 'Every frame here was taken at our own unit — the plant, the material, the people who run it and the signboard on the highway. Nothing is a stock image and nothing is borrowed from another plant.',
          mr: 'येथील प्रत्येक छायाचित्र आमच्याच युनिटमध्ये घेतलेले आहे — यंत्रणा, माल, ती चालवणारी मंडळी आणि महामार्गावरील साइनबोर्ड. काहीही स्टॉक प्रतिमा नाही आणि दुसऱ्या कारखान्याकडून घेतलेले नाही.',
        }}
        trail={trail}
      />

      <Section tone="paper">
        <Gallery lang={lang} />
      </Section>

      <Section tone="dim" divider>
        <div className="max-w-prose">
          <h2 className="font-heading text-xl text-ink">
            {pick({ en: 'What is still missing here', mr: 'येथे अजून काय बाकी आहे' }, lang)}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            {pick(
              {
                en: `${totalPhotos} photographs and ${totalVideos} clips are published above, all of them our own. A few frames are still outstanding, and we would rather name them than pad the page. We are waiting on a clear photograph of the animal feed bharada, and on photographs that tie each processing service to the particular machine that performs it — a machine will not be captioned with a job until the business confirms which one does what.`,
                mr: `वर ${totalPhotos} छायाचित्रे व ${totalVideos} व्हिडिओ प्रकाशित केले आहेत, सर्व आमचेच. काही छायाचित्रे अजून बाकी आहेत, आणि पान भरण्यापेक्षा ती नावाने सांगणे आम्हाला योग्य वाटते. पशुखाद्य भरड्याचे स्पष्ट छायाचित्र, आणि प्रत्येक प्रक्रिया सेवेची ती सेवा करणाऱ्या विशिष्ट यंत्राशी जोडणारी छायाचित्रे अजून हवी आहेत — कोणते यंत्र कोणते काम करते हे व्यवसायाने निश्चित करेपर्यंत यंत्रावर कामाचे नाव लावले जाणार नाही.`,
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
