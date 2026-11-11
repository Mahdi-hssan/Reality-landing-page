'use client';

import { useState } from 'react';
import { CalendarDays, Check, CreditCard, LayoutDashboard, ShoppingBag, Trophy, Users } from 'lucide-react';
import { Glass } from '../glass';
import { BrowserFrame } from '../browser-frame';
import type { Dictionary } from '@/content/dictionaries/fr';
import type { ScreenSet } from '@/content/screens';

type FeatureId = keyof Dictionary['tour']['features'];

const FEATURES: { id: FeatureId; icon: typeof CalendarDays; shot: keyof ScreenSet }[] = [
  { id: 'planning', icon: CalendarDays, shot: 'calendar' },
  { id: 'dashboard', icon: LayoutDashboard, shot: 'dashboard' },
  { id: 'matches', icon: CreditCard, shot: 'matches' },
  { id: 'customers', icon: Users, shot: 'customers' },
  { id: 'memberships', icon: Check, shot: 'memberships' },
  { id: 'tournaments', icon: Trophy, shot: 'tournaments' },
  { id: 'store', icon: ShoppingBag, shot: 'pos' },
];

type FeatureTourProps = { dict: Dictionary['tour']; browserTitle: string; screens: ScreenSet };

export function FeatureTour({ dict, browserTitle, screens }: FeatureTourProps) {
  const [active, setActive] = useState<FeatureId>('planning');
  const meta = FEATURES.find((f) => f.id === active) ?? FEATURES[0];
  const current = dict.features[meta.id];
  const appName = browserTitle.split('·')[0].trim();

  const renderTabs = (prefix: string) =>
    FEATURES.map((f) => {
      const selected = f.id === active;
      const Icon = f.icon;
      return (
        <button
          key={f.id}
          type="button"
          role="tab"
          id={`tab-${prefix}${f.id}`}
          aria-selected={selected}
          aria-controls="feature-panel"
          onClick={(e) => {
            setActive(f.id);
            // keep the chosen tab fully visible in the swipeable row
            e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }}
          className={`flex shrink-0 snap-center items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition ${
            selected ? 'bg-brand text-white' : 'text-slate-600 hover:bg-white/70 hover:text-slate-900'
          }`}
        >
          <Icon className="size-4" />
          {dict.features[f.id].label}
        </button>
      );
    });

  return (
    <section id="fonctionnalites" className="relative overflow-hidden bg-[#f5f7fa] py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-slate-500">{dict.eyebrow}</p>
          <h2 className="text-balance mt-4 text-3xl font-medium tracking-tight sm:text-5xl rtl:leading-tight">{dict.title}</h2>
          <p className="mt-5 text-lg text-slate-600">{dict.lead}</p>
        </div>

        {/* Phones and tablets: a plain pill that really scrolls sideways (the glass engine clips overflow). */}
        <div className="relative -mx-4 mt-10 lg:hidden">
          <div className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain px-4 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="mx-auto w-max rounded-full border border-white/70 bg-white/70 p-1.5 shadow-[0_10px_40px_-15px_rgba(0,61,142,0.35)]">
              <div role="tablist" aria-label={dict.tablistLabel} className="flex gap-1">
                {renderTabs('m-')}
              </div>
            </div>
          </div>
          {/* edge fades hint that there is more to swipe */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 start-0 w-8 bg-gradient-to-r from-[#f5f7fa] to-transparent rtl:bg-gradient-to-l" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 end-0 w-8 bg-gradient-to-l from-[#f5f7fa] to-transparent rtl:bg-gradient-to-r" />
        </div>

        <div className="mt-12 hidden justify-center lg:flex">
          <Glass
            radius={999}
            material="thin"
            className="inline-flex max-w-full rounded-full border border-white/70 bg-white/50 p-1.5 shadow-[0_10px_40px_-15px_rgba(0,61,142,0.35)]"
          >
            <div role="tablist" aria-label={dict.tablistLabel} className="flex gap-1">
              {renderTabs('')}
            </div>
          </Glass>
        </div>

        <div id="feature-panel" role="tabpanel" aria-labelledby={`tab-${meta.id}`} className="mt-12 grid gap-10 lg:grid-cols-[0.75fr_1.7fr] lg:items-center">
          <div key={meta.id} className="animate-[fadeIn_.4s_ease]">
            <h3 className="text-balance text-2xl font-medium tracking-tight sm:text-3xl">{current.title}</h3>
            <p className="mt-4 leading-relaxed text-slate-600">{current.text}</p>
            <ul className="mt-6 space-y-3">
              {current.points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm font-medium text-slate-800">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <BrowserFrame
            key={`shot-${meta.id}`}
            src={screens[meta.shot]}
            alt={current.title}
            url={`${appName} · ${current.page}`}
            sizes="(min-width: 1024px) 760px, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
