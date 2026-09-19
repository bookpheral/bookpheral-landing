import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import Image from "next/image";
import {
  Button,
  Card,
  Eyebrow,
  Heading,
  PageHeader,
  Reveal,
  RevealGroup,
  RevealItem,
  Section,
  Text,
} from "@/components/ui";
import { routes } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata("about");

// "What We Are Building" — the four routes named in the copy.
const pillars = [
  "Better routes to professional production",
  "More secure distribution",
  "Wider access to legitimate readers",
  "Stronger opportunities for educators to benefit from the work they have already spent years creating",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("about")} />
      <PageHeader eyebrow="About Bookpheral" title="Who We Are">
        <p className="text-ink-950">
          Bookpheral is a digital platform that helps educators professionally produce, securely distribute, and sell
          their books and educational content.
        </p>
        <p>
          Bookpheral was created to address a problem that has gone largely accepted for too long: African educators
          create valuable intellectual work but often lack the systems to protect it, distribute it properly, and earn
          fairly from it.
        </p>
        <p className="font-medium text-ink-950">We are building a better infrastructure around that work.</p>
      </PageHeader>

      {/* ─── Mission & Vision (bento) ──────────────────────────────────── */}
      <Section spacing="none" className="pb-16 lg:pb-24">
        <RevealGroup className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <RevealItem className="lg:col-span-5">
            <Card variant="primary" padding="lg" className="flex h-full min-h-[320px] flex-col justify-between gap-10">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-[radial-gradient(closest-side,rgb(128_245_46/0.3),transparent)] blur-2xl" />
              <Eyebrow tone="inverse">Our Mission</Eyebrow>
              <p className="relative font-heading text-h2 text-white">
                To empower African educators to protect, publish, and profit from their knowledge.
              </p>
            </Card>
          </RevealItem>
          <RevealItem className="lg:col-span-7">
            <Card variant="tint" padding="lg" className="flex h-full min-h-[320px] flex-col justify-between gap-10">
              <Eyebrow>Our Vision</Eyebrow>
              <p className="font-heading text-h4 text-ink-950 sm:text-h3">
                To build Africa&apos;s leading infrastructure for educational intellectual property, enabling educators to
                transform their expertise into lasting intellectual assets that improve learning, strengthen professional
                reputation, and generate sustainable economic value.
              </p>
            </Card>
          </RevealItem>
        </RevealGroup>
      </Section>

      {/* ─── Why Educators (editorial) ─────────────────────────────────── */}
      <Section tone="tint">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="flex flex-col gap-5 self-start lg:sticky lg:top-28 lg:col-span-5">
            <Heading size="h2">Why Educators</Heading>
          </Reveal>

          <Reveal delay={0.05} className="flex flex-col gap-6 lg:col-span-7">
            <Text size="lg" tone="muted">
              Educators across all levels remain some of the most underpaid professionals in Africa, even though they
              impact thousands of lives and carry an enormous part of the continent&apos;s intellectual work. They spend
              their careers teaching, researching, preparing materials, and supporting students, often without receiving
              much financial value from what they create.
            </Text>
            <Text size="lg" tone="muted">
              Publishing can offer another source of income, but it comes with its own barriers. Book production costs can
              be high. The process is often fragmented. Distribution may be weak. And once a book enters circulation,
              piracy and unauthorized distribution can reduce its commercial value.
            </Text>
            <Text size="lg" tone="muted">
              These are not small inconveniences. They are part of the reason many educators never get enough financial
              return from work that took years to create.
            </Text>
            <p className="border-l-2 border-accent-400 pl-5 font-heading text-h3 text-primary-500">
              Bookpheral was built with that reality in mind.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ─── What We Are Building (dark band) ──────────────────────────── */}
      <Section tone="ink" className="overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -left-40 top-0 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(1_55_224/0.45),transparent)] blur-3xl" />
        <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="flex flex-col gap-6 lg:col-span-6">
            <Heading size="h2" className="text-white">
              What We Are Building
            </Heading>
            <p className="font-heading text-h3 text-white">Bookpheral is not only a place to sell books.</p>
            <Text size="lg" tone="on-dark">
              We are building infrastructure that helps educators treat their knowledge as intellectual property with
              lasting educational and commercial value.
            </Text>
          </Reveal>

          <div className="flex flex-col gap-8 lg:col-span-6">
            <Reveal delay={0.05}>
              <p className="text-body-lg text-ink-400">That means creating:</p>
            </Reveal>
            <RevealGroup as="ul" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {pillars.map((pillar) => (
                <RevealItem as="li" key={pillar}>
                  <div className="flex h-full items-start gap-3 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-inset ring-white/10 transition-[transform,background-color] duration-300 ease-out-quint hover:-translate-y-0.5 hover:bg-white/[0.1]">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-400" aria-hidden>
                      <svg width="11" height="8" viewBox="0 0 14 10" fill="none">
                        <path d="M1 5L5 9L13 1" stroke="var(--color-primary-900)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="text-body text-white">{pillar}</span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal>
              <Text size="lg" tone="on-dark">
                Over time, we want Bookpheral to become a trusted part of how educational knowledge is developed, protected,
                distributed, and valued across Africa.
              </Text>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ─── Our Principle ─────────────────────────────────────────────── */}
      <Section>
        <Reveal>
          <Card padding="lg" className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="relative mx-auto size-32 sm:size-40 lg:col-span-3">
              <Image src="/images/security-3d.png" alt="" fill sizes="160px" className="object-contain" />
            </div>
            <div className="flex flex-col gap-5 lg:col-span-9">
              <Eyebrow>Our Principle</Eyebrow>
              <p className="font-heading text-h3 text-ink-950">
                Bookpheral supports educators in earning from their intellectual work without compromising the integrity of
                the educator–student relationship.
              </p>
              <Text size="lg" tone="muted">
                Where educational materials are distributed to students, access and adoption should remain consistent with
                institutional policies and academic standards. Bookpheral does not support practices that illegitimately
                tie the purchase of an educator&apos;s material to grades, assessment outcomes, or preferential treatment.
              </Text>
            </div>
          </Card>
        </Reveal>

        <Reveal className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <Button href={routes.services} size="lg" arrow>
            See How Bookpheral Works
          </Button>
          <Button href={routes.fec} size="lg" variant="secondary">
            Founding Educators Circle
          </Button>
        </Reveal>
      </Section>
    </>
  );
}
