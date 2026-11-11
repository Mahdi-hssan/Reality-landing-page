import type { Locale } from "@/i18n/config";

/*
 * Inline SVG flags. Emoji flags don't render on Windows (they show as "FR"),
 * so each flag is drawn here. English uses the UK flag, Arabic the Tunisian
 * flag (the site's home audience). All are drawn on a 30x20 canvas and
 * clipped round by the wrapper.
 */
const FLAGS: Record<Locale, React.ReactNode> = {
  en: (
    <>
      <rect width="30" height="20" fill="#012169" />
      <path d="M0 0l30 20M30 0L0 20" stroke="#fff" strokeWidth="4" />
      <path d="M0 0l30 20M30 0L0 20" stroke="#C8102E" strokeWidth="1.6" />
      <path d="M15 0v20M0 10h30" stroke="#fff" strokeWidth="6.5" />
      <path d="M15 0v20M0 10h30" stroke="#C8102E" strokeWidth="3.6" />
    </>
  ),
  fr: (
    <>
      <rect width="10" height="20" fill="#002654" />
      <rect x="10" width="10" height="20" fill="#fff" />
      <rect x="20" width="10" height="20" fill="#CE1126" />
    </>
  ),
  es: (
    <>
      <rect width="30" height="20" fill="#AA151B" />
      <rect y="5" width="30" height="10" fill="#F1BF00" />
    </>
  ),
  ar: (
    <>
      <rect width="30" height="20" fill="#E70013" />
      <circle cx="15" cy="10" r="5.6" fill="#fff" />
      {/* Crescent: a red disc with a white disc cut out of its right side */}
      <circle cx="14.6" cy="10" r="4.2" fill="#E70013" />
      <circle cx="15.7" cy="10" r="3.4" fill="#fff" />
      <polygon
        fill="#E70013"
        points="19.25,10.00 17.64,10.54 17.63,12.23 16.62,10.87 15.00,11.38 15.98,10.00 15.00,8.62 16.62,9.13 17.63,7.77 17.64,9.46"
      />
    </>
  ),
};

export function LocaleFlag({
  locale,
  className,
}: {
  locale: Locale;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex size-5 shrink-0 overflow-hidden rounded-full shadow-[0_0_0_1px_rgba(11,22,48,0.12),0_1px_2px_rgba(11,22,48,0.15)] ${className ?? ''}`}
    >
      <svg
        viewBox="5 0 20 20"
        className="size-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {FLAGS[locale]}
      </svg>
    </span>
  );
}
