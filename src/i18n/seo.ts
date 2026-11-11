import { SITE_URL } from '@/content/site';
import { DEFAULT_LOCALE, LOCALES } from './config';

/**
 * hreflang map shared by <head> and the sitemap: every language points at every other.
 * `path` is the page under the language segment ('' for the home page, '/players' for the players page).
 */
export const languageAlternates = (path = ''): Record<string, string> => ({
  ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}/${l}${path}`])),
  'x-default': `${SITE_URL}/${DEFAULT_LOCALE}${path}`,
});
