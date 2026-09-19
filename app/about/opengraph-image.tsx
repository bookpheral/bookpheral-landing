import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Built for African educators";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "About Bookpheral",
    title: "Built for African educators",
    subtitle: "Infrastructure that helps educators protect, publish, and profit from their knowledge.",
  });
}
