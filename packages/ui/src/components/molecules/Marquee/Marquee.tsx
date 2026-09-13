import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

export type MarqueeProps = {
  items: ReactNode[];
  className?: string;
};

/**
 * Infinite scrolling ticker. The item list is rendered twice back-to-back and
 * the whole track translates by -50%, so the loop reads as seamless.
 */
export function Marquee({ items, className }: MarqueeProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "overflow-hidden border-y-2 border-t-white/18 border-b-black/25 bg-gold-fade",
        className,
      )}
    >
      <div className="flex w-max animate-marquee">
        {[0, 1].map((rep) => (
          <div key={rep} className="flex flex-none">
            {items.map((item, index) => (
              <span key={`${rep}-${index}`} className="flex flex-none items-center">
                <span className="whitespace-nowrap px-[22px] py-2.5 font-display text-sm tracking-[0.18em] text-[#0b1118]">
                  {item}
                </span>
                <span className="px-2 py-2.5 text-[#19304d]">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
