type PartHeadProps = { label: string; className?: string };

/** Chapter marker that names who a page is for, e.g. "— For facilities —". */
export function PartHead({ label, className = '' }: PartHeadProps) {
  return (
    <p className={`inline-flex items-center gap-3 text-sm font-medium text-white/55 ${className}`}>
      <span aria-hidden="true" className="h-px w-6 bg-white/25" />
      {label}
      <span aria-hidden="true" className="h-px w-6 bg-white/25" />
    </p>
  );
}
