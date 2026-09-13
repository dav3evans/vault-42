import type { ReactNode } from "react";
import { Brand } from "../../atoms/Brand/Brand";
import { NavLink } from "../../atoms/NavLink/NavLink";
import { Button } from "../../atoms/Button/Button";
import { cn } from "../../../lib/cn";

export type HeaderNavItem = {
  label: string;
  href: string;
};

export type HeaderProps = {
  brandTitle: string;
  brandSubtitle?: string;
  logo?: ReactNode;
  links: HeaderNavItem[];
  bookHref?: string;
  className?: string;
};

export function Header({ brandTitle, brandSubtitle, logo, links, bookHref = "#book", className }: HeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-20 border-b border-gold/10 bg-bg/95 shadow-[0_10px_26px_rgba(0,0,0,0.25)] backdrop-blur-md",
        className,
      )}
    >
      <div className="mx-auto flex max-w-(--container-max) flex-col items-start gap-3 px-3.5 py-2.5 max-[760px]:items-start min-[760px]:min-h-[74px] min-[760px]:flex-row min-[760px]:items-center min-[760px]:justify-between">
        <Brand title={brandTitle} subtitle={brandSubtitle} logo={logo} href="#top" />
        {/* Below 520px the sticky mobile bar takes over booking, so the full nav (including Book Now) hides here. */}
        <nav
          aria-label="Primary navigation"
          className="flex w-full flex-wrap items-center gap-3.5 max-[520px]:hidden min-[760px]:w-auto min-[760px]:justify-end"
        >
          {links.map((link) => (
            <NavLink key={link.label} href={link.href}>
              {link.label}
            </NavLink>
          ))}
          <Button href={bookHref} size="sm">
            Book Now
          </Button>
        </nav>
      </div>
    </header>
  );
}
