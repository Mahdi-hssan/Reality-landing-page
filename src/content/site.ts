/** Language-independent landing data. All copy lives in ./dictionaries. */

/** TODO(owner): replace with the real sales inbox before going live. */
export const CONTACT = {
  email: 'contact@reality.tn',
};

/**
 * Public site URL, used for canonical links, hreflang, the sitemap and Open Graph.
 * Production domain is about.realitysport.net (realitysport.net is the club app). Override with NEXT_PUBLIC_SITE_URL.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://about.realitysport.net').replace(/\/$/, '');

/** The club management web app itself (separate project). */
export const APP_URL = 'https://realitysport.net';

/** Official social profiles, listed in the structured data (sameAs) so Google links them to the brand. */
export const SOCIALS = {
  instagram: 'https://www.instagram.com/reality__sports/',
  facebook: 'https://www.facebook.com/p/Reality-Sports-61582669635438/',
  linkedin: 'https://www.linkedin.com/company/realitysports',
};

/** Reality Sports — the B2C player app (booking + matchmaking). Not the club software. */
export const APP_STORE_URL = 'https://apps.apple.com/app/reality-sports/id6743450293';
export const PLAY_STORE_ID = 'com.reality.reality';
export const playStoreUrl = (lang: string) => `https://play.google.com/store/apps/details?id=${PLAY_STORE_ID}&hl=${lang}`;

/** In-page links of each side: the facilities page (`/[lang]`) and the players page (`/[lang]/players`). */
export const NAV_ANCHORS = {
  clubs: [
    { href: '#fonctionnalites', key: 'features' },
    { href: '#premium', key: 'premium' },
    // Pricing is hidden for now: re-add { href: '#tarifs', key: 'pricing' } with <Pricing /> in page.tsx.
    { href: '#faq', key: 'faq' },
  ],
  players: [
    { href: '#community', key: 'community' },
    { href: '#app', key: 'theApp' },
  ],
} as const;

/**
 * One entry per row of `why.rows` in the dictionaries (same order).
 * o = best of the other platforms: 1 yes, 0.5 partial, 0 no. Source: Reality_B2B_Comparatif.pdf.
 */
export const COMPARISON_VALUES: { o: 0 | 0.5 | 1; note?: 'manual' | 'limitedRanking' }[] = [
  { o: 1 },
  { o: 1 },
  { o: 1 },
  { o: 1 },
  { o: 0.5, note: 'manual' },
  { o: 0.5, note: 'limitedRanking' },
  { o: 0 },
  { o: 0 },
  { o: 0 },
  { o: 0 },
  { o: 0 },
];

/** Premium plan is the second entry of `pricing.plans`. */
export const FEATURED_PLAN_INDEX = 1;
export const PLAN_PRICE = '150';
