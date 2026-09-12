import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

export type AccentProps = {
  children: ReactNode;
  className?: string;
};

/** Highlights a word or phrase in gold, for composing inside headings and copy. */
export function Accent({ children, className }: AccentProps) {
  return <span className={cn("text-gold", className)}>{children}</span>;
}
