import { href, pick, type Lang } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { directionsUrl, mailtoHref, site, telHref, whatsappHref } from '@/content/site';
import { buildWhatsAppOpener } from '@/lib/inquiry-message';
import { ButtonInternal } from '@/components/Button';
import { MapPinIcon, MailIcon, PhoneIcon, QuoteIcon, WhatsAppIcon } from '@/components/icons';
import { TrackedLink } from '@/components/TrackedLink';

/**
 * Repeated conversion band (SRS §7.1.12).
 *
 * Ends every major page with the same three ways to reach the business, so a
 * visitor who has finished reading never has to hunt for the next step.
 * Call and WhatsApp are omitted while their numbers are unconfirmed.
 */
export function CtaBand({ lang }: { lang: Lang }) {
  const tel = telHref();
  const wa = whatsappHref(buildWhatsAppOpener(lang));

  return (
    <section className="bg-field-800 bg-weave py-16 text-white sm:py-20">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-[0.18em] text-grain-300 uppercase">
              {pick({ en: 'Next step', mr: 'पुढील पायरी' }, lang)}
            </p>
            <h2 className="mt-3 font-heading text-2xl leading-tight text-balance sm:text-3xl">
              {pick(
                {
                  en: 'Tell us what you are bringing, and we will tell you what we can do.',
                  mr: 'तुम्ही काय आणत आहात ते सांगा, आम्ही काय करू शकतो ते सांगू.',
                },
                lang,
              )}
            </h2>
            <p className="mt-4 max-w-prose leading-relaxed text-field-100/85">
              {pick(
                {
                  en: 'Share the crop, the approximate quantity and when you need it. You will get a clear answer on what we can take and at what rate.',
                  mr: 'पीक, अंदाजे प्रमाण आणि तुम्हाला कधी हवे आहे ते कळवा. किती माल घेऊ शकतो व दर काय, याचे स्पष्ट उत्तर मिळेल.',
                },
                lang,
              )}
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="flex flex-col gap-3">
              <ButtonInternal
                href={href(lang, 'quote')}
                variant="accent"
                size="lg"
                className="w-full sm:w-auto sm:self-start"
              >
                <QuoteIcon className="h-5 w-5" />
                {pick(ui.getQuote, lang)}
              </ButtonInternal>

              <div className="flex flex-wrap gap-3">
                {wa ? (
                  <TrackedLink
                    href={wa}
                    action="whatsapp_click"
                    params={{ source: 'cta_band' }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded bg-[#128C7E] px-5 py-3 text-base font-semibold text-white transition-colors hover:bg-[#0e7568] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-field-800"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    {pick(ui.whatsapp, lang)}
                  </TrackedLink>
                ) : null}

                {tel ? (
                  <TrackedLink
                    href={tel}
                    action="call_click"
                    params={{ source: 'cta_band' }}
                    className="inline-flex items-center justify-center gap-2 rounded border border-white/35 bg-white/5 px-5 py-3 text-base font-semibold text-white transition-colors hover:border-white/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-field-800"
                  >
                    <PhoneIcon className="h-5 w-5" />
                    {pick(ui.call, lang)}
                  </TrackedLink>
                ) : null}

                <TrackedLink
                  href={directionsUrl}
                  action="directions_click"
                  params={{ source: 'cta_band' }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded border border-white/35 bg-white/5 px-5 py-3 text-base font-semibold text-white transition-colors hover:border-white/70 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-field-800"
                >
                  <MapPinIcon className="h-5 w-5" />
                  {pick(ui.directions, lang)}
                </TrackedLink>
              </div>

              {/* Email always works, so it is shown even before the phone
                  numbers are confirmed. */}
              <TrackedLink
                href={mailtoHref(`Processing enquiry — ${site.name}`)}
                action="email_click"
                params={{ source: 'cta_band' }}
                className="inline-flex items-center gap-2 self-start text-sm text-field-100/80 underline decoration-grain-400/60 underline-offset-4 transition-colors hover:text-white hover:decoration-grain-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-field-800"
              >
                <MailIcon className="h-4 w-4" />
                {site.email}
              </TrackedLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
