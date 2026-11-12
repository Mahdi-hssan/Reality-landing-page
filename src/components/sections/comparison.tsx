import { Check, Minus, X } from 'lucide-react';
import { Glass } from '../glass';
import { Logo } from '../logo';
import { EXCLUSIVE_ICONS } from '../feature-icons';
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

export function Comparison({ dict }: { dict: WhyDict }) {
  return (
    <section id="pourquoi" className="relative overflow-hidden bg-white py-24 sm:py-28">
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-slate-500">{dict.eyebrow}</p>
          <h2 className="text-balance mt-4 text-3xl font-medium tracking-tight sm:text-5xl rtl:leading-tight">{dict.title}</h2>
          <p className="mt-5 text-lg text-slate-600">{dict.lead}</p>
        </div>

        {/* What only Reality does: three across, then two wider, so no card gets squeezed. */}
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {dict.exclusives.map((e, i) => {
            const Icon = EXCLUSIVE_ICONS[i] ?? EXCLUSIVE_ICONS[0];
            const last = i === dict.exclusives.length - 1;
            return (
              <li
                key={e.title}
                className={`why-card group ${i < 3 ? 'lg:col-span-2' : 'lg:col-span-3'} ${last ? 'sm:col-span-2 lg:col-span-3' : ''}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-11 place-items-center rounded-2xl bg-brand/[0.08] text-brand ring-1 ring-inset ring-brand/15 transition duration-500 group-hover:bg-brand group-hover:text-white">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <span className="rounded-full border border-brand/20 bg-white px-2.5 py-0.5 text-xs font-medium text-brand">
                    {dict.exclusive}
                  </span>
                </div>
                <p className="mt-6 font-display text-lg font-medium text-slate-900">{e.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{e.text}</p>
              </li>
            );
          })}
        </ul>

        {/* The full table, open by default. */}
        <Glass
          radius={28}
          material="thin"
          subtle
          className="mt-12 overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/70 shadow-[0_30px_90px_-30px_rgba(0,61,142,0.35)]"
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
      </div>
    </section>
  );
}
