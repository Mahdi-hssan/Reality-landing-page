'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Glass } from './glass';
import { Logo } from './logo';
import { AudienceSwitch, type Audience } from './audience-switch';
import { LanguageSwitcher } from './language-switcher';
import { NAV_ANCHORS } from '@/content/site';
import type { Dictionary } from '@/content/dictionaries/fr';
import type { Locale } from '@/i18n/config';

type NavProps = { dict: Dictionary['nav']; locale: Locale; audience: Audience };

export function Nav({ dict, locale, audience }: NavProps) {
  const [open, setOpen] = useState(false);
  const links = NAV_ANCHORS[audience];
  // Each side has one action: facilities book a demo, players get the app.
  const cta = audience === 'players' ? { href: '#download', label: dict.getApp } : { href: '#demo', label: dict.demo };

  return (
    <header className="fixed inset-x-0 top-2.5 z-50 px-3 sm:top-4 sm:px-4">
      <Glass
        tone="dark"
        radius={22}
        material="thin"
        subtle
        className="mx-auto max-w-6xl rounded-2xl border border-white/8 bg-[#070b14]/95 py-1 pe-1.5 ps-3.5 text-white sm:py-2.5 sm:pe-4 sm:ps-5"
        innerClassName="flex items-center justify-between gap-4 sm:gap-6"
      >
        <div className="flex items-center gap-4 lg:gap-5">
          <a href="#top" className="flex min-h-10 items-center text-white" aria-label={dict.home}>
            <Logo className="h-5 w-5 text-brand sm:h-7 sm:w-7" wordmarkClassName="text-base text-white sm:text-lg" />
          </a>
          {/* Phones get the switch in the hero and in the menu sheet instead. */}
          <div className="hidden md:block">
            <AudienceSwitch dict={dict.audience} lang={locale} active={audience} size="sm" />
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-white/75 lg:flex" aria-label={dict.mainNav}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-white">
              {dict.links[l.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <LanguageSwitcher locale={locale} label={dict.language} path={audience === 'players' ? '/players' : ''} />
          <a
            href={cta.href}
            className="ms-1 hidden rounded-xl bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1a86ff] active:scale-[0.98] sm:inline-block"
          >
            {cta.label}
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.closeMenu : dict.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Glass>

      {open && (
        <div
          id="mobile-menu"
          className="nav-sheet mx-auto mt-2 max-w-6xl rounded-2xl border border-white/8 bg-[#070b14] p-2 text-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] lg:hidden"
        >
          <div className="flex justify-center px-2 pb-2 pt-1 md:hidden">
            <AudienceSwitch dict={dict.audience} lang={locale} active={audience} />
          </div>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center rounded-xl px-4 text-[15px] font-medium text-white/85 transition hover:bg-white/10 active:bg-white/10"
            >
              {dict.links[l.key]}
            </a>
          ))}
          <a href={cta.href} onClick={() => setOpen(false)} className="mt-2 block rounded-xl bg-brand px-4 py-3 text-center font-semibold">
            {cta.label}
          </a>
        </div>
      )}
    </header>
  );
}
