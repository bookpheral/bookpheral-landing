import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Protect, Publish & Profit from Your Knowledge";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "For African Educators",
    title: "Protect, Publish & Profit from Your Knowledge",
    subtitle: "Bookpheral helps educators professionally produce, securely distribute, and sell their books.",
  });
}
