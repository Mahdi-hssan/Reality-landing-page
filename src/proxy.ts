import { NextResponse, type NextRequest } from 'next/server';
import { DEFAULT_LOCALE, isLocale, LOCALES, type Locale } from '@/i18n/config';

/** Picks the visitor's best supported language from Accept-Language (q-values respected). */
function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get('accept-language') ?? '';
  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, ...rest] = part.trim().split(';');
      const q = rest.find((p) => p.trim().startsWith('q='));
      return { base: tag.toLowerCase().split('-')[0], q: q ? Number(q.split('=')[1]) : 1 };
    })
    .filter((x) => x.base && x.q > 0)
    .sort((a, b) => b.q - a.q);

  return ranked.find((x) => isLocale(x.base))?.base as Locale | undefined ?? DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  request.nextUrl.pathname = `/${preferredLocale(request)}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals and any file with an extension (images, logo, favicon…).
  matcher: ['/((?!_next|.*\\..*).*)'],
};
