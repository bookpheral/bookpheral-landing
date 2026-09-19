import { getSupabase } from "@/lib/supabase";
import { sendWaitlistConfirmation } from "@/lib/email";
import { FEC_REGISTRATION_DEADLINE } from "@/lib/site-config";

type WaitlistBody = {
  fullName: string;
  email: string;
  institution: string;
  department: string;
  bio: string;
  studentCount: string;
  publishedBefore: string;
  newsletter: boolean;
};

function isValidBody(body: unknown): body is WaitlistBody {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.fullName === "string" &&
    b.fullName.trim().length > 0 &&
    typeof b.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.institution === "string" &&
    b.institution.trim().length > 0 &&
    typeof b.department === "string" &&
    b.department.trim().length > 0 &&
    typeof b.bio === "string" &&
    b.bio.trim().length > 0 &&
    typeof b.studentCount === "string" &&
    b.studentCount.trim().length > 0 &&
    typeof b.publishedBefore === "string" &&
    b.publishedBefore.trim().length > 0 &&
    typeof b.newsletter === "boolean"
  );
}

export async function POST(request: Request): Promise<Response> {
  if (Date.now() > FEC_REGISTRATION_DEADLINE.getTime()) {
    return Response.json(
      { error: "Registration for the Founding Educators Circle has closed." },
      { status: 403 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValidBody(body)) {
    return Response.json({ error: "Missing or invalid fields" }, { status: 400 });
  }

  const { fullName, email, institution, department, bio, studentCount, publishedBefore, newsletter } = body;

  const { error } = await getSupabase().from("waitlist").insert({
    full_name: fullName.trim(),
    email: email.trim().toLowerCase(),
    institution: institution.trim(),
    department: department.trim(),
    bio: bio.trim(),
    student_count: studentCount,
    published_before: publishedBefore,
    newsletter,
  });

  if (error) {
    // Postgres unique violation on email
    if (error.code === "23505") {
      return Response.json(
        { message: "You're already on the waitlist!" },
        { status: 200 }
      );
    }
    console.error("[waitlist] Supabase insert error:", error);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  // Fire and forget — don't let email failure block the response
  sendWaitlistConfirmation(fullName.trim(), email.trim()).catch((err) => {
    console.error("[waitlist] Resend email error:", err);
  });

  return Response.json({ message: "You're on the list!" }, { status: 201 });
}
