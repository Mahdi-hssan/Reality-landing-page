'use client';

import { LiquidGlass, type LiquidGlassProps } from 'quick-liquid/react';

type Tone = 'light' | 'dark';

type GlassProps = Omit<LiquidGlassProps, 'config'> & {
  tone?: Tone;
  radius?: number;
  material?: 'clear' | 'thin' | 'regular' | 'thick';
  /** Subtle = no cursor-tracked light, for large surfaces. */
  subtle?: boolean;
  /**
   * The engine moves children into its own `.ql-content` wrapper, so layout
   * classes (flex, grid, gap) must go here, not on `className`.
   */
  innerClassName?: string;
};

/**
 * Liquid glass surface. Chromium gets real refraction; Safari/Firefox get the
 * library's CSS fallback (blur + tint + rim light), so the layout never changes.
 */
export function Glass({
  tone = 'light',
  radius = 24,
  material = 'regular',
  subtle = false,
  className,
  innerClassName,
  children,
  ...rest
}: GlassProps) {
  return (
    <LiquidGlass
      {...rest}
      className={className}
      config={{
        material,
        appearance: tone,
        borderRadius: radius,
        tint: tone === 'dark' ? '#0b1220' : '#ffffff',
        tintOpacity: tone === 'dark' ? 0.28 : 0.18,
        hoverLighting: !subtle,
        cursorTracking: !subtle,
        quality: subtle ? 'medium' : 'high',
      }}
    >
      {innerClassName ? <div className={innerClassName}>{children}</div> : children}
    </LiquidGlass>
  );
}
