import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/cn";

const buttonStyles = cva(
  "clip-vault inline-flex items-center justify-center whitespace-nowrap font-display tracking-[0.14em] transition-[filter] duration-150 ease-out",
  {
    variants: {
      variant: {
        primary:
          "min-h-[50px] px-7 text-base text-[#0b1118] bg-gold-fade shadow-[0_8px_22px_rgba(254,207,24,0.18),4px_4px_0_rgba(97,72,0,0.72)] hover:brightness-105",
        secondary:
          "min-h-[50px] px-7 text-base text-text border border-gold/24 bg-bg-2/46 hover:border-gold/50",
        chip: "min-h-[42px] px-[18px] text-sm text-muted bg-white/[0.03] border border-white/[0.07] hover:text-gold",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonStyles>;

type ButtonAsButton = ButtonVariantProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
    className?: string;
    children: ReactNode;
  };

type ButtonAsAnchor = ButtonVariantProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    className?: string;
    children: ReactNode;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

/** Renders an `<a>` when `href` is given, otherwise a `<button>`. Every CTA in the design is a link, so this keeps call sites simple. */
export function Button({ variant, className, children, ...props }: ButtonProps) {
  const classes = cn(buttonStyles({ variant }), className);

  if (props.href) {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
