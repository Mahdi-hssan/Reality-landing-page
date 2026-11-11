import type { StaticImageData } from 'next/image';
import type { Locale } from '@/i18n/config';

import frCalendar from '../../public/screens/fr/calendar.webp';
import frDashboard from '../../public/screens/fr/dashboard.webp';
import frMatches from '../../public/screens/fr/matches.webp';
import frCustomers from '../../public/screens/fr/customers.webp';
import frMemberships from '../../public/screens/fr/memberships.webp';
import frTournaments from '../../public/screens/fr/tournaments.webp';
import frPos from '../../public/screens/fr/pos.webp';
import frMobileDashboard from '../../public/screens/fr/mobile-dashboard.webp';
import frMobilePlans from '../../public/screens/fr/mobile-plans.webp';

import enCalendar from '../../public/screens/en/calendar.webp';
import enDashboard from '../../public/screens/en/dashboard.webp';
import enMatches from '../../public/screens/en/matches.webp';
import enCustomers from '../../public/screens/en/customers.webp';
import enMemberships from '../../public/screens/en/memberships.webp';
import enTournaments from '../../public/screens/en/tournaments.webp';
import enPos from '../../public/screens/en/pos.webp';
import enMobileDashboard from '../../public/screens/en/mobile-dashboard.webp';
import enMobilePlans from '../../public/screens/en/mobile-plans.webp';

import esCalendar from '../../public/screens/es/calendar.webp';
import esDashboard from '../../public/screens/es/dashboard.webp';
import esMatches from '../../public/screens/es/matches.webp';
import esCustomers from '../../public/screens/es/customers.webp';
import esMemberships from '../../public/screens/es/memberships.webp';
import esTournaments from '../../public/screens/es/tournaments.webp';
import esPos from '../../public/screens/es/pos.webp';
import esMobileDashboard from '../../public/screens/es/mobile-dashboard.webp';
import esMobilePlans from '../../public/screens/es/mobile-plans.webp';

import arCalendar from '../../public/screens/ar/calendar.webp';
import arDashboard from '../../public/screens/ar/dashboard.webp';
import arMatches from '../../public/screens/ar/matches.webp';
import arCustomers from '../../public/screens/ar/customers.webp';
import arMemberships from '../../public/screens/ar/memberships.webp';
import arTournaments from '../../public/screens/ar/tournaments.webp';
import arPos from '../../public/screens/ar/pos.webp';
import arMobileDashboard from '../../public/screens/ar/mobile-dashboard.webp';
import arMobilePlans from '../../public/screens/ar/mobile-plans.webp';

/** One set of dashboard screenshots per landing language, taken with the dashboard in that language. */
export type ScreenSet = {
  calendar: StaticImageData;
  dashboard: StaticImageData;
  matches: StaticImageData;
  customers: StaticImageData;
  memberships: StaticImageData;
  tournaments: StaticImageData;
  pos: StaticImageData;
  mobileDashboard: StaticImageData;
  mobilePlans: StaticImageData;
};

const SCREENS: Record<Locale, ScreenSet> = {
  fr: {
    calendar: frCalendar,
    dashboard: frDashboard,
    matches: frMatches,
    customers: frCustomers,
    memberships: frMemberships,
    tournaments: frTournaments,
    pos: frPos,
    mobileDashboard: frMobileDashboard,
    mobilePlans: frMobilePlans,
  },
  en: {
    calendar: enCalendar,
    dashboard: enDashboard,
    matches: enMatches,
    customers: enCustomers,
    memberships: enMemberships,
    tournaments: enTournaments,
    pos: enPos,
    mobileDashboard: enMobileDashboard,
    mobilePlans: enMobilePlans,
  },
  es: {
    calendar: esCalendar,
    dashboard: esDashboard,
    matches: esMatches,
    customers: esCustomers,
    memberships: esMemberships,
    tournaments: esTournaments,
    pos: esPos,
    mobileDashboard: esMobileDashboard,
    mobilePlans: esMobilePlans,
  },
  ar: {
    calendar: arCalendar,
    dashboard: arDashboard,
    matches: arMatches,
    customers: arCustomers,
    memberships: arMemberships,
    tournaments: arTournaments,
    pos: arPos,
    mobileDashboard: arMobileDashboard,
    mobilePlans: arMobilePlans,
  },
};

export const getScreens = (locale: Locale): ScreenSet => SCREENS[locale];
