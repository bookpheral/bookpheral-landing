import type { MetadataRoute } from "next";
import androidChrome192 from "@/assets/favicons/android-chrome-192x192.png";
import androidChrome512 from "@/assets/favicons/android-chrome-512x512.png";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — ${SITE_TAGLINE}`,
    short_name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0137e0",
    categories: ["education", "books"],
    icons: [
      {
        src: androidChrome192.src,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: androidChrome512.src,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
