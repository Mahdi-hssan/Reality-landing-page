import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/site';
import { DEFAULT_LOCALE, LOCALES } from '@/i18n/config';
import { languageAlternates } from '@/i18n/seo';

/**
 * Two pages per language (facilities at `/{lang}`, players at `/{lang}/players`),
 * each listing all its alternates so Google serves the right language.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-11-10');

  return LOCALES.flatMap((lang) => [
    {
      url: `${SITE_URL}/${lang}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: lang === DEFAULT_LOCALE ? 1 : 0.9,
      alternates: { languages: languageAlternates() },
      images: [`${SITE_URL}/screens/${lang}/calendar.webp`, `${SITE_URL}/screens/${lang}/dashboard.webp`],
    },
    {
      url: `${SITE_URL}/${lang}/players`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: lang === DEFAULT_LOCALE ? 0.9 : 0.8,
      alternates: { languages: languageAlternates('/players') },
      images: [`${SITE_URL}/screens/app/join-events.webp`, `${SITE_URL}/screens/app/booking.webp`],
    },
  ]);
}
