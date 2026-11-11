import { CalendarCheck2, TrendingUp, Users } from 'lucide-react';
import { Glass } from '../glass';
import { BrowserFrame } from '../browser-frame';
import { PhoneFrame } from '../phone-frame';
import { PartHead } from '../part-head';
import type { Dictionary } from '@/content/dictionaries/fr';
import type { ScreenSet } from '@/content/screens';

type HeroProps = { dict: Dictionary['hero']; part: Dictionary['parts']['clubs']; browserTitle: string; screens: ScreenSet };

/** Opens part one (for facilities): the chapter title, then the club workspace itself. */
export function Hero({ dict, part, browserTitle, screens }: HeroProps) {
  return (
    <section id="clubs" aria-labelledby="clubs-title" className="relative z-10 scroll-mt-4 bg-night pb-24 pt-6 text-white sm:pb-32">
      {/* Fade that rises over the last part of the pinned court, so the hand-off has no seam. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-[38vh] h-[38vh] bg-gradient-to-b from-night/0 to-night" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      </div>

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="reveal-rise mx-auto max-w-3xl pt-10 text-center">
          <PartHead label={part.label} />
          <h2 id="clubs-title" className="text-balance mt-6 font-display text-4xl font-medium tracking-tight sm:text-6xl rtl:leading-tight">
            {part.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{part.lead}</p>
        </div>

        {/* Product shot */}
        <div className="reveal-rise relative mt-16 sm:mt-20">
          <BrowserFrame src={screens.calendar} alt={dict.shotAlt} url={browserTitle} priority />

          <Glass
            tone="dark"
            radius={20}
            jiggle
            className="absolute -start-3 -top-8 hidden rounded-[20px] border border-white/20 bg-night/40 px-5 py-4 sm:block lg:-start-10"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-brand-teal/20 text-brand-mint">
                <TrendingUp className="size-5" />
              </span>
              <div>
                <p className="text-2xl font-medium leading-none" dir="ltr">
                  {dict.statGrowth}
                </p>
                <p className="mt-1 text-xs text-white/70">{dict.statGrowthLabel}</p>
              </div>
            </div>
          </Glass>

          <Glass
            tone="dark"
            radius={20}
            className="absolute -bottom-10 start-6 hidden rounded-[20px] border border-white/20 bg-night/40 px-5 py-4 md:block lg:start-24"
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-white/[0.06] text-white/70">
                  <CalendarCheck2 className="size-5" />
                </span>
                <div>
                  <p className="text-xl font-medium leading-none">{dict.statBookings}</p>
                  <p className="mt-1 text-xs text-white/70">{dict.statBookingsLabel}</p>
                </div>
              </div>
              <div className="h-10 w-px bg-white/15" />
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-white/[0.06] text-white/70">
                  <Users className="size-5" />
                </span>
                <div>
                  <p className="text-xl font-medium leading-none" dir="ltr">
                    {dict.statReturn}
                  </p>
                  <p className="mt-1 text-xs text-white/70">{dict.statReturnLabel}</p>
                </div>
              </div>
            </div>
          </Glass>

          <div className="absolute -bottom-16 -end-2 hidden w-[210px] lg:block xl:-end-12 xl:w-[240px]">
            <PhoneFrame src={screens.mobileDashboard} alt={dict.phoneAlt} />
          </div>
        </div>
      </div>
    </section>
  );
}
