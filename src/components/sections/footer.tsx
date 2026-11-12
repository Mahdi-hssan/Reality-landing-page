import { ArrowUp, Mail } from "lucide-react";
import { Logo } from "../logo";
import { Copyright } from "../copyright";
import { SocialLinks } from "../social-links";
import { StoreButtons } from "../store-buttons";
import { APP_STORE_URL, CONTACT, playStoreUrl } from "@/content/site";
import type { Dictionary } from "@/content/dictionaries/fr";

type FooterProps = {
  dict: Dictionary["footer"];
  navDict: Dictionary["nav"];
  appDict: Dictionary["app"];
  lang: string;
  audience?: "clubs" | "players";
};

const linkClass =
  "inline-flex min-h-9 items-center text-[15px] text-white/60 transition-colors duration-300 hover:text-white";

export function Footer({ dict, navDict, appDict, lang }: FooterProps) {
  const columns = [
    {
      title: dict.colProduct,
      links: [
        { href: "#fonctionnalites", label: navDict.links.features },
        { href: "#premium", label: navDict.links.premium },
        { href: "#pourquoi", label: navDict.links.why },
      ],
    },
    {
      title: dict.colPlayers,
      links: [
        { href: "#app", label: navDict.links.app },
        { href: APP_STORE_URL, label: "App Store", external: true },
        { href: playStoreUrl(lang), label: "Google Play", external: true },
      ],
    },
    {
      title: dict.colHelp,
      links: [
        { href: "#faq", label: navDict.links.faq },
        { href: "#demo", label: navDict.demo },
      ],
    },
  ];

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[#03060d] text-white">

      <div className="mx-auto max-w-6xl px-6 pb-10 pt-16 sm:pt-20">
        {/* Row 1: brand + app */}
        <div className="flex flex-col items-center gap-10 text-center lg:flex-row lg:items-end lg:justify-between lg:text-start">
          <div className="flex max-w-sm flex-col items-center lg:items-start">
            <Logo
              className="h-9 w-9 text-brand"
              wordmarkClassName="text-2xl text-white"
            />
            <p className="mt-4 text-base leading-relaxed text-white/65">
              {dict.tagline}
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white/80 transition hover:border-white/30 hover:text-white"
            >
              <Mail className="size-4 text-white/55" />
              <span dir="ltr">{CONTACT.email}</span>
            </a>
            <SocialLinks className="mt-4" />
          </div>
          <div className="flex flex-col items-center lg:items-end">
            <p className="text-xs font-semibold text-white/40">
              {appDict.b2cTitle}
            </p>
            <StoreButtons
              lang={lang}
              appStoreSmall={appDict.appStoreSmall}
              playStoreSmall={appDict.playStoreSmall}
              className="mt-3 justify-center lg:justify-end"
            />
          </div>
        </div>

        <div className="my-12 h-px bg-white/10" />

        {/* Row 2: link columns */}
        <div>
        <nav
          aria-label={dict.nav}
          className="grid grid-cols-2 gap-x-6 gap-y-10 text-center sm:grid-cols-3 sm:text-start"
        >
          {columns.map((col, i) => (
            <div
              key={col.title}
              className={i === 2 ? "col-span-2 sm:col-span-1" : undefined}
            >
              <p className="font-display text-sm font-medium text-white">
                {col.title}
              </p>
              <ul className="mt-4 grid gap-1">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className={linkClass}
                      {...("external" in l && l.external
                        ? { target: "_blank", rel: "noopener" }
                        : {})}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        </div>

        {/* Row 3: legal + back to top */}
        <div className="mt-14 flex flex-col-reverse items-center gap-5 border-t border-white/10 pt-8 text-center sm:flex-row sm:justify-between sm:text-start">
          <div className="text-xs leading-relaxed text-white/40">
            <Copyright text={dict.rights} />
          </div>
          <a
            href="#top"
            className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm text-white/70 transition hover:border-white/30 hover:text-white"
          >
            {dict.backToTop}
            <ArrowUp className="size-4 transition group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

    </footer>
  );
}
