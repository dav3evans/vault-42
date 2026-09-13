import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

export type PanelProps = {
  children: ReactNode;
  /** Thin hazard-stripe accent bar along the top edge, used on most cards. */
  accentTop?: boolean;
  className?: string;
  innerClassName?: string;
};

export function Panel({ children, accentTop = true, className, innerClassName }: PanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border border-line bg-panel-fade shadow-[0_16px_40px_rgba(0,0,0,0.24)]",
        className,
      )}
    >
      {accentTop && <span aria-hidden className="absolute inset-x-0 top-0 h-[5px] bg-warn opacity-35" />}
      <div className={cn("p-7", innerClassName)}>{children}</div>
    </div>
  );
}
