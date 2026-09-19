import type { Metadata, Viewport } from "next";
import "./globals.css";
import { switzer, bdo_grotesk, switzer_italic } from "./fonts";
import Navbar from "@/components/Navbar";
import CookieBanner from "@/components/CookieConsent";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { MotionProvider } from "@/components/ui";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_TITLE,
  OG_LOCALE,
  SITE_INDEXABLE,
  SITE_NAME,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/site-config";

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();
const bingVerification = process.env.BING_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "education",
  formatDetection: { telephone: false, address: false, email: false },
  // Icons come from file conventions: app/favicon.ico, app/icon.png, app/apple-icon.png.
  robots: SITE_INDEXABLE
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : { index: false, follow: false, googleBot: { index: false, follow: false } },
  // Defaults for routes that don't call pageMetadata(). Share images come from
  // the opengraph-image.tsx file convention, so none are listed here.
  openGraph: {
    type: "website",
    locale: OG_LOCALE,
    url: "/",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  ...(googleVerification || bingVerification
    ? {
        verification: {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
        },
      }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${switzer.variable} ${switzer_italic.variable} ${bdo_grotesk.variable} antialiased`}
    >
      <body>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        {/* First focusable element: lets keyboard and screen-reader users jump past the navigation. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:inline-flex focus:h-12 focus:items-center focus:rounded-button focus:bg-primary-500 focus:px-5 focus:text-body focus:font-medium focus:text-white focus:shadow-lift focus:outline-none focus:ring-4 focus:ring-primary-500/30"
        >
          Skip to main content
        </a>
        <MotionProvider>
          <Navbar />
          {/* Offset for the fixed navbar. tabIndex lets the skip link move focus here in every browser. */}
          <main id="main-content" tabIndex={-1} className="min-h-screen bg-white pt-18 outline-none lg:pt-20">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </MotionProvider>
      </body>
    </html>
  );
}
