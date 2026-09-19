import type { ElementType, ReactNode } from "react";
import { cn } from "./cn";

export type HeadingSize = "display" | "h1" | "h2" | "h3" | "h4";

const headingSizes: Record<HeadingSize, string> = {
  display: "text-display",
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  h4: "text-h4",
};

type HeadingProps = {
  as?: ElementType;
  size?: HeadingSize;
  className?: string;
  children: ReactNode;
  id?: string;
};

/** Heading type ramp. `as` controls semantics, `size` controls appearance. */
export function Heading({ as, size = "h2", className, children, id }: HeadingProps) {
  const Component = as ?? (size === "display" ? "h1" : size);
  return (
    <Component id={id} className={cn("font-heading", headingSizes[size], className)}>
      {children}
    </Component>
  );
}

export type TextSize = "lg" | "body" | "small";
export type TextTone = "default" | "muted" | "strong" | "inverse" | "inverse-muted" | "on-dark";

const textSizes: Record<TextSize, string> = {
  lg: "text-body-lg",
  body: "text-body",
  small: "text-small",
};

const textTones: Record<TextTone, string> = {
  default: "text-ink-700",
  muted: "text-ink-500",
  strong: "text-ink-950 font-medium",
  inverse: "text-white",
  "inverse-muted": "text-primary-100",
  /** Muted copy on ink/dark surfaces. */
  "on-dark": "text-ink-400",
};

type TextProps = {
  as?: ElementType;
  size?: TextSize;
  tone?: TextTone;
  className?: string;
  children: ReactNode;
};

export function Text({ as: Component = "p", size = "body", tone = "default", className, children }: TextProps) {
  return <Component className={cn("font-switzer", textSizes[size], textTones[tone], className)}>{children}</Component>;
}

type EyebrowProps = {
  tone?: "primary" | "inverse" | "muted";
  className?: string;
  children: ReactNode;
};

/**
 * Small contextual label above a heading. Plain text by design — no rule, no
 * uppercase tracking. Use only when it adds information the heading doesn't.
 */
export function Eyebrow({ tone = "primary", className, children }: EyebrowProps) {
  const tones = {
    primary: "text-primary-600",
    inverse: "text-accent-400",
    muted: "text-ink-500",
  };
  return (
    <p
      className={cn(
        "font-switzer text-small font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </p>
  );
}
