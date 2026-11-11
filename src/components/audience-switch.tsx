import Link from 'next/link';
import { Building2, Smartphone } from 'lucide-react';
import type { Dictionary } from '@/content/dictionaries/fr';

export type Audience = 'clubs' | 'players';

type Props = {
  dict: Dictionary['nav']['audience'];
  lang: string;
  active: Audience;
  /** `sm` sits in the nav bar, `md` opens each hero. */
  size?: 'sm' | 'md';
  className?: string;
};

/** Each audience has its own page: `/{lang}` for facilities, `/{lang}/players` for players. */
export const audienceHref = (lang: string, audience: Audience) => (audience === 'players' ? `/${lang}/players` : `/${lang}`);

/**
 * The first choice of the experience: "Facilities | Players". It is a pair of links,
 * not a toggle, so each side keeps its own shareable address.
 */
export function AudienceSwitch({ dict, lang, active, size = 'md', className = '' }: Props) {
  const sides = [
    { id: 'clubs' as const, label: dict.clubs, icon: Building2 },
    { id: 'players' as const, label: dict.players, icon: Smartphone },
  ];
  const pad = size === 'sm' ? 'min-h-9 gap-1.5 px-3 text-[13px]' : 'min-h-11 gap-2 px-4 text-sm sm:px-5';

  return (
    <nav
      aria-label={dict.label}
      className={`chip inline-flex items-center rounded-xl border border-white/10 bg-[#070b14]/80 p-1 ${className}`}
    >
      {sides.map(({ id, label, icon: Icon }) => {
        const on = id === active;
        return (
          <Link
            key={id}
            href={audienceHref(lang, id)}
            aria-current={on ? 'page' : undefined}
            className={`inline-flex items-center rounded-lg font-medium transition-colors duration-200 ${pad} ${
              on ? 'bg-white/12 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Icon className={size === 'sm' ? 'size-3.5' : 'size-4'} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
