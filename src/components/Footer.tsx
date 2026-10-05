import Link from 'next/link';
import { href, pick, type Lang } from '@/lib/i18n';
import { legalNav, primaryNav, quoteNav } from '@/content/nav';
import { ui } from '@/content/ui';
import { services } from '@/content/services';
import {
  addressLine,
  directionsUrl,
  mailtoHref,
  site,
  telHref,
  whatsappHref,
} from '@/content/site';
import { buildWhatsAppOpener } from '@/lib/inquiry-message';
import { Logo } from '@/components/Logo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ButtonLink } from '@/components/Button';
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from '@/components/icons';

export function Footer({ lang }: { lang: Lang }) {
  const year = new Date().getFullYear();
  const tel = telHref();
  const wa = whatsappHref(buildWhatsAppOpener(lang));
  const hours = site.hours.display[lang];

  const footerServices = services.map((service) => ({
    path: `services/${service.slug}`,
    label: service.name,
  }));

  return (
    <footer className="mt-20 border-t border-grain-500/35 bg-field-900 bg-weave text-field-100">
      <div className="mx-auto max-w-content px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Identity + description */}
          <div className="lg:col-span-4">
            <Logo lang={lang} tone="dark" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-field-100/75">
              {pick(site.shortDescription, lang)}
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {wa ? (
                <ButtonLink
                  href={wa}
                  variant="whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {pick(ui.whatsapp, lang)}
                </ButtonLink>
              ) : null}
              <ButtonLink
                href={directionsUrl}
                variant="onDark"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPinIcon className="h-4 w-4" />
                {pick(ui.directions, lang)}
              </ButtonLink>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-labelledby="footer-nav-heading" className="lg:col-span-2">
            <h2
              id="footer-nav-heading"
              className="text-xs font-semibold tracking-[0.14em] text-grain-300 uppercase"
            >
              {pick({ en: 'Pages', mr: 'पाने' }, lang)}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {[...primaryNav, quoteNav].map((item) => (
                <li key={item.path}>
                  <Link
                    href={href(lang, item.path)}
                    className="text-field-100/75 transition-colors hover:text-white hover:underline hover:decoration-grain-400 hover:underline-offset-4"
                  >
                    {pick(item.label, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-labelledby="footer-services-heading" className="lg:col-span-3">
            <h2
              id="footer-services-heading"
              className="text-xs font-semibold tracking-[0.14em] text-grain-300 uppercase"
            >
              {pick(ui.coreServices, lang)}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              {footerServices.map((item) => (
                <li key={item.path}>
                  <Link
                    href={href(lang, item.path)}
                    className="text-field-100/75 transition-colors hover:text-white hover:underline hover:decoration-grain-400 hover:underline-offset-4"
                  >
                    {pick(item.label, lang)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="text-xs font-semibold tracking-[0.14em] text-grain-300 uppercase">
              {pick({ en: 'Contact', mr: 'संपर्क' }, lang)}
            </h2>

            <ul className="mt-4 flex flex-col gap-3.5 text-sm">
              <li className="flex gap-2.5">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-grain-400" />
                <address className="not-italic text-field-100/75">
                  {addressLine(lang)}
                </address>
              </li>

              <li className="flex gap-2.5">
                <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-grain-400" />
                <a
                  href={mailtoHref(`Enquiry — ${site.name}`)}
                  className="break-all text-field-100/75 transition-colors hover:text-white hover:underline hover:decoration-grain-400 hover:underline-offset-4"
                >
                  {site.email}
                </a>
              </li>

              {/* Phone and hours come from the site config, so they cannot
                  drift out of sync with the Contact page. */}
              {tel ? (
                <li className="flex gap-2.5">
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-grain-400" />
                  <a
                    href={tel}
                    className="text-field-100/75 transition-colors hover:text-white hover:underline hover:decoration-grain-400 hover:underline-offset-4"
                  >
                    {site.phoneDisplay}
                  </a>
                </li>
              ) : null}

              {hours ? (
                <li className="flex gap-2.5">
                  <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-grain-400" />
                  <span className="text-field-100/75">{hours}</span>
                </li>
              ) : null}
            </ul>

            <LanguageSwitcher lang={lang} tone="dark" className="mt-6" />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-field-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {pick({ en: 'All rights reserved.', mr: 'सर्व हक्क राखीव.' }, lang)}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.path}>
                <Link
                  href={href(lang, item.path)}
                  className="transition-colors hover:text-white hover:underline hover:decoration-grain-400 hover:underline-offset-4"
                >
                  {pick(item.label, lang)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
