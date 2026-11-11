import { Check } from 'lucide-react';
import { Glass } from '../glass';
import { FEATURED_PLAN_INDEX, PLAN_PRICE } from '@/content/site';
import type { Dictionary } from '@/content/dictionaries/fr';

export function Pricing({ dict }: { dict: Dictionary['pricing'] }) {
  return (
    <section id="tarifs" className="relative isolate overflow-hidden bg-gradient-to-br from-brand-dark via-[#0057c8] to-brand py-24 text-white sm:py-32">
      {/* Bright shapes behind the glass cards so refraction is visible. */}

      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-white/55">{dict.eyebrow}</p>
          <h2 className="text-balance mt-4 text-3xl font-medium tracking-tight sm:text-5xl rtl:leading-tight">{dict.title}</h2>
          <p className="mt-5 text-lg text-white/80">{dict.lead}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-2">
          {dict.plans.map((p, i) => {
            const featured = i === FEATURED_PLAN_INDEX;
            return (
              <Glass
                key={p.name}
                tone={featured ? 'dark' : 'light'}
                radius={32}
                className={`relative rounded-[32px] border p-8 sm:p-10 ${featured ? 'border-white/25 bg-night/55' : 'border-white/50 bg-white/20'}`}
                innerClassName="flex h-full flex-col"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-lg font-medium">{p.name}</p>
                  {featured && <span className="rounded-md bg-brand-gold px-3 py-1 text-xs font-medium text-night">{dict.featuredBadge}</span>}
                </div>
                <p className="mt-1 text-sm text-white/75">{p.pitch}</p>
                <p className="mt-8 flex flex-wrap items-baseline gap-x-2">
                  <span className="text-6xl font-medium tracking-tight">{PLAN_PRICE}</span>
                  <span className="text-lg font-semibold text-white/80">{dict.perMonth}</span>
                </p>
                <p className="mt-1 h-5 text-sm font-medium text-white/55">{p.extra}</p>

                <ul className="mt-8 flex-1 space-y-3.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[15px]">
                      <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${featured ? 'bg-brand-gold text-night' : 'bg-white text-brand'}`}>
                        <Check className="size-3" strokeWidth={3.5} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href="#demo"
                  className={`mt-10 block rounded-full px-6 py-4 text-center font-semibold transition ${
                    featured ? 'bg-brand-gold text-night hover:bg-[#e6bf6b]' : 'bg-white text-brand-dark hover:bg-brand-light'
                  }`}
                >
                  {p.cta}
                </a>
              </Glass>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-sm text-white/75">
          {dict.onlineA} <strong className="text-white">{dict.onlineB}</strong>
          {dict.onlineC}
        </p>
      </div>
    </section>
  );
}
