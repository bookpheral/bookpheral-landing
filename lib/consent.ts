/*
  Cookie consent store (client-side).

  The visitor's choice is saved in a first-party cookie — itself a strictly
  necessary cookie, so it doesn't need consent — which the server can also read
  if it ever needs to. Components subscribe via useSyncExternalStore
  (see useCookieConsent in components/CookieConsent.tsx).

  Bump CONSENT_VERSION when the categories of cookies you ask about change, so
  visitors are asked again.
*/

export type ConsentStatus = "accepted" | "declined";

export const CONSENT_COOKIE = "bp_cookie_consent";
export const CONSENT_VERSION = 1;
/** Re-ask after ~6 months. */
const MAX_AGE_SECONDS = 60 * 60 * 24 * 180;

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribeConsent(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** `null` = the visitor hasn't chosen yet (or the stored choice is from an older version). */
export function readConsent(): ConsentStatus | null {
  const raw = document.cookie
    .split("; ")
    .find((part) => part.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1);
  if (!raw) return null;

  const [version, status] = decodeURIComponent(raw).split(":");
  if (Number(version) !== CONSENT_VERSION) return null;
  return status === "accepted" || status === "declined" ? status : null;
}

export function writeConsent(status: ConsentStatus): void {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(`${CONSENT_VERSION}:${status}`)}; Path=/; Max-Age=${MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
  emit();
}

/** Forget the choice so the banner shows again (used by "Cookie settings"). */
export function resetConsent(): void {
  document.cookie = `${CONSENT_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
  emit();
}
