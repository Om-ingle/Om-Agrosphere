import type { Metadata } from 'next';

import { pick, toLang, type Lang } from '@/lib/i18n';
import { ui } from '@/content/ui';
import {
  addressLine,
  directionsUrl,
  mailtoHref,
  mapEmbedUrl,
  site,
  telHref,
  whatsappHref,
} from '@/content/site';
import { buildWhatsAppOpener } from '@/lib/inquiry-message';
import { breadcrumbSchema, graph, localBusinessSchema, organizationSchema } from '@/lib/seo';

import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { InquiryForm } from '@/components/InquiryForm';
import { JsonLd } from '@/components/JsonLd';
import { ButtonLink } from '@/components/Button';
import {
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from '@/components/icons';

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = toLang((await params).lang);

  const title = lang === 'en' ? 'Contact Us — Om Agrosphere, Gangapur' : 'संपर्क — ओम अ‍ॅग्रोस्फिअर, गंगापूर';
  const description =
    lang === 'en'
      ? 'Contact Om Agrosphere on the Dhule–Solapur Highway at Diwashi, Kasabkheda, near Bharat Petroleum. Call or WhatsApp +91 94233 97938, or send an enquiry through the form.'
      : 'धुळे–सोलापूर महामार्गावर, दिवाशी, कसबखेडा येथे, भारत पेट्रोलियमजवळच्या ओम अ‍ॅग्रोस्फिअरशी संपर्क साधा. +९१ ९४२३३ ९७९३८ वर फोन किंवा व्हॉट्सअ‍ॅप करा, किंवा फॉर्मद्वारे चौकशी पाठवा.';

  return {
    title,
    description,
    alternates: {
      canonical: `/${lang}/contact`,
      languages: { 'en-IN': '/en/contact', 'mr-IN': '/mr/contact', 'x-default': '/en/contact' },
    },
    openGraph: { type: 'website', url: `/${lang}/contact`, title, description },
  };
}

