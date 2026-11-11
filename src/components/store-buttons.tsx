import { APP_STORE_URL, playStoreUrl } from '@/content/site';

type StoreButtonsProps = {
  lang: string;
  appStoreSmall: string;
  playStoreSmall: string;
  className?: string;
};

/** App Store / Google Play links for the Reality Sports player app (B2C). */
export function StoreButtons({ lang, appStoreSmall, playStoreSmall, className = '' }: StoreButtonsProps) {
  const base =
    'inline-flex h-14 min-w-44 items-center gap-3 rounded-2xl border border-white/15 bg-black px-4 text-white shadow-[0_12px_30px_-12px_rgba(0,0,0,0.6)] transition hover:bg-neutral-900';

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={APP_STORE_URL} target="_blank" rel="noopener" className={base} aria-label={`${appStoreSmall} App Store`}>
        <svg viewBox="0 0 24 24" className="size-7 shrink-0" fill="currentColor" aria-hidden="true">
          <path d="M16.37 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.78-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.97.9-3.76 2.28-1.6 2.78-.41 6.9 1.15 9.16.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.23-.02 2.01-1.12 2.76-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.42-3.65zM14.1 5.86c.63-.77 1.06-1.83.94-2.89-.91.04-2.01.61-2.67 1.37-.58.67-1.1 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.28z" />
        </svg>
        <span className="flex flex-col text-start leading-tight">
          <span className="text-[11px] text-white/75">{appStoreSmall}</span>
          <span className="text-lg font-semibold">App Store</span>
        </span>
      </a>
      <a href={playStoreUrl(lang)} target="_blank" rel="noopener" className={base} aria-label={`${playStoreSmall} Google Play`}>
        <svg viewBox="0 0 24 24" className="size-7 shrink-0" aria-hidden="true">
          <path fill="#34A853" d="M3.6 2.3c-.3.3-.4.7-.4 1.2v17c0 .5.1.9.4 1.2l9.5-9.7z" />
          <path fill="#FBBC04" d="M16.3 15.2 13.1 12l3.2-3.2 3.8 2.2c1.1.6 1.1 1.6 0 2.2z" />
          <path fill="#EA4335" d="M16.3 15.2 13.1 12l-9.5 9.7c.4.4.9.4 1.6.1z" />
          <path fill="#4285F4" d="M16.3 8.8 5.2 2.4c-.7-.4-1.3-.3-1.6.1l9.5 9.5z" />
        </svg>
        <span className="flex flex-col text-start leading-tight">
          <span className="text-[11px] text-white/75">{playStoreSmall}</span>
          <span className="text-lg font-semibold">Google Play</span>
        </span>
      </a>
    </div>
  );
}
