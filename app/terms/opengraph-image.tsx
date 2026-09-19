import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Bookpheral Terms and Conditions";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Legal",
    title: "Terms and Conditions",
    subtitle: "The terms that govern use of the Bookpheral platform and services.",
  });
}
