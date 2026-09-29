import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { Card, CheckList, PageHeader, Prose, SectionHeading } from "@/components/ui";
import { contact } from "@/lib/site-config";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("deleteAccount");

const IN_APP_STEPS = [
  "Open the Bookpheral app and sign in.",
  "Go to the Account tab.",
  "Under Security, tap “Delete account.”",
  "Confirm in the dialog that appears.",
];

const DATA_DELETED = [
  "Name, email address and phone number",
  "Country, institution and department",
  "Profile photo and bio",
  "Matric / ID number",
  "Google sign-in link and password",
  "Bank account on file",
  "Reading history",
  "Book reviews you've written",
];

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd("deleteAccount")} />

      <PageHeader eyebrow="Account" title="Delete Your Account">
        <p>
          You can delete your Bookpheral account and personal data at any time — right in the app, or by
          contacting us if you can no longer sign in.
        </p>
      </PageHeader>

      <div className="container-page section-y-sm">
        <div className="mx-auto flex max-w-[760px] flex-col gap-14">
          <section className="flex flex-col gap-5">
            <SectionHeading>Option 1 — Delete it yourself, in the app</SectionHeading>
            <Card variant="tint" padding="md">
              <ol className="flex flex-col gap-3 marker:font-medium marker:text-primary-500 [list-style:decimal] pl-5">
                {IN_APP_STEPS.map((step) => (
                  <li key={step} className="pl-1 font-switzer text-body text-ink-950">
                    {step}
                  </li>
                ))}
              </ol>
            </Card>
            <Prose>
              <p>
                This takes effect immediately: your account is deactivated and you&apos;re signed out of every
                device right away. This can&apos;t be undone from the app itself — see &ldquo;What happens to
                your data&rdquo; below for the 30-day window if you change your mind.
              </p>
            </Prose>
          </section>

          <section className="flex flex-col gap-5">
            <SectionHeading>Option 2 — Can&apos;t sign in? Email us</SectionHeading>
            <Prose>
              <p>
                If you no longer have access to the app, or would rather not sign in, email us at{" "}
                <a
                  href={`mailto:${contact.supportEmail}?subject=Delete%20my%20account`}
                  className="text-primary-500 underline decoration-primary-200 underline-offset-4 hover:decoration-primary-500"
                >
                  {contact.supportEmail}
                </a>{" "}
                from the email address on your account, with the subject &ldquo;Delete my account.&rdquo; We may ask
                you to verify a few account details before processing the request.
              </p>
              <p>We complete account-deletion requests made this way within 3 business days.</p>
            </Prose>
          </section>

          <section className="flex flex-col gap-5">
            <SectionHeading>What happens to your data</SectionHeading>
            <Prose>
              <p>
                Your account and its data are held for <span className="text-ink-950 font-medium">30 days</span>{" "}
                after deletion in case you change your mind. Logging back into the app during that window restores
                your account exactly as it was, including any books you&apos;d published. If you don&apos;t log back
                in, the following is permanently erased 30 days after your deletion request:
              </p>
            </Prose>
            <CheckList items={DATA_DELETED} />
            <Prose>
              <p>
                We keep purchase, payout and accounting records — no longer linked to your name or contact
                details — for as long as required for tax, accounting, fraud-prevention and dispute-resolution
                purposes.
              </p>
              <p>
                If you&apos;re an educator: books you previously published are removed from the store immediately,
                so no one can buy them again. Readers who already bought a copy keep their access regardless, unless
                you choose to refund them.
              </p>
            </Prose>
          </section>
        </div>
      </div>
    </>
  );
}
