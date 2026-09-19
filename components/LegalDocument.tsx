import Link from "next/link";
import type { LegalBlock } from "@/content/legal/types";
import { Heading, cn } from "@/components/ui";
import { LEGAL_LAST_UPDATED, contact, routes } from "@/lib/site-config";

type LegalDocumentProps = {
  title: string;
  blocks: LegalBlock[];
};

const legalDocs = [
  { href: routes.terms, label: "Terms and Conditions" },
  { href: routes.privacy, label: "Privacy Policy" },
  { href: routes.refund, label: "Refund Policy" },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function ContactDetails({ channels }: { channels: ("general" | "support")[] }) {
  const rows = [
    channels.includes("general") && { label: "General Enquiries", email: contact.generalEmail },
    channels.includes("support") && { label: "Support", email: contact.supportEmail },
  ].filter((row): row is { label: string; email: string } => Boolean(row));

  return (
    <div className="my-2 flex flex-col divide-y divide-ink-200 rounded-card bg-ink-50 ring-1 ring-inset ring-ink-200">
      {rows.map((row) => (
        <p key={row.label} className="flex flex-col gap-0.5 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <span className="text-small font-medium text-ink-950">{row.label}</span>
          <a href={`mailto:${row.email}`} className="text-small text-primary-500 underline decoration-primary-200 underline-offset-4 hover:decoration-primary-500">
            {row.email}
          </a>
        </p>
      ))}
    </div>
  );
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          id={slugify(block.text)}
          className="scroll-mt-28 border-t border-ink-200 pt-10 font-heading text-h3 first:border-t-0 first:pt-0 [&:not(:first-child)]:mt-6"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="pt-2 font-heading text-h4">{block.text}</h3>;
    case "p":
      return <p>{block.text}</p>;
    case "ul":
      return (
        <ul className="flex flex-col gap-2 pl-5 marker:text-primary-500 [list-style:disc]">
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="flex flex-col gap-2 pl-6 marker:font-medium marker:text-primary-500 [list-style:lower-alpha]">
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              {item}
            </li>
          ))}
        </ol>
      );
    case "contact":
      return <ContactDetails channels={block.channels} />;
  }
}

export default function LegalDocument({ title, blocks }: LegalDocumentProps) {
  const sections = blocks.filter((b): b is Extract<LegalBlock, { type: "h2" }> => b.type === "h2");
  // Everything before the first numbered section is the document's preamble.
  const firstSectionIndex = blocks.findIndex((b) => b.type === "h2");
  const preamble = firstSectionIndex > 0 ? blocks.slice(0, firstSectionIndex) : [];
  const body = firstSectionIndex > 0 ? blocks.slice(firstSectionIndex) : blocks;

  return (
    <>
      <header className="relative isolate overflow-hidden border-b border-ink-200 bg-ink-50">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-ink-200)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-ink-200)_1px,transparent_1px)] bg-[size:56px_56px] opacity-50 [mask-image:radial-gradient(ellipse_60%_80%_at_20%_0%,black,transparent)]"
        />
        <div className="container-page flex flex-col gap-6 pt-14 pb-12 sm:pt-20 lg:pt-24 lg:pb-16">
          <Heading as="h1" size="h1" className="max-w-[860px] motion-safe:animate-fade-up [animation-delay:60ms]">
            {title}
          </Heading>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 motion-safe:animate-fade-up [animation-delay:120ms]">
            {LEGAL_LAST_UPDATED && <p className="text-small text-ink-500">Last Updated: {LEGAL_LAST_UPDATED}</p>}
            <nav aria-label="Legal documents">
              <ul className="flex flex-wrap gap-2">
                {legalDocs.map((doc) => {
                  const current = doc.label === title;
                  return (
                    <li key={doc.href}>
                      <Link
                        href={doc.href}
                        aria-current={current ? "page" : undefined}
                        className={cn(
                          "inline-flex h-9 items-center rounded-full px-3.5 text-small font-medium ring-1 ring-inset transition-colors",
                          current ? "bg-ink-950 text-white ring-ink-950" : "bg-white text-ink-700 ring-ink-200 hover:bg-ink-100",
                        )}
                      >
                        {doc.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <div className="container-page section-y-sm">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Table of contents */}
          <nav aria-label="Sections" className="lg:col-span-4 xl:col-span-3">
            {/* Mobile: collapsible */}
            <details className="group rounded-card bg-white ring-1 ring-inset ring-ink-200 lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-body font-medium text-ink-950 [&::-webkit-details-marker]:hidden">
                On this page
                <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-ink-500 transition-transform duration-200 group-open:rotate-180">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>
              <ol className="flex flex-col gap-1 border-t border-ink-200 px-3 py-3">
                {sections.map((section) => (
                  <li key={section.text}>
                    <a href={`#${slugify(section.text)}`} className="block rounded-lg px-2 py-2 text-small text-ink-700 hover:bg-ink-50">
                      {section.text}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            {/* Desktop: sticky list */}
            <div className="sticky top-28 hidden max-h-[calc(100vh-9rem)] overflow-y-auto pr-2 lg:block">
              <p className="mb-3 text-eyebrow uppercase text-ink-500">On this page</p>
              <ol className="flex flex-col border-l border-ink-200">
                {sections.map((section) => (
                  <li key={section.text}>
                    <a
                      href={`#${slugify(section.text)}`}
                      className="-ml-px block border-l border-transparent py-1.5 pl-4 text-small leading-snug text-ink-500 transition-colors hover:border-primary-500 hover:text-ink-950"
                    >
                      {section.text}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="flex max-w-[720px] flex-col gap-5 text-body-lg text-ink-700 lg:col-span-8 xl:col-span-9">
            {preamble.length > 0 && (
              <div className="flex flex-col gap-4 rounded-card bg-primary-50 p-6 text-ink-950 ring-1 ring-inset ring-primary-100 sm:p-8">
                {preamble.map((block, i) => (
                  <Block key={`pre-${i}`} block={block} />
                ))}
              </div>
            )}
            {body.map((block, i) => (
              <Block key={i} block={block} />
            ))}

            <div className="mt-10 flex flex-col gap-4 border-t border-ink-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-small text-ink-500">
                Questions? Email{" "}
                <a href={`mailto:${contact.generalEmail}`} className="text-primary-500 underline decoration-primary-200 underline-offset-4 hover:decoration-primary-500">
                  {contact.generalEmail}
                </a>
              </p>
              <a href="#top" className="inline-flex items-center gap-1.5 text-small font-medium text-ink-950 hover:text-primary-500">
                Back to top
                <svg aria-hidden width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 13V3M4 7l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
