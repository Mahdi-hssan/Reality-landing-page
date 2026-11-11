import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/content/dictionaries';
import { PLAY_STORE_ID, SITE_URL } from '@/content/site';
import { directionOf, isLocale, LOCALES, OG_LOCALES } from '@/i18n/config';
import { languageAlternates } from '@/i18n/seo';
import localFont from 'next/font/local';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../globals.css';

/** Display face for headlines (Space Grotesk, OFL, bundled locally). */
const display = localFont({
  src: [
    { path: '../../fonts/space-grotesk-500.ttf', weight: '500', style: 'normal' },
    { path: '../../fonts/space-grotesk-700.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-sg',
  display: 'swap',
});

export const generateStaticParams = () => LOCALES.map((lang) => ({ lang }));

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    keywords: dict.meta.keywords,
    applicationName: 'Reality Sports',
    category: 'sports',
    creator: 'Reality Sports',
    publisher: 'Reality Sports',
    alternates: {
      canonical: `/${lang}`,
      languages: languageAlternates(),
    },
    openGraph: {
      type: 'website',
      url: `/${lang}`,
      siteName: 'Reality Sports',
      title: dict.meta.title,
      description: dict.meta.ogDescription,
      locale: OG_LOCALES[lang],
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALES[l]),
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.ogDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
    },
    // Smart App Banner on iOS Safari for the Reality Sports player app.
    itunes: { appId: '6743450293' },
    appLinks: {
      ios: { url: 'https://apps.apple.com/app/reality-sports/id6743450293', app_store_id: '6743450293', app_name: 'Reality Sports' },
      android: { package: PLAY_STORE_ID, app_name: 'Reality Sports' },
    },
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: '#050913',
  colorScheme: 'light',
};

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} dir={directionOf(lang)} data-scroll-behavior="smooth" className={`${display.variable} antialiased`}>
      {/* suppressHydrationWarning: extensions such as Grammarly add attributes to <body>. */}
      <body className="min-h-dvh font-sans" suppressHydrationWarning>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
