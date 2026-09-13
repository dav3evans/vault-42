import { cn } from "../../../lib/cn";

export type StatusPillTone = "active" | "idle" | "critical";

export type StatusPillProps = {
  label: string;
  tone?: StatusPillTone;
  className?: string;
};

const toneColor: Record<StatusPillTone, string> = {
  active: "text-[#8bd178]",
  idle: "text-muted-2",
  critical: "text-red",
};

const toneDot: Record<StatusPillTone, string> = {
  active: "bg-[#8bd178]",
  idle: "bg-muted-2",
  critical: "bg-red",
};

export function StatusPill({ label, tone = "active", className }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.18em]",
        toneColor[tone],
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        {tone === "critical" && (
          <span aria-hidden className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", toneDot[tone])} />
        )}
        <span aria-hidden className={cn("relative h-1.5 w-1.5 rounded-full", toneDot[tone])} />
      </span>
      {label}
    </span>
  );
}
