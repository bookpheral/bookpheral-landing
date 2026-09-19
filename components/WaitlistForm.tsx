"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { AFRICAN_UNIVERSITIES } from "@/data/african-universities";
import { DEPARTMENTS } from "@/data/departments";
import {
  Alert,
  Badge,
  Button,
  Checkbox,
  Field,
  Heading,
  Input,
  Segmented,
  Spinner,
  Textarea,
  cn,
  controlClasses,
} from "@/components/ui";
import {
  FEC_REGISTRATION_DEADLINE,
  FEC_SEAT_LIMIT,
  fecDeadlineLabel,
  fecDeadlineTimeLabel,
  launchDateLabel,
} from "@/lib/site-config";

type FormState = {
  fullName: string;
  email: string;
  institution: string;
  institutionOther: string;
  department: string;
  departmentOther: string;
  bio: string;
  studentCount: string;
  publishedBefore: string;
  newsletter: boolean;
};

const studentOptions = ["1-50", "51-150", "151-300", "300+"] as const;
const publishedOptions = ["Yes", "No"] as const;

const OTHER = "Other";

// ─── Searchable combobox ────────────────────────────────────────────────────

type ComboboxProps = {
  label: string;
  placeholder: string;
  options: readonly string[];
  value: string;
  otherValue: string;
  onSelect: (value: string) => void;
  onOtherChange: (value: string) => void;
};

