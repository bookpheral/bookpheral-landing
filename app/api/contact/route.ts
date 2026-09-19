import { sendContactMessage } from "@/lib/email";

type ContactBody = {
  fullName: string;
  email: string;
  topic: string;
  message: string;
};

const MAX_LENGTHS = { fullName: 200, email: 320, topic: 100, message: 5000 } as const;

function isValidBody(body: unknown): body is ContactBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.fullName === "string" &&
    b.fullName.trim().length > 0 &&
    b.fullName.length <= MAX_LENGTHS.fullName &&
    typeof b.email === "string" &&
    b.email.length <= MAX_LENGTHS.email &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email.trim()) &&
    typeof b.topic === "string" &&
    b.topic.trim().length > 0 &&
    b.topic.length <= MAX_LENGTHS.topic &&
    typeof b.message === "string" &&
    b.message.trim().length > 0 &&
    b.message.length <= MAX_LENGTHS.message
  );
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValidBody(body)) {
    return Response.json({ error: "Please fill in all fields with valid details." }, { status: 400 });
  }

  try {
    await sendContactMessage({
      fullName: body.fullName.trim(),
      email: body.email.trim(),
      topic: body.topic.trim(),
      message: body.message.trim(),
    });
  } catch (err) {
    console.error("[contact] Resend email error:", err);
    return Response.json(
      { error: "We couldn't send your message right now. Please try again, or email us directly." },
      { status: 502 }
    );
  }

  return Response.json({ message: "Message sent" }, { status: 201 });
}
