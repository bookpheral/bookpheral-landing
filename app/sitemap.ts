import type { MetadataRoute } from "next";
import { CONTENT_LAST_MODIFIED, absoluteUrl, pageSeo } from "@/lib/seo";
import { LEGAL_LAST_UPDATED, SITE_INDEXABLE } from "@/lib/site-config";

type Entry = {
  key: keyof typeof pageSeo;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  images?: string[];
};

const entries: Entry[] = [
  { key: "home", priority: 1, changeFrequency: "weekly", images: ["/images/hero-image.jpg"] },
  { key: "fec", priority: 0.9, changeFrequency: "weekly" },
  { key: "services", priority: 0.8, changeFrequency: "monthly" },
  { key: "about", priority: 0.7, changeFrequency: "monthly" },
  { key: "contact", priority: 0.6, changeFrequency: "monthly" },
  { key: "terms", priority: 0.3, changeFrequency: "yearly" },
  { key: "privacy", priority: 0.3, changeFrequency: "yearly" },
  { key: "refund", priority: 0.3, changeFrequency: "yearly" },
];

const LEGAL_KEYS = new Set<Entry["key"]>(["terms", "privacy", "refund"]);

/** Legal pages use their "Last Updated" date when it's set and parseable. */
function lastModifiedFor(key: Entry["key"]): string {
  if (LEGAL_KEYS.has(key) && LEGAL_LAST_UPDATED) {
    const parsed = new Date(LEGAL_LAST_UPDATED);
    if (!Number.isNaN(parsed.getTime())) return parsed.toISOString();
  }
  return CONTENT_LAST_MODIFIED;
}

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_INDEXABLE) return [];

  return entries.map(({ key, priority, changeFrequency, images }) => ({
    url: absoluteUrl(pageSeo[key].path),
    lastModified: lastModifiedFor(key),
    changeFrequency,
    priority,
    ...(images ? { images: images.map(absoluteUrl) } : {}),
  }));
}
