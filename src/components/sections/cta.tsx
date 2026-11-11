import Image from 'next/image';
import { ArrowRight, Mail } from 'lucide-react';
import { Glass } from '../glass';
import { CONTACT } from '@/content/site';
import type { Dictionary } from '@/content/dictionaries/fr';
import player from '../../../public/images/hero-player.webp';

export function Cta({ dict }: { dict: Dictionary['cta'] }) {
  const mailto = `mailto:${CONTACT.email}?subject=${encodeURIComponent(dict.mailSubject)}&body=${encodeURIComponent(dict.mailBody)}`;

  return (
    <section id="demo" className="relative isolate overflow-hidden bg-night px-4 py-24 text-white sm:py-32">
      <Image src={player} alt="" fill sizes="100vw" className="-z-10 object-cover object-[70%_30%] opacity-50 rtl:-scale-x-100" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/80 to-night/50 rtl:bg-gradient-to-l" />

      <Glass tone="dark" radius={36} className="mx-auto max-w-4xl rounded-[36px] border border-white/20 bg-night/35 p-8 text-center sm:p-14">
        <h2 className="text-balance text-3xl font-medium tracking-tight sm:text-5xl rtl:leading-tight">{dict.title}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/75">{dict.lead}</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={mailto}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-8 py-4 font-semibold transition hover:bg-[#1a86ff]"
          >
            {dict.primary}
            <ArrowRight className="size-4 transition group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/16 bg-white/5 px-8 py-4 font-semibold transition hover:bg-white/10"
          >
            <Mail className="size-4" />
            <span dir="ltr">{CONTACT.email}</span>
          </a>
        </div>
        <p className="mt-6 text-sm text-white/50">{dict.footnote}</p>
      </Glass>
    </section>
  );
}
