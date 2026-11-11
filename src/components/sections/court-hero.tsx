'use client';

import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Dictionary } from '@/content/dictionaries/fr';

type Props = {
  dict: Dictionary['hero'];
  /** The Facilities | Players switch, so the choice is the first thing on screen. */
  switcher?: React.ReactNode;
};

/** Lamp positions as fractions of the photo (measured on the 2000x1125 source). */
const LAMPS: [number, number, boolean?][] = [
  [0.286, 0.364],
  [0.428, 0.34],
  [0.672, 0.573],
  [0.845, 0.484],
  [0.115, 0.138, true],
  [0.4, 0.088, true],
];

/** Caption bands in hero progress (0..1). Starting points, tuned with the flick test. */
const BANDS: [number, number][] = [
  [0, 0.3],
  [0.36, 0.64],
  [0.7, 1.01],
];

/** Split a line into word spans; --i/--n drive the per-word entrance in CSS. */
function Words({ text, offset = 0, total }: { text: string; offset?: number; total: number }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((w, i) => (
        <span key={i}>
          <span className="w" style={{ '--i': offset + i, '--n': total } as React.CSSProperties}>
            {w}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </>
  );
}

const count = (...lines: string[]) => lines.reduce((n, l) => n + l.split(' ').length, 0);

const smoothstep = (p: number, e0: number, e1: number) => {
  const t = Math.min(1, Math.max(0, (p - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function CourtHero({ dict, switcher }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const stage = stageRef.current!;
    const canvas = canvasRef.current!;
    const bands = [...stage.querySelectorAll<HTMLElement>('.ch-band')].map((el) => ({ el, op: -1, k: -1 }));
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');

    // ---- scroll progress, eased (dt-normalised lerp that rests when converged) ----
    let target = 0;
    let shown = 0;
    let raf: number | null = null;
    let last = 0;
    let onScreen = true;
    let loadK = 0;
    const loadStart = performance.now();
    const cache = { cs: '', cy: '', veil: '', cue: '' };

    const progress = () => {
      const r = section.getBoundingClientRect();
      const range = r.height - innerHeight;
      return range > 0 ? Math.min(1, Math.max(0, -r.top / range)) : 0;
    };

    const write = (key: keyof typeof cache, value: string) => {
      if (cache[key] === value) return;
      cache[key] = value;
      stage.style.setProperty(`--${key}`, value);
    };

    const apply = (p: number, now: number) => {
      const e = easeInOut(p);
      write('cs', (1 + 0.95 * e).toFixed(4));
      write('cy', `${(-4 * e).toFixed(3)}%`);
      const veil = smoothstep(p, 0.38, 0.5) * (1 - smoothstep(p, 0.52, 0.68));
      write('veil', (veil * 0.85).toFixed(3));
      write('cue', (1 - smoothstep(p, 0.01, 0.06)).toFixed(3));

      loadK = Math.min(1, (now - loadStart) / 1400);
      bands.forEach((b, i) => {
        const [a, z] = BANDS[i];
        const f = Math.min(0.03, (z - a) / 3);
        let op = (i === 0 ? 1 : smoothstep(p, a, a + f)) * (i === BANDS.length - 1 ? 1 : 1 - smoothstep(p, z - f, z));
        let k = Math.min(1, Math.max(0, (p - a) / Math.min(0.06, (z - a) * 0.35)));
        if (i === 0) k = Math.max(k, easeInOut(loadK));
        if (reduce.matches) {
          op = i === 0 ? 1 : 0;
          k = 1;
        }
        op = Math.round(op * 1000) / 1000;
        if (op !== b.op) {
          b.op = op;
          b.el.style.opacity = String(op);
          b.el.classList.toggle('is-live', op > 0.5);
          b.el.toggleAttribute('inert', op <= 0.5);
        }
        if (Math.abs(k - b.k) > 0.008 || (k === 1 && b.k !== 1)) {
          b.k = k;
          b.el.style.setProperty('--k', k.toFixed(3));
        }
      });
    };

    const tick = (now: number) => {
      const dt = Math.min(100, now - (last || now));
      last = now;
      shown += (target - shown) * (1 - Math.pow(1 - 0.12, dt / 16.667));
      const settled = Math.abs(target - shown) < 0.0004 && loadK >= 1;
      if (settled) shown = target;
      apply(shown, now);
      if (settled || !onScreen) {
        raf = null;
        last = 0;
      } else raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (raf === null && onScreen) raf = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      target = progress();
      kick();
    };

    // ---- haze: dust motes flying past the descending camera + slow fog banks ----
    const ctx = canvas.getContext('2d')!;
    let W = 0;
    let H = 0;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    const resize = () => {
      W = stage.clientWidth;
      H = stage.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const sprite = (r: number, g: number, b: number) => {
      const c = document.createElement('canvas');
      c.width = c.height = 64;
      const x = c.getContext('2d')!;
      const grad = x.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
      grad.addColorStop(0.35, `rgba(${r},${g},${b},0.35)`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      x.fillStyle = grad;
      x.fillRect(0, 0, 64, 64);
      return c;
    };
    const dust = sprite(225, 240, 255);
    const fog = sprite(150, 195, 255);

    let seed = 7;
    const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
    const motes = Array.from({ length: 150 }, () => ({
      x: (rnd() - 0.5) * 3.2,
      y: (rnd() - 0.5) * 2.2,
      z: 0.15 + rnd() * 2.6,
      s: 0.6 + rnd() * 1.6,
      w: rnd() * Math.PI * 2,
    }));
    const banks = Array.from({ length: 9 }, (_, i) => ({
      x: rnd(),
      y: 0.25 + rnd() * 0.7,
      r: 0.35 + rnd() * 0.45,
      v: (rnd() - 0.5) * 0.012,
      a: 0.05 + rnd() * 0.06,
      ph: i * 1.7,
    }));

    let hazeRaf: number | null = null;
    let hazeLast = 0;
    const DEPTH = 2.75;
    const drawHaze = (now: number) => {
      hazeRaf = null;
      if (!onScreen || document.hidden) return;
      if (now - hazeLast < 1000 / 40) {
        hazeRaf = requestAnimationFrame(drawHaze);
        return;
      }
      const t = now / 1000;
      hazeLast = now;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';

      // fog banks: slow lateral drift, they swell as the camera nears the court
      const swell = 1 + shown * 0.8;
      for (const b of banks) {
        const x = (((b.x + t * b.v) % 1.4) + 1.4) % 1.4 - 0.2;
        const r = b.r * Math.max(W, H) * swell;
        ctx.globalAlpha = b.a * (0.75 + 0.25 * Math.sin(t * 0.3 + b.ph));
        ctx.drawImage(fog, x * W - r, b.y * H - r, r * 2, r * 2);
      }

      // dust: 3D motes; the camera moves forward with scroll so they stream past
      const camZ = shown * 2.2 + t * 0.035;
      const cx = W * (document.documentElement.dir === 'rtl' ? 0.4 : 0.6);
      const cy = H * 0.58;
      const f = Math.min(W, H) * 0.55;
      for (const m of motes) {
        let d = (m.z - camZ) % DEPTH;
        if (d < 0) d += DEPTH;
        d += 0.12;
        const sx = cx + ((m.x + Math.sin(t * 0.4 + m.w) * 0.04) * f) / d;
        const sy = cy + ((m.y + Math.cos(t * 0.3 + m.w) * 0.03) * f) / d;
        if (sx < -20 || sx > W + 20 || sy < -20 || sy > H + 20) continue;
        const size = (m.s * 3.2) / d;
        const near = smoothstep(d, 0.12, 0.45);
        const far = 1 - smoothstep(d, 1.8, DEPTH);
        ctx.globalAlpha = 0.55 * near * far * (0.7 + 0.3 * Math.sin(t * 2 + m.w * 3));
        ctx.drawImage(dust, sx - size, sy - size, size * 2, size * 2);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      if (!reduce.matches) hazeRaf = requestAnimationFrame(drawHaze);
    };
    const startHaze = () => {
      if (hazeRaf === null) hazeRaf = requestAnimationFrame(drawHaze);
    };

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) {
        onScroll();
        startHaze();
      }
    });
    io.observe(section);

    const onResize = () => {
      resize();
      onScroll();
      startHaze();
    };
    const onVis = () => {
      document.body.classList.toggle('paused', document.hidden);
      if (!document.hidden) startHaze();
    };
    const onReduce = () => {
      bands.forEach((b) => ((b.op = -1), (b.k = -1)));
      onScroll();
      startHaze();
    };

    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVis);
    reduce.addEventListener('change', onReduce);
    onScroll();
    startHaze();

    return () => {
      io.disconnect();
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVis);
      reduce.removeEventListener('change', onReduce);
      if (raf !== null) cancelAnimationFrame(raf);
      if (hazeRaf !== null) cancelAnimationFrame(hazeRaf);
    };
  }, []);

  const n1 = count(dict.titleA, dict.titleB);
  const n2 = count(dict.beat2A, dict.beat2B);
  const n3 = count(dict.beat3A, dict.beat3B);

  return (
    <section id="top" ref={sectionRef} className="ch" aria-label={dict.eyebrow}>
      <div ref={stageRef} className="ch-stage">
        <div className="ch-frame" aria-hidden="true">
          <div className="ch-cam">
            <picture>
              <source media="(max-width: 720px)" srcSet="/images/hero/court-sm.webp" />
              <img src="/images/hero/court.webp" alt="" fetchPriority="high" decoding="async" />
            </picture>
            <img className="ch-soft" src="/images/hero/court-sm.webp" alt="" decoding="async" />
            {LAMPS.map(([x, y, warm], i) => (
              <span
                key={i}
                className={warm ? 'ch-lamp warm' : 'ch-lamp'}
                style={{ left: `${x * 100}%`, top: `${y * 100}%`, animationDelay: `${-i * 1.3}s` }}
              />
            ))}
          </div>
        </div>
        <canvas ref={canvasRef} className="ch-haze" aria-hidden="true" />
        <div className="ch-veil" aria-hidden="true" />
        <div className="ch-scrim" aria-hidden="true" />
        <div className="ch-side" aria-hidden="true" />

        {/* Band 1: the promise, settled on load */}
        <div className="ch-band ch-b1" style={{ opacity: 1 }}>
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 text-center sm:items-start sm:px-4 sm:pt-20 sm:text-start">
            {switcher ? <div className="after mb-5 sm:mb-6">{switcher}</div> : null}
            <p className="after chip text-sm text-white/65">
              {dict.eyebrow}
            </p>
            <h1 className="mt-5 max-w-[16ch] font-display text-[2.35rem] font-medium leading-[1.04] tracking-tight sm:mt-6 sm:text-6xl lg:text-7xl rtl:leading-[1.25]">
              <Words text={dict.titleA} total={n1} />{' '}
              <span className="text-brand-light">
                <Words text={dict.titleB} offset={count(dict.titleA)} total={n1} />
              </span>
            </h1>
            <p className="after mt-5 max-w-[40ch] text-[15px] leading-relaxed text-white/80 sm:mt-6 sm:max-w-[46ch] sm:text-lg">{dict.lead}</p>
            <div className="after mt-7 flex flex-col items-center gap-3 sm:mt-8 sm:flex-row">
              <a
                href="#demo"
                className="btn group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#1a86ff] sm:px-7 sm:py-4 sm:text-base"
              >
                {dict.ctaPrimary}
                <ArrowRight className="size-4 transition group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </a>
              <a
                href="#fonctionnalites"
                className="btn inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-sm font-medium text-white/80 underline decoration-white/30 underline-offset-4 transition duration-300 hover:text-white sm:min-h-0 sm:border sm:border-white/20 sm:bg-white/5 sm:px-7 sm:py-4 sm:text-base sm:no-underline sm:hover:bg-white/10"
              >
                {dict.ctaSecondary}
              </a>
            </div>
          </div>
        </div>

        {/* Band 2: everything lands in one place */}
        <div className="ch-band ch-b2" aria-hidden="true">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 text-center sm:items-start sm:px-4 sm:text-start">
            <p className="max-w-[18ch] font-display text-[2.1rem] font-medium leading-[1.06] tracking-tight sm:text-6xl rtl:leading-[1.25]">
              <Words text={dict.beat2A} total={n2} />
            </p>
            <p className="mt-4 max-w-[22ch] font-display text-xl font-medium text-brand-light sm:text-4xl">
              <Words text={dict.beat2B} offset={count(dict.beat2A)} total={n2} />
            </p>
          </div>
        </div>

        {/* Band 3: arrival on the court */}
        <div className="ch-band ch-b3">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-5 text-center sm:items-start sm:px-4 sm:text-start">
            <p className="max-w-[14ch] font-display text-[2.6rem] font-medium leading-[1.04] tracking-tight sm:text-7xl rtl:leading-[1.2]">
              <Words text={dict.beat3A} total={n3} />
            </p>
            <p className="mt-3 font-display text-2xl font-medium text-brand-light sm:text-5xl">
              <Words text={dict.beat3B} offset={count(dict.beat3A)} total={n3} />
            </p>
            <ul className="after mt-6 flex max-w-sm flex-wrap justify-center gap-2 sm:mt-8 sm:max-w-none sm:justify-start">
              {dict.pills.map((p) => (
                <li key={p} className="chip rounded-full border border-white/15 bg-night/40 px-3 py-1 text-[13px] text-white/85 sm:px-3.5 sm:py-1.5 sm:text-sm">
                  {p}
                </li>
              ))}
            </ul>
            <a
              href="#demo"
              className="after btn group mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-brand px-6 py-3 text-[15px] font-semibold text-white transition duration-300 hover:bg-[#1a86ff] sm:mt-8 sm:px-7 sm:py-4 sm:text-base"
            >
              {dict.ctaPrimary}
              <ArrowRight className="size-4 transition group-hover:translate-x-0.5 rtl:rotate-180" />
            </a>
          </div>
        </div>

        <div className="ch-cue" aria-hidden="true">
          <span>{dict.scrollCue}</span>
          <i />
        </div>
      </div>
    </section>
  );
}
