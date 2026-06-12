import { NextResponse } from "next/server";

// TODO task 3: implement lead submission (validation, honeypot, rate-limit, Supabase, Telegram)
export async function POST() {
  return NextResponse.json({ ok: false, error: "not implemented" }, { status: 501 });
}
