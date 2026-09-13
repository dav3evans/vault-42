import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

export type ContactItemProps = {
  label: string;
  href?: string;
  children: ReactNode;
  className?: string;
};

export function ContactItem({ label, href, children, className }: ContactItemProps) {
  return (
    <div className={cn("border border-white/5 bg-white/[0.03] p-4", className)}>
      <b className="mb-2 block font-mono text-[0.58rem] uppercase tracking-[0.18em] text-gold">{label}</b>
      {href ? (
        <a href={href} className="break-words text-base text-[#f4e8af] no-underline">
          {children}
        </a>
      ) : (
        <div className="break-words text-base text-[#f4e8af]">{children}</div>
      )}
    </div>
  );
}
