import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { href, pick, toLang, type Lang } from '@/lib/i18n';
import { crops, findService, services } from '@/content/services';
import { ui } from '@/content/ui';
import { breadcrumbSchema, graph, localBusinessSchema, organizationSchema } from '@/lib/seo';
import { SITE_URL } from '@/content/site';

import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { CtaBand } from '@/components/CtaBand';
import { Photo } from '@/components/Photo';
import { JsonLd } from '@/components/JsonLd';
import { ButtonInternal } from '@/components/Button';
import { ArrowRightIcon, CheckIcon } from '@/components/icons';

type PageProps = { params: Promise<{ lang: string; slug: string }> };

/**
 * Only the real service slugs exist. Unknown slugs are refused at the routing
 * level rather than rendered and then rejected.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = toLang(rawLang);
  const service = findService(slug);
  if (!service) return {};

  const name = pick(service.name, lang);
  const summary = pick(service.summary, lang);

  const title =
    lang === 'en'
      ? `${service.name.en} Services — Gangapur, Maharashtra`
      : `${service.name.mr} सेवा — गंगापूर, महाराष्ट्र`;

  return {
    title,
    description: summary,
    alternates: {
      canonical: `/${lang}/services/${service.slug}`,
      languages: {
        'en-IN': `/en/services/${service.slug}`,
        'mr-IN': `/mr/services/${service.slug}`,
        'x-default': `/en/services/${service.slug}`,
      },
    },
    openGraph: {
      type: 'website',
      url: `/${lang}/services/${service.slug}`,
      title,
      description: summary,
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { lang: rawLang, slug } = await params;
  const lang: Lang = toLang(rawLang);
  const service = findService(slug);
  if (!service) notFound();

  const trail = [
    { name: { en: 'Home', mr: 'मुख्यपृष्ठ' }, path: '' },
    { name: { en: 'Services', mr: 'सेवा' }, path: 'services' },
    { name: service.name, path: `services/${service.slug}` },
  ];

  const related = services.filter((item) => item.slug !== service.slug);
  const cropsForService = service.crops
    .map((id) => crops.find((crop) => crop.id === id))
    .filter((crop): crop is (typeof crops)[number] => Boolean(crop));

  return (
    <>
      <JsonLd
        json={graph([
          organizationSchema(),
          localBusinessSchema(),
          {
            '@type': 'Service',
            name: service.name[lang],
            description: service.summary[lang],
            serviceType: service.name.en,
            provider: { '@id': `${SITE_URL}/#organization` },
            areaServed: { '@type': 'AdministrativeArea', name: 'Maharashtra, India' },
            url: `${SITE_URL}/${lang}/services/${service.slug}`,
          },
          breadcrumbSchema(
            lang,
            trail.map((crumb) => ({ name: pick(crumb.name, lang), path: crumb.path })),
          ),
        ])}
      />

      <PageHeader
        lang={lang}
        eyebrow={{ en: 'Service', mr: 'सेवा' }}
        title={service.name}
        intro={service.summary}
        trail={trail}
      />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <div className="flex flex-col gap-4 text-base leading-relaxed text-ink-soft">
              {service.body[lang].map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonInternal
                href={`${href(lang, 'quote')}?interest=${encodeURIComponent(
                  service.inquiryInterest ?? cropInterestValue(service.crops),
                )}`}
                size="lg"
              >
                {pick(ui.enquireAbout, lang)}
                <ArrowRightIcon className="h-4 w-4" />
              </ButtonInternal>
              <ButtonInternal href={href(lang, 'contact')} variant="outline" size="lg">
                {pick({ en: 'Contact us', mr: 'संपर्क करा' }, lang)}
              </ButtonInternal>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Photo
              photoKey={service.photoKey}
              lang={lang}
              className="aspect-[4/3] w-full rounded border border-ink/10"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />

            <div className="mt-6 rounded border border-ink/10 bg-white p-6 shadow-card">
              <h2 className="font-heading text-base text-ink">
                {cropsForService.length > 0
                  ? pick({ en: 'Applies to', mr: 'कोणत्या पिकांसाठी' }, lang)
                  : pick({ en: 'What this covers', mr: 'यात काय येते' }, lang)}
              </h2>
              {cropsForService.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {cropsForService.map((crop) => (
                    <li
                      key={crop.id}
                      className="rounded-sm border border-field-600/25 bg-field-50 px-2.5 py-1 text-sm text-field-800"
                    >
                      {pick(crop.name, lang)}
                    </li>
                  ))}
                </ul>
              ) : (
                /* Every current service lists the crops or pulses it covers;
                   this fallback keeps the page sensible if that changes. */
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  {pick(
                    {
                      en: 'Tell us what you need and we will confirm what we can supply. Availability and rate are confirmed on enquiry.',
                      mr: 'तुम्हाला काय हवे आहे ते सांगा, आम्ही काय पुरवू शकतो ते सांगू. उपलब्धता व दर चौकशीवरून निश्चित होतात.',
                    },
                    lang,
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* Specifications, or an honest note that they are pending */}
      <Section tone="dim" divider>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow={{ en: 'Details', mr: 'तपशील' }}
              title={{ en: 'Specifications', mr: 'तांत्रिक माहिती' }}
              lang={lang}
            />
          </div>

          <div className="lg:col-span-8">
            {service.specs.length > 0 ? (
              <dl className="grid gap-5 sm:grid-cols-2">
                {service.specs.map((spec) => (
                  <div key={spec.label.en} className="rounded border border-ink/10 bg-white p-5">
                    <dt className="text-sm font-semibold text-ink-soft">{pick(spec.label, lang)}</dt>
                    <dd className="mt-1.5 text-base text-ink">{pick(spec.value, lang)}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <div className="rounded border border-dashed border-ink/25 bg-white/70 p-6">
                <p className="text-base leading-relaxed text-ink-soft">
                  {pick(
                    {
                      en: 'We have not published capacity, accepted volumes, moisture requirements or packaging options for this service. These depend on the specific lot and on figures the business is still confirming, and we would rather leave them out than publish numbers you cannot rely on.',
                      mr: 'या सेवेसाठी क्षमता, स्वीकारले जाणारे प्रमाण, ओलाव्याची आवश्यकता किंवा पॅकिंगचे पर्याय आम्ही प्रकाशित केलेले नाहीत. हे विशिष्ट मालावर अवलंबून असतात आणि त्यासाठी लागणारे आकडे व्यवसायाकडून निश्चित होत आहेत. ज्यावर तुम्ही विसंबू शकणार नाही असे आकडे छापण्यापेक्षा ते वगळणे आम्हाला योग्य वाटते.',
                    },
                    lang,
                  )}
                </p>

                <h3 className="mt-6 font-heading text-base text-ink">
                  {pick({ en: 'Ask us instead', mr: 'त्याऐवजी आम्हाला विचारा' }, lang)}
                </h3>
                <ul className="mt-3 flex flex-col gap-2.5 text-sm text-ink-soft">
                  {[
                    { en: 'How much of my crop can you process?', mr: 'माझ्या पिकाचे किती प्रमाण प्रक्रिया करू शकता?' },
                    { en: 'What moisture level should the grain be at?', mr: 'धान्यात किती ओलावा असावा?' },
                    { en: 'How will the finished material be packed?', mr: 'तयार मालाचे पॅकिंग कसे होईल?' },
                    { en: 'How long will my lot take?', mr: 'माझ्या मालाला किती वेळ लागेल?' },
                  ].map((question) => (
                    <li key={question.en} className="flex gap-2.5">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-field-600" />
                      {pick(question, lang)}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <ButtonInternal href={href(lang, 'quote')}>
                    {pick(ui.getQuote, lang)}
                  </ButtonInternal>
                </div>
              </div>
            )}
          </div>
        </div>
      </Section>

      {/* Other services */}
      <Section tone="paper" divider>
        <SectionHeading
          eyebrow={{ en: 'Also available', mr: 'इतर सेवा' }}
          title={{ en: 'Other services', mr: 'इतर सेवा' }}
          lang={lang}
        />

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {related.map((item) => (
            <li key={item.slug}>
              <ButtonInternal
                href={href(lang, `services/${item.slug}`)}
                variant="outline"
                className="w-full justify-between text-left"
              >
                {pick(item.name, lang)}
                <ArrowRightIcon className="h-4 w-4 shrink-0" />
              </ButtonInternal>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}

/** Map a service's crop ids to the enquiry form's interest values. */
function cropInterestValue(cropIds: string[]): string {
  const names: Record<string, string> = {
    soybean: 'Soybean',
    maize: 'Maize',
    wheat: 'Wheat',
    jowar: 'Jowar',
    bajra: 'Bajra',
    tur: 'Tur Dal',
    chana: 'Chana Dal',
    moong: 'Moong Dal',
    urad: 'Urad Dal',
  };
  const first = cropIds[0];
  return first ? (names[first] ?? '') : '';
}
