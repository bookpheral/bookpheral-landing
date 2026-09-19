import type { ReactNode } from "react";
import { cn } from "./cn";

export type BadgeVariant = "primary" | "accent" | "neutral" | "inverse" | "success" | "warning" | "error";

const variants: Record<BadgeVariant, { badge: string; dot: string }> = {
  primary: { badge: "bg-primary-50 text-primary-700 ring-1 ring-inset ring-primary-100", dot: "bg-primary-500" },
  accent: { badge: "bg-accent-400 text-primary-900", dot: "bg-primary-700" },
  neutral: { badge: "bg-ink-100 text-ink-700 ring-1 ring-inset ring-ink-200", dot: "bg-ink-500" },
  inverse: { badge: "bg-white/10 text-white ring-1 ring-inset ring-white/20", dot: "bg-accent-400" },
  success: { badge: "bg-success-50 text-success-600 ring-1 ring-inset ring-success-600/15", dot: "bg-success-600" },
  warning: { badge: "bg-warning-50 text-warning-600 ring-1 ring-inset ring-warning-600/15", dot: "bg-warning-600" },
  error: { badge: "bg-error-50 text-error-600 ring-1 ring-inset ring-error-600/15", dot: "bg-error-600" },
};

type BadgeProps = {
  variant?: BadgeVariant;
  /** Small status dot; `pulse` adds a soft ping (disabled for reduced motion). */
  dot?: boolean | "pulse";
  className?: string;
  children: ReactNode;
};

export function Badge({ variant = "primary", dot = false, className, children }: BadgeProps) {
  const styles = variants[variant];
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 font-switzer text-eyebrow uppercase",
        styles.badge,
        className,
      )}
    >
      {dot && (
        <span className="relative hidden size-1.5" aria-hidden>
          {dot === "pulse" && (
            <span className={cn("absolute inline-flex size-full rounded-full opacity-60 animate-ping motion-reduce:hidden", styles.dot)} />
          )}
          <span className={cn("relative inline-flex size-1.5 rounded-full", styles.dot)} />
        </span>
      )}
      {children}
    </span>
  );
}
