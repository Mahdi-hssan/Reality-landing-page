import { Check, X } from 'lucide-react';
import type { Dictionary } from '@/content/dictionaries/fr';

export function Pains({ dict }: { dict: Dictionary['pains'] }) {
  return (
    <section className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4">
        {/* The sports strip that used to sit here is now its own section (SportsSection). */}
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="max-sm:text-center">
            <p className="text-sm font-medium text-slate-500">{dict.eyebrow}</p>
            <h2 className="text-balance mt-4 text-3xl font-medium tracking-tight sm:text-5xl rtl:leading-tight">{dict.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">{dict.lead}</p>
          </div>

          <ul className="grid gap-3">
            {dict.items.map((p) => (
              <li key={p.after} className="grid gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 sm:grid-cols-2 sm:items-center">
                <p className="flex items-start gap-3 text-sm text-slate-500">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-rose-100 text-rose-500">
                    <X className="size-3" strokeWidth={3} />
                  </span>
                  <span className="line-through decoration-slate-300">{p.before}</span>
                </p>
                <p className="flex items-start gap-3 text-sm font-semibold text-slate-900">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-mint text-brand-teal">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {p.after}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <dl className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-slate-100 lg:grid-cols-3">
          {dict.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse justify-end bg-white p-6 sm:p-8">
              <dt className="mt-2 text-sm text-slate-500">{s.label}</dt>
              <dd className="text-2xl font-medium tracking-tight text-brand sm:text-3xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
