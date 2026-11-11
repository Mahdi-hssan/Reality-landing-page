'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Dictionary } from '@/content/dictionaries/fr';

type Props = { dict: Dictionary['app'] };

const STEP_MS = 5600;

/**
 * The Reality Sports player app, told with its four real screens. A phone shows the
 * active flow; the neighbours wait behind it in depth. The flows advance on their own
 * until the visitor picks one, and pause while hovered, focused or off-screen.
 */
export function AppFlows({ dict }: Props) {
  const flows = dict.flows;
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const swipeX = useRef<number | null>(null);

  useEffect(() => {
    const el = rootRef.current!;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) setAuto(false);
    return () => io.disconnect();
  }, []);

  const running = auto && !paused && visible;
  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % flows.length), STEP_MS);
    return () => clearTimeout(t);
  }, [running, active, flows.length]);

  const pick = (i: number) => {
    setActive(i);
    setAuto(false);
  };
  const step = (d: number) => {
    setActive((a) => (a + d + flows.length) % flows.length);
    setAuto(false);
  };

  const n = flows.length;
  const rel = (i: number) => {
    // -1 previous, 0 active, 1 next, 2 hidden (wraps around)
    const d = (i - active + n) % n;
    return d === 0 ? 0 : d === 1 ? 1 : d === n - 1 ? -1 : 2;
  };

  return (
    <div
      ref={rootRef}
      className="af grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
        e.preventDefault();
        const rtl = document.documentElement.dir === 'rtl';
        const forward = e.key === 'ArrowDown' || (e.key === 'ArrowRight') !== rtl;
        step(forward ? 1 : -1);
      }}
    >
      {/* Flow list */}
      <ol role="tablist" aria-label={dict.flowsLabel} aria-orientation="vertical" className="order-3 hidden gap-2 sm:grid lg:order-1">
        {flows.map((f, i) => {
          const on = i === active;
          return (
            <li key={f.id} role="presentation">
              <button
                type="button"
                role="tab"
                id={`flow-tab-${f.id}`}
                aria-selected={on}
                aria-controls="flow-phone"
                onClick={() => pick(i)}
                className={`af-item group relative w-full overflow-hidden rounded-2xl border px-5 py-4 text-start transition duration-500 ${
                  on ? 'border-white/20 bg-white/[0.07]' : 'border-transparent hover:bg-white/[0.04]'
                }`}
              >
                <span className="flex items-baseline gap-4">
                  <span className={`font-display text-sm font-medium tabular-nums transition ${on ? 'text-brand-light' : 'text-white/35'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <span className={`font-display text-lg font-medium transition sm:text-xl ${on ? 'text-white' : 'text-white/60 group-hover:text-white/85'}`}>
                        {f.title}
                      </span>
                      <span
                        dir="ltr"
                        className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] tracking-wide transition ${
                          on ? 'border-brand/50 bg-brand/15 text-brand-light' : 'border-white/10 text-white/40'
                        }`}
                      >
                        {f.screen}
                      </span>
                    </span>
                    <span className={`af-text grid transition-[grid-template-rows,opacity] duration-500 ${on ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <span className="overflow-hidden">
                        <span className="block pt-2 text-sm leading-relaxed text-white/70">{f.text}</span>
                      </span>
                    </span>
                  </span>
                </span>
                {/* progress line while the flows play on their own */}
                {on && auto && (
                  <span aria-hidden="true" className="absolute inset-x-5 bottom-0 h-0.5 overflow-hidden rounded-full bg-white/10">
                    <span
                      key={`${active}-${running}`}
                      className="af-progress block h-full origin-left bg-brand rtl:origin-right"
                      style={{ animationDuration: `${STEP_MS}ms`, animationPlayState: running ? 'running' : 'paused' }}
                    />
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ol>

      {/* Phone stage */}
      <div
        id="flow-phone"
        role="tabpanel"
        aria-labelledby={`flow-tab-${flows[active].id}`}
        className="af-stage order-1 lg:order-2"
        onPointerDown={(e) => (swipeX.current = e.clientX)}
        onPointerUp={(e) => {
          if (swipeX.current === null) return;
          const dx = e.clientX - swipeX.current;
          swipeX.current = null;
          if (Math.abs(dx) < 40) return;
          const rtl = document.documentElement.dir === 'rtl';
          const dir = (dx < 0) !== rtl ? 1 : -1;
          step(dir);
        }}
      >
        <div aria-hidden="true" className="af-glow" />
        {flows.map((f, i) => {
          const r = rel(i);
          return (
            <figure key={f.id} className="af-phone" data-rel={r} aria-hidden={r !== 0}>
              <div className="af-bezel">
                <div className="af-screen">
                  <img
                    src={`/screens/app/${f.id}.webp`}
                    alt={`${dict.flowAlt} : ${f.screen}`}
                    loading="lazy"
                    decoding="async"
                    width={720}
                    height={1400}
                  />
                  <span className="af-status" dir="ltr">
                    <span>9:41</span>
                    <i>
                      <b style={{ height: 4 }} />
                      <b style={{ height: 6 }} />
                      <b style={{ height: 8 }} />
                      <b style={{ height: 10 }} />
                    </i>
                  </span>
                  <span className="af-island" />
                </div>
              </div>
              <figcaption dir="ltr" className="af-caption">
                {f.screen}
              </figcaption>
            </figure>
          );
        })}
        <button type="button" className="af-arrow af-prev" aria-label={dict.prevFlow} onClick={() => step(-1)}>
          <ChevronLeft className="size-5 rtl:rotate-180" />
        </button>
        <button type="button" className="af-arrow af-next" aria-label={dict.nextFlow} onClick={() => step(1)}>
          <ChevronRight className="size-5 rtl:rotate-180" />
        </button>
        <div className="af-dots">
          {flows.map((f, i) => (
            <button key={f.id} type="button" aria-label={f.title} className={i === active ? 'on' : ''} onClick={() => pick(i)}>
              <span />
            </button>
          ))}
        </div>
      </div>

      {/* Phones: the active flow's words sit right under the phone (the list below is hidden). */}
      <div className="order-2 -mt-6 text-center sm:hidden" aria-live="polite">
        <p className="flex items-center justify-center gap-2">
          <span className="font-display text-sm font-medium text-white/55">{String(active + 1).padStart(2, '0')}</span>
          <span className="font-display text-xl font-medium">{flows[active].title}</span>
        </p>
        <p dir="ltr" className="mx-auto mt-2 w-fit rounded-full border border-brand/50 bg-brand/15 px-2.5 py-0.5 font-mono text-[11px] text-brand-light">
          {flows[active].screen}
        </p>
        <p className="mx-auto mt-3 max-w-[34ch] text-sm leading-relaxed text-white/70">{flows[active].text}</p>
      </div>
    </div>
  );
}