function Combobox({ label, placeholder, options, value, otherValue, onSelect, onOtherChange }: ComboboxProps) {
  const id = useId();
  const inputId = `${id}-input`;
  const listId = `${id}-list`;
  const [query, setQuery] = useState(value === OTHER ? "" : value);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const isOther = value === OTHER;
  // A selected option is shown as-is; otherwise show what the user is typing.
  const displayValue = value && !isOther ? value : query;

  const filtered =
    query.trim() === "" || (value && !isOther)
      ? options
      : options.filter((o) => o.toLowerCase().includes(query.toLowerCase()));
  const items = filtered.includes(OTHER) ? filtered : [...filtered, OTHER];

  // Close dropdown when clicking outside
  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setOpen(true);
    setActiveIndex(-1);
    if (value !== "") onSelect("");
  }

  function handleSelect(option: string) {
    onSelect(option);
    setQuery(option === OTHER ? "" : option);
    setOpen(false);
    setActiveIndex(-1);
  }

  function scrollToIndex(index: number) {
    listRef.current?.querySelectorAll<HTMLElement>("[role=option]")[index]?.scrollIntoView({ block: "nearest" });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      setOpen(true);
      const next =
        e.key === "ArrowDown"
          ? Math.min(activeIndex + 1, items.length - 1)
          : Math.max(activeIndex - 1, 0);
      setActiveIndex(next);
      scrollToIndex(next);
    } else if (e.key === "Enter" && open && activeIndex >= 0) {
      e.preventDefault();
      const option = items[activeIndex];
      if (option) handleSelect(option);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  function handleBlur() {
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setOpen(false);
      }
    }, 150);
  }

  return (
    <div className="flex flex-col gap-2" ref={containerRef}>
      <label htmlFor={inputId} className="text-small font-medium text-ink-950">
        {label}
      </label>

      <div className="relative">
        <input
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined}
          required={!isOther}
          placeholder={placeholder}
          value={displayValue}
          onChange={handleInputChange}
          onFocus={() => setOpen(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          className={cn(controlClasses, "h-12 pr-11")}
        />
        <svg
          aria-hidden
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className={cn(
            "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-500 transition-transform duration-200 ease-out-quint",
            open && "rotate-180",
          )}
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

        {open && (
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            className="absolute z-30 mt-2 max-h-64 w-full overflow-y-auto rounded-input border border-ink-200 bg-white p-1.5 shadow-lift motion-safe:animate-pop"
          >
            {filtered.length === 0 && <li className="px-3 py-2.5 text-small text-ink-500">No matches</li>}
            {items.map((option, index) => {
              const selected = value === option;
              const active = index === activeIndex;
              return (
                <li
                  key={option}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={selected}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(option);
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-small transition-colors",
                    option === OTHER && "mt-1 border-t border-ink-100 pt-3",
                    active ? "bg-ink-100 text-ink-950" : "text-ink-700",
                    selected && "font-medium text-primary-500",
                  )}
                >
                  {option === OTHER ? "Other (type yours below)" : option}
                  {selected && (
                    <svg aria-hidden width="12" height="9" viewBox="0 0 14 10" fill="none">
                      <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {isOther && (
        <Input
          type="text"
          required
          aria-label={`${label} (other)`}
          placeholder={`Enter your ${label.toLowerCase()} manually`}
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
        />
      )}
    </div>
  );
}

// ─── Main form ───────────────────────────────────────────────────────────────

type SubmitStatus = "idle" | "loading" | "success" | "duplicate" | "error";

const noopSubscribe = () => () => {};

function SectionShell({ children }: { children: React.ReactNode }) {
  return (
    <section id="join" className="relative isolate w-full scroll-mt-24 overflow-hidden bg-primary-500 section-y">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-40 size-[640px] rounded-full bg-[radial-gradient(closest-side,rgb(4_40_156/0.9),transparent)] blur-3xl" />
        <div className="absolute -bottom-40 -right-20 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgb(128_245_46/0.22),transparent)] blur-3xl motion-safe:animate-drift" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)]" />
      </div>
      <div className="container-page">{children}</div>
    </section>
  );
}

export default function WaitlistForm() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    institution: "",
    institutionOther: "",
    department: "",
    departmentOther: "",
    bio: "",
    studentCount: "1-50",
    publishedBefore: "Yes",
    newsletter: true,
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  // The page is statically rendered, so the build-time clock can't decide
  // whether registration is still open — read it on the client instead.
  const registrationClosed = useSyncExternalStore(
    noopSubscribe,
    () => Date.now() > FEC_REGISTRATION_DEADLINE.getTime(),
    () => false,
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const institution = form.institution === OTHER ? form.institutionOther.trim() : form.institution;
    const department = form.department === OTHER ? form.departmentOther.trim() : form.department;

    if (!institution) {
      setStatus("error");
      setErrorMessage("Please enter your institution name.");
      return;
    }
    if (!department) {
      setStatus("error");
      setErrorMessage("Please enter your department or subject area.");
      return;
    }

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          institution,
          department,
          bio: form.bio,
          studentCount: form.studentCount,
          publishedBefore: form.publishedBefore,
          newsletter: form.newsletter,
        }),
      });

      const data = (await res.json()) as { message?: string; error?: string };

      if (res.ok) {
        setStatus(res.status === 200 ? "duplicate" : "success");
      } else {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  const intro = (
    <div className="flex flex-col gap-6 text-primary-100 lg:sticky lg:top-28">
      <Heading size="h2" className="text-white">
        Join Before Launch
      </Heading>
      <dl className="grid grid-cols-2 gap-3">
        <div className="rounded-card bg-white/[0.08] p-5 ring-1 ring-inset ring-white/15">
          <dt className="text-eyebrow uppercase text-primary-200">Places</dt>
          <dd className="mt-2 font-heading text-h2 text-white">{FEC_SEAT_LIMIT}</dd>
        </div>
        <div className="rounded-card bg-white/[0.08] p-5 ring-1 ring-inset ring-white/15">
          <dt className="text-eyebrow uppercase text-primary-200">Launch</dt>
          <dd className="mt-2 font-heading text-h4 text-white">{launchDateLabel}</dd>
        </div>
      </dl>
      <div className="flex flex-col gap-3 text-body-lg">
        <p>The Founding Educators Circle is limited to {FEC_SEAT_LIMIT} educators.</p>
        <p>
          Registration closes at {fecDeadlineTimeLabel} on {fecDeadlineLabel}, or as soon as all {FEC_SEAT_LIMIT} places
          are filled.
        </p>
        <p>Bookpheral launches on {launchDateLabel}.</p>
      </div>
    </div>
  );

  if (status === "success" || status === "duplicate" || registrationClosed) {
    const title = registrationClosed
      ? "Registration for the Founding Educators Circle has closed."
      : status === "duplicate"
        ? "You're already on the list!"
        : "You're on the list!";
    const body = registrationClosed
      ? `You will still be able to use Bookpheral's standard services from ${launchDateLabel}.`
      : status === "duplicate"
        ? "We already have your details. We'll be in touch as we get closer to launch."
        : "We'll be in touch soon. Welcome to the Founding Educators Circle.";

    return (
      <SectionShell>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">{intro}</div>
          <div className="lg:col-span-7">
            <div
              role="status"
              className="flex flex-col items-start gap-4 rounded-panel bg-white p-8 shadow-lift motion-safe:animate-fade-up sm:p-12"
            >
              <span
                className={cn(
                  "flex size-12 items-center justify-center rounded-full",
                  registrationClosed ? "bg-ink-100 text-ink-700" : "bg-accent-400 text-primary-900",
                )}
                aria-hidden
              >
                {registrationClosed ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 6v4.5l3 1.5M17.5 10a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="20" height="14" viewBox="0 0 14 10" fill="none">
                    <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <Heading as="h3" size="h3">
                {title}
              </Heading>
              <p className="text-body-lg text-ink-500">{body}</p>
            </div>
          </div>
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">{intro}</div>

        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-panel bg-white p-6 shadow-lift sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-heading text-h4 text-ink-950">Complete the form below to join.</p>
              <Badge variant="accent" dot="pulse">
                {FEC_SEAT_LIMIT} places
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field id="waitlist-name" label="Full Name">
                <Input
                  id="waitlist-name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                />
              </Field>
              <Field id="waitlist-email" label="Email">
                <Input
                  id="waitlist-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@university.edu"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Field>
            </div>

            <Combobox
              label="Institution Name"
              placeholder="Search your university…"
              options={AFRICAN_UNIVERSITIES}
              value={form.institution}
              otherValue={form.institutionOther}
              onSelect={(v) => setForm({ ...form, institution: v, institutionOther: "" })}
              onOtherChange={(v) => setForm({ ...form, institutionOther: v })}
            />

            <Combobox
              label="Department / Subject Area"
              placeholder="Search your department…"
              options={DEPARTMENTS}
              value={form.department}
              otherValue={form.departmentOther}
              onSelect={(v) => setForm({ ...form, department: v, departmentOther: "" })}
              onOtherChange={(v) => setForm({ ...form, departmentOther: v })}
            />

            <Field id="waitlist-bio" label="Bio / About You">
              <Textarea
                id="waitlist-bio"
                required
                rows={4}
                placeholder="Tell us a bit about your teaching focus and why you're interested in Bookpheral. (e.g., I teach Advanced Microeconomics and have written course materials for 200+ students annually.)"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
              />
            </Field>

            <div className="flex flex-col gap-6">
              <Segmented
                name="studentCount"
                legend="How many students do you typically teach per year?"
                options={studentOptions}
                value={form.studentCount}
                onChange={(v) => setForm({ ...form, studentCount: v })}
              />
              <Segmented
                name="publishedBefore"
                legend="Have you published a book or course materials before?"
                options={publishedOptions}
                value={form.publishedBefore}
                onChange={(v) => setForm({ ...form, publishedBefore: v })}
              />
            </div>

            <div className="border-t border-ink-100 pt-6">
              <Checkbox
                id="newsletter"
                checked={form.newsletter}
                onChange={(checked) => setForm({ ...form, newsletter: checked })}
              >
                I agree to receive updates about Bookpheral and the Founding Educators program.
              </Checkbox>
            </div>

            {status === "error" && <Alert tone="error">{errorMessage}</Alert>}

            <Button type="submit" size="lg" disabled={status === "loading"} arrow={status !== "loading"} className="w-full sm:w-auto sm:self-start">
              {status === "loading" ? (
                <>
                  <Spinner />
                  Submitting…
                </>
              ) : (
                "Secure My Spot"
              )}
            </Button>
          </form>
        </div>
      </div>
    </SectionShell>
  );
}
