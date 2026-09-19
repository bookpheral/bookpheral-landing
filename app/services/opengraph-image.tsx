import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { EDUCATOR_REVENUE_SHARE, PRODUCTION_SAVING_PERCENT } from "@/lib/site-config";

export const alt = "Book distribution & professional production";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Services",
    title: "Book distribution & professional production",
    subtitle: `Keep ${EDUCATOR_REVENUE_SHARE}% of net distributable revenue, or save up to ${PRODUCTION_SAVING_PERCENT}% on production.`,
  });
}
