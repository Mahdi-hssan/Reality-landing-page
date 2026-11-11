'use client';

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Dictionary } from '@/content/dictionaries/fr';

type Props = { dict: Dictionary['sports'] };

/**
 * Every sport, one schedule. PC: four night courts side by side; the one you point at
 * opens wide and lights up. Phones: the same courts as a swipeable row with arrows.
 */
export function SportsSection({ dict }: Props) {
  const [active, setActive] = useState(0);
  const rowRef = useRef<HTMLUListElement>(null);
  const n = dict.items.length;

  // Phones: scroll the row so card i is centred.
  const goTo = (i: number) => {
    const next = (i + n) % n;
    setActive(next);
    const card = rowRef.current?.children[next] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  // Phones: keep `active` in sync with manual swipes.
  const onRowScroll = () => {
    const row = rowRef.current;
    if (!row || matchMedia('(min-width: 768px)').matches) return;
    // On-screen positions work the same in left-to-right and right-to-left.
    const r = row.getBoundingClientRect();
    const mid = r.left + r.width / 2;
    let best = 0;
    let dist = Infinity;
    [...row.children].forEach((c, i) => {
      const b = (c as HTMLElement).getBoundingClientRect();
      const d = Math.abs(b.left + b.width / 2 - mid);
      if (d < dist) {
        dist = d;
        best = i;
      }
    });
    if (best !== active) setActive(best);
  };

  return (
    <section id="sports" aria-labelledby="sports-title" className="sp relative overflow-hidden bg-[#03060d] py-24 text-white sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(1100px,90vw)] -translate-x-1/2 bg-white/10" />
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-white/55">{dict.eyebrow}</p>
          <h2 id="sports-title" className="text-balance mt-4 font-display text-4xl font-medium tracking-tight sm:text-6xl rtl:leading-tight">
            {dict.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg">{dict.lead}</p>
        </div>

        <ul ref={rowRef} onScroll={onRowScroll} className="sp-row mt-14">
          {dict.items.map((s, i) => {
            const on = i === active;
            return (
              <li
                key={s.id}
                className="sp-card"
                data-on={on}
                tabIndex={0}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <img src={`/images/sports/${s.id}.webp`} alt="" loading="lazy" decoding="async" width={1280} height={720} />
                <span aria-hidden="true" className="sp-shade" />
                <span className="sp-num font-display" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="sp-body">
                  <h3 className="font-display text-2xl font-medium sm:text-3xl">{s.name}</h3>
                  <p className="sp-line mt-2 max-w-[30ch] text-sm leading-relaxed text-white/80 sm:text-base">{s.line}</p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Phone controls */}
        <div className="mt-6 flex items-center justify-center gap-4 md:hidden">
          <button type="button" onClick={() => goTo(active - 1)} aria-label={dict.prev} className="sp-arrow">
            <ChevronLeft className="size-5 rtl:rotate-180" />
          </button>
          <div className="flex gap-1.5" aria-hidden="true">
            {dict.items.map((s, i) => (
              <span key={s.id} className={`h-1.5 rounded-full transition-colors duration-500 ${i === active ? 'w-6 bg-brand' : 'w-1.5 bg-white/25'}`} />
            ))}
          </div>
          <button type="button" onClick={() => goTo(active + 1)} aria-label={dict.next} className="sp-arrow">
            <ChevronRight className="size-5 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </section>
  );
}
