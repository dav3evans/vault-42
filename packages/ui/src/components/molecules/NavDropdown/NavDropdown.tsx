import { cn } from "../../../lib/cn";

export type NavDropdownItem = {
  label: string;
  href: string;
};

export type NavDropdownProps = {
  label: string;
  items: NavDropdownItem[];
  className?: string;
};

/**
 * A NavLink-styled trigger that reveals a small menu of sub-links on hover (or keyboard focus) —
 * used for nav items with more than one destination, while the rest aren't live yet.
 * `appearance-none p-0 border-0` strips the browser's default button box model, which otherwise
 * sits taller than a plain NavLink `<a>` and throws off the row's vertical alignment.
 */
export function NavDropdown({ label, items, className }: NavDropdownProps) {
  return (
    <div className={cn("group relative inline-flex items-center", className)}>
      <button
        type="button"
        aria-haspopup="true"
        className="appearance-none border-0 bg-transparent p-0 font-condensed text-[0.78rem] tracking-[0.18em] text-muted uppercase transition-colors duration-150 group-hover:text-gold group-focus-within:text-gold"
      >
        {label}
      </button>
      <div
        role="menu"
        className="invisible absolute left-0 top-full z-30 min-w-[190px] -translate-y-1 border border-gold/14 bg-bg-2/95 opacity-0 shadow-[0_18px_36px_rgba(0,0,0,0.4)] backdrop-blur-md transition-[opacity,transform,visibility] duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
      >
        {items.map((item) => (
          <a
            key={item.label}
            role="menuitem"
            href={item.href}
            className="block px-4 py-1 font-condensed text-[0.78rem] leading-[2.4] tracking-[0.18em] text-muted uppercase no-underline transition-colors duration-150 hover:bg-white/[0.04] hover:text-gold"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
