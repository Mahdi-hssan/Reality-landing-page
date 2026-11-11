import { Plus } from 'lucide-react';
import type { Dictionary } from '@/content/dictionaries/fr';

export function Faq({ dict }: { dict: Dictionary['faq'] }) {
  return (
    <section id="faq" className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="max-sm:text-center">
          <p className="text-sm font-medium text-slate-500">{dict.eyebrow}</p>
          <h2 className="text-balance mt-4 text-3xl font-medium tracking-tight sm:text-5xl rtl:leading-tight">{dict.title}</h2>
          <p className="mt-5 text-lg text-slate-600">{dict.lead}</p>
        </div>
        <div className="divide-y divide-slate-100 rounded-3xl border border-slate-100">
          {dict.items.map((f) => (
            <details key={f.q} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-start font-semibold text-slate-900">
                {f.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-50 text-brand transition group-open:rotate-45">
                  <Plus className="size-4" />
                </span>
              </summary>
              <p className="mt-4 leading-relaxed text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
