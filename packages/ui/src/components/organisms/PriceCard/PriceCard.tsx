import type { ReactNode } from "react";
import { Panel } from "../../molecules/Panel/Panel";
import { Heading } from "../../atoms/Heading/Heading";
import { cn } from "../../../lib/cn";

export type PriceRow = {
  label: string;
  value: string;
};

export type PriceCardProps = {
  title: ReactNode;
  description?: ReactNode;
  rows: PriceRow[];
  note?: ReactNode;
  className?: string;
};

export function PriceCard({ title, description, rows, note, className }: PriceCardProps) {
  return (
    <Panel accentTop={false} innerClassName="p-0" className={cn("h-full", className)}>
      <div className="border-b border-gold/10 bg-gradient-to-b from-gold/10 to-gold/[0.02] px-6 pt-[22px] pb-[18px]">
        <Heading as="h3" size="card">
          {title}
        </Heading>
        {description && <p className="mt-2 text-[0.95rem] leading-[1.65] text-text/70">{description}</p>}
      </div>
      <div className="grid gap-3 p-6">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex justify-between gap-4 border-b border-white/[0.06] py-3 text-text/76"
          >
            <span>{row.label}</span>
            <strong className="whitespace-nowrap text-[#f4e8af]">{row.value}</strong>
          </div>
        ))}
        {note && <p className="mt-1 text-[0.9rem] leading-[1.68] text-text/62">{note}</p>}
      </div>
    </Panel>
  );
}
