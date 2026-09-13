import { Button } from "../../atoms/Button/Button";
import { Tag } from "../../atoms/Tag/Tag";
import { cn } from "../../../lib/cn";

export type JobListingCardProps = {
  title: string;
  type: string;
  location: string;
  href: string;
  className?: string;
};

export function JobListingCard({ title, type, location, href, className }: JobListingCardProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 border border-white/5 bg-white/[0.03] p-5",
        className,
      )}
    >
      <div>
        <strong className="block font-display text-[1.3rem] tracking-[0.04em] text-text">{title}</strong>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <Tag tone="muted">{location}</Tag>
          <Tag tone="gold">{type}</Tag>
        </div>
      </div>
      <Button href={href} variant="secondary" size="sm">
        View role
      </Button>
    </div>
  );
}
