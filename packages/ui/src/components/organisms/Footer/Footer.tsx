import type { ReactNode } from "react";
import { Eyebrow } from "../../atoms/Eyebrow/Eyebrow";
import { FooterLinkGroup, type FooterLink } from "../../molecules/FooterLinkGroup/FooterLinkGroup";
import { cn } from "../../../lib/cn";

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type FooterProps = {
  eyebrow: string;
  blurb: ReactNode;
  columns: FooterColumn[];
  copyright: ReactNode;
  className?: string;
};

export function Footer({ eyebrow, blurb, columns, copyright, className }: FooterProps) {
  return (
    <footer className={cn("relative border-t border-white/6 bg-[#060e15] pt-9 pb-28", className)}>
      <div className="mx-auto max-w-(--container-max) px-3.5">
        <div className="grid grid-cols-1 items-start gap-5.5 md:grid-cols-[1.3fr_0.8fr_0.8fr]">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <p className="mt-3 max-w-[500px] leading-[1.72] text-text/58">{blurb}</p>
          </div>
          {columns.map((column) => (
            <FooterLinkGroup key={column.title} title={column.title} links={column.links} />
          ))}
        </div>
        <div className="mt-6 border-t border-white/6 pt-4.5 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-text/36">
          {copyright}
        </div>
      </div>
    </footer>
  );
}
