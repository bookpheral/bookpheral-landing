import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { refundContent } from "@/content/legal/refund";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("refund");

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("refund")} />
      <LegalDocument title="Refund Policy" blocks={refundContent} />
    </>
  );
}
