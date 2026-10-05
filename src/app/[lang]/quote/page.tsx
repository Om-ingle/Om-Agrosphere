import type { Metadata } from 'next';

import { href, pick, toLang, type Lang } from '@/lib/i18n';
import { buildWhatsAppOpener } from '@/lib/inquiry-message';
import { ui } from '@/content/ui';
import {
  addressLine,
  directionsUrl,
  mailtoHref,
  site,
  telHref,
  whatsappHref,
} from '@/content/site';
import { breadcrumbSchema, graph, localBusinessSchema, organizationSchema } from '@/lib/seo';

import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { InquiryForm } from '@/components/InquiryForm';
import { JsonLd } from '@/components/JsonLd';
import { ButtonLink } from '@/components/Button';
import {
  ArrowRightIcon,
  CheckIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from '@/components/icons';

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = toLang((await params).lang);

  const title = lang === 'en' ? 'Get a Quote — Send Your Requirement' : 'दर चौकशी — तुमची गरज कळवा';
  const description =
    lang === 'en'
      ? 'Tell us the crop or product, the quantity and your preferred date, and we will confirm what we can take and at what rate. Enquiries answered in Marathi or English.'
      : 'पीक किंवा उत्पादन, प्रमाण व तुमची पसंतीची तारीख सांगा, आम्ही किती माल घेऊ शकतो व दर काय ते सांगू. मराठी किंवा इंग्रजीत उत्तर.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/quote`,
      languages: { 'en-IN': '/en/quote', 'mr-IN': '/mr/quote', 'x-default': '/en/quote' },
    },
    openGraph: { type: 'website', url: `/${lang}/quote`, title, description },
  };
}

