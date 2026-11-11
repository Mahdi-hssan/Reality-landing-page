import { ArrowRight, Building2, Smartphone } from 'lucide-react';
import { Glass } from '../glass';
import { AppFlows } from '../app-flows';
import { StoreButtons } from '../store-buttons';
import type { Dictionary } from '@/content/dictionaries/fr';
import type { Locale } from '@/i18n/config';


type AppSectionProps = { dict: Dictionary['app']; lang: Locale };

/**
 * Explains the two sides of Reality: the club software (B2B, shown everywhere above)
 * and the Reality Sports player app (B2C, downloadable from the stores).
 */
export function AppSection({ dict, lang }: AppSectionProps) {
  return (
    <section id="app" aria-labelledby="app-title" className="relative overflow-hidden bg-night py-24 text-white sm:py-32">

      <div className="relative mx-auto max-w-6xl px-4">
        {/* Two products */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-white/55">{dict.eyebrow}</p>
          <h2 id="app-title" className="text-balance mt-4 text-3xl font-medium tracking-tight sm:text-5xl rtl:leading-tight">
            {dict.title}
          </h2>
          <p className="mt-5 text-lg text-white/70">{dict.lead}</p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Glass tone="dark" radius={28} subtle className="rounded-[28px] border border-white/15 bg-white/[0.04] p-7" innerClassName="flex h-full flex-col">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
              <Building2 className="size-3.5" /> {dict.b2bTag}
            </span>
            <h3 className="mt-5 text-2xl font-medium">{dict.b2bTitle}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-white/70">{dict.b2bText}</p>
            <a href="#demo" className="group mt-6 inline-flex w-fit items-center gap-2 font-medium text-white hover:text-white/70">
              {dict.b2bCta}
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5 rtl:rotate-180" />
            </a>
          </Glass>
          <Glass
            tone="dark"
            radius={28}
            subtle
            className="rounded-[28px] border border-brand/40 bg-brand/10 p-7"
            innerClassName="flex h-full flex-col"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-md bg-brand px-3 py-1 text-xs font-medium text-white">
              <Smartphone className="size-3.5" /> {dict.b2cTag}
            </span>
            <h3 className="mt-5 text-2xl font-medium">{dict.b2cTitle}</h3>
            <p className="mt-3 flex-1 leading-relaxed text-white/70">{dict.b2cText}</p>
            <a href="#app-download" className="group mt-6 inline-flex w-fit items-center gap-2 font-medium text-white hover:text-white/70">
              {dict.b2cCta}
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5 rtl:rotate-180" />
            </a>
          </Glass>
        </div>

        {/* The player app */}
        <div id="app-download" className="mt-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-medium text-white/55">{dict.playersEyebrow}</p>
            <h3 className="text-balance mt-4 font-display text-3xl font-medium tracking-tight sm:text-5xl rtl:leading-tight">{dict.playersTitle}</h3>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">{dict.playersLead}</p>
          </div>

          <div className="mt-14">
            <AppFlows dict={dict} />
          </div>

          <div className="mt-14 flex flex-col items-center text-center">
            <StoreButtons lang={lang} appStoreSmall={dict.appStoreSmall} playStoreSmall={dict.playStoreSmall} className="justify-center" />
            <p className="mt-4 max-w-md text-sm text-white/50">{dict.storeNote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
