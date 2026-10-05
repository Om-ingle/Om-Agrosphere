import type { L } from '@/lib/i18n';

export type NavItem = { path: string; label: L };

/** Primary navigation (SRS §8.1). Order matters — it is the header and footer order. */
export const primaryNav: NavItem[] = [
  { path: '', label: { en: 'Home', mr: 'मुख्यपृष्ठ' } },
  { path: 'about', label: { en: 'About', mr: 'आमच्याविषयी' } },
  { path: 'services', label: { en: 'Services', mr: 'सेवा' } },
  { path: 'products', label: { en: 'Products', mr: 'उत्पादने' } },
  { path: 'gallery', label: { en: 'Gallery', mr: 'छायाचित्रे' } },
  { path: 'faq', label: { en: 'FAQ', mr: 'प्रश्नोत्तरे' } },
  { path: 'contact', label: { en: 'Contact', mr: 'संपर्क' } },
];

/** Highlighted in the header as the conversion action. */
export const quoteNav: NavItem = {
  path: 'quote',
  label: { en: 'Get a Quote', mr: 'दर चौकशी' },
};

/** Legal + secondary links for the footer base. */
export const legalNav: NavItem[] = [
  { path: 'privacy', label: { en: 'Privacy Policy', mr: 'गोपनीयता धोरण' } },
  { path: 'terms', label: { en: 'Terms & Conditions', mr: 'अटी व शर्ती' } },
];
