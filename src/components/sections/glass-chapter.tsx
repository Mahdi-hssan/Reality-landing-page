'use client';

import { useEffect, useRef } from 'react';
import type { Dictionary } from '@/content/dictionaries/fr';
import type { GlassController } from '../glass/engine';

type Props = { dict: Dictionary['glass']; rtl: boolean };

const smoothstep = (p: number, a: number, b: number) => {
  const t = Math.min(1, Math.max(0, (p - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/**
 * "Four tools → one system": the Reality mark in real refractive glass. It starts as four
 * scattered fragments (Excel, WhatsApp, paper, cash box) and assembles as you scroll.
 */
export function GlassChapter({ dict, rtl }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const stage = stageRef.current!;
    const canvas = canvasRef.current!;
    const labels = [...stage.querySelectorAll<HTMLElement>('.gc-tool')];
    const before = stage.querySelector<HTMLElement>('.gc-before')!;
    const after = stage.querySelector<HTMLElement>('.gc-after')!;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');

    let ctrl: GlassController | null = null;
    let disposed = false;
    let onScreen = false;
    let raf: number | null = null;
    let shown = 0;
    let target = 0;
    let last = 0;
    let lastInput = performance.now();
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const cache = { b: '', a: '', l: '' };

    const progress = () => {
      const r = section.getBoundingClientRect();
      const range = r.height - innerHeight;
      return range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0;
    };

    const writeText = (p: number) => {
      const b = reduce.matches ? 0 : 1 - smoothstep(p, 0.3, 0.42);
      const a = reduce.matches ? 1 : smoothstep(p, 0.6, 0.72);
      const l = reduce.matches ? 0 : (1 - smoothstep(p, 0.32, 0.46)) * smoothstep(p, 0.02, 0.1);
      const bs = b.toFixed(3);
      const as = a.toFixed(3);
      const ls = l.toFixed(3);
      if (bs !== cache.b) {
        cache.b = bs;
        before.style.setProperty('--o', bs);
      }
      if (as !== cache.a) {
        cache.a = as;
        after.style.setProperty('--o', as);
        after.toggleAttribute('inert', a < 0.5);
      }
      if (ls !== cache.l) cache.l = ls;
      return l;
    };

    const tick = (now: number) => {
      raf = null;
      if (!onScreen || document.hidden || disposed) return;
      const dt = Math.min(100, now - (last || now));
      last = now;
      shown += (target - shown) * (1 - Math.pow(1 - 0.07, dt / 16.667));
      if (Math.abs(target - shown) < 0.0003) shown = target;
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      const p = reduce.matches ? 1 : shown;
      const l = writeText(p);
      if (ctrl) {
        ctrl.frame(p, Math.abs(target - shown), mouse);
        // tool labels ride their fragments
        const pts = l > 0.01 ? ctrl.fragmentScreen() : [];
        labels.forEach((el, i) => {
          const pt = pts[i];
          el.style.opacity = pt ? String(l) : '0';
          if (pt) el.style.transform = `translate3d(${pt.x.toFixed(1)}px, ${pt.y.toFixed(1)}px, 0) translate(-50%, -50%)`;
        });
      }
      // idle at ~30fps when nothing moves; full rate while scrolling or pointing
      const busy = Math.abs(target - shown) > 0.0003 || now - lastInput < 1500;
      if (reduce.matches && ctrl) return; // one still frame is enough
      raf = busy ? requestAnimationFrame(tick) : (setTimeout(() => (raf = requestAnimationFrame(tick)), 33) as unknown as number);
    };
    const kick = () => {
      if (raf === null && onScreen) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = progress();
      lastInput = performance.now();
      kick();
    };
    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / innerWidth) * 2 - 1;
      mouse.ty = (e.clientY / innerHeight) * 2 - 1;
      lastInput = performance.now();
    };
    const onResize = () => {
      ctrl?.resize(stage.clientWidth, stage.clientHeight);
      onScroll();
    };

    // Load three.js only when the chapter approaches the viewport.
    const boot = async () => {
      try {
        const [{ createGlassScene }, svg] = await Promise.all([
          import('../glass/engine'),
          fetch('/logo.svg').then((r) => r.text()),
        ]);
        if (disposed) return;
        ctrl = createGlassScene(canvas, svg, rtl);
        ctrl.resize(stage.clientWidth, stage.clientHeight);
        stage.classList.add('gc-ready');
        kick();
      } catch (err) {
        console.warn('[glass] WebGL unavailable, keeping the still fallback.', err);
        stage.classList.add('gc-failed');
      }
    };
    let booted = false;
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !booted) {
          booted = true;
          boot();
        }
      },
      { rootMargin: '150% 0px' },
    );
    near.observe(section);
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      if (onScreen) onScroll();
    });
    io.observe(section);

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('pointermove', onMove, { passive: true });
    addEventListener('resize', onResize);
    reduce.addEventListener('change', onScroll);
    writeText(0);

    return () => {
      disposed = true;
      near.disconnect();
      io.disconnect();
      removeEventListener('scroll', onScroll);
      removeEventListener('pointermove', onMove);
      removeEventListener('resize', onResize);
      reduce.removeEventListener('change', onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
      ctrl?.dispose();
    };
  }, [rtl]);

  return (
    <section ref={sectionRef} className="gc" aria-labelledby="gc-title">
      <div ref={stageRef} className="gc-stage">
        <canvas ref={canvasRef} className="gc-canvas" aria-hidden="true" />
        {/* Still fallback: shown until WebGL is ready, or forever if it fails. */}
        <div className="gc-still" aria-hidden="true">
          <svg viewBox="0 0 46 47" className="gc-still-mark">
            <path d="M20.8354 0.00301277C26.3683 0.00301277 27.3941 3.43841 27.3876 7.16455C27.3941 18.5884 27.3876 27.4726 27.3941 39.4052C27.3876 44.2124 25.2461 46.3199 20.134 46.3199C14.4357 46.3199 13.2575 46.5765 4.5178 46.3532C3.50323 46.3273 2.41256 46.2097 1.71222 45.4751C0.29485 43.9886 0.130184 41.2547 1.16689 39.4593C2.04182 37.9441 4.05071 37.8387 5.80036 37.8387H18.1647V8.82388C18.1516 8.5887 17.9779 8.6671 17.8542 8.64677L4.30745 8.82388C2.46996 8.64677 0.972331 7.55505 0.759544 5.49936C0.472932 2.72651 1.38053 0.699856 3.41721 0.000109261L20.8323 0.000109212C20.8339 0.000109237 20.8354 0.0014092 20.8354 0.00301277Z" />
            <circle cx="38.99" cy="22.91" r="6.51" />
          </svg>
        </div>

        {dict.tools.map((t) => (
          <span key={t} className="gc-tool" aria-hidden="true">
            {t}
          </span>
        ))}

        <div className="gc-copy">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="gc-before">
              <p className="text-sm font-medium text-white/55">{dict.eyebrow}</p>
              <p className="mt-5 max-w-[14ch] font-display text-5xl font-medium leading-[1.02] tracking-tight text-white sm:text-7xl rtl:leading-[1.2]">
                {dict.beforeA}
              </p>
              <p className="mt-2 max-w-[16ch] font-display text-3xl font-medium text-white/55 sm:text-5xl">{dict.beforeB}</p>
            </div>
            <div className="gc-after">
              <h2 id="gc-title" className="max-w-[14ch] font-display text-5xl font-medium leading-[1.02] tracking-tight text-white sm:text-7xl rtl:leading-[1.2]">
                {dict.afterA} <span className="block text-brand-light">{dict.afterB}</span>
              </h2>
              <p className="mt-6 max-w-[40ch] text-base leading-relaxed text-white/75 sm:text-lg">{dict.afterLead}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
