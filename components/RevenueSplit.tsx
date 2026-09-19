"use client";

import * as m from "motion/react-m";
import { EASE_OUT_QUINT } from "@/components/ui/Motion";

type RevenueSplitProps = {
  educator: number;
  platform: number;
  /** `dark` for use on primary/ink surfaces. */
  tone?: "light" | "dark";
};

const tones = {
  light: {
    educator: "bg-primary-500",
    educatorText: "text-white",
    platform: "bg-ink-200",
    platformText: "text-ink-700",
    caption: "text-ink-500",
  },
  dark: {
    educator: "bg-white",
    educatorText: "text-primary-600",
    platform: "bg-white/15",
    platformText: "text-white",
    caption: "text-primary-100",
  },
};

/** Horizontal 70/30 bar that fills in (scaleX) when scrolled into view. */
export default function RevenueSplit({ educator, platform, tone = "light" }: RevenueSplitProps) {
  const t = tones[tone];
  return (
    <figure className="flex flex-col gap-4">
      {/* The wrapper is observed — scaled-to-zero children have no area to intersect. */}
      <m.div
        className="flex h-14 w-full gap-1.5 overflow-hidden rounded-button"
        role="img"
        aria-label={`Revenue split: ${educator}% to the educator, ${platform}% to Bookpheral`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
      >
        <m.div
          className={`flex origin-left items-center rounded-button px-4 ${t.educator}`}
          style={{ width: `${educator}%` }}
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1, transition: { duration: 1, ease: EASE_OUT_QUINT } },
          }}
        >
          <span className={`font-heading text-h4 ${t.educatorText}`}>{educator}%</span>
        </m.div>
        <m.div
          className={`flex origin-left items-center rounded-button px-4 ${t.platform}`}
          style={{ width: `${platform}%` }}
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1, transition: { duration: 1, ease: EASE_OUT_QUINT, delay: 0.15 } },
          }}
        >
          <span className={`font-heading text-h4 ${t.platformText}`}>{platform}%</span>
        </m.div>
      </m.div>
      <figcaption className={`flex justify-between text-small ${t.caption}`}>
        <span>Educator</span>
        <span>Bookpheral</span>
      </figcaption>
    </figure>
  );
}