export default async function QuotePage({ params }: PageProps) {
  const lang: Lang = toLang((await params).lang);

  const tel = telHref();
  const wa = whatsappHref(buildWhatsAppOpener(lang));
  const mail = mailtoHref(
    lang === 'en' ? 'Quote enquiry — Om Agrosphere' : 'दर चौकशी — ओम अ‍ॅग्रोस्फिअर',
  );

  const trail = [
    { name: { en: 'Home', mr: 'मुख्यपृष्ठ' }, path: '' },
    { name: { en: 'Get a Quote', mr: 'दर चौकशी' }, path: 'quote' },
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
        eyebrow={{ en: 'Get a quote', mr: 'दर चौकशी' }}
        title={{
          en: 'Tell us what you have, and we will tell you what we can do',
          mr: 'तुमच्याकडे काय आहे ते सांगा, आम्ही काय करू शकतो ते सांगू',
        }}
        intro={{
          en: 'Fill this in once and you have given us everything we need to answer you properly — the crop or product, how much of it, and when you want it processed.',
          mr: 'हे एकदा भरा आणि तुम्हाला योग्य उत्तर देण्यासाठी लागणारी सर्व माहिती आम्हाला मिळेल — पीक किंवा उत्पादन, किती प्रमाण, आणि कधी प्रक्रिया हवी आहे.',
        }}
        trail={trail}
      />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Form */}
          <div className="lg:col-span-7">
            <h2 className="font-heading text-2xl leading-tight text-ink sm:text-3xl">
              {pick({ en: 'Enquiry form', mr: 'चौकशी फॉर्म' }, lang)}
            </h2>
            <p className="mt-3 max-w-prose text-sm leading-relaxed text-ink-soft">
              {pick(
                {
                  en: 'Fields marked with * are required. We use your name and number only to reply to this enquiry.',
                  mr: '* चिन्हांकित माहिती आवश्यक आहे. तुमचे नाव व क्रमांक केवळ या चौकशीचे उत्तर देण्यासाठी वापरतो.',
                },
                lang,
              )}
            </p>

            <div className="mt-8">
              <InquiryForm lang={lang} source="quote" />
            </div>
          </div>

          {/* Sidebar: what happens next, and the other ways to reach us */}
          <aside className="lg:col-span-5">
            <div className="rounded border border-ink/10 bg-paper-dim p-6">
              <h2 className="font-heading text-lg text-ink">
                {pick({ en: 'What happens next', mr: 'पुढे काय होते' }, lang)}
              </h2>
              <ol className="mt-5 flex flex-col gap-5">
                {[
                  {
                    title: { en: 'We read your enquiry', mr: 'आम्ही तुमची चौकशी वाचतो' },
                    body: {
                      en: 'Your details reach the unit by email straight away, and you can send the same details on WhatsApp in one tap.',
                      mr: 'तुमची माहिती लगेच ईमेलवर युनिटपर्यंत पोहोचते, आणि तीच माहिती एका टॅपमध्ये व्हॉट्सअ‍ॅपवर पाठवता येते.',
                    },
                  },
                  {
                    title: { en: 'We confirm what we can take', mr: 'आम्ही किती घेऊ शकतो ते सांगतो' },
                    body: {
                      en: 'You get a clear answer on whether the lot works for us, when to bring it, and the rate — before you load anything.',
                      mr: 'माल आमच्यासाठी ठीक आहे का, कधी आणावा आणि दर किती — काहीही भरण्यापूर्वीच स्पष्ट उत्तर मिळते.',
                    },
                  },
                  {
                    title: { en: 'You bring it in', mr: 'तुम्ही माल आणता' },
                    body: {
                      en: 'Arrive at the agreed time. If you need unloading space, call when you are close and we will keep it free.',
                      mr: 'ठरलेल्या वेळी पोहोचा. उतरवण्यासाठी जागा हवी असल्यास जवळ आल्यावर फोन करा, आम्ही जागा राखून ठेवू.',
                    },
                  },
                ].map((step, index) => (
                  <li key={step.title.en} className="flex gap-3.5">
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-field-700 text-xs font-semibold text-white"
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-heading text-base text-ink">{pick(step.title, lang)}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                        {pick(step.body, lang)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-6 rounded border border-ink/10 bg-white p-6 shadow-card">
              <h2 className="font-heading text-lg text-ink">
                {pick({ en: 'Prefer to talk?', mr: 'बोलायचे असेल तर?' }, lang)}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {pick(
                  {
                    en: 'The form is not the only way in. Use whichever of these suits you.',
                    mr: 'फॉर्म हाच एकमेव मार्ग नाही. यापैकी जे सोयीचे असेल ते वापरा.',
                  },
                  lang,
                )}
              </p>

              <ul className="mt-5 flex flex-col gap-3 text-sm">
                <li>
                  <a
                    href={mail}
                    className="flex items-center gap-2.5 font-semibold text-field-800 underline decoration-grain-500 decoration-1 underline-offset-4 hover:decoration-2"
                  >
                    <MailIcon className="h-4 w-4 shrink-0 text-field-600" />
                    {site.email}
                  </a>
                </li>

                {wa ? (
                  <li>
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 font-semibold text-field-800 underline decoration-grain-500 decoration-1 underline-offset-4 hover:decoration-2"
                    >
                      <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#128C7E]" />
                      {pick(ui.whatsapp, lang)}
                    </a>
                  </li>
                ) : null}

                {tel ? (
                  <li>
                    <a
                      href={tel}
                      className="flex items-center gap-2.5 font-semibold text-field-800 underline decoration-grain-500 decoration-1 underline-offset-4 hover:decoration-2"
                    >
                      <PhoneIcon className="h-4 w-4 shrink-0 text-field-600" />
                      {pick(ui.call, lang)}
                    </a>
                  </li>
                ) : null}

                <li>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 font-semibold text-field-800 underline decoration-grain-500 decoration-1 underline-offset-4 hover:decoration-2"
                  >
                    <MapPinIcon className="h-4 w-4 shrink-0 text-field-600" />
                    {pick(ui.directions, lang)}
                  </a>
                </li>
              </ul>

              <p className="mt-5 border-t border-ink/10 pt-4 text-xs leading-relaxed text-ink-muted">
                {addressLine(lang)}
              </p>
            </div>
          </aside>
        </div>
      </Section>

      {/* What helps us answer faster */}
      <Section tone="dim" divider>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={{ en: 'Helpful to know', mr: 'मदतकारक माहिती' }}
              title={{ en: 'What helps us answer faster', mr: 'जलद उत्तर मिळवण्यासाठी काय मदत करते' }}
              lang={lang}
            />
          </div>

          <div className="lg:col-span-7">
            <ul className="flex flex-col gap-3 text-base leading-relaxed text-ink-soft">
              {[
                {
                  en: 'The crop or product, and roughly how much of it you have.',
                  mr: 'पीक किंवा उत्पादन, आणि अंदाजे किती प्रमाण आहे.',
                },
                {
                  en: 'Whether you want it cleaned, sorted, graded, milled, or a combination.',
                  mr: 'स्वच्छता, प्रतवारी, ग्रेडिंग, दळण — यापैकी काय हवे, किंवा यांची एकत्रित प्रक्रिया.',
                },
                {
                  en: 'If your buyer has given a grade specification, describe it in the message box.',
                  mr: 'खरेदीदाराने ग्रेडचे वर्णन दिले असल्यास ते संदेशात लिहा.',
                },
                {
                  en: 'When you would like it done, so we can tell you honestly whether that date works.',
                  mr: 'कधी करायचे आहे, म्हणजे ती तारीख शक्य आहे का हे आम्ही प्रामाणिकपणे सांगू शकू.',
                },
              ].map((line) => (
                <li key={line.en} className="flex gap-3">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-field-600" />
                  {pick(line, lang)}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <ButtonLink href={href(lang, 'faq')} variant="ghost">
                {pick({ en: 'Read common questions', mr: 'नेहमीचे प्रश्न वाचा' }, lang)}
                <ArrowRightIcon className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
