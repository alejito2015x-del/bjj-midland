import { Resend } from "resend";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const TIME_LABELS: Record<string, { label: string; range: string }> = {
  morning:   { label: "Morning",   range: "6:00 AM – 12:00 PM" },
  afternoon: { label: "Afternoon", range: "12:00 PM – 5:00 PM" },
  evening:   { label: "Evening",   range: "5:00 PM – 9:00 PM" },
};

const PROGRAM_LABELS: Record<string, string> = {
  "bjj-gi":  "BJJ GI — Traditional",
  "bjj-nogi":"BJJ NO-GI — No Kimono",
  "mma":     "MMA / Wrestling",
  "kids":    "Kids & Youth (Ages 4+)",
  "veteran": "Veterans & Law Enforcement",
  "private": "Private Lessons",
};

const GYM_EMAIL = "Midlandbjj@yahoo.com";

const ALLOWED_ORIGINS = [
  "https://midlandbjj.com",
  "https://midlandbjjmma.com",
  "https://bjj-midland.vercel.app",
  "http://localhost:3000",
  "http://localhost:3001",
];

const MAX_BODY_BYTES = 4000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

const rateBuckets = new Map<string, number[]>();

function checkRate(ip: string): boolean {
  const now = Date.now();
  const bucket = (rateBuckets.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (bucket.length >= RATE_LIMIT_MAX) {
    rateBuckets.set(ip, bucket);
    return false;
  }
  bucket.push(now);
  rateBuckets.set(ip, bucket);
  if (rateBuckets.size > 1000) {
    for (const [k, v] of rateBuckets.entries()) {
      if (v.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) rateBuckets.delete(k);
    }
  }
  return true;
}

const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

const escapeHtml = (s: string) => String(s).replace(/[&<>"']/g, (c) => HTML_ESCAPE_MAP[c]);

const stripCRLF = (s: string) => String(s).replace(/[\r\n]+/g, " ").trim();

function isNonEmptyString(v: unknown, max: number): v is string {
  return typeof v === "string" && v.trim().length > 0 && v.length <= max;
}

function isValidEmail(v: unknown): v is string {
  return typeof v === "string" && v.length <= 120 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY missing");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const origin = req.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (!checkRate(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const { name, email, phone, program, preferredDay, preferredTime, notes } = b;

  if (!isNonEmptyString(name, 80))         return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  if (!isValidEmail(email))                return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  if (!isNonEmptyString(phone, 30))        return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
  if (typeof program !== "string" || !(program in PROGRAM_LABELS)) {
    return NextResponse.json({ error: "Invalid program" }, { status: 400 });
  }
  if (!isNonEmptyString(preferredDay, 20)) return NextResponse.json({ error: "Invalid preferredDay" }, { status: 400 });
  if (typeof preferredTime !== "string" || !(preferredTime in TIME_LABELS)) {
    return NextResponse.json({ error: "Invalid preferredTime" }, { status: 400 });
  }
  if (notes !== undefined && notes !== null && (typeof notes !== "string" || notes.length > 500)) {
    return NextResponse.json({ error: "Invalid notes" }, { status: 400 });
  }

  const time = TIME_LABELS[preferredTime];
  const safeNotes = typeof notes === "string" && notes.trim().length > 0 ? notes : "—";

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "Midland BJJ Website <onboarding@resend.dev>",
      to: [GYM_EMAIL],
      subject: `New free class booking — ${stripCRLF(name)}`,
      html: `<p><b>Name:</b> ${escapeHtml(name)}<br/><b>Email:</b> ${escapeHtml(email)}<br/><b>Phone:</b> ${escapeHtml(phone)}<br/><b>Program:</b> ${escapeHtml(PROGRAM_LABELS[program])}<br/><b>Day:</b> ${escapeHtml(preferredDay)}<br/><b>Time:</b> ${escapeHtml(time.label)} (${escapeHtml(time.range)})<br/><b>Notes:</b> ${escapeHtml(safeNotes)}</p>`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Register route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
