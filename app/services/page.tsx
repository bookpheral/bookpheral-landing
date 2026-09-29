import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, pageMetadata, servicesJsonLd } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import RevenueSplit from "@/components/RevenueSplit";
import { ServiceIcon, type IconName } from "@/components/ServiceIcons";
import {
  Badge,
  Button,
  Card,
  Heading,
  PageHeader,
  Reveal,
  RevealGroup,
  RevealItem,
  Section,
  Text,
} from "@/components/ui";
import {
  EDUCATOR_REVENUE_SHARE,
  PLATFORM_REVENUE_SHARE,
  PRODUCTION_SAVING_PERCENT,
  routes,
} from "@/lib/site-config";

export const metadata: Metadata = pageMetadata("services");

const distributionFeatures: { label: string; icon: IconName }[] = [
  { label: "Protected digital access", icon: "shield" },
  { label: "Payment processing", icon: "card" },
  { label: "Sales administration", icon: "clipboard" },
  { label: "Sales reporting", icon: "chart" },
  { label: "Listing and discoverability on Bookpheral", icon: "search" },
];

const productionServices: { label: string; icon: IconName }[] = [
  { label: "Professional editing", icon: "pen" },
  { label: "Cover design", icon: "image" },
  { label: "Digital formatting and ebook conversion", icon: "file" },
  { label: "ISBN registration", icon: "barcode" },
  { label: "Production quality assurance", icon: "badge" },
];

const routeCards = [
  {
    href: "#distribution",
    number: "01",
    title: "Book Distribution",
    question: "Already have a professionally produced book?",
    image: "/images/security-3d.png",
  },
  {
    href: "#production",
    number: "02",
    title: "Professional Book Production",
    question: "Have a manuscript that is not yet ready for distribution?",
    image: "/images/book-3d.png",
  },
  {
    href: "#institutions",
    number: "03",
    title: "For Institutions and Educator Communities",
    question: "Universities, schools, departments, professional bodies, and training organizations.",
    image: "/images/bullseye-3d.png",
  },
];

