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
      ? 'Products — Corn Grit for Animal Feed & Spice Powders'
      : 'उत्पादने — जनावरांच्या खाद्यासाठी मक्याचा भरडा व मसाला पूड';

  const description =
    lang === 'en'
      ? 'Corn grit (मक्याचा भरडा) for animal feed and spice powders ground at our own unit on the Dhule–Solapur Highway at Gangapur, Maharashtra. Send an enquiry for quantity and rate.'
      : 'धुळे–सोलापूर महामार्गावर, गंगापूर, महाराष्ट्र येथील आमच्याच युनिटमध्ये तयार होणारा जनावरांच्या खाद्यासाठी मक्याचा भरडा व मसाला पूड. प्रमाण व दरासाठी चौकशी पाठवा.';

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
          en: 'Two products we make at our own unit',
          mr: 'आमच्याच युनिटमध्ये तयार होणारी दोन उत्पादने',
        }}
        intro={{
          en: 'Alongside processing other people’s material, we produce corn grit for animal feed and grind spice powders. Both come out of the same unit, from raw material we have handled ourselves.',
          mr: 'इतरांच्या मालावर प्रक्रिया करण्यासोबतच, आम्ही जनावरांच्या खाद्यासाठी मक्याचा भरडा तयार करतो व मसाला पूड कुटतो. दोन्ही एकाच युनिटमधून, आम्ही स्वतः हाताळलेल्या कच्च्या मालापासून तयार होतात.',
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
                    {pick({ en: 'Grades and pack sizes', mr: 'प्रकार व पॅकिंगचे आकार' }, lang)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {pick(
                      {
                        en: 'Available grades and pack sizes are being confirmed by the business and will be published here. Until they are, tell us the quantity and the form you need and we will confirm what we can supply.',
                        mr: 'उपलब्ध प्रकार व पॅकिंगचे आकार व्यवसायाकडून निश्चित होत आहेत आणि येथे प्रकाशित केले जातील. तोपर्यंत तुम्हाला हवे असलेले प्रमाण व स्वरूप सांगा, आम्ही काय पुरवू शकतो ते सांगू.',
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

      {/* Sales channels */}
      <Section tone="paper" divider>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={{ en: 'How we supply', mr: 'पुरवठा कसा होतो' }}
              title={{ en: 'Wholesale and retail', mr: 'घाऊक व किरकोळ' }}
              lang={lang}
            />
          </div>

          <div className="lg:col-span-7">
            <div className="flex flex-col gap-4 text-base leading-relaxed text-ink-soft">
              <p>
                {pick(
                  {
                    en: 'Corn grit and spice powders are supplied two ways: in bulk to traders and wholesale or commercial buyers, and in retail packs. Tell us which of the two you need, along with the quantity, and we will quote for that.',
                    mr: 'मक्याचा भरडा व मसाला पूड दोन प्रकारे पुरवली जाते: व्यापारी व घाऊक किंवा व्यावसायिक खरेदीदारांना मोठ्या प्रमाणात, आणि किरकोळ पॅकमध्ये. तुम्हाला यापैकी काय हवे आहे व किती प्रमाण, हे सांगा, आम्ही त्यानुसार दर सांगू.',
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
                  href={`${href(lang, 'quote')}?interest=${encodeURIComponent('Corn Grit')}`}
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
