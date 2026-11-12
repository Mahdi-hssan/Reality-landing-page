import {
  Activity,
  BadgeCheck,
  BrainCircuit,
  CalendarDays,
  ChartColumn,
  Network,
  Radio,
  ShoppingBag,
  Swords,
  Trophy,
  Users,
  Video,
  type LucideIcon,
} from 'lucide-react';

/** One icon per module of the product tour (keys of `tour.features`). */
export const MODULE_ICONS: Record<string, LucideIcon> = {
  planning: CalendarDays,
  dashboard: ChartColumn,
  matches: Swords,
  customers: Users,
  memberships: BadgeCheck,
  tournaments: Trophy,
  store: ShoppingBag,
};

/** One icon per entry of `why.exclusives`, same order in every language. */
export const EXCLUSIVE_ICONS: LucideIcon[] = [BrainCircuit, Network, Activity, Radio, Video];
