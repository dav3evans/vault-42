import { Panel } from "../Panel/Panel";
import { cn } from "../../../lib/cn";

export type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
  className?: string;
};

export function TestimonialCard({ quote, name, role, className }: TestimonialCardProps) {
  return (
    <Panel accentTop={false} className={cn("h-full", className)}>
      <p className="font-display text-[1.6rem] leading-[1.15] tracking-[0.01em] text-[#f4e8af]">“{quote}”</p>
      <div className="mt-5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-2">
        {name} · {role}
      </div>
    </Panel>
  );
}
