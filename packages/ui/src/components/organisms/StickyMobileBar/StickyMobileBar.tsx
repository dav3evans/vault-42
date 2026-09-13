import { Button } from "../../atoms/Button/Button";
import { cn } from "../../../lib/cn";

export type StickyMobileBarProps = {
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  className?: string;
};

/** Fixed bottom bar shown only below 760px — hidden on desktop, matching the original design. */
export function StickyMobileBar({ primary, secondary, className }: StickyMobileBarProps) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 hidden border-t border-gold/10 bg-bg/95 px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] backdrop-blur-md max-[760px]:block",
        className,
      )}
    >
      <div className="grid grid-cols-2 gap-2.5">
        <Button href={primary.href} variant="primary" className="justify-center">
          {primary.label}
        </Button>
        <Button href={secondary.href} variant="secondary" className="justify-center">
          {secondary.label}
        </Button>
      </div>
    </div>
  );
}
