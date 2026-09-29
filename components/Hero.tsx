import type { CSSProperties, ReactNode } from "react";
import HeroImage from "@/components/HeroImage";
import { Badge, Button, cn } from "@/components/ui";
import { launchDateLabel, primaryCta, routes, signInCta } from "@/lib/site-config";

const HEADLINE_LEAD = "The teacher's reward is no longer in heaven; it's now in";
const HEADLINE_BRAND = "Bookpheral!";

const delay = (seconds: number): CSSProperties => ({ animationDelay: `${seconds}s` });

/*
  Entrance motion is pure CSS (see --animate-* in globals.css) so it starts at
  first paint without waiting for hydration. Headline words are always visible —
  only a small upward settle animates — so the h1 never delays LCP.
*/

function Entrance({ children, at, className }: { children: ReactNode; at: number; className?: string }) {
  return (
    <div className={cn("motion-safe:animate-fade-up", className)} style={delay(at)}>
      {children}
    </div>
  );
}

export default function Hero() {
  const words = HEADLINE_LEAD.split(" ");

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background: slowly drifting brand glows over a fading grid (transform-only). */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-[10%] -top-[20%] size-[620px] rounded-full bg-[radial-gradient(closest-side,rgb(1_55_224/0.16),transparent)] blur-2xl motion-safe:animate-drift" />
        <div className="absolute -right-[5%] top-[8%] size-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(128_245_46/0.2),transparent)] blur-2xl motion-safe:animate-drift [animation-delay:-11s]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-ink-200)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-ink-200)_1px,transparent_1px)] bg-[size:64px_64px] opacity-50 [mask-image:radial-gradient(ellipse_70%_55%_at_30%_15%,black,transparent)]" />
      </div>

      <div className="container-page pt-10 pb-16 sm:pt-16 lg:pt-20 lg:pb-24">
        {/* <Entrance at={0}>
          <Badge variant="primary" dot="pulse">
            Launching {launchDateLabel}
          </Badge>
        </Entrance> */}

        <h1 aria-label={`${HEADLINE_LEAD} ${HEADLINE_BRAND}`} className="mt-6 max-w-[1100px] font-heading text-display">
          {words.map((word, i) => (
            <span key={`${word}-${i}`} aria-hidden>
              <span className="inline-block motion-safe:animate-rise" style={delay(0.04 + i * 0.035)}>
                {word}
              </span>{" "}
            </span>
          ))}
          <span aria-hidden className="relative inline-block whitespace-nowrap">
            <span className="inline-block text-primary-500 motion-safe:animate-rise" style={delay(0.04 + words.length * 0.035)}>
              {HEADLINE_BRAND}
            </span>
            {/* Hand-drawn lime underline */}
            <svg
              viewBox="0 0 300 20"
              preserveAspectRatio="none"
              className="absolute -bottom-[0.1em] left-0 -z-10 h-[0.3em] w-full text-accent-400"
            >
              <path
                d="M4 14 C 60 4, 140 4, 296 11"
                pathLength={1}
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="1"
                className="motion-safe:animate-draw"
                style={delay(0.6)}
              />
            </svg>
          </span>
        </h1>

        {/* Asymmetric copy row */}
        <Entrance at={0.25} className="mt-8 max-w-[640px] text-body-lg text-ink-500 lg:mt-10">
          <p>
            Bookpheral is Africa&apos;s first educator-centered platform for publishing and securely distributing
            educational content.
          </p>
        </Entrance>

        {/* Main calls to action — Get Started / Sign In when the app is open, Join the Circle before that. */}
        <Entrance at={0.35} className="mt-8 flex flex-wrap items-center gap-3">
          <Button href={primaryCta.href} size="lg" arrow>
            {primaryCta.label}
          </Button>
          {signInCta && (
            <Button href={signInCta.href} variant="secondary" size="lg">
              {signInCta.label}
            </Button>
          )}
        </Entrance>

        <div className="relative mt-10 motion-safe:animate-rise lg:mt-14" style={delay(0.3)}>
          <HeroImage />

          <div
            className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-5 p-6 motion-safe:animate-fade-up sm:max-w-[560px] sm:p-10 lg:gap-6 lg:p-14"
            style={delay(0.8)}
          >
            <p className="font-heading text-h3 text-white drop-shadow-[0_1px_12px_rgb(11_16_32/0.35)]">
              We help you to protect your work, reach the right readers, and earn from what you create.
            </p>
            <Button href={routes.about} variant="inverse" size="lg" arrow>
              Explore Bookpheral
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
