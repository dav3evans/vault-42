import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

export type HeadingSize = "hero" | "section" | "card";
type HeadingTag = "h1" | "h2" | "h3" | "h4";

const sizeStyles: Record<HeadingSize, string> = {
  hero: "text-[clamp(3.5rem,10vw,7.6rem)] leading-[0.88] tracking-[0.03em]",
  section: "text-[clamp(2.3rem,5vw,4.6rem)] leading-[0.92] tracking-[0.04em]",
  card: "text-[2rem] leading-[0.95] tracking-[0.04em]",
};

export type HeadingProps = {
  as?: HeadingTag;
  size?: HeadingSize;
  children: ReactNode;
  className?: string;
};

export function Heading({ as = "h2", size = "section", children, className }: HeadingProps) {
  const Component = as;
  return <Component className={cn("font-display text-text", sizeStyles[size], className)}>{children}</Component>;
}
