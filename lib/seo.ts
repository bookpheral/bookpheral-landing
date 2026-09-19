import type { Metadata } from "next";
import brandIcon from "@/assets/favicons/android-chrome-512x512.png";
import {
  EDUCATOR_REVENUE_SHARE,
  FEC_PRODUCTION_DISCOUNT_PERCENT,
  FEC_SEAT_LIMIT,
  PRODUCTION_SAVING_PERCENT,
  SITE_INDEXABLE,
  SITE_URL,
  contact,
  fecDeadlineLabel,
  routes,
  social,
} from "@/lib/site-config";

/*
  SEO copy and metadata helpers. Page titles and descriptions live here so they
  can be reviewed in one place. Keep titles ≲ 60 characters (the " | Bookpheral"
  suffix is added by the root layout's title template) and descriptions
  ≲ 160 characters.
*/

export const SITE_NAME = "Bookpheral";
export const SITE_TAGLINE = "Protect, Publish & Profit from Your Knowledge";
export const OG_LOCALE = "en_US";

/** Date the marketing copy was last meaningfully changed — used by the sitemap. */
export const CONTENT_LAST_MODIFIED = "2026-09-14";

export const DEFAULT_TITLE = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const DEFAULT_DESCRIPTION = `Bookpheral helps African educators professionally produce, securely distribute, and sell their books. Keep ${EDUCATOR_REVENUE_SHARE}% of net distributable revenue.`;

export const DEFAULT_KEYWORDS = [
  "Bookpheral",
  "educational book publishing Africa",
  "publish a book in Nigeria",
  "sell ebooks Nigeria",
  "lecturer book publishing",
  "academic publishing Nigeria",
  "protected digital distribution",
  "book production services",
  "ISBN registration Nigeria",
  "ebook conversion",
  "educator royalties",
  "anti-piracy ebook distribution",
];

type PageKey = "home" | "about" | "services" | "fec" | "contact" | "terms" | "privacy" | "refund";

type PageSeo = {
  /** Page title without the site suffix. `null` uses DEFAULT_TITLE as-is. */
  title: string | null;
  description: string;
  path: string;
  /** Short label for breadcrumbs. */
  breadcrumb: string;
  keywords?: string[];
};

export const pageSeo: Record<PageKey, PageSeo> = {
  home: {
    title: null,
    description: DEFAULT_DESCRIPTION,
    path: routes.home,
    breadcrumb: "Home",
  },
  about: {
    title: "About Us — Built for African Educators",
    description:
      "Bookpheral is building infrastructure that helps African educators protect, publish, and profit from their knowledge. Read our mission, vision, and principle.",
    path: routes.about,
    breadcrumb: "About",
    keywords: ["about Bookpheral", "educational intellectual property", "African educators"],
  },
  services: {
    title: "Book Distribution & Book Production Services",
    description: `Distribute your finished book with protected digital access and keep ${EDUCATOR_REVENUE_SHARE}% of net revenue, or save up to ${PRODUCTION_SAVING_PERCENT}% on editing, cover design, formatting and ISBNs.`,
    path: routes.services,
    breadcrumb: "Services",
    keywords: [
      "book distribution",
      "professional book production",
      "book editing services Nigeria",
      "cover design",
      "ebook formatting",
      "ISBN registration",
      "institutional content distribution",
    ],
  },
  fec: {
    title: "Founding Educators Circle — Join Before Launch",
    description: `Join the first ${FEC_SEAT_LIMIT} educators on Bookpheral: lifetime founding status, priority visibility, and up to ${FEC_PRODUCTION_DISCOUNT_PERCENT}% off production. Closes ${fecDeadlineLabel}.`,
    path: routes.fec,
    breadcrumb: "Founding Educators Circle",
    keywords: ["Founding Educators Circle", "Bookpheral launch", "educator early access"],
  },
  contact: {
    title: "Contact Us & FAQ",
    description:
      "Questions about publishing, distribution, earnings, piracy protection or institutional partnerships? Contact Bookpheral or browse answers to common questions.",
    path: routes.contact,
    breadcrumb: "Contact",
    keywords: ["contact Bookpheral", "Bookpheral FAQ"],
  },
  terms: {
    title: "Terms and Conditions",
    description:
      "The terms that govern access to and use of the Bookpheral website, platform, and services for educators, readers, and institutions.",
    path: routes.terms,
    breadcrumb: "Terms and Conditions",
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "How Bookpheral collects, uses, stores, shares, and protects personal information, and the data protection rights available to you.",
    path: routes.privacy,
    breadcrumb: "Privacy Policy",
  },
  refund: {
    title: "Refund Policy",
    description:
      "When Bookpheral may provide refunds for digital content purchases, how to request one, and how refunds affect content access and educator earnings.",
    path: routes.refund,
    breadcrumb: "Refund Policy",
  },
};

