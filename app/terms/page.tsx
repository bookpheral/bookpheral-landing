import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { termsContent } from "@/content/legal/terms";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("terms");

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("terms")} />
      <LegalDocument title="Terms and Conditions" blocks={termsContent} />
    </>
  );
}
