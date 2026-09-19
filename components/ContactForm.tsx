"use client";

import { useState } from "react";
import { Alert, Button, Field, Heading, Input, Select, Spinner, Textarea } from "@/components/ui";

const topics = [
  "General enquiry",
  "Book distribution",
  "Manuscript / production",
  "Institution or partnership",
  "Founding Educators Circle",
  "Support",
] as const;

const MESSAGE_MAX = 5000;

type FormState = {
  fullName: string;
  email: string;
  topic: string;
  message: string;
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

const initialState: FormState = { fullName: "", email: "", topic: topics[0], message: "" };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { message?: string; error?: string };

      if (res.ok) {
        setStatus("success");
        setForm(initialState);
      } else {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex h-full flex-col items-start justify-center gap-4 rounded-panel bg-white p-8 shadow-lift ring-1 ring-ink-200 motion-safe:animate-fade-up sm:p-12"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-accent-400 text-primary-900" aria-hidden>
          <svg width="20" height="14" viewBox="0 0 14 10" fill="none">
            <path d="M1 5L5 9L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <Heading as="h3" size="h3">
          Message sent
        </Heading>
        <p className="max-w-[420px] text-body-lg text-ink-500">
          Thanks for reaching out. A member of our team will get back to you.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-panel bg-white p-6 shadow-lift ring-1 ring-ink-200 sm:p-10">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="contact-name" label="Full Name">
          <Input
            id="contact-name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your full name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />
        </Field>
        <Field id="contact-email" label="Email">
          <Input
            id="contact-email"
            type="email"
            required
            autoComplete="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Field>
      </div>

      <Field id="contact-topic" label="What is this about?">
        <Select id="contact-topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </Select>
      </Field>

      <Field id="contact-message" label="Message">
        <Textarea
          id="contact-message"
          required
          rows={6}
          maxLength={MESSAGE_MAX}
          placeholder="Tell us about your question, book, manuscript, institution, or partnership."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <p className="self-end text-small tabular-nums text-ink-500">
          {form.message.length.toLocaleString()} / {MESSAGE_MAX.toLocaleString()}
        </p>
      </Field>

      {status === "error" && <Alert tone="error">{errorMessage}</Alert>}

      <Button type="submit" size="lg" disabled={status === "loading"} arrow={status !== "loading"} className="w-full sm:w-auto sm:self-start">
        {status === "loading" ? (
          <>
            <Spinner />
            Sending…
          </>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}
