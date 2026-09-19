import type { ElementType, ReactNode } from "react";
import { cn } from "./cn";

export type CardVariant = "default" | "tint" | "primary" | "ink" | "accent" | "glass";
export type CardPadding = "none" | "sm" | "md" | "lg";

const variants: Record<CardVariant, string> = {
  default: "bg-white border border-ink-200",
  tint: "bg-ink-50 border border-ink-100",
  primary: "bg-primary-500 text-primary-100 [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white",
  ink: "bg-ink-950 text-ink-400 [&_h2]:text-white [&_h3]:text-white [&_h4]:text-white",
  accent: "bg-accent-400 text-primary-900 [&_h2]:text-primary-900 [&_h3]:text-primary-900",
  glass: "bg-white/70 border border-white/60 backdrop-blur-xl",
};

const paddings: Record<CardPadding, string> = {
  none: "",
  sm: "p-5 sm:p-6",
  md: "p-6 sm:p-8",
  lg: "p-8 sm:p-10 lg:p-12",
};

const interactiveByVariant: Record<CardVariant, string> = {
  default: "hover:border-primary-200 hover:shadow-lift",
  tint: "hover:bg-white hover:border-primary-100 hover:shadow-lift",
  primary: "hover:shadow-glow",
  ink: "hover:shadow-lift",
  accent: "hover:shadow-lift",
  glass: "hover:shadow-lift",
};

type CardProps = {
  as?: ElementType;
  variant?: CardVariant;
  padding?: CardPadding;
  /** Lift + shadow on hover. Use for cards that are, or contain, a primary link. */
  interactive?: boolean;
  className?: string;
  children: ReactNode;
};

export function Card({
  as: Component = "div",
  variant = "default",
  padding = "md",
  interactive = false,
  className,
  children,
}: CardProps) {
  return (
    <Component
      className={cn(
        "relative overflow-hidden rounded-card",
        variants[variant],
        paddings[padding],
        interactive &&
          cn(
            "transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out-quint hover:-translate-y-1 motion-reduce:hover:translate-y-0",
            interactiveByVariant[variant],
          ),
        className,
      )}
    >
      {children}
    </Component>
  );
}
