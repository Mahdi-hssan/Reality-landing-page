export const LOCALES = ['fr', 'en', 'es', 'ar'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const RTL_LOCALES: ReadonlySet<Locale> = new Set(['ar']);

/** Each language is named in itself, so visitors recognise their own. */
export const LOCALE_LABELS: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
  ar: 'العربية',
};

export const OG_LOCALES: Record<Locale, string> = {
  fr: 'fr_FR',
  en: 'en_US',
  es: 'es_ES',
  ar: 'ar_TN',
};

export const isLocale = (value: string): value is Locale => (LOCALES as readonly string[]).includes(value);

export const directionOf = (locale: Locale) => (RTL_LOCALES.has(locale) ? 'rtl' : 'ltr');
