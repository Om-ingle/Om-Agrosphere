import type { Lang } from '@/lib/i18n';
import {
  SITE_URL,
  addressLine,
  site,
  telHref,
} from '@/content/site';
import { services } from '@/content/services';
import { products } from '@/content/products';
import type { Faq } from '@/content/faqs';

/**
 * Schema.org structured data (SRS §11.3).
 *
 * Every field emitted here is backed by a fact the business has confirmed.
 * Fields that are still unknown — social profiles, for instance — are omitted
 * entirely rather than filled with a guess, because incorrect structured data
 * is worse than none: Google can surface it directly in search results.
 */

type Json = Record<string, unknown>;

const ORG_ID = `${SITE_URL}/#organization`;

/** The postal address, shared by the Organization and LocalBusiness nodes. */
function postalAddress(): Json {
  const l = site.location;
  return {
    '@type': 'PostalAddress',
    streetAddress: l.streetAddress.en,
    addressLocality: l.locality.en,
    addressRegion: 'Maharashtra',
    postalCode: l.postalCode,
    addressCountry: 'IN',
  };
}

/** Shared Organization node. Referenced by @id from the other graphs. */
export function organizationSchema(): Json {
  const node: Json = {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    url: SITE_URL,
    email: site.email,
    description: site.shortDescription.en,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icon.svg`,
    },
    address: postalAddress(),
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Maharashtra, India',
    },
    knowsLanguage: ['en-IN', 'mr-IN'],
  };

  if (site.founded) node.foundingDate = site.founded;
  node.founder = { '@type': 'Person', name: site.owner.name };

  if (site.social.length > 0) {
    node.sameAs = site.social.map((entry) => entry.url);
  }

  return node;
}

/**
 * LocalBusiness node. Kept separate from Organization so the local-search
 * signals (address, area served, opening hours, telephone) are explicit.
 * `sameAs` is added only when the business supplies social profiles.
 */
export function localBusinessSchema(): Json {
  const l = site.location;

  const node: Json = {
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: site.name,
    url: SITE_URL,
    email: site.email,
    description: site.shortDescription.en,
    image: `${SITE_URL}/icon.svg`,
    address: postalAddress(),
    geo: {
      '@type': 'GeoCoordinates',
      latitude: l.geo.lat,
      longitude: l.geo.lng,
    },
    hasMap: l.mapsUrl,
    areaServed: [
      { '@type': 'AdministrativeArea', name: `${l.locality.en}, ${l.district.en}` },
      { '@type': 'AdministrativeArea', name: 'Maharashtra, India' },
    ],
    openingHoursSpecification: site.hours.specification.map((entry) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: entry.days,
      opens: entry.opens,
      closes: entry.closes,
    })),
    parentOrganization: { '@id': ORG_ID },
    knowsLanguage: ['en-IN', 'mr-IN'],
    slogan: site.tagline.en,
  };

  const tel = telHref();
  if (tel) node.telephone = `+${site.phone}`;
  if (site.founded) node.foundingDate = site.founded;
  node.founder = { '@type': 'Person', name: site.owner.name };

  if (site.social.length > 0) node.sameAs = site.social.map((entry) => entry.url);

  return node;
}

export function breadcrumbSchema(
  lang: Lang,
  trail: { name: string; path: string }[],
): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}/${lang}${item.path ? `/${item.path}` : ''}`,
    })),
  };
}

/**
 * FAQPage. Only emitted where the questions and answers are genuinely rendered
 * on the page — Google requires the content to be visible to users.
 */
export function faqSchema(lang: Lang, items: Faq[]): Json {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question[lang],
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer[lang],
      },
    })),
  };
}

/** One Service node per processing service, listing the crops it covers. */
export function servicesSchema(lang: Lang): Json[] {
  return services.map((service) => ({
    '@type': 'Service',
    name: service.name[lang],
    description: service.summary[lang],
    serviceType: service.name.en,
    provider: { '@id': ORG_ID },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Maharashtra, India',
    },
    url: `${SITE_URL}/${lang}/services/${service.slug}`,
  }));
}

/** Product nodes. No offers or prices — the business quotes on enquiry. */
export function productsSchema(lang: Lang): Json[] {
  return products.map((product) => ({
    '@type': 'Product',
    name: product.name[lang],
    description: product.summary[lang],
    category: product.category[lang],
    brand: { '@type': 'Brand', name: site.name },
    manufacturer: { '@id': ORG_ID },
    url: `${SITE_URL}/${lang}/products#${product.id}`,
  }));
}

/** Wrap one or more nodes into a single @graph document for a <script> tag. */
export function graph(nodes: Json[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes });
}

export { addressLine };
