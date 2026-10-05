export const LANGS = ['en', 'mr'] as const;

export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = 'en';

/** A piece of content that exists in both site languages. */
export type L = { en: string; mr: string };

/** A list of strings in both site languages. */
export type LList = { en: string[]; mr: string[] };

export function isLang(value: string | undefined): value is Lang {
  return value === 'en' || value === 'mr';
}

/** Narrow an unknown route segment to a supported language. */
export function toLang(value: string | undefined): Lang {
  return isLang(value) ? value : DEFAULT_LANG;
}

/** Read the copy for `lang` out of a bilingual value. */
export function pick<T>(value: { en: T; mr: T }, lang: Lang): T {
  return value[lang];
}

/** Prefix an in-site path with the active language, e.g. `/mr/services`. */
export function href(lang: Lang, path = ''): string {
  const clean = path.replace(/^\/+/, '');
  return clean ? `/${lang}/${clean}` : `/${lang}`;
}

/** BCP-47 tag for the `lang` attribute and hreflang annotations. */
export const HTML_LANG: Record<Lang, string> = {
  en: 'en-IN',
  mr: 'mr-IN',
};

export const LANG_LABEL: Record<Lang, string> = {
  en: 'English',
  mr: 'मराठी',
};
