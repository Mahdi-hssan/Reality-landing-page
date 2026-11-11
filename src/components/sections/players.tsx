import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Globe,
  MapPin,
  Plus,
  Sparkles,
  UserPlus,
  Users,
} from "lucide-react";
import { Glass } from "../glass";
import { AppFlows } from "../app-flows";
import { audienceHref } from "../audience-switch";
import { StoreButtons } from "../store-buttons";
import type { Dictionary } from "@/content/dictionaries/fr";
import type { Locale } from "@/i18n/config";
import player from "../../../public/images/hero-player.webp";
import courts from "../../../public/images/sports/all.webp";

type Community = Dictionary["community"];
type App = Dictionary["app"];

const PILLAR_ICONS = [Sparkles, Users, UserPlus, Globe];

/** Demo players for the illustrated open match (not real people). */
const SQUAD = [
  { initials: "SK", level: "3.5", tint: "from-brand to-brand-dark" },
  { initials: "AM", level: "3.5", tint: "from-brand-teal to-emerald-800" },
  { initials: "LB", level: "4.0", tint: "from-brand-gold to-amber-700" },
];

const eyebrowClass = "text-sm font-medium text-white/55";

/* -------------------------------------------------------------------------- */

type HeroProps = {
  part: Dictionary["parts"]["players"];
  dict: Community;
  app: App;
  lang: Locale;
  /** The Facilities | Players switch, so the choice is the first thing on screen. */
  switcher: ReactNode;
};

