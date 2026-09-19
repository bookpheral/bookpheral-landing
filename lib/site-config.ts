// Central site configuration. Anything that varies per deployment, or that the
// founders may change without a code change (contact details, dates, links),
// is read from env here — import from this module instead of reading
// process.env directly in components.
//
// NEXT_PUBLIC_* values are inlined at build time, so a rebuild is needed after
// changing them.

function env(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

function optionalEnv(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export const SITE_URL = env(process.env.NEXT_PUBLIC_SITE_URL, "https://bookpheral.com").replace(/\/$/, "");

// Set to "false" on staging/preview deployments so search engines don't index them
// (robots.txt disallows everything and pages get a noindex meta tag).
export const SITE_INDEXABLE = env(process.env.NEXT_PUBLIC_SITE_INDEXABLE, "true") !== "false";

// The dashboard app (apps/app). Used for "Distribute Your Book"-style CTAs.
export const APP_URL = env(process.env.NEXT_PUBLIC_APP_URL, "https://app.bookpheral.com").replace(/\/$/, "");

export const contact = {
  address: env(process.env.NEXT_PUBLIC_CONTACT_ADDRESS, "42 Local Airport Road, Ikeja, 100271, Lagos"),
  generalEmail: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL, "info@bookpheral.com"),
  supportEmail: env(process.env.NEXT_PUBLIC_SUPPORT_EMAIL, "support@bookpheral.com"),
  // No phone number has been provided yet — hidden until set.
  phone: optionalEnv(process.env.NEXT_PUBLIC_CONTACT_PHONE),
};

export const social = {
  instagram: optionalEnv(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  linkedin: optionalEnv(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  twitter: optionalEnv(process.env.NEXT_PUBLIC_TWITTER_URL),
  facebook: optionalEnv(process.env.NEXT_PUBLIC_FACEBOOK_URL),
};

// ─── Launch & Founding Educators Circle ─────────────────────────────────────
// ISO 8601 with offset. Lagos is UTC+1 (WAT) year-round.

export const LAUNCH_DATE = new Date(env(process.env.NEXT_PUBLIC_LAUNCH_DATE, "2026-11-02T00:00:00+01:00"));

export const FEC_REGISTRATION_DEADLINE = new Date(
  env(process.env.NEXT_PUBLIC_FEC_REGISTRATION_DEADLINE, "2026-10-26T23:59:00+01:00"),
);

export const FEC_SEAT_LIMIT = Number(env(process.env.NEXT_PUBLIC_FEC_SEAT_LIMIT, "100"));

// ─── Commercial terms (copy facts) ──────────────────────────────────────────

export const EDUCATOR_REVENUE_SHARE = 70;
export const PLATFORM_REVENUE_SHARE = 100 - EDUCATOR_REVENUE_SHARE;
export const PRODUCTION_SAVING_PERCENT = 55;
export const FEC_PRODUCTION_DISCOUNT_PERCENT = 70;

// ─── Legal ──────────────────────────────────────────────────────────────────
// "Last Updated" date shown on Terms / Privacy / Refund pages. Hidden until set,
// because it is a legal effective date that needs founder sign-off.

export const LEGAL_LAST_UPDATED = optionalEnv(process.env.NEXT_PUBLIC_LEGAL_LAST_UPDATED);

// ─── Formatting helpers ─────────────────────────────────────────────────────

const TIME_ZONE = "Africa/Lagos";

/** e.g. "November 2, 2026" */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: TIME_ZONE,
  }).format(date);
}

/** e.g. "October 26" */
export function formatMonthDay(date: Date): string {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", timeZone: TIME_ZONE }).format(date);
}

/** e.g. "11:59 p.m." */
export function formatTime(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: TIME_ZONE,
  }).formatToParts(date);
  const hour = parts.find((p) => p.type === "hour")?.value ?? "";
  const minute = parts.find((p) => p.type === "minute")?.value ?? "";
  const period = parts.find((p) => p.type === "dayPeriod")?.value.toLowerCase() === "am" ? "a.m." : "p.m.";
  return `${hour}:${minute} ${period}`;
}

export const launchDateLabel = formatDate(LAUNCH_DATE);
export const fecDeadlineLabel = formatDate(FEC_REGISTRATION_DEADLINE);
export const fecDeadlineShortLabel = formatMonthDay(FEC_REGISTRATION_DEADLINE);
export const fecDeadlineTimeLabel = formatTime(FEC_REGISTRATION_DEADLINE);

export const routes = {
  home: "/",
  about: "/about",
  services: "/services",
  fec: "/founding-educators-circle",
  contact: "/contact",
  terms: "/terms",
  privacy: "/privacy",
  refund: "/refund-policy",
  signIn: "https://preview.app.bookpheral.com/signin",
  getStarted: "https://preview.app.bookpheral.com/signup",
} as const;
