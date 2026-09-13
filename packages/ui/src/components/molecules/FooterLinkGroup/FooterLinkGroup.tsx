import { cn } from "../../../lib/cn";

export type FooterLink = {
  label: string;
  href?: string;
};

export type FooterLinkGroupProps = {
  title: string;
  links: FooterLink[];
  className?: string;
};

export function FooterLinkGroup({ title, links, className }: FooterLinkGroupProps) {
  return (
    <div className={cn(className)}>
      <div className="mb-3 font-display text-[1.1rem] tracking-[0.1em] text-[#f4e8af]">{title}</div>
      <div className="grid gap-2.5">
        {links.map((link) =>
          link.href ? (
            <a key={link.label} href={link.href} className="text-text/62 no-underline">
              {link.label}
            </a>
          ) : (
            <div key={link.label} className="text-text/62">
              {link.label}
            </div>
          ),
        )}
      </div>
    </div>
  );
}
