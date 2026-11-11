import type { Dictionary } from "@/content/dictionaries/fr";
import {
  APP_STORE_URL,
  APP_URL,
  PLAY_STORE_ID,
  SITE_URL,
  SOCIALS,
} from "@/content/site";
import type { Locale } from "@/i18n/config";

type JsonLdProps = { dict: Dictionary; lang: Locale };

/**
 * Structured data (schema.org) describing both Reality products so search engines
 * understand the page: the club software (B2B), the player app (B2C) and the FAQ.
 * Rendered as a native <script>, with `<` escaped as the Next.js JSON-LD guide recommends.
 */
export function JsonLd({ dict, lang }: JsonLdProps) {
  const pageUrl = `${SITE_URL}/${lang}`;
  const org = `${SITE_URL}/#organization`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": org,
        name: "Reality Sports",
        alternateName: [
          "Reality",
          "Realitysport",
          "Reality Sports App",
          "Reality Sports Software",
          "Reality Sports Club Management",
          "Reality Sports Club Software",
          "Reality Sports Club App",
          "Reality Sports Player App",
          "Reality Sports Player Software",
          "Reality Sports",
        ],
        url: SITE_URL,
        logo: `${SITE_URL}/logo.svg`,
        sameAs: [
          APP_URL,
          "https://live.realitysport.net",
          SOCIALS.instagram,
          SOCIALS.facebook,
          SOCIALS.linkedin,
          APP_STORE_URL,
          `https://play.google.com/store/apps/details?id=${PLAY_STORE_ID}`,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Reality Sports",
        publisher: { "@id": org },
        inLanguage: ["fr", "en", "es", "ar"],
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: dict.meta.title,
        description: dict.meta.description,
        inLanguage: lang,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: [
          { "@id": `${SITE_URL}/#club-software` },
          { "@id": `${SITE_URL}/#player-app` },
        ],
        primaryImageOfPage: `${SITE_URL}/screens/${lang}/calendar.webp`,
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#club-software`,
        name: dict.app.b2bTitle,
        description: dict.app.b2bText,
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Sports club management",
        operatingSystem: "Web",
        url: pageUrl,
        image: `${SITE_URL}/screens/${lang}/dashboard.webp`,
        screenshot: [
          `${SITE_URL}/screens/${lang}/calendar.webp`,
          `${SITE_URL}/screens/${lang}/matches.webp`,
        ],
        publisher: { "@id": org },
      },
      {
        "@type": "MobileApplication",
        "@id": `${SITE_URL}/#player-app`,
        name: "Reality Sports",
        description: dict.app.b2cText,
        applicationCategory: "SportsApplication",
        operatingSystem: "iOS, Android",
        installUrl: [
          APP_STORE_URL,
          `https://play.google.com/store/apps/details?id=${PLAY_STORE_ID}`,
        ],
        publisher: { "@id": org },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        inLanguage: lang,
        mainEntity: dict.faq.items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(graph).replace(/</g, "\\u003c"),
      }}
    />
  );
}
