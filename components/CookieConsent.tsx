"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { Button, cn } from "@/components/ui";
import {
  readConsent,
  resetConsent,
  subscribeConsent,
  writeConsent,
  type ConsentStatus,
} from "@/lib/consent";
import { routes } from "@/lib/site-config";

const PRIVACY_COOKIES_ANCHOR = `${routes.privacy}#10-cookies-and-similar-technologies`;

/** Clears the saved choice, which brings the banner back. */
export function openCookieConsent() {
  resetConsent();
}

/**
 * Current consent: `"accepted"`, `"declined"`, `null` (not chosen yet), or
 * `undefined` during server render / before hydration — render nothing then.
 */
export function useCookieConsent(): ConsentStatus | null | undefined {
  return useSyncExternalStore(subscribeConsent, readConsent, () => undefined);
}

/**
 * Renders children only after the visitor accepts non-essential cookies.
 * Wrap any analytics / marketing scripts in this, e.g.
 *   <ConsentGate><Script src="https://…analytics.js" /></ConsentGate>
 */
export function ConsentGate({ children }: { children: ReactNode }) {
  return useCookieConsent() === "accepted" ? <>{children}</> : null;
}

/** Footer link that reopens the banner so the visitor can change their choice. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieConsent} className={className}>
      Cookie settings
    </button>
  );
}

export default function CookieBanner() {
  const consent = useCookieConsent();
  const [closing, setClosing] = useState(false);
  const pending = useRef<ConsentStatus | null>(null);

  // Let the exit animation play before the choice unmounts the banner.
  useEffect(() => {
    if (!closing) return;
    const timeout = window.setTimeout(() => {
      if (pending.current) writeConsent(pending.current);
      setClosing(false);
    }, 220);
    return () => window.clearTimeout(timeout);
  }, [closing]);

  if (consent !== null) return null;

  const choose = (status: ConsentStatus) => {
    pending.current = status;
    setClosing(true);
  };

  return (
    <section
      role="region"
      aria-label="Cookie consent"
      aria-live="polite"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:inset-x-auto sm:bottom-5 sm:left-5 sm:p-0",
        "transition-[opacity,transform] duration-200 ease-out-quint",
        closing
          ? "translate-y-3 opacity-0"
          : "motion-safe:animate-fade-up [animation-delay:600ms]",
      )}
    >
      <div className="flex w-full flex-col gap-4 rounded-card bg-white p-5 shadow-lift ring-1 ring-ink-200 sm:w-[400px] sm:p-6">
        <div className="flex items-start gap-3">
          <span
            className="hidden md:flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500"
            aria-hidden
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.5 10A7.5 7.5 0 1 1 10 2.5a2.5 2.5 0 0 0 3 3 2.5 2.5 0 0 0 3 3 2.5 2.5 0 0 0 1.5 1.5Z" />
              <path d="M7 8h.01M12 13h.01M7.5 12.5h.01" strokeWidth="2.2" />
            </svg>
          </span>
          <div className="flex flex-col gap-1">
            <p className="font-heading text-h4 text-ink-950">
              We value your privacy
            </p>
            <p className="text-small text-ink-500">
              We use cookies to improve your experience on our site. By clicking
              &apos;Accept&apos;, you agree to our use of cookies. Learn more:{" "}
              <Link
                href={PRIVACY_COOKIES_ANCHOR}
                className="font-medium text-primary-600 underline decoration-primary-200 underline-offset-4 hover:decoration-primary-600"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
        {/* Equal weight on purpose: declining must be as easy as accepting. */}
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => choose("declined")}
            className="w-full"
          >
            Decline
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => choose("accepted")}
            className="w-full"
          >
            Accept
          </Button>
        </div>
      </div>
    </section>
  );
}
