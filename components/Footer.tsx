import Link from "next/link";
import type { ComponentType } from "react";
import { FacebookIcon, InstagramIcon, LinkedInIcon, LogoMark, XIcon } from "@/components/icons";
import { CookieSettingsButton } from "@/components/CookieConsent";
import { Badge, Button } from "@/components/ui";
import { contact, launchDateLabel, primaryCta, routes, signInCta, social } from "@/lib/site-config";

const columns = [
  {
    title: "Bookpheral",
    links: [
      { href: routes.about, label: "About" },
      { href: routes.services, label: "Services" },
      { href: routes.fec, label: "Founding Educators Circle" },
      { href: `${routes.contact}#faq`, label: "FAQ" },
      // Account links only appear once the app is open to the public.
      ...(signInCta ? [signInCta, primaryCta].map(({ href, label }) => ({ href, label })) : []),
    ],
  },
  {
    title: "Legal",
    links: [
      { href: routes.terms, label: "Terms & Conditions" },
      { href: routes.privacy, label: "Privacy Policy" },
      { href: routes.refund, label: "Refund Policy" },
      { href: routes.deleteAccount, label: "Delete Account" },
    ],
  },
];

const socialLinks = (
  [
    { href: social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: social.linkedin, label: "LinkedIn", Icon: LinkedInIcon },
    { href: social.twitter, label: "X (formerly Twitter)", Icon: XIcon },
    { href: social.facebook, label: "Facebook", Icon: FacebookIcon },
  ] satisfies { href: string | null; label: string; Icon: ComponentType<{ className?: string }> }[]
).filter((link): link is typeof link & { href: string } => link.href !== null);

const linkClass =
  "group inline-flex items-center gap-1.5 text-small text-ink-400 transition-colors duration-200 hover:text-white";

/** Arrow that slides in from the left on hover. */
function HoverArrow() {
  return (
    <svg
      aria-hidden
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      className="-translate-x-1 opacity-0 transition-[transform,opacity] duration-200 ease-out-quint group-hover:translate-x-0 group-hover:opacity-100"
    >
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink-950 text-ink-400">
      {/* Top hairline glow */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(128_245_46/0.5),rgb(1_55_224/0.8),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-80 w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(1_55_224/0.35),transparent)] blur-2xl"
      />

      <div className="container-page pt-16 lg:pt-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="flex flex-col items-start gap-6 lg:col-span-5">
            <Link href={routes.home} className="group flex items-center gap-2.5 rounded-lg" aria-label="Bookpheral home">
              <LogoMark className="h-9 w-auto text-white transition-transform duration-300 scale-100 group-hover:scale-110" />
              <span className="font-heading text-[1.625rem] font-semibold tracking-[-0.04em] text-white">Bookpheral</span>
            </Link>
            <p className="max-w-90 text-body text-ink-400">
              Empowering African educators to protect, publish, and profit from their knowledge.
            </p>
            <Badge variant="inverse" dot="pulse">
              Launching {launchDateLabel}
            </Badge>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-4">
                <p className="text-eyebrow uppercase text-ink-300">{column.title}</p>
                <ul className="flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                        <HoverArrow />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="col-span-2 flex flex-col gap-4 sm:col-span-1">
              <p className="text-eyebrow uppercase text-ink-300">Get in touch</p>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href={`mailto:${contact.generalEmail}`} className={linkClass}>
                    {contact.generalEmail}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.supportEmail}`} className={linkClass}>
                    {contact.supportEmail}
                  </a>
                </li>
                {contact.phone && (
                  <li>
                    <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className={linkClass}>
                      {contact.phone}
                    </a>
                  </li>
                )}
              </ul>
              {socialLinks.length > 0 && (
                <ul className="mt-2 flex items-center gap-2">
                  {socialLinks.map(({ href, label, Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex size-9 items-center justify-center rounded-full bg-white/5 text-ink-400 ring-1 ring-inset ring-white/10 transition-[transform,background-color,color] duration-200 ease-out-quint hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
                      >
                        <Icon className="size-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* CTA strip */}
        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-card bg-white/4 p-6 ring-1 ring-inset ring-white/10 sm:flex-row sm:items-center sm:p-8 lg:mt-20">
          <div className="flex flex-col gap-1">
            <p className="font-heading text-h4 text-white">Have a book or manuscript?</p>
            <p className="text-small text-ink-400">Tell us where it is today and we&apos;ll help you find the right route.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button href={primaryCta.href} variant="accent" arrow>
              {primaryCta.label}
            </Button>
            <Button href={`${routes.contact}#message`} variant="inverse-outline">
              Talk to us
            </Button>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/10 py-8 text-small text-ink-400 sm:flex-row sm:justify-center sm:gap-6">
          <p>© {new Date().getFullYear()} Bookpheral. All rights reserved.</p>
          <CookieSettingsButton className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60" />
        </div>
      </div>

      {/* Oversized wordmark, cropped by the footer edge */}
      <p
        aria-hidden
        className="pointer-events-none mb-[-0.28em] select-none text-center font-heading text-[clamp(5rem,19vw,17rem)] font-semibold leading-none tracking-[-0.06em] text-white/[0.035]"
      >
        Bookpheral
      </p>
    </footer>
  );
}
