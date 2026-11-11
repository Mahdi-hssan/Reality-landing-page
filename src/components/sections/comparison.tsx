import { Check, ChevronDown, Minus, Sparkles, X } from 'lucide-react';
import { Glass } from '../glass';
import { Logo } from '../logo';
import { COMPARISON_VALUES } from '@/content/site';
import type { Dictionary } from '@/content/dictionaries/fr';

type WhyDict = Dictionary['why'];

function Mark({ v, note, dict }: { v: 0 | 0.5 | 1; note?: string; dict: WhyDict }) {
  if (v === 1)
    return (
      <span className="inline-grid size-7 place-items-center rounded-full bg-brand-mint text-brand-teal" aria-label={dict.included}>
        <Check className="size-4" strokeWidth={3} />
      </span>
    );
  if (v === 0.5)
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600" aria-label={dict.partial}>
        <span className="inline-grid size-7 place-items-center rounded-full bg-amber-100">
          <Minus className="size-4" strokeWidth={3} />
        </span>
        <span className="hidden sm:inline">{note}</span>
      </span>
    );
  return (
    <span className="inline-grid size-7 place-items-center rounded-full bg-rose-50 text-rose-400" aria-label={dict.notAvailable}>
      <X className="size-4" strokeWidth={3} />
    </span>
  );
}

export function Comparison({ dict, showTable }: { dict: WhyDict; showTable: string }) {
  return (
    <section id="pourquoi" className="relative overflow-hidden bg-white py-24 sm:py-32">

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-slate-500">{dict.eyebrow}</p>
          <h2 className="text-balance mt-4 text-3xl font-medium tracking-tight sm:text-5xl rtl:leading-tight">{dict.title}</h2>
          <p className="mt-5 text-lg text-slate-600">{dict.lead}</p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {dict.exclusives.map((e) => (
            <div key={e.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-brand px-2.5 py-1 text-[11px] font-medium tracking-wider text-white">
                <Sparkles className="size-3" /> {dict.exclusive}
              </span>
              <p className="mt-4 font-medium text-slate-900">{e.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{e.text}</p>
            </div>
          ))}
        </div>

        {/* The full table stays one click away, so the section reads in one screen. */}
        <details className="group mt-10 [&_summary::-webkit-details-marker]:hidden">
          <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 rounded-full border border-brand/25 bg-white px-5 py-3 text-sm font-semibold text-brand transition hover:border-brand/50 hover:bg-brand/[0.04]">
            {showTable}
            <ChevronDown className="size-4 transition duration-300 group-open:rotate-180" />
          </summary>
        <Glass
          radius={28}
          material="thin"
          subtle
          className="mt-8 overflow-hidden rounded-[28px] border border-white/80 bg-white/60 shadow-[0_30px_90px_-30px_rgba(0,61,142,0.35)]"
        >
          <table className="w-full text-start text-sm">
            <caption className="sr-only">{dict.tableCaption}</caption>
            <thead>
              <tr className="border-b border-slate-200/70">
                <th scope="col" className="p-4 text-start font-semibold text-slate-500 sm:p-5">
                  {dict.colFeature}
                </th>
                <th scope="col" className="w-28 bg-brand/[0.07] p-4 text-center sm:w-40 sm:p-5">
                  <span className="text-brand" dir="ltr">
                    <Logo className="h-5 w-5" wordmarkClassName="text-sm text-slate-900" />
                  </span>
                </th>
                <th scope="col" className="w-28 p-4 text-center font-semibold text-slate-500 sm:w-52 sm:p-5">
                  {dict.colOthers}
                </th>
              </tr>
            </thead>
            <tbody>
              {dict.rows.map((feature, i) => {
                const value = COMPARISON_VALUES[i] ?? { o: 0 };
                return (
                  <tr key={feature} className="border-b border-slate-100 last:border-0">
                    <th scope="row" className="p-4 text-start font-medium text-slate-800 sm:p-5">
                      {feature}
                    </th>
                    <td className="bg-brand/[0.07] p-4 text-center sm:p-5">
                      <Mark v={1} dict={dict} />
                    </td>
                    <td className="p-4 text-center sm:p-5">
                      <Mark v={value.o} note={value.note ? dict.notes[value.note] : undefined} dict={dict} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Glass>
        <p className="mt-4 text-center text-xs text-slate-400">{dict.footnote}</p>
        </details>
      </div>
    </section>
  );
}
