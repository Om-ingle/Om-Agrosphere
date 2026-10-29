import type { Metadata } from 'next';

import { href, pick, toLang, type Lang } from '@/lib/i18n';
import { products } from '@/content/products';
import { ui } from '@/content/ui';
import { breadcrumbSchema, graph, localBusinessSchema, organizationSchema, productsSchema } from '@/lib/seo';

import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { CtaBand } from '@/components/CtaBand';
import { Photo } from '@/components/Photo';
import { JsonLd } from '@/components/JsonLd';
import { ButtonInternal } from '@/components/Button';
import { ArrowRightIcon, CheckIcon } from '@/components/icons';

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = toLang((await params).lang);

  const title =
    lang === 'en'
      ? 'Products — Tur, Moong, Urad & Chana Dal and Animal Feed Bharada'
      : 'उत्पादने — तूर, मूग, उडीद व चणाडाळ आणि पशुखाद्य भरडा';

  const description =
    lang === 'en'
      ? 'Tur dal, moong dal, urad dal and chana dal processed at our unit, and animal feed bharada prepared from maize, dal husk, chura, wheat and soybean, on the Dhule–Solapur Highway at Gangapur, Maharashtra.'
      : 'धुळे–सोलापूर महामार्गावर, गंगापूर, महाराष्ट्र येथील आमच्याच युनिटमध्ये तयार होणारी तूरडाळ, मूगडाळ, उडीदडाळ व चणाडाळ, आणि मका, डाळींचा भुसा, चुरा, गहू व सोयाबीनपासून तयार होणारा पशुखाद्य भरडा.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/products`,
      languages: { 'en-IN': '/en/products', 'mr-IN': '/mr/products', 'x-default': '/en/products' },
    },
    openGraph: { type: 'website', url: `/${lang}/products`, title, description },
  };
}

