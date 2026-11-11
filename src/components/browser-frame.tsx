import Image, { type StaticImageData } from 'next/image';

type BrowserFrameProps = {
  src: StaticImageData;
  alt: string;
  url?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export function BrowserFrame({
  src,
  alt,
  url = 'Reality · Espace club',
  priority,
  className = '',
  sizes = '(min-width: 1024px) 900px, 100vw',
}: BrowserFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/60 bg-white shadow-[0_40px_120px_-30px_rgba(0,30,80,0.45)] ring-1 ring-slate-900/5 ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/90 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="mx-auto hidden rounded-md bg-white px-10 py-1 text-[11px] text-slate-400 ring-1 ring-slate-200 sm:block">
          {url}
        </span>
      </div>
      <Image src={src} alt={alt} priority={priority} sizes={sizes} className="block h-auto w-full" placeholder="blur" />
    </div>
  );
}
