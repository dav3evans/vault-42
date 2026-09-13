import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

export type CalloutProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

/** Gold-tinted highlight box, used for the "Launch-ready message" band in the Book section. */
export function Callout({ title, children, className }: CalloutProps) {
  return (
    <div
      className={cn(
        "mt-6 border border-gold/16 bg-gradient-to-b from-gold/12 to-gold/[0.03] px-[22px] py-5",
        className,
      )}
    >
      <strong className="mb-2 block font-display text-[1.7rem] tracking-[0.04em] text-text">{title}</strong>
      <p className="text-[0.95rem] leading-[1.7] text-text/72">{children}</p>
    </div>
  );
}
