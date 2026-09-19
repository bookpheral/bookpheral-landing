import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Bookpheral Refund Policy";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Legal",
    title: "Refund Policy",
    subtitle: "When refunds are available for purchases made through Bookpheral.",
  });
}
