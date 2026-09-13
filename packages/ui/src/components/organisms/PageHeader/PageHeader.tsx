import type { ReactNode } from "react";
import { Eyebrow } from "../../atoms/Eyebrow/Eyebrow";
import { Heading } from "../../atoms/Heading/Heading";
import { Button } from "../../atoms/Button/Button";
import { cn } from "../../../lib/cn";

export type PageHeaderAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export type PageHeaderProps = {
  eyebrow: string;
  heading: ReactNode;
  description?: ReactNode;
  actions?: PageHeaderAction[];
  className?: string;
};

/** Smaller banner used at the top of interior pages — Hero is reserved for the homepage. */
export function PageHeader({ eyebrow, heading, description, actions, className }: PageHeaderProps) {
  return (
    <section className={cn("border-b border-gold/8 bg-bg-2/40 py-16", className)}>
      <div className="mx-auto max-w-(--container-max) px-3.5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Heading as="h1" size="section" className="max-w-3xl">
          {heading}
        </Heading>
        {description && <p className="mt-4 max-w-2xl text-[1.03rem] leading-[1.8] text-text/74">{description}</p>}
        {actions && actions.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3.5">
            {actions.map((action) => (
              <Button key={action.label} href={action.href} variant={action.variant ?? "primary"}>
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
