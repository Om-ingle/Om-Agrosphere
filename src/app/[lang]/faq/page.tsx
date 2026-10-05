import type { Metadata } from 'next';

import { href, pick, toLang, type Lang } from '@/lib/i18n';
import { faqs } from '@/content/faqs';
import { ui } from '@/content/ui';
import { mailtoHref, site, telHref, whatsappHref } from '@/content/site';
import { buildWhatsAppOpener } from '@/lib/inquiry-message';
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  localBusinessSchema,
  organizationSchema,
} from '@/lib/seo';

import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { FaqList } from '@/components/FaqList';
import { CtaBand } from '@/components/CtaBand';
import { JsonLd } from '@/components/JsonLd';
import { ButtonInternal, ButtonLink } from '@/components/Button';
import { ArrowRightIcon, MailIcon, PhoneIcon, WhatsAppIcon } from '@/components/icons';

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = toLang((await params).lang);

  const title =
    lang === 'en'
      ? 'FAQ — Crops, Services, Quantity & Quotes'
      : 'प्रश्नोत्तरे — पिके, सेवा, प्रमाण व दर';

  const description =
    lang === 'en'
      ? 'Answers to common questions about grain cleaning, sorting, grading and dal milling, the crops we process, quantities, and how to request a quote from Om Agrosphere.'
      : 'धान्य स्वच्छता, प्रतवारी, ग्रेडिंग व डाळ मिल, आम्ही प्रक्रिया करत असलेली पिके, प्रमाण आणि दर चौकशी यांविषयीच्या नेहमीच्या प्रश्नांची उत्तरे.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/faq`,
      languages: { 'en-IN': '/en/faq', 'mr-IN': '/mr/faq', 'x-default': '/en/faq' },
    },
    openGraph: { type: 'website', url: `/${lang}/faq`, title, description },
  };
}

