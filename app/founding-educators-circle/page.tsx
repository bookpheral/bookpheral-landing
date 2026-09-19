import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import Countdown from "@/components/Countdown";
import WaitlistForm from "@/components/WaitlistForm";
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
  cn,
} from "@/components/ui";
import {
  FEC_PRODUCTION_DISCOUNT_PERCENT,
  FEC_REGISTRATION_DEADLINE,
  FEC_SEAT_LIMIT,
  fecDeadlineLabel,
  fecDeadlineShortLabel,
  fecDeadlineTimeLabel,
  launchDateLabel,
} from "@/lib/site-config";

export const metadata: Metadata = pageMetadata("fec");

const secondaryBenefits = [
  {
    title: "Lifetime Founding Educator status",
    body: [
      "Your founding status remains with you beyond the launch period.",
      "Members receive a dedicated Founding Educator profile and permanent recognition within the Bookpheral ecosystem.",
    ],
    className: "lg:col-span-3",
    variant: "default" as const,
  },
  {
    title: "Priority visibility for your titles",
    body: [
      "Books distributed by Founding Educators may receive priority visibility across Bookpheral-owned channels, including relevant collections, recommendations, editorial features, and promotional placements.",
    ],
    className: "lg:col-span-3",
    variant: "default" as const,
  },
  {
    title: "A voice in Bookpheral's development",
    body: [
      "Because the Circle exists at Bookpheral’s formative stage, members may be invited to provide feedback on selected platform features, services, and initiatives.",
      "The aim is to build Bookpheral with direct input from the educators it is meant to serve.",
    ],
    className: "lg:col-span-6",
    variant: "ink" as const,
  },
];

// "You may have…" — the three starting points named in the copy.
const startingPoints = ["A completed title", "A manuscript in development", "A serious book project you intend to bring to market"];

