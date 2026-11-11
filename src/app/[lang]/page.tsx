import { notFound } from 'next/navigation';
import { AudienceSwitch } from '@/components/audience-switch';
import { JsonLd } from '@/components/json-ld';
import { Nav } from '@/components/nav';
import { Hero } from '@/components/sections/hero';
import { CourtHero } from '@/components/sections/court-hero';
import { GlassChapter } from '@/components/sections/glass-chapter';
import { SportsSection } from '@/components/sections/sports';
import { Reveals } from '@/components/reveals';
import { FeatureTour } from '@/components/sections/feature-tour';
import { Premium } from '@/components/sections/premium';
import { Comparison } from '@/components/sections/comparison';
import { Faq } from '@/components/sections/faq';
import { Cta } from '@/components/sections/cta';
import { Footer } from '@/components/sections/footer';
import { getDictionary } from '@/content/dictionaries';
import { getScreens } from '@/content/screens';
import { isLocale } from '@/i18n/config';

/**
 * The facilities' side of Reality (B2B): the club software, ending on the demo request.
 * Players have their own page at `/[lang]/players`; the switch in the hero and the nav links the two.
 */
export default async function Home({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const screens = getScreens(lang);

  return (
    <>
      <JsonLd dict={dict} lang={lang} />
      <Nav dict={dict.nav} locale={lang} audience="clubs" />
      <main>
        <CourtHero dict={dict.hero} switcher={<AudienceSwitch dict={dict.nav.audience} lang={lang} active="clubs" />} />
        <Hero dict={dict.hero} part={dict.parts.clubs} browserTitle={dict.browserTitle} screens={screens} />
        <GlassChapter dict={dict.glass} rtl={lang === 'ar'} />
        <FeatureTour dict={dict.tour} browserTitle={dict.browserTitle} screens={screens} />
        <SportsSection dict={dict.sports} />
        <Comparison dict={dict.why} showTable={dict.parts.compare} />
        <Premium dict={dict.premium} />
        {/* Pricing hidden for now. Restore with: <Pricing dict={dict.pricing} /> */}
        <Faq dict={dict.faq} />
        <Cta dict={dict.cta} />
      </main>
      <Footer dict={dict.footer} navDict={dict.nav} appDict={dict.app} lang={lang} audience="clubs" />
      <Reveals />
    </>
  );
}
