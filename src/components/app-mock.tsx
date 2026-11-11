import { CalendarDays, MapPin, Users } from 'lucide-react';
import type { Dictionary } from '@/content/dictionaries/fr';

type AppDict = Dictionary['app'];

/** Demo data shown inside the illustrated phone. Sport names stay in the visitor's language via `sportLabels`. */
const MATCHES = [
  { sport: 0, time: '18:30', club: 'Padel Club Lac', level: '3.5', open: 1, accent: 'bg-brand' },
  { sport: 1, time: '19:00', club: 'Five Arena', level: '—', open: 3, accent: 'bg-brand-teal' },
  { sport: 3, time: '20:00', club: 'Sports Hub Marsa', level: '2.5', open: 2, accent: 'bg-brand-gold' },
  { sport: 2, time: '20:30', club: 'Tennis Club Carthage', level: '4.0', open: 1, accent: 'bg-fuchsia-500' },
];

type AppMockProps = { dict: AppDict; sportLabels: string[] };

/** An illustration of the Reality Sports player app (not a screenshot), drawn in HTML so it follows the page language. */
export function AppMock({ dict, sportLabels }: AppMockProps) {
  return (
    <div role="img" aria-label={dict.mockAlt} className="relative mx-auto w-[280px] rounded-[2.6rem] bg-slate-950 p-2.5 shadow-[0_40px_90px_-25px_rgba(0,20,60,0.6)] ring-1 ring-white/10 sm:w-[300px]">
      <div className="relative overflow-hidden rounded-[2.1rem] bg-slate-50" aria-hidden="true">
        <div className="flex h-8 items-center justify-between px-6 text-[11px] font-semibold text-slate-900" dir="ltr">
          <span>9:41</span>
          <span className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-slate-950" />
          <span>●●● ▮</span>
        </div>
        <div className="bg-gradient-to-br from-brand to-brand-dark px-5 pb-6 pt-4 text-white">
          <p className="text-xs text-white/70">{dict.mockToday}</p>
          <p className="mt-1 text-2xl font-medium">{dict.mockTitle}</p>
          <div className="mt-4 flex gap-2 overflow-hidden">
            {sportLabels.slice(0, 4).map((s, i) => (
              <span key={s} className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold ${i === 0 ? 'bg-white text-brand-dark' : 'bg-white/15'}`}>
                {s}
              </span>
            ))}
          </div>
        </div>
        <ul className="-mt-3 space-y-2.5 px-3 pb-6">
          {MATCHES.map((m) => (
            <li key={m.club} className="rounded-2xl bg-white p-3.5 shadow-sm ring-1 ring-slate-100">
              <div className="flex items-center gap-2">
                <span className={`size-2 rounded-full ${m.accent}`} />
                <span className="text-xs font-medium text-slate-900">{sportLabels[m.sport]}</span>
                <span className="ms-auto flex items-center gap-1 text-[11px] font-semibold text-slate-500" dir="ltr">
                  <CalendarDays className="size-3" /> {m.time}
                </span>
              </div>
              <p className="mt-1.5 flex items-center gap-1 text-[11px] text-slate-500">
                <MapPin className="size-3 shrink-0" /> {m.club}
              </p>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="flex items-center gap-1 text-[11px] text-slate-600">
                  <Users className="size-3" /> {m.open} {dict.mockSpots} · {dict.mockLevel} {m.level}
                </span>
                <span className="rounded-md bg-brand px-3 py-1 text-[11px] font-medium text-white">{dict.mockJoin}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
