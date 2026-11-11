import { BellRing, Smartphone, Zap } from 'lucide-react';
import { Glass } from '../glass';
import { PhoneFrame } from '../phone-frame';
import type { Dictionary } from '@/content/dictionaries/fr';
import type { ScreenSet } from '@/content/screens';

const ICONS = [Smartphone, Zap, BellRing];

type MobileProps = { dict: Dictionary['mobile']; screens: ScreenSet };

export function Mobile({ dict, screens }: MobileProps) {
  return (
    <section id="mobile" className="relative overflow-hidden bg-night py-24 text-white sm:py-32">

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-4 lg:grid-cols-2">
        <div className="max-sm:text-center">
          <p className="text-sm font-medium text-white/55">{dict.eyebrow}</p>
          <h2 className="text-balance mt-4 text-3xl font-medium tracking-tight sm:text-5xl rtl:leading-tight">{dict.title}</h2>
          <p className="mt-5 max-w-lg text-lg max-sm:mx-auto leading-relaxed text-white/70">{dict.lead}</p>
          <div className="mt-10 grid gap-4">
            {dict.points.map(({ title, text }, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <Glass key={title} tone="dark" radius={20} subtle className="rounded-[20px] border border-white/10 bg-white/[0.04] p-5">
                  <div className="flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/[0.06] text-white/70">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="font-semibold">{title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-white/65">{text}</p>
                    </div>
                  </div>
                </Glass>
              );
            })}
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-md items-start justify-center" dir="ltr">
          <PhoneFrame src={screens.mobileDashboard} alt={dict.dashboardAlt} className="w-[200px] shrink-0 -rotate-6 sm:w-[290px]" />
          <PhoneFrame
            src={screens.mobilePlans}
            alt={dict.plansAlt}
            className="-ml-20 mt-20 w-[200px] shrink-0 rotate-3 sm:w-[290px]"
          />
        </div>
      </div>
    </section>
  );
}