export default async function FaqPage({ params }: PageProps) {
  const lang: Lang = toLang((await params).lang);

  const tel = telHref();
  const wa = whatsappHref(buildWhatsAppOpener(lang));
  const mail = mailtoHref(
    lang === 'en' ? 'Question — Om Agrosphere' : 'प्रश्न — ओम अ‍ॅग्रोस्फिअर',
  );

  const trail = [
    { name: { en: 'Home', mr: 'मुख्यपृष्ठ' }, path: '' },
    { name: { en: 'FAQ', mr: 'प्रश्नोत्तरे' }, path: 'faq' },
  ];

  return (
    <>
      {/* FAQPage markup is emitted only because these same questions and answers
          are rendered in full on this page. */}
      <JsonLd
        json={graph([
          organizationSchema(),
          localBusinessSchema(),
          faqSchema(lang, faqs),
          breadcrumbSchema(
            lang,
            trail.map((crumb) => ({ name: pick(crumb.name, lang), path: crumb.path })),
          ),
        ])}
      />

      <PageHeader
        lang={lang}
        eyebrow={{ en: 'FAQ', mr: 'प्रश्नोत्तरे' }}
        title={{ en: 'Questions we actually get asked', mr: 'आम्हाला खरोखर विचारले जाणारे प्रश्न' }}
        intro={{
          en: 'If an answer is still being confirmed by the business, the answer here says so and points you to a channel that works today. We would rather admit a gap than fill it with a guess.',
          mr: 'कोणतेही उत्तर अजून व्यवसायाकडून निश्चित होत असेल, तर तसे स्पष्ट लिहिले आहे आणि आज चालणाऱ्या मार्गाकडे नेले आहे. माहिती नसल्यास ती कबूल करणे, अंदाज लावून भरण्यापेक्षा आम्हाला योग्य वाटते.',
        }}
        trail={trail}
      />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <h2 className="font-heading text-xl text-ink">
              {pick({ en: 'All questions', mr: 'सर्व प्रश्न' }, lang)}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {pick(
                {
                  en: 'Tap a question to open it. Answers are written to be read on a phone.',
                  mr: 'प्रश्नावर टॅप करून उघडा. उत्तरे फोनवर वाचता येतील अशी लिहिली आहेत.',
                },
                lang,
              )}
            </p>

            <div className="mt-8 rounded border border-ink/10 bg-paper-dim p-5">
              <h2 className="font-heading text-base text-ink">
                {pick({ en: 'Not answered here?', mr: 'येथे उत्तर नाही मिळाले?' }, lang)}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {pick(
                  {
                    en: 'Ask us directly — you will get a real answer, not a link back to this page.',
                    mr: 'थेट आम्हाला विचारा — या पानावर परत पाठवणारी लिंक नाही, खरे उत्तर मिळेल.',
                  },
                  lang,
                )}
              </p>

              <div className="mt-5 flex flex-col gap-3 text-sm">
                <a
                  href={mail}
                  className="flex items-center gap-2.5 font-semibold text-field-800 underline decoration-grain-500 decoration-1 underline-offset-4 hover:decoration-2"
                >
                  <MailIcon className="h-4 w-4 shrink-0 text-field-600" />
                  {site.email}
                </a>
                {wa ? (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 font-semibold text-field-800 underline decoration-grain-500 decoration-1 underline-offset-4 hover:decoration-2"
                  >
                    <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#128C7E]" />
                    {pick(ui.whatsapp, lang)}
                  </a>
                ) : null}
                {tel ? (
                  <a
                    href={tel}
                    className="flex items-center gap-2.5 font-semibold text-field-800 underline decoration-grain-500 decoration-1 underline-offset-4 hover:decoration-2"
                  >
                    <PhoneIcon className="h-4 w-4 shrink-0 text-field-600" />
                    {pick(ui.call, lang)}
                  </a>
                ) : null}
              </div>

              <div className="mt-6">
                <ButtonInternal href={href(lang, 'quote')} className="w-full">
                  {pick(ui.getQuote, lang)}
                  <ArrowRightIcon className="h-4 w-4" />
                </ButtonInternal>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <FaqList items={faqs} lang={lang} />
          </div>
        </div>
      </Section>

      <Section tone="dim" divider>
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            {
              title: { en: 'Bring your buyer’s specification', mr: 'खरेदीदाराचे वर्णन सोबत आणा' },
              body: {
                en: 'If your buyer has given a grade or quality requirement in writing, bring it. We will process to that specification.',
                mr: 'खरेदीदाराने ग्रेड किंवा दर्जाची मागणी लिखित स्वरूपात दिली असल्यास ती सोबत आणा. आम्ही त्याच वर्णनानुसार प्रक्रिया करू.',
              },
            },
            {
              title: { en: 'Ask about quantity before loading', mr: 'भरण्यापूर्वी प्रमाण विचारा' },
              body: {
                en: 'Quantities are decided lot by lot. One message with the crop and the approximate weight saves you a wasted trip.',
                mr: 'प्रमाण प्रत्येक मालानुसार ठरते. पीक व अंदाजे वजन असलेला एक संदेश तुमचा निष्फळ प्रवास टाळतो.',
              },
            },
            {
              title: { en: 'Say it in Marathi or English', mr: 'मराठी किंवा इंग्रजीत सांगा' },
              body: {
                en: 'Write or call in whichever language you are comfortable with. You will be answered in the same one.',
                mr: 'तुम्हाला सोपी वाटणाऱ्या भाषेत लिहा किंवा फोन करा. त्याच भाषेत उत्तर मिळेल.',
              },
            },
          ].map((item) => (
            <article key={item.title.en}>
              <h2 className="font-heading text-base text-ink">{pick(item.title, lang)}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{pick(item.body, lang)}</p>
            </article>
          ))}
        </div>

        {!tel || !wa ? (
          <p className="mt-10 max-w-prose rounded border border-ink/10 bg-white p-4 text-sm leading-relaxed text-ink-soft">
            {pick(
              {
                en: 'Phone and WhatsApp are not published here yet. In the meantime the enquiry form and email are the reliable ways to reach us.',
                mr: 'फोन व व्हॉट्सअ‍ॅप अजून येथे प्रकाशित केलेले नाहीत. तोपर्यंत चौकशी फॉर्म व ईमेल हे आमच्यापर्यंत पोहोचण्याचे विश्वासार्ह मार्ग आहेत.',
              },
              lang,
            )}
          </p>
        ) : (
          <div className="mt-10">
            <ButtonLink href={href(lang, 'contact')} variant="outline">
              {pick({ en: 'More ways to reach us', mr: 'संपर्काचे अधिक मार्ग' }, lang)}
              <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
          </div>
        )}
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}
