import type { ReactNode } from "react";
import { Eyebrow } from "../../atoms/Eyebrow/Eyebrow";
import { Heading } from "../../atoms/Heading/Heading";
import { NumberedStep } from "../../molecules/NumberedStep/NumberedStep";
import { cn } from "../../../lib/cn";

export type StoryTeaserStep = {
  number: string;
  text: ReactNode;
};

export type StoryTeaserProps = {
  eyebrow: string;
  heading: ReactNode;
  description: ReactNode;
  steps: StoryTeaserStep[];
  /** Media slot for the "organic-divider" image panel — pass an `<img>`/`next/image`. */
  media?: ReactNode;
  className?: string;
};

export function StoryTeaser({ eyebrow, heading, description, steps, media, className }: StoryTeaserProps) {
  return (
    <section className={cn("border-y border-gold/8 bg-bg-2/40 py-[86px]", className)}>
      <div className="mx-auto grid max-w-(--container-max) grid-cols-1 items-center gap-7 px-3.5 lg:grid-cols-[1fr_430px]">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading as="h2" size="section">
            {heading}
          </Heading>
          <p className="mt-4 max-w-[770px] text-[1.03rem] leading-[1.82] text-text/74">{description}</p>
          <div className="mt-6 grid gap-3.5">
            {steps.map((step) => (
              <NumberedStep key={step.number} number={step.number}>
                {step.text}
              </NumberedStep>
            ))}
          </div>
        </div>
        <div className="relative min-h-[420px] overflow-hidden border border-white/5 bg-gradient-to-b from-black/[0.14] to-black/[0.46] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          {media}
        </div>
      </div>
    </section>
  );
}
