import type { Metadata } from "next";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import type { ReactNode } from "react";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
import { Eyebrow, Heading, PageHeader, Reveal, RevealGroup, RevealItem, Section, Text } from "@/components/ui";
import { faqCategories, faqs } from "@/content/faq";
import { contact } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata("contact");

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer.join(" ") },
  })),
};

const icons: Record<string, ReactNode> = {
  address: <path d="M10 18s6-5.2 6-10A6 6 0 1 0 4 8c0 4.8 6 10 6 10Zm0-7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
  mail: <path d="M3 5.5A1.5 1.5 0 0 1 4.5 4h11A1.5 1.5 0 0 1 17 5.5v9a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 14.5v-9Zm0 .5 7 5 7-5" />,
  support: <path d="M10 17.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Zm0-4.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4.7 4.7l3.2 3.2m4.2 4.2 3.2 3.2m0-10.6-3.2 3.2m-4.2 4.2-3.2 3.2" />,
  phone: <path d="M4.5 3h3l1.5 4-2 1.25a9 9 0 0 0 4.75 4.75L13 11l4 1.5v3a1.5 1.5 0 0 1-1.5 1.5A12.5 12.5 0 0 1 3 4.5 1.5 1.5 0 0 1 4.5 3Z" />,
};

function ContactIcon({ name }: { name: keyof typeof icons }) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500 transition-colors duration-300 group-hover:bg-primary-500 group-hover:text-white">
      <svg aria-hidden viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="size-5">
        {icons[name]}
      </svg>
    </span>
  );
}

export default function ContactPage() {
  const details = [
    { icon: "address", label: "Address", value: contact.address, href: null },
    { icon: "mail", label: "General Enquiries", value: contact.generalEmail, href: `mailto:${contact.generalEmail}` },
    { icon: "support", label: "Support", value: contact.supportEmail, href: `mailto:${contact.supportEmail}` },
    ...(contact.phone
      ? [{ icon: "phone", label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/[^\d+]/g, "")}` }]
      : []),
  ] satisfies { icon: keyof typeof icons; label: string; value: string; href: string | null }[];

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd("contact"), faqJsonLd]} />

      <PageHeader title="Contact Bookpheral">
        <p className="text-ink-950">
          Have a question, need support, or want to speak with us about your book, manuscript, institution, or
          partnership?
        </p>
        <p>We&apos;d be glad to hear from you.</p>
      </PageHeader>

      {/* ─── Get in Touch + form ───────────────────────────────────────── */}
      <Section id="message" spacing="none" className="pb-16 lg:pb-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="pt-6 md:pt-0 flex flex-col gap-8 lg:col-span-5">
            <Reveal className="flex flex-col gap-4">
              <Eyebrow>Get in Touch</Eyebrow>
              <Heading size="h2">Send Us a Message</Heading>
              <Text size="lg" tone="muted">
                Use the contact form and a member of our team will get back to you.
              </Text>
            </Reveal>

            <RevealGroup as="ul" className="flex flex-col gap-3">
              {details.map((detail) => {
                const content = (
                  <>
                    <ContactIcon name={detail.icon} />
                    <span className="flex min-w-0 flex-col">
                      <span className="text-eyebrow uppercase text-ink-500">{detail.label}</span>
                      <span className="mt-1 wrap-break-word text-body text-ink-950">{detail.value}</span>
                    </span>
                  </>
                );
                const baseClass = "group flex items-center gap-4 rounded-card bg-white p-4 ring-1 ring-inset ring-ink-200";
                return (
                  <RevealItem as="li" key={detail.label}>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className={`${baseClass} transition-[box-shadow,transform] duration-300 ease-out-quint hover:-translate-y-0.5 hover:shadow-lift`}
                      >
                        {content}
                      </a>
                    ) : (
                      <div className={baseClass}>{content}</div>
                    )}
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      {/* ─── FAQ ───────────────────────────────────────────────────────── */}
      <Section id="faq" tone="tint">
        <Reveal className="mb-10 flex flex-col gap-4 lg:mb-16 lg:max-w-180">
          <Heading size="h2">Frequently Asked Questions</Heading>
          <Text size="lg" tone="muted">
            {faqs.length} answers across {faqCategories.length} topics. Can&apos;t find yours?{" "}
            <a href="#message" className="font-medium text-primary-500 underline decoration-primary-200 underline-offset-4 transition-colors hover:decoration-primary-500">
              Send us a message
            </a>
            .
          </Text>
        </Reveal>
        <FAQ items={faqs} categories={faqCategories} />
      </Section>
    </>
  );
}
