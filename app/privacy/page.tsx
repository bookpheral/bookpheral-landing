import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { privacyContent } from "@/content/legal/privacy";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("privacy");

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("privacy")} />
      <LegalDocument title="Privacy Policy" blocks={privacyContent} />
    </>
  );
}
