import { cn } from "../../../lib/cn";

export type StatusPillProps = {
  label: string;
  tone?: "active" | "idle";
  className?: string;
};

export function StatusPill({ label, tone = "active", className }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-[0.18em]",
        tone === "active" ? "text-[#8bd178]" : "text-muted-2",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("h-1.5 w-1.5 rounded-full", tone === "active" ? "bg-[#8bd178]" : "bg-muted-2")}
      />
      {label}
    </span>
  );
}
