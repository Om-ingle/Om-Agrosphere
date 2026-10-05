import type { Metadata } from 'next';

import { pick, toLang, type Lang } from '@/lib/i18n';
import { galleryCategories } from '@/content/media';
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
      ? 'Photographs of the Om Agrosphere processing unit, machinery, processing operations and products on the Dhule–Solapur Highway, Maharashtra.'
      : 'धुळे–सोलापूर महामार्ग, महाराष्ट्र येथील ओम अ‍ॅग्रोस्फिअर प्रक्रिया युनिट, यंत्रसामग्री, प्रक्रिया व उत्पादनांची छायाचित्रे.';

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
          en: 'Everything here is a photograph of our own facility, machinery, produce and work — nothing borrowed, nothing staged. Each slot shows what the photograph will show once it is published.',
          mr: 'येथील प्रत्येक छायाचित्र आमच्याच युनिट, यंत्रसामग्री, माल व कामाचे आहे — कुठूनही घेतलेले नाही, रंगवलेले नाही. प्रत्येक जागा ते छायाचित्र प्रकाशित झाल्यावर काय दाखवेल हे सांगते.',
        }}
        trail={trail}
      />

      <Section tone="paper">
        <Gallery lang={lang} />
      </Section>

      <Section tone="dim" divider>
        <div className="max-w-prose">
          <h2 className="font-heading text-xl text-ink">
            {pick({ en: 'Why some frames are empty', mr: 'काही जागा रिकाम्या का आहेत' }, lang)}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            {pick(
              {
                en: `This page has room for ${totalPhotos} photographs across five groups. The ones you see marked "photograph to be added" are slots waiting for a real picture of our own unit. We will not fill them with stock photography or images of somebody else's plant, because a gallery that misleads the person looking at it is worse than a gallery that is incomplete.`,
                mr: `या पानावर पाच गटांत ${totalPhotos} छायाचित्रांसाठी जागा आहे. "छायाचित्र लवकरच जोडले जाईल" अशा दिसणाऱ्या जागा आमच्याच युनिटच्या खऱ्या छायाचित्राची वाट पाहत आहेत. त्या आम्ही स्टॉक छायाचित्रांनी किंवा दुसऱ्याच्या कारखान्याच्या प्रतिमांनी भरणार नाही, कारण पाहणाऱ्याला दिशाभूल करणारे छायाचित्रसंग्रह अपूर्ण छायाचित्रसंग्रहापेक्षा वाईट असतो.`,
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
