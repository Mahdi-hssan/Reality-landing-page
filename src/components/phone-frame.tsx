import Image, { type StaticImageData } from 'next/image';

type PhoneFrameProps = { src: StaticImageData; alt: string; className?: string; priority?: boolean };

/**
 * Same handset as the player app flows (`.af-bezel` in globals.css), sized in container
 * units so it keeps its proportions at any width.
 */
export function PhoneFrame({ src, alt, className = '', priority }: PhoneFrameProps) {
  return (
    <div className={`@container ${className}`}>
      <div className="rounded-[15.3cqw] bg-[linear-gradient(145deg,#2a3242,#0b0f18_40%,#1b2230)] p-[3.3cqw]">
        <div className="relative aspect-[9/18] overflow-hidden rounded-[12.3cqw] bg-white">
          <Image
            src={src}
            alt={alt}
            priority={priority}
            sizes="320px"
            placeholder="blur"
            className="absolute inset-x-0 top-[13.3cqw] block h-auto w-full"
          />
          <div className="absolute inset-x-0 top-0 flex h-[13.3cqw] items-center justify-between px-[8.6cqw] pt-[0.6cqw] text-[4cqw] font-semibold leading-none text-[#0a0f1c]" dir="ltr">
            <span>9:41</span>
            <span aria-hidden="true" className="flex items-end gap-[0.6cqw]">
              {[1.3, 2, 2.7, 3.3].map((h) => (
                <span key={h} className="w-[1cqw] rounded-[0.3cqw] bg-[#0a0f1c]" style={{ height: `${h}cqw` }} />
              ))}
            </span>
          </div>
          <span aria-hidden="true" className="absolute left-1/2 top-[3cqw] h-[7.3cqw] w-[30%] -translate-x-1/2 rounded-full bg-[#05070c]" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[30cqw] bg-gradient-to-t from-white via-white/90 to-transparent" />
          <span aria-hidden="true" className="absolute bottom-[2.6cqw] left-1/2 h-[1.5cqw] w-[36%] -translate-x-1/2 rounded-full bg-[#0a0f1c]/85" />
        </div>
      </div>
    </div>
  );
}
