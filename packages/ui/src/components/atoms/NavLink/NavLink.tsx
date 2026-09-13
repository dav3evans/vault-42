import type { AnchorHTMLAttributes } from "react";
import { cn } from "../../../lib/cn";

export type NavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export function NavLink({ className, ...props }: NavLinkProps) {
  return (
    <a
      className={cn(
        "font-condensed text-[0.78rem] tracking-[0.18em] text-muted uppercase no-underline transition-colors duration-150 hover:text-gold",
        className,
      )}
      {...props}
    />
  );
}
