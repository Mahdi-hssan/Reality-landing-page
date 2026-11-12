import { EXCLUSIVE_ICONS, MODULE_ICONS } from '../feature-icons';
import type { Dictionary } from '@/content/dictionaries/fr';

type Props = { tour: Dictionary['tour']; why: Dictionary['why'] };

type Card = { key: string; Icon: (typeof EXCLUSIVE_ICONS)[number]; label: string; line: string; tag?: string };

/**
 * Right under the court hero: two rows of feature cards drifting in opposite directions.
 * Row one is the everyday modules, row two what only Reality does. Pure CSS; pauses on
 * hover, and with reduced motion it becomes a plain swipeable row.
 */
export function FeatureMarquee({ tour, why }: Props) {
  const modules: Card[] = Object.entries(tour.features).map(([key, f]) => ({
    key,
    Icon: MODULE_ICONS[key] ?? MODULE_ICONS.planning,
    label: f.label,
    line: f.title,
  }));
  const exclusives: Card[] = why.exclusives.map((e, i) => ({
    key: `x${i}`,
    Icon: EXCLUSIVE_ICONS[i] ?? EXCLUSIVE_ICONS[0],
    label: e.title,
    line: e.text,
    tag: why.exclusive,
  }));

  return (
    <div className="mq relative mt-2 sm:mt-4" role="region" aria-label={tour.tablistLabel}>
      <Row cards={modules} />
      <Row cards={exclusives} reverse />
    </div>
  );
}

function Row({ cards, reverse }: { cards: Card[]; reverse?: boolean }) {
  // Two copies side by side: the track slides by exactly one copy, so the loop has no seam.
  return (
    <div className="mq-row">
      <ul className={`mq-track${reverse ? ' mq-reverse' : ''}`} style={{ '--mq-n': cards.length } as React.CSSProperties}>
        {[0, 1].map((copy) =>
          cards.map((c) => (
            <li key={`${copy}-${c.key}`} className="mq-card" aria-hidden={copy === 1 || undefined}>
              <span className={`mq-icon${c.tag ? ' mq-icon-x' : ''}`}>
                <c.Icon className="size-[18px]" strokeWidth={1.8} />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-2">
                  <span className="truncate font-display text-[15px] font-medium text-white">{c.label}</span>
                  {c.tag ? <span className="mq-tag">{c.tag}</span> : null}
                </span>
                <span className="mt-1 line-clamp-2 block text-[13px] leading-snug text-white/60">{c.line}</span>
              </span>
            </li>
          )),
        )}
      </ul>
    </div>
  );
}
