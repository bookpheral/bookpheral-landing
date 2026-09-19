import type { ReactNode } from "react";
import { cn } from "./cn";

export type SectionTone = "white" | "tint" | "primary" | "ink";

const tones: Record<SectionTone, string> = {
  white: "bg-white",
  // Soft vertical wash instead of a hard colour cut between sections.
  tint: "bg-[linear-gradient(180deg,var(--color-white)_0%,var(--color-ink-50)_14%,var(--color-ink-50)_86%,var(--color-white)_100%)]",
  primary: "bg-primary-500 text-primary-100",
  ink: "bg-ink-950 text-ink-400",
};

const widths = {
  narrow: "max-w-[760px]",
  default: "",
  wide: "",
};

type SectionProps = {
  id?: string;
  /** `light` is kept as an alias of `tint` for existing call sites. */
  tone?: SectionTone | "light";
  spacing?: "default" | "compact" | "none";
  width?: keyof typeof widths;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
};

export function Section({
  id,
  tone = "white",
  spacing = "default",
  width = "default",
  className,
  containerClassName,
  children,
}: SectionProps) {
  const resolvedTone = tone === "light" ? "tint" : tone;
  return (
    <section
      id={id}
      className={cn(
        "relative w-full scroll-mt-24",
        tones[resolvedTone],
        spacing === "default" && "section-y",
        spacing === "compact" && "section-y-sm",
        className,
      )}
    >
      <div className={cn("container-page", containerClassName)}>
        {width === "narrow" ? <div className={cn("mx-auto", widths.narrow)}>{children}</div> : children}
      </div>
    </section>
  );
}
