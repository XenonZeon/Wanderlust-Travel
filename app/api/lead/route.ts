import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/validation";
import { supabase } from "@/lib/supabase";
import { sendMessage } from "@/lib/telegram";
import { hashIp, isRateLimited } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });

  const { _honey, ...data } = parsed.data;
  if (_honey) return NextResponse.json({ ok: true }); // honeypot triggered — silent 200

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const ipHash = hashIp(ip);

  if (await isRateLimited(ipHash)) {
    return NextResponse.json({ ok: false, error: "too many requests" }, { status: 429 });
  }

  const { data: row, error } = await supabase
    .from("leads")
    .insert({
      ...data,
      ip_hash: ipHash,
      user_agent: req.headers.get("user-agent") ?? "",
    })
    .select("id")
    .single();

  if (error) {
    console.error("supabase insert error", error);
    return NextResponse.json({ ok: false, error: "db error" }, { status: 500 });
  }

  const text =
    `<b>Новая заявка</b>\n` +
    `Имя: ${data.name}\n` +
    `Телефон: ${data.phone}\n` +
    (data.destination ? `Направление: ${data.destination}\n` : "") +
    (data.message ? `Сообщение: ${data.message}\n` : "") +
    `ID: ${row.id}`;

  const tgDelivered = await sendMessage(text);

  if (tgDelivered) {
    await supabase.from("leads").update({ tg_delivered: true }).eq("id", row.id);
  }

  return NextResponse.json({ ok: true });
}
