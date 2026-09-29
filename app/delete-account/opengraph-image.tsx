import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Delete Your Bookpheral Account";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: "Account",
    title: "Delete Your Account",
    subtitle: "How to delete your Bookpheral account, in the app or by request, and what happens to your data.",
  });
}
