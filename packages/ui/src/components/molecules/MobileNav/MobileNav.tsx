"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../../lib/cn";

export type MobileNavFlatLink = {
  label: string;
  href: string;
};

export type MobileNavItem = MobileNavFlatLink | { label: string; href?: undefined; items: MobileNavFlatLink[] };

export type MobileNavProps = {
  links: MobileNavItem[];
  className?: string;
};

/**
 * Hamburger trigger + full-screen slide-down menu, shown only where the desktop nav hides
 * (below 521px). The overlay is rendered through a portal straight into `document.body`:
 * the header has `backdrop-blur` (a `backdrop-filter`), which — like `transform` — creates a
 * new containing block for fixed-position descendants, so a `position: fixed` overlay nested
 * inside the header sizes itself against the header's own small box instead of the viewport.
 * Portaling escapes that, and gives the overlay its own close button rather than relying on
 * the (now-covered) header trigger to double as one.
 */
export function MobileNav({ links, className }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  const flatLinks: MobileNavFlatLink[] = links.flatMap((link) => ("items" in link ? link.items : [link]));

  return (
    <div className={cn("min-[521px]:hidden", className)}>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="flex h-9 w-9 flex-col items-center justify-center gap-[5px]"
      >
        <span aria-hidden className="block h-[2px] w-5 bg-text" />
        <span aria-hidden className="block h-[2px] w-5 bg-text" />
        <span aria-hidden className="block h-[2px] w-5 bg-text" />
      </button>

      {open &&
        createPortal(
          <nav aria-label="Mobile navigation" className="fixed inset-0 z-[25] overflow-y-auto bg-bg">
            <div className="flex justify-end px-3.5 py-2.5">
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="relative flex h-9 w-9 items-center justify-center"
              >
                <span aria-hidden className="absolute h-[2px] w-5 rotate-45 bg-text" />
                <span aria-hidden className="absolute h-[2px] w-5 -rotate-45 bg-text" />
              </button>
            </div>
            <div className="mx-auto flex w-full max-w-sm flex-col gap-1 px-6 pt-6 pb-28">
              {flatLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/6 py-4 font-display text-[1.3rem] tracking-[0.04em] text-text no-underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>,
          document.body,
        )}
    </div>
  );
}
