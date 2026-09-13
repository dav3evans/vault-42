import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/cn";

const tileStyles = cva("relative overflow-hidden", {
  variants: {
    variant: {
      // Quick-book cards: panel gradient + hazard-stripe top edge.
      quick: "border border-line bg-panel-fade p-[18px] shadow-[0_16px_36px_rgba(0,0,0,0.26)]",
      // "Why Vault 42" cards: same panel gradient, no top stripe, taller padding.
      feature: "border border-line bg-panel-fade px-5 pt-6 pb-6",
      // "Perfect for" cards and room cards: flat, subtle surface.
      muted: "border border-white/5 bg-white/[0.02] p-[18px]",
    },
  },
  defaultVariants: {
    variant: "muted",
  },
});

export type InfoTileVariant = VariantProps<typeof tileStyles>["variant"];

const titleTone: Record<NonNullable<InfoTileVariant>, string> = {
  quick: "text-[#f4e8af]",
  feature: "text-[#f4e8af]",
  muted: "text-text",
};

export type InfoTileProps = {
  title: ReactNode;
  children: ReactNode;
  variant?: InfoTileVariant;
  /** Small mono meta lines under the description, e.g. room duration/players/difficulty. */
  meta?: string[];
  className?: string;
};

export function InfoTile({ title, children, variant = "muted", meta, className }: InfoTileProps) {
  const resolvedVariant = variant ?? "muted";

  return (
    <div className={cn(tileStyles({ variant }), className)}>
      {resolvedVariant === "quick" && (
        <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 bg-warn opacity-45" />
      )}
      <strong className={cn("block font-display text-[1.4rem] tracking-[0.04em]", titleTone[resolvedVariant])}>
        {title}
      </strong>
      <p className="mt-2 text-[0.93rem] leading-[1.68] text-text/68">{children}</p>
      {meta && meta.length > 0 && (
        <div className="mt-3.5 grid gap-1.5">
          {meta.map((line) => (
            <span key={line} className="font-mono text-[0.58rem] uppercase tracking-[0.16em] text-muted-2">
              {line}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
