import { SocialIcon, type SocialPlatform } from "../../atoms/SocialIcon/SocialIcon";
import { cn } from "../../../lib/cn";

export type SocialLinkItem = {
  label: string;
  platform: SocialPlatform;
  /** Omit while the account doesn't exist yet — renders as a dimmed, unclickable placeholder instead of a dead link. */
  href?: string;
};

export type SocialLinksProps = {
  items: SocialLinkItem[];
  className?: string;
};

export function SocialLinks({ items, className }: SocialLinksProps) {
  return (
    <div className={cn("flex items-center gap-3.5", className)}>
      {items.map((item) =>
        item.href ? (
          <a
            key={item.label}
            href={item.href}
            aria-label={item.label}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text/50 transition-colors duration-150 hover:text-gold"
          >
            <SocialIcon platform={item.platform} className="h-[18px] w-[18px]" />
          </a>
        ) : (
          <span
            key={item.label}
            aria-label={`${item.label} — coming soon`}
            title={`${item.label} — coming soon`}
            className="text-text/20"
          >
            <SocialIcon platform={item.platform} className="h-[18px] w-[18px]" />
          </span>
        ),
      )}
    </div>
  );
}