function FeatureTile({ label, icon }: { label: string; icon: IconName }) {
  return (
    <div className="group flex items-center gap-3 rounded-2xl bg-white p-4 ring-1 ring-inset ring-ink-200 transition-[box-shadow,transform] duration-300 ease-out-quint hover:-translate-y-0.5 hover:shadow-soft">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500 transition-colors duration-300 group-hover:bg-primary-500 group-hover:text-white">
        <ServiceIcon name={icon} className="size-5" />
      </span>
      <span className="text-body font-medium text-ink-950">{label}</span>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={[breadcrumbJsonLd("services"), ...servicesJsonLd()]} />
      <PageHeader
        eyebrow="Services"
        title="From manuscript to market, on your terms"
      >
        <p className="text-ink-950">
          Whether your book is already finished or is still a manuscript,
          Bookpheral gives you a clearer route to getting it professionally
          prepared, securely distributed, and in front of the people it was
          written for.
        </p>
      </PageHeader>

      {/* ─── Route picker ──────────────────────────────────────────────── */}
      <Section spacing="none" className="pb-16 lg:pb-24">
        <RevealGroup className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {routeCards.map((card) => (
            <RevealItem key={card.href}>
              <Link
                href={card.href}
                className="group block h-full rounded-card"
              >
                <Card
                  interactive
                  padding="md"
                  className="flex h-full flex-col gap-10"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-heading text-small text-ink-400">
                      {card.number}
                    </span>
                    <div className="relative size-16 transition-transform duration-500 ease-out-quint group-hover:-translate-y-1 group-hover:rotate-6">
                      <Image
                        src={card.image}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="mt-auto flex flex-col gap-2">
                    <Heading as="h2" size="h4">
                      {card.title}
                    </Heading>
                    <p className="text-body text-ink-500">{card.question}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-small font-medium text-primary-500">
                      Learn more
                      <svg
                        aria-hidden
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="transition-transform duration-300 ease-out-quint group-hover:translate-y-0.5"
                      >
                        <path
                          d="M8 3v10M4 9l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </Card>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>
        <p className="container-page text-center">
          You do not have to use every service. What you need depends on where
          your book is today.
        </p>

      {/* ─── 01 Book Distribution ──────────────────────────────────────── */}
      <Section id="distribution" tone="tint">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="flex flex-col gap-5 self-start lg:sticky lg:top-28 lg:col-span-5">
            <Heading size="h2">Book Distribution</Heading>
            <p className="font-heading text-h4 text-ink-950">
              Already have a professionally produced book?
            </p>
            <Text size="lg" tone="muted">
              You can bring it directly to Bookpheral for distribution, subject
              to our quality and technical requirements.
            </Text>
            <Text size="lg" tone="muted">
              We provide controlled digital access rather than unrestricted file
              distribution, helping to reduce unauthorized sharing while keeping
              the book accessible to legitimate readers.
            </Text>
          </Reveal>

          <div className="flex flex-col gap-6 lg:col-span-7">
            <Reveal>
              <p className="mb-4 text-eyebrow uppercase text-ink-500">
                Distribution includes:
              </p>
              <RevealGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {distributionFeatures.map((feature) => (
                  <RevealItem
                    key={feature.label}
                    className={
                      feature === distributionFeatures.at(-1)
                        ? "sm:col-span-2"
                        : undefined
                    }
                  >
                    <FeatureTile {...feature} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </Reveal>

            <Reveal>
              <Card padding="lg" className="flex flex-col gap-6">
                <p className="font-heading text-h4 text-ink-950">
                  Educators retain {EDUCATOR_REVENUE_SHARE}% of net
                  distributable revenue, while Bookpheral receives{" "}
                  {PLATFORM_REVENUE_SHARE}%.
                </p>
                <RevenueSplit
                  educator={EDUCATOR_REVENUE_SHARE}
                  platform={PLATFORM_REVENUE_SHARE}
                />
                <div className="flex flex-col gap-5 border-t border-ink-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-body text-ink-700">
                    Your underlying intellectual property remains yours.
                  </p>
                  <Button href={routes.getStarted} arrow>
                    Distribute Your Book
                  </Button>
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ─── 02 Professional Book Production ───────────────────────────── */}
      <Section id="production">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 flex flex-col gap-6 lg:order-1 lg:col-span-7">
            <Reveal>
              <p className="mb-4 text-eyebrow uppercase text-ink-500">
                Support may include:
              </p>
              <RevealGroup as="ol" className="flex flex-col">
                {productionServices.map((service, i) => (
                  <RevealItem
                    as="li"
                    key={service.label}
                    className="group flex items-center gap-4 border-t border-ink-200 py-4 last:border-b"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ink-100 text-ink-700 transition-colors duration-300 group-hover:bg-primary-500 group-hover:text-white">
                      <ServiceIcon name={service.icon} className="size-5" />
                    </span>
                    <span className="text-body-lg text-ink-950 transition-transform duration-300 ease-out-quint group-hover:translate-x-1">
                      {service.label}
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </Reveal>

            <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-5">
              <RevealItem className="sm:col-span-2">
                <Card
                  variant="accent"
                  padding="md"
                  className="flex h-full flex-col justify-between gap-6"
                >
                  <p className="text-eyebrow uppercase">Save up to</p>
                  <p className="font-heading text-[clamp(3.5rem,2.8rem+3vw,5rem)] font-semibold leading-none tracking-[-0.05em]">
                    {PRODUCTION_SAVING_PERCENT}%
                  </p>
                </Card>
              </RevealItem>
              <RevealItem className="sm:col-span-3">
                <Card
                  variant="tint"
                  padding="md"
                  className="flex h-full flex-col justify-between gap-6"
                >
                  <p className="text-body text-ink-700">
                    Through our in-house capabilities and production partners,
                    educators can save up to {PRODUCTION_SAVING_PERCENT}% on
                    standard professional production costs.
                  </p>
                  <p className="text-body text-ink-500">
                    Once your book is completed, it can move into
                    Bookpheral&apos;s standard distribution model.
                  </p>
                </Card>
              </RevealItem>
            </RevealGroup>

            <Reveal>
              <Button href={`${routes.contact}#message`} size="lg" arrow>
                Submit Your Manuscript
              </Button>
            </Reveal>
          </div>

          <Reveal className="order-1 flex flex-col gap-5 self-start lg:sticky lg:top-28 lg:order-2 lg:col-span-5">
            <Heading size="h2">Professional Book Production</Heading>
            <p className="font-heading text-h4 text-ink-950">
              Have a manuscript that is not yet ready for distribution?
            </p>
            <Text size="lg" tone="muted">
              Book production can become expensive and difficult to coordinate
              when editing, design, formatting, and other services all have to
              be sourced separately.
            </Text>
            <Text size="lg" tone="muted">
              Bookpheral brings the required production services together and
              gives you one production quote based on what your manuscript
              actually needs.
            </Text>
          </Reveal>
        </div>
      </Section>

      {/* ─── 03 Institutions (dark band) ───────────────────────────────── */}
      <Section id="institutions">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-panel bg-ink-950 px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-32 -top-32 -z-10 size-[480px] rounded-full bg-[radial-gradient(closest-side,rgb(1_55_224/0.5),transparent)] blur-3xl"
            />
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="flex flex-col gap-6 lg:col-span-7">
                <Heading size="h2" className="text-white">
                  For Institutions and Educator Communities
                </Heading>
                <Text size="lg" tone="on-dark">
                  Bookpheral also works with universities, schools, departments,
                  professional bodies, and training organizations looking for a
                  more structured way to distribute educator-created materials.
                </Text>
                <Text size="lg" tone="on-dark">
                  This can support institutions that want to improve legitimate
                  access to educational content while giving educators a more
                  accountable route to distributing their work.
                </Text>
                <div className="flex flex-col items-start gap-6 border-t border-white/10 pt-6">
                  <Text tone="inverse">
                    Institutional use remains subject to academic standards,
                    institutional policies, and fair treatment of learners.
                  </Text>
                  <Button
                    href={`${routes.contact}#message`}
                    variant="inverse"
                    size="lg"
                    arrow
                  >
                    Contact Bookpheral
                  </Button>
                </div>
              </div>
              <div className="relative mx-auto aspect-square w-full max-w-[320px] lg:col-span-5 lg:max-w-none">
                <Image
                  src="/images/bullseye-3d.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 400px, 320px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ─── Not Sure Where to Start? ──────────────────────────────────── */}
      <Section tone="tint">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="flex flex-col gap-5 lg:col-span-5">
            <Heading size="h2">Not Sure Where to Start?</Heading>
            <Text size="lg" tone="muted">
              You do not need to know exactly what your book needs before
              speaking with us.
            </Text>
            <div className="mt-2">
              <Button href={`${routes.contact}#message`} size="lg" arrow>
                Get Started
              </Button>
            </div>
          </Reveal>
          <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            <RevealItem>
              <Card padding="md" className="flex h-full flex-col gap-4">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
                  <ServiceIcon name="badge" className="size-5" />
                </span>
                <Heading as="h3" size="h4">
                  Finished book
                </Heading>
                <p className="text-body text-ink-500">
                  If you already have a finished book, we can assess whether it
                  is ready for distribution.
                </p>
              </Card>
            </RevealItem>
            <RevealItem>
              <Card padding="md" className="flex h-full flex-col gap-4">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
                  <ServiceIcon name="pen" className="size-5" />
                </span>
                <Heading as="h3" size="h4">
                  Manuscript
                </Heading>
                <p className="text-body text-ink-500">
                  If you have a manuscript, we can assess the production work
                  required and provide a quote before anything begins.
                </p>
              </Card>
            </RevealItem>
          </RevealGroup>
        </div>
      </Section>
    </>
  );
}
