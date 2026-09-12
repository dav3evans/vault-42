import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

export type TagTone = "gold" | "muted";

export type TagProps = {
  children: ReactNode;
  tone?: TagTone;
  className?: string;
};

export function Tag({ children, tone = "gold", className }: TagProps) {
  return (
    <span
      className={cn(
        "font-mono text-[0.6rem] uppercase tracking-[0.2em]",
        tone === "gold" ? "text-gold" : "text-muted-2",
        className,
      )}
    >
      {children}
    </span>
  );
}
