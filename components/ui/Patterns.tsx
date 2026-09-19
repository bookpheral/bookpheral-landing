import type { ReactNode } from "react";
import { Button, type ButtonVariant } from "./Button";
import { cn } from "./cn";
import { Eyebrow, Heading } from "./Typography";

/*
  Composite patterns built on the primitives. These keep the API the pages
  already use (ButtonLink, SectionHeading, Prose, Callout, PageHeader, CheckList).
*/

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Extract<ButtonVariant, "primary" | "secondary" | "accent">;
  className?: string;
};

export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  return (
    <Button href={href} variant={variant} size="lg" arrow={variant !== "secondary"} className={className}>
      {children}
    </Button>
  );
}

export function SectionHeading({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Heading as="h2" size="h2" className={className}>
      {children}
    </Heading>
  );
}

/** Long-form copy block. Emphasise lines inside with `text-ink-950 font-medium`. */
export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 font-switzer text-body-lg text-ink-500",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Punchy single sentence from the copy, set as a heading-weight pull line. */
export function Callout({ children }: { children: ReactNode }) {
  return <p className="font-heading text-h4 text-ink-950">{children}</p>;
}

type PageHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
};

export function PageHeader({ eyebrow, title, children }: PageHeaderProps) {
  return (
    <header className="relative isolate overflow-hidden">
      {/* Soft brand glow + fading grid — decorative, transform-only drift. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-30%] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(1_55_224/0.14),transparent)] blur-2xl motion-safe:animate-drift" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-ink-200)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-ink-200)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      </div>

      <div className="container-page pt-16 pb-16 sm:pt-20 lg:pt-28 lg:pb-24">
        <div className="mx-auto flex max-w-[860px] flex-col items-center gap-6 text-center">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <Heading as="h1" size="h1" className="lg:text-[3.75rem]">
            {title}
          </Heading>
          {children && (
            <div className="flex max-w-[700px] flex-col gap-4 font-switzer text-body-lg text-ink-500">
              {children}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 font-switzer text-body text-ink-950">
          <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-400" aria-hidden>
            <svg width="10" height="8" viewBox="0 0 14 10" fill="none">
              <path d="M1 5L5 9L13 1" stroke="var(--color-primary-900)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
