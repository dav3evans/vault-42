import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

export type BrandProps = {
  title: string;
  subtitle?: string;
  /** Logo slot — pass an `<img>`/`next/image` from the consuming app. Falls back to a monogram box. */
  logo?: ReactNode;
  href?: string;
  className?: string;
};

export function Brand({ title, subtitle, logo, href = "#", className }: BrandProps) {
  return (
    <a href={href} className={cn("flex min-w-0 items-center gap-3", className)} aria-label={title}>
      <span className="flex h-14 w-14 flex-none items-center justify-center overflow-hidden drop-shadow-[0_10px_18px_rgba(0,0,0,0.38)]">
        {logo ?? (
          <span className="flex h-full w-full items-center justify-center rounded-full border border-gold/30 bg-bg-2 font-display text-lg text-gold">
            {title.charAt(0)}
          </span>
        )}
      </span>
      <span className="min-w-0">
        <span className="block font-display text-[1.75rem] leading-[0.9] tracking-[0.1em] text-[#f4e8af]">
          {title}
        </span>
        {subtitle && (
          <span className="mt-1 block whitespace-nowrap font-mono text-[0.54rem] uppercase tracking-[0.22em] text-muted-2">
            {subtitle}
          </span>
        )}
      </span>
    </a>
  );
}
