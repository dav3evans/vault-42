import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

export type BulletListProps = {
  items: ReactNode[];
  className?: string;
};

export function BulletList({ items, className }: BulletListProps) {
  return (
    <div className={cn("grid gap-2.5", className)}>
      {items.map((item, index) => (
        <div key={index} className="grid grid-cols-[16px_1fr] gap-2.5 text-[0.94rem] leading-[1.65] text-text/73">
          <span aria-hidden className="translate-y-[3px] text-[0.74rem] text-gold">
            ◆
          </span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