export default function FoundingEducatorsCirclePage() {
  const timeline = [
    { label: "Now", title: "Pre-launch registration open", active: true },
    { label: `${fecDeadlineShortLabel}, ${fecDeadlineTimeLabel}`, title: "Registration closes", active: false },
    { label: launchDateLabel, title: "Bookpheral launches", active: false },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd("fec")} />
      {/* ─── Header: copy + countdown ──────────────────────────────────── */}
      <header className="relative isolate overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-[10%] -top-[30%] size-[640px] rounded-full bg-[radial-gradient(closest-side,rgb(1_55_224/0.14),transparent)] blur-2xl motion-safe:animate-drift" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-ink-200)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-ink-200)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_20%_10%,black,transparent)]" />
        </div>

        <div className="container-page grid grid-cols-1 gap-12 pt-14 pb-16 sm:pt-20 lg:grid-cols-12 lg:items-center lg:gap-16 lg:pt-24 lg:pb-24">
          <div className="flex flex-col items-start gap-6 lg:col-span-7">
            <div className="motion-safe:animate-fade-up">
              <Eyebrow>Founding Educators Circle</Eyebrow>
            </div>
            <Heading as="h1" size="h1" className="motion-safe:animate-fade-up [animation-delay:60ms] lg:text-[3.75rem]">
              Be one of Bookpheral&apos;s first {FEC_SEAT_LIMIT} educators
            </Heading>
            <div className="flex flex-col gap-4 text-body-lg text-ink-500 motion-safe:animate-fade-up [animation-delay:140ms]">
              <p className="text-ink-950">
                Bookpheral is beginning with a small group of educators who will be part of its earliest community.
              </p>
              <p>
                The Founding Educators Circle is limited to the first {FEC_SEAT_LIMIT} educators who join before Bookpheral
                launches on {launchDateLabel}.
              </p>
              <p>
                Registration closes one week before the launch date, at exactly {fecDeadlineTimeLabel} on{" "}
                {fecDeadlineLabel}, or earlier if all {FEC_SEAT_LIMIT} places are filled.
              </p>
            </div>
            <div className="motion-safe:animate-fade-up [animation-delay:220ms]">
              <Button href="#join" size="lg" arrow>
                Join the Circle
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 motion-safe:animate-fade-up [animation-delay:300ms]">
            <div className="relative isolate overflow-hidden rounded-panel bg-ink-950 p-6 shadow-lift sm:p-8">
              <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 -z-10 size-72 rounded-full bg-[radial-gradient(closest-side,rgb(128_245_46/0.25),transparent)] blur-2xl" />
              <div className="flex items-center justify-between gap-4">
                <Badge variant="inverse" dot="pulse">
                  Registration closes in
                </Badge>
              </div>
              <div className="mt-6">
                <Countdown
                  deadline={FEC_REGISTRATION_DEADLINE.toISOString()}
                  closedLabel="Registration for the Founding Educators Circle has closed."
                />
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                <div className="flex flex-col gap-1">
                  <dt className="text-eyebrow uppercase text-ink-400">Places</dt>
                  <dd className="font-heading text-h3 text-white">{FEC_SEAT_LIMIT}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-eyebrow uppercase text-ink-400">Launch</dt>
                  <dd className="font-heading text-h4 text-white">{launchDateLabel}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Why Join Now + timeline ───────────────────────────────────── */}
      <Section tone="tint">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="flex flex-col gap-5 lg:col-span-6">
            <Heading size="h2">Why Join Now</Heading>
            <p className="font-heading text-h4 text-ink-950">
              For now, the Founding Educators Circle is available only during Bookpheral&apos;s pre-launch period.
            </p>
            <Text size="lg" tone="muted">
              Members receive lifetime founding privileges, stronger visibility for their titles, access to the Academic
              Entrepreneur Community, and a more generous annual production benefit than the standard Bookpheral offer.
            </Text>
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-6">
            <RevealGroup as="ol" className="relative flex flex-col gap-3">
              {timeline.map((step, i) => (
                <RevealItem as="li" key={step.title} className="relative flex gap-4">
                  <div className="flex flex-col items-center mt-6">
                    <span
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-full font-heading text-small",
                        step.active ? "bg-primary-500 text-white shadow-glow" : "bg-white text-ink-500 ring-1 ring-inset ring-ink-200",
                      )}
                    >
                      {i + 1}
                    </span>
                    {i < timeline.length - 1 && <span aria-hidden className="-mb-8 h-full w-px bg-ink-200" />}
                  </div>
                  <Card padding="sm" className="mb-3 flex-1">
                    <p className="text-eyebrow uppercase text-primary-500">{step.label}</p>
                    <p className="mt-1.5 font-heading text-h4 text-ink-950">{step.title}</p>
                  </Card>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal>
              <p className="border-l-2 border-accent-400 pl-4 text-body-lg text-ink-950">
                Once the first {FEC_SEAT_LIMIT} places are filled, or the {fecDeadlineShortLabel} deadline passes, the
                Founding Educators Circle will close.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ─── What Founding Educators Receive (bento) ───────────────────── */}
      <Section>
        <Reveal className="flex max-w-[760px] flex-col gap-5">
          <Heading size="h2">What Founding Educators Receive</Heading>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-12">
          {/* Featured: production discount */}
          <RevealItem className="md:col-span-2 lg:col-span-6 lg:row-span-2">
            <Card variant="primary" padding="lg" interactive className="flex h-full min-h-[420px] flex-col justify-between gap-10">
              <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-24 size-96 rounded-full bg-[radial-gradient(closest-side,rgb(128_245_46/0.3),transparent)] blur-2xl" />
              <div className="relative flex flex-col gap-4">
                <Badge variant="accent" className="self-start">
                  Once every benefit year
                </Badge>
                <p className="font-heading text-[clamp(4rem,2.8rem+5vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.05em] text-white">
                  {FEC_PRODUCTION_DISCOUNT_PERCENT}%
                </p>
                <Heading as="h3" size="h3">
                  Up to {FEC_PRODUCTION_DISCOUNT_PERCENT}% off professional production
                </Heading>
              </div>
              <div className="relative flex flex-col gap-3 text-body">
                <p>
                  Once every benefit year, a Founding Educator may receive up to {FEC_PRODUCTION_DISCOUNT_PERCENT}% off the
                  professional production cost of one eligible book.
                </p>
                <p>
                  Depending on the manuscript, this may cover services such as editing, cover design, digital formatting, ISBN
                  registration, and production quality assurance.
                </p>
                <p className="text-white">
                  The benefit applies to one eligible book per benefit year and does not accumulate if unused.
                </p>
              </div>
            </Card>
          </RevealItem>

          {secondaryBenefits.map((benefit) => (
            <RevealItem key={benefit.title} className={benefit.className}>
              <Card variant={benefit.variant} padding="md" interactive className="flex h-full flex-col gap-4">
                <Heading as="h3" size="h4">
                  {benefit.title}
                </Heading>
                <div className={cn("flex flex-col gap-3 text-body", benefit.variant === "default" && "text-ink-500")}>
                  {benefit.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* ─── Who the Circle Is For ─────────────────────────────────────── */}
      <Section tone="tint">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <Reveal className="flex flex-col gap-5 lg:col-span-6">
            <Heading size="h2">Who the Circle Is For</Heading>
            <Text size="lg" tone="muted">
              The Founding Educators Circle is open to lecturers, professors, teachers, researchers, professional trainers,
              and subject-matter experts with original educational content.
            </Text>
          </Reveal>
          <Reveal delay={0.05} className="lg:col-span-6">
            <p className="font-heading text-h3 text-ink-950">You do not need to have a finished book already.</p>
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <p className="text-body-lg text-ink-500">You may have:</p>
        </Reveal>
        <RevealGroup className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {startingPoints.map((point, i) => (
            <RevealItem key={point}>
              <Card padding="md" interactive className="flex h-full flex-col gap-8">
                <span className="flex size-10 items-center justify-center rounded-full bg-accent-400 font-heading text-small text-primary-900">
                  {i + 1}
                </span>
                <p className="mt-auto font-heading text-h4 text-ink-950">{point}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      <WaitlistForm />
    </>
  );
}
