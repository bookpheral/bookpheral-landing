import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Alert,
  Badge,
  Button,
  Card,
  CheckList,
  Eyebrow,
  Field,
  Heading,
  Input,
  PageHeader,
  Reveal,
  RevealGroup,
  RevealItem,
  Section,
  Select,
  Text,
  Textarea,
} from "@/components/ui";

// Internal design-system reference. Not linked anywhere and 404s in production.
export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const colorScales = [
  {
    name: "Primary",
    swatches: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"].map((s) => ({
      label: s,
      className: `bg-primary-${s}`,
    })),
  },
  {
    name: "Accent",
    swatches: ["100", "300", "400", "600"].map((s) => ({ label: s, className: `bg-accent-${s}` })),
  },
  {
    name: "Ink",
    swatches: ["50", "100", "200", "300", "400", "500", "700", "900", "950"].map((s) => ({
      label: s,
      className: `bg-ink-${s}`,
    })),
  },
  {
    name: "Semantic",
    swatches: [
      { label: "success", className: "bg-success-600" },
      { label: "warning", className: "bg-warning-600" },
      { label: "error", className: "bg-error-600" },
      { label: "info", className: "bg-info-600" },
    ],
  },
];

// Tailwind only generates classes it can see as full strings.
// bg-primary-50 bg-primary-100 bg-primary-200 bg-primary-300 bg-primary-400 bg-primary-500 bg-primary-600 bg-primary-700 bg-primary-800 bg-primary-900
// bg-accent-100 bg-accent-300 bg-accent-400 bg-accent-600
// bg-ink-50 bg-ink-100 bg-ink-200 bg-ink-300 bg-ink-400 bg-ink-500 bg-ink-700 bg-ink-900 bg-ink-950

const typeRamp = [
  { token: "display", sample: "Protect, publish, profit.", className: "font-heading text-display text-ink-950" },
  { token: "h1", sample: "Who We Are", className: "font-heading text-h1 text-ink-950" },
  { token: "h2", sample: "Where Bookpheral Comes In", className: "font-heading text-h2 text-ink-950" },
  { token: "h3", sample: "Lifetime Founding Educator status", className: "font-heading text-h3 text-ink-950" },
  { token: "h4", sample: "Bookpheral supports both.", className: "font-heading text-h4 text-ink-950" },
  {
    token: "body-lg",
    sample: "Bookpheral brings professional production, protected digital distribution, and market access into one system.",
    className: "text-body-lg text-ink-700",
  },
  {
    token: "body",
    sample: "You can distribute to the audience you already have while giving your work a better chance of reaching new readers.",
    className: "text-body text-ink-700",
  },
  { token: "small", sample: "Registration closes at 11:59 p.m. on October 26, 2026.", className: "text-small text-ink-500" },
  { token: "eyebrow", sample: "Founding Educators Circle", className: "text-eyebrow uppercase text-primary-500" },
];

function GuideBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-6 border-t border-ink-200 py-12 lg:grid-cols-[220px_1fr] lg:gap-12">
      <Heading as="h2" size="h4">
        {title}
      </Heading>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export default function StyleguidePage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <>
      <PageHeader eyebrow="Design system" title="Bookpheral styleguide">
        <p>Tokens and primitives. Every page should be composed from these.</p>
      </PageHeader>

      <Section spacing="compact">
        <GuideBlock title="Colour">
          <div className="flex flex-col gap-8">
            {colorScales.map((scale) => (
              <div key={scale.name} className="flex flex-col gap-3">
                <Text size="small" tone="muted">
                  {scale.name}
                </Text>
                <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                  {scale.swatches.map((swatch) => (
                    <div key={swatch.label} className="flex flex-col gap-1.5">
                      <div className={`${swatch.className} h-14 rounded-input ring-1 ring-inset ring-black/5`} />
                      <span className="text-small text-ink-500">{swatch.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </GuideBlock>

        <GuideBlock title="Type">
          <div className="flex flex-col gap-6">
            {typeRamp.map((row) => (
              <div key={row.token} className="grid grid-cols-1 gap-2 sm:grid-cols-[90px_1fr] sm:items-baseline">
                <code className="text-small text-ink-500">{row.token}</code>
                <p className={row.className}>{row.sample}</p>
              </div>
            ))}
          </div>
        </GuideBlock>

        <GuideBlock title="Buttons">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button href="#" arrow>
                Primary
              </Button>
              <Button href="#" variant="secondary">
                Secondary
              </Button>
              <Button href="#" variant="accent" arrow>
                Accent
              </Button>
              <Button href="#" variant="ghost">
                Ghost
              </Button>
              <Button disabled>Disabled</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg" arrow>
                Large
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 rounded-card bg-primary-500 p-6">
              <Button href="#" variant="inverse" arrow>
                Inverse
              </Button>
              <Button href="#" variant="inverse-outline">
                Inverse outline
              </Button>
              <Button href="#" variant="accent" arrow>
                Accent on primary
              </Button>
            </div>
          </div>
        </GuideBlock>

        <GuideBlock title="Badges">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>Primary</Badge>
            <Badge variant="accent" dot="pulse">
              Limited to 100
            </Badge>
            <Badge variant="neutral">Neutral</Badge>
            <Badge variant="success" dot>
              Success
            </Badge>
            <Badge variant="warning" dot>
              Warning
            </Badge>
            <Badge variant="error" dot>
              Error
            </Badge>
            <span className="rounded-full bg-ink-950 p-2">
              <Badge variant="inverse" dot>
                Inverse
              </Badge>
            </span>
          </div>
        </GuideBlock>

        <GuideBlock title="Cards">
          <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(["default", "tint", "primary", "ink", "accent"] as const).map((variant) => (
              <RevealItem key={variant}>
                <Card variant={variant} interactive className="h-full">
                  <div className="flex flex-col gap-3">
                    <Eyebrow tone={variant === "primary" || variant === "ink" ? "inverse" : "primary"}>{variant}</Eyebrow>
                    <Heading as="h3" size="h3">
                      Up to 70% off production
                    </Heading>
                    <p className="text-body">Hover to see the lift. Interactive cards are for linked content.</p>
                  </div>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </GuideBlock>

        <GuideBlock title="Forms">
          <div className="grid max-w-[640px] grid-cols-1 gap-5 sm:grid-cols-2">
            <Field id="sg-name" label="Full Name">
              <Input id="sg-name" placeholder="Your full name" />
            </Field>
            <Field id="sg-email" label="Email" hint="We'll never share it.">
              <Input id="sg-email" type="email" placeholder="name@example.com" aria-invalid="true" />
            </Field>
            <Field id="sg-topic" label="Topic" className="sm:col-span-2">
              <Select id="sg-topic" defaultValue="General enquiry">
                <option>General enquiry</option>
                <option>Book distribution</option>
              </Select>
            </Field>
            <Field id="sg-message" label="Message" optional className="sm:col-span-2">
              <Textarea id="sg-message" placeholder="Tell us about your book." />
            </Field>
            <Alert tone="error" className="sm:col-span-2">
              Please enter your institution name.
            </Alert>
            <Alert tone="success" className="sm:col-span-2">
              You&apos;re on the list!
            </Alert>
          </div>
        </GuideBlock>

        <GuideBlock title="Eyebrow & list">
          <div className="flex flex-col gap-6">
            <Eyebrow>Founding Educators Circle</Eyebrow>
            <Eyebrow tone="muted">Our Vision</Eyebrow>
            <CheckList items={["Protected digital access", "Payment processing", "Sales administration", "Sales reporting"]} />
          </div>
        </GuideBlock>

        <GuideBlock title="Motion">
          <div className="flex flex-col gap-4">
            <Text tone="muted">
              Reveal: opacity + 12px rise, 600ms ease-out-quint, once. Reduced-motion users get no transform.
            </Text>
            <Reveal>
              <Card variant="tint">Scroll this into view to see a single reveal.</Card>
            </Reveal>
          </div>
        </GuideBlock>
      </Section>

      <Section tone="tint" spacing="compact">
        <Heading size="h3">Tint section</Heading>
        <Text tone="muted" className="mt-2">
          Fades in and out of white instead of a hard edge.
        </Text>
      </Section>
      <Section tone="ink" spacing="compact">
        <Heading size="h3" className="text-white">
          Ink section
        </Heading>
        <Text tone="inverse-muted" className="mt-2">
          One dark band per page for rhythm.
        </Text>
      </Section>
    </>
  );
}
