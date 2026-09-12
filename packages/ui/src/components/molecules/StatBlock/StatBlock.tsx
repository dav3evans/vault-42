import { cn } from "../../../lib/cn";

export type StatBlockProps = {
  value: string;
  label: string;
  className?: string;
};

export function StatBlock({ value, label, className }: StatBlockProps) {
  return (
    <div className={cn("border border-white/5 bg-white/[0.03] p-4 backdrop-blur-[6px]", className)}>
      <strong className="block font-display text-[1.9rem] leading-none text-gold">{value}</strong>
      <span className="mt-1 block font-mono text-[0.58rem] uppercase tracking-[0.18em] text-muted-2">{label}</span>
    </div>
  );
}
