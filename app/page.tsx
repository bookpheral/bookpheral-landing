import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Hero from "@/components/Hero";
import RevenueSplit from "@/components/RevenueSplit";
import { ServiceIcon, type IconName } from "@/components/ServiceIcons";
import {
  Badge,
  Button,
  Card,
  Eyebrow,
  Heading,
  Reveal,
  RevealGroup,
  RevealItem,
  Section,
  Text,
} from "@/components/ui";
import {
  APP_OPEN,
  EDUCATOR_REVENUE_SHARE,
  FEC_PRODUCTION_DISCOUNT_PERCENT,
  FEC_SEAT_LIMIT,
  PLATFORM_REVENUE_SHARE,
  PRODUCTION_SAVING_PERCENT,
  launchDateLabel,
  primaryCta,
  routes,
  signInCta,
} from "@/lib/site-config";

export const metadata: Metadata = pageMetadata("home");

const services: { title: string; body: string; icon: IconName }[] = [
  {
    title: "Book Distribution",
    body: "Distribute your book through protected digital access, with platform listing, payment processing, sales administration, and reporting.",
    icon: "shield",
  },
  {
    title: "Professional Book Production",
    body: "Get support with editing, cover design, digital formatting, ISBN registration, and quality assurance.",
    icon: "pen",
  },
  {
    title: "Marketing and Discoverability",
    body: "Give your book a better chance of reaching readers beyond your immediate institution or professional network.",
    icon: "search",
  },
  {
    title: "Institutional Distribution",
    body: "Bookpheral also works with universities, schools, departments, professional bodies, and training organizations.",
    icon: "clipboard",
  },
];

// From the FAQ answer to "What does net distributable revenue mean?"
const revenueDeductions = ["Taxes", "Payment-processing charges", "Refunds", "Third-party transaction costs"];

