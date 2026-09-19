import { Resend } from "resend";
import {
  EDUCATOR_REVENUE_SHARE,
  FEC_PRODUCTION_DISCOUNT_PERCENT,
  PLATFORM_REVENUE_SHARE,
  SITE_URL,
  contact,
} from "@/lib/site-config";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = "Bookpheral <noreply@updates.bookpheral.com>";

export async function sendWaitlistConfirmation(
  name: string,
  email: string
): Promise<void> {
  const firstName = name.split(" ")[0] ?? name;

  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "You're on the Bookpheral Founding Educators waitlist 🎉",
    html: buildHtml(escapeHtml(firstName)),
  });
}

export type ContactMessage = {
  fullName: string;
  email: string;
  topic: string;
  message: string;
};

/** Forwards a contact-form submission to the Bookpheral inbox. Reply-To is the sender. */
export async function sendContactMessage(msg: ContactMessage): Promise<void> {
  const inbox = process.env.CONTACT_INBOX_EMAIL?.trim() || contact.generalEmail;

  const { error } = await resend.emails.send({
    from: FROM,
    to: inbox,
    replyTo: msg.email,
    subject: `[Contact] ${msg.topic} — ${msg.fullName}`,
    text: `Name: ${msg.fullName}\nEmail: ${msg.email}\nTopic: ${msg.topic}\n\n${msg.message}`,
    html: `<div style="font-family:Arial,Helvetica,sans-serif;color:#060606;font-size:15px;line-height:1.6;">
  <p style="margin:0 0 4px;"><strong>Name:</strong> ${escapeHtml(msg.fullName)}</p>
  <p style="margin:0 0 4px;"><strong>Email:</strong> ${escapeHtml(msg.email)}</p>
  <p style="margin:0 0 16px;"><strong>Topic:</strong> ${escapeHtml(msg.topic)}</p>
  <p style="margin:0;white-space:pre-wrap;">${escapeHtml(msg.message)}</p>
</div>`,
  });

  if (error) {
    throw new Error(error.message);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(firstName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Bookpheral</title>
</head>
<body style="margin:0;padding:0;background:#f9fbff;font-family:Arial,Helvetica,sans-serif;color:#060606;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f9fbff;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="max-width:560px;">

          <!-- Logo bar -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <table cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="background:#0137e0;border-radius:10px;padding:10px 20px;">
                    <span style="font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.04em;">Bookpheral</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06);">

              <!-- Gradient header -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="background:linear-gradient(180deg,#04289c 0%,#0137e0 100%);padding:48px 40px 40px;text-align:center;">
                    <p style="margin:0 0 12px;font-size:40px;line-height:1;">🎉</p>
                    <h1 style="margin:0 0 12px;font-size:28px;font-weight:700;color:#ffffff;letter-spacing:-0.04em;line-height:1.1;">
                      You&rsquo;re on the list, ${firstName}!
                    </h1>
                    <p style="margin:0;font-size:16px;color:rgba(255,255,255,0.8);line-height:1.5;">
                      Welcome to the Bookpheral Founding Educators Circle.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Body -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td style="padding:40px;">

                    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#333333;">
                      Thank you for applying — we&rsquo;re excited to have you among the first educators to experience Bookpheral.
                    </p>

                    <!-- What happens next -->
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#f9fbff;border-radius:12px;margin-bottom:28px;">
                      <tr>
                        <td style="padding:24px;">
                          <p style="margin:0 0 16px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#0137e0;">What happens next</p>
                          <table cellpadding="0" cellspacing="0" role="presentation" width="100%">
                            ${step("1", "We review your application", "Our team reviews each application to ensure a great founding cohort.")}
                            ${step("2", "Early access invite", "Founding Educators get first access before the public launch.")}
                            ${step("3", "Lifetime founding privileges", `Up to ${FEC_PRODUCTION_DISCOUNT_PERCENT}% off professional production for one eligible book each benefit year, plus priority visibility — alongside the standard ${EDUCATOR_REVENUE_SHARE}/${PLATFORM_REVENUE_SHARE} revenue share.`)}
                          </table>
                        </td>
                      </tr>
                    </table>

                    <p style="margin:0 0 28px;font-size:15px;line-height:1.6;color:#333333;">
                      We&rsquo;ll reach out with next steps as we get closer to launch. Keep an eye on your inbox.
                    </p>

                    <!-- CTA -->
                    <table cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td style="background:#0137e0;border-radius:8px;">
                          <a href="${SITE_URL}" style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;letter-spacing:-0.02em;">
                            Visit Bookpheral.com &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 0 0;text-align:center;">
              <p style="margin:0 0 8px;font-size:13px;color:#737373;">
                Bookpheral &mdash; Africa&rsquo;s Educator Platform
              </p>
              <p style="margin:0;font-size:12px;color:#999999;">
                You received this because you signed up at ${SITE_URL.replace(/^https?:\/\//, "")}.<br />
                To unsubscribe, reply with &ldquo;unsubscribe&rdquo; in the subject line.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function step(num: string, title: string, description: string): string {
  return `<tr>
    <td style="padding-bottom:14px;vertical-align:top;">
      <table cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td style="padding-right:12px;vertical-align:top;">
            <div style="width:24px;height:24px;border-radius:50%;background:#0137e0;color:#ffffff;font-size:12px;font-weight:700;text-align:center;line-height:24px;">${num}</div>
          </td>
          <td style="vertical-align:top;">
            <p style="margin:0 0 2px;font-size:14px;font-weight:600;color:#060606;">${title}</p>
            <p style="margin:0;font-size:13px;color:#737373;line-height:1.5;">${description}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>`;
}
