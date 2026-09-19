import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { FEC_SEAT_LIMIT, FEC_PRODUCTION_DISCOUNT_PERCENT, fecDeadlineLabel } from "@/lib/site-config";

export const alt = `Be one of Bookpheral's first ${FEC_SEAT_LIMIT} educators`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Founding Educators Circle",
    title: `Be one of Bookpheral's first ${FEC_SEAT_LIMIT} educators`,
    subtitle: `Lifetime founding status and up to ${FEC_PRODUCTION_DISCOUNT_PERCENT}% off production. Registration closes ${fecDeadlineLabel}.`,
  });
}