export default async function ProductsPage({ params }: PageProps) {
  const lang: Lang = toLang((await params).lang);

  const trail = [
    { name: { en: 'Home', mr: 'मुख्यपृष्ठ' }, path: '' },
    { name: { en: 'Products', mr: 'उत्पादने' }, path: 'products' },
  ];

  return (
    <>
      <JsonLd
        json={graph([
          organizationSchema(),
          localBusinessSchema(),
          ...productsSchema(lang),
          breadcrumbSchema(
            lang,
            trail.map((crumb) => ({ name: pick(crumb.name, lang), path: crumb.path })),
          ),
        ])}
      />

      <PageHeader
        lang={lang}
        eyebrow={{ en: 'Products', mr: 'उत्पादने' }}
        title={{
          en: 'Five products from our own unit',
          mr: 'आमच्याच युनिटमधील पाच उत्पादने',
        }}
        intro={{
          en: 'We process and sell tur, moong, urad and chana dal, and prepare animal feed bharada. The dals come from pulses processed at our unit; the bharada is made from maize, dal husk, chura, wheat and soybean.',
          mr: 'आम्ही तूर, मूग, उडीद व हरभरा यांची डाळ तयार करून विकतो आणि पशुखाद्य भरडा तयार करतो. डाळ आमच्याच युनिटमध्ये प्रक्रिया केलेल्या कडधान्यापासून तयार होते; भरडा मका, डाळींचा भुसा, चुरा, गहू व सोयाबीनपासून तयार होतो.',
        }}
        trail={trail}
      />

      {products.map((product, index) => (
        <Section
          key={product.id}
          id={product.id}
          tone={index % 2 === 0 ? 'paper' : 'dim'}
          divider={index > 0}
        >
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className={index % 2 === 0 ? 'lg:col-span-5' : 'lg:col-span-5 lg:order-2'}>
              <Photo
                photoKey={product.photoKey}
                lang={lang}
                className="aspect-[4/3] w-full rounded border border-ink/10"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>

            <div className={index % 2 === 0 ? 'lg:col-span-7' : 'lg:col-span-7 lg:order-1'}>
              <p className="text-xs font-semibold tracking-[0.18em] text-grain-600 uppercase">
                {pick(product.category, lang)}
              </p>
              <h2 className="mt-3 font-heading text-2xl leading-tight text-ink sm:text-3xl">
                {pick(product.name, lang)}
              </h2>
              <span aria-hidden="true" className="mt-3 block h-px w-16 bg-grain-500/50" />

              <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink-soft">
                {product.body[lang].map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              <h3 className="mt-8 font-heading text-base text-ink">
                {pick({ en: 'What it is used for', mr: 'याचा वापर' }, lang)}
              </h3>
              <ul className="mt-3 flex flex-col gap-2.5 text-sm text-ink-soft">
                {product.uses[lang].map((use) => (
                  <li key={use} className="flex gap-2.5">
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-field-600" />
                    {use}
                  </li>
                ))}
              </ul>

              {product.specs.length > 0 ? (
                <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                  {product.specs.map((spec) => (
                    <div key={spec.label.en} className="rounded border border-ink/10 bg-white p-4">
                      <dt className="text-sm font-semibold text-ink-soft">
                        {pick(spec.label, lang)}
                      </dt>
                      <dd className="mt-1 text-base text-ink">{pick(spec.value, lang)}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              {product.packaging[lang].length > 0 ? (
                <div className="mt-8">
                  <h3 className="font-heading text-base text-ink">
                    {pick({ en: 'Packaging', mr: 'पॅकिंग' }, lang)}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {product.packaging[lang].map((pack) => (
                      <li
                        key={pack}
                        className="rounded-sm border border-field-600/25 bg-field-50 px-2.5 py-1 text-sm text-field-800"
                      >
                        {pack}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="mt-8 rounded border border-dashed border-ink/25 bg-white/70 p-5">
                  <h3 className="font-heading text-base text-ink">
                    {pick({ en: 'Pack sizes', mr: 'पॅकिंगचे आकार' }, lang)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {pick(
                      {
                        en: 'Pack sizes are being confirmed by the business and will be published here. Until they are, tell us the quantity you need and we will confirm what we can supply.',
                        mr: 'पॅकिंगचे आकार व्यवसायाकडून निश्चित होत आहेत आणि येथे प्रकाशित केले जातील. तोपर्यंत तुम्हाला हवे असलेले प्रमाण सांगा, आम्ही काय पुरवू शकतो ते सांगू.',
                      },
                      lang,
                    )}
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonInternal
                  href={`${href(lang, 'quote')}?interest=${encodeURIComponent(product.inquiryValue)}`}
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
          </div>
        </Section>
      ))}

      {/* Processed material handled for customers. Kept clearly separate from
          the five products above — these are lots processed on request, not
          products we make and sell under our own name. */}
      <Section tone="dark" divider>
        <SectionHeading
          eyebrow={{ en: 'Processed material', mr: 'प्रक्रिया केलेला माल' }}
          title={{
            en: 'What else comes out of the unit',
            mr: 'युनिटमधून आणखी काय बाहेर पडते',
          }}
          intro={{
            en: 'Material processed here on customers’ behalf, photographed at the unit. These are examples of the work, not products we sell under our own name — the five products above are the ones we make and sell ourselves.',
            mr: 'ग्राहकांच्या वतीने येथे प्रक्रिया केलेला माल, युनिटमध्ये छायाचित्रित केलेला. ही कामाची उदाहरणे आहेत, आमच्या नावाने विकली जाणारी उत्पादने नाहीत — आम्ही स्वतः तयार करून विकतो ती वरील पाच उत्पादने आहेत.',
          }}
          tone="dark"
          lang={lang}
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(['processed-grain-varieties', 'packaged-grain-bags', 'processed-grain-bags'] as const).map(
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
      </Section>

      {/* Sales channels */}
      <Section tone="paper" divider>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={{ en: 'How we supply', mr: 'पुरवठा कसा होतो' }}
              title={{ en: 'Direct from the unit', mr: 'थेट युनिटमधून' }}
              lang={lang}
            />
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col gap-4 text-base leading-relaxed text-ink-soft">
              <p>
                {pick(
                  {
                    en: 'Tur, moong, urad and chana dal and animal feed bharada are supplied from our unit. Availability and rate depend on what is in hand, so tell us the product and quantity you need and we will confirm what we can supply.',
                    mr: 'तूरडाळ, मूगडाळ, उडीदडाळ, चणाडाळ व पशुखाद्य भरडा आमच्याच युनिटमधून पुरवले जातात. उपलब्धता व दर हातात असलेल्या मालावर अवलंबून असतात, म्हणून तुम्हाला हवे असलेले उत्पादन व प्रमाण सांगा, आम्ही काय पुरवू शकतो ते सांगू.',
                  },
                  lang,
                )}
              </p>
              <p>
                {pick(
                  {
                    en: 'The enquiry form asks which kind of buyer you are — farmer, trader, wholesale buyer, commercial buyer or retail buyer — so your requirement reaches the right person at the unit.',
                    mr: 'चौकशी फॉर्ममध्ये तुम्ही कोणत्या प्रकारचे खरेदीदार आहात — शेतकरी, व्यापारी, घाऊक खरेदीदार, व्यावसायिक खरेदीदार किंवा किरकोळ खरेदीदार — हे विचारले जाते, जेणेकरून तुमची गरज युनिटमधील योग्य व्यक्तीपर्यंत पोहोचते.',
                  },
                  lang,
                )}
              </p>
              <div className="mt-2">
                <ButtonInternal
                  href={`${href(lang, 'quote')}?interest=${encodeURIComponent('Tur Dal')}`}
                  variant="outline"
                >
                  {pick(ui.getQuote, lang)}
                  <ArrowRightIcon className="h-4 w-4" />
                </ButtonInternal>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* What we do not claim */}
      <Section tone="deep" divider>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={{ en: 'In plain terms', mr: 'स्पष्ट शब्दांत' }}
              title={{ en: 'What we are not saying', mr: 'आम्ही काय म्हणत नाही' }}
              lang={lang}
            />
          </div>

          <div className="lg:col-span-7">
            <ul className="flex flex-col gap-5 text-base leading-relaxed text-ink-soft">
              {[
                {
                  en: 'We are not listing nutritional values, moisture specifications or purity percentages. Those are laboratory figures, and we have not had them established for these products.',
                  mr: 'आम्ही पोषणमूल्ये, ओलाव्याचे प्रमाण किंवा शुद्धतेचे टक्के देत नाही. ती प्रयोगशाळेतील आकडेवारी आहे आणि या उत्पादनांसाठी ती आम्ही तपासून घेतलेली नाही.',
                },
                {
                  en: 'We are not claiming any certification, grade standard or award. None has been confirmed, so none is printed.',
                  mr: 'आम्ही कोणतेही प्रमाणपत्र, दर्जा मानक किंवा पुरस्काराचा दावा करत नाही. त्यापैकी काहीही निश्चित झालेले नाही, म्हणून काहीही छापलेले नाही.',
                },
                {
                  en: 'What we can tell you is where the material comes from, how it is processed, and what we can supply for the quantity you ask about. Send an enquiry and you will get that in writing.',
                  mr: 'आम्ही एवढे सांगू शकतो — माल कुठून येतो, त्यावर कशी प्रक्रिया होते आणि तुम्ही विचारलेल्या प्रमाणासाठी आम्ही काय पुरवू शकतो. चौकशी पाठवा, तुम्हाला ते लिखित स्वरूपात मिळेल.',
                },
              ].map((line) => (
                <li key={line.en} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-grain-500"
                  />
                  {pick(line, lang)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CtaBand lang={lang} />
    </>
  );
}