/** First screen of the players page: the community claim, the stores, and a match one spot short. */
export function PlayersHero({ part, dict, app, lang, switcher }: HeroProps) {
  return (
    <section
      id="top"
      aria-labelledby="players-title"
      className="ph relative isolate flex min-h-dvh items-end overflow-hidden bg-night text-white lg:items-center"
    >
      {/* Night court photo: full bleed on phones, the far half of the screen on desktop. */}
      <div
        aria-hidden="true"
        className="ph-photo absolute inset-0 -z-10 lg:start-auto lg:w-[56%]"
      >
        <Image
          src={player}
          alt=""
          fill
          priority
          placeholder="blur"
          sizes="(min-width: 1024px) 56vw, 100vw"
          className="object-cover object-[50%_18%] rtl:-scale-x-100"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/80 to-night/20 lg:bg-gradient-to-r lg:from-night lg:via-night/55 lg:to-transparent lg:rtl:bg-gradient-to-l"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-night to-transparent"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-5 pb-14 pt-28 sm:px-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pb-20 lg:pt-32">
        <div className="ph-rise flex flex-col items-center text-center lg:items-start lg:text-start">
          {switcher}
          <p className={`${eyebrowClass} mt-7 inline-flex items-center gap-2`}>
            {app.playersEyebrow}
          </p>
          <h1 id="players-title" className="mt-5 font-display tracking-tight">
            <span className="text-balance block text-xl font-medium text-white/70 sm:text-3xl rtl:leading-snug">
              {part.titleA}
            </span>
            <span className="mt-2 block bg-gradient-to-b from-white to-brand-light bg-clip-text pb-2 text-[2.85rem] font-medium leading-[1.05] text-transparent sm:text-7xl lg:text-[4.25rem] rtl:leading-[1.3]">
              {part.titleB}
            </span>
          </h1>
          <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-white/75 sm:text-lg">
            {part.lead}
          </p>
          <StoreButtons
            lang={lang}
            appStoreSmall={app.appStoreSmall}
            playStoreSmall={app.playStoreSmall}
            className="mt-8 justify-center lg:justify-start"
          />
        </div>

        {/* A match waiting for its fourth player, floating over the photo (desktop). */}
        <div className="ph-rise hidden translate-y-20 justify-end self-end [animation-delay:0.25s] lg:flex">
          <div className="animate-float-slow w-full max-w-[320px]">
            <MatchCard dict={dict} app={app} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/** An illustrated open match: three players in, one spot left, a Join button. */
function MatchCard({ dict, app }: { dict: Community; app: App }) {
  return (
    <div role="img" aria-label={dict.mock.alt} className="relative">
      <div aria-hidden="true" className="absolute -inset-6 -z-10 rounded-full bg-brand/25 blur-[70px]" />
      <div
        aria-hidden="true"
        className="rounded-[28px] border border-white/15 bg-night/55 p-6 shadow-[0_40px_90px_-30px_rgba(0,122,255,0.55)] backdrop-blur-xl"
      >
        <div className="flex items-center justify-between gap-3 text-xs">
          <span className="inline-flex items-center gap-2 rounded-md bg-brand-teal/15 px-2.5 py-1 font-semibold text-brand-mint">
            {dict.mock.title}
          </span>
          <span className="flex items-center gap-1.5 text-white/60">
            {app.mockToday}
            <span dir="ltr">18:30</span>
          </span>
        </div>
        <p className="mt-5 font-display text-2xl font-medium">
          {app.mockSports[0]}
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-white/60">
          <MapPin className="size-3.5 shrink-0" />{" "}
          <span dir="ltr">Padel Club Lac</span>
        </p>

        <div className="mt-6 grid grid-cols-4 gap-2">
          {SQUAD.map((p) => (
            <div key={p.initials} className="flex flex-col items-center gap-2">
              <span
                className={`grid size-14 place-items-center rounded-full bg-gradient-to-br ${p.tint} text-sm font-medium ring-2 ring-white/20`}
                dir="ltr"
              >
                {p.initials}
              </span>
              <span
                className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-semibold text-white/75"
                dir="ltr"
              >
                {p.level}
              </span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-2">
            <span className="relative grid size-14 place-items-center rounded-full border-2 border-dashed border-brand-light/70 text-brand-light">
              <span className="absolute inset-0 animate-ping rounded-full border border-brand-light/50 [animation-duration:2.4s] motion-reduce:animate-none" />
              <Plus className="size-5" />
            </span>
            <span className="rounded-md bg-brand px-2 py-0.5 text-[11px] font-medium">
              {dict.mock.you}
            </span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
          <span className="text-sm text-white/70">{dict.mock.spot}</span>
          <span className="rounded-xl bg-brand px-4 py-1.5 text-sm font-medium">
            {app.mockJoin}
          </span>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/** Why it is a community and not a booking tool: four reasons, all about people. */
export function PlayersCommunity({ dict, app }: { dict: Community; app: App }) {
  return (
    <section
      id="community"
      aria-labelledby="community-title"
      className="relative overflow-hidden bg-night py-24 text-white sm:py-32"
    >
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="reveal-rise mx-auto max-w-3xl text-center">
          <p className={eyebrowClass}>{dict.eyebrow}</p>
          <h2
            id="community-title"
            className="text-balance mt-4 font-display text-4xl font-medium tracking-tight sm:text-6xl rtl:leading-tight"
          >
            {dict.title}
          </h2>
        </div>

        {/* Phones meet the open match here (on desktop it floats in the hero). */}
        <div className="reveal-rise mx-auto mt-12 max-w-sm lg:hidden">
          <MatchCard dict={dict} app={app} />
        </div>

        <ul className="reveal-rise mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {dict.pillars.map(({ title, text }, i) => {
            const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length];
            return (
              <li key={title}>
                <Glass
                  tone="dark"
                  radius={24}
                  subtle
                  className="h-full rounded-3xl border border-white/12 bg-white/[0.04] p-6"
                >
                  <span className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-2xl bg-brand/20 text-brand-light">
                      <Icon className="size-5" />
                    </span>
                    <span
                      dir="ltr"
                      aria-hidden="true"
                      className="font-display text-sm font-medium tabular-nums text-white/25"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <h3 className="mt-5 font-display text-lg font-medium">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {text}
                  </p>
                </Glass>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/** Each feature of the app on its real screen. */
export function PlayersApp({ dict, app }: { dict: Community; app: App }) {
  return (
    <section
      id="app"
      aria-labelledby="app-title"
      className="relative overflow-hidden bg-[#03060d] py-24 text-white sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(1100px,90vw)] -translate-x-1/2 bg-white/10"
      />

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className={eyebrowClass}>{dict.flowsEyebrow}</p>
          <h2
            id="app-title"
            className="text-balance mt-4 font-display text-3xl font-medium tracking-tight sm:text-5xl rtl:leading-tight"
          >
            {dict.flowsTitle}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            {app.playersLead}
          </p>
        </div>
        <div className="mt-14">
          <AppFlows dict={app} />
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/** The close: download the app. Facility owners who landed here get a door back to their side. */
export function PlayersDownload({
  dict,
  app,
  lang,
}: {
  dict: Community;
  app: App;
  lang: Locale;
}) {
  return (
    <section
      id="download"
      className="relative isolate overflow-hidden bg-night px-4 py-24 text-white sm:py-32"
    >
      <Image
        src={courts}
        alt=""
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-80"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#03060d] via-night/25 to-night" />

      <Glass
        tone="dark"
        radius={36}
        className="mx-auto max-w-4xl rounded-[36px] border border-white/20 bg-night/40 p-8 text-center sm:p-14"
        innerClassName="flex flex-col items-center"
      >
        <p className={eyebrowClass}>{app.playersEyebrow}</p>
        <h2 className="text-balance mt-4 font-display text-4xl font-medium tracking-tight sm:text-6xl rtl:leading-tight">
          {dict.downloadTitle}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-white/75">
          {app.playersTitle}
        </p>
        <StoreButtons
          lang={lang}
          appStoreSmall={app.appStoreSmall}
          playStoreSmall={app.playStoreSmall}
          className="mt-9 justify-center"
        />
      </Glass>

      <Link
        href={audienceHref(lang, "clubs")}
        className="group mx-auto mt-6 flex max-w-4xl flex-col items-center gap-4 rounded-[28px] border border-white/12 bg-night/60 p-5 text-center transition duration-500 ease-(--ease-out-soft) hover:border-white/30 sm:flex-row sm:p-6 sm:text-start"
      >
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand/20 text-brand-light">
          <Building2 className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-lg font-medium">
            {dict.clubsBand.title}
          </span>
          <span className="mt-1 block text-sm leading-relaxed text-white/65">
            {dict.clubsBand.text}
          </span>
        </span>
        <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-white transition-colors group-hover:text-white/70">
          {dict.clubsBand.cta}
          <ArrowRight className="size-4 transition group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
        </span>
      </Link>
    </section>
  );
}
