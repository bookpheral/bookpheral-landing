import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Questions about your book? Let's talk.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Contact & FAQ",
    title: "Questions about your book? Let's talk.",
    subtitle: "Distribution, production, earnings, protection, and institutional partnerships.",
  });
}
