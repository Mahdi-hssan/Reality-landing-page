import 'server-only';
import type { Locale } from '@/i18n/config';
import type { Dictionary } from './fr';

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  fr: () => import('./fr').then((m) => m.default),
  en: () => import('./en').then((m) => m.default),
  es: () => import('./es').then((m) => m.default),
  ar: () => import('./ar').then((m) => m.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();

export type { Dictionary };
