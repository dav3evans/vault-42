import type { ReactNode } from "react";
import { Eyebrow } from "../../atoms/Eyebrow/Eyebrow";
import { Heading } from "../../atoms/Heading/Heading";
import { Accent } from "../../atoms/Accent/Accent";
import { OutlineText } from "../../atoms/OutlineText/OutlineText";
import { StatusPill } from "../../atoms/StatusPill/StatusPill";
import { Button } from "../../atoms/Button/Button";
import { StatBlock } from "../../molecules/StatBlock/StatBlock";
import { cn } from "../../../lib/cn";

export type HeroStat = {
  value: string;
  label: string;
};

export type HeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

export type HeroCardItem = {
  label: string;
  text: string;
};

export type HeroCard = {
  statusLabel?: string;
  statusNote?: string;
  logo?: ReactNode;
  items?: HeroCardItem[];
  chipActions?: HeroAction[];
};

export type HeroProps = {
  eyebrow: string;
  headingLead: ReactNode;
  headingAccent: ReactNode;
  headingOutline?: ReactNode;
  lead: ReactNode;
  sub?: ReactNode;
  actions: HeroAction[];
  stats?: HeroStat[];
  card?: HeroCard;
  /** Optional CSS background-image value, e.g. `url(/hero.webp)`. Left transparent by default. */
  backgroundImage?: string;
  className?: string;
};

export function Hero({
  eyebrow,
  headingLead,
  headingAccent,
  headingOutline,
  lead,
  sub,
  actions,
  stats,
  card,
  backgroundImage,
  className,
}: HeroProps) {
  return (
    <section
      className={cn("relative overflow-hidden bg-bg py-9", className)}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(90deg, rgba(4,8,12,0.88) 0%, rgba(4,8,12,0.74) 38%, rgba(4,8,12,0.56) 68%, rgba(4,8,12,0.84) 100%), ${backgroundImage}`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      <div className="relative z-[2] mx-auto grid max-w-(--container-max) grid-cols-1 items-start gap-8 px-3.5 pt-8 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="pt-5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading as="h1" size="hero">
            {headingLead} <Accent>{headingAccent}</Accent>
            {headingOutline && <OutlineText>{headingOutline}</OutlineText>}
          </Heading>
          <p className="mt-4 max-w-[690px] text-[1.14rem] leading-[1.75] text-[#d7deea]">{lead}</p>
          {sub && <p className="mt-3 max-w-[660px] text-base leading-[1.82] text-text/74">{sub}</p>}
          <div className="mt-7 flex flex-wrap gap-3.5">
            {actions.map((action) => (
              <Button key={action.label} href={action.href} variant={action.variant ?? "primary"}>
                {action.label}
              </Button>
            ))}
          </div>
          {stats && stats.length > 0 && (
            <div className="mt-7 grid max-w-[760px] grid-cols-1 gap-3.5 sm:grid-cols-3">
              {stats.map((stat) => (
                <StatBlock key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          )}
        </div>

        {card && (
          <aside
            aria-label="At a glance"
            className="relative w-full max-w-[430px] justify-self-start overflow-hidden rounded-[18px] border border-gold/12 bg-gradient-to-b from-[rgba(10,20,30,0.86)] to-[rgba(8,15,22,0.92)] shadow-[0_26px_60px_rgba(0,0,0,0.38)] lg:justify-self-end"
          >
            {(card.statusLabel || card.statusNote) && (
              <div className="flex items-center justify-between gap-3.5 border-b border-gold/10 px-5 py-4">
                {card.statusLabel && (
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.26em] text-gold">
                    {card.statusLabel}
                  </span>
                )}
                {card.statusNote && <StatusPill label={card.statusNote} />}
              </div>
            )}
            {card.logo && <div className="px-6 pt-6 pb-3.5">{card.logo}</div>}
            <div className="grid gap-3 px-6 pb-6">
              {card.items?.map((item) => (
                <p key={item.label} className="text-[0.96rem] leading-[1.72] text-text/74">
                  <strong className="text-text">{item.label}:</strong> {item.text}
                </p>
              ))}
              {card.chipActions && card.chipActions.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {card.chipActions.map((action) => (
                    <Button key={action.label} href={action.href} variant="chip">
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}
