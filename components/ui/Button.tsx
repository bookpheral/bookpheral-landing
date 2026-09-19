import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "./cn";

export type ButtonVariant = "primary" | "secondary" | "accent" | "ghost" | "inverse" | "inverse-outline";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group/button relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-switzer font-medium tracking-[-0.01em] rounded-button " +
  "transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out-quint " +
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] motion-reduce:hover:translate-y-0 " +
  "disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary-500 text-white shadow-soft hover:bg-primary-600 hover:shadow-glow",
  secondary: "bg-white text-ink-950 border border-ink-200 shadow-soft hover:border-ink-300 hover:shadow-lift",
  accent: "bg-accent-400 text-primary-900 hover:bg-accent-300 hover:shadow-[0_12px_32px_-8px_rgb(128_245_46/0.55)]",
  ghost: "text-ink-950 hover:bg-ink-100",
  inverse: "bg-white text-primary-700 hover:shadow-lift",
  "inverse-outline": "text-white border border-white/25 hover:bg-white/10 hover:border-white/40",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-small",
  md: "h-12 px-6 text-body",
  lg: "h-14 px-7 text-body",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Trailing arrow that nudges right on hover. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

function Arrow() {
  return (
    <svg
      aria-hidden
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="shrink-0 transition-transform duration-200 ease-out-quint group-hover/button:translate-x-0.5"
    >
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: { variant?: ButtonVariant; size?: ButtonSize; className?: string | undefined } = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button(props: ButtonProps) {
  const { variant, size, arrow, className, children, ...rest } = props;
  const classes = buttonClasses({ variant, size, className });
  const content = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest as Omit<ButtonAsLink, keyof CommonProps>;
    if (/^(https?:|mailto:|tel:)/.test(href)) {
      return (
        <a href={href} className={classes} {...anchorProps}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {content}
      </Link>
    );
  }

  const buttonProps = rest as Omit<ButtonAsButton, keyof CommonProps>;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
