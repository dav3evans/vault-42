import type { ReactNode } from "react";
import { Panel } from "../../molecules/Panel/Panel";
import { Tag } from "../../atoms/Tag/Tag";
import { Heading } from "../../atoms/Heading/Heading";
import { BulletList } from "../../molecules/BulletList/BulletList";
import { Button, type ButtonProps } from "../../atoms/Button/Button";
import { cn } from "../../../lib/cn";

export type CtaCardAction = {
  label: string;
  href: string;
  variant?: Extract<ButtonProps["variant"], "primary" | "secondary">;
};

export type CtaCardProps = {
  tag?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  bullets?: ReactNode[];
  actions?: CtaCardAction[];
  className?: string;
};

/**
 * The card built from smaller atoms/molecules: a Tag, a Heading, a BulletList
 * and one or more Buttons, composed inside a Panel. Mirrors the "exp-card" /
 * experience CTA blocks from the original design reference.
 */
export function CtaCard({ tag, title, description, bullets, actions, className }: CtaCardProps) {
  return (
    <Panel className={cn("h-full", className)} innerClassName="flex h-full flex-col">
      {tag && (
        <Tag tone="gold" className="mb-3 block">
          {tag}
        </Tag>
      )}
      <Heading as="h3" size="card" className="mb-3">
        {title}
      </Heading>
      <p className="text-[0.97rem] leading-[1.75] text-text/72">{description}</p>
      {bullets && bullets.length > 0 && <BulletList items={bullets} className="mt-4" />}
      {actions && actions.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-2.5 pt-5">
          {actions.map((action) => (
            <Button key={action.label} href={action.href} variant={action.variant ?? "primary"}>
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </Panel>
  );
}
