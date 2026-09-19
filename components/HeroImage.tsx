"use client";

import { useReducedMotion, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import Image from "next/image";
import { useRef, useSyncExternalStore } from "react";

const DESKTOP_QUERY = "(min-width: 64rem)";

function subscribeDesktop(callback: () => void) {
  const mql = window.matchMedia(DESKTOP_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

/** Scroll-linked parallax on large screens only; static on phones, tablets and reduced motion. */
export default function HeroImage() {
  const frameRef = useRef<HTMLDivElement>(null);
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
  const reducedMotion = useReducedMotion();
  const parallax = isDesktop && !reducedMotion;

  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div
      ref={frameRef}
      className="relative aspect-[3/4] overflow-hidden rounded-panel bg-ink-100 shadow-lift sm:aspect-[16/9] lg:aspect-[21/9]"
    >
      <m.div className="absolute inset-x-0 -inset-y-[8%]" style={{ y: parallax ? y : 0 }}>
        <Image
          src="/images/hero-image.jpg"
          alt="An educator working on a laptop in a library"
          fill
          priority
          sizes="(min-width: 1296px) 1200px, 100vw"
          className="object-cover object-[65%_40%]"
        />
      </m.div>
      {/* Legibility wash behind the overlaid intro line and CTA */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,transparent_25%,rgb(11_16_32/0.35)_55%,rgb(11_16_32/0.78))] sm:bg-[linear-gradient(10deg,rgb(11_16_32/0.72)_0%,rgb(11_16_32/0.45)_42%,transparent_72%)]"
      />
    </div>
  );
}
