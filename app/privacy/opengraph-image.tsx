import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Bookpheral Privacy Policy";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Legal",
    title: "Privacy Policy",
    subtitle: "How Bookpheral collects, uses, and protects personal information.",
  });
}
