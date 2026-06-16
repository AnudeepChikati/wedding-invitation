import { NextResponse } from "next/server";
import { validateRSVP, type RSVPInput } from "@/lib/rsvp";

type RateEntry = { count: number; resetAt: number };

const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 5;
const rateStore = new Map<string, RateEntry>();

export async function POST(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for") || "unknown";
  const ip = forwardedFor.split(",")[0]?.trim() || "unknown";
  const now = Date.now();

  const current = rateStore.get(ip);
  if (current && current.resetAt > now) {
    if (current.count >= RATE_LIMIT) {
      return NextResponse.json({ message: "Too many requests. Please try again shortly." }, { status: 429 });
    }
    current.count += 1;
  } else {
    rateStore.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
  }

  const payload = (await request.json()) as RSVPInput;
  const validation = validateRSVP(payload);

  if (!validation.ok) {
    return NextResponse.json({ message: validation.error }, { status: 400 });
  }

  return NextResponse.json({
    message:
      validation.value.attendance === "Yes"
        ? `Thank you ${validation.value.name}! We look forward to celebrating with you.`
        : `Thank you ${validation.value.name}! We appreciate your response and blessings.`,
  });
}
