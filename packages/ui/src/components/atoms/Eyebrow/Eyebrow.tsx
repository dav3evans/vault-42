import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

export type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <div
      className={cn(
        "mb-3.5 flex items-center gap-3 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold",
        className,
      )}
    >
      <span aria-hidden className="h-0.5 w-7 bg-gradient-to-r from-gold to-transparent" />
      {children}
    </div>
  );
}
