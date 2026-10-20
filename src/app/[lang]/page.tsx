import type { Metadata } from 'next';

import { href, pick, toLang, type Lang } from '@/lib/i18n';
import { services } from '@/content/services';
import { products } from '@/content/products';
import { featuredFaqs, trustPoints } from '@/content/faqs';
import { ui } from '@/content/ui';import { directionsUrl, localityLine, mailtoHref, site, telHref, whatsappHref } from '@/content/site';
import { buildWhatsAppOpener } from '@/lib/inquiry-message';
import {
  faqSchema,
  graph,
  localBusinessSchema,
  organizationSchema,
  productsSchema,
  servicesSchema,
} from '@/lib/seo';

import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { ServiceCard } from '@/components/ServiceCard';
import { ProductCard } from '@/components/ProductCard';
import { CropGrid } from '@/components/CropGrid';
import { FaqList } from '@/components/FaqList';
import { CtaBand } from '@/components/CtaBand';
import { Photo } from '@/components/Photo';
import { Video } from '@/components/Video';
import { JsonLd } from '@/components/JsonLd';
import { ButtonInternal, ButtonLink } from '@/components/Button';
import { TrackedLink } from '@/components/TrackedLink';
import {
  ArrowRightIcon,
  FactoryIcon,
  LayersIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  QuoteIcon,
  ShieldIcon,
  SproutIcon,
  TruckIcon,
  WhatsAppIcon,
} from '@/components/icons';

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = toLang((await params).lang);

  const title =
    lang === 'en'
      ? 'Grain Cleaning, Sorting, Grading & Dal Milling — Gangapur, Maharashtra'
      : 'धान्य स्वच्छता, प्रतवारी, ग्रेडिंग व डाळ मिल — गंगापूर, महाराष्ट्र';

  const description =
    lang === 'en'
      ? 'Om Agrosphere provides grain cleaning, sorting, grading and dal milling for wheat, jowar, bajra, tur, chana, moong and urad on the Dhule–Solapur Highway at Gangapur, Maharashtra. Corn grit for animal feed and spice powders. Request a quote today.'
      : 'ओम अॅग्रोस्फिअर धुळे–सोलापूर महामार्गावर, गंगापूर, महाराष्ट्र येथे गहू, ज्वारी, बाजरी, तूर, हरभरा, मूग व उडीद यांच्यासाठी धान्य स्वच्छता, प्रतवारी, ग्रेडिंग व डाळ मिल सेवा देते. जनावरांच्या खाद्यासाठी मक्याचा भरडा व मसाला पूड. आजच दराची चौकशी करा.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: { 'en-IN': '/en', 'mr-IN': '/mr', 'x-default': '/en' },
    },
    openGraph: {
      type: 'website',
      url: `/${lang}`,
      title,
      description,
      locale: lang === 'mr' ? 'mr_IN' : 'en_IN',
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const lang: Lang = toLang((await params).lang);

  const tel = telHref();
  const wa = whatsappHref(buildWhatsAppOpener(lang));

  const trustIcons = [FactoryIcon, LayersIcon, MapPinIcon, SproutIcon, TruckIcon, ShieldIcon];

  return (
    <>
      <JsonLd
        json={graph([
          organizationSchema(),
          localBusinessSchema(),
          ...servicesSchema(lang),
          ...productsSchema(lang),
          faqSchema(lang, featuredFaqs),
        ])}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-field-900 text-white">
        {/*
          One warm glow, no repeating pattern. The geometric weave that used to
          sit behind this copy competed with the headline; the photograph (or
          its plate) is now the only texture on the page.
        */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(115%_80%_at_82%_12%,rgba(224,169,59,0.18),transparent_58%)]"
        />

        <div className="relative mx-auto max-w-content px-4 pt-14 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            {/* ── Copy ── */}
            <div className="lg:col-span-6">
              <p className="eyebrow flex items-center gap-3 text-grain-300">
                <span aria-hidden="true" className="h-px w-8 bg-grain-400/70" />
                {pick(
                  {
                    en: 'Dhule–Solapur Highway · Gangapur, Maharashtra',
                    mr: 'धुळे–सोलापूर महामार्ग · गंगापूर, महाराष्ट्र',
                  },
                  lang,
                )}
              </p>

              <h1 className="mt-5 font-heading text-[2.1rem] leading-[1.08] text-balance text-white sm:text-[2.7rem] lg:text-[3.1rem]">
                {pick(site.tagline, lang)}
              </h1>

              {/* The tagline in the other language — often how the business is
                  described out loud, so it belongs next to the headline. */}
              <p
                lang={lang === 'en' ? 'mr' : 'en'}
                className="mt-3 font-heading text-lg text-grain-200 sm:text-xl"
              >
                {lang === 'en' ? site.tagline.mr : site.tagline.en}
              </p>

              <p className="mt-6 max-w-prose text-base leading-relaxed text-field-100/85 sm:text-[1.0625rem]">
                {pick(
                  {
                    en: 'We clean, sort, grade and mill grain for farmers, traders and buyers — and supply corn grit for animal feed and spice powders from our own unit.',
                    mr: 'आम्ही शेतकरी, व्यापारी व खरेदीदारांसाठी धान्य स्वच्छ करतो, प्रतवारी व ग्रेडिंग करतो आणि दळतो — तसेच आमच्याच युनिटमधून जनावरांच्या खाद्यासाठी मक्याचा भरडा व मसाला पूड पुरवतो.',
                  },
                  lang,
                )}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <ButtonInternal
                  href={href(lang, 'quote')}
                  variant="accent"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <QuoteIcon className="h-5 w-5" />
                  {pick(ui.getQuote, lang)}
                </ButtonInternal>

                {wa ? (
                  <TrackedLink
                    href={wa}
                    action="whatsapp_click"
                    params={{ source: 'hero' }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[3rem] w-full items-center justify-center gap-2 rounded bg-[#128C7E] px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0e7568] active:bg-[#0b5f55] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-field-900 sm:w-auto"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    {pick(ui.whatsapp, lang)}
                  </TrackedLink>
                ) : null}
              </div>
            </div>

            {/* ── Photograph ── */}
            <div className="lg:col-span-6">
              <div className="relative">
                {/* Offset frame — a matted, considered presentation rather than
                    a full-bleed image pasted onto the green. */}
                <span
                  aria-hidden="true"
                  className="absolute -inset-2.5 rounded-sm border border-grain-400/25 sm:-inset-3.5"
                />
                <Photo
                  photoKey="hero-facility"
                  lang={lang}
                  priority
                  tone="dark"
                  className="relative aspect-[16/10] w-full rounded-sm border border-white/10 lg:aspect-[16/11]"
                  sizes="(min-width: 1024px) 46vw, 100vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Facts strip ──
            Only facts the business has supplied: where the unit is, and the
            two ways to reach it. No invented figures. */}
        <div className="relative mt-12 border-t border-white/10 lg:mt-14">
          <dl className="mx-auto grid max-w-content divide-y divide-white/10 px-4 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-8">
            <div className="flex gap-3 py-5 md:px-6 md:py-6 md:first:pl-0">
              <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-grain-400" />
              <div>
                <dt className="eyebrow text-field-100/50">{pick(ui.locationLabel, lang)}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-field-100/90">
                  {pick(site.location.landmark, lang)}
                  <br />
                  {localityLine(lang)}
                </dd>
              </div>
            </div>

            {tel ? (
              <div className="flex gap-3 py-5 md:px-6 md:py-6">
                <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-grain-400" />
                <div>
                  <dt className="eyebrow text-field-100/50">{pick(ui.phone, lang)}</dt>
                  <dd className="mt-1.5 text-sm">
                    <a
                      href={tel}
                      className="inline-flex min-h-[1.75rem] items-center font-semibold text-field-100 transition-colors hover:text-white hover:underline hover:decoration-grain-400 hover:underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-field-900"
                    >
                      {site.phoneDisplay}
                    </a>
                  </dd>
                </div>
              </div>
            ) : null}

            <div className="flex gap-3 py-5 md:px-6 md:py-6 md:last:pr-0">
              <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-grain-400" />
              <div>
                <dt className="eyebrow text-field-100/50">{pick(ui.emailLabel, lang)}</dt>
                <dd className="mt-1.5 text-sm">
                  <a
                    href={mailtoHref(`Enquiry — ${site.name}`)}
                    className="break-all text-field-100/90 underline decoration-grain-400/50 underline-offset-4 transition-colors hover:text-white hover:decoration-grain-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-field-900"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </section>

      {/* ── Business introduction ─────────────────────────────────────────── */}
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow={{ en: 'Who we are', mr: 'आम्ही कोण आहोत' }}
              title={{
                en: 'An agricultural processing unit on the highway, built around one job',
                mr: 'महामार्गावरील एक कृषी प्रक्रिया युनिट, एकाच कामासाठी उभारलेले',
              }}
              lang={lang}
            />

            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink-soft">
              <p>
                {pick(
                  {
                    en: 'Om Agrosphere is an agricultural processing business at Diwashi on the Dhule–Solapur Highway, in Gangapur taluka, Maharashtra. We take harvested and traded agricultural produce and put it through cleaning, sorting, grading and milling, so it leaves in a more useful, more sellable condition than it arrived.',
                    mr: 'ओम अॅग्रोस्फिअर हा धुळे–सोलापूर महामार्गावर, गंगापूर तालुक्यातील दिवाशी येथील कृषी प्रक्रिया व्यवसाय आहे. कापणी केलेला व खरेदी केलेला शेतमाल आम्ही स्वच्छता, प्रतवारी, ग्रेडिंग व दळण या प्रक्रियांतून घेतो, जेणेकरून तो आला त्यापेक्षा अधिक उपयुक्त व विक्रीयोग्य स्थितीत बाहेर पडतो.',
                  },
                  lang,
                )}
              </p>
              <p>
                {pick(
                  {
                    en: 'Our customers are the people this highway already carries: farmers bringing their own harvest, traders handling other people’s, wholesale buyers sourcing in bulk, and retail customers who want a specific product. We also supply corn grit for animal feed and spice powders ground at our own unit.',
                    mr: 'हा महामार्ग ज्यांना घेऊन जातो तेच आमचे ग्राहक: स्वतःची कापणी आणणारे शेतकरी, दुसऱ्यांचा माल हाताळणारे व्यापारी, मोठ्या प्रमाणात माल घेणारे घाऊक खरेदीदार, आणि विशिष्ट उत्पादन हवे असलेले किरकोळ ग्राहक. त्याशिवाय आम्ही जनावरांच्या खाद्यासाठी मक्याचा भरडा आणि आमच्याच युनिटमध्ये कुटलेली मसाला पूड पुरवतो.',
                  },
                  lang,
                )}
              </p>
              <p>
                {pick(
                  {
                    en: 'If you have material to process, tell us the crop and roughly how much you are bringing. We will tell you honestly what we can take, when we can take it, and what it will cost.',
                    mr: 'प्रक्रिया करायचा माल असल्यास, पीक व अंदाजे प्रमाण सांगा. किती माल घेऊ शकतो, केव्हा घेऊ शकतो आणि खर्च किती होईल — हे आम्ही प्रामाणिकपणे सांगू.',
                  },
                  lang,
                )}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonInternal href={href(lang, 'about')} variant="outline">
                {pick({ en: 'More about us', mr: 'आमच्याविषयी अधिक' }, lang)}
                <ArrowRightIcon className="h-4 w-4" />
              </ButtonInternal>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Photo
              photoKey="cleaned-grain-in-hand"
              lang={lang}
              className="aspect-[4/5] w-full rounded border border-ink/10"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </div>
      </Section>

      {/* ── Services ─────────────────────────────────────────────────────── */}
      <Section tone="dim" divider>
        <SectionHeading
          eyebrow={{ en: 'Services', mr: 'सेवा' }}
          title={ui.coreServices}
          intro={{
            en: 'Five processing services. Most lots go through more than one of them before they are ready to leave.',
            mr: 'पाच प्रक्रिया सेवा. बहुतेक माल येथून बाहेर पडण्यापूर्वी यापैकी एकापेक्षा जास्त प्रक्रियांतून जातो.',
          }}
          lang={lang}
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} lang={lang} />
          ))}
        </div>
      </Section>

      {/* ── Supported crops ──────────────────────────────────────────────── */}
      <Section tone="paper" divider>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow={{ en: 'Crops', mr: 'पिके' }}
              title={ui.supportedCrops}
              intro={{
                en: 'These are the crops we handle. Crops outside this list are not something we can promise — ask us and we will say so plainly.',
                mr: 'ही आम्ही हाताळत असलेली पिके आहेत. या यादीबाहेरील पिकांबाबत आम्ही वचन देऊ शकत नाही — विचारा, आम्ही स्पष्ट सांगू.',
              }}
              lang={lang}
            />
          </div>

          <div className="lg:col-span-8">
            <CropGrid lang={lang} />
          </div>
        </div>
      </Section>

      {/* ── Products ─────────────────────────────────────────────────────── */}
      <Section tone="dim" divider>
        <SectionHeading
          eyebrow={{ en: 'Products', mr: 'उत्पादने' }}
          title={ui.featuredProducts}
          intro={{
            en: 'Besides processing other people’s material, we supply products from our own unit.',
            mr: 'इतरांच्या मालावर प्रक्रिया करण्याशिवाय, आम्ही आमच्याच युनिटमधून उत्पादने पुरवतो.',
          }}
          lang={lang}
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} lang={lang} />
          ))}
        </div>

        <div className="mt-8">
          <ButtonInternal href={href(lang, 'products')} variant="outline">
            {pick({ en: 'Product details', mr: 'उत्पादनांची माहिती' }, lang)}
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonInternal>
        </div>
      </Section>

      {/* ── Why Om Agrosphere ────────────────────────────────────────────── */}
      <Section tone="paper" divider>
        <SectionHeading
          eyebrow={{ en: 'Why us', mr: 'आम्हालाच का' }}
          title={ui.whyUs}
          intro={{
            en: 'No awards, no invented numbers. These are the things that are actually true about how we work.',
            mr: 'पुरस्कार नाहीत, मनाने तयार केलेले आकडे नाहीत. आमचे काम कसे चालते याबद्दल खरोखर खरे असलेले मुद्दे हे आहेत.',
          }}
          lang={lang}
        />

        {/* A hairline grid, not six floating cards — the copy is the point. */}
        <ul className="mt-10 grid gap-x-12 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map((point, index) => {
            const Icon = trustIcons[index % trustIcons.length]!;
            return (
              <li
                key={point.title.en}
                className="flex gap-4 border-t border-ink/10 pt-6"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-field-800 text-grain-300">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-heading text-base text-ink">
                    {pick(point.title, lang)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {pick(point.body, lang)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* ── Facility / photo story ───────────────────────────────────────── */}
      <Section tone="dark" divider>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={{ en: 'Photographs', mr: 'छायाचित्रे' }}
            title={ui.insideFacility}
            intro={{
              en: 'Real photographs of our unit, our machinery and our products. As each one is ready it goes up here — we do not use stock images of somebody else’s facility.',
              mr: 'आमचे युनिट, आमची यंत्रसामग्री व आमची उत्पादने यांची खरी छायाचित्रे. प्रत्येक छायाचित्र तयार होताच येथे लावले जाते — दुसऱ्याच्या युनिटची स्टॉक छायाचित्रे आम्ही वापरत नाही.',
            }}
            tone="dark"
            lang={lang}
          />
          <ButtonInternal href={href(lang, 'gallery')} variant="onDark" className="shrink-0">
            {pick(ui.viewAll, lang)}
            <ArrowRightIcon className="h-4 w-4" />
          </ButtonInternal>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              'machinery-processing-unit',
              'grain-quality-closeup',
              'processed-grain-varieties',
              'team-at-facility',
            ] as const
          ).map((key) => (
            <li key={key}>
              <Photo
                photoKey={key}
                lang={lang}
                tone="dark"
                className="aspect-[4/3] w-full rounded border border-white/15"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
            </li>
          ))}
        </ul>
      </Section>

      {/* ── Farmer / value-addition connection ───────────────────────────── */}
      <Section tone="paper" divider>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-5 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              <Video
                videoKey="farm-harvesting"
                lang={lang}
                className="aspect-[3/4]"
                sizes="(min-width: 1024px) 20vw, 50vw"
              />
              <Video
                videoKey="grain-unloading"
                lang={lang}
                className="aspect-[3/4]"
                sizes="(min-width: 1024px) 20vw, 50vw"
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:order-1">
            <SectionHeading
              eyebrow={{ en: 'From field to finished lot', mr: 'शेतातून तयार मालापर्यंत' }}
              title={{
                en: 'Why processing matters to the person who grew the crop',
                mr: 'पीक पिकवणाऱ्यासाठी प्रक्रिया का महत्त्वाची आहे',
              }}
              lang={lang}
            />

            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink-soft">
              <p>
                {pick(
                  {
                    en: 'A harvest comes off the field mixed. Dust, chaff and stones travel with the grain, and no two lots are the same quality. Sold as it comes, that mixture is priced at the value of its weakest part.',
                    mr: 'कापणी शेतातून मिसळलेली येते. धूळ, भुसा व दगड धान्यासोबत येतात आणि दोन माल कधीच एकसारखे नसतात. जसा आहे तसा विकला गेल्यास, त्या मिश्रणाचा भाव त्यातील सर्वात कमी दर्जाच्या भागावर ठरतो.',
                  },
                  lang,
                )}
              </p>
              <p>
                {pick(
                  {
                    en: 'Cleaning, sorting and grading separate that mixture into lots that can each be sold on their own terms. One part may fetch a better rate; another is right for feed or industrial use. The total from the same harvest is higher than if it had left whole.',
                    mr: 'स्वच्छता, प्रतवारी व ग्रेडिंग यामुळे ते मिश्रण अशा भागांत विभागले जाते ज्यांची विक्री स्वतंत्रपणे होऊ शकते. एका भागाला चांगला भाव मिळू शकतो; दुसरा खाद्य किंवा उद्योगासाठी योग्य ठरतो. त्याच कापणीतून मिळणारी एकूण रक्कम, ती जशी होती तशी गेल्यापेक्षा जास्त असते.',
                  },
                  lang,
                )}
              </p>
              <p>
                {pick(
                  {
                    en: 'That is the whole point of what we do here. It is not complicated work, but it is work that changes what a crop is worth to the family that grew it.',
                    mr: 'आम्ही येथे करत असलेल्या कामाचा उद्देश एवढाच आहे. हे काम गुंतागुंतीचे नाही, पण ते पिकाची किंमत पिकवणाऱ्या कुटुंबासाठी बदलते.',
                  },
                  lang,
                )}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Testimonials (honest placeholder) ────────────────────────────── */}
      <Section tone="dim" divider>
        <SectionHeading
          eyebrow={{ en: 'Customer feedback', mr: 'ग्राहकांचे अभिप्राय' }}
          title={{ en: 'What our customers say', mr: 'आमचे ग्राहक काय सांगतात' }}
          lang={lang}
        />

        {/* An editorial note with a left rule, rather than an empty dashed box
            pretending to be a testimonial carousel. */}
        <div className="mt-8 border-l-2 border-grain-500/60 pl-6 sm:pl-8">
          <p className="max-w-prose text-base leading-relaxed text-ink-soft">
            {pick(
              {
                en: 'We have not published customer reviews yet. We would rather show nothing here than write testimonials ourselves — so this section stays empty until real customers give us permission to quote them. If you have processed material with us and would like to say something about it, we would be glad to hear from you.',
                mr: 'आम्ही अजून ग्राहकांचे अभिप्राय प्रकाशित केलेले नाहीत. स्वतःच अभिप्राय लिहिण्यापेक्षा येथे काहीही न दाखवणे आम्हाला योग्य वाटते — म्हणून खरे ग्राहक आम्हाला त्यांचे नाव देऊन अभिप्राय देईपर्यंत हा भाग रिकामा राहील. तुम्ही आमच्याकडे माल प्रक्रिया केला असेल आणि त्याबद्दल काही सांगू इच्छित असाल, तर आम्हाला आनंद होईल.',
              },
              lang,
            )}
          </p>
          <div className="mt-6">
            <ButtonLink
              href={mailtoHref(
                'Feedback about Om Agrosphere',
                'You can write your feedback in Marathi or English.',
              )}
              variant="outline"
            >
              <MailIcon className="h-4 w-4" />
              {pick({ en: 'Send us your feedback', mr: 'तुमचा अभिप्राय पाठवा' }, lang)}
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* ── FAQ preview ──────────────────────────────────────────────────── */}
      <Section tone="paper" divider>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow={{ en: 'FAQ', mr: 'प्रश्नोत्तरे' }}
              title={ui.commonQuestions}
              intro={{
                en: 'The questions we are asked most often, answered as plainly as we can.',
                mr: 'आम्हाला सर्वाधिक विचारले जाणारे प्रश्न, शक्य तितक्या स्पष्ट उत्तरांसह.',
              }}
              lang={lang}
            />
            <div className="mt-6">
              <ButtonInternal href={href(lang, 'faq')} variant="outline">
                {pick({ en: 'All questions', mr: 'सर्व प्रश्न' }, lang)}
                <ArrowRightIcon className="h-4 w-4" />
              </ButtonInternal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <FaqList items={featuredFaqs} lang={lang} />
          </div>
        </div>
      </Section>

      {/* ── Location ─────────────────────────────────────────────────────── */}
      <Section tone="dim" divider>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow={{ en: 'Location', mr: 'ठिकाण' }}
              title={ui.findUs}
              lang={lang}
            />

            <address className="mt-6 flex gap-3 not-italic">
              <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-field-700" />
              <span className="text-base leading-relaxed text-ink-soft">
                <strong className="font-semibold text-ink">{site.name}</strong>
                <br />
                {pick(site.location.landmark, lang)}
                <br />
                {localityLine(lang)}
              </span>
            </address>

            <p className="mt-6 max-w-prose text-sm leading-relaxed text-ink-muted">
              {pick(
                {
                  en: 'The unit is on the highway itself, so loaded vehicles can reach it without going through town. Open the location in Google Maps, or call before you set out and we will guide you in.',
                  mr: 'युनिट महामार्गावरच आहे, त्यामुळे भरलेली वाहने शहरातून न जाता थेट पोहोचू शकतात. Google Maps मध्ये ठिकाण उघडा, किंवा निघण्यापूर्वी फोन करा, आम्ही रस्ता सांगू.',
                },
                lang,
              )}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <TrackedLink
                href={directionsUrl}
                action="directions_click"
                params={{ source: 'home_location' }}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded bg-field-700 px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-field-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-field-700 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-dim"
              >
                <MapPinIcon className="h-5 w-5" />
                {pick(ui.directions, lang)}
              </TrackedLink>

              {tel ? (
                <TrackedLink
                  href={tel}
                  action="call_click"
                  params={{ source: 'home_location' }}
                  className="inline-flex items-center justify-center gap-2 rounded border border-field-700/35 px-5 py-3 text-base font-semibold text-field-800 transition-colors hover:border-field-700 hover:bg-field-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-field-700 focus-visible:ring-offset-2 focus-visible:ring-offset-paper-dim"
                >
                  <PhoneIcon className="h-5 w-5" />
                  {pick(ui.call, lang)}
                </TrackedLink>
              ) : null}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded border border-ink/10 bg-white p-5">
              <p className="text-sm leading-relaxed text-ink-soft">
                {pick(
                  {
                    en: 'How to get here: take the Dhule–Solapur Highway to Diwashi, in Gangapur taluka, and look for Bharat Petroleum. The unit is next to it. Call us when you are close if you are bringing a loaded vehicle, so we can make space for you to unload.',
                    mr: 'इथे कसे यावे: धुळे–सोलापूर महामार्गाने गंगापूर तालुक्यातील दिवाशी येथे या आणि भारत पेट्रोलियम शोधा. युनिट त्याच्या शेजारीच आहे. भरलेले वाहन घेऊन येत असल्यास जवळ आल्यावर फोन करा, म्हणजे माल उतरवण्यासाठी जागा करून देऊ.',
                  },
                  lang,
                )}
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Final conversion ─────────────────────────────────────────────── */}
      <CtaBand lang={lang} />
    </>
  );
}
