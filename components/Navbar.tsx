"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/icons";
import { Button, cn } from "@/components/ui";
import { EASE_OUT_QUINT } from "@/components/ui/Motion";
import { primaryCta, routes, signInCta } from "@/lib/site-config";

const navLinks = [
  { href: routes.about, label: "About" },
  { href: routes.services, label: "Services" },
  { href: routes.fec, label: "Founding Educators" },
  { href: routes.contact, label: "Contact" },
];

const SCROLL_THRESHOLD = 12;

function useScrolled(threshold: number): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > threshold);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return scrolled;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(SCROLL_THRESHOLD);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // Mobile menu: lock scroll, close on Escape, keep focus inside the panel.
  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !menuRef.current || !toggleRef.current) return;

      const focusables = [toggleRef.current, ...menuRef.current.querySelectorAll<HTMLElement>("a")];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    // Close if the viewport grows past the mobile breakpoint.
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  const elevated = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out-quint",
          elevated
            ? "border-ink-200/70 bg-white/75 shadow-[0_1px_0_rgb(11_16_32/0.02),0_8px_24px_-12px_rgb(11_16_32/0.08)] backdrop-blur-xl backdrop-saturate-150"
            : "border-transparent bg-white/0",
        )}
      >
        <nav
          aria-label="Main"
          className={cn(
            "container-page flex items-center justify-between gap-6 transition-[height] duration-300 ease-out-quint",
            scrolled ? "h-16" : "h-[4.5rem] lg:h-20",
          )}
        >
          {/* Logo */}
          <Link
            href={routes.home}
            onClick={close}
            className="group flex shrink-0 items-center gap-2.5 rounded-lg"
            aria-label="Bookpheral home"
          >
            <LogoMark className="h-8 w-auto text-primary-500 transition-transform duration-300 scale-100 group-hover:scale-110" />
            <span className="font-heading text-[1.375rem] font-semibold tracking-[-0.04em] text-ink-950">
              Bookpheral
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative inline-flex h-10 items-center rounded-full px-4 font-switzer text-small font-medium transition-colors duration-200",
                      active
                        ? "text-ink-950"
                        : "text-ink-500 hover:text-ink-950",
                    )}
                  >
                    {link.label}
                    {/* Underline grows from the centre on hover; stays for the active page. */}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute inset-x-4 bottom-1.5 h-0.5 origin-center rounded-full bg-primary-500 transition-transform duration-300 ease-out-quint",
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {/* Wrapper handles visibility — Button's own display class would override `hidden`. */}
            <div className="hidden items-center gap-2 sm:flex">
              {signInCta && (
                <Button href={signInCta.href} variant="ghost" size="sm">
                  {signInCta.label}
                </Button>
              )}
              <Button href={primaryCta.href} size="sm" arrow>
                {primaryCta.label}
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative flex size-10 items-center justify-center rounded-full text-ink-950 transition-colors hover:bg-ink-100 lg:hidden"
            >
              <span className="sr-only">Menu</span>
              <span
                aria-hidden
                className={cn(
                  "absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-out-quint",
                  open ? "rotate-45" : "-translate-y-[3.5px]",
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ease-out-quint",
                  open ? "-rotate-45" : "translate-y-[3.5px]",
                )}
              />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <m.div
              key="backdrop"
              aria-hidden
              onClick={close}
              className="fixed inset-0 top-0 -z-10 bg-ink-950/20 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
            <m.div
              key="panel"
              id="mobile-menu"
              ref={menuRef}
              className="border-b border-ink-200/70 bg-white/95 shadow-lift backdrop-blur-xl lg:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE_OUT_QUINT }}
            >
              <m.ul
                className="container-page flex flex-col py-4"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
                  },
                }}
              >
                {navLinks.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <m.li
                      key={link.href}
                      variants={{
                        hidden: { opacity: 0, y: -6 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.3, ease: EASE_OUT_QUINT },
                        },
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={close}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between border-b border-ink-100 py-4 font-heading text-h4 transition-colors",
                          active
                            ? "text-primary-500"
                            : "text-ink-950 hover:text-primary-500",
                        )}
                      >
                        {link.label}
                        <svg
                          aria-hidden
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="text-ink-300"
                        >
                          <path
                            d="M6 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Link>
                    </m.li>
                  );
                })}
                <m.li
                  className="flex flex-col gap-3 pt-5 sm:hidden"
                  variants={{
                    hidden: { opacity: 0, y: -6 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.3, ease: EASE_OUT_QUINT },
                    },
                  }}
                >
                  <Button
                    href={primaryCta.href}
                    size="lg"
                    arrow
                    onClick={close}
                    className="w-full"
                  >
                    {primaryCta.label}
                  </Button>
                  {signInCta && (
                    <Button
                      href={signInCta.href}
                      variant="secondary"
                      size="lg"
                      onClick={close}
                      className="w-full"
                    >
                      {signInCta.label}
                    </Button>
                  )}
                </m.li>
              </m.ul>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
