import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AudienceSwitch } from '@/components/audience-switch';
import { Nav } from '@/components/nav';
import { Reveals } from '@/components/reveals';
import { Footer } from '@/components/sections/footer';
import { PlayersApp, PlayersCommunity, PlayersDownload, PlayersHero } from '@/components/sections/players';
import { getDictionary } from '@/content/dictionaries';
import { isLocale } from '@/i18n/config';
import { languageAlternates } from '@/i18n/seo';

export async function generateMetadata({ params }: PageProps<'/[lang]/players'>): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { playersMeta } = await getDictionary(lang);
  const url = `/${lang}/players`;

  return {
    title: playersMeta.title,
    description: playersMeta.description,
    alternates: { canonical: url, languages: languageAlternates('/players') },
    openGraph: { url, title: playersMeta.title, description: playersMeta.description },
    twitter: { title: playersMeta.title, description: playersMeta.description },
  };
}

/** The players' side of Reality (B2C): the Reality Sports app and its community. */
export default async function PlayersPage({ params }: PageProps<'/[lang]/players'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <>
      <Nav dict={dict.nav} locale={lang} audience="players" />
      <main>
        <PlayersHero
          part={dict.parts.players}
          dict={dict.community}
          app={dict.app}
          lang={lang}
          switcher={<AudienceSwitch dict={dict.nav.audience} lang={lang} active="players" />}
        />
        <PlayersCommunity dict={dict.community} app={dict.app} />
        <PlayersApp dict={dict.community} app={dict.app} />
        <PlayersDownload dict={dict.community} app={dict.app} lang={lang} />
      </main>
      <Footer dict={dict.footer} navDict={dict.nav} appDict={dict.app} lang={lang} audience="players" />
      <Reveals />
    </>
  );
}