export function absoluteUrl(path: string): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/**
 * Complete metadata for a page. Next.js merges metadata shallowly, so a page that
 * sets `openGraph` or `twitter` replaces the layout's object entirely — this helper
 * always emits the full objects so every page gets its own share title/description.
 * Share images come from the nearest `opengraph-image.tsx` file convention.
 */
export function pageMetadata(key: PageKey): Metadata {
  const page = pageSeo[key];
  const fullTitle = page.title ? `${page.title} | ${SITE_NAME}` : DEFAULT_TITLE;

  return {
    title: page.title ?? { absolute: DEFAULT_TITLE },
    description: page.description,
    keywords: page.keywords ? [...page.keywords, ...DEFAULT_KEYWORDS] : DEFAULT_KEYWORDS,
    alternates: { canonical: page.path },
    openGraph: {
      type: "website",
      locale: OG_LOCALE,
      siteName: SITE_NAME,
      url: page.path,
      title: fullTitle,
      description: page.description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: page.description,
    },
  };
}

// ─── Structured data (JSON-LD) ─────────────────────────────────────────────

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationJsonLd() {
  const sameAs = [social.instagram, social.linkedin, social.twitter].filter((url): url is string => url !== null);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(brandIcon.src),
    description: DEFAULT_DESCRIPTION,
    slogan: SITE_TAGLINE,
    email: contact.generalEmail,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    areaServed: { "@type": "Place", name: "Africa" },
    contactPoint: [
      { "@type": "ContactPoint", contactType: "customer support", email: contact.supportEmail, availableLanguage: "en" },
      { "@type": "ContactPoint", contactType: "sales", email: contact.generalEmail, availableLanguage: "en" },
      ...(contact.phone
        ? [{ "@type": "ContactPoint", contactType: "customer service", telephone: contact.phone, availableLanguage: "en" }]
        : []),
    ],
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function breadcrumbJsonLd(key: Exclude<PageKey, "home">) {
  const page = pageSeo[key];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: pageSeo.home.breadcrumb, item: absoluteUrl(routes.home) },
      { "@type": "ListItem", position: 2, name: page.breadcrumb, item: absoluteUrl(page.path) },
    ],
  };
}

export function servicesJsonLd() {
  const provider = { "@id": ORGANIZATION_ID };
  const areaServed = { "@type": "Place", name: "Africa" };
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Book Distribution",
      serviceType: "Protected digital book distribution",
      url: absoluteUrl(`${routes.services}#distribution`),
      provider,
      areaServed,
      description: `Controlled digital access, listing and discoverability, payment processing, sales administration and reporting. Educators retain ${EDUCATOR_REVENUE_SHARE}% of net distributable revenue.`,
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Professional Book Production",
      serviceType: "Book production",
      url: absoluteUrl(`${routes.services}#production`),
      provider,
      areaServed,
      description: `Professional editing, cover design, digital formatting and ebook conversion, ISBN registration and production quality assurance — save up to ${PRODUCTION_SAVING_PERCENT}% on standard production costs.`,
    },
  ];
}

export { SITE_INDEXABLE };
