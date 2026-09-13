import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

export type OutlineTextProps = {
  children: ReactNode;
  className?: string;
};

/** Stroke-only text, used for the second line of the hero headline. */
export function OutlineText({ children, className }: OutlineTextProps) {
  return (
    <span
      className={cn(
        "block text-transparent [-webkit-text-stroke:1px_rgba(244,232,175,0.34)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
