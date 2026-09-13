import { Button, type ButtonProps } from "../../atoms/Button/Button";
import { cn } from "../../../lib/cn";

export type ActionRowProps = {
  title: string;
  description: string;
  actionLabel: string;
  href: string;
  variant?: Extract<ButtonProps["variant"], "primary" | "secondary">;
  className?: string;
};

/** A title + description on the left, a Button on the right — used in the "Book now" panel. */
export function ActionRow({ title, description, actionLabel, href, variant = "primary", className }: ActionRowProps) {
  return (
    <div className={cn("flex items-center justify-between gap-4 border border-white/5 bg-white/[0.03] p-4", className)}>
      <div>
        <strong className="block font-display text-[1.35rem] tracking-[0.04em] text-text">{title}</strong>
        <span className="mt-1 block text-[0.92rem] text-text/66">{description}</span>
      </div>
      <Button href={href} variant={variant} size="sm">
        {actionLabel}
      </Button>
    </div>
  );
}
