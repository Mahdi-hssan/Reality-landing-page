'use client';

import { useEffect } from 'react';

/** Arms `.reveal-rise` entrances: elements ease in once as they enter the viewport. */
export function Reveals() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js-reveal');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    document.querySelectorAll('.reveal-rise').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
