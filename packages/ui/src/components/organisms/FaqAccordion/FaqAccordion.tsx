import { cn } from "../../../lib/cn";

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqAccordionProps = {
  items: FaqItem[];
  className?: string;
};

/** Native <details>/<summary> accordion — no JS needed, works with keyboard and screen readers out of the box. */
export function FaqAccordion({ items, className }: FaqAccordionProps) {
  return (
    <div className={cn("grid gap-3", className)}>
      {items.map((item) => (
        <details
          key={item.question}
          className="group border border-white/5 bg-white/[0.02] px-5 py-4 open:bg-white/[0.03]"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-[1.15rem] tracking-[0.02em] text-text marker:content-none">
            {item.question}
            <span aria-hidden className="text-gold transition-transform duration-150 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 text-[0.95rem] leading-[1.72] text-text/70">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