const audiences = ["Lecturers", "Teachers", "Researchers", "Professional trainers", "Subject-matter experts", "Institutions"];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ─── Our Services ─────────────────────────────────────────────── */}
      <Section tone="tint">
        <div className="flex flex-col gap-10 lg:gap-16">
          <Reveal className="flex flex-col items-start gap-5 lg:max-w-[720px]">
            <Heading size="h2">Our Services</Heading>
          </Reveal>

          <RevealGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <RevealItem key={service.title}>
                <Card padding="md" interactive className="group flex h-full flex-col gap-4">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary-50 text-primary-500 transition-colors duration-300 group-hover:bg-primary-500 group-hover:text-white">
                    <ServiceIcon name={service.icon} className="size-5" />
                  </span>
                  <Heading as="h3" size="h4">
                    {service.title}
                  </Heading>
                  <p className="text-body text-ink-500">{service.body}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal>
            <Button href={routes.services} size="lg" arrow>
              Learn More
            </Button>
          </Reveal>
        </div>
      </Section>

      {/* ─── Who We Cater To ───────────────────────────────────────────── */}
      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="flex flex-col gap-5 lg:col-span-5">
            <Heading size="h2">Who We Cater To</Heading>
            <Text size="lg" tone="muted">
              Bookpheral is built for:
            </Text>
          </Reveal>

          <RevealGroup as="ul" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-7" aria-label="Who Bookpheral is built for">
            {audiences.map((audience) => (
              <RevealItem as="li" key={audience}>
                <span className="flex items-center gap-3 rounded-2xl bg-ink-50 px-5 py-4 text-body-lg font-medium text-ink-950 ring-1 ring-inset ring-ink-100 transition-[transform,box-shadow] duration-300 ease-out-quint hover:-translate-y-0.5 hover:bg-white hover:shadow-soft">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-400" aria-hidden>
                    <svg width="11" height="8" viewBox="0 0 14 10" fill="none">
                      <path d="M1 5L5 9L13 1" stroke="var(--color-primary-900)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {audience}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ─── What Educators Get (bento) ────────────────────────────────── */}
      <Section tone="tint">
        <Reveal className="flex flex-col items-start gap-5">
          <Heading size="h2">What Educators Get</Heading>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:grid-rows-2">
          {/* Revenue — hero tile */}
          <RevealItem className="md:col-span-2 lg:row-span-2">
            <Card variant="primary" padding="lg" interactive className="group flex h-full min-h-[340px] flex-col justify-between gap-8 lg:min-h-[480px]">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-[radial-gradient(closest-side,rgb(128_245_46/0.35),transparent)] blur-2xl" />
              <div className="relative flex items-start justify-between gap-6">
                <Badge variant="inverse">{EDUCATOR_REVENUE_SHARE}% Revenue Share</Badge>
                <div className="relative -mr-4 -mt-6 size-28 transition-transform duration-500 ease-out-quint group-hover:-translate-y-1 group-hover:rotate-6 sm:size-36 lg:size-44">
                  <Image src="/images/dollar-3d.png" alt="" fill sizes="176px" className="object-contain" />
                </div>
              </div>
              <div className="relative flex flex-col gap-4">
                <p className="font-heading text-[clamp(4.5rem,3rem+7vw,9rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-white">
                  {EDUCATOR_REVENUE_SHARE}%
                </p>
                <p className="max-w-[460px] text-body-lg text-primary-100">
                  Educators retain {EDUCATOR_REVENUE_SHARE}% of net distributable revenue from books sold through
                  Bookpheral.
                </p>
              </div>

              {/* Split visual + what "net distributable revenue" means (from the FAQ) */}
              <div className="relative flex flex-col gap-6 border-t border-white/15 pt-6">
                <RevenueSplit educator={EDUCATOR_REVENUE_SHARE} platform={PLATFORM_REVENUE_SHARE} tone="dark" />
                <div className="flex flex-col gap-3">
                  <p className="text-small text-primary-100">
                    Net distributable revenue is what&apos;s available after applicable deductions such as:
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {revenueDeductions.map((deduction) => (
                      <li
                        key={deduction}
                        className="rounded-full bg-white/10 px-3 py-1 text-small text-white ring-1 ring-inset ring-white/15"
                      >
                        {deduction}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          </RevealItem>

          {/* Production */}
          <RevealItem>
            <Card padding="md" interactive className="group flex h-full flex-col gap-6">
              <div className="flex items-start justify-between gap-4">
                <p className="font-heading text-h2 text-primary-500">Up to {PRODUCTION_SAVING_PERCENT}%</p>
                <div className="relative -mr-2 -mt-2 size-16 shrink-0 transition-transform duration-500 ease-out-quint group-hover:-translate-y-1 group-hover:-rotate-6 sm:size-20">
                  <Image src="/images/book-3d.png" alt="" fill sizes="80px" className="object-contain" />
                </div>
              </div>
              <div className="mt-auto flex flex-col gap-2">
                <Heading as="h3" size="h4">
                  Up to {PRODUCTION_SAVING_PERCENT}% Off Production
                </Heading>
                <p className="text-body text-ink-500">
                  If your manuscript still needs professional work, Bookpheral can help reduce standard production costs
                  by up to {PRODUCTION_SAVING_PERCENT}%.
                </p>
              </div>
            </Card>
          </RevealItem>

          {/* Protection */}
          <RevealItem>
            <Card variant="ink" padding="md" interactive className="group flex h-full flex-col gap-6">
              <div className="flex items-start justify-between gap-4">
                <Badge variant="inverse" dot>
                  Protected
                </Badge>
                <div className="relative -mr-2 -mt-2 size-16 shrink-0 transition-transform duration-500 ease-out-quint group-hover:-translate-y-1 group-hover:rotate-6 sm:size-20">
                  <Image src="/images/security-3d.png" alt="" fill sizes="80px" className="object-contain" />
                </div>
              </div>
              <div className="mt-auto flex flex-col gap-2">
                <Heading as="h3" size="h4">
                  Protected Digital Access
                </Heading>
                <p className="text-body text-ink-400">
                  Books are distributed through controlled digital access rather than unrestricted file sharing, helping
                  educators earn from every profit their books make.
                </p>
              </div>
            </Card>
          </RevealItem>
        </RevealGroup>
      </Section>

      {/* ─── Why Join Bookpheral Today ─────────────────────────────────── */}
      <Section>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-panel bg-primary-500 px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -left-20 -bottom-40 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(4_40_156/0.9),transparent)] blur-2xl" />
              <div className="absolute -right-10 -top-32 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgb(128_245_46/0.28),transparent)] blur-2xl motion-safe:animate-drift" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.07)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
            </div>

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="flex flex-col gap-6 lg:col-span-7">
                <Eyebrow tone="inverse">Founding Educators Circle</Eyebrow>
                <Heading size="h2" className="text-white">
                  Why Join Bookpheral Today
                </Heading>
                <div className="flex flex-col gap-4 text-body-lg text-primary-100">
                  <p>Bookpheral is building its first community of educators through the Founding Educators Circle.</p>
                  <p>
                    Members receive lifetime founding privileges, priority visibility for their titles, and opportunities to
                    contribute feedback as Bookpheral develops.
                  </p>
                  <p>
                    They also receive up to {FEC_PRODUCTION_DISCOUNT_PERCENT}% off professional production for one eligible
                    book each benefit year.
                  </p>
                </div>
              </div>

              {/* Offer "ticket" */}
              <div className="lg:col-span-5">
                <div className="flex h-full flex-col justify-between gap-8 rounded-card bg-white/[0.08] p-6 ring-1 ring-inset ring-white/15 backdrop-blur-sm sm:p-8">
                  <div className="flex flex-col gap-2">
                    <Badge variant="accent" dot="pulse" className="self-start">
                      Limited offer
                    </Badge>
                    <p className="mt-4 font-heading text-[clamp(3.5rem,2.6rem+3.5vw,5.5rem)] font-semibold leading-none tracking-[-0.05em] text-white">
                      {FEC_SEAT_LIMIT}
                    </p>
                    <p className="text-body-lg text-white">
                      This offer is limited to the first {FEC_SEAT_LIMIT} educators who apply before our launch date!
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 border-t border-white/15 pt-6">
                    <p className="text-small text-primary-100">Bookpheral launches on {launchDateLabel}.</p>
                    <Button href={routes.fec} variant="accent" size="lg" arrow className="w-full sm:w-auto sm:self-start">
                      Join Today
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ─── Closing call to action (only once the app is open to the public) ── */}
      {APP_OPEN && (
        <Section tone="tint">
          <Reveal className="mx-auto flex max-w-[720px] flex-col items-center gap-6 text-center">
            <Heading size="h2">Protect, publish, and profit from your knowledge.</Heading>
            <Text size="lg" tone="muted">
              Bring your book to Bookpheral, or sign in to pick up where you left off.
            </Text>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button href={primaryCta.href} size="lg" arrow>
                {primaryCta.label}
              </Button>
              {signInCta && (
                <Button href={signInCta.href} variant="secondary" size="lg">
                  {signInCta.label}
                </Button>
              )}
            </div>
          </Reveal>
        </Section>
      )}
    </>
  );
}
