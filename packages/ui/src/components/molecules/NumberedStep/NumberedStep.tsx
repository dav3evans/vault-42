import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

export type NumberedStepProps = {
  number: string;
  children: ReactNode;
  className?: string;
};

export function NumberedStep({ number, children, className }: NumberedStepProps) {
  return (
    <div className={cn("grid grid-cols-[34px_1fr] items-start gap-3.5", className)}>
      <span className="flex h-[34px] w-[34px] items-center justify-center border border-gold/18 bg-gold/10 font-display text-[1.1rem] text-gold">
        {number}
      </span>
      <p className="text-[0.98rem] leading-[1.72] text-text/72">{children}</p>
    </div>
  );
}