export default async function ContactPage({ params }: PageProps) {
  const lang: Lang = toLang((await params).lang);

  const tel = telHref();
  const wa = whatsappHref(buildWhatsAppOpener(lang));
  const mail = mailtoHref(
    lang === 'en' ? 'Enquiry — Om Agrosphere' : 'चौकशी — ओम अ‍ॅग्रोस्फिअर',
  );
  const hours = site.hours.display[lang];

  const trail = [
    { name: { en: 'Home', mr: 'मुख्यपृष्ठ' }, path: '' },
    { name: { en: 'Contact', mr: 'संपर्क' }, path: 'contact' },
  ];

  /* Only confirmed channels are listed. A channel with no confirmed detail is
     omitted rather than shown as a dead button. */
  const channels = [
    {
      id: 'email',
      icon: MailIcon,
      label: ui.emailLabel,
      value: site.email,
      href: mail,
      external: false,
    },
    ...(wa
      ? [
          {
            id: 'whatsapp',
            icon: WhatsAppIcon,
            label: ui.whatsappLabel,
            value: pick({ en: 'Message us on WhatsApp', mr: 'व्हॉट्सअ‍ॅपवर संदेश पाठवा' }, lang),
            href: wa,
            external: true,
          },
        ]
      : []),
    ...(tel
      ? [
          {
            id: 'phone',
            icon: PhoneIcon,
            label: ui.phone,
            value: site.phoneDisplay,
            href: tel,
            external: true,
          },
        ]
      : []),
    {
      id: 'address',
      icon: MapPinIcon,
      label: ui.locationLabel,
      value: addressLine(lang),
      href: directionsUrl,
      external: true,
    },
    ...(hours
      ? [
          {
            id: 'hours',
            icon: ClockIcon,
            label: ui.hours,
            value: hours,
            href: null,
            external: false,
          },
        ]
      : []),
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
        eyebrow={{ en: 'Contact', mr: 'संपर्क' }}
        title={{
          en: 'Reach the unit, or send us your requirement',
          mr: 'युनिटशी संपर्क साधा, किंवा तुमची गरज कळवा',
        }}
        intro={{
          en: 'Email always works. If you would rather write everything in one go, the enquiry form below reaches the same place and gives us the details we need to answer properly.',
          mr: 'ईमेल कधीही चालते. सर्व माहिती एकदम लिहायची असेल, तर खालील चौकशी फॉर्म त्याच ठिकाणी पोहोचतो आणि योग्य उत्तर देण्यासाठी लागणारी माहिती देतो.',
        }}
        trail={trail}
      />

      {/* Channels + map */}
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={{ en: 'Get in touch', mr: 'संपर्क साधा' }}
              title={{ en: 'How to reach us', mr: 'आमच्यापर्यंत कसे पोहोचावे' }}
              lang={lang}
            />

            <ul className="mt-8 flex flex-col divide-y divide-ink/10 border-y border-ink/10">
              {channels.map((channel) => {
                const Icon = channel.icon;
                const content = (
                  <>
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded bg-field-50 text-field-700">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs font-semibold tracking-wide text-ink-muted uppercase">
                        {pick(channel.label, lang)}
                      </span>
                      <span className="mt-1 block text-base font-semibold break-words text-ink">
                        {channel.value}
                      </span>
                    </span>
                  </>
                );

                return (
                  <li key={channel.id}>
                    {channel.href ? (
                      <a
                        href={channel.href}
                        {...(channel.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="flex gap-4 py-4 hover:bg-paper-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-field-700 focus-visible:ring-offset-2"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex gap-4 py-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Fallback if a channel is ever unset in the config: say so
                plainly rather than leaving a silent gap. */}
            {!tel || !hours ? (
              <p className="mt-6 rounded border border-ink/10 bg-paper-dim p-4 text-sm leading-relaxed text-ink-soft">
                {pick(
                  {
                    en: 'Some contact details are not published here yet. Email or the enquiry form will reach us in the meantime.',
                    mr: 'काही संपर्क तपशील अजून येथे प्रकाशित केलेले नाहीत. तोपर्यंत ईमेल किंवा चौकशी फॉर्मद्वारे आमच्यापर्यंत पोहोचू शकता.',
                  },
                  lang,
                )}
              </p>
            ) : null}

            <div className="mt-8">
              <ButtonLink href={directionsUrl} variant="outline" target="_blank" rel="noopener noreferrer">
                <MapPinIcon className="h-4 w-4" />
                {pick(ui.directions, lang)}
              </ButtonLink>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded border border-ink/10 bg-paper-dim">
              <iframe
                src={mapEmbedUrl}
                title={pick(
                  {
                    en: 'Map showing the Om Agrosphere unit on the Dhule–Solapur Highway at Diwashi, Kasabkheda',
                    mr: 'धुळे–सोलापूर महामार्गावर, दिवाशी, कसबखेडा येथील ओम अ‍ॅग्रोस्फिअर युनिट दाखवणारा नकाशा',
                  },
                  lang,
                )}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                className="h-[22rem] w-full border-0 sm:h-[28rem]"
                allowFullScreen
              />
            </div>

            <div className="mt-6 rounded border border-ink/10 bg-white p-5 shadow-card">
              <h2 className="font-heading text-base text-ink">
                {pick({ en: 'Before you set out', mr: 'निघण्यापूर्वी' }, lang)}
              </h2>
              <ul className="mt-3 flex flex-col gap-2.5 text-sm leading-relaxed text-ink-soft">
                {[
                  {
                    en: 'Tell us the approximate quantity before you travel, so we can confirm the lot works for us.',
                    mr: 'निघण्यापूर्वी अंदाजे प्रमाण सांगा, म्हणजे माल आमच्यासाठी ठीक आहे का हे आम्ही सांगू शकू.',
                  },
                  {
                    en: 'Send the enquiry form first if you want a rate confirmed in writing before loading.',
                    mr: 'भरण्यापूर्वी दर लिखित स्वरूपात हवा असल्यास आधी चौकशी फॉर्म पाठवा.',
                  },
                  {
                    en: 'The unit is on the highway, so loaded vehicles can reach it directly without entering town.',
                    mr: 'युनिट महामार्गावर आहे, त्यामुळे भरलेली वाहने शहरात न जाता थेट पोहोचू शकतात.',
                  },
                  {
                    en: `Google Plus Code for the gate: ${site.location.plusCode}. Useful if you are sending a driver or a delivery vehicle ahead of you.`,
                    mr: `गेटचा Google प्लस कोड: ${site.location.plusCode}. तुमच्याआधी चालक किंवा डिलिव्हरी वाहन पाठवत असल्यास उपयुक्त.`,
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

      {/* Quick enquiry */}
      <Section tone="dim" divider id="enquiry">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={{ en: 'Enquiry', mr: 'चौकशी' }}
              title={{ en: 'Send us your requirement', mr: 'तुमची गरज आम्हाला कळवा' }}
              intro={{
                en: 'This is the same enquiry form as the Get a Quote page. It reaches the unit by email, and you can forward the same details to WhatsApp in one tap afterwards.',
                mr: 'हा दर चौकशी पानावरील फॉर्मच आहे. तो ईमेलवर युनिटपर्यंत पोहोचतो आणि नंतर तीच माहिती एका टॅपमध्ये व्हाट्सअ‍ॅपवर पाठवता येते.',
              }}
              lang={lang}
            />
          </div>

          <div className="lg:col-span-7">
            <div className="rounded border border-ink/10 bg-white p-6 shadow-card sm:p-8">
              <InquiryForm lang={lang} source="contact" compact />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
