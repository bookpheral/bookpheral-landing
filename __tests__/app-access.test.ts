import { afterEach, describe, expect, it, vi } from "vitest";

// site-config reads NEXT_PUBLIC_* values at import time, so each test sets the
// env first and then imports a fresh copy of the modules under test.
// (Relative imports: tsconfig excludes __tests__, so the "@/" alias isn't applied here.)
async function load(access?: string, appUrl?: string) {
  vi.resetModules();
  vi.unstubAllEnvs();
  if (access !== undefined) vi.stubEnv("NEXT_PUBLIC_APP_ACCESS", access);
  if (appUrl !== undefined) vi.stubEnv("NEXT_PUBLIC_APP_URL", appUrl);
  vi.stubEnv("NEXT_PUBLIC_SITE_INDEXABLE", "true");

  const config = await import("../lib/site-config");
  const seo = await import("../lib/seo");
  const sitemap = (await import("../app/sitemap")).default;
  return { config, seo, sitemap };
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("waitlist mode (default)", () => {
  it("defaults to waitlist when NEXT_PUBLIC_APP_ACCESS is unset", async () => {
    const { config } = await load();
    expect(config.APP_ACCESS).toBe("waitlist");
    expect(config.APP_OPEN).toBe(false);
  });

  it("treats unknown values as waitlist", async () => {
    const { config } = await load("maybe");
    expect(config.APP_ACCESS).toBe("waitlist");
  });

  it("sends the main button to the Founding Educators Circle and hides Sign In", async () => {
    const { config } = await load("waitlist");
    expect(config.primaryCta).toEqual({ label: "Join the Circle", href: "/founding-educators-circle#join" });
    expect(config.signInCta).toBeNull();
  });

  it("puts the Circle page right under the home page in the sitemap", async () => {
    const { sitemap } = await load("waitlist");
    const fec = sitemap().find((entry) => entry.url.endsWith("/founding-educators-circle"));
    expect(fec).toMatchObject({ priority: 0.9, changeFrequency: "weekly" });
  });

  it("exposes the Circle registration as the site's register action", async () => {
    const { seo } = await load("waitlist");
    const action = seo.websiteJsonLd().potentialAction;
    expect(action["@type"]).toBe("RegisterAction");
    expect(action.target.urlTemplate).toBe("https://bookpheral.com/founding-educators-circle#join");
  });
});

describe("open mode", () => {
  it("accepts the value case-insensitively", async () => {
    const { config } = await load("OPEN");
    expect(config.APP_OPEN).toBe(true);
  });

  it("points Get Started and Sign In at the app", async () => {
    const { config } = await load("open");
    expect(config.primaryCta).toEqual({ label: "Get Started", href: "https://app.bookpheral.com/signup" });
    expect(config.signInCta).toEqual({ label: "Sign In", href: "https://app.bookpheral.com/signin" });
    expect(config.routes.getStarted).toBe("https://app.bookpheral.com/signup");
    expect(config.routes.signIn).toBe("https://app.bookpheral.com/signin");
  });

  it("builds the auth links from NEXT_PUBLIC_APP_URL and trims a trailing slash", async () => {
    const { config } = await load("open", "https://staging.app.example.com/");
    expect(config.routes.signIn).toBe("https://staging.app.example.com/signin");
    expect(config.routes.getStarted).toBe("https://staging.app.example.com/signup");
  });

  it("makes the Circle a supporting page in the sitemap", async () => {
    const { sitemap } = await load("open");
    const fec = sitemap().find((entry) => entry.url.endsWith("/founding-educators-circle"));
    expect(fec).toMatchObject({ priority: 0.7, changeFrequency: "monthly" });
  });

  it("exposes app sign-up as the site's register action", async () => {
    const { seo } = await load("open");
    const action = seo.websiteJsonLd().potentialAction;
    expect(action["@type"]).toBe("RegisterAction");
    expect(action.target.urlTemplate).toBe("https://app.bookpheral.com/signup");
  });

  it("keeps app URLs out of the sitemap (different host)", async () => {
    const { sitemap } = await load("open");
    for (const entry of sitemap()) {
      expect(entry.url.startsWith("https://bookpheral.com")).toBe(true);
    }
  });
});
