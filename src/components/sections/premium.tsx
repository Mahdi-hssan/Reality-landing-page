import Image from 'next/image';
import { Camera, Radio, ScanEye, Share2 } from 'lucide-react';
import { Glass } from '../glass';
import type { Dictionary } from '@/content/dictionaries/fr';
import pitch from '../../../public/images/pitch-night.webp';

const ICONS = [Camera, ScanEye, Radio, Share2];

export function Premium({ dict }: { dict: Dictionary['premium'] }) {
  return (
    <section id="premium" className="relative isolate overflow-hidden bg-night py-24 text-white sm:py-32">
      <Image src={pitch} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night via-night/40 to-night" />

      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl max-sm:text-center">
          <p className="text-sm font-medium text-white/55">{dict.eyebrow}</p>
          <h2 className="text-balance mt-4 text-3xl font-medium tracking-tight sm:text-5xl rtl:leading-tight">{dict.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">{dict.lead}</p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dict.items.map(({ title, text }, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Glass key={title} tone="dark" radius={24} className="rounded-3xl border border-white/15 bg-night/30 p-6">
                <span className="grid size-12 place-items-center rounded-2xl bg-white/[0.06] text-white/70">
                  <Icon className="size-6" />
                </span>
                <p className="mt-5 text-lg font-medium">{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{text}</p>
              </Glass>
            );
          })}
        </div>

        <p className="mt-10 text-sm text-white/55">{dict.note}</p>
      </div>
    </section>
  );
}
