'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check } from 'lucide-react';
import { LocaleFlag } from '@/components/LocaleFlag';
import { LOCALES, LOCALE_LABELS, type Locale } from '@/i18n/config';

/** `path` is the current page under the language segment ('' or '/players'), kept when switching language. */
type LanguageSwitcherProps = { locale: Locale; label: string; path?: string };

type MenuPosition = { top: number; left?: number; right?: number };

/**
 * The nav bar is a liquid-glass surface, and the glass engine clips its content
 * (overflow: hidden). The menu is therefore portalled to <body> and anchored
 * under the button with fixed positioning.
 */
export function LanguageSwitcher({ locale, label, path = '' }: LanguageSwitcherProps) {
  const [position, setPosition] = useState<MenuPosition | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const open = position !== null;

  const toggle = () => {
    if (open) return setPosition(null);
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const rtl = document.documentElement.dir === 'rtl';
    setPosition(rtl ? { top: rect.bottom + 8, left: rect.left } : { top: rect.bottom + 8, right: window.innerWidth - rect.right });
  };

  useEffect(() => {
    if (!open) return;
    const close = () => setPosition(null);
    const onPointer = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!menuRef.current?.contains(target) && !buttonRef.current?.contains(target)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    window.addEventListener('scroll', close, { passive: true });
    window.addEventListener('resize', close);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', close);
      window.removeEventListener('resize', close);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        onClick={toggle}
        className="flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
      >
        <LocaleFlag locale={locale} className="size-4" />
        <span className="">{locale}</span>
      </button>
      {open &&
        createPortal(
          <ul
            ref={menuRef}
            role="menu"
            style={position}
            className="fixed z-[100] min-w-44 overflow-hidden rounded-2xl border border-white/15 bg-night/95 p-1.5 text-white shadow-2xl"
          >
            {LOCALES.map((l) => (
              <li key={l} role="none">
                <a
                  role="menuitem"
                  href={`/${l}${path}`}
                  hrefLang={l}
                  lang={l}
                  aria-current={l === locale ? 'page' : undefined}
                  className="flex items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-sm hover:bg-white/10"
                >
                  <span className="flex items-center gap-2.5">
                    <LocaleFlag locale={l} />
                    {LOCALE_LABELS[l]}
                  </span>
                  {l === locale && <Check className="size-4 text-brand" />}
                </a>
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </>
  );
}
