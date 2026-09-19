"use client";

import { useEffect, useState } from "react";

type Remaining = { days: number; hours: number; minutes: number; seconds: number };

function getRemaining(target: number): Remaining | null {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

type CountdownProps = {
  /** ISO string — Dates can't cross the server/client boundary as props. */
  deadline: string;
  closedLabel: string;
};

/**
 * Live countdown to the registration deadline. Renders placeholders on the
 * server and first client render (avoids a hydration mismatch), then ticks.
 */
export default function Countdown({ deadline, closedLabel }: CountdownProps) {
  const target = new Date(deadline).getTime();
  const [remaining, setRemaining] = useState<Remaining | null | undefined>(undefined);

  useEffect(() => {
    const tick = () => setRemaining(getRemaining(target));
    const first = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 1000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
    };
  }, [target]);

  if (remaining === null) {
    return <p className="font-heading text-h4 text-white">{closedLabel}</p>;
  }

  const units: [string, number | undefined][] = [
    ["Days", remaining?.days],
    ["Hours", remaining?.hours],
    ["Mins", remaining?.minutes],
    ["Secs", remaining?.seconds],
  ];

  return (
    <div className="grid grid-cols-4 gap-2" role="timer" aria-live="off">
      {units.map(([label, value]) => (
        <div key={label} className="flex flex-col items-center gap-1 rounded-2xl bg-white/[0.07] px-2 py-3 ring-1 ring-inset ring-white/10">
          <span className="font-heading text-h2 tabular-nums text-white">
            {value === undefined ? "--" : String(value).padStart(2, "0")}
          </span>
          <span className="text-eyebrow uppercase text-ink-400">{label}</span>
        </div>
      ))}
    </div>
  );
}
